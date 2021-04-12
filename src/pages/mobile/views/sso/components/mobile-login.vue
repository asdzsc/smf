<template>
<<<<<<< HEAD
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
        <input
          v-model="model.smsCode"
          @keyup.enter="submit()"
          placeholder="请输入动态验证码"
        />
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
        登 录
      </div>
    </div>
  </div>
</template>

<script>
import { mobileLogin, sendSms, setToken } from "@/pages/mobile/api/sso";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      imgCode: "",
      isSend: false,
      sendText: "获取验证码",
      smsInterval: null,
      model: {
        mobile: "",
        checkCode: "",
        sign: "",
        smsCode: "",
        smsSign: "",
      },
    };
  },
  mounted() {
    this.changeImgCode();
  },
  beforeDestroy() {
    if (this.smsInterval) {
      clearInterval(this.smsInterval);
    }
  },
  methods: {
    changeImgCode() {
      this.model.sign = utils.getId();
      this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.model.sign;
    },
    //获取动态验证码
    getSmsCode() {
      var vm = this;
      if (!this.isSend) {
        this.isSend = true;
        var smsNum = 60;
        sendSms({
          mobile: this.model.mobile,
          isCkCode: "true",
          checkCode: this.model.checkCode,
          sign: this.model.sign,
        }).then((res) => {
          if (res.code === 0) {
            this.model.smsSign = res.data;

            this.sendText = smsNum + "秒重新获取";
            this.smsInterval = setInterval(function() {
              smsNum--;
              vm.sendText = smsNum + "秒重新获取";
              if (smsNum <= 0) {
                vm.isSend = false;
                vm.sendText = "获取验证码";
                clearInterval(vm.smsInterval);
              }
            }, 1000);
          } else {
            vm.isSend = false;
          }
        });
      }
    },
    submit() {
      this.$toast.loading({
        message: "用户登录中...",
        forbidClick: true,
      });
      mobileLogin(this.model).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          setToken(res.data);
          if (this.$route.query.redirect) {
            var redirect = decodeURIComponent(this.$route.query.redirect);
            this.$router.replace(redirect);
          } else {
            this.$router.replace("/");
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
          background-color: #b0b0b0;
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
=======
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

		<div class="loginBtnCont">
			<div @click="submit()" class="loginBtn">
				登 录
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mobileLogin,
		sendSms,
		setToken
	} from '@/pages/mobile/api/sso'
	import * as utils from "@/pages/mobile/libs/utils";
	export default {
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
					smsSign: ''
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
					message: '用户登录中...',
					forbidClick: true,
				});
				mobileLogin(this.model).then(res => {
					this.$toast.clear()
					if (res.code === 0) {
						setToken(res.data)
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
</script>

<style lang="less" scoped>
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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
