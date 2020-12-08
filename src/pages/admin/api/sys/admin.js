import request from "@/pages/admin/libs/request";

// 管理员列表
export function getAdminList(param) {
  return request({
    url: "/api/admin/get-admin-list",
    method: "post",
    data: param
  });
}

// 修改管理员帐号状态
export function setAdminStatus(param) {
  return request({
    url: "/api/admin/set-admin-status",
    method: "post",
    data: param
  });
}

// 查看管理员详情
export function getAdminInfo(param) {
  return request({
    url: "/api/admin/get-admin-info",
    method: "post",
    data: param
  });
}

// 保存/编辑管理员
export function saveAdminInfo(param) {
  return request({
    url: "/api/admin/save-admin-info",
    method: "post",
    data: param
  });
}

// 删除管理员
export function delAdmin(param) {
  return request({
    url: "/api/admin/del",
    method: "post",
    data: param
  });
}
