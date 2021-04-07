import request from "@/pages/admin/libs/request";

// 查看禁言记录列表
export function getBannedList(param) {
  return request({
    url: "/api/banned/get-banned-list",
    method: "post",
    data: param
  });
}

// 删除禁言信息
export function delBanned(param) {
  return request({
    url: "/api/banned/del-banned",
    method: "post",
    data: param
  });
}

// 设置禁言
export function setBanned(param) {
  return request({
    url: "/api/banned/set-banned",
    method: "post",
    data: param
  });
}
