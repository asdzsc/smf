<template>
	<a-drawer :title="title" width="50%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-model-item label="图片" class="formItemAvatar">
				<avatar-upload ref="avatarUpload" :isThumbnails="false" @change="upload"></avatar-upload>
				<div class="remark">
					推荐尺寸为：1920 x 420，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>
			<a-form-model-item label="手机图片" class="formItemAvatar">
				<avatar-upload ref="avatarUpload2" :isThumbnails="false" @change="upload2"></avatar-upload>
				<div class="remark">
					推荐尺寸为：750 x 400，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>
			<a-form-model-item label="标题">
				<a-input v-model="model.title" placeholder="请输入标题" />
			</a-form-model-item>
			<a-form-model-item label="链接">
				<a-input v-model="model.url" placeholder="请输入跳转链接" />
			</a-form-model-item>
			<a-form-model-item label="手机链接">
				<a-input v-model="model.phoneUrl" placeholder="请输入手机跳转链接" />
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
		getShopBannerInfo,
		saveShopBanner
	} from "@/pages/admin/api/shop/shopbanner";

	export default {
		name: "livebanner-info",
		components: {
			avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
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
				model: {
					id: "",
					title: "",
					img: "",
					url: "",
					phoneImg: "",
					phoneUrl: '',
					sortId: 0
				}
			};
		},
		mounted() {
			this.model.id = this.id;
			this.loadData();
		},
		methods: {
			upload(imgUrl) {
				this.model.img = imgUrl;
			},
			upload2(imgUrl) {
				this.model.phoneImg = imgUrl;
			},
			loadData() {
				this.visible = true;
				this.title = this.model.id ? "编辑商城轮播图" : "添加商城轮播图";
				if (this.model.id) {
					getShopBannerInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);

							this.bindData();
						}
					});
				} else {
					this.bindData();
				}
			},
			bindData() {
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.avatarUpload.loadData(this.model.img);
						this.$refs.avatarUpload2.loadData(this.model.phoneImg);
					}, 200);
				});
			},
			onSubmit() {
				saveShopBanner(this.model).then(res => {
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
