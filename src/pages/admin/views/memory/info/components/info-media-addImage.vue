<template>
	<a-modal title="上传照片" v-model="visible" width="600px" :bodyStyle="{ padding: '10px',minHeight:'400px' }" @cancel="onClose"
	 @ok="handleOk">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item label="照片" class="formItemAvatar">
				<imgsUpload ref="imgsUpload" :count="1" :multiple="false" @change="changeUpload" @remove="removeUpload"></imgsUpload>
			</a-form-model-item>
			<a-form-model-item label="标题">
				<a-input v-model="model.title" placeholder="请输入附件标题" style="width:400px;" />
			</a-form-model-item>
			<a-form-model-item label="简介">
				<a-textarea v-model="model.cont" placeholder="请输入附件简介" :rows="5" style="width:400px;" />
			</a-form-model-item>
			<a-form-model-item label="排序">
				<a-input-number :min="0" v-model="model.sortId" />
			</a-form-model-item>
		</a-form-model>

	</a-modal>
</template>
<script>
	import {
		getMemoryMedia,
		saveMemoryMedia
	} from "@/pages/admin/api/memory/memory";
	import * as utils from "@/pages/admin/libs/utils";
	export default {
		components: {
			imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload")
		},
		props: {
			id: {
				type: String,
				default () {
					return ""
				}
			},
			memoryId: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				visible: false,
				title: '',
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				model: {
					id: '',
					memoryId: '',
					title: '',
					cont: '',
					cover: '',
					url: '',
					mediaType: 'image',
					sortId: 0
				}
			};
		},
		mounted() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.visible = true;
				this.model.id = this.id
				this.model.memoryId = this.memoryId
				if (this.model.id) {
					getMemoryMedia({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data)
							this.bindData()
						}
					})
				}
			},
			bindData() {
				var vm = this
				this.$nextTick(() => {
					setTimeout(() => {
						if (this.model.url) {
							var uid = utils.getId();
							var imgsList = [{
								uid: uid,
								name: this.model.title,
								status: "done",
								imgUrl: this.model.url,
								url: process.env.VUE_APP_BASE_URL + this.model.url
							}];
							this.$refs.imgsUpload.setFileList(imgsList);
						}
					}, 200)
				})
			},
			//上传成功事件
			changeUpload(file) {
				if (!this.model.title) {
					this.model.title = file.name
				}
				this.model.cover = file.imgUrl;
				this.model.url = file.imgUrl;
			},
			//删除上传图片
			removeUpload(file){
				this.model.cover = '';
				this.model.url = '';
			},
			handleOk() {
				saveMemoryMedia(this.model).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.onClose(res)
					}
				})
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
