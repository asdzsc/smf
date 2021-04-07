import request from "@/pages/admin/libs/request";

// 查看商品列表
export function getGoodsList(param) {
  return request({
    url: "/api/goods/getGoodsList",
    method: "post",
    data: param
  });
}

// 查看商品详情
export function getGoodsInfo(param) {
  return request({
    url: "/api/goods/getGoodsInfo",
    method: "post",
    data: param
  });
}

// 新增/编辑商品
export function saveGoodsInfo(param) {
  return request({
    url: "/api/goods/saveGoodsInfo",
    method: "post",
    data: param
  });
}

// 修改商品状态
export function setGoodsStatus(param) {
  return request({
    url: "/api/goods/setGoodsStatus",
    method: "post",
    data: param
  });
}

// 删除商品
export function delGoods(param) {
  return request({
    url: "/api/goods/delGoods",
    method: "post",
    data: param
  });
}

// 商品排序
export function saveGoodsSort(param) {
  return request({
    url: "/api/goods/saveGoodsSort",
    method: "post",
    data: param
  });
}
