import request from "@/pages/mobile/libs/request";

// getImSDKAppID
export function getImSDKAppID(param) {
  return request({
    url: "/mobile-api/sysconfig/getImSDKAppID",
    method: "post",
    data: param
  });
}
