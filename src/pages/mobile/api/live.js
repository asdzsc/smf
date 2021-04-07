import request from "@/pages/mobile/libs/request";
// 直播间详情
export function liveInfo(param) {
  return request({
    url: "/web-api/website/livelist/liveInfo",
    method: "post",
    data: param
  });
}

// 查询直播间状态
export function liveState(param) {
  return request({
    url: "/web-api/website/livelist/liveState",
    method: "post",
    data: param
  });
}

// 查询直播间统计
export function livePlayInfo(param) {
  return request({
    url: "/web-api/website/livelist/livePlayInfo",
    method: "post",
    data: param
  });
}


// 验证密码
export function verifyPwd(param) {
  return request({
    url: "/web-api/website/livelist/verifyPwd",
    method: "post",
    data: param
  });
}
