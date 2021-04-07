import request from "@/pages/admin/libs/request";

// 留言/文章列表
export function memoryMsgList(param) {
	return request({
		url: "/api/memory/msg/memoryMsgList",
		method: "post",
		data: param
	});
}

// 设置留言显示状态
export function setMemoryMsgStatus(param) {
	return request({
		url: "/api/memory/msg/setMemoryMsgStatus",
		method: "post",
		data: param
	});
}

// 删除留言/文章信息
export function delMemoryMsg(param) {
	return request({
		url: "/api/memory/msg/delMemoryMsg",
		method: "post",
		data: param
	});
}

// 保存留言/文章
export function saveMemoryMsg(param) {
	return request({
		url: "/api/memory/msg/saveMemoryMsg",
		method: "post",
		data: param
	});
}

// 获取留言/文章详情
export function memoryMsgInfo(param) {
	return request({
		url: "/api/memory/msg/memoryMsgInfo",
		method: "post",
		data: param
	});
}



