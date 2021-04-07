<template>
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item label="招标编号">
				<a-input v-model="model.zbNo" placeholder="请输入招标编号" style="width:600px;" />
			</a-form-model-item>
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
				<a-date-picker placeholder="请选择招标截至日期" @change="onChangeEndTimeDate" v-model="model.endTimeDate" style="width:200px;"
				 inputReadOnly />
			</a-form-model-item>
			<a-form-model-item label="项目日期">
				<a-date-picker placeholder="请选择项目日期" @change="onChangeProTimeDate" v-model="model.proTimeDate" style="width:200px;"
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

			<a-form-model-item label="内容类型">
				<a-select v-model="model.isCont" style="width: 350px;" placeholder="请选择主页类型">
					<a-select-option value="0">
						附件类型
					</a-select-option>
					<a-select-option value="1">
						图文类型
					</a-select-option>
				</a-select>
			</a-form-model-item>

			<a-form-model-item v-show="model.isCont === '0'" label="上传项目详情">
				<fileUpload ref="fileUpload" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
				 :count="1" :multiple="false" @uploading="uploadingFileUpload" @change="uploadFile">
					<a-button>
						<a-icon type="upload" />上传附件
					</a-button>
					<span v-if="fileLoading" style="padding-left: 15px; color: #40a9ff;">
						<a-icon type="loading" style="color: #40a9ff;" spin /> 附件上传中...</span>
					<span v-if="model.proFile" style="padding-left: 15px; color: #40a9ff;">附件已上传</span>
					<span v-if="!fileLoading && !model.proFile" style="padding-left: 15px; color: #40a9ff;">未上传附件</span>
				</fileUpload>
			</a-form-model-item>
			<a-form-model-item v-show="model.isCont === '1'" label="内容">
				<script id="zbggEditor" type="text/plain" style="width:100%;height:500px;"></script>
			</a-form-model-item>

		</a-form-model>

		<div style="height:50px;"></div>
		<div class="submit-cont">
			<a-button type="primary" @click="onSubmit">确定</a-button>
			<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
		</div>

	</a-drawer>
</template>
<script>
	import {
		getNewsZbggInfo,
		saveNewsZbggInfo
	} from "@/pages/admin/api/news/news";
	import moment from "moment";

	export default {
		components: {
			fileUpload: () => import("@/pages/admin/components/upload/file-upload")
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
				uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
				headers: {
					token: this.$store.state.adminAccount.token || ''
				},
				fileLoading: false,
				model: {
					id: "",
					title: "",
					zbNo: "",
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
					proFile: "",
					pdfFile: "",
					isCont: "0",
					cont: ''
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
				var vm = this
				this.$nextTick(() => {
					setTimeout(() => {
						window.UE.delEditor("zbggEditor");
						vm.ue = window.UE.getEditor("zbggEditor");
						vm.ue.addListener("ready", function() {
							vm.ue.setContent(vm.model.cont);
						});
						// this.$refs.coverUpload.loadData(this.model.cover);
					}, 200);
				});
			},
			onChangeEndTimeDate(date, dateString) {
				this.model.endTimeDate = date;
				this.model.endTime = dateString + ' 00:00:00';
			},
			onChangeProTimeDate(date, dateString) {
				this.model.proTimeDate = date;
				this.model.proTime = dateString + ' 00:00:00';
			},
			setIsTop() {
				this.model.isTop = this.model.isTop === "0" ? "1" : "0";
			},
			uploadingFileUpload() {
				this.fileLoading = true
			},
			uploadFile(file) {
				this.fileLoading = false
				this.model.proFile = file.fileUrl;
				this.model.pdfFile = "";
			},
			onSubmit() {
				this.model.cont = this.ue.getContent();
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
