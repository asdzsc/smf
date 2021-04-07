import request from "@/pages/admin/libs/request";

// 报修列表
export function repairsList(param) {
    return request({
        url: "/api/gjfw/repairsList",
        method: "post",
        data: param
    });
}

// 保存回访信息
export function saveVisit(param) {
    return request({
        url: "/api/gjfw/saveVisit",
        method: "post",
        data: param
    });
}

// 删除
export function delRepairs(param) {
    return request({
        url: "/api/gjfw/delRepairs",
        method: "post",
        data: param
    });
}

