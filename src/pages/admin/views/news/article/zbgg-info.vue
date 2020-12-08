<template>
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item label="标题">
				<a-input v-model="model.title" placeholder="请输入招标广告标题" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="招标数">
				<a-input-number v-model="model.zbNum" :min="0" />
			</a-form-model-item>
			<a-form-model-item label="投标数">
				<a-input-number v-model="model.tbNum" :min="0" />
			</a-form-model-item>
			<a-form-model-item label="招标截至日期">
				<a-date-picker  placeholder="请选择招标截至日期" @change="onChangeEndTimeDate" v-model="model.endTimeDate" style="width:200px;"
				 inputReadOnly />
			</a-form-model-item>
			<a-form-model-item label="项目日期">
				<a-date-picker  placeholder="请选择项目日期" @change="onChangeProTimeDate" v-model="model.proTimeDate" style="width:200px;"
				 inputReadOnly />
			</a-form-model-item>
			<a-form-model-item label="结算形式">
				<a-input v-model="model.jsxs" placeholder="请输入结算形式" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="是否置顶">
				<a-switch checkedChildren="是" unCheckedChildren="否" :checked="model.isTop === '1' ? true : false" @change="setIsTop()" />
			</a-form-model-item>
			<a-form-model-item label="简介">
				<a-textarea v-model="model.intro" placeholder="招标广告简介" :auto-size="{ minRows: 5, maxRows: 5 }" />
			</a-form-model-item>
			<a-form-model-item label="上传项目详情">
				<a-upload name="file" :action="uploadUrl" :headers="headers" :showUploadList="false" :beforeUpload="beforeUpload"
				 @change="uploadFile">
					<a-button>
						<a-icon type="upload" />上传附件</a-button>
				</a-upload>
				<span v-if="fileLoading" style="padding-left: 15px; color: #40a9ff;">
					<a-icon type="loading" style="color: #40a9ff;" spin /> 附件上传中...</span>
				<span v-if="model.proFile" style="padding-left: 15px; color: #40a9ff;">附件已上传</span>
				<span v-if="!fileLoading && !model.proFile" style="padding-left: 15px; color: #40a9ff;">未上传附件</span>
			</a-form-model-item>


			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">确定</a-button>
				<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
			</a-form-model-item>
		</a-form-model>
	</a-drawer>
</template>
<script>
	import {
		getNewsZbggInfo,
		saveNewsZbggInfo
	} from "@/pages/admin/api/news/news";
	import moment from "moment";

	export default {
		components: {},
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
				uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
				headers: {
					token: this.$store.state.adminAccount.token || ''
				},
				fileLoading: false,
				model: {
					id: "",
					title: "",
					zbNum: 0,
					tbNum: 0,
					proTime: null, //项目日期
					proTimeDate: null, //显示选择
					endTime: null, //招标截止日期
					endTimeDate: null,
					jsxs: "", //结算形式
					isTop: "0", //是否置顶
					status: "即将开始", //招投标状态 即将开始、进行中、已结束
					intro: "",
					proFile: ""
				},
				ue: null
			};
		},
		mounted() {
			this.visible = true;
			this.title = this.id === "" ? "添加招标广告" : "编辑招标广告";
			this.loadData();
		},
		methods: {
			loadData() {
				if (this.id) {
					this.model.id = this.id;
					getNewsZbggInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							this.model.endTimeDate = moment(this.model.endTime);
							this.model.proTimeDate = moment(this.model.proTime);
						}
						this.bindData();
					});
				} else {
					this.bindData();
				}
			},
			bindData() {
				this.$nextTick(() => {
					setTimeout(() => {
						// this.$refs.coverUpload.loadData(this.model.cover);
					}, 200);
				});
			},
			onChangeEndTimeDate(date, dateString) {
				this.model.endTimeDate = date;
				this.model.endTime  = dateString + ' 00:00:00';
			},
			onChangeProTimeDate(date, dateString) {
				this.model.proTimeDate = date;
				this.model.proTime  = dateString + ' 00:00:00';
			},
			setIsTop() {
				this.model.isTop = this.model.isTop === "0" ? "1" : "0";
			},
			beforeUpload(file) {
				const isLt20M = file.size / 1024 / 1024 < 200;
				if (!isLt20M) {
					this.$message.error("上传文件不能大于200MB");
				}
				return isLt20M;
			},
			uploadFile(info) {
				if (info.file.status === "uploading") {
					this.fileLoading = true;
					return;
				}
				if (info.file.status === "done") {
					this.fileLoading = false;
					var res = info.file.response;
					if (res.code === 0) {
						this.model.proFile = res.uploadUrl;
					}
				}
			},
			onSubmit() {
				saveNewsZbggInfo(this.model).then(res => {
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
	.remark {
		color: #ccc;
		font-size: 12px;
	}
</style>
