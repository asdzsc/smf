<template>
  <div class="home">
    <!-- 顶部图片 start -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
<<<<<<< HEAD
      <van-swipe-item
=======
      <!-- <van-swipe-item
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        v-for="item in banners"
        :key="item.id"
        :style="item.url ? 'cursor: pointer;' : ''"
        @click="openUrl(item.url)"
      >
<<<<<<< HEAD
        <img :onerror="defImg" :src="baseUrl + item.phoneImg" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 顶部图片 end -->
    <div class="cont" style="padding-bottom: 0.4rem">
=======
        <img :src="baseUrl + item.phoneImg"
      /></van-swipe-item> -->
      <van-swipe-item
        ><img src="/img/mobile/mark/banner.png" alt=""
      /></van-swipe-item>
    </van-swipe>
    <!-- 顶部图片 end -->
    <div class="cont">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <div class="title">
        <p class="titleName">名 人 先 贤</p>
        <p class="titleDesc">
          整理记录名人先贤生命故事，追忆他们的卓越功绩，让名人精神千古流传
        </p>
<<<<<<< HEAD
        <div
          class="searchBtn"
          @click="openUrl('/mark/grjn')"
          style="margin: 0 auto"
        >
=======
        <div class="searchBtn" @click="openUrl()" style="margin: 0 auto;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          查找名人
        </div>
      </div>
      <van-swipe class="my-swipe1" :autoplay="3000" indicator-color="#004a30">
        <van-swipe-item>
<<<<<<< HEAD
          <div>
            <img src="/img/mobile/mark/home_1.png" alt="" />
          </div>
          <div>
            <img src="/img/mobile/mark/home_2.png" alt="" />
          </div>
          <div style="height: 0.8rem"></div>
        </van-swipe-item>
        <van-swipe-item>
          <div>
            <img src="/img/mobile/mark/home_3.png" />
          </div>
          <div>
            <img src="/img/mobile/mark/home_4.png" />
          </div>
          <div style="height: 0.8rem"></div>
        </van-swipe-item>
        <van-swipe-item>
          <div>
            <img src="/img/mobile/mark/home_5.png" />
          </div>
          <div>
            <img src="/img/mobile/mark/home_6.png" />
          </div>
          <div style="height: 0.8rem"></div>
        </van-swipe-item>
      </van-swipe>
    </div>

=======
          <img src="/img/mobile/mark/home_1.png" alt="" />
          <img src="/img/mobile/mark/home_2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="/img/mobile/mark/home_3.png" alt="" />
          <img src="/img/mobile/mark/home_4.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="/img/mobile/mark/home_5.png" alt="" />
          <img src="/img/mobile/mark/home_6.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <div class="cont1">
      <div class="title">
        <p class="titleName">革 命 先 烈</p>
        <p class="titleDesc">
          那些曾经在风雨如磐的日子里为了理想、信念，<br />
          为了民族和国家的美好明天而<br />
          抛头颅洒热血的革命先烈们 <br />
          如一座座丰碑永远展现在我们面前
        </p>
<<<<<<< HEAD
        <div class="searchBtn" @click="openUrl('/mark/grjn')">查找先烈</div>
=======
        <div class="searchBtn" @click="openUrl('/mark/grjn')">
          查找先烈
        </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      </div>
    </div>
    <div class="cont2">
      <div class="title">
        <p class="titleName">
          全 方 位 服 务 <br />
          让您轻松享受便捷网上纪念服务
        </p>
<<<<<<< HEAD
        <p class="titleDesc">海量模版为您的“他/她”快捷创建网上纪念馆</p>
        <div class="searchBtn" @click="createMemory()">创建纪念馆</div>
=======
        <p class="titleDesc">
          海量模版为您的“他/她”快捷创建网上纪念馆
        </p>
        <div class="searchBtn" @click="openUrl('/mark/create')">
          创建纪念馆
        </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      </div>
    </div>
    <div class="cont3">
      <div class="title">
        <p class="titleName">寻 根 问 祖</p>
        <p class="titleDesc">
          你是谁？你从哪里来？在这里，你将追根溯源<br />
          找到你想要知道的答案
        </p>
<<<<<<< HEAD
        <div class="searchBtn" @click="openUrl('/mark/zpg')">查找族谱</div>
      </div>
    </div>
    <!-- 激活码框 start -->
    <activeCode v-show="activeDiv"></activeCode>
    <!-- 激活码框 end -->
=======
        <div class="searchBtn" @click="openUrl('/mark/zpg')">
          查找族谱
        </div>
      </div>
    </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  </div>
</template>
<script>
import { bannerList } from "@/pages/mobile/api/shop";

export default {
<<<<<<< HEAD
  components: {
    activeCode: () =>
      import("@/pages/mobile/views/mark/create/components/active-code.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      banners: [],
      activeDiv: false,
=======
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      banners: [],
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this._bannerList();
  },
  methods: {
<<<<<<< HEAD
    handleHide() {
      this.activeDiv = false;
    },
    _bannerList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      bannerList({
        bannerType: "3",
      }).then((res) => {
        this.$toast.clear();
=======
    _bannerList() {
      bannerList({
        bannerType: "3",
      }).then((res) => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
    //创建纪念馆
    createMemory() {
      var token = this.$store.state.account.token;
      if (token) {
        this.activeDiv = true;
      } else {
        var toUrl = encodeURIComponent("/mark/index");
        this.$router.push({
          path: `/login?redirect=${toUrl}`,
        });
      }
    },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
};
</script>

<style lang="less" scoped>
.home {
  .searchBtn {
    width: 2.8rem;
    height: 0.7rem;
    background-color: #00754e;
    text-align: center;
    line-height: 0.7rem;
    color: #fff;
    font-size: 0.28rem;
  }
<<<<<<< HEAD

  .my-swipe {
    img {
      width: 100%;
      height: 15rem;
    }
  }

  .cont {
    padding: 0;

=======
  .my-swipe {
    img {
      width: 100%;
    }
  }
  .cont {
    padding: 0 0.4rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .title {
      text-align: center;
      margin-top: 1.1rem;

      .titleName {
        font-size: 0.52rem;
        font-weight: bold;
        line-height: 0.48rem;
        letter-spacing: 0.03rem;
        color: #333333;
      }

      .titleDesc {
        font-size: 0.28rem;
        line-height: 0.46rem;
        letter-spacing: 0.01rem;
        color: #666666;
        margin: 0.3rem 0;
<<<<<<< HEAD
        padding: 0px 0.4rem;
      }
    }

    .my-swipe1 {
      img {
        width: 100%;
        height: 5rem;
=======
      }
    }
    .my-swipe1 {
      margin-bottom: 0.5rem;
      img {
        width: 100%;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        margin-top: 0.3rem;
      }
    }
  }

  .cont1,
  .cont2,
  .cont3 {
    position: relative;
<<<<<<< HEAD
    height: 16.2rem;
=======
    height: 12.1rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    width: 100%;
    background: url("/img/mobile/mark/banner1.png") no-repeat center center;
    background-size: cover;

    .title {
<<<<<<< HEAD
      color: #ffffff;
      padding-top: 3rem;
=======
      position: absolute;
      color: #ffffff;
      left: 10%;
      top: 10%;
      width: 82%;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      text-align: center;

      .titleName {
        font-size: 0.52rem;
        line-height: 0.48rem;
        letter-spacing: 0.03rem;
      }

      .titleDesc {
<<<<<<< HEAD
        font-size: 0.3rem;
=======
        font-size: 0.28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        line-height: 0.5rem;
        letter-spacing: 0.01rem;
        margin-top: 0.2rem;
      }
    }
<<<<<<< HEAD

    .searchBtn {
      margin: 0.3rem auto;
    }
  }

  .cont2 {
    background: url("/img/mobile/mark/banner2.png") no-repeat center center;
    background-size: cover;

    .title {
      padding-top: 5.2rem;
      color: #333333;

=======
    .searchBtn {
      margin: 0.2rem auto;
    }
  }
  .cont2 {
    background: url("/img/mobile/mark/banner2.png") no-repeat center center;
    background-size: cover;
    .title {
      top: 35%;
      color: #333333;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .titleName {
        font-size: 0.4rem;
        line-height: 0.66rem;
        letter-spacing: 0.03rem;
      }
    }
  }
<<<<<<< HEAD

  .cont3 {
    background: url("/img/mobile/mark/banner3.png") no-repeat center center;
    background-size: cover;

    .title {
      padding-top: 5rem;
=======
  .cont3 {
    background: url("/img/mobile/mark/banner3.png") no-repeat center center;
    background-size: cover;
    .title {
      top: 15%;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    }
  }
}
</style>
