import request from "@/pages/admin/libs/request";

export function getSysDeptTree(param) {
  return request({
    url: "/api/sysdept/get-sysdept-tree",
    method: "post",
    data: param
  });
}

// 部门分页列表
export function getDeptList(param) {
  return request({
    url: "/api/sysdept/getDeptList",
    method: "post",
    data: param
  });
}


// 查看部门列表
export function getSysDeptList(param) {
  return request({
    url: "/api/sysdept/get-sysdept-list",
    method: "post",
    data: param
  });
}

// 查看部门详情
export function getSysDeptInfo(param) {
  return request({
    url: "/api/sysdept/get-sysdept-info",
    method: "post",
    data: param
  });
}

// 保存/编辑部门
export function saveSysDeptInfo(param) {
  return request({
    url: "/api/sysdept/save-sysdept-info",
    method: "post",
    data: param
  });
}

// 保存部门排序
export function saveSysDeptSort(param) {
  return request({
    url: "/api/sysdept/save-sysdept-sort",
    method: "post",
    data: param
  });
}

// 保存部门排序
export function delSysDept(param) {
  return request({
    url: "/api/sysdept/del",
    method: "post",
    data: param
  });
}
