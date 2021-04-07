<template>
  <div class="head">
    <van-row v-show="showMenu">
      <van-col span="8">
        <img
          @click="
            () => {
              show = !show;
            }
          "
          class="head-nav"
          src="/img/mobile/nav.png"
        />
      </van-col>
      <van-col span="8" style="text-align: center">
        <img class="head-logo" src="/img/mobile/logo.png" />
      </van-col>
      <van-col class="head-icon" span="8">
        <i @click="openSearch()" class="iconfont iconsousuo"></i>
        <i
          @click="$router.push('/member/userInfo')"
          class="iconfont iconyonghu"
        ></i>
      </van-col>
    </van-row>
    <transition name="right-slide">
      <van-row>
        <van-col span="24">
          <van-search
            v-show="isSearch"
            v-model="searchKey"
            ref="searchInput"
            placeholder="网站搜索"
            show-action
            @search="search()"
            @cancel="closeSearch()"
          />
        </van-col>
      </van-row>
    </transition>
    <transition name="meun">
      <div v-show="show" class="meun">
        <div
          v-for="item in menuList"
          :key="item.name"
          @click="openUrl(item.url)"
        >
          <van-row class="meun-item">
            <van-col span="20">{{ item.name }}</van-col>
            <van-col style="text-align: right" span="4">
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
        { name: "首页", url: "/" },
        { name: "关于我们", url: "/gywm" },
        {
          name: "VR720实景购墓",
          url: "http://vr100.jsfq.net:19999/tour/65aece4b2f2d4cea",
        }, ///shop/more
        { name: "在线服务", url: "/zxfw" },
        { name: "博物馆聚落", url: "/bwg" },
        { name: "公司新闻", url: "/xwzx" },
        { name: "联系我们", url: "/lxwm" },
      ],
      isSearch: false,
      showMenu: true,
      searchKey: "",
    };
  },
  watch: {
    $route: {
      handler() {
        this.show = false;
        if (this.$route.path !== "/search") {
          this.closeSearch();
        }
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    openSearch() {
      this.showMenu = false;
      this.isSearch = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    closeSearch() {
      this.isSearch = false;
      this.searchKey = "";
      this.$store.commit("account/setSearchKeyMain", this.searchKey);
      setTimeout(() => {
        this.showMenu = true;
      }, 300);
    },
    search() {
      if (this.searchKey) {
        this.$store.commit("account/setSearchKeyMain", this.searchKey);
        this.$router.push({
          path: "/search",
          query: {},
        });
      }
    },
    openUrl(url) {
      if (url) {
        if (
          url.indexOf("http://") == 0 ||
          url.indexOf("https://") == 0 ||
          url.indexOf("//") == 0
        ) {
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
.mobile-index {
  .head {
    height: 0.88rem;
    padding: 0px 0.4rem;
    background-color: #004930;
    position: relative;
    z-index: 6;
    .right-slide-enter,
    .right-slide-leave-active {
      transform: translateX(100%);
      opacity: 0;
    }

    .right-slide-leave-active,
    .right-slide-enter-active {
      transition: all 0.3s;
      opacity: 1;
    }
    .van-search {
      padding: 5px 0px;
    }
    .head-nav {
      width: 0.42rem;
      padding-top: 0.25rem;
    }
    .head-logo {
      width: 1.05rem;
      padding-top: 0.1rem;
    }
    .head-icon {
      text-align: right;
      padding-top: 0.1rem;
      color: #fff;
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
      height: 6.7rem;
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
