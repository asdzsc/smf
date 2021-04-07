<template>
	<a-drawer :title="title" width="50%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-model-item label="头像" class="formItemAvatar">
				<avatar-upload ref="avatarUpload" @change="upload"></avatar-upload>
			</a-form-model-item>
			<a-form-model-item label="用户名">
				<a-input v-model="model.username" :disabled="model.id ? true : false" placeholder="请输入用户名" />
			</a-form-model-item>
			<a-form-model-item label="姓名">
				<a-input v-model="model.name" placeholder="请输入姓名" />
			</a-form-model-item>
			<a-form-model-item label="密码">
				<a-input v-model="model.password" :placeholder="model.id ? '无需修改密码请为空' : '请输入密码'" type="password" autocomplete />
			</a-form-model-item>
			<a-form-model-item label="手机号">
				<a-input v-model="model.mobile" placeholder="请输入手机号" />
			</a-form-model-item>
			<a-form-model-item label="性别">
				<a-select v-model="model.genderKey" @change="changeSex" labelInValue style="width: 120px">
					<a-select-option value="1">男</a-select-option>
					<a-select-option value="2">女</a-select-option>
					<a-select-option value="0">未知</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="部门">
				<a-tree-select style="width: 100%" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" :treeData="treeData"
				 placeholder="请选择上级菜单" v-model="model.department" multiple treeNodeFilterProp="title">
				</a-tree-select>
			</a-form-model-item>
			<a-form-model-item label="部门负责人">
				<a-select v-model="model.isLeadKey" @change="changeLead" labelInValue style="width: 120px">
					<a-select-option value="1">是</a-select-option>
					<a-select-option value="0">否</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="个人微信二维码" class="formItemAvatar">
				<avatar-upload ref="wxQrcodeUpload" @change="uploadWxQrcode"></avatar-upload>
			</a-form-model-item>
			<a-form-model-item label="状态">
				<a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="model.status === '0' ? true : false" @change="setStatus()" />
			</a-form-model-item>

			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">
					确定
				</a-button>
				<a-button @click="onClose" style="margin-left: 10px;">
					取消
				</a-button>
			</a-form-model-item>
		</a-form-model>
	</a-drawer>
</template>

<script>
	import {
		getSysDeptTree
	} from "@/pages/admin/api/sys/sysdept";
	import {
		getLiveUserInfo,
		saveLiveUserInfo
	} from "@/pages/admin/api/live/liveuser";

	export default {
		name: "anchor-info",
		props: {
			id: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				visible: false,
				title: "",
				model: {
					id: "",
					avatar: "",
					username: "",
					name: "",
					password: "",
					department: [],
					isLead: '0', //部门负责人
					isLeadKey: {
						key: '0'
					},
					gender: "0",
					genderKey: {
						key: "0"
					},
					mobile: "",
					status: "0",
					userType: "3", //服务用户
					wxQrcode: '' //个人微信二维码
				},
				treeData: []
			};
		},
		components: {
			avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
		},
		activated() {
			// this.getModule();
		},
		mounted() {
			this.loadData();
		},
		methods: {
			getDeptList() {
				getSysDeptTree({
					showUser: false,
					deptType: '1', //服务部门 
				}).then(res => {
					if (res.code === 0) {
						this.treeData = res.data.treeData;
					}
				});
			},
			loadData() {
				this.visible = true;
				this.getDeptList();
				if (this.id) {
					this.title = '编辑用户';
					getLiveUserInfo({
						id: this.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							var gender = this.model.gender ? this.model.gender : "0";
							this.model.genderKey = {
								key: gender
							};
							var isLead = this.model.isLead ? this.model.isLead : "0";
							this.model.isLeadKey = {
								key: isLead
							};

							this.$nextTick(() => {
								this.$refs.avatarUpload.loadData(this.model.avatar);
								this.$refs.wxQrcodeUpload.loadData(this.model.wxQrcode);
							})
						}
					});
				} else {
					this.title = '添加用户';
				}
			},
			upload(imgUrl) {
				this.model.avatar = imgUrl;
			},
			uploadWxQrcode(imgUrl){
				this.model.wxQrcode = imgUrl;
			},			
			changeSex(value) {
				this.model.gender = value.key;
			},
			//部门负责人
			changeLead(value) {
				this.model.isLead = value.key;
			},
			setStatus() {
				this.model.status = this.model.status === "0" ? "1" : "0";
			},
			onSubmit() {
				saveLiveUserInfo(this.model).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.onClose(res);
					}
				});
			},
			onClose(res) {
				this.visible = false;
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.formItemAvatar {
		/deep/ .ant-form-item-control {
			line-height: 0px;
		}
	}
</style>
