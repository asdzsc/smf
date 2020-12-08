<template>
  <div class="w1920 zxfw">
    <div class="banner">
      <div class="bannerCont">
        <div class="title">
          好服务
          <span style="width: 10px; display: -webkit-inline-box;"></span>
          先体验
        </div>
        <div class="title2">
          7 X 24小时标准服务<span
            style="width: 20px; display: -webkit-inline-box;"
          ></span
          >全程免费服务<span
            style="width: 20px; display: -webkit-inline-box;"
          ></span
          >贴心陪伴<br />
          星级服务 ★ 购墓预约 ★ 线上体验
        </div>
        <!-- <div class="btn">立即预约</div> -->
      </div>
    </div>
    <div class="smfw">
      <zxfwTitle title="免费上门服务"></zxfwTitle>

      <div class="smfwCont">
        <div class="smfwContItem">
          <div class="circle">省心</div>
          <div class="title">科学排期<br />优先排单</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">放心</div>
          <div class="title">固定人员<br />安全严管</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">稳定</div>
          <div class="title">国家公墓<br />全国典范</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">安全</div>
          <div class="title">人生后事<br />最佳选择</div>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="title">
        购墓预约<span style="width: 20px; display: -webkit-inline-box;"></span
        >优质客服
      </div>
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
          <div class="title2">
            健康善良、专业敬业、温馨体贴
          </div>
        </div>
        <div class="contItemCol">
          <img class="showImg" src="/img/mfsmyy1.png" />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <img class="showImg" src="/img/mfsmyy2.png" />
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
          <div class="title2">
            7X24小时优质客服服务，全程免费服务
          </div>
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
          <img class="showImg" src="/img/mfsmyy3.png" />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <img class="showImg" src="/img/mfsmyy4.png" />
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
          <div class="title2">
            客户投诉及时响应， 24小时受理
          </div>
        </div>
        <div class="contItemCol">
          <img class="showImg" src="/img/mfsmyy5.png" />
        </div>
      </div>
      <div class="contItem">
        <div class="contItemCol">
          <img class="showImg" src="/img/mfsmyy6.png" />
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
          <div class="title2">
            多项认证、多项荣誉、专业团队
          </div>
        </div>
      </div>
    </div>
    <myserve></myserve>
		<!-- 立即预约 -->
    <zxfwLjyy goodsId="491462777001680896"></zxfwLjyy>
  </div>
</template>
<script>
export default {
  components: {
    zxfwTitle: () => import("@/pages/pc/views/zxfw/components/zxfw-title.vue"),
    zxfwLjyy: () => import("@/pages/pc/views/zxfw/components/zxfw-ljyy.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.zxfw {
  .banner {
    background: url("/img/banner3.png") no-repeat center center;
    background-size: cover;
    height: 540px;
    text-align: center;
    position: relative;

    .bannerCont {
      position: absolute;
      top: 100px;
      right: 360px;
      width: 620px;
      text-align: center;

      .title {
        font-size: 60px;
        color: #333333;
        font-weight: 400;
      }

      .title2 {
        padding-top: 30px;
        font-size: 30px;
        line-height: 48px;
        color: #666666;
      }

      .btn {
        margin: auto;
        margin-top: 70px;
        width: 200px;
        height: 48px;
        background-color: #004a30;
        border-radius: 24px;
        text-align: center;
        font-size: 18px;
        line-height: 48px;
        letter-spacing: 2px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }

  .smfw {
    height: 470px;

    .smfwCont {
      width: 880px;
      margin: auto;
      display: flex;
      margin-top: 80px;

      .smfwContItem {
        flex: 1;
        text-align: center;

        .circle {
          width: 130px;
          height: 130px;
          border: solid 2px #004a30;
          border-radius: 50%;
          margin: auto;
          text-align: center;
          font-size: 36px;
          line-height: 125px;
          color: #004a30;
          font-weight: 700;
        }

        .title {
          font-size: 24px;
          line-height: 36px;
          color: #333333;
          padding-top: 20px;
          font-weight: 400;
        }
      }
    }
  }

  .cont {
    background-color: #f3f3f3;
    padding-top: 90px;
    padding-bottom: 80px;

    .title {
      text-align: center;
      font-size: 36px;
      color: #333333;
      font-weight: 400;
      padding-bottom: 60px;
    }

    .contItem {
      height: 320px;
      width: 1200px;
      display: flex;
      margin: auto;

      .contItemCol {
        width: 600px;
        background-color: #ffffff;

        &.left {
          padding-top: 85px;
          padding-right: 100px;
          text-align: right;
          position: relative;

          .jiantou {
            position: absolute;
            top: calc(50% - 20px);
            right: -39px;
            width: 40px;
            height: 40px;
            transform: rotate(90deg);

            .iconfont {
              color: #ffffff !important;
            }
          }
        }

        &.right {
          padding-top: 85px;
          padding-left: 100px;
          text-align: left;
          position: relative;

          .jiantou {
            position: absolute;
            top: calc(50% - 20px);
            left: -39px;
            width: 40px;
            height: 40px;
            transform: rotate(270deg);

            .iconfont {
              color: #ffffff !important;
            }
          }
        }

        .iconfont {
          font-size: 40px;
          color: #777777;
        }

        .title1 {
          font-size: 24px;
          color: #333333;
          font-weight: 400;
        }

        .title2 {
          font-size: 18px;
          color: #666666;
          padding-top: 10px;
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
}

@media screen and (max-width: 1600px) {
  .zxfw {
    .banner {
      .bannerCont {
        right: 40px;
      }
    }
  }
}
</style>
