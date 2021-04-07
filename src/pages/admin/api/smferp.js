import request from "@/pages/admin/libs/request";

// 落葬人列表
export function buryPersonList(param) {
	return request({
		url: "/api/smferp/buryPersonList",
		method: "post",
		data: param
	});
}

// 墓址列表
export function cemeteryList(param) {
	return request({
		url: "/api/smferp/cemeteryList",
		method: "post",
		data: param
	});
}

// 墓地订单列表
export function findSaleCemeteryOrderList(param) {
	return request({
		url: "/api/smferp/findSaleCemeteryOrderList",
		method: "post",
		data: param
	});
}

// 墓地订单详情
export function findSaleCemeteryOrderDetail(param) {
	return request({
		url: "/api/smferp/findSaleCemeteryOrderDetail",
		method: "post",
		data: param
	});
}

// 同步erp组织架构
export function syncOrgUser(param) {
	return request({
		url: "/api/smferp/syncOrgUser",
		method: "post",
		data: param
	});
}
