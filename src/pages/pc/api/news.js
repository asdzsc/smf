import request from "@/pages/pc/libs/request";

// 新闻列表
export function newsList(param) {
  return request({
    url: "/web-api/news/newsList",
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

