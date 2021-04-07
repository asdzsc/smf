import request from "@/pages/admin/libs/request";

// 查看角色列表
export function getRoleList(param) {
  return request({
    url: "/api/role/get-role-list",
    method: "post",
    data: param
  });
}

// 查看角色详情
export function getSysRoleInfo(param) {
  return request({
    url: "/api/role/get-role-info",
    method: "post",
    data: param
  });
}

// 保存/编辑角色
export function saveSysRoleInfo(param) {
  return request({
    url: "/api/role/save-role-info",
    method: "post",
    data: param
  });
}

// 删除角色
export function delRole(param) {
  return request({
    url: "/api/role/del",
    method: "post",
    data: param
  });
}

export function getAllRole(param) {
  return request({
    url: "/api/role/get-all-role",
    method: "post",
    data: param
  });
}
