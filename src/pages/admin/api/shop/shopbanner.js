import request from "@/pages/admin/libs/request";

// 查看商城轮播图列表
export function getShopBannerList(param) {
  return request({
    url: "/api/shopbanner/getShopBannerList",
    method: "post",
    data: param
  });
}
// 删除播图轮播图
export function delShopBanner(param) {
  return request({
    url: "/api/shopbanner/delShopBanner",
    method: "post",
    data: param
  });
}
// 保存商城轮播图排序
export function saveShopBannerSort(param) {
  return request({
    url: "/api/shopbanner/saveShopBannerSort",
    method: "post",
    data: param
  });
}
// 查看商城轮播图详情
export function getShopBannerInfo(param) {
  return request({
    url: "/api/shopbanner/getShopBannerInfo",
    method: "post",
    data: param
  });
}
// 新增/编辑商城轮播图
export function saveShopBanner(param) {
  return request({
    url: "/api/shopbanner/saveShopBanner",
    method: "post",
    data: param
  });
}
