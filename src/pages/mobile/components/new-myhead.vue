<template>
  <div class="head">
<<<<<<< HEAD
    <van-row v-show="showMenu">
=======
    <van-row>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
      <van-col span="8" style="text-align: center">
        <img class="head-logo" src="/img/mobile/mark/logo.png" />
      </van-col>
      <van-col class="head-icon" span="8">
        <i @click="openSearch()" class="iconfont iconsousuo"></i>
=======
      <van-col span="8" style="text-align:center;">
        <img class="head-logo" src="/img/mobile/mark/logo.png" />
      </van-col>
      <van-col class="head-icon" span="8">
        <i class="iconfont iconsousuo"></i>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <i
          @click="$router.push('/member/userInfo')"
          class="iconfont iconyonghu"
        ></i>
      </van-col>
    </van-row>

<<<<<<< HEAD
    <transition name="right-slide">
      <van-row>
        <van-col span="24">
          <van-search
            v-show="isSearch"
            v-model="searchKey"
            ref="searchInput"
            placeholder="查找亲友姓名"
            show-action
            @search="search()"
            @cancel="closeSearch()"
          />
        </van-col>
      </van-row>
    </transition>

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <transition name="meun">
      <div v-show="show" class="meun">
        <div
          v-for="item in menuList"
          :key="item.name"
          @click="openUrl(item.url)"
        >
          <van-row class="meun-item">
            <van-col span="20">{{ item.name }}</van-col>
<<<<<<< HEAD
            <van-col style="text-align: right" span="4">
=======
            <van-col style="text-align:right" span="4">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
        {
          name: "首页",
          url: "/mark",
        },
        {
          name: "个人纪念馆",
          url: "/mark/grjn",
        },
        {
          name: "个人中心",
          url: "/member/userInfo",
        },
        {
          name: "关于本馆",
          url: "/mark/gybg",
        },
        {
          name: "族谱馆",
          url: "/mark/zpg",
        },
      ],
      isSearch: false,
      showMenu: true,
      searchKey: "",
=======
        { name: "首页", url: "/mark" },
        { name: "个人纪念馆", url: "/mark/grjn" },
        { name: "个人中心", url: "/member/userInfo" },
        { name: "关于本馆", url: "/mark/gybg" },
        { name: "族谱馆", url: "/mark/zpg" },
      ],
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  watch: {
    $route: {
      handler() {
        this.show = false;
<<<<<<< HEAD
        if (this.$route.path !== "/mark/grjn") {
          this.closeSearch();
        }
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
<<<<<<< HEAD
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
      this.searchKey = this.searchKey.trim();
      console.log("search");
      if (this.searchKey) {
        this.$store.commit("account/setSearchKeyMain", this.searchKey);
        this.$router.push({
          path: "/search",
          query: {},
        });
      }
    },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD

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

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .head-nav {
      width: 0.42rem;
      padding-top: 0.25rem;
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .head-logo {
      width: 2rem;
      margin-top: 0.15rem;
      padding-top: 0.1rem;
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .head-icon {
      text-align: right;
      padding-top: 0.1rem;
      color: #17815e;
<<<<<<< HEAD

      .iconsousuo {
        font-size: 0.5rem;
      }

=======
      .iconsousuo {
        font-size: 0.5rem;
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .iconyonghu {
        font-size: 0.5rem;
        margin-left: 0.5rem;
      }
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .meun {
      width: 4.4rem;
      height: 5rem;
      background-color: #004930;
      opacity: 0.8;
      left: 0px;
      top: 0.88rem;
      position: absolute;
      z-index: 2;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .meun-item {
        font-size: 0.3rem;
        color: #fefefe;
        // font-weight: 100;
        padding-left: 0.8rem;
        padding-right: 0.3rem;
        padding-top: 0.3rem;
        padding-bottom: 0.2rem;
      }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .line {
        height: 1px;
        background-color: #ffffff;
        opacity: 0.25;
      }
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .meun-enter-active,
    .meun-leave-active {
      transition: all 0.35s ease;
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .meun-enter {
      opacity: 0;
      // transform: translateX(100%);
      transform: translateX(-100%);
    }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
