<template>
	<div class="loginForm">
		<div class="formItem">
			<div class="label">
				手机号
			</div>
			<div class="inputCont">
				<input v-model="model.email" placeholder="请输入邮箱" />
			</div>
		</div>
		<div class="formItem">
			<div class="label">
				设置密码
			</div>
			<div class="inputCont">
				<input v-model="model.password" type="password" placeholder="请输入密码" />
			</div>
		</div>
		<div class="formItem">
			<div class="label">
				确认密码
			</div>
			<div class="inputCont">
				<input v-model="model.password2" type="password" placeholder="请输入确认密码" />
			</div>
		</div>

		<div class="loginBtnCont">
			<div @click="submit()" class="loginBtn">
				注 册
			</div>
			<div class="recoverPwd">忘记密码？</div>
		</div>
	</div>
</template>

<script>
	import {
		emailRegister
	} from '@/pages/pc/api/sso'
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				model: {
					email: "",
					password: '',
					password2: ''
				},
				isSubmit: false
			}
		},
		mounted() {},
		beforeDestroy() {},
		methods: {
			submit() {
				var vm = this
				if (!this.isSubmit) {
					this.isSubmit = true;
					this.$message.loading('用户注册中..', 0);
					emailRegister(this.model).then(res => {
						this.isSubmit = false;
						this.$message.destroy()
						if (res.code === 0) {
							this.$success({
								title: '',
								content: '注册成功',
								onOk() {
									vm.$router.replace("/login");
								}
							});
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginForm {
		margin: auto;
		margin-top: 30px;
		width: 500px;

		.formItem {
			display: flex;
			margin-bottom: 30px;

			.label {
				width: 100px;
				line-height: 50px;
			}

			.inputCont {
				flex: 1;

				input {
					width: 100%;
					height: 50px;
					border: solid 1px #e0e0e0;
					padding: 0px 20px;
					outline: none;
				}
			}

			.verifyCode {
				flex: 1;
				display: flex;
				position: relative;

				input {
					flex: 1;
					height: 50px;
					border: solid 1px #e0e0e0;
					padding: 0px 20px;
					outline: none;
				}

				.codeImg {
					width: 120px;
					height: 50px;
					border: solid 1px #e0e0e0;
					border-left: 0px;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.reloadCode {
					position: absolute;
					bottom: 0px;
					right: -100px;
					width: 84px;
					font-size: 12px;
					font-weight: 700;
					color: #004930;
					cursor: pointer;
				}

				.smsCodeBtn {
					width: 120px;
					height: 50px;
					background-color: #004930;
					text-align: center;
					line-height: 50px;
					font-size: 14px;
					font-weight: normal;
					color: #ffffff;
					cursor: pointer;

					&.disabled {
						background-color: #B0B0B0;
						cursor: not-allowed;
					}
				}
			}
		}

		.loginBtnCont {
			.loginBtn {
				margin: auto;
				margin-top: 50px;
				width: 480px;
				height: 50px;
				background-color: #004930;
				text-align: center;
				line-height: 50px;
				font-size: 18px;
				font-weight: 700;
				color: #ffffff;
				cursor: pointer;
			}

			.recoverPwd {
				margin-top: 20px;
				text-align: right;
				font-size: 14px;
				font-weight: normal;
				color: #d54040;
			}
		}
	}
</style>
