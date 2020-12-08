var orderStatusList = [{
		key: "1",
		text: "待付款",
		color: ""
	},
	{
		key: "2",
		text: "支付成功",
		color: "#2db7f5"
	},
	{
		key: "3",
		text: "待服务",
		color: "#f68b19"
	},
	{
		key: "4",
		text: "服务中",
		color: "#f68b19"
	},
	{
		key: "5",
		text: "已完成",
		color: "#43c643"
	},
	{
		key: "6",
		text: "已关闭",
		color: ""
	},
	{
		key: "7",
		text: "退款中",
		color: ""
	},
	{
		key: "8",
		text: "已退款",
		color: ""
	}
];

//网站订单状态
export function orderStatusText(status) {
	var query = orderStatusList.filter(x => {
		return x.key === status;
	});
	if (query.length > 0) {
		return query[0];
	} else {
		return {
			key: "-1",
			text: "未知",
			color: ""
		};
	}
}
export function statusList() {
	return orderStatusList
}


var _goodsTypeList = [{
		key: "1",
		text: "商城商品"
	},
	{
		key: "2",
		text: "服务商品"
	},
	{
		key: "3",
		text: "模版页面"
	}
];
//商品类别
export function goodsTypeText(goodsType) {
	var query = _goodsTypeList.filter(x => {
		return x.key === goodsType;
	});
	if (query.length > 0) {
		return query[0];
	} else {
		return {
			key: "-1",
			text: "未知"
		};
	}
}

export function goodsTypeList() {
	return _goodsTypeList
}
