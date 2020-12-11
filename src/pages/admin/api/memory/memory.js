import request from "@/pages/admin/libs/request";

// 查看纪念馆信息列表
export function getMemoryList(param) {
	return request({
		url: "/api/memory/info/getMemoryList",
		method: "post",
		data: param
	});
}
// 个人纪念馆详情
export function getMemoryInfo(param) {
	return request({
		url: "/api/memory/info/getMemoryInfo",
		method: "post",
		data: param
	});
}
// 修改纪念馆信息状态
export function setMemoryStatus(param) {
	return request({
		url: "/api/memory/info/setMemoryStatus",
		method: "post",
		data: param
	});
}
// 保存个人主页信息
export function saveMemoryInfo(param) {
	return request({
		url: "/api/memory/info/saveMemoryInfo",
		method: "post",
		data: param
	});
}
// 删除纪念馆信息
export function delMemory(param) {
	return request({
		url: "/api/memory/info/delMemory",
		method: "post",
		data: param
	});
}
// 保存个人主页排序
export function saveMemorySort(param) {
	return request({
		url: "/api/memory/info/saveMemorySort",
		method: "post",
		data: param
	});
}
// 附件列表
export function memoryMediaList(param) {
	return request({
		url: "/api/memory/info/memoryMediaList",
		method: "post",
		data: param
	});
}
// 保存附件排序
export function getMemoryMedia(param) {
	return request({
		url: "/api/memory/info/getMemoryMedia",
		method: "post",
		data: param
	});
}
// 保存附件排序
export function saveMemoryMediaSort(param) {
	return request({
		url: "/api/memory/info/saveMemoryMediaSort",
		method: "post",
		data: param
	});
}
// 保存附件
export function saveMemoryMedia(param) {
	return request({
		url: "/api/memory/info/saveMemoryMedia",
		method: "post",
		data: param
	});
}
// 删除附件
export function delMemoryMedia(param) {
	return request({
		url: "/api/memory/info/delMemoryMedia",
		method: "post",
		data: param
	});
}

// 查看激活码列表
export function getMemoryActiveList(param) {
	return request({
		url: "/api/memory/active/getMemoryActiveList",
		method: "post",
		data: param
	});
}

// 批量生成激活码
export function saveMemoryActive(param) {
	return request({
		url: "/api/memory/active/saveMemoryActive",
		method: "post",
		data: param
	});
}

// 删除激活码
export function delMemoryActive(param) {
	return request({
		url: "/api/memory/active/delMemoryActive",
		method: "post",
		data: param
	});
}

// 导出激活码
export function exportExcel(param) {
	return request({
		url: "/api/memory/active/exportExcel",
		method: "post",
		data: param
	});
}
