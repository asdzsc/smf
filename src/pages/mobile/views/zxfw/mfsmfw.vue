<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner3.png" />
    </div>
    <div class="zjxz">
      <img src="/img/mobile/zjxz.png" />
    </div>
    <div class="cont">
      <div class="title">购墓预约 优质客服</div>

      <div class="contItem">
        <div class="contItemCol left">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconkefu"></i>
          </div>
          <div class="title1">
            优质客服
          </div>
          <div class="title2">健康善良、专业敬业<br />温馨体贴</div>
        </div>
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy1.png"
          />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy2.png"
          />
        </div>
        <div class="contItemCol right">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconneirongguanli"></i>
          </div>
          <div class="title1">
            服务内容
          </div>
          <div class="title2">7X24小时优质客服服务<br />全程免费服务</div>
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol left">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconlifangtilitiduomiantifangkuai2"></i>
          </div>
          <div class="title1">
            服务产品
          </div>
          <div class="title2">
            免费上门、超级待遇
          </div>
        </div>
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy3.png"
          />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy4.png"
          />
        </div>
        <div class="contItemCol right">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconshoufeiguanli"></i>
          </div>
          <div class="title1">
            收费结构
          </div>
          <div class="title2">
            价格透明，物超所值
          </div>
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol left">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconshouhou"></i>
          </div>
          <div class="title1">
            售后服务
          </div>
          <div class="title2">客户投诉及时响应<br />24小时受理</div>
        </div>
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy5.png"
          />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy6.png"
          />
        </div>
        <div class="contItemCol right">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div>
            <i class="iconfont iconai-r"></i>
          </div>
          <div class="title1">
            品牌优势
          </div>
          <div class="title2">多项认证、多项荣誉<br />专业团队</div>
        </div>
      </div>
    </div>

    <zxfwLjyy ref="zxfwLjyy"></zxfwLjyy>
  </div>
</template>

<script>
export default {
  components: {
    zxfwTabs: () => import("@/pages/mobile/views/zxfw/components/zxfw-tabs.vue"),
    zxfwLjyy: () => import("@/pages/mobile/views/zxfw/components/zxfw-ljyy.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.banner {
  // background: url("/img/mobile/banner3.png") no-repeat center center;
  // background-size: cover;
  // height: 5rem;
  // text-align: center;
  .bannerImg {
    width: 100%;
    height: 5rem;
  }
}

.zjxz {
  padding: 0.65rem 0.7rem;

  img {
    width: 100%;
  }
}

.cont {
  background-color: #f3f3f3;
  padding-bottom: 0.8rem;

  .title {
    padding-top: 0.8rem;
    padding-bottom: 0.6rem;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 700;
    color: #333333;
  }

  .contItem {
    height: 2.4rem;
    width: 6.7rem;
    display: flex;
    margin: auto;

    .contItemCol {
      width: 3.35rem;
      background-color: #ffffff;

      &.left {
        padding-top: 0.3rem;
        padding-right: 0.4rem;
        text-align: right;
        position: relative;

        .jiantou {
          position: absolute;
          top: calc(50% - 0.2rem);
          right: -0.35rem;
          width: 0.4rem;
          height: 0.4rem;
          transform: rotate(90deg);
          z-index: 1;

          .iconfont {
            color: #ffffff !important;
          }
        }
      }

      &.right {
        padding-top: 0.3rem;
        padding-left: 0.4rem;
        text-align: left;
        position: relative;

        .jiantou {
          position: absolute;
          top: calc(50% - 0.2rem);
          left: -0.35rem;
          width: 0.4rem;
          height: 0.4rem;
          transform: rotate(270deg);
          z-index: 1;

          .iconfont {
            color: #ffffff !important;
          }
        }
      }

      .iconfont {
        font-size: 0.4rem;
        color: #777777;
      }

      .title1 {
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: 700;
      }

      .title2 {
        font-size: 0.22rem;
        color: #666666;
        padding-top: 0.1rem;
      }

      .showImg {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      .contItemCol {
        background-color: #004a30;
        transition: 0.5s;

        &.left {
          .jiantou {
            .iconfont {
              color: #004a30 !important;
            }
          }
        }

        &.right {
          .jiantou {
            .iconfont {
              color: #004a30 !important;
            }
          }
        }

        .iconfont {
          color: #ffffff;
        }

        .title1 {
          color: #ffffff;
        }

        .title2 {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
