<template>
  <div id="app" @contextmenu.prevent>
    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive> -->
    <!-- <router-view /> -->
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import $ from "jquery";
import * as utils from "@/pages/pc/libs/utils";
import enquireScreen from "@/comment/device";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
    };
  },
  created() {
    // if (!utils.isPc()) {
    //   this.mobile();
    // }
    console.log("document.body.clientWidth", window.innerWidth);
    if (window.innerWidth <= 985) {
      this.mobile();
    }
    this.goUrl();
  },
  mounted() {},
  watch: {
    $route: {
      handler() {
        try {
          $("html,body").animate(
            {
              scrollTop: 0,
            },
            500
          );
          // window.scrollTo({
          // 	top: 0,
          // 	behavior: "smooth"
          // });
        } catch (e) {
          console.log(e);
        }
        // this.goUrl();
        this.setPageTitle();

        // document.querySelector('meta[name="keywords"]').setAttribute('content', 接口获取的keywords)
        // document.querySelector('meta[name="description"]').setAttribute('content', 接口获取的description)
      },
      deep: true,
    },
  },
  methods: {
    goUrl() {
      enquireScreen((isMobile) => {
        if (isMobile) {
          this.mobile();
        }
      });
    },
    setPageTitle() {
      var title = this.$route.meta.title;
      if (!title) {
        title = "武汉石门峰纪念公园";
      } else {
        title = "武汉石门峰纪念公园 - " + title;
      }
      utils.setTitle(title);
    },
    mobile() {
      if (window.location.href.indexOf("#") > 0) {
        window.location.href =
          window.location.protocol +
          "//" +
          window.location.host +
          "/mobile/" +
          window.location.hash;
      } else {
        window.location.href =
          window.location.protocol +
          "//" +
          window.location.host +
          "/mobile" +
          window.location.pathname +
          window.location.search;
      }
    },
  },
};
</script>

<style lang="less"></style>
