<template>
	<a-modal :title="title" v-model="visible" width="860px" :bodyStyle="{ padding: '10px',minHeight:'500px' }" @cancel="onClose"
	 :footer="null">

		<div class="operator">
			<a-row type="flex" justify="start">
				<a-col style="padding-right:10px;">
					<a-button @click="add()" type="primary" icon="plus">新增</a-button>
					&nbsp;
					<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
				</a-col>
				<a-col style="padding-right:10px;">
					<a-select v-model="pagination.status" style="width: 120px" @change="changeStatus">
						<a-select-option value="">
							全部
						</a-select-option>
						<a-select-option value="0">
							显示
						</a-select-option>
						<a-select-option value="1">
							不显示
						</a-select-option>
					</a-select>
				</a-col>
				<a-col :span="10">
					<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
					 enterButton />
				</a-col>
			</a-row>
		</div>
		<a-table size="small" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="pagination"
		 :rowSelection="{
		    selectedRowKeys: selectedRowKeys,
		    onChange: onSelectChange
		  }" :loading="loading"
		 @change="onChange" :scroll="{ y: 600 }">

			<template slot="cont" slot-scope="record">
				<div>
					留言者：{{record.nickname}}
				</div>
				<div>
					纪念者：{{record.memoryName}}
				</div>
				<div>
					内容：{{record.cont}}
				</div>
			</template>
			<template slot="status" slot-scope="record">
				<a-switch checkedChildren="显示" unCheckedChildren="不显示" :checked="record.status === '0' ? true : false" @change="setStatus(record)" />
			</template>
			<template slot="action" slot-scope="record">
				<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" />
			</template>
		</a-table>

		<infoMsgAdd v-if="showInfoMsgAdd" ref="infoMsgAdd" :memoryInfo="memoryInfo" @onClose="infoMsgAddClose"></infoMsgAdd>
	</a-modal>
</template>
<script>
	import {
		memoryMsgList,
		setMemoryMsgStatus,
		delMemoryMsg
	} from "@/pages/admin/api/memory/msg";
	export default {
		components: {
			infoMsgAdd: () => import("@/pages/admin/views/memory/info/components/info-msg-add")
		},
		props: {
			memoryInfo: {
				type: Object,
				default () {
					return null
				}
			}
		},
		data() {
			return {
				visible: false,
				title: '祭奠留言',
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					memoryId: "", //纪念馆id
					searchText: "",
					status: "",
					msgType: "1", //祭奠留言
					current: 1,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				columns: [{
						title: "留言",
						dataIndex: "",
						scopedSlots: {
							customRender: "cont"
						}
					},
					// {
					// 	title: "留言者",
					// 	dataIndex: "nickname",
					// 	width: 120
					// },
					// {
					// 	title: "纪念者",
					// 	dataIndex: "memoryName",
					// 	width: 120
					// },
					{
						title: "是否显示",
						dataIndex: "",
						width: 120,
						align: "center",
						scopedSlots: {
							customRender: "status"
						}
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center",
						width: 170
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
				showInfoMsgAdd: false
			};
		},
		mounted() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.visible = true;
				if (this.memoryInfo) {
					this.pagination.memoryId = this.memoryInfo.id
				}
				this.getList();
			},
			changeStatus() {
				this.onSearch();
			},
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
				memoryMsgList(pagination).then(res => {
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
					title: "确定要修改显示状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var status = record.status === "0" ? "1" : "0";
						setMemoryMsgStatus({
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
				this.showInfoMsgAdd = true
			},
			infoMsgAddClose(res){
				if(res.code === 0){
					this.onSearch();
				}
				this.$nextTick(()=>{
					this.showInfoMsgAdd = false
				})
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
						delMemoryMsg({
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
			onClose() {
				this.visible = false;
				this.$emit("onClose");
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
