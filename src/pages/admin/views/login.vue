<template>
<<<<<<< HEAD
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="/img/admin/logo.png" />
          <div class="title">{{ systemName }}</div>
        </div>
        <div class="desc"></div>
      </div>
      <div class="login">
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item prop="username">
            <a-input v-model="form.username" size="large" placeholder="用户名">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input
              v-model="form.password"
              size="large"
              placeholder="登录密码"
              type="password"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="checkCode">
            <a-row :gutter="8">
              <a-col :span="16">
                <a-input
                  v-model="form.checkCode"
                  size="large"
                  placeholder="验证码"
                  @keyup.enter="onSubmit"
                >
                  <a-icon slot="prefix" type="menu" />
                </a-input>
              </a-col>
              <a-col :span="8">
                <img
                  :src="imgCode"
                  @click="changeImgCode()"
                  :style="{ cursor: 'pointer', width: '100%', height: '40px' }"
                />
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item>
            <a-button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              type="primary"
              @click="onSubmit"
              >登录</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <global-footer :copyright="copyright" />
  </div>
</template>

<script>
import { login } from "@/pages/admin/api/sso";
import * as utils from "@/pages/admin/libs/utils";

export default {
  name: "Login",
  components: {
    globalFooter: () => import("@/pages/admin/layouts/GlobalFooter"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      imgCode: "",
      logging: false,
      error: "",
      form: {
        username: "",
        password: "",
        checkCode: "",
        sign: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账户名",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
        checkCode: [
          {
            required: true,
            message: "请输入验证码",
          },
        ],
      },
    };
  },
  computed: {
    systemName() {
      return this.$store.state.adminSetting.systemName;
    },
    copyright() {
      return this.$store.state.adminSetting.copyright;
    },
  },
  mounted() {
    this.changeImgCode();
  },
  methods: {
    changeImgCode() {
      this.form.sign = utils.getId();
      this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.form.sign;
    },
    onSubmit() {
      this.logging = true;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          login(this.form).then((res) => {
            this.changeImgCode();
            if (res.code === 0) {
              this.$store.commit("adminAccount/setToken", res.data.token);
              this.$store.commit("adminAccount/setUser", res.data.entity);
              this.$router.replace("/");
            }
            this.logging = false;
          });
        } else {
          this.changeImgCode();
          this.logging = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5
    url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
    no-repeat center 110px;
  background-size: 100%;

  .content {
    padding: 32px 0;
    flex: 1;

    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }

    .top {
      text-align: center;

      .header {
        height: 120px;
        line-height: 44px;

        a {
          text-decoration: none;
        }

        .logo {
          height: 100px;
          vertical-align: top;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 50px;
      }
    }

    .login {
      width: 368px;
      margin: 0 auto;

      @media screen and (max-width: 576px) {
        width: 95%;
      }

      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }

      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
=======
	<div class="container">
		<div class="content">
			<div class="top">
				<div class="header">
					<img alt="logo" class="logo" src="/img/admin/logo.png" />
					<div class="title">{{ systemName }}</div>
				</div>
				<div class="desc"></div>
			</div>
			<div class="login">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item prop="username">
						<a-input v-model="form.username" size="large" placeholder="用户名">
							<a-icon slot="prefix" type="user" />
						</a-input>
					</a-form-model-item>
					<a-form-model-item prop="password">
						<a-input v-model="form.password" size="large" placeholder="登录密码" type="password">
							<a-icon slot="prefix" type="lock" />
						</a-input>
					</a-form-model-item>
					<a-form-model-item prop="checkCode">
						<a-row :gutter="8">
							<a-col :span="16">
								<a-input v-model="form.checkCode" size="large" placeholder="验证码" @keyup.enter="onSubmit">
									<a-icon slot="prefix" type="menu" />
								</a-input>
							</a-col>
							<a-col :span="8">
								<img :src="imgCode" @click="changeImgCode()" :style="{ cursor: 'pointer',width:'100%',height:'40px' }" />
							</a-col>
						</a-row>
					</a-form-model-item>

					<a-form-model-item>
						<a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" type="primary" @click="onSubmit">登录</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
		<global-footer :copyright="copyright" />
	</div>
</template>

<script>
	import {
		login
	} from "@/pages/admin/api/sso";
	import * as utils from "@/pages/admin/libs/utils";

	export default {
		name: "Login",
		components: {
			globalFooter: () => import("@/pages/admin/layouts/GlobalFooter")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCode: "",
				logging: false,
				error: "",
				form: {
					username: "",
					password: "",
					checkCode: "",
					sign: ""
				},
				rules: {
					username: [{
						required: true,
						message: "请输入账户名"
					}],
					password: [{
						required: true,
						message: "请输入密码"
					}],
					checkCode: [{
						required: true,
						message: "请输入验证码"
					}]
				}
			};
		},
		computed: {
			systemName() {
				return this.$store.state.adminSetting.systemName;
			},
			copyright() {
				return this.$store.state.adminSetting.copyright;
			}
		},
		mounted() {
			this.changeImgCode();
		},
		methods: {
			changeImgCode() {
				this.form.sign = utils.getId();
				this.imgCode = this.baseUrl + "/sso/img-code?sign=" + this.form.sign;
			},
			onSubmit() {
				this.logging = true;
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						login(this.form).then(res => {
							this.changeImgCode();
							if (res.code === 0) {
								this.$store.commit("adminAccount/setToken", res.data.token);
								this.$store.commit("adminAccount/setUser", res.data.entity);
								this.$router.replace("/");
							}
							this.logging = false;
						});
					} else {
						this.changeImgCode();
						this.logging = false;
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: auto;
		background: #f0f2f5 url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg") no-repeat center 110px;
		background-size: 100%;

		.content {
			padding: 32px 0;
			flex: 1;

			@media (min-width: 768px) {
				padding: 112px 0 24px;
			}

			.top {
				text-align: center;

				.header {
					height: 120px;
					line-height: 44px;

					a {
						text-decoration: none;
					}

					.logo {
						height: 100px;
						vertical-align: top;
					}

					.title {
						font-size: 33px;
						color: rgba(0, 0, 0, 0.85);
						font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
							sans-serif;
						font-weight: 600;
						position: relative;
						top: 2px;
					}
				}

				.desc {
					font-size: 14px;
					color: rgba(0, 0, 0, 0.45);
					margin-top: 12px;
					margin-bottom: 50px;
				}
			}

			.login {
				width: 368px;
				margin: 0 auto;

				@media screen and (max-width: 576px) {
					width: 95%;
				}

				@media screen and (max-width: 320px) {
					.captcha-button {
						font-size: 14px;
					}
				}

				.icon {
					font-size: 24px;
					color: rgba(0, 0, 0, 0.2);
					margin-left: 16px;
					vertical-align: middle;
					cursor: pointer;
					transition: color 0.3s;

					&:hover {
						color: #1890ff;
					}
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
