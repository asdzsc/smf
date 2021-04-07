import request from "@/pages/admin/libs/request";

// 查看直播api配置
export function getSysConfig(param) {
  return request({
    url: "/api/sysconfig/getSysConfig",
    method: "post",
    data: param
  });
}

// 保存直播api配置
export function saveSysConfig(param) {
  return request({
    url: "/api/sysconfig/saveSysConfig",
    method: "post",
    data: param
  });
}

// getImSDKAppID
export function getImSDKAppID(param) {
  return request({
    url: "/api/sysconfig/getImSDKAppID",
    method: "post",
    data: param
  });
}
