import request from "@/pages/admin/libs/request";

// 查看栏目列表
export function getNewsColumnList(param) {
  return request({
    url: "/api/news/getNewsColumnList",
    method: "post",
    data: param
  });
}

// 修改栏目状态
export function setNewsColumnStatus(param) {
  return request({
    url: "/api/news/setNewsColumnStatus",
    method: "post",
    data: param
  });
}

// 保存栏目排序
export function saveNewsColumnSort(param) {
  return request({
    url: "/api/news/saveNewsColumnSort",
    method: "post",
    data: param
  });
}

// 查看栏目详情
export function getNewsColumnInfo(param) {
  return request({
    url: "/api/news/getNewsColumnInfo",
    method: "post",
    data: param
  });
}

// 新增/编辑栏目
export function saveNewsColumnInfo(param) {
  return request({
    url: "/api/news/saveNewsColumnInfo",
    method: "post",
    data: param
  });
}

// 删除栏目
export function delNewsColumn(param) {
  return request({
    url: "/api/news/delNewsColumn",
    method: "post",
    data: param
  });
}

// 查看新闻列表
export function getNewsList(param) {
  return request({
    url: "/api/news/getNewsList",
    method: "post",
    data: param
  });
}

// 修改新闻状态
export function setNewsStatus(param) {
  return request({
    url: "/api/news/setNewsStatus",
    method: "post",
    data: param
  });
}

// 删除新闻
export function delNews(param) {
  return request({
    url: "/api/news/delNews",
    method: "post",
    data: param
  });
}

// 查看新闻详情
export function getNewsInfo(param) {
  return request({
    url: "/api/news/getNewsInfo",
    method: "post",
    data: param
  });
}

// 新增/编辑新闻
export function saveNewsInfo(param) {
  return request({
    url: "/api/news/saveNewsInfo",
    method: "post",
    data: param
  });
}

// 查看招标广告列表
export function getNewsZbggList(param) {
  return request({
    url: "/api/newszbgg/getNewsZbggList",
    method: "post",
    data: param
  });
}

// 删除招标广告
export function delNewsZbgg(param) {
  return request({
    url: "/api/newszbgg/delNewsZbgg",
    method: "post",
    data: param
  });
}

// 查看招标广告
export function getNewsZbggInfo(param) {
  return request({
    url: "/api/newszbgg/getNewsZbggInfo",
    method: "post",
    data: param
  });
}

// 新增/编辑招标广告
export function saveNewsZbggInfo(param) {
  return request({
    url: "/api/newszbgg/saveNewsZbggInfo",
    method: "post",
    data: param
  });
}
