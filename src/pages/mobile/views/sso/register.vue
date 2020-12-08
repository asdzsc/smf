<template>
	<div>
		<div class="logo">
			<img src="/img/mobile/logo2.png" />
		</div>

		<div class="title">
			手机号注册
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
						<img :src="imgCode" @click="changeImgCode()" />
					</div>
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
			</div>
		</div>

		<loginfoot ref="loginfoot"></loginfoot>


	</div>
</template>

<script>
	import {
		mobileRegister,
		sendSms
	} from '@/pages/mobile/api/sso'
	import * as utils from "@/pages/mobile/libs/utils";
	export default {
		components: {
			loginfoot: () => import("@/pages/mobile/views/sso/components/login-foot.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCode: '',
				isSend: false,
				sendText: '获取验证码',
				smsInterval: null,
				model: {
					mobile: "",
					checkCode: "",
					sign: "",
					smsCode: '',
					smsSign: '',
					password: '',
					password2: ''
				}
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
				this.$toast.loading({
					message: '用户注册中...',
					forbidClick: true,
				});
				mobileRegister(this.model).then(res => {
					this.$toast.clear()
					if (res.code === 0) {
						this.$dialog.alert({
							message: '注册成功',
						}).then(() => {
							this.$router.push("/login")
						});
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo {
		text-align: center;
		padding: 0.4rem 0px;

		img {
			width: 1.76rem;
			height: 1.14rem;
		}
	}

	.title {
		padding: 0rem 0.5rem;
		font-weight: 700;
		font-size: 0.36rem;
		color: #333333;
	}

	.loginForm {
		padding: 0rem 0.5rem;
		padding-top: 0.5rem;

		.formItem {
			padding-bottom: 0.3rem;

			.label {
				font-size: 0.22rem;
				font-weight: 700;
				color: #333333;
			}

			.inputCont {
				padding-top: 0.1rem;

				input {
					width: 6.1rem;
					height: 0.8rem;
					border: solid 0.02rem #e0e0e0;
					padding: 0rem 0.2rem;
					outline: none;
				}
			}

			.verifyCode {
				padding-top: 0.1rem;
				display: flex;

				input {
					flex: 1;
					height: 0.8rem;
					border: solid 0.02rem #e0e0e0;
					padding: 0rem 0.2rem;
					outline: none;
				}

				.codeImg {
					width: 1.6rem;
					height: 0.8rem;
					border: solid 1px #e0e0e0;
					border-left: 0px;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.smsCodeBtn {
					width: 1.6rem;
					height: 0.8rem;
					background-color: #004930;
					text-align: center;
					line-height: 0.8rem;
					font-size: 0.26rem;
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
				margin-top: 0.8rem;
				width: 100%;
				height: 0.8rem;
				background-color: #004930;
				text-align: center;
				line-height: 0.8rem;
				font-size: 0.28rem;
				font-weight: 700;
				color: #ffffff;
				cursor: pointer;
			}

			.recoverPwd {
				margin-top: 0.3rem;

			}
		}
	}
</style>
