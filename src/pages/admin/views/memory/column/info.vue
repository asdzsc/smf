<template>
	<a-drawer :title="title" width="50%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-model-item label="上级栏目">
				<a-tree-select style="width: 100%" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" :treeData="treeData"
				 placeholder="请选择上级栏目" v-model="model.pid">
				</a-tree-select>
			</a-form-model-item>
			<a-form-model-item label="图片" class="formItemAvatar">
				<imgsUpload ref="imgsUpload" :count="1" :multiple="false" @change="changeUpload" @remove="removeUpload"></imgsUpload>
				<div class="remark">
					推荐尺寸为：1920 x 420，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>
			<a-form-model-item label="链接">
				<a-input v-model="model.url" placeholder="请输入跳转链接" />
			</a-form-model-item>
			<a-form-model-item label="手机图片" class="formItemAvatar">
				<imgsUpload ref="imgsUpload2" :count="1" :multiple="false" @change="changeUpload2" @remove="removeUpload2"></imgsUpload>
				<div class="remark">
					推荐尺寸为：750 x 400，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>
			<a-form-model-item label="移动端链接">
				<a-input v-model="model.phoneUrl" placeholder="请输入移动端跳转链接" />
			</a-form-model-item>
			<a-form-model-item label="栏目名称">
				<a-input v-model="model.name" placeholder="请输入栏目名称" />
			</a-form-model-item>
			<a-form-model-item label="状态">
				<a-switch checkedChildren="显示" unCheckedChildren="隐藏" :checked="model.status === '0' ? true : false" @change="setStatus()" />
			</a-form-model-item>
			<a-form-model-item label="排序">
				<a-input-number :min="0" v-model="model.sortId" />
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
		getMemoryColumnList,
		getMemoryColumnInfo,
		saveMemoryColumnInfo
	} from "@/pages/admin/api/memory/column";
	import * as utils from "@/pages/admin/libs/utils";
	export default {
		components: {
			imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload")
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			pid: {
				type: String,
				default: "0"
			}
		},
		data() {
			return {
				visible: false,
				title: "",
				model: {
					id: "",
					pid: "0",
					img: '',
					url: '',
					phoneImg: '',
					phoneUrl: '',
					name: "",
					status: "0",
					sortId: 0
				},
				treeData: []
			};
		},
		activated() {},
		mounted() {
			this.model.id = this.id;
			this.model.pid = this.pid || "0";
			this.loadData();
		},
		methods: {
			loadData() {
				this.getModule();
				this.visible = true;
				this.title = this.model.id ? "编辑纪念馆栏目" : "添加纪念馆栏目";
				if (this.model.id) {
					getMemoryColumnInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							this.bindData()
						}
					});
				}
			},
			getModule() {
				getMemoryColumnList({}).then(res => {
					if (res.code === 0) {
						this.treeData = res.data.treeData;
						this.treeData.splice(0, 0, {
							id: "0",
							key: "0",
							value: "0",
							pid: "-1",
							title: "顶级栏目",
							name: "顶级栏目"
						});
					}
				});
			},
			bindData() {
				var vm = this
				this.$nextTick(() => {
					setTimeout(() => {
						if (this.model.img) {
							var uid = utils.getId();
							var imgsList = [{
								uid: uid,
								name: uid,
								status: "done",
								imgUrl: this.model.img,
								url: process.env.VUE_APP_BASE_URL + this.model.img
							}];
							this.$refs.imgsUpload.setFileList(imgsList);
						}
						if (this.model.phoneImg) {
							var uid = utils.getId();
							var imgsList = [{
								uid: uid,
								name: uid,
								status: "done",
								imgUrl: this.model.phoneImg,
								url: process.env.VUE_APP_BASE_URL + this.model.phoneImg
							}];
							this.$refs.imgsUpload2.setFileList(imgsList);
						}
					}, 200)
				})
			},
			//上传成功事件
			changeUpload(file) {
				this.model.img = file.imgUrl;
			},
			removeUpload(file) {
				this.model.img = '';
			},
			changeUpload2(file) {
				this.model.phoneImg = file.imgUrl;
			},
			removeUpload2(file) {
				this.model.phoneImg = '';
			},
			setStatus() {
				this.model.status = this.model.status === "0" ? "1" : "0";
			},
			onSubmit() {
				saveMemoryColumnInfo(this.model).then(res => {
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
