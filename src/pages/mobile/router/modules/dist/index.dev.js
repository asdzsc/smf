"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gywm = _interopRequireDefault(require("./gywm"));

var _zxfw = _interopRequireDefault(require("./zxfw"));

var _xwzx = _interopRequireDefault(require("./xwzx"));

var _shop = _interopRequireDefault(require("./shop"));

var _member = _interopRequireDefault(require("./member"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//个人中心
var _default = [{
  path: "/login",
  name: "/login",
  meta: {
    title: "登录"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/sso/login.vue"));
    });
  }
}, {
  path: "/register",
  name: "/register",
  meta: {
    title: "注册"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/sso/register.vue"));
    });
  }
}, {
  path: "/find-pwd",
  name: "/find-pwd",
  meta: {
    title: "忘记密码"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/sso/find-pwd.vue"));
    });
  }
}, {
  path: "/",
  name: "mobile-home",
  meta: {
    title: "首页"
  },
  redirect: "/index",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/layouts/mobile-main.vue"));
    });
  },
  children: [{
    path: "/index",
    name: "/index",
    meta: {
      title: "首页"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/pages/mobile/views/index.vue"));
      });
    }
  }, {
    path: "/lxwm",
    name: "/lxwm",
    meta: {
      title: "联系我们"
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/pages/mobile/views/lxwm.vue"));
      });
    }
  }].concat(_toConsumableArray(_gywm["default"]), _toConsumableArray(_zxfw["default"]), _toConsumableArray(_xwzx["default"]), _toConsumableArray(_member["default"]), _toConsumableArray(_shop["default"]))
}];
exports["default"] = _default;