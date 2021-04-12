import request from "@/pages/mobile/libs/request";
// import Cookies from "js-cookie";
import store from "@/store";

//手机号登陆
export function mobileLogin(param) {
  return request({
    url: "/sso/mobile-login",
    method: "post",
    data: param
  });
}

//帐号密码登录
export function webLogin(param) {
  return request({
    url: "/sso/web-login",
    method: "post",
    data: param
  });
}

//手机号注册
export function mobileRegister(param) {
  return request({
    url: "/sso/mobile-register",
    method: "post",
    data: param
  });
}

//邮箱注册
export function emailRegister(param) {
  return request({
    url: "/sso/email-register",
    method: "post",
    data: param
  });
}

//发送验证码
export function sendSms(param) {
  return request({
    url: "/sso/sendSms",
    method: "post",
    data: param
  });
}

//验证验证码
export function verifySms(param) {
  return request({
    url: "/sso/verifySms",
    method: "post",
    data: param
  });
}

//更新密码
export function updatePwd(param) {
  return request({
    url: "/sso/updatePwd",
    method: "post",
    data: param
  });
}


// 登录
export function getUserToken(param) {
  return request({
    url: "/wx/getUserToken",
    method: "post",
    data: param
  });
}

// 用户当前用户临时code
export function getUserCode(param) {
  return request({
    url: "/sso/getUserCode",
    method: "post",
    data: param
  });
}

<<<<<<< HEAD
export function logInfo(param) {
  return request({
    url: "/logInfo",
    method: "post",
    data: param
  });
}


=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

export function setToken(data) {
  store.commit("account/setToken", data.token);
  store.commit("account/setUser", data.entity);
  localStorage.setItem("wxtoken", data.token);
}

export function getToken() {
  var wxtoken = localStorage.getItem("wxtoken");
  return wxtoken;
}

export function delToken() {
	return new Promise(resolve => {
	  store.commit("account/setToken", "");
	  store.commit("account/setUser", {});
	
	  localStorage.clear();
	  resolve();
	});
}

//读取cookies
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
//删除cookies
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
