import request from "@/pages/admin/libs/request";
import store from "@/store";

// 登录
export function login(param) {
  return request({
    url: "/sso/login",
    method: "post",
    data: param
  });
}

// 登出
export function logout() {
  store.commit("adminAccount/setToken", "");
  localStorage.clear();
  // return request({
  //   url: "/sso/logout",
  //   method: "post"
  // });
}
