<template>
  <div class="w1920 zxfw">
    <div class="banner"></div>
    <div class="cont">
      <zxfwTitle title="人生纪念服务"></zxfwTitle>

      <div class="smfwCont">
        <div class="smfwContItem">
          <div class="circle">360<br />课时</div>
          <div class="title">360课时，理论+实操课程培训</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">专业<br />课程</div>
          <div class="title">石门峰生命文化学院专业课程</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">金牌<br />员工</div>
          <div class="title">7*24小时工作制+不间断复训</div>
        </div>
        <div class="smfwContItem">
          <div class="circle">国际<br />标准</div>
          <div class="title">严格执行国际殡葬协会生命文化服务标准</div>
        </div>
      </div>
      <div class="smfwImg">
        <img src="/img/zxfw17.png" />
      </div>

      <div class="cont1">
        <div class="title">人生纪念服务 日式收纳一次搞定</div>
        <div class="title2">1个小时，1个标准服务套餐</div>
        <div class="details">
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw18.png" />
            </div>
            <div class="detailsTitle">
              适用选瓷像、定影雕、排碑文及各类纪念预定
            </div>
          </div>
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw19.png" />
            </div>
            <div class="detailsTitle">
              细致精选图片,确定合适尺寸,精选人生精彩故事和经典墓志铭文,优化合理设计
            </div>
          </div>
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw20.png" />
            </div>
            <div class="detailsTitle">
              布局碑面,根据人体工学,动线布局碑面空间,完成所有手续收纳式一次搞定
            </div>
          </div>
        </div>
      </div>

      <div class="cont2">
        <div class="title">
          收纳套餐
        </div>
        <div class="title2">
          墓志铭文收纳、墓志铭+瓷像收纳、墓志铭+影雕收纳、纪念馆+纪念服务收纳
        </div>
        <div class="details">
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw21.png" />
            </div>
            <div class="detailsTitle">墓志铭文收纳</div>
          </div>
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw22.png" />
            </div>
            <div class="detailsTitle">墓志铭+瓷像收纳</div>
          </div>
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw23.png" />
            </div>
            <div class="detailsTitle">墓志铭+影雕收纳</div>
          </div>
          <div class="detailsItem">
            <div class="imgCont">
              <img src="/img/zxfw24.png" />
            </div>
            <div class="detailsTitle">纪念馆+纪念服务收纳</div>
          </div>
        </div>
        <div class="details2">
          <div class="details2Item">
            <div class="btn"><i class="iconfont iconxiangmu"></i></div>
            <div class="details2Title">
              项目任选
            </div>
            <div class="details2Intro">
              瓷像、影雕和碑文，自由组合选择，任意时间
            </div>
          </div>
          <div class="details2Item">
            <div class="btn" style="margin: auto;">
              <i class="iconfont iconkefu"></i>
            </div>
            <div class="details2Title" style="margin: auto; margin-top: 25px;">
              金牌客服
            </div>
            <div class="details2Intro">
              金牌客服人员为您服务
            </div>
          </div>
          <div class="details2Item">
            <div class="btn" style="float: right;">
              <i class="iconfont iconfuwu"></i>
            </div>
            <div class="details2Title" style="float: right;">
              周到放心
            </div>
            <div class="details2Intro">
              金牌客服保障，服务人员健康
            </div>
          </div>
        </div>
      </div>
    </div>

    <myserve></myserve>
    <zxfwLjyy goodsId="491474427225513984"></zxfwLjyy>
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
    background: url("/img/banner6.png") no-repeat center center;
    background-size: cover;
    height: 540px;
    text-align: center;
    position: relative;
  }

  .cont {
    .smfwCont {
      width: 1100px;
      margin: auto;
      display: flex;
      margin-top: 80px;

      .smfwContItem {
        flex: 1;
        text-align: center;

        .circle {
          width: 130px;
          height: 130px;
          border: solid 1px #004a30;
          border-radius: 50%;
          margin: auto;
          text-align: center;
          font-size: 30px;
          line-height: 40px;
          color: #004930;
          font-weight: 400;
          padding-top: 22px;
        }

        .title {
          font-size: 20px;
          line-height: 36px;
          color: #333333;
          padding-top: 30px;
          font-weight: 400;
          width: 200px;
          margin: auto;
        }
      }
    }

    .smfwImg {
      padding: 100px 0px;
      text-align: center;
    }

    .cont1 {
      width: 1200px;
      margin: auto;
      .title {
        text-align: center;
        font-size: 36px;
        color: #333333;
      }

      .title2 {
        padding-top: 10px;
        padding-bottom: 40px;
        text-align: center;
        font-size: 24px;
        color: #666666;
      }

      .details {
        display: flex;

        .detailsItem {
          flex: 1;

          .imgCont {
            width: 240px;
            height: 240px;
            margin: auto;
            border: solid 1px #004930;
            border-radius: 50%;
            padding: 10px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .detailsTitle {
            width: 370px;
            text-align: center;
            font-size: 20px;
            color: #666666;
            line-height: 40px;
            padding-top: 20px;
          }
        }
      }
    }

    .cont2 {
      width: 1100px;
      margin: auto;
      margin-top: 100px;

      .title {
        text-align: center;
        font-size: 36px;
        color: #333333;
      }

      .title2 {
        padding-top: 10px;
        padding-bottom: 40px;
        text-align: center;
        font-size: 24px;
        color: #333333;
      }

      .details {
        display: flex;

        .detailsItem {
          flex: 1;

          .imgCont {
            text-align: center;
            height: 200px;
            margin: auto;

            img {
              width: auto;
              height: 100%;
            }
          }

          .detailsTitle {
            text-align: center;
            font-size: 20px;
            color: #666666;
            padding-top: 20px;
          }
        }
      }

      .details2 {
        margin-top: 90px;
        margin-bottom: 100px;
        display: flex;

        .details2Item {
          flex: 1;
          .btn {
            width: 360px;
            height: 72px;
            background-color: #f0f0f0;
            border-radius: 36px;
            text-align: center;
            line-height: 72px;
            .iconfont {
              font-size: 50px;
              color: #004930;
            }
          }
          .details2Title {
            text-align: center;
            width: 360px;
            font-size: 24px;
            color: #333333;
            margin-top: 25px;
          }
          .details2Intro {
            text-align: center;
            font-size: 18px;
            color: #333333;
            width: 200px;
            margin: auto;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
