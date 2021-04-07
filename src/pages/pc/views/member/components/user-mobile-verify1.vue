<template>
	<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 17 }">
		<a-form-model-item label="原手机号:">
			<a-input v-model="model.mobile" disabled placeholder="请输入原手机号" />
		</a-form-model-item>
		<a-form-model-item label="验证码:">
			<a-input-search v-model="model.checkCode" @search="getSmsCode()" placeholder="请输入动态验证码">
				<a-button slot="enterButton">
					{{ sendText }}
				</a-button>
			</a-input-search>
		</a-form-model-item>
	</a-form-model>
</template>

<script>
	import {
		sendSms
	} from '@/pages/pc/api/sso'
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
	.ant-btn {
		outline: none;
		height: 36px;
		border-radius: 0px !important;

		&:hover {
			border-color: #004930;
			color: #004930;
		}

		&:active {
			color: #004930;
			border-color: #004930;
			-webkit-box-shadow: none;
			box-shadow: none;
			border-radius: none;
		}

		&:focus {
			color: #004930;
			border-color: #004930;
			-webkit-box-shadow: none;
			box-shadow: none;
			border-radius: none;
		}
	}
</style>
