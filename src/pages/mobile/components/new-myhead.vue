<template>
  <div class="head">
    <van-row>
      <van-col span="8">
        <img
          @click="
            () => {
              show = !show;
            }
          "
          class="head-nav"
          src="/img/mobile/mark/nav.png"
        />
      </van-col>
      <van-col span="8" style="text-align:center;">
        <img class="head-logo" src="/img/mobile/mark/logo.png" />
      </van-col>
      <van-col class="head-icon" span="8">
        <i class="iconfont iconsousuo"></i>
        <i
          @click="$router.push('/member/userInfo')"
          class="iconfont iconyonghu"
        ></i>
      </van-col>
    </van-row>

    <transition name="meun">
      <div v-show="show" class="meun">
        <div
          v-for="item in menuList"
          :key="item.name"
          @click="openUrl(item.url)"
        >
          <van-row class="meun-item">
            <van-col span="20">{{ item.name }}</van-col>
            <van-col style="text-align:right" span="4">
              <van-icon name="arrow" />
            </van-col>
          </van-row>
          <div class="line"></div>
        </div>
      </div>
    </transition>
    <div v-if="show" @click="show = false" class="overlay"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      menuList: [
        { name: "首页", url: "/mark" },
        { name: "个人纪念馆", url: "/mark/grjn" },
        { name: "个人中心", url: "/member/userInfo" },
        { name: "关于本馆", url: "/mark/gybg" },
        { name: "族谱馆", url: "/mark/zpg" },
      ],
    };
  },
  watch: {
    $route: {
      handler() {
        this.show = false;
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.mobile-index {
  .head {
    height: 0.88rem;
    padding: 0px 0.4rem;
    background-color: #fff;
    position: relative;
    z-index: 6;
    .head-nav {
      width: 0.42rem;
      padding-top: 0.25rem;
    }
    .head-logo {
      width: 2rem;
      margin-top: 0.15rem;
      padding-top: 0.1rem;
    }
    .head-icon {
      text-align: right;
      padding-top: 0.1rem;
      color: #17815e;
      .iconsousuo {
        font-size: 0.5rem;
      }
      .iconyonghu {
        font-size: 0.5rem;
        margin-left: 0.5rem;
      }
    }
    .meun {
      width: 4.4rem;
      height: 5rem;
      background-color: #004930;
      opacity: 0.8;
      left: 0px;
      top: 0.88rem;
      position: absolute;
      z-index: 2;
      .meun-item {
        font-size: 0.3rem;
        color: #fefefe;
        // font-weight: 100;
        padding-left: 0.8rem;
        padding-right: 0.3rem;
        padding-top: 0.3rem;
        padding-bottom: 0.2rem;
      }
      .line {
        height: 1px;
        background-color: #ffffff;
        opacity: 0.25;
      }
    }
    .meun-enter-active,
    .meun-leave-active {
      transition: all 0.35s ease;
    }
    .meun-enter {
      opacity: 0;
      // transform: translateX(100%);
      transform: translateX(-100%);
    }
    .meun-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100vh;
      left: 0px;
      top: 0px;
      z-index: 1;
    }
  }
}
</style>
