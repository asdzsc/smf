import request from "@/pages/admin/libs/request";

// 查看纪念馆信息列表
export function getMemoryList(param) {
  return request({
    url: "/api/memory/info/getMemoryList",
    method: "post",
    data: param
  });
}
// 修改纪念馆信息状态
export function setMemoryStatus(param) {
  return request({
    url: "/api/memory/info/setMemoryStatus",
    method: "post",
    data: param
  });
}
// 删除纪念馆信息
export function delMemory(param) {
  return request({
    url: "/api/memory/info/delMemory",
    method: "post",
    data: param
  });
}
