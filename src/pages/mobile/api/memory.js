import request from "@/pages/mobile/libs/request";

// 获取模版详情
export function templateInfo(param) {
  return request({
    url: "/web-api/memory/template/templateInfo",
    method: "post",
    data: param
  });
}
