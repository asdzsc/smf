import request from "@/pages/admin/libs/request";

// 查看直播栏目列表
export function getLiveColumnList(param) {
  return request({
    url: "/api/livecolumn/get-livecolumn-list",
    method: "post",
    data: param
  });
}

// 保存直播栏目排序
export function saveLiveColumnSort(param) {
  return request({
    url: "/api/livecolumn/save-livecolumn-sort",
    method: "post",
    data: param
  });
}

// 获取直播栏目详情
export function getLiveColumnInfo(param) {
  return request({
    url: "/api/livecolumn/get-livecolumn-info",
    method: "post",
    data: param
  });
}

// 保存直播栏目
export function saveLiveColumnInfo(param) {
  return request({
    url: "/api/livecolumn/save-livecolumn-info",
    method: "post",
    data: param
  });
}

// 保存直播栏目排序
export function delLiveColumn(param) {
  return request({
    url: "/api/livecolumn/del-livecolumn",
    method: "post",
    data: param
  });
}

// 获取所有直播间栏目列表
export function getLiveColumnListAll(param) {
  return request({
    url: "/api/livecolumn/getLiveColumnListAll",
    method: "post",
    data: param
  });
}
