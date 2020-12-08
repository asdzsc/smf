import request from "@/pages/admin/libs/request";

// 查看轮播图列表
export function getLiveBannerList(param) {
  return request({
    url: "/api/livebanner/get-livebanner-list",
    method: "post",
    data: param
  });
}

// 查看轮播图详情
export function getLiveBannerInfo(param) {
  return request({
    url: "/api/livebanner/get-livebanner-info",
    method: "post",
    data: param
  });
}

// 新增/编辑轮播图
export function saveLiveBanner(param) {
  return request({
    url: "/api/livebanner/save-livebanner",
    method: "post",
    data: param
  });
}

// 保存轮播图排序
export function saveLiveBannerSort(param) {
  return request({
    url: "/api/livebanner/save-livebanner-sort",
    method: "post",
    data: param
  });
}

// 删除轮播图
export function delLiveBanner(param) {
  return request({
    url: "/api/livebanner/del",
    method: "post",
    data: param
  });
}
