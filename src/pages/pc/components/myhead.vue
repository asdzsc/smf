<template>
<<<<<<< HEAD
  <div class="headBg">
    <div class="w1920">
      <div class="logo" @click="openUrl('/')" style="cursor: pointer">
        <img src="/img/logo.jpg" alt="" />
      </div>
      <div class="menu">
        <div
          @click="openUrl('/')"
          :class="{ activity: classId === 'home' }"
          class="menuItem"
        >
          首页
        </div>
        <div
          @click="openUrl('/gywm')"
          :class="{ activity: classId === 'gywm' }"
          class="menuItem"
        >
          关于我们
        </div>
        <div
          @click="openUrl('/zxfw')"
          :class="{ activity: classId === 'zxfw' }"
          class="menuItem"
        >
          在线服务
        </div>
        <div
          @click="openUrl('/bwg')"
          :class="{ activity: classId === 'bwg' }"
          class="menuItem"
        >
          博物馆聚落
        </div>
        <div
          @click="openUrl('/xwzx')"
          :class="{ activity: classId === 'xwzx' }"
          class="menuItem"
        >
          公司新闻
        </div>
        <div
          v-if="showMenu"
          @click="openUrl('/lxwm')"
          :class="{ activity: classId === 'lxwm' }"
          class="menuItem"
        >
          联系我们
        </div>
        <transition name="right-slide">
          <div v-show="isSearch" class="searchCont">
            <div class="searchText">
              <input
                v-model="searchKey"
                ref="searchInput"
                @keyup.enter="search()"
                placeholder="网站搜索"
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
                    />&nbsp;退出</a
                  >
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
  name: "myhead",
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
        if (this.$route.path !== "/search") {
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
      this.$store.commit("account/setSearchKeyMain", this.searchKey);
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
    menuActivity() {
      var url = window.location.hash;
      if (url.includes("#/zxfw")) {
        this.classId = "zxfw";
      } else if (url.includes("#/gywm")) {
        this.classId = "gywm";
      } else if (url.includes("#/xwzx")) {
        this.classId = "xwzx";
      } else if (url.includes("#/mark")) {
        this.classId = "mark";
      } else if (url.includes("#/lxwm")) {
        this.classId = "lxwm";
      } else if (url.includes("#/bwg")) {
        this.classId = "bwg";
      } else if (url.indexOf("#/index") === 0) {
        this.classId = "home";
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
  background-color: #004830;
  color: #fff;
  height: 70px;
  line-height: 70px;

  .w1920 {
    display: flex;
    padding: 0px 150px;

    .logo {
      img {
        height: 55px;
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
        height: 36px;
        background-color: #ffffff;
        display: flex;

        .searchText {
          flex: 1;
          line-height: normal;

          .searchInput {
            width: 100%;
            height: 36px;
            outline: none;
            border: 0px;
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
          line-height: 36px;
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

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &.activity {
          background-color: rgba(255, 255, 255, 0.1);
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
          width: 210px;
        }

        .caozuo {
          width: 110px;

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
=======
	<div class="headBg">
		<div class="w1920">
			<div class="logo">
				<img src="/img/logo.jpg" alt="" />
			</div>
			<div class="menu">
				<div @click="openUrl('/')" :class="{ activity: classId === 'home' }" class="menuItem">
					首页
				</div>
				<div @click="openUrl('/gywm')" :class="{ activity: classId === 'gywm' }" class="menuItem">
					关于我们
				</div>
				<div @click="openUrl('/zxfw')" :class="{ activity: classId === 'zxfw' }" class="menuItem">
					在线服务
				</div>
				<div @click="openUrl('/mark')" :class="{ activity: classId === 'mark' }" class="menuItem">
					博物馆群
				</div>
				<div @click="openUrl('/xwzx')" :class="{ activity: classId === 'xwzx' }" class="menuItem">
					公司新闻
				</div>
				<div @click="openUrl('/lxwm')" :class="{ activity: classId === 'lxwm' }" class="menuItem">
					联系我们
				</div>
				<div class=" caozuo">
					<div>
						<i class="iconfont iconsousuo"></i>
					</div>
					<div v-if="!isLogin" @click="openUrl('/login')" style="font-size: 16px;line-height: 20px;padding-left: 20px;">
						登录
					</div>
					<div v-else>
						<a-dropdown placement="bottomRight">
							<!-- <a class="ant-dropdown-link" @click="e => e.preventDefault()">
						      Hover me <a-icon type="down" />
						    </a> -->
							<i @click="openUrl('/member')" class="iconfont iconyonghu"></i>
							<a-menu slot="overlay">
								<a-menu-item> 昵称：{{ user.name }} </a-menu-item>
								<a-menu-item>
									<a href="/#/member/info">账户信息</a>
								</a-menu-item>
								<a-menu-item>
									<a-row type="flex">
										<a-col flex="auto"><a href="/#/member/sys-message-list">消息通知</a></a-col>
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
										<a-icon type="logout" :style="{ fontSize: '16px' }" />&nbsp;退出</a>
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
	import {
		ckToken,
		delToken
	} from "@/pages/pc/api/sso";
	import {
		getCartNum
	} from "@/pages/pc/api/shop";
	import {
		getSysMessageCount
	} from "@/pages/pc/api/sysmessage";
	export default {
		name: "myhead",
		data() {
			return {
				classId: "",
				isLogin: false,
				user: {},
				jobTime: null,
			};
		},
		watch: {
			$route: {
				handler() {
					this.menuActivity();
				},
				deep: true
			}
		},
		computed: {
			cartNum() {
				return this.$store.state.account.cartNum;
			},
			sysMessageNum() {
				return this.$store.state.account.sysMessageNum;
			}
		},
		mounted() {
			this.menuActivity();
			this.getUserInfo();
		},
		//页面销毁前
		beforeDestroy() {
			console.log('销毁定时器')
			if (this.jobTime) {
				//销毁定时器
				clearInterval(this.jobTime);
				this.jobTime = null;
			}
		},
		methods: {
			getUserInfo() {
				ckToken().then(res => {
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
				getCartNum().then(res => {
					if (res.code === 0) {
						this.$store.commit("account/setCartNum", res.data);
					}
				});
			},
			_getSysMessageCount() {
				getSysMessageCount({
					isRead: '0'
				}).then(res => {
					if (res.code === 0) {
						this.$store.commit("account/setSysMessageNum", res.data);
					}
				})
			},
			openUrl(url) {
				this.$router.push(url);
			},
			menuActivity() {
				var url = window.location.hash;
				if (url.includes("#/zxfw")) {
					this.classId = "zxfw";
				} else if (url.includes("#/gywm")) {
					this.classId = "gywm";
				} else if (url.includes("#/xwzx")) {
					this.classId = "xwzx";
				}else if (url.includes("#/mark")) {
					this.classId = "mark";
				} else if (url.indexOf("#/index") === 0) {
					this.classId = "home";
				} else {
					this.classId = "";
				}
			},
			//退出登录
			logout() {
				var vm = this
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
					onCancel() {}
				});
			}
		}
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
		background-color: #004830;
		color: #fff;
		height: 70px;
		line-height: 70px;

		.w1920 {
			display: flex;
			padding: 0px 150px;

			.logo {
				img {
					height: 55px;
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

					&:hover {
						background-color: rgba(255, 255, 255, 0.1);
					}

					&.activity {
						background-color: rgba(255, 255, 255, 0.1);
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

					.caozuo {
						width: 100px;

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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
