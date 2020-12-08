<template>
	<a-card>
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
        }" :loading="loading"
			 @change="onChange">
			 
			 <template slot="itemTitle" slot-scope="record">
			 	<span v-if="record.isTop === '1'" style="color: red;" >[置顶]</span>{{ record.title }}
			 </template>
				<template slot="endTime" slot-scope="record">
					{{ parseTime(record.endTime) }}
				</template>
				<template slot="proTime" slot-scope="record">
					{{ parseTime(record.proTime) }}
				</template>
				<template slot="proFile" slot-scope="record">
					<a v-if="record.proFile" :href="baseUrl + record.proFile" target="_blank">下载附件</a>
					<span v-else>未上传</span>
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
	</a-card>
</template>

<script>
	import {
		getNewsZbggList,
		delNewsZbgg
	} from "@/pages/admin/api/news/news";
	import * as utils from "@/pages/admin/libs/utils";
	export default {
		components: {
			info: () => import("@/pages/admin/views/news/article/zbgg-info")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					searchText: "",
					orderField: "",
					order: "",
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
							customRender: "itemTitle"
						}
					},
					{
						title: "招标数",
						dataIndex: "zbNum",
						align: "center",
						width: 100
					},
					{
						title: "投标数",
						dataIndex: "tbNum",
						align: "center",
						width: 100
					},
					{
						title: "招标截止日期",
						dataIndex: "",
						scopedSlots: {
							customRender: "endTime"
						},
						align: "center",
						width: 150
					},
					{
						title: "结算形式",
						dataIndex: "jsxs"
					},
					{
						title: "项目日期",
						dataIndex: "",
						scopedSlots: {
							customRender: "proTime"
						},
						align: "center",
						width: 150
					},
					{
						title: "附件",
						dataIndex: "",
						scopedSlots: {
							customRender: "proFile"
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
				if (sorter.order) {
					this.pagination.orderField = sorter.field;
					this.pagination.order = sorter.order;
				} else {
					this.pagination.orderField = "";
					this.pagination.order = "";
				}
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
				getNewsZbggList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
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
						delNewsZbgg({
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
			parseTime(dtime) {
				return utils.parseTime(dtime, "{y}-{m}-{d}");
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
