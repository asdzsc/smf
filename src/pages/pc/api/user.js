import request from "@/pages/pc/libs/request";


// 保存用户信息
export function saveMemberInfo(param) {
	return request({
		url: "/web-api/website/userinfo/saveMemberInfo",
		method: "post",
		data: param
	});
}

// 更新手机号
export function updateMobile(param) {
	return request({
		url: "/web-api/website/userinfo/updateMobile",
		method: "post",
		data: param
	});
}

// 编辑密码
export function updatePwd(param) {
	return request({
		url: "/web-api/website/userinfo/updatePwd",
		method: "post",
		data: param
	});
}

// 查看用户详情
export function getMemberInfo(param) {
	return request({
		url: "/web-api/website/userinfo/getMemberInfo",
		method: "post",
		data: param
	});
}

// 是否绑定微信
export function verifyBindWx(param) {
	return request({
		url: "/web-api/website/userinfo/verifyBindWx",
		method: "post",
		data: param
	});
}


// 搜索墓址列表
export function searchCemeteryList(param) {
	return request({
		url: "/web-api/website/usercemetery/searchCemeteryList",
		method: "post",
		data: param
	});
}

// 用户墓址列表
export function cemeteryList(param) {
	return request({
		url: "/web-api/website/usercemetery/cemeteryList",
		method: "post",
		data: param
	});
}

// 服务墓址详情
export function getCemeteryInfo(param) {
	return request({
		url: "/web-api/website/usercemetery/getCemeteryInfo",
		method: "post",
		data: param
	});
}

// 添加墓址
export function saveCemetery(param) {
	return request({
		url: "/web-api/website/usercemetery/saveCemetery",
		method: "post",
		data: param
	});
}

// 删除用户墓址
export function delCemetery(param) {
	return request({
		url: "/web-api/website/usercemetery/delCemetery",
		method: "post",
		data: param
	});
}

