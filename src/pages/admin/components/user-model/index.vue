<template>
	<a-modal :title="showUser ? '选择用户' : '选择部门'" v-model="visible" width="660px" :bodyStyle="{ padding: '0px' }" @ok="handleOk">
		<a-row>
			<a-col :span="12" class="cont" style="border-right:1px solid #ddd;">
				<div class="search-cont">
					<a-input-search v-model="searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch" enterButton />
				</div>
				<div class="anchor-tree">
					<template v-if="showTree">
						<a-tree :treeData="treeData" :selectedKeys="selectedKeys" @select="onSelectTree" show-icon multiple>
							<a-icon slot="folder" type="folder" />
							<a-icon slot="user" type="user" />
						</a-tree>
					</template>
					<template v-else>
						<a-row v-if="showUser" v-for="item in searchList" :key="item.id" class="search-item" :class="{ activity: searchActivity(item) }">
							<a-col :span="12" class="left" @click="onSearchCheck(item)">
								<a-icon type="user" />
								{{ item.name }}</a-col>
							<a-col :span="12" class="right" @click="onSearchCheck(item)">
								{{ item.departmentName }}
							</a-col>
						</a-row>
						<a-row v-else v-for="item in searchList" :key="item.id" class="search-item" :class="{ activity: searchActivity(item) }">
							<a-col :span="24" class="left" @click="onSearchCheck(item)">
								<a-icon type="folder" />
								{{ item.name }}</a-col>
						</a-row>
						<div v-if="searchList.length === 0" style="text-align: center; padding-top: 50px;">
							暂无数据
						</div>
					</template>
				</div>
			</a-col>
			<a-col :span="12" class="cont" style="overflow: auto;">
				<div class="check-title">
					已选择的信息
				</div>
				<div class="check-list">
					<a-row v-for="item in checkedList" :key="item.id" class="check-item">
						<a-col :span="18">
							<a-icon v-if="item.treeType === 'dept'" type="folder" />
							<a-icon v-if="item.treeType === 'user'" type="user" />
							{{ item.title }}</a-col>
						<a-col :span="6" style="text-align: right;">
							<a-icon @click="delCheckedItem(item)" type="delete" class="del" />
						</a-col>
					</a-row>
				</div>
			</a-col>
		</a-row>
	</a-modal>
</template>

<script>
	import {
		getSysDeptTree,
		getDeptList
	} from "@/pages/admin/api/sys/sysdept";
	import {
		getLiveUserList
	} from "@/pages/admin/api/live/liveuser";
	export default {
		name: "user-modal",
		props: {
			//是否多选
			multiple: {
				type: Boolean,
				default () {
					return true
				}
			},
			deptType: {
				type: String,
				default () {
					return "1"
				}
			},
			showUser: {
				type: Boolean,
				default () {
					return false
				}
			},
			userType: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				visible: false,
				showTree: true,
				treeData: [],
				selectedKeys: [],
				loading: false,
				searchText: "",
				searchList: [],
				checkedList: []
			};
		},
		mounted() {},
		methods: {
			_getSysDeptTree() {
				getSysDeptTree({
					showUser: this.showUser,
					deptType: this.deptType,
					userType: this.userType
				}).then(res => {
					if (res.code === 0) {
						this.treeData = res.data.treeData;
					}
				});
			},
			// eslint-disable-next-line no-unused-vars
			onSelectTree(selectedKeys, event) {
				var item = event.node;
<<<<<<< HEAD

				if (this.showUser) {
					if (item.value.indexOf("user_") >= 0) {
=======
				
				if (this.showUser) {
					if (item.value.indexOf("user_") >= 0){
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
						//选择用户
						var id = item.value.replace(new RegExp("user_", "gm"), "");
						this.setCheckedItem(id, 'user', item.title);
					}
				} else {
					this.setCheckedItem(item.value, 'dept', item.title);
				}
			},
			onSearch() {
				if (this.searchText) {
					this.showTree = false;
				} else {
					this.showTree = true;
				}
				if (this.searchText) {
					this.loading = true;
					this.searchList = [];
					if (this.showUser) {
						getLiveUserList({
							deptId: "0", //默认选中部门
							userType: this.userType, //用户类型 主播用户
							searchText: this.searchText,
							current: 1,
							pageSize: 50
						}).then(res => {
							this.loading = false;
							if (res.code === 0) {
								this.searchList = res.data.list;
							}
						});
					} else {
						getDeptList({
							deptType: this.deptType,
							searchText: this.searchText,
							current: 1,
							pageSize: 50
						}).then(res => {
							this.loading = false;
							if (res.code === 0) {
								this.searchList = res.data.list;
							}
						});
					}
				}
			},
			//搜索结果中标记出已经选中的数据
			searchActivity(item) {
				var query = this.checkedList.filter(x => {
					return x.id === item.id;
				});
				if (query.length > 0) {
					return true;
				} else {
					return false;
				}
			},
			//搜索结果点击选中
			onSearchCheck(item) {
				if (this.showUser) {
					this.setCheckedItem(item.id, 'user', item.name);
				} else {
					this.setCheckedItem(item.id, 'dept', item.name);
				}
				this.searchText = "";
				this.showTree = true;
			},
			//设置选中
			setCheckedItem(id, treeType, title) {
				var treeKey = id
				if (treeType === 'user') {
					treeKey = 'user_' + id
				}
				var query = this.checkedList.filter(x => {
					return x.id === id;
				});
				if (query.length > 0) {
					this.checkedList = this.checkedList.filter(x => {
						return x.id !== id;
					});
					this.selectedKeys = this.selectedKeys.filter(x => {
						return x !== treeKey;
					});
				} else {
					this.checkedList.push({
						id: id,
						treeType: treeType,
<<<<<<< HEAD
						title: title,
						name: title
=======
						title: title
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
					});
					this.selectedKeys.push(treeKey);
				}
				if (!this.multiple) {
					//单选
					if (this.checkedList.length > 1) {
						this.checkedList.splice(0, this.checkedList.length - 1);
						this.selectedKeys.splice(0, this.selectedKeys.length - 1);
					}
				}
			},
			//删除选中项目
			delCheckedItem(item) {
				var treeKey = item.id
				if (item.treeType === 'user') {
					treeKey = 'user_' + item.id
				}
				this.checkedList = this.checkedList.filter(x => {
					return x.id !== item.id;
				});
				this.selectedKeys = this.selectedKeys.filter(x => {
					return x !== treeKey;
				});
			},
			loadData(checkedList) {
				this.selectedKeys = [];
				this.checkedList = [];
				if (checkedList) {
					this.checkedList = checkedList;
					checkedList.forEach(item => {
						this.selectedKeys.push(item.treeType + "_" + item.id);
					});
				}
				this._getSysDeptTree();
				this.visible = true;
			},
			handleOk() {
				this.$emit("return", this.checkedList);
				this.visible = false;
			}
		}
	};
</script>

<style lang="less" scoped>
	.cont {
		height: 500px;

		.search-cont {
			padding: 10px;
		}

		.anchor-tree {
			height: 448px;
			overflow: auto;

			.search-item {
				padding: 5px 10px;
				cursor: pointer;

				&:hover {
					background-color: #e6f7ff;
				}

				&.activity {
					background-color: #bae7ff;
				}

				.left {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					word-break: break-all;
				}

				.right {
					text-align: right;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					word-break: break-all;
				}
			}
		}

		.check-title {
			height: 52px;
			line-height: 52px;
			padding-left: 10px;
		}

		.check-list {
			height: 448px;
			overflow: auto;

			.check-item {
				padding: 5px 10px;

				.del {
					color: #ff7875;
					cursor: pointer;
				}
			}
		}
	}
</style>
