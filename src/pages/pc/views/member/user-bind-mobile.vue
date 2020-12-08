<template>
	<div style="min-height:100%">

		<div class="login">
			<img class="loginBgImg left" src="/img/login-left.jpg" />
			<img class="loginBgImg right" src="/img/login-right.jpg" />
			<div class="loginCont">
				<div class="title">
					绑定手机号
				</div>

				<div class="loginForm">
					<div class="formItem">
						<div class="label">
							手机号
						</div>
						<div class="inputCont">
							<input v-model="model.mobile" placeholder="请输入手机号" />
						</div>
					</div>
					<div class="formItem">
						<div class="label">
							验证码
						</div>
						<div class="verifyCode">
							<input v-model="model.checkCode" placeholder="请输入验证码" />
							<div class="codeImg">
								<img :src="imgCode" />
							</div>
							<div @click="changeImgCode()" class="reloadCode">看不清？换一张</div>
						</div>
					</div>
					<div class="formItem">
						<div class="label">
							动态验证码
						</div>
						<div class="verifyCode">
							<input v-model="model.smsCode" @keyup.enter="submit()" placeholder="请输入动态验证码" />
							<div v-if="!isSend" @click="getSmsCode()" class="smsCodeBtn">
								{{ sendText }}
							</div>
							<div v-else class="smsCodeBtn disabled">
								{{ sendText }}
							</div>
						</div>
					</div>

					<div class="loginBtnCont">
						<div @click="submit()" class="loginBtn">
							绑定手机号
						</div>
						<!-- <div class="recoverPwd">忘记密码？</div> -->
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
	import {
		sendSms,
		setToken
	} from '@/pages/pc/api/sso'
	import {
		updateMobile
	} from '@/pages/pc/api/user'
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			myhead: () => import("@/pages/pc/components/myhead.vue"),
			mobilelogin: () => import("@/pages/pc/views/sso/components/mobile-login.vue"),
			pwdlogin: () => import("@/pages/pc/views/sso/components/pwd-login.vue"),
			morelogin: () => import("@/pages/pc/views/sso/components/more-login.vue"),
			loginfoot: () => import("@/pages/pc/views/sso/components/loginfoot.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCode: '',
				isSend: false,
				sendText: '获取验证码',
				smsInterval: null,
				model: {
					isCkCode:'true',
					mobile: "",
					checkCode: "",
					sign: "",
					smsCode: '',
					smsSign: ''
				},
				isSubmit: false
			}
		},
		mounted() {
			this.changeImgCode()
		},
		beforeDestroy() {
			if (this.smsInterval) {
				clearInterval(this.smsInterval)
			}
		},
		methods: {
			changeImgCode() {
				this.model.sign = utils.getId();
				this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.model.sign;
			},
			//获取动态验证码
			getSmsCode() {
				var vm = this
				if (!this.isSend) {
					this.isSend = true
					var smsNum = 60;
					sendSms({
						mobile: this.model.mobile,
						isCkCode: 'true',
						checkCode: this.model.checkCode,
						sign: this.model.sign
					}).then(res => {
						if (res.code === 0) {
							this.model.smsSign = res.data

							this.sendText = smsNum + '秒重新获取';
							this.smsInterval = setInterval(function() {
								smsNum--;
								vm.sendText = smsNum + '秒重新获取';
								if (smsNum <= 0) {
									vm.isSend = false
									vm.sendText = '获取验证码';
									clearInterval(vm.smsInterval)
								}
							}, 1000)
						} else {
							vm.isSend = false
						}
					})
				}
			},
			submit() {
				if (!this.isSubmit) {
					this.isSubmit = true;
					this.$message.loading('数据提交中..', 0);
					updateMobile(this.model).then(res => {
						this.isSubmit = false;
						this.$message.destroy()
						if (res.code === 0) {
							this.$store.commit("account/setUser", res.data)
							if (this.$route.query.redirect) {
								var redirect = decodeURIComponent(this.$route.query.redirect)
								this.$router.replace(redirect);
							} else {
								this.$router.replace("/");
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		position: relative;
		min-height: 500px;
		padding-bottom: 100px;

		.loginBgImg {
			position: absolute;
			top: 15px;
			z-index: -1;

			&.left {
				left: 15px;
			}

			&.right {
				right: 15px;
			}
		}

		.loginCont {
			width: 1200px;
			margin: auto;

			.title {
				padding-top: 45px;
				padding-left: 200px;
				font-size: 24px;
				font-weight: 700;
				line-height: 20px;
				color: #333333;
			}

			.loginForm {
				margin: auto;
				margin-top: 70px;
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

		}
	}
</style>
