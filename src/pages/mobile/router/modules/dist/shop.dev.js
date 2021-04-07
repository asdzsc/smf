"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = [{
  path: "/shop",
  name: "shop-index",
  meta: {
    title: "石门峰线上商城"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/index.vue"));
    });
  }
}, {
  path: "/shop/goodsInfo",
  name: "shop-goodsInfo",
  meta: {
    title: "商品详情"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/goods-info.vue"));
    });
  }
}, {
  path: "/shop/order/confirmOrder",
  name: "shop-order-confirmOrder",
  meta: {
    title: "确定订单"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/order/confirm-order.vue"));
    });
  }
}, {
  path: "/shop/order/orderInfo",
  name: "shop-order-orderInfo",
  meta: {
    title: "订单详情"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/order/order-info.vue"));
    });
  }
}, {
  path: "/shop/order",
  name: "shop-order",
  meta: {
    title: "服务订单"
  },
  redirect: "/shop/order/orderList"
}, {
  path: "/shop/order/orderList",
  name: "shop-order-orderList",
  meta: {
    title: "服务订单"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/order/order-list.vue"));
    });
  }
}, {
  path: "/shop/cart",
  name: "shop-cart",
  meta: {
    title: "购物车"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/mobile/views/shop/cart/index.vue"));
    });
  }
}];
exports["default"] = _default;