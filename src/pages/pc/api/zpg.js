import request from "@/pages/pc/libs/request";
// 修改族谱馆显示状态
export function setFamilyTreeStatus(param) {
    return request({
        url: "/web-api/website/memory/familytree/setFamilyTreeStatus",
        method: "post",
        data: param
    });
}
// 我的族谱馆列表
export function myFamilyTreeList(param) {
    return request({
        url: "/web-api/website/memory/familytree/myFamilyTreeList",
        method: "post",
        data: param
    });
}
// 获取家族谱详情
export function getFamilyTree(param) {
    return request({
        url: "/web-api/website/memory/familytree/getFamilyTree",
        method: "post",
        data: param
    });
}
// 新增/编辑家族谱
export function saveFamilyTree(param) {
    return request({
        url: "/web-api/website/memory/familytree/saveFamilyTree",
        method: "post",
        data: param
    });
}
// 新增/编辑家族谱
export function delFamilyTree(param) {
    return request({
        url: "/web-api/website/memory/familytree/delFamilyTree",
        method: "post",
        data: param
    });
}