<template>
  <div>
    <div class="operation">
      <span>没有账号？</span><a href="/mobile/#/register">立即免费注册></a>
    </div>

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
					<i class="iconfont iconQQ"></i>
				</div> -->
        <div @click="loginWx()" class="moreLoginBtn">
          <i class="iconfont iconweixin"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //微信登录
    loginWx() {
      if (this.$route.query.redirect) {
        var redirect = decodeURIComponent(this.$route.query.redirect);
        var url = encodeURIComponent(
          process.env.VUE_APP_BASE_URL + "/mobile/#" + redirect
        );
        window.location = process.env.VUE_APP_BASE_URL + "/wx/oauth?url=" + url;
      } else {
        window.location = process.env.VUE_APP_BASE_URL + "/wx/oauth";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.operation {
  text-align: center;
  padding-top: 0.3rem;

  span {
    font-size: 0.28rem;
    font-weight: normal;
    color: #666666;
  }

  a {
    font-size: 0.28rem;
    font-weight: normal;
    color: #004930;
  }
}

.moreLoginCont {
  margin: auto;
  margin-top: 0.7rem;
  width: 5.2rem;

  .moreLogin {
    display: flex;

    .line {
      width: 1.7rem;

      div {
        margin-top: 0.15rem;
        height: 1px;
        background-color: #dcdcdc;
      }
    }

    .moreLoginTitle {
      flex: 1;
      text-align: center;
      font-weight: normal;
      line-height: 0.3rem;
      font-size: 0.22rem;
      color: #999999;
    }
  }

  .moreLoginBtnCont {
    display: flex;
    justify-content: center;
    margin-top: 0.45rem;

    .moreLoginBtn {
      width: 0.88rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background-color: #dcdcdc;
      border-radius: 50%;
      margin-right: 1.7rem;

      text-align: center;
      color: #ffffff;
      cursor: pointer;

      .iconfont {
        font-size: 0.45rem;
      }

      &:last-child {
        margin-right: 0px;
      }

      &:hover {
        background-color: #004930;
      }
    }
  }
}
</style>
