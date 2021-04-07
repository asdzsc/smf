import request from "@/pages/admin/libs/request";

// 家族谱列表
export function familyTreeList(param) {
	return request({
		url: "/api/memory/familytree/familyTreeList",
		method: "post",
		data: param
	});
}

// 新增/编辑家族谱
export function saveFamilyTree(param) {
	return request({
		url: "/api/memory/familytree/saveFamilyTree",
		method: "post",
		data: param
	});
}

// 获取家族谱详情
export function getFamilyTree(param) {
	return request({
		url: "/api/memory/familytree/getFamilyTree",
		method: "post",
		data: param
	});
}

// 设置家族谱显示状态
export function setFamilyTreeStatus(param) {
	return request({
		url: "/api/memory/familytree/setFamilyTreeStatus",
		method: "post",
		data: param
	});
}

// 删除家族谱
export function delFamilyTree(param) {
	return request({
		url: "/api/memory/familytree/delFamilyTree",
		method: "post",
		data: param
	});
}


