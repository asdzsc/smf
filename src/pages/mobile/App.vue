<template>
<<<<<<< HEAD
  <div id="app" @contextmenu.prevent>
=======
  <div id="app">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive> -->
    <router-view />
  </div>
</template>

<script>
import * as utils from "@/pages/mobile/libs/utils";
<<<<<<< HEAD
import enquireScreen from "@/comment/device";
=======

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
export default {
  name: "App",
  data() {
    return {};
  },
<<<<<<< HEAD
  created() {
    // if (utils.isPc()) {
    //   this.pc();
    // }
    console.log("document.body.clientWidth", window.innerWidth);
    if (window.innerWidth > 985) {
      this.pc();
    }
    this.goUrl();
  },
  mounted() {
    //锁定字体大小
    switch (document.readyState) {
      case "loading":
        if (
          typeof WeixinJSBridge == "object" &&
          typeof WeixinJSBridge.invoke == "function"
        ) {
          handleFontSize();
        } else {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              handleFontSize,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
          }
        }

        function handleFontSize() {
          // 设置网页字体为默认大小
          WeixinJSBridge.invoke("setFontSizeCallback", {
            fontSize: 0,
          });
          // 重写设置网页字体大小的事件
          WeixinJSBridge.on("menu:setfont", function () {
            WeixinJSBridge.invoke("setFontSizeCallback", {
              fontSize: 0,
            });
          });
        }
        break;
    }
  },
=======
  created() {},
  mounted() {},
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  watch: {
    $route: {
      handler() {
        try {
          window.scrollTo({
            top: 0,
<<<<<<< HEAD
            behavior: "smooth",
=======
            behavior: "smooth"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          });
          // $("html,body").animate({
          // 	scrollTop: 0
          // }, 500);
        } catch (e) {
          console.log(e);
        }
<<<<<<< HEAD
        // this.goUrl();
        this.setPageTitle();
      },
      deep: true,
    },
  },
  methods: {
    goUrl() {
      enquireScreen((isMobile) => {
        if (!isMobile) {
          this.pc();
        }
      });
=======
        this.goUrl();
        this.setPageTitle();
      },
      deep: true
    }
  },
  methods: {
    goUrl() {
      if (utils.isPc()) {
        this.pc();
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    setPageTitle() {
      var title = this.$route.meta.title;
      if (!title) {
        title = "武汉石门峰纪念公园";
      } else {
        title = "武汉石门峰纪念公园 - " + title;
      }
      utils.setTitle(title);
<<<<<<< HEAD
      if (utils.isWeiXin()) {
        wx.miniProgram.postMessage({ data: { title: "title" } });
      }
    },
    pc() {
      //白名单，不处理适配跳转
      const filtrList = ["/live/live-play", "/live/live-info", "/gjfw"];

      var url = window.location.href;
      var query = filtrList.filter((x) => {
        return url.indexOf(x) !== -1;
      });
      if (query.length == 0) {
        if (url.includes("/mobile/") || url.includes("/mobile#/")) {
          if (
            url.includes("/mobile/#/index") ||
            url.includes("/mobile#/index")
          ) {
            window.location.href =
              window.location.protocol + "//" + window.location.host;
          } else {
            url = url.replace("/mobile/", "/").replace("/mobile#/", "/#/");
            window.location.href = url;
          }
=======
    },
    pc() {
      var url = window.location.href;
      if (url.includes("/mobile/") || url.includes("/mobile#/")) {
        if (url.includes("/mobile/#/index") || url.includes("/mobile#/index")) {
          window.location.href =
            window.location.protocol + "//" + window.location.host;
        } else {
          url = url.replace("/mobile/", "/").replace("/mobile#/", "/#/");
          window.location.href = url;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      }
    },
    mobile() {
      var url = window.location.hash;
      if (!url.includes("#/mobile/")) {
        url = url.replace("#/", "/mobile/");
        console.log("mobile ", url);
        this.$router.push(url);
      }
<<<<<<< HEAD
    },
  },
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  /* 字体抗锯齿渲染 */
  -webkit-text-size-adjust: 100% !important; /*重要*/
  /* 禁用iPhone中Safari的字号自动调整 */
  -webkit-user-select: none;
  /* 禁用用户选中页面内容 */
  -webkit-overflow-scrolling: touch;
  /* 解决IOS默认滑动很卡的情况 */
  -webkit-touch-callout: none;
  /* 触摸或长按目标时禁止显示系统默认菜单 */
  position: relative;
  font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana,
    Roboto, Noto, Helvetica Neue, sans-serif;
}
</style>
=======
    }
  }
};
</script>

<style lang="less"></style>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
