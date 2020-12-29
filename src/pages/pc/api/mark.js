import request from "@/pages/pc/libs/request";

// 获取模版详情
export function templateInfo(param) {
    return request({
        url: "/web-api/memory/template/templateInfo",
        method: "post",
        data: param
    });
}
// 获取查看纪念馆栏目列表
export function getMemoryColumnList(param) {
    return request({
        url: "/web-api/website/memory/column/getMemoryColumnList",
        method: "post",
        data: param
    });
}
// 前端展示纪念馆列表
export function memoryList(param) {
    return request({
        url: "/web-api/website/memory/info/memoryList",
        method: "post",
        data: param
    });
}
// 个人纪念馆详情
export function getMemoryInfo(param) {
    return request({
        url: "/web-api/website/memory/info/getMemoryInfo",
        method: "post",
        data: param
    });
}
//  个人纪念馆附件列表  
export function memoryMediaList(param) {
    return request({
        url: "/web-api/website/memory/info/memoryMediaList",
        method: "post",
        data: param
    });
}

// 留言/文章列表
export function memoryMsgList(param) {
    return request({
        url: "/web-api/website/memory/msg/memoryMsgList",
        method: "post",
        data: param
    });
}