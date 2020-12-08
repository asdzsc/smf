import request from "@/pages/admin/libs/request";

// 查看直播间列表
export function getLiveList(param) {
  return request({
    url: "/api/livelist/get-livelist",
    method: "post",
    data: param
  });
}

// 查看直播间详情
export function getLiveInfo(param) {
  return request({
    url: "/api/livelist/get-livelist-info",
    method: "post",
    data: param
  });
}

// 新增/编辑直播间
export function saveLiveInfo(param) {
  return request({
    url: "/api/livelist/save-livelist-info",
    method: "post",
    data: param
  });
}

// 删除直播间
export function delLiveList(param) {
  return request({
    url: "/api/livelist/del-livelist",
    method: "post",
    data: param
  });
}

// 查询直播间状态
export function liveState(param) {
  return request({
    url: "/api/livelist/liveState",
    method: "post",
    data: param
  });
}

// 查询直播间统计
export function livePlayInfo(param) {
  return request({
    url: "/api/livelist/livePlayInfo",
    method: "post",
    data: param
  });
}

// 直播间统计  留言 人数
export function liveChartList(param) {
  return request({
    url: "/api/livelist/liveChartList",
    method: "post",
    data: param
  });
}

// 保存自定义人气
export function savePopularity(param) {
  return request({
    url: "/api/livelist/savePopularity",
    method: "post",
    data: param
  });
}

// 保存公告
export function saveNotice(param) {
  return request({
    url: "/api/livelist/saveNotice",
    method: "post",
    data: param
  });
}

// 导出直播间用户数据
export function exportExcel(param) {
  return request({
    url: "/api/livelist/exportExcel",
    method: "post",
    data: param
  });
}

// 查询直播间回播文件地址
export function getliveMediaUrl(param) {
  return request({
    url: "/api/livelist/getliveMediaUrl",
    method: "post",
    data: param
  });
}

// 查询直播间回播文件地址列表
export function getliveMediaList(param) {
  return request({
    url: "/api/livelist/getliveMediaList",
    method: "post",
    data: param
  });
}

// 导出留电
export function exportLeavePhone(param) {
  return request({
    url: "/api/livelist/exportLeavePhone",
    method: "post",
    data: param
  });
}

// 海报
export function createPoster(param) {
  return request({
    url: "/api/livelist/createPoster",
    method: "post",
    data: param
  });
}
