import request from "@/pages/pc/libs/request";

// 新闻列表
export function newsList(param) {
  return request({
    url: "/web-api/news/newsList",
    method: "post",
    data: param
  });
}
// 查看新闻详情
export function newsInfo(param) {
  return request({
    url: "/web-api/news/newsInfo",
    method: "post",
    data: param
  });
}

//招标广告
export function newsZbggList(param) {
  return request({
    url: "/web-api/newszbgg/newsZbggList",
    method: "post",
    data: param
  });
}

//招标广告详情
export function newsZbggInfo(param) {
  return request({
    url: "/web-api/newszbgg/newsZbggInfo",
    method: "post",
    data: param
  });
}
