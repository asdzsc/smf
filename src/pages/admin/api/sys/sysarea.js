import request from "@/pages/admin/libs/request";

//获取省市区
export function getArea(param) {
  return request({
    url: "/api/area/getArea",
    method: "post",
    data: param
  });
}

//获取省市区
export function getAreaByTree(param) {
  return request({
    url: "/api/area/getAreaByTree",
    method: "post",
    data: param
  });
}
