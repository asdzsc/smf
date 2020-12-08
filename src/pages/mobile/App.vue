<template>
  <div id="app">
    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive> -->
    <router-view />
  </div>
</template>

<script>
import * as utils from "@/pages/mobile/libs/utils";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {
    $route: {
      handler() {
        try {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          // $("html,body").animate({
          // 	scrollTop: 0
          // }, 500);
        } catch (e) {
          console.log(e);
        }
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
    pc() {
      var url = window.location.href;
      if (url.includes("/mobile/") || url.includes("/mobile#/")) {
        if (url.includes("/mobile/#/index") || url.includes("/mobile#/index")) {
          window.location.href =
            window.location.protocol + "//" + window.location.host;
        } else {
          url = url.replace("/mobile/", "/").replace("/mobile#/", "/#/");
          window.location.href = url;
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
    }
  }
};
</script>

<style lang="less"></style>
