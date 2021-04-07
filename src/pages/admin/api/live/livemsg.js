import request from "@/pages/admin/libs/request";

// 查看评论列表
export function getLiveMsgList(param) {
  return request({
    url: "/api/livemsg/get-livemsg-list",
    method: "post",
    data: param
  });
}

// 删除评论
export function delLiveMsg(param) {
  return request({
    url: "/api/livemsg/del",
    method: "post",
    data: param
  });
}
