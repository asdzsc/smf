"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = [{
  path: "/mark/grjn",
  name: "/mark/grjn",
  meta: {
    title: "查找纪念馆"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/grjn/search-index.vue"));
    });
  }
}, {
  path: "/mark/grjn/grjn-00",
  name: "/mark/grjn-00",
  meta: {
    title: "个人纪念馆"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/grjn/grjn-08.vue"));
    });
  }
}, {
  path: "/mark/grjn/index?id=:id",
  name: "/mark/grjn-00",
  meta: {
    title: "个人纪念馆"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/grjn/index.vue"));
    });
  }
}, {
  path: "/mark/gybg",
  name: "/mark/gybg",
  meta: {
    title: "关于本馆"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/gybg/index.vue"));
    });
  }
}, {
  path: "/mark/zpg",
  name: "/mark/zpg",
  meta: {
    title: "族谱馆"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/zpg/index.vue"));
    });
  }
}, {
  path: "/mark/create",
  name: "/mark/create",
  meta: {
    title: "创建主页"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/mark/create/index.vue"));
    });
  }
}];
exports["default"] = _default;