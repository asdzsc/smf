<<<<<<< HEAD
import request from "@/pages/mobile/libs/request";
=======
import request from "@/pages/pc/libs/request";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

//消息通知
export function getSysMessageList(param) {
  return request({
    url: "/web-api/website/sysmessage/getSysMessageList",
    method: "post",
    data: param
  });
}

//消息通知条数
export function getSysMessageCount(param) {
  return request({
    url: "/web-api/website/sysmessage/getSysMessageCount",
    method: "post",
    data: param
  });
}

//全部标记为已读
export function setSysMessageAllRead(param) {
  return request({
    url: "/web-api/website/sysmessage/setSysMessageAllRead",
    method: "post",
    data: param
  });
}

//删除所有消息通知
export function delSysMessageAll(param) {
  return request({
    url: "/web-api/website/sysmessage/delSysMessageAll",
    method: "post",
    data: param
  });
}





