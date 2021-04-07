<template>
	<div>
		<div class="title">
			原手机号验证
		</div>

		<div class="form">
			<div class="formItem">
				<div class="label">
					手机号
				</div>
				<div class="inputCont">
					<input v-model="model.mobile" disabled placeholder="请输入手机号" />
				</div>
			</div>
			<div class="formItem">
				<div class="label">
					动态验证码
				</div>
				<div class="verifyCode">
					<input v-model="model.checkCode" @keyup.enter="submit()" placeholder="请输入动态验证码" />
					<div v-if="!isSend" @click="getSmsCode()" class="smsCodeBtn">
						{{ sendText }}
					</div>
					<div v-else class="smsCodeBtn disabled">
						{{ sendText }}
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		sendSms
	} from '@/pages/mobile/api/sso'
	export default {
		data() {
			return {
				isSend: false,
				sendText: '获取验证码',
				smsInterval: null,
				model: {
					mobile: '',
					checkCode: '',
					smsSign: ''
				}
			}
		},
		mounted() {
			Object.assign(this.model, this.$store.state.account.user)
		},
		beforeDestroy() {
			if (this.smsInterval) {
				clearInterval(this.smsInterval)
			}
		},
		methods: {
			//获取动态验证码
			getSmsCode() {
				var vm = this
				if (!this.isSend) {
					this.isSend = true
					var smsNum = 60;
					sendSms({
						mobile: this.model.mobile,
						checkCode: this.model.checkCode
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
			getData() {
				return {
					mobile: this.model.mobile,
					checkCode: this.model.checkCode,
					smsSign: this.model.smsSign
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		padding: 0rem 0.5rem;
		font-weight: 700;
		font-size: 0.36rem;
		color: #333333;
	}
	
	.form {
		padding: 0.5rem;
	
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
	}
</style>
