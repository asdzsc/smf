<template>
  <div class="home">
    <!-- 顶部图片 start -->
    <a-carousel arrows :autoplay="true">
      <div slot="prevArrow" class="custom-slick-arrow left-circle">
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow right-circle">
        <a-icon type="right-circle" />
      </div>
      <div
        v-for="item in banners"
        :key="item.id"
        :style="item.url ? 'cursor: pointer;' : ''"
        @click="openUrl(item.url)"
      >
        <img :src="baseUrl + item.img" />
      </div>
    </a-carousel>
    <!-- 顶部图片 end -->

    <!-- 线上预约 start -->
    <div class="zaixianzixun">
      <div class="w1920">
        <div class="logo">
          <img src="/img/logo-index.jpg" />
        </div>
        <div class="miaoshu">
          <div class="title2">
            人生圆满<span style="padding-left: 30px">为您服务</span>
          </div>
          <div class="title3">
            我们专业的服务顾问会陪在您身旁，为您未雨绸缪。二十多年精品规划守护您的家人，多样化的服务与福地。选项适合每个家庭的需求。
          </div>
          <div @click="$router.push('/zxfw')" class="title4">
            <div class="yuyueBtn pointer">线上预约</div>
            <div class="setXingcheng pointer">设置您的行程</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 线上预约 end -->

    <!-- VR实景选墓 start -->
    <a href="http://vr100.jsfq.net:19999/tour/65aece4b2f2d4cea" target="_blank">
      <div class="xuanbei">
        <div class="title">VR&nbsp;&nbsp;720°&nbsp;&nbsp;实景选墓</div>
        <div class="xuanbeiBox">
          <div class="item pointer">
            <img src="/img/mubei1.jpg" alt="" />
            <div class="name">明星产品</div>
            <div class="intr">最畅销精简设计的纪念碑</div>
          </div>
          <div class="item pointer">
            <img src="/img/mubei2.jpg" alt="" />
            <div class="name">经典立式</div>
            <div class="intr">精品典雅纪念碑</div>
          </div>
          <div class="item pointer">
            <img src="/img/mubei3.jpg" alt="" />
            <div class="name">经典卧式</div>
            <div class="intr">宝石精品纪念碑</div>
          </div>
        </div>
      </div>
    </a>
    <!-- VR实景选墓 end -->

    <!-- 线上博物馆 start -->
    <div class="onlineBowuguan">
      <div class="content">
        <div class="title">博物馆聚落</div>
        <div class="subtitle">邀您共同探索</div>
        <div class="bowuguanList">
          <div
            @click="$router.push('/bwg/info?id=515384113068720128')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>湖北军民抗战博物馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515389292618924033')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>生活票证馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=526303914752819200')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>楚天将帅馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515392416674955265')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>百姓族谱馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515386491062927360')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>时代记忆馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=518235353057673216')"
            class="item pointer"
          >
            <i class="iconfont icondouble-arro-right"></i>人生圆满博物馆
          </div>
        </div>
      </div>
    </div>
    <!-- 线上博物馆 end -->

    <!-- 网上纪念馆 start -->
    <div class="onlineJinian">
      <div class="jinianBox">
        <div class="title">网上纪念馆</div>
        <div class="jinianList">
          <div class="item" @click="$router.push('/mark')">
            <img src="/img/zhangsan.jpg" alt="" />
            <div class="name">著名曲艺作家、相声表演艺术家</div>
            <div class="intr">夏雨田</div>
          </div>
          <div class="item" @click="$router.push('/mark')">
            <img src="/img/zhangsan2.jpg" alt="" />
            <div class="name">著名作家、散文家</div>
            <div class="intr">碧野</div>
          </div>
          <div class="item" @click="$router.push('/mark')">
            <img src="/img/zhangsan3.jpg" alt="" />
            <div class="name">著名经济学家</div>
            <div class="intr">董辅仍</div>
          </div>
          <div class="item" @click="$router.push('/mark')">
            <img src="/img/zhangsan4.jpg" alt="" />
            <div class="name">中国工程院院士</div>
            <div class="intr">段正澄</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 网上纪念馆 end -->

    <div class="store">
      <div class="title">网上商城</div>
      <div @click="openUrl('/shop')" class="yuyueBtn pointer">购买纪念服务</div>
    </div>

    <myserve></myserve>
  </div>
</template>

<script>
import { bannerList } from "@/pages/pc/api/shop";
export default {
  name: "home",
  components: {
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      banners: [],
      sUserAgent: "",
    };
  },
  computed: {},
  mounted() {
    this._bannerList();
    this.sUserAgent = navigator.userAgent.toLowerCase();
  },
  methods: {
    _bannerList() {
      bannerList({
        bannerType: "1",
      }).then((res) => {
        if (res.code === 0) {
          this.banners = res.data;
        }
      });
    },
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.store {
  background: url("/img/shangcheng.jpg") no-repeat center center;
  background-size: cover;
  height: 770px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;

  .title {
    font-size: 55px;
    letter-spacing: 6px;
    font-weight: 700;
  }

  .yuyueBtn {
    width: 320px;
    height: 75px;
    font-size: 32px;
    border-radius: 38px;
    border: solid 1px #fff;
    text-align: center;
    line-height: 72px;
    color: #fff;
    letter-spacing: 3px;
    margin-top: 45px;
  }
}

// 网上纪念馆
.onlineJinian {
  padding-top: 200px;
  padding-bottom: 150px;

  .jinianBox {
    width: 1155px;
    margin: 0 auto;

    .title {
      font-weight: 700;
      text-align: center;
      font-size: 55px;
      letter-spacing: 6px;
      color: #004a35;
      margin-bottom: 100px;
    }

    .jinianList {
      overflow: hidden;

      .item {
        &:nth-child(odd) {
          margin-right: 15px;
        }

        width: 570px;
        margin-bottom: 50px;
        float: left;
        cursor: pointer;

        .name {
          font-size: 24px;
          color: #004a35;
          margin-top: 10px;
          font-weight: 700;
        }

        .intr {
          font-size: 24px;
          color: #333;
          font-weight: 700;
        }

        img {
          width: 100%;
          height: 415px;
          display: block;
          object-fit: cover;
        }
      }
    }
  }
}

// 线上博物馆
.onlineBowuguan {
  height: 900px;
  background: url("/img/xuanmu.jpg") no-repeat center center;
  background-size: cover;
  padding-top: 285px;
  padding-left: 170px;

  .content {
    color: #fff;

    .title {
      font-size: 80px;
      font-weight: 700;
      letter-spacing: 10px;
    }

    .subtitle {
      font-size: 33px;
      font-weight: 600;
      letter-spacing: 3px;
    }

    .bowuguanList {
      margin-top: 30px;
      width: 600px;
      overflow: hidden;

      .item {
        float: left;
        width: 50%;
        line-height: 2;
        font-size: 23px;

        .iconfont {
          font-size: 23px;
        }
      }
    }
  }
}

// VR实景选墓
.xuanbei {
  padding: 100px 130px;
  position: relative;
  padding-bottom: 180px;

  .title {
    font-size: 30px;
    color: #004a35;
    font-weight: 700;
    letter-spacing: 5px;
    padding-bottom: 20px;
  }

  .xuanbeiBox {
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 50px;
    position: relative;

    &::-webkit-scrollbar-track {
      height: 5px;
      background-color: #c8cac9;
    }

    &::-webkit-scrollbar {
      height: 5px;
      background-color: #004a35;
    }

    &::-webkit-scrollbar-thumb {
      height: 5px;
      background-color: #004a35;
    }

    .item {
      margin-right: 20px;
      position: relative;

      &:last-child {
        margin-right: 0;
      }

      .name {
        font-size: 25px;
        color: #004a35;
        margin-top: 10px;
        font-weight: 700;
      }

      .intr {
        font-size: 18px;
        color: #666666;
        font-weight: 500;
      }

      img {
        width: 485px;
        height: 545px;
        display: block;
        object-fit: cover;
      }
    }
  }
}

// 线上预约
.zaixianzixun {
  position: relative;
  padding: 110px 170px 90px 170px;
  background-color: #f7f7f7;

  .w1920 {
    display: flex;

    .logo img {
      width: 205px;
      height: 205px;
    }

    .miaoshu {
      flex: 1;
      margin-left: 70px;

      .title {
        font-weight: bold;
        font-size: 30px;
        letter-spacing: 5px;
        color: #004a35;

        .title-yw {
          font-size: 32px;
        }
      }

      .title2 {
        font-weight: bold;
        font-size: 40px;
        color: #004a35;
        letter-spacing: 8px;
        padding-top: 10px;
      }

      .title3 {
        font-size: 22px;
        line-height: 36px;
        padding-top: 15px;
        padding-right: 125px;
        letter-spacing: 2px;
      }

      .title4 {
        margin-top: 40px;
        display: flex;
        align-items: center;

        .setXingcheng {
          font-size: 19px;
          color: #004a35;
          font-weight: 540;
          letter-spacing: 2px;
        }

        .yuyueBtn {
          width: 160px;
          height: 44px;
          border-radius: 25px;
          border: 2px solid #004a35;
          text-align: center;
          font-size: 18px;
          font-weight: 540;
          line-height: 40px;
          color: #004a35;
          margin-right: 15px;
          letter-spacing: 1px;
        }
      }
    }
  }
}

// 顶部图片
/deep/ .ant-carousel {
  .slick-prev::before {
    display: none;
  }

  .slick-next::before {
    display: none;
  }

  .left-circle {
    left: 10px;
    z-index: 1;
    color: #ffffff;
    font-size: 40px;

    &:hover {
      opacity: 0.5;
    }
  }

  .right-circle {
    right: 30px;
    z-index: 1;
    color: #ffffff;
    font-size: 40px;

    &:hover {
      opacity: 0.5;
    }
  }

  .slick-slide {
    width: 100%;
    height: calc(100vh - 70px);
    text-align: center;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: calc(100vh - 70px);
    }
  }
}

@media screen and (max-width: 1600px) {
  .zaixianzixun {
    padding: 110px 100px 90px 100px;
  }
}
</style>
