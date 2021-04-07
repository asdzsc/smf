import request from "@/pages/admin/libs/request";

// 查看预约扫墓列表
export function getYysmList(param) {
  return request({
    url: "/api/yysm/getYysmList",
    method: "post",
    data: param
  });
}

// 删除预约扫墓
export function delYysm(param) {
  return request({
    url: "/api/yysm/del",
    method: "post",
    data: param
  });
}

// 导出数据
export function exportExcel(param) {
  return request({
    url: "/api/yysm/export-excel",
    method: "post",
    data: param
  });
}
