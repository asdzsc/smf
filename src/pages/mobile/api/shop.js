import request from "@/pages/mobile/libs/request";

// 轮播图列表
export function bannerList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/sysbanner/bannerList",
        method: "post",
        data: param
    });
}
// 商品类别
export function goodsColumnList(param) {
    return request({
        url: "/web-api/goodscolumn/goodsColumnList",
        method: "post",
        data: param
    });
}
export function getGoodsColumnInfo(param) {
    return request({
        url: "/web-api/goodscolumn/getGoodsColumnInfo",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/sysbanner/bannerList",
    method: "post",
    data: param
  });
}
// 商品类别
export function goodsColumnList(param) {
  return request({
    url: "/web-api/goodscolumn/goodsColumnList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 商品列表
export function goodsList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/goods/goodsList",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/goods/goodsList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 获取商品详情
export function goodsInfo(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/goods/goodsInfo",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/goods/goodsInfo",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 购物车列表
export function cartList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/cartList",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/cartList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 获取购物车商品数
export function getCartNum(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/getCartNum",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/getCartNum",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 添加购物车
export function addCart(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/addCart",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/addCart",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 更新购物车商品数量
export function updateCartGoodsNum(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/updateCartGoodsNum",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/updateCartGoodsNum",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 删除购物车商品
export function delCart(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/delCart",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/delCart",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 购物车id 返回商品列表
export function getGoodsListByCartId(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/getGoodsListByCartId",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/getGoodsListByCartId",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 商品id 返回商品列表
export function getGoodsByCart(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/shopcart/getGoodsByCart",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/shopcart/getGoodsByCart",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 保存订单
export function saveOrder(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/saveOrder",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/saveOrder",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 订单列表
export function orderList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/orderList",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/orderList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 订单详情
export function getOrderInfo(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/getOrderInfo",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/getOrderInfo",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 订单记录
export function orderLogList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/orderLogList",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/orderLogList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 获取订单评论数据
export function orderCommentList(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/orderCommentList",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/orderCommentList",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 保存订单评论
export function saveOrderComment(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/order/saveOrderComment",
        method: "post",
        data: param
    });
}
// 删除自己的订单评论
export function delMyOrderComment(param) {
    return request({
        url: "/web-api/website/order/delMyOrderComment",
        method: "post",
        data: param
    });
=======
  return request({
    url: "/web-api/website/order/saveOrderComment",
    method: "post",
    data: param
  });
}
// 删除自己的订单评论
export function delMyOrderComment(param) {
  return request({
    url: "/web-api/website/order/delMyOrderComment",
    method: "post",
    data: param
  });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}


// 支付宝下单
export function tradePay(param) {
<<<<<<< HEAD
    return request({
        url: "/web-api/website/pay/tradePay",
        method: "post",
        data: param
    });
}
=======
	return request({
		url: "/web-api/website/pay/tradePay",
		method: "post",
		data: param
	});
}

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
