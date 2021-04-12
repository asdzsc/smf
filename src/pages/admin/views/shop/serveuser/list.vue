<template>
	<a-card>
		<a-row>
			<a-col :span="4">
				<a-tree :treeData="treeData" :expandedKeys="expandedKeys" @expand="onExpandTree" @select="onSelectTree" />
			</a-col>
			<a-col :span="20">
				<div class="operator">
					<a-row type="flex" justify="start">
						<a-col style="padding-right:10px;">
<<<<<<< HEAD
							<a-button @click="_syncOrgUser()" type="primary" icon="sync">同步组织架构</a-button>
							&nbsp;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
						<template slot="avatar" slot-scope="record">
							<img :src="getAvatar(record)" :onerror="defImg" :style="{ width: '40px', height: '40px' }" />
						</template>
						<template slot="gender" slot-scope="record">
							{{ getSex(record) }}
						</template>
						<template slot="isLead" slot-scope="record">
							{{ record === '1' ? '是' : '否' }}
						</template>
						<template slot="status" slot-scope="record">
							<a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="record.status === '0' ? true : false" @change="setStatus(record)" />
						</template>
						<template slot="action" slot-scope="record">
							<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
							&nbsp;
							<a-button title="删除" icon="delete" shape="round" type="danger" size="small" :disabled="record.adminType === 'sys' ? true : false"
							 @click="del([record.id])" />
						</template>
					</a-table>
					<user-info v-if="showInfo" :id="infoId" ref="userInfo" @onClose="userInfoClose"></user-info>
				</div>
			</a-col>
		</a-row>
	</a-card>
</template>

<script>
	import {
		getLiveUserList,
		setLiveUserStatus,
		delLiveUser
	} from "@/pages/admin/api/live/liveuser";
	import {
		getSysDeptTree
	} from "@/pages/admin/api/sys/sysdept";
<<<<<<< HEAD
	import {
		syncOrgUser
	} from "@/pages/admin/api/smferp";
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

	export default {
		name: "user-list",
		components: {
			userInfo: () => import("@/pages/admin/views/shop/serveuser/info")
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
					deptId: "0", //默认选中部门
					userType: "3", //用户类型 服务用户
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
						title: "头像",
						dataIndex: "avatar",
						scopedSlots: {
							customRender: "avatar"
						},
						align: "center",
						width: 100
					},
					{
						title: "帐号",
						dataIndex: "username"
					},
					{
						title: "姓名",
						dataIndex: "name"
					},
					{
						title: "性别",
						dataIndex: "gender",
						scopedSlots: {
							customRender: "gender"
						},
						align: "center",
						width: 100
					},
					{
						title: "部门",
						dataIndex: "departmentName"
					},
					{
						title: "部门负责人",
						dataIndex: "isLead",
						scopedSlots: {
							customRender: "isLead"
						},
						align: "center",
						width: 100
					},
					{
						title: "手机号",
						dataIndex: "mobile"
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
					// {
					// 	title: "注册日期",
					// 	dataIndex: "createDate",
					// 	align: "center",
					// 	width: 150
					// },
					{
						title: "操作",
						dataIndex: "",
						width: 150,
						align: "center",
						scopedSlots: {
							customRender: "action"
						}
					}
				],
				showInfo: false,
				infoId: ''

			};
		},
		mounted() {
			this.getDeptList();
			this.getList();
		},
		methods: {
			getDeptList() {
				getSysDeptTree({
					showUser: false,
					deptType: '1' //服务部门
				}).then(res => {
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
				this.pagination.deptId = event.node.value;
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
				getLiveUserList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			getAvatar(record) {
				if (record) {
					if (record.indexOf("http") >= 0) {
						return record;
					} else {
						return this.baseUrl + record;
					}
				} else {
					return "/img/admin/usernull.png";
				}
			},
			getSex(record) {
				if (record === "1") {
					return "男";
				} else if (record === "2") {
					return "女";
				} else {
					return "未知";
				}
			},
			setStatus(record) {
				this.$confirm({
					title: "确定要修改帐号状态吗?",
					content: "",
					onOk() {
						var status = record.status === "0" ? "1" : "0";
						setLiveUserStatus({
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
				this.infoId = ''
				this.showInfo = true
			},
			edit(record) {
				this.infoId = record.id
				this.showInfo = true
			},
			userInfoClose(res) {
				this.$nextTick(() => {
					this.showInfo = false
				})
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
						delLiveUser({
							ids: list
						}).then(res => {
							if (res.code === 0) {
								vm.onSearch();
							}
						});
					},
					onCancel() {}
				});
<<<<<<< HEAD
			},
			_syncOrgUser() {
				syncOrgUser().then(res => {
					if (res.code === 0) {
						this.$notification.success({
							message: "提示",
							description: "数据同步将在后台运行..."
						});
					}
				})
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			}
		}
	};
</script>

<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}
</style>
