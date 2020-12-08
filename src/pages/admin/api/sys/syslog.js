import request from "@/pages/admin/libs/request";

// 查看日志列表
export function getLogList(param) {
  return request({
    url: "/api/log/get-log-list",
    method: "post",
    data: param
  });
}

// 删除系统日志
export function delLog(param) {
  return request({
    url: "/api/log/del",
    method: "post",
    data: param
  });
}

// 导出系统日志
export function exportExcel(param) {
  return request({
    url: "/api/log/export-excel",
    method: "post",
    data: param
  });
}
