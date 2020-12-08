import request from "@/pages/admin/libs/request";

// 读取模块菜单
export function getModuleTree(param) {
  return request({
    url: "/api/module/get-module-tree",
    method: "post",
    data: param
  });
}

// 查看系统菜单列表
export function getModuleList(param) {
  return request({
    url: "/api/module/get-module-list",
    method: "post",
    data: param
  });
}

// 保存系统菜单排序
export function saveModuleSort(param) {
  return request({
    url: "/api/module/save-module-sort",
    method: "post",
    data: param
  });
}

// 查看系统菜单详情
export function getSysModuleInfo(param) {
  return request({
    url: "/api/module/get-module-info",
    method: "post",
    data: param
  });
}

// 获取模块权限
export function getModulePermissionList(param) {
  return request({
    url: "/api/module/getModulePermissionList",
    method: "post",
    data: param
  });
}

// 保存/编辑系统菜单
export function saveSysModuleInfo(param) {
  return request({
    url: "/api/module/save-module-info",
    method: "post",
    data: param
  });
}

// 删除系统菜单
export function delModule(param) {
  return request({
    url: "/api/module/del",
    method: "post",
    data: param
  });
}
