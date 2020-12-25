import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";

import "babel-polyfill";

//PC端组件
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

// Viewer(图片预览放大)
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)
Viewer.setDefaults({
    Options: {
        'inline': true, // 启用 inline 模式
        'button': true, // 显示右上角关闭按钮
        'navbar': true, // 显示缩略图导航
        'title': true, // 显示当前图片的标题
        'toolbar': true, // 显示工具栏
        'tooltip': true, // 显示缩放百分比
        'movable': true, // 图片是否可移动
        'zoomable': true, // 图片是否可缩放
        'rotatable': true, // 图片是否可旋转
        'scalable': true, // 图片是否可翻转
        'transition': true, // 使用 CSS3 过度
        'fullscreen': true, // 播放时是否全屏
        'keyboard': true, // 是否支持键盘
        'url': 'data-source' // 设置大图片的 url
    }
})




import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "./assets/css/common.less";

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