<template>
	<a-card>
		<div class="operator">
			<a-row type="flex" justify="start">
				<a-col style="padding-right:10px;">
					<a-button @click="exportFile()" :loading="loadingExportFile" type="primary">
						<icon-font type="icondownload" style="font-size:16px;" />导出</a-button>
					&nbsp;
					<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
					&nbsp;
					<a-range-picker :placeholder="['开始时间', '结束时间']" :allowClear="false" @change="onChangeDate" v-model="dtime" style="width:200px;" />
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
				<!-- slot-scope="record" -->
				<template slot="action" slot-scope="record">
					<a-button title="详情" icon="file-text" shape="round" type="primary" size="small" @click="showInfo(record)" />
					&nbsp;
					<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" />
					<!-- <a :href="record.id">操作{{ record.userid }}</a> -->
				</template>
			</a-table>
			<log-info ref="logInfo"></log-info>
		</div>
	</a-card>
</template>

<script>
	import moment from "moment";
	import {
		getLogList,
		delLog,
		exportExcel
	} from "@/pages/admin/api/sys/syslog";

	export default {
		name: "role-list",
		components: {
			logInfo: () => import("@/pages/admin/views/sys/log/info")
		},
		data() {
			return {
				infoId: "",
				visible: false,
				loadingExportFile: false,
				dtime: [],
				list: [],
				selectedRowKeys: [],
				pagination: {
					searchText: "",
					startTime: "",
					endTime: "",
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
						title: "用户名",
						dataIndex: "userid"
					},
					{
						title: "内容",
						dataIndex: "operation"
					},
					{
						title: "URL",
						dataIndex: "url"
					},
					{
						title: "IP",
						dataIndex: "ip"
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center",
						width: 150,
						sorter: true
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
				]
			};
		},
		mounted() {
			var st = moment().add(-7, "days");
			var et = moment();
			this.dtime = [st, et];
			this.pagination.startTime = st.format("YYYY-MM-DD");
			this.pagination.endTime = et.format("YYYY-MM-DD");
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
			onChangeDate(date, dateString) {
				this.pagination.startTime = dateString[0];
				this.pagination.endTime = dateString[1];
				this.onSearch();
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
				getLogList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			showInfo(record) {
				this.$refs.logInfo.loadData(record);
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
						delLog({
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
			exportFile() {
				this.loadingExportFile = true;
				exportExcel(this.pagination).then(res => {
					this.loadingExportFile = false;
					if (res.code === 0) {
						var tempPage = window.open("", "_blank");
						tempPage.location = process.env.VUE_APP_BASE_URL + res.data;
					}
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
