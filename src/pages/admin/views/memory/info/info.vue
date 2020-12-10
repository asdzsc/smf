<template>
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<div class="form">
			<a-row type="flex" class="formRow" style="margin-bottom: 0px;">
				<a-col class="lable">
					头像照片
				</a-col>
				<a-col class="text">
					<avatarUpload ref="photoUpload" @change="uploadPhoto"></avatarUpload>
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					主页类型
				</a-col>
				<a-col class="text">
					<a-select v-model="model.memoryType" style="width: 350px;" placeholder="请选择主页类型">
						<a-select-option value="0">
							普通主页
						</a-select-option>
						<a-select-option value="1">
							名人主页
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					所属类别
				</a-col>
				<a-col class="text">
					<a-select v-model="model.columnIdsKey" @change="changeColumnIds" style="width: 350px;" placeholder="请选择所属类别">
						<a-select-option value="">
							请选择所属类别
						</a-select-option>
						<a-select-option v-for="item in columnList" :key="item.id" :value="item.id">
							{{ item.name }}
						</a-select-option>
					</a-select>
				</a-col>
				<a-col class="lable">
					所属模版
				</a-col>
				<a-col class="text">
					<a-select v-model="model.templateId" style="width: 350px;" placeholder="请选择所属模版">
						<a-select-option v-for="item in templateList" :key="item.id" :value="item.id">
							{{ item.title }}
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					人物姓名
				</a-col>
				<a-col class="text">
					<a-input v-model="model.name" placeholder="请输入人物姓名" style="width: 350px;" />
				</a-col>
				<a-col class="lable">
					人物性别
				</a-col>
				<a-col class="text">
					<a-select v-model="model.gender" style="width: 350px;" placeholder="请选择性别">
						<a-select-option value="男">
							男
						</a-select-option>
						<a-select-option value="女">
							女
						</a-select-option>
					</a-select>
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					出生时间
				</a-col>
				<a-col class="text">
					<a-date-picker v-model="model.birthdayDate" placeholder="请选择出生时间" @change="changeBirthdayDate" style="width:350px;"
					 inputReadOnly />
				</a-col>
				<a-col class="lable">
					离世时间
				</a-col>
				<a-col class="text">
					<a-date-picker v-model="model.dieTimeDate" placeholder="请选择离世时间" @change="changeDieTimeDate" style="width:350px;"
					 inputReadOnly />
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					出生城市
				</a-col>
				<a-col class="text">
					<a-input v-model="model.birthdayAddress" placeholder="请输入出生城市" style="width: 350px;" />
				</a-col>
				<a-col class="lable">
					离世城市
				</a-col>
				<a-col class="text">
					<a-input v-model="model.dieAddress" placeholder="请输入离世城市" style="width: 350px;" />
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					安葬墓址
				</a-col>
				<a-col class="text">
					<a-input v-model="model.buryAddress" placeholder="请输入安葬墓址" style="width: 350px;" />
				</a-col>
				<a-col class="lable">
					墓志铭
				</a-col>
				<a-col class="text">
					<a-input v-model="model.epitaph" placeholder="请输入墓志铭" style="width: 350px;" />
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					是否公开
				</a-col>
				<a-col class="text">
					<a-switch checkedChildren="公开" unCheckedChildren="不公开" :checked="model.status === '0' ? true : false" @change="setStatus()" />
				</a-col>
				<a-col class="lable">
					绑定手机号
				</a-col>
				<a-col class="text">
					<template v-for="(tag, index) in model.mobiles">
						<a-tag :key="tag" closable @close="delMobile($event,tag)">
							{{ tag }}
						</a-tag>
					</template>
					<a-input v-if="inputMobileVisible" ref="inputMobile" type="text" size="small" :style="{ width: '78px' }" :value="inputMobileValue"
					 @change="handleInputMobileChange" @blur="handleInputMobileConfirm" @keyup.enter="handleInputMobileConfirm" />
					<a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInputMobile">
						<a-icon type="plus" />添加手机号
					</a-tag>
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					排序
				</a-col>
				<a-col class="text">
					<a-input-number :min="0" v-model="model.sortId" />
				</a-col>
				<a-col class="lable">
					到期时间
				</a-col>
				<a-col class="text">
					<a-date-picker v-model="model.expireTimeDate" placeholder="请选择到期时间" @change="changeExpireTimeDate" style="width:350px;"
					 inputReadOnly />
				</a-col>
			</a-row>

			<a-row type="flex" class="formRow">
				<a-col class="lable">
					人物简介
				</a-col>
				<a-col class="text" style="width:850px;">
					<a-textarea v-model="model.intro" placeholder="请输入商品简介" :rows="5" style="width:850px;" />
				</a-col>
			</a-row>
			<a-row type="flex" class="formRow">
				<a-col class="lable">
					人物介绍
				</a-col>
				<a-col class="text" style="width:850px;">
					<script id="mempryEditor" type="text/plain" style="width:100%;height:500px;"></script>
				</a-col>
			</a-row>
		</div>

		<div style="height:50px;"></div>
		<div class="submit-cont">
			<a-button type="primary" @click="onSubmit">确定</a-button>
			<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
		</div>
	</a-drawer>
</template>
<script>
	import {
		getMemoryInfo,
		saveMemoryInfo
	} from "@/pages/admin/api/memory/memory";
	import {
		getMemoryColumnList
	} from "@/pages/admin/api/memory/column";
	import {
		getGoodsList
	} from "@/pages/admin/api/shop/goods";
	import * as utils from "@/pages/admin/libs/utils";
	import moment from "moment";

	export default {
		components: {
			avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload"),
			imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload")
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				visible: false,
				title: "",
				columnList: [],
				templateList: [],
				inputMobileVisible: false,
				inputMobileValue: '',
				ue: null,
				model: {
					id: "",
					columnIdsKey: '',
					columnIds: [], //类别
					name: '', //姓名
					gender: '', //性别
					photo: '', //头像照片
					birthdayDate: null,
					birthday: '', //生日
					dieTimeDate: null,
					dieTime: '', //离世日期
					birthdayAddress: '', //出生城市
					dieAddress: '', //离世城市
					intro: '', //简介
					cont: '', //图文简介
					epitaph: '', //墓志铭
					cover: '', //封面图
					phoneCover: '', //手机封面图
					bg: '', //背景
					phoneBg: '', //手机背景
					buryAddress: '', //安装地址
					templateId: '', //模版id
					activateCode: '', //激活码
					mobiles: [], //手机号
					status: '0', //显示状态 0显示 1影藏
					memoryType: '0', //0普通用户 1名人主页
					sortId: 0, //排序 降序
					expireTimeDate: null,
					expireTime: '' //到期时间
				}
			}
		},
		mounted() {
			this.visible = true;
			this.title = this.id === "" ? "添加个人主页" : "编辑个人主页";
			this._getMemoryColumnList()
			this._getGoodsList()
			this.loadData()
		},
		methods: {
			loadData() {
				if (this.id) {
					this.model.id = this.id;
					getMemoryInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							if (this.model.columnIds && this.model.columnIds.length > 0) {
								this.model.columnIdsKey = this.model.columnIds[0]
							}
							this.model.templateId = this.model.templateId || ''

							if (this.model.birthday) {
								this.model.birthdayDate = moment(this.model.birthday);
							}
							if (this.model.dieTime) {
								this.model.dieTimeDate = moment(this.model.dieTime);
							}
							if (this.model.expireTime) {
								this.model.expireTimeDate = moment(this.model.expireTime);
							}

						}
						this.bindData();
					});
				} else {
					// this.model.publishTimeDate = moment();
					this.bindData();
				}
			},
			bindData() {
				var vm = this;
				vm.model.cont = vm.model.cont || "";
				this.$nextTick(() => {
					setTimeout(() => {
						window.UE.delEditor("mempryEditor");
						this.ue = window.UE.getEditor("mempryEditor");
						this.ue.addListener("ready", function() {
							vm.ue.setContent(vm.model.cont);
						});
						this.$refs.photoUpload.loadData(this.model.photo);
					}, 200)
				});
			},
			uploadPhoto(imgUrl) {
				this.model.photo = imgUrl;
			},
			//选择所属类别
			changeColumnIds(value, label, extra) {
				this.model.columnIds = [value];
			},
			//选择出生时间
			changeBirthdayDate(date, dateString) {
				this.model.birthdayDate = date;
				this.model.birthday = dateString;
			},
			//选择离世日期
			changeDieTimeDate(date, dateString) {
				this.model.dieTimeDate = date;
				this.model.dieTime = dateString;
			},
			//选择到期时间
			changeExpireTimeDate(date, dateString) {
				this.model.expireTimeDate = date;
				this.model.expireTime = dateString;
			},
			//是否公开
			setStatus() {
				this.model.status = this.model.status === "0" ? "1" : "0";
			},
			showInputMobile() {
				this.inputMobileVisible = true;
				this.$nextTick(function() {
					this.$refs.inputMobile.focus();
				});
			},
			handleInputMobileChange(e) {
				this.inputMobileValue = e.target.value;
			},
			handleInputMobileConfirm() {
				const inputValue = this.inputMobileValue;
				let tags = this.model.mobiles;
				if (inputValue && tags.indexOf(inputValue) === -1) {
					tags = [...tags, inputValue];
				}
				this.model.mobiles = tags
				this.inputMobileVisible = false;
				this.inputMobileValue = ''
			},
			//删除手机号
			delMobile(e, mobile) {
				e.preventDefault();
				var vm = this
				this.$confirm({
					title: "确定要删除该手机号吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						vm.model.mobiles = vm.model.mobiles.filter(x => {
							return x !== mobile
						})
					},
					onCancel() {}
				});
			},
			_getMemoryColumnList() {
				getMemoryColumnList({
					status: '0'
				}).then(res => {
					if (res.code === 0) {
						this.columnList = res.data.list
					}
				})
			},
			//获取模版商品
			_getGoodsList() {
				// 491858670354509824
				getGoodsList({
					"current": 1,
					"pageSize": 99,
					"goodsType": "3",
					"status": "1",
					"searchText": "",
					"columnId": ""
				}).then(res => {
					if (res.code === 0) {
						this.templateList = res.data.list
						this.templateList.unshift({
							id: '',
							title: '免费模版'
						});
					}
				})
			},
			onSubmit() {
				this.model.cont = this.ue.getContent();
				saveMemoryInfo(this.model).then(res => {
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

	.remark {
		color: #ccc;
		font-size: 12px;
	}

	.form {
		.formRow {
			margin-bottom: 10px;

			.lable {
				width: 150px;
				line-height: 36px;
				text-align: right;
				padding-right: 10px;
			}

			.text {
				line-height: 36px;
				width: 350px;
			}
		}
	}

	.submit-cont {
		position: fixed;
		bottom: 10px;
		background-color: #ffffff;
		z-index: 9999;
		width: 71%;
		border: 1px solid #eeeeee;
		text-align: center;
		padding: 10px;
	}
</style>
