<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner3.png" />
    </div>
    <div class="bannerTitle">
      <div class="text1">好服务 先体验</div>
      <div class="text2" style="padding-top: 0.3rem">
        7 X 24小时标准服务 全程免费服务 贴心陪伴
      </div>
      <div class="text2" style="padding-top: 10px">
        星级服务 ★ 购墓预约 ★ 线上体验
      </div>
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
          <div class="leftCont">
            <div>
              <i class="iconfont iconkefu"></i>
            </div>
            <div class="title1">优质客服</div>
            <div class="title2">健康专业、温馨体贴</div>
          </div>
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
          <div class="rightCont">
            <div>
              <i class="iconfont iconneirongguanli"></i>
            </div>
            <div class="title1">上门服务</div>
            <div class="title2">7X24小时优质客服<br />科学排期、优先排单</div>
          </div>
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol left">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div class="leftCont">
            <div>
              <i class="iconfont iconshoufeiguanli"></i>
            </div>
            <div class="title1">收费合理</div>
            <div class="title2">价格透明，物超所值</div>
          </div>
        </div>
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy4.png"
          />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <van-image
            class="showImg"
            fit="cover"
            src="/img/mobile/mfsmyy5.png"
          />
        </div>
        <div class="contItemCol right">
          <div class="jiantou">
            <i class="iconfont iconzelvxuanzefeiyongzhengsanjiaoxingzhichi"></i>
          </div>
          <div class="rightCont">
            <div>
              <i class="iconfont iconshouhou"></i>
            </div>
            <div class="title1">售后服务</div>
            <div class="title2">客户投诉及时响应<br />24小时受理</div>
          </div>
        </div>
      </div>
    </div>

    <zxfwLjyy ref="zxfwLjyy" goodsId="491462777001680896"></zxfwLjyy>
  </div>
</template>

<script>
export default {
  components: {
    zxfwTabs: () =>
      import("@/pages/mobile/views/zxfw/components/zxfw-tabs.vue"),
    zxfwLjyy: () =>
      import("@/pages/mobile/views/zxfw/components/zxfw-ljyy.vue"),
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
.bannerTitle {
  padding-top: 0.6rem;
  .text1 {
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 0.44rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #333333;
  }
  .text2 {
    text-align: center;
    font-family: SourceHanSansCN-Normal;
    font-size: 0.24rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #333333;
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

        .leftCont {
          text-align: right;
          padding-top: 0.3rem;
          padding-right: 0.4rem;
        }
      }

      &.right {
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

        .rightCont {
          text-align: left;
          padding-top: 0.3rem;
          padding-left: 0.4rem;
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
