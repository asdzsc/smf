<template>
	<modal :title="title" @onClose="handleCancel" width="700px">
		<div class="cont">
			<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 17 }">
				<a-form-model-item label="新密码:">
					<a-input v-model="model.pwd1" type="password" placeholder="请输入新密码" />
				</a-form-model-item>
				<a-form-model-item label="确认密码:">
					<a-input v-model="model.pwd2" type="password" placeholder="请输入确认密码" />
				</a-form-model-item>
			</a-form-model>

			<div @click="submit()" class="btn">保存</div>

		</div>
	</modal>
</template>

<script>
	import {
		updatePwd
	} from '@/pages/pc/api/user'
	export default {
		components: {
			modal: () => import("@/pages/pc/components/modal.vue")
		},
		data() {
			return {
				title: '编辑密码',
				model: {
					pwd1: '',
					pwd2: ''
				}
			}
		},
		mounted() {
		},
		methods: {
			submit() {
				updatePwd(this.model).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.handleCancel(res);
					}
				})
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.cont {

		padding: 40px 80px;

		.btn {
			margin: auto;
			margin-top: 60px;
			width: 180px;
			height: 48px;
			background-color: #004930;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			line-height: 48px;
			color: #ffffff;
			cursor: pointer;
		}
	}
</style>
