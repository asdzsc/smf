import request from "@/pages/admin/libs/request";

// 订单列表
export function orderList(param) {
  return request({
    url: "/api/order/orderList",
    method: "post",
    data: param
  });
}

// 查看订单详情
export function getOrderInfo(param) {
  return request({
    url: "/api/order/getOrderInfo",
    method: "post",
    data: param
  });
}

// 更新订单状态
export function updateOrderStauts(param) {
  return request({
    url: "/api/order/updateOrderStauts",
    method: "post",
    data: param
  });
}

// 更新订单负责人
export function updateOrderServePrincipal(param) {
  return request({
    url: "/api/order/updateOrderServePrincipal",
    method: "post",
    data: param
  });
}

// 更新订单服务人员
export function updateOrderServeUsers(param) {
  return request({
    url: "/api/order/updateOrderServeUsers",
    method: "post",
    data: param
  });
}

// 订单日志
export function orderLogList(param) {
  return request({
    url: "/api/order/orderLogList",
    method: "post",
    data: param
  });
}

// 获取订单评论数据
export function orderCommentList(param) {
  return request({
    url: "/api/order/orderCommentList",
    method: "post",
    data: param
  });
}

// 更新评论显示状态
export function updateOrderCommentShow(param) {
  return request({
    url: "/api/order/updateOrderCommentShow",
    method: "post",
    data: param
  });
}

// 删除评论
export function delOrderComment(param) {
  return request({
    url: "/api/order/delOrderComment",
    method: "post",
    data: param
  });
}

// 保存订单评论
export function saveOrderComment(param) {
  return request({
    url: "/api/order/saveOrderComment",
    method: "post",
    data: param
  });
}




