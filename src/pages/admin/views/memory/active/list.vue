<template>
	<a-card>
		<div class="operator">
			<a-row type="flex" justify="start">
				<a-col style="padding-right:10px;">
					<a-button @click="exportFile()" :loading="loadingExportFile" type="primary">
						<icon-font type="icondownload" style="font-size:16px;" />导出</a-button>
					&nbsp;
					<a-button @click="add()" type="primary" icon="plus">批量添加</a-button>
					&nbsp;
					<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
				</a-col>
				<a-col style="padding-right:10px;">
					使用状态：
					<a-select v-model="pagination.status" style="width: 120px" @change="onSearch">
						<a-select-option value="">
							全部
						</a-select-option>
						<a-select-option value="0">
							未使用
						</a-select-option>
						<a-select-option value="1">
							已使用
						</a-select-option>
					</a-select>
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

				<template slot="status" slot-scope="record">
					{{ record === '1' ? '已使用' : '未使用'}}
				</template>
				<!-- slot-scope="record" -->
				<template slot="action" slot-scope="record">
					<!-- <a-button title="详情" icon="file-text" shape="round" type="primary" size="small" @click="showInfo(record)" />
					&nbsp; -->
					<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" />
					<!-- <a :href="record.id">操作{{ record.userid }}</a> -->
				</template>
			</a-table>

		</div>

		<addActive v-if="showAddActive" ref="addActive" @onClose="closeAddActive"></addActive>
	</a-card>
</template>

<script>
	import moment from "moment";
	import {
		getMemoryActiveList,
		delMemoryActive,
		exportExcel
	} from "@/pages/admin/api/memory/memory";

	export default {
		components: {
			addActive: () => import("@/pages/admin/views/memory/active/add")
		},
		data() {
			return {
				infoId: "",
				visible: false,
				loadingExportFile: false,
				list: [],
				selectedRowKeys: [],
				pagination: {
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
						title: "激活码",
						dataIndex: "code"
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center"
					},
					{
						title: "使用日期",
						dataIndex: "useTime",
						align: "center"
					},
					{
						title: "使用状态",
						dataIndex: "status",
						scopedSlots: {
							customRender: "status"
						},
						align: "center"
					},
					{
						title: "手机号",
						dataIndex: "mobile",
						align: "center"
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
				showAddActive: false
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
				getMemoryActiveList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			add() {
				this.showAddActive = true
			},
			closeAddActive(res) {
				this.$nextTick(() => {
					this.showAddActive = false
				})
				if (res.code === 0) {
					this.onSearch()
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
						delMemoryActive({
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
