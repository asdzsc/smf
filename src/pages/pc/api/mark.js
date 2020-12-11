import request from "@/pages/pc/libs/request";

// 获取模版详情
export function templateInfo(param) {
    return request({
        url: "/web-api/memory/template/templateInfo",
        method: "post",
        data: param
    });
}
// 获取个人纪念馆列表
export function getUserMemoryList(param) {
    return request({
        url: "/web-api/website/memory/info/getUserMemoryList",
        method: "post",
        data: param
    });
}