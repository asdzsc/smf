<template>
	<a-card>
		<a-row>
			<a-col :span="24">
				<div class="operator">
					<a-row type="flex" justify="start">
						<a-col style="padding-right:10px;">
							<a-button @click="saveSort()" type="primary" icon="sort-ascending">保存排序</a-button>
							&nbsp;
							<a-button @click="add()" type="primary" icon="plus">新增</a-button>
							&nbsp;
							<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
						</a-col>
						<a-col :span="5">
							<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
							 enterButton />
						</a-col>
					</a-row>
				</div>
				<div>
					<a-table size="middle" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="pagination"
					 :rowSelection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
					 :loading="loading" @change="onChange">
						<template slot="cover" slot-scope="record">
							<img :src="baseUrl + record" :onerror="defImg" @click="showImg(baseUrl + record)" class="fmImg" />
						</template>
						<template slot="phoneCover" slot-scope="record">
							<img :src="baseUrl + record" :onerror="defImg" @click="showImg(baseUrl + record)" class="fmImg" />
						</template>
						<template slot="status" slot-scope="record">
							<a-switch checkedChildren="上架" unCheckedChildren="下架" :checked="record.status === '1' ? true : false" @change="setStatus(record)" />
						</template>
						<template slot="sortId" slot-scope="record">
							<a-input-number :min="0" v-model="record.sortId" @change="changeSort(record)" />
						</template>
						<template slot="action" slot-scope="record">
							<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
							&nbsp;
							<a-button title="删除" icon="delete" shape="round" type="danger" size="small" :disabled="record.adminType === 'sys' ? true : false"
							 @click="del([record.id])" />
						</template>
					</a-table>
					<info v-if="showInfo" :id="infoId" @onClose="infoClose"></info>
				</div>
			</a-col>
		</a-row>


		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>

	</a-card>
</template>

<script>
	import {
		getMemoryTemplateList,
		setMemoryTemplateStatus,
		saveMemoryTemplateSort,
		delMemoryTemplate
	} from "@/pages/admin/api/memory/template";

	export default {
		components: {
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
			info: () => import("@/pages/admin/views/memory/template/info")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					columnId: "",
					status: "",
					searchText: "",
					current: 1,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				columns: [{
						title: "图片",
						dataIndex: "cover",
						scopedSlots: {
							customRender: "cover"
						},
						width: 150
					},
					{
						title: "手机图片",
						dataIndex: "phoneCover",
						scopedSlots: {
							customRender: "phoneCover"
						},
						width: 150
					}, {
						title: "标题",
						dataIndex: "title"
					},
					// {
					//   title: "销售价格",
					//   dataIndex: "price",
					//   align: "center",
					//   width: 120
					// },
					// {
					//   title: "有效时间（天）",
					//   dataIndex: "buyDay",
					//   align: "center",
					//   width: 120
					// },
					// {
					//   title: "状态",
					//   dataIndex: "",
					//   scopedSlots: { customRender: "status" },
					//   align: "center",
					//   width: 100
					// },
					{
						title: "排序",
						dataIndex: "",
						scopedSlots: {
							customRender: "sortId"
						},
						align: "center",
						width: 100
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center",
						width: 150
					},
					{
						title: "操作",
						dataIndex: "",
						width: 130,
						align: "center",
						scopedSlots: {
							customRender: "action"
						}
					}
				],
				showInfo: false,
				infoId: "",
				showImgModal: false
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			// eslint-disable-next-line no-unused-vars
			onChange(pagination, filters, sorter) {
				// console.log("params", pagination, filters, sorter);
				this.pagination = Object.assign(this.pagination, pagination);
				this.getList();
			},
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys;
			},
			onSearch() {
				this.pagination.current = 1;
				this.getList();
			},
			getList() {
				this.loading = true;
				this.selectedRowKeys = [];
				const pagination = { ...this.pagination
				};
				getMemoryTemplateList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			setStatus(record) {
				this.$confirm({
					title: "确定要修改状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var status = record.status === "2" ? "1" : "2";
						setMemoryTemplateStatus({
							id: record.id,
							status: status
						}).then(
							res => {
								if (res.code === 0) {
									record.status = status;
								}
							}
						);
					},
					onCancel() {}
				});
			},
			changeSort(record) {
				var query = this.list.filter(x => {
					return x.id === record.id;
				});
				if (query.length > 0) {
					query[0].sortId = record.sortId;
				}
			},
			saveSort() {
				saveMemoryTemplateSort(this.list).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.getList();
					}
				});
			},
			add() {
				this.infoId = "";
				this.showInfo = true;
			},
			edit(record) {
				this.infoId = record.id;
				this.showInfo = true;
			},
			infoClose(res) {
				this.$nextTick(() => {
					this.showInfo = false;
				});
				if (res.code === 0) {
					this.onSearch();
				}
			},
			//批量删除
			delAll() {
				this.del(this.selectedRowKeys);
			},
			del(list) {
				if (list.length === 0) {
					this.$notification.warning({
						message: "提示",
						description: "请选择需要删除的数据"
					});
					return;
				}
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						delMemoryTemplate({
							ids: list
						}).then(res => {
							if (res.code === 0) {
								vm.onSearch();
							}
						});
					},
					onCancel() {}
				});
			},
			showImg(imgUrl) {
				this.showImgModal = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.showImg.loadData(imgUrl, [imgUrl]);
					}, 200);
				});
			},
			showImgClose() {
				this.showImgModal = false;
			}
		}
	};
</script>

<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}

	.fmImg {
		min-width: 40px;
		min-height: 40px;
		max-width: 100px;
		max-height: 60px;
	}
</style>
