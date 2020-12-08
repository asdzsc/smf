import Vue from "vue";
import Antd from "ant-design-vue";
import { Icon } from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import store from "@/store";
import "./assets/style/index.less";
// 引入echarts
import echarts from "echarts";

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
require("./assets/style/myVideoCss.css");
import "videojs-contrib-hls";

Vue.use(VideoPlayer);

// import moment from "moment";
// import "moment/locale/zh-cn";
// moment.locale("zh-cn");

Vue.config.productionTip = false;
Vue.use(Antd);

Vue.prototype.$echarts = echarts;

//阿里图标库 iconfont.cn
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1747779_t33v1o7g7m.js"
});
Vue.component("icon-font", IconFont);

import VueCodeMirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
Vue.use(VueCodeMirror);

// eslint-disable-next-line no-undef
window.UE.Editor.prototype._bkGetActionUrl =
  window.UE.Editor.prototype.getActionUrl;
// eslint-disable-next-line no-undef
window.UE.Editor.prototype.getActionUrl = function(action) {
  if (action == "uploadimage" || action == "uploadscrawl") {
    var url = process.env.VUE_APP_BASE_URL + "/ueditor/uploadimage";
    return url;
  } else if (action == "uploadvideo") {
    return process.env.VUE_APP_BASE_URL + "/ueditor/uploadvideo";
  } else if (action == "uploadfile") {
    return process.env.VUE_APP_BASE_URL + "/ueditor/uploadfile";
  } else {
    return this._bkGetActionUrl.call(this, action);
  }
};

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
