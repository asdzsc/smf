import request from "@/pages/admin/libs/request";

// 查看用户列表
export function getLiveUserList(param) {
  return request({
    url: "/api/member/getMemberList",
    method: "post",
    data: param
  });
}

// 修改用户帐号状态
export function setLiveUserStatus(param) {
  return request({
    url: "/api/member/setMemberStatus",
    method: "post",
    data: param
  });
}

// 查看用户详情
export function getLiveUserInfo(param) {
  return request({
    url: "/api/member/getMemberInfo",
    method: "post",
    data: param
  });
}

// 保存/编辑用户
export function saveLiveUserInfo(param) {
  return request({
    url: "/api/member/saveMemberInfo",
    method: "post",
    data: param
  });
}

// 删除用户
export function delLiveUser(param) {
  return request({
    url: "/api/member/del",
    method: "post",
    data: param
  });
}

// 通知用户进入直播间
export function enterLive(param) {
  return request({
    url: "/api/liveuser/enterLive",
    method: "post",
    data: param
  });
}

// 获取当前用户信息
export function getUserInfo(param) {
  return request({
    url: "/api/liveuser/getUserInfo",
    method: "post",
    data: param
  });
}

// 获取Im Sig
export function getUserSig(param) {
  return request({
    url: "/api/liveuser/getUserSig",
    method: "post",
    data: param
  });
}

// 添加用户进群
export function addUserByGroup(param) {
  return request({
    url: "/api/liveuser/addUserByGroup",
    method: "post",
    data: param
  });
}
