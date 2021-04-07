<template>
  <div class="headBg">
    <div class="w1920">
      <div class="logo" @click="openUrl('/mark/index')" style="cursor: pointer">
        <img src="/img/pc/logo.png" alt="" />
      </div>
      <div class="menu">
        <div
          @click="openUrl('/mark/index')"
          :class="{ activity: classId === 'index' }"
          class="menuItem"
        >
          首页
        </div>
        <div
          @click="openUrl('/mark/grjn')"
          :class="{ activity: classId === 'grjn' }"
          class="menuItem"
        >
          个人纪念馆
        </div>
        <div
          @click="openUrl('/member/userInfo')"
          :class="{ activity: classId === 'userInfo' }"
          class="menuItem"
        >
          个人中心
        </div>
        <div
          @click="openUrl('/mark/gybg')"
          :class="{ activity: classId === 'gybg' }"
          class="menuItem"
        >
          关于本馆
        </div>
        <div
          v-if="showMenu"
          @click="openUrl('/mark/zpg')"
          :class="{ activity: classId === 'zpg' }"
          class="menuItem"
        >
          族谱馆
        </div>
        <transition name="right-slide">
          <div v-show="isSearch" class="searchCont">
            <div class="searchText">
              <input
                v-model="searchKey"
                ref="searchInput"
                @keyup.enter="search()"
                placeholder="查找亲友姓名"
                class="searchInput"
              />
            </div>
            <div class="searchClose">
              <i @click="closeSearch()" class="iconfont iconclose"></i>
            </div>
          </div>
        </transition>
        <div v-if="showMenu" class="caozuo">
          <div>
            <i @click="openSearch()" class="iconfont iconsousuo"></i>
          </div>
          <div
            v-if="!isLogin"
            @click="openUrl('/login')"
            style="font-size: 16px; line-height: 20px; padding-left: 20px"
          >
            登录
          </div>
          <div v-else>
            <a-dropdown placement="bottomRight">
              <i @click="openUrl('/member')" class="iconfont iconyonghu"></i>
              <a-menu slot="overlay">
                <a-menu-item> 昵称：{{ user.name }} </a-menu-item>
                <a-menu-item>
                  <a href="/#/member/userInfo">账户信息</a>
                </a-menu-item>
                <a-menu-item>
                  <a-row type="flex">
                    <a-col flex="auto"
                      ><a href="/#/member/sys-message-list">消息通知</a></a-col
                    >
                    <a-col v-if="sysMessageNum > 0">
                      <a-badge :count="sysMessageNum" />
                    </a-col>
                  </a-row>
                </a-menu-item>
                <a-menu-item>
                  <a-row type="flex">
                    <a-col flex="auto"><a href="/#/shop/cart">购物车</a></a-col>
                    <a-col v-if="cartNum > 0">
                      <a-badge :count="cartNum" />
                    </a-col>
                  </a-row>
                </a-menu-item>
                <a-menu-item>
                  <a href="/#/shop/order">服务订单</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a @click="logout()">
                    <a-icon
                      type="logout"
                      :style="{ fontSize: '16px' }"
                    />&nbsp;退出
                  </a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ckToken, delToken } from "@/pages/pc/api/sso";
import { getCartNum } from "@/pages/pc/api/shop";
import { getSysMessageCount } from "@/pages/pc/api/sysmessage";
export default {
  data() {
    return {
      classId: "",
      isLogin: false,
      user: {},
      jobTime: null,
      isSearch: false,
      showMenu: true,
      searchKey: "",
    };
  },
  watch: {
    $route: {
      handler() {
        this.menuActivity();
        if (this.$route.path !== "/mark/grjn") {
          this.closeSearch();
        }
      },
      deep: true,
    },
  },
  computed: {
    cartNum() {
      return this.$store.state.account.cartNum;
    },
    sysMessageNum() {
      return this.$store.state.account.sysMessageNum;
    },
  },
  mounted() {
    if (this.$route.query.wd) {
      this.openSearch();
      this.searchKey = decodeURIComponent(this.$route.query.wd);
      this.$store.commit("account/setSearchKey", this.searchKey);
    }
    this.menuActivity();
    this.getUserInfo();
  },
  //页面销毁前
  beforeDestroy() {
    console.log("销毁定时器");
    if (this.jobTime) {
      //销毁定时器
      clearInterval(this.jobTime);
      this.jobTime = null;
    }
  },
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
      this.$store.commit("account/setSearchKey", this.searchKey);
      setTimeout(() => {
        this.showMenu = true;
      }, 300);
    },
    search() {
      this.searchKey = this.searchKey.trim();
      console.log("search");
      if (this.searchKey) {
        this.$store.commit("account/setSearchKey", this.searchKey);
        this.$router.push({
          path: "/mark/grjn",
          query: {},
        });
      }
    },
    getUserInfo() {
      ckToken().then((res) => {
        if (res.code === 0) {
          this.user = this.$store.state.account.user;
          this._getCartNum();
          this._getSysMessageCount();
          this.isLogin = true;
        } else {
          this.isLogin = false;
          delToken().then(() => {});
        }
      });
    },
    _getCartNum() {
      getCartNum().then((res) => {
        if (res.code === 0) {
          this.$store.commit("account/setCartNum", res.data);
        }
      });
    },
    _getSysMessageCount() {
      getSysMessageCount({
        isRead: "0",
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit("account/setSysMessageNum", res.data);
        }
      });
    },
    openUrl(url) {
      this.$router.push(url);
    },
    menuActivity() {
      var url = window.location.hash;
      if (url.includes("#/mark/grjn")) {
        this.classId = "grjn";
      } else if (url.includes("#/mark/gybg")) {
        this.classId = "gybg";
      } else if (url.includes("#/mark/zpg")) {
        this.classId = "zpg";
      } else if (url.indexOf("#/mark/index") === 0) {
        this.classId = "index";
      } else {
        this.classId = "";
      }
    },
    //退出登录
    logout() {
      var vm = this;
      this.$confirm({
        title: "确认要退出吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          delToken().then(() => {
            vm.$router.replace("/login");
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-dropdown-menu-item {
  min-width: 150px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: transparent;
  }

  a {
    color: rgba(0, 0, 0, 0.65);

    &:hover {
      color: #1890ff;
    }
  }
}

.headBg {
  background-color: #fff;
  color: #000000;
  height: 90px;
  line-height: 90px;

  .w1920 {
    display: flex;
    padding: 0px 150px;

    .logo {
      img {
        height: 49px;
      }
    }

    .menu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 18.5px;
      padding-right: 6px;
      min-width: 720px;

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

      .searchCont {
        width: 257px;
        display: flex;

        .searchText {
          flex: 1;

          .searchInput {
            width: 100%;
            height: 36px;
            outline: none;
            border: 0px;
            border-bottom: 1px solid #dddddd;

            font-size: 16px;
            font-weight: none;
            padding: 0px 10px;
            color: #333333;

            &:hover {
              border-color: #004930;
            }
          }
        }

        .searchClose {
          width: 20px;
          color: #333333;
          cursor: pointer;
        }
      }

      .caozuo {
        width: 140px;
        padding: 0 !important;
        display: flex;
        align-items: center;
        padding: 0 30px;
        text-align: center;
        line-height: 70px;
        cursor: pointer;

        div {
          padding-left: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;

          .iconfont {
            font-size: 29px;
          }
        }
      }

      .menuItem {
        padding: 0 30px;
        text-align: center;
        line-height: 70px;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-bottom: 5px solid #004830;
        }

        &.activity {
          background-color: rgba(255, 255, 255, 0.1);
          border-bottom: 5px solid #004830;
        }
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .headBg {
    .w1920 {
      .menu {
        font-size: 16px;

        .searchCont {
          width: 188px;
        }

        .caozuo {
          width: 140px;

          div {
            padding-left: 30px;

            .iconfont {
              font-size: 20px;
            }
          }
        }

        .menuItem {
          padding: 0 20px;
        }
      }
    }
  }
}
</style>
