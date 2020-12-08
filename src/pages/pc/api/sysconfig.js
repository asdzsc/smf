import request from "@/pages/pc/libs/request";

// getImSDKAppID
export function getImSDKAppID(param) {
  return request({
    url: "/mobile-api/sysconfig/getImSDKAppID",
    method: "post",
    data: param
  });
}
