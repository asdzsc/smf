<template>
	<a-card>
		<a-row>
			<a-col :span="24">
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
						<template slot="newsTitle" slot-scope="record">
							<div>ID:{{record.id}}</div>
							<div>
								<span v-if="record.isTop === '1'" style="color:#ff4d4f;">
									【置顶】
								</span>
								{{ record.title }}
							</div>
						</template>
						<template slot="status" slot-scope="record">
							<a-switch checkedChildren="已发布" unCheckedChildren="待发布" :checked="record.status === '1' ? true : false" @change="setStatus(record)" />
						</template>
						<template slot="action" slot-scope="record">
							<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
							&nbsp;
							<a-button title="删除" icon="delete" shape="round" type="danger" size="small" :disabled="record.adminType === 'sys' ? true : false"
							 @click="del([record.id])" />
						</template>
					</a-table>
					<articleInfo v-if="showInfo" :id="infoId" @onClose="infoClose"></articleInfo>
				</div>
			</a-col>
		</a-row>
	</a-card>
</template>

<script>
	import {
		getNewsList,
		setNewsStatus,
		delNews
	} from "@/pages/admin/api/news/news";

	export default {
		components: {
			articleInfo: () => import("@/pages/admin/views/news/article/bwgq-info")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					columnId: "",
					articleType: "2", //博物馆群
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
						title: "标题",
						dataIndex: "",
						scopedSlots: {
							customRender: "newsTitle"
						}
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
						title: "发布时间",
						dataIndex: "publishTime",
						align: "center",
						width: 150
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
				infoId: ""
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
				getNewsList(pagination).then(res => {
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
					title: "确定要修改发布状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var status = record.status === "0" ? "1" : "0";
						setNewsStatus({
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
			}
		}
	};
</script>

<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}
</style>
