<template>
<<<<<<< HEAD
  <div class="loginForm">
    <div class="formItem">
      <div class="label">
        邮箱或手机号
      </div>
      <div class="inputCont">
        <input v-model="model.username" placeholder="请输入手机号" />
      </div>
    </div>
    <div class="formItem">
      <div class="label">
        密码
      </div>
      <div class="inputCont">
        <input
          v-model="model.password"
          type="password"
          placeholder="请输入登陆密码"
        />
      </div>
    </div>
    <div v-if="model.isCkCode" class="formItem">
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
    <div @click="openUrl('/find-pwd')" class="recoverPwd">
      忘记密码？
    </div>

    <div class="loginBtnCont">
      <div @click="submit()" class="loginBtn">
        登 录
      </div>
    </div>
  </div>
</template>

<script>
import { webLogin, setToken } from "@/pages/mobile/api/sso";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      imgCode: "",
      errorCount: 0,
      model: {
        username: "",
        password: "",
        checkCode: "",
        sign: "",
        isCkCode: "",
      },
    };
  },
  mounted() {
    this.changeImgCode();
  },
  beforeDestroy() {},
  methods: {
    changeImgCode() {
      this.model.sign = utils.getId();
      this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.model.sign;
    },
    submit() {
      this.$toast.loading({
        message: "用户登录中...",
        forbidClick: true,
      });
      webLogin(this.model).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          setToken(res.data);
          if (this.$route.query.redirect) {
            var redirect = decodeURIComponent(this.$route.query.redirect);
            this.$router.replace(redirect);
          } else {
            this.$router.replace("/");
          }
        } else {
          this.changeImgCode();
          this.errorCount++;
          if (this.errorCount >= 5) {
            this.model.isCkCode = "true";
          }
        }
      });
    },
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
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

  .recoverPwd {
    margin-top: 0.19rem;
    text-align: right;
    font-size: 0.24rem;
    color: #d54040;
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
  }
}
=======
	<div class="loginForm">
		<div class="formItem">
			<div class="label">
				邮箱或手机号
			</div>
			<div class="inputCont">
				<input v-model="model.username" placeholder="请输入手机号" />
			</div>
		</div>
		<div class="formItem">
			<div class="label">
				密码
			</div>
			<div class="inputCont">
				<input v-model="model.password" type="password" placeholder="请输入登陆密码" />
			</div>
		</div>
		<div v-if="model.isCkCode" class="formItem">
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
		<div @click="openUrl('/find-pwd')" class="recoverPwd">
			忘记密码？
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
		webLogin,
		setToken
	} from '@/pages/mobile/api/sso'
	import * as utils from "@/pages/mobile/libs/utils";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCode: '',
				errorCount: 0,
				model: {
					username: "",
					password: "",
					checkCode: '',
					sign: "",
					isCkCode: ''
				}
			}
		},
		mounted() {
			this.changeImgCode()
		},
		beforeDestroy() {},
		methods: {
			changeImgCode() {
				this.model.sign = utils.getId();
				this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.model.sign;
			},
			submit() {
				this.$toast.loading({
					message: '用户登录中...',
					forbidClick: true,
				});
				webLogin(this.model).then(res => {
					this.$toast.clear()
					if (res.code === 0) {
						setToken(res.data)
						if (this.$route.query.redirect) {
							var redirect = decodeURIComponent(this.$route.query.redirect)
							this.$router.replace(redirect);
						} else {
							this.$router.replace("/");
						}
					} else {
						this.changeImgCode()
						this.errorCount++
						if (this.errorCount >= 5) {
							this.model.isCkCode = "true"
						}
					}
				})
			},
			openUrl(url) {
				if (url) {
					this.$router.push(url)
				}
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

		.recoverPwd {
			margin-top: 0.19rem;
			text-align: right;
			font-size: 0.24rem;
			color: #d54040;
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
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
