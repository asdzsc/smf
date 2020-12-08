import request from "@/pages/admin/libs/request";

// 查看纪念馆栏目列表
export function getMemoryColumnList(param) {
  return request({
    url: "/api/memory/column/getMemoryColumnList",
    method: "post",
    data: param
  });
}
// 修改纪念馆栏目状态
export function setMemoryColumnStatus(param) {
  return request({
    url: "/api/memory/column/setMemoryColumnStatus",
    method: "post",
    data: param
  });
}
// 保存纪念馆栏目排序
export function saveMemoryColumnSort(param) {
  return request({
    url: "/api/memory/column/saveMemoryColumnSort",
    method: "post",
    data: param
  });
}
// 删除纪念馆栏目
export function delMemoryColumn(param) {
  return request({
    url: "/api/memory/column/delMemoryColumn",
    method: "post",
    data: param
  });
}
// 查看纪念馆栏目详情
export function getMemoryColumnInfo(param) {
  return request({
    url: "/api/memory/column/getMemoryColumnInfo",
    method: "post",
    data: param
  });
}
// 新增/编辑纪念馆栏目
export function saveMemoryColumnInfo(param) {
  return request({
    url: "/api/memory/column/saveMemoryColumnInfo",
    method: "post",
    data: param
  });
}
