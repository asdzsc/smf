<template>
	<div>
		<a-upload name="file" listType="picture-card" accept="image/*" :headers="headers" :data="formData" :action="uploadUrl"
		 :beforeUpload="beforeUpload" @change="handleChange" :file-list="fileList" @preview="handlePreview" :remove="remove"
		 :multiple="multiple">
			<div v-if="isUpload">
				<a-icon :type="loading ? 'loading' : 'plus'" />
				<div class="ant-upload-text">
					上传图片
				</div>
			</div>
		</a-upload>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" style="top: 10px;" :width="width">
			<img alt="example" style="width: 100%" :src="previewImage" />
		</a-modal>
	</div>
</template>
<script>
	import * as utils from "@/pages/admin/libs/utils";
	export default {
		name: "imgs-upload",
		props: {
			count: {
				type: Number,
				default: 14
			},
			multiple: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
				headers: {
					token: this.$store.state.adminAccount.token || ''
				},
				formData: {
					isThumbnails: true
				},
				imageUrl: "",
				loading: false,
				fileList: [],
				previewVisible: false,
				previewImage: "",
				width: 520
			};
		},
		computed: {
			isUpload() {
				return this.fileList.length < this.count
			}
		},
		watch: {
			previewImage() {
				this.imgWH();
			}
		},
		created() {},
		mounted() {},
		methods: {
			setFileList(fileList) {
				this.fileList = fileList;
			},
			handleChange(info) {
				this.fileList = info.fileList;
				if (info.file.status === "uploading") {
					this.loading = true;
					return;
				}
				if (info.file.status === "done") {
					this.loading = false;
					var res = info.file.response;
					if (res.code === 0) {
						info.file.url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
						info.file.imgUrl = res.uploadUrl;
						var query = this.fileList.filter(x => x.uid == info.file.uid);
						if (query.length > 0) {
							query[0].url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
							query[0].imgUrl = res.uploadUrl;
							this.$emit("change", query[0])
						}
					}
				}
			},
			beforeUpload(file) {
				const isLt4M = file.size / 1024 / 1024 < 4;
				if (!isLt4M) {
					this.$message.error("上传图片不能大于4MB");
				}
				return isLt4M;
			},
			remove(file) {
				console.log('remove', file)
				this.$emit("remove", file)
			},
			async handlePreview(file) {
				if (!file.url && !file.preview) {
					file.preview = await utils.getBase64(file.originFileObj);
				}
				this.previewImage = file.url || file.preview;
				this.previewVisible = true;
			},
			handleCancel() {
				this.previewVisible = false;
			},
			imgWH() {
				if (this.previewImage) {
					var img_url = this.getImg(this.previewImage);
					var img = new Image();
					img.src = img_url;
					if (img.complete) {
						this.width = img.width > 1000 ? 1000 : img.width;
					} else {
						img.onload = () => {
							// 打印
							this.width = img.width > 1000 ? 1000 : img.width;
						};
					}
				}
			},
			getImg(imgUrl) {
				if (imgUrl) {
					if (imgUrl.indexOf("http") >= 0) {
						return imgUrl;
					} else {
						return process.env.VUE_APP_BASE_URL + imgUrl;
					}
				} else {
					return "/img/zwtp.jpg";
				}
			},
			getFileList() {
				return this.fileList;
			}
		}
	};
</script>

<style lang="less" scoped></style>
