import request from "@/pages/pc/libs/request";

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
<<<<<<< HEAD
=======

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
// 留言/文章列表
export function memoryMsgList(param) {
    return request({
        url: "/web-api/website/memory/msg/memoryMsgList",
        method: "post",
        data: param
    });
}
<<<<<<< HEAD
// 获取留言/文章详情
export function memoryMsgInfo(param) {
    return request({
        url: "/web-api/website/memory/msg/memoryMsgInfo",
        method: "post",
        data: param
    });
}
// 保存留言/文章
export function saveMemoryMsg(param) {
    return request({
        url: "/web-api/website/memory/msg/saveMemoryMsg",
        method: "post",
        data: param
    });
}
// 删除留言/文章
export function delMemoryMsg(param) {
    return request({
        url: "/web-api/website/memory/msg/delMemoryMsg",
        method: "post",
        data: param
    });
}

// 验证激活码
export function verifyCode(param) {
    return request({
        url: "/web-api/website/memory/info/verifyCode",
        method: "post",
        data: param
    });
}
=======

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
// 创建个人主页-激活码
export function addMemoryPage(param) {
    return request({
        url: "/web-api/website/memory/info/addMemoryPage",
        method: "post",
        data: param
    });
<<<<<<< HEAD
}
// 保存订单
export function saveOrder(param) {
    return request({
        url: "/web-api/website/order/saveOrder",
        method: "post",
        data: param
    });
}
// 我的纪念馆列表
export function getUserMemoryList(param) {
    return request({
        url: "/web-api/website/memory/info/getUserMemoryList",
        method: "post",
        data: param
    });
}
// 修改纪念馆显示状态
export function setMemoryStatus(param) {
    return request({
        url: "/web-api/website/memory/info/setMemoryStatus",
        method: "post",
        data: param
    });
}
// 编辑个人主页
export function updateMemoryPage(param) {
    return request({
        url: "/web-api/website/memory/info/updateMemoryPage",
        method: "post",
        data: param
    });
}
// 获取media信息
export function getMemoryMedia(param) {
    return request({
        url: "/web-api/website/memory/info/getMemoryMedia",
        method: "post",
        data: param
    });
}
// 保存附件
export function saveMemoryMedia(param) {
    return request({
        url: "/web-api/website/memory/info/saveMemoryMedia",
        method: "post",
        data: param
    });
}
// 删除附件
export function delMemoryMedia(param) {
    return request({
        url: "/web-api/website/memory/info/delMemoryMedia",
        method: "post",
        data: param
    });
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}