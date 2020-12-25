<template>
  <div class="home">
    <!-- 顶部图片 start -->
    <div class="carouselWrap">
      <a-carousel :dot-position="dotPosition" :autoplay="true">
        <div
          v-for="item in banners"
          :key="item.id"
          :style="item.url ? 'cursor: pointer;' : ''"
          @click="openUrl(item.url)"
        >
          <img :src="baseUrl + item.img" />
        </div>
      </a-carousel>
    </div>

    <!-- 顶部图片 end -->
    <div class="cont">
      <div class="title">
        <p class="titleName">名 人 先 贤</p>
        <p class="titleDesc">
          整理记录名人先贤生命故事，追忆他们的卓越功绩，让名人精神千古流传
        </p>
        <div class="searchBtn" @click="openUrl()" style="margin: 0 auto;">
          查找名人
        </div>
      </div>
      <div class="introImgs">
        <div class="imgItem">
          <img src="/img/pc/home_1.png" />
        </div>
        <div class="imgItem">
          <img src="/img/pc/home_2.png" />
        </div>
        <div class="imgItem">
          <img src="/img/pc/home_3.png" />
        </div>
        <div class="imgItem">
          <img src="/img/pc/home_4.png" />
        </div>
        <div class="imgItem">
          <img src="/img/pc/home_5.png" />
        </div>
        <div class="imgItem">
          <img src="/img/pc/home_6.png" />
        </div>
      </div>
    </div>
    <div class="cont1">
      <div class="title">
        <p class="titleName">革 命 先 烈</p>
        <p class="titleDesc">
          让爱与思念没有距离那些曾经在风雨如磐的日子里为了理想、信念，<br />
          为了民族和国家的美好明天而抛头颅洒热血的革命先烈们<br />
          如一座座丰碑永远展现在我们面前
        </p>
        <div class="searchBtn" @click="openUrl('/mark/grjn')">
          查找先烈
        </div>
      </div>
    </div>
    <div class="cont2">
      <div class="title">
        <p class="titleName">全方位服务<br />让您轻松享受便捷网上纪念服务</p>
        <p class="titleDesc">海量模版为您的“他/她”快捷创建网上纪念馆</p>
        <div class="searchBtn" @click="openUrl('/mark/create')">
          创建纪念馆
        </div>
      </div>
    </div>
    <div class="cont3">
      <div class="title">
        <p class="titleName">寻 根 问 祖</p>
        <p class="titleDesc">
          你是谁？你从哪里来？ <br />
          在这里，你将追根溯源，找到你想要知道的答案
        </p>
        <div class="searchBtn" @click="openUrl('/mark/zpg')">
          查找族谱
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bannerList } from "@/pages/pc/api/shop";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      dotPosition: "right",
      banners: [],
    };
  },
  mounted() {
    this._bannerList();
  },
  methods: {
    _bannerList() {
      bannerList({
        bannerType: "3",
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
.home {
  .searchBtn {
    width: 200px;
    height: 40px;
    background-color: #00754e;
    text-align: center;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
  }

  .carouselWrap {
    height: calc(100vh - 70px);
    // 顶部图片
    /deep/ .ant-carousel {
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
  }

  .cont {
	  width: 1240px;
	  margin:  0 auto;
    .title {
      text-align: center;
      margin-top: 110px;
      .titleName {
        font-size: 60px;
        font-weight: bold;
        line-height: 28px;
        letter-spacing: 6px;
        color: #333333;
      }

      .titleDesc {
        font-size: 28px;
        line-height: 46px;
        letter-spacing: 1px;
        color: #666666;
      }
    }

    .introImgs {
      margin-top: 50px;
      display: inline-block;

      .imgItem {
        width: 400px;
        height: 260px;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(3n + 3) {
          margin-right: 0px;
        }

        img {
          width: 400px;
          height: 260px;
        }
      }
    }
  }

  .cont1 {
    position: relative;
    margin-top: 70px;
    height: 980px;
    background: url("/img/pc/banner1.png") no-repeat center center;
    background-size: cover;

    .title {
      position: absolute;
      color: #ffffff;
      left: 7%;
      top: 20%;

      .titleName {
        font-size: 60px;
        line-height: 28px;
        letter-spacing: 2px;
      }

      .titleDesc {
        font-size: 24px;
        letter-spacing: 1px;
      }
    }
  }

  .cont2,
  .cont3 {
    margin-top: 70px;
    position: relative;
    height: 980px;
    background: url("/img/pc/banner2.png") no-repeat center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      position: absolute;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .titleName {
        font-size: 46px;
        font-weight: bold;
        line-height: 66px;
        letter-spacing: 2px;
        color: #333333;
      }

      .titleDesc {
        font-size: 24px;
        line-height: 66px;
        letter-spacing: 1px;
        color: #666666;
        margin-top: 0;
      }
    }
  }

  .cont3 {
    background: url("/img/pc/banner3.png") no-repeat center center;
    background-size: cover;
    align-items: inherit;
    height: 980px;
    position: relative;

    .title {
      position: absolute;
      top: 15%;

      .titleName {
        color: #fff;
        line-height: 28px;
      }

      .titleDesc {
        color: #fff;
        line-height: 36px;
      }
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
</style>
