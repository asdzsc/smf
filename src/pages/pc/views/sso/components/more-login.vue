<template>
<<<<<<< HEAD
  <div class="moreLoginCont">
    <div class="moreLogin">
      <div class="line">
        <div></div>
      </div>
      <div class="moreLoginTitle">其他登录方式</div>
      <div class="line">
        <div></div>
      </div>
    </div>
    <div class="moreLoginBtnCont">
      <!-- <div class="moreLoginBtn">
				<a-icon type="qq" />
			</div> -->
      <div @click="wxLogin()" class="moreLoginBtn">
        <a-icon type="wechat" />
      </div>
    </div>

    <wxLogin v-if="showWxLogin" ref="wxLogin" @onClose="wxLoginClose"></wxLogin>
  </div>
</template>

<script>
export default {
  components: {
    wxLogin: () => import("@/pages/pc/views/sso/components/wx-login.vue"),
  },
  data() {
    return {
      showWxLogin: false,
    };
  },
  mounted() {},
  methods: {
    //微信登录
    wxLogin() {
      this.showWxLogin = true;
    },
    wxLoginClose(res) {
      this.$nextTick(() => {
        this.showWxLogin = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.moreLoginCont {
  margin: auto;
  margin-top: 80px;
  width: 500px;

  .moreLogin {
    display: flex;

    .line {
      width: 170px;

      div {
        margin-top: 15px;
        height: 1px;
        background-color: #dcdcdc;
      }
    }

    .moreLoginTitle {
      flex: 1;
      text-align: center;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      color: #333333;
    }
  }

  .moreLoginBtnCont {
    display: flex;
    justify-content: center;
    margin-top: 45px;

    .moreLoginBtn {
      width: 60px;
      height: 60px;
      background-color: #dcdcdc;
      border-radius: 50%;
      margin-right: 100px;
      font-size: 40px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;

      &:last-child {
        margin-right: 0px;
      }

      &:hover {
        background-color: #004930;
      }
    }
  }
}
=======
	<div class="moreLoginCont">
		<div class="moreLogin">
			<div class="line">
				<div></div>
			</div>
			<div class="moreLoginTitle">其他登录方式</div>
			<div class="line">
				<div></div>
			</div>
		</div>
		<div class="moreLoginBtnCont">
			<div class="moreLoginBtn">
				<a-icon type="qq" />
			</div>
			<div @click="wxLogin()" class="moreLoginBtn">
				<a-icon type="wechat" />
			</div>
		</div>

		<wxLogin v-if="showWxLogin" ref="wxLogin" @onClose="wxLoginClose"></wxLogin>
	</div>
</template>

<script>
	export default {
		components: {
			wxLogin: () => import("@/pages/pc/views/sso/components/wx-login.vue")
		},
		data() {
			return {
				showWxLogin: false
			}
		},
		mounted() {},
		methods: {
			//微信登录
			wxLogin() {
				this.showWxLogin = true
			},
			wxLoginClose(res) {
				this.$nextTick(() => {
					this.showWxLogin = false
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.moreLoginCont {
		margin: auto;
		margin-top: 80px;
		width: 500px;

		.moreLogin {
			display: flex;

			.line {
				width: 170px;

				div {
					margin-top: 15px;
					height: 1px;
					background-color: #dcdcdc;
				}
			}

			.moreLoginTitle {
				flex: 1;
				text-align: center;
				font-size: 16px;
				font-weight: normal;
				line-height: 30px;
				color: #333333;
			}
		}

		.moreLoginBtnCont {
			display: flex;
			justify-content: center;
			margin-top: 45px;

			.moreLoginBtn {
				width: 60px;
				height: 60px;
				background-color: #dcdcdc;
				border-radius: 50%;
				margin-right: 100px;
				font-size: 40px;
				text-align: center;
				color: #ffffff;
				cursor: pointer;

				&:last-child {
					margin-right: 0px;
				}

				&:hover {
					background-color: #004930;
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
