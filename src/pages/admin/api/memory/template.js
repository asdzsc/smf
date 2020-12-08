import request from "@/pages/admin/libs/request";

// 查看纪念馆模版列表
export function getMemoryTemplateList(param) {
  return request({
    url: "/api/memory/template/getMemoryTemplateList",
    method: "post",
    data: param
  });
}
// 修改纪念馆模版状态
export function setMemoryTemplateStatus(param) {
  return request({
    url: "/api/memory/template/setMemoryTemplateStatus",
    method: "post",
    data: param
  });
}
// 保存纪念馆模版排序
export function saveMemoryTemplateSort(param) {
  return request({
    url: "/api/memory/template/saveMemoryTemplateSort",
    method: "post",
    data: param
  });
}
// 删除纪念馆模版
export function delMemoryTemplate(param) {
  return request({
    url: "/api/memory/template/delMemoryTemplate",
    method: "post",
    data: param
  });
}
// 查看纪念馆模版详情
export function getMemoryTemplateInfo(param) {
  return request({
    url: "/api/memory/template/getMemoryTemplateInfo",
    method: "post",
    data: param
  });
}
// 新增/编辑纪念馆模版
export function saveMemoryTemplate(param) {
  return request({
    url: "/api/memory/template/saveMemoryTemplate",
    method: "post",
    data: param
  });
}
