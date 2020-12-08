<template>
	<a-card>
		<a-row>
			<a-col :span="3">
				<a-tree :treeData="treeData" :expandedKeys="expandedKeys" @expand="onExpandTree" @select="onSelectTree" />
			</a-col>
			<a-col :span="21">
				<div class="operator">
					<a-row type="flex" justify="start">
						<a-col style="padding-right:10px;">
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
						<template slot="photo" slot-scope="record">
							<img :src="baseUrl + record" :onerror="defImg" @click="showImg(baseUrl + record)" class="fmImg" />
						</template>
						<template slot="status" slot-scope="record">
							<a-switch checkedChildren="公开" unCheckedChildren="不公开" :checked="record.status === '0' ? true : false" @change="setStatus(record)" />
						</template>
						<template slot="templateName" slot-scope="record">
							<a v-if="record.templateName !== '免费模版'" @click="goodsInfo(record)">
								{{ record.templateName }}
							</a>
							<span v-else>
								{{ record.templateName }}
							</span>
						</template>
						<template slot="action" slot-scope="record">
							<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
							&nbsp;
							<a-button title="删除" icon="delete" shape="round" type="danger" size="small" :disabled="record.adminType === 'sys' ? true : false"
							 @click="del([record.id])" />
						</template>
					</a-table>
					<articleInfo v-if="showInfo" :id="infoId" ref="roleInfo" @onClose="infoClose"></articleInfo>
				</div>
			</a-col>
		</a-row>

		<articleInfo v-if="showInfo" :id="infoId" ref="roleInfo" @onClose="infoClose"></articleInfo>
		<goodsInfo v-if="showGoodsInfo" :id="goodsinfoId" ref="goodsInfo" @onClose="goodsInfoClose"></goodsInfo>
		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
	</a-card>
</template>

<script>
	import {
		getMemoryColumnList
	} from "@/pages/admin/api/memory/column";
	import {
		getMemoryList,
		setMemoryStatus
	} from "@/pages/admin/api/memory/memory";
	import {
		delNews
	} from "@/pages/admin/api/news/news";

	export default {
		components: {
			articleInfo: () => import("@/pages/admin/views/news/article/info"),
			goodsInfo: () => import("@/pages/admin/views/shop/goods/info"),
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				treeData: [],
				expandedKeys: [], //部门树默认展开顶级节点
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
						title: "照片",
						dataIndex: "photo",
						scopedSlots: {
							customRender: "photo"
						},
						width: 150
					}, {
						title: "姓名",
						dataIndex: "name"
					},
					{
						title: "分类",
						dataIndex: "columnName",
						width: 200
					},
					{
						title: "模版名称",
						dataIndex: "",
						scopedSlots: {
							customRender: "templateName"
						},
						width: 200
					},
					{
						title: "状态",
						dataIndex: "",
						scopedSlots: {
							customRender: "status"
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
				showGoodsInfo: false,
				goodsinfoId: '',
				showImgModal: false
			};
		},
		mounted() {
			this.getColumnList();
			this.getList();
		},
		methods: {
			getColumnList() {
				getMemoryColumnList({}).then(res => {
					if (res.code === 0) {
						// this.treeData = res.data.treeData;
						this.treeData.splice(0, 0, {
							id: "0",
							key: "0",
							value: "0",
							pid: "-1",
							title: "全部数据",
							name: "全部数据",
							isLeaf: false,
							children: res.data.treeData
						});
						this.expandedKeys = ["0"];
					}
				});
			},
			onExpandTree(expandedKeys) {
				this.expandedKeys = expandedKeys;
			},
			onSelectTree(selectedKeys, event) {
				this.pagination.columnId = event.node.value;
				this.onSearch();
			},
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
				getMemoryList(pagination).then(res => {
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
					title: "确定要修改公开状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var status = record.status === "0" ? "1" : "0";
						setMemoryStatus({
							id: record.id,
							status: status
						}).then(res => {
							if (res.code === 0) {
								record.status = status;
							}
						});
					},
					onCancel() {}
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
						delNews({
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
			goodsInfo(record) {
				this.goodsinfoId = record.templateId;
				this.showGoodsInfo = true;
			},
			goodsInfoClose(res) {
				this.$nextTick(() => {
					this.showGoodsInfo = false;
				});
				if (res.code === 0) {
					this.onSearch();
				}
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
