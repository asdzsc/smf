import request from "@/pages/admin/libs/request";

// 查看商品栏目列表
export function getGoodsColumnList(param) {
  return request({
    url: "/api/goodscolumn/getGoodsColumnList",
    method: "post",
    data: param
  });
}

// 修改商品栏目状态
export function setGoodsColumnStatus(param) {
  return request({
    url: "/api/goodscolumn/setGoodsColumnStatus",
    method: "post",
    data: param
  });
}

// 保存商品栏目排序
export function saveGoodsColumnSort(param) {
  return request({
    url: "/api/goodscolumn/saveGoodsColumnSort",
    method: "post",
    data: param
  });
}

// 查看商品栏目详情
export function getGoodsColumnInfo(param) {
  return request({
    url: "/api/goodscolumn/getGoodsColumnInfo",
    method: "post",
    data: param
  });
}

// 新增/编辑商品栏目
export function saveGoodsColumnInfo(param) {
  return request({
    url: "/api/goodscolumn/saveGoodsColumnInfo",
    method: "post",
    data: param
  });
}

// 删除商品栏目
export function delGoodsColumn(param) {
  return request({
    url: "/api/goodscolumn/delGoodsColumn",
    method: "post",
    data: param
  });
}
