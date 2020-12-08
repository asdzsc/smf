import request from "@/pages/mobile/libs/request";


// 支付宝下单
export function tradePay(param) {
	return request({
		url: "/web-api/website/pay/tradePay",
		method: "post",
		data: param
	});
}

