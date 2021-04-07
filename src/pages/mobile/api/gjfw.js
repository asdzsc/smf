import request from "@/pages/mobile/libs/request";
// 保存报修信息
export function saveRepairs(param) {
    return request({
        url: "/web-api/website/gjfw/saveRepairs",
        method: "post",
        data: param
    });
}
// 我的报修列表
export function myRepairsList(param) {
    return request({
        url: "/web-api/website/gjfw/myRepairsList",
        method: "post",
        data: param
    });
}