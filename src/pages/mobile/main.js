import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";

//移动端组件
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

import NProgress from "nprogress";
import "nprogress/nprogress.css";

require("./assets/css/common.css");

Vue.config.productionTip = false;

Vue.use(NProgress);
//剪切板
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "128d83dd425d1ef0aa8d1f0663e14ede",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor"
  ],
  v: "1.4.9"
});

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
require("./assets/css/myVideoCss.css");
import "videojs-contrib-hls";
Vue.use(VideoPlayer);

// import VConsole from "vconsole";
// let vConsole = new VConsole(); //初始化
// Vue.use(vConsole); //设为全局

//系统错误捕获
const errorHandler = (error, vm) => {
  console.error("抛出全局异常");
  console.error(vm);
  console.error(error);
};
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = error => errorHandler(error, this);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
