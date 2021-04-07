import request from "@/pages/admin/libs/request";

export function lookData(param) {
  return request({
    url: "/api/dashboard/lookData",
    method: "post",
    data: param
  });
}

export function lookDataByTime(param) {
  return request({
    url: "/api/dashboard/lookDataByTime",
    method: "post",
    data: param
  });
}

//首页导出
export function exportExcel(param) {
  return request({
    url: "/api/dashboard/exportExcel",
    method: "post",
    data: param
  });
}
