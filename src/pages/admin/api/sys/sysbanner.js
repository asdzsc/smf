import request from "@/pages/admin/libs/request";

// 查看轮播图列表
export function getSysBannerList(param) {
  return request({
    url: "/api/sysbanner/getSysBannerList",
    method: "post",
    data: param
  });
}
// 删除播图轮播图
export function delSysBanner(param) {
  return request({
    url: "/api/sysbanner/delSysBanner",
    method: "post",
    data: param
  });
}
// 保存商城轮播图排序
export function saveSysBannerSort(param) {
  return request({
    url: "/api/sysbanner/saveSysBannerSort",
    method: "post",
    data: param
  });
}
// 查看轮播图详情
export function getSysBannerInfo(param) {
  return request({
    url: "/api/sysbanner/getSysBannerInfo",
    method: "post",
    data: param
  });
}
// 新增/编辑轮播图
export function saveSysBanner(param) {
  return request({
    url: "/api/sysbanner/saveSysBanner",
    method: "post",
    data: param
  });
}
