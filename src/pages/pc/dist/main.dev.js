"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("@/store"));

require("babel-polyfill");

var _antDesignVue = _interopRequireDefault(require("ant-design-vue"));

require("ant-design-vue/dist/antd.css");

var _vueAwesomeSwiper = _interopRequireDefault(require("vue-awesome-swiper"));

require("swiper/css/swiper.css");

var _vViewer = _interopRequireDefault(require("v-viewer"));

require("viewerjs/dist/viewer.css");

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

require("./assets/css/common.less");

var _vueClipboard = _interopRequireDefault(require("vue-clipboard2"));

var _vueAmap = _interopRequireDefault(require("vue-amap"));

var _vueVideoPlayer = _interopRequireDefault(require("vue-video-player"));

require("videojs-contrib-hls");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_antDesignVue["default"]); // swiper


_vue["default"].use(_vueAwesomeSwiper["default"]
/* { default options with global component } */
); // Viewer(图片预览放大)


_vue["default"].use(_vViewer["default"]);

_vViewer["default"].setDefaults({
  Options: {
    'inline': true,
    // 启用 inline 模式
    'button': true,
    // 显示右上角关闭按钮
    'navbar': true,
    // 显示缩略图导航
    'title': true,
    // 显示当前图片的标题
    'toolbar': true,
    // 显示工具栏
    'tooltip': true,
    // 显示缩放百分比
    'movable': true,
    // 图片是否可移动
    'zoomable': true,
    // 图片是否可缩放
    'rotatable': true,
    // 图片是否可旋转
    'scalable': true,
    // 图片是否可翻转
    'transition': true,
    // 使用 CSS3 过度
    'fullscreen': true,
    // 播放时是否全屏
    'keyboard': true,
    // 是否支持键盘
    'url': 'data-source' // 设置大图片的 url

  }
});

_vue["default"].config.productionTip = false;

_vue["default"].use(_nprogress["default"]); //剪切板


_vue["default"].use(_vueClipboard["default"]);

_vue["default"].use(_vueAmap["default"]);

_vueAmap["default"].initAMapApiLoader({
  key: "128d83dd425d1ef0aa8d1f0663e14ede",
  plugin: ["AMap.Autocomplete", "AMap.PlaceSearch", "AMap.Scale", "AMap.OverView", "AMap.ToolBar", "AMap.MapType", "AMap.PolyEditor", "AMap.CircleEditor"],
  v: "1.4.9"
});

require("video.js/dist/video-js.css");

require("vue-video-player/src/custom-theme.css");

require("./assets/css/myVideoCss.css");

_vue["default"].use(_vueVideoPlayer["default"]); // import VConsole from "vconsole";
// let vConsole = new VConsole(); //初始化
// Vue.use(vConsole); //设为全局
//系统错误捕获


var errorHandler = function errorHandler(error, vm) {
  console.error("抛出全局异常");
  console.error(vm);
  console.error(error);
};

_vue["default"].config.errorHandler = errorHandler;

_vue["default"].prototype.$throw = function (error) {
  return errorHandler(error, _this);
};

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");