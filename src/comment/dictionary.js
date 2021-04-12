var orderStatusList = [{
<<<<<<< HEAD
	key: "1",
	text: "待付款",
	color: "",
	fontColor: ''
},
{
	key: "2",
	text: "支付成功",
	color: "#2db7f5",
	fontColor: '#ffffff'
},
{
	key: "3",
	text: "待服务",
	color: "#f68b19",
	fontColor: '#ffffff'
},
{
	key: "4",
	text: "服务中",
	color: "#f68b19",
	fontColor: '#ffffff'
},
{
	key: "5",
	text: "已完成",
	color: "#43c643",
	fontColor: '#ffffff'
},
{
	key: "6",
	text: "已关闭",
	color: "",
	fontColor: ''
},
{
	key: "7",
	text: "退款中",
	color: "",
	fontColor: ''
},
{
	key: "8",
	text: "已退款",
	color: "",
	fontColor: ''
}
=======
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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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


<<<<<<< HEAD
var _erpOrderStatusList = [{
	key: "1",
	text: "预留"
},
{
	key: "2",
	text: "预留转预定"
},
{
	key: "3",
	text: "预留转销售"
},
{
	key: "4",
	text: "预定"
},
{
	key: "5",
	text: "预定转购买"
},
{
	key: "6",
	text: "退订"
},
{
	key: "7",
	text: "直接销售"
},
{
	key: "8",
	text: "退购"
},
{
	key: "9",
	text: "完结"
},
{
	key: "10",
	text: "终止"
}
];
//erp墓地订单状态
export function erpOrderStatusText(orderStatus) {
	var query = _erpOrderStatusList.filter(x => {
		return x.key === orderStatus;
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
//erp墓地订单状态列表
export function erpOrderStatusList() {
	return _erpOrderStatusList
}



var _orderTypeList = [{
	key: "0",
	text: "常规订单"
},
{
	key: "1",
	text: "服务型订单"
},
{
	key: "2",
	text: "模版购买"
},
{
	key: "3",
	text: "个人主页续费"
}
];
//订单类别
export function orderTypeText(orderType) {
	var query = _orderTypeList.filter(x => {
		return x.key === orderType;
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

export function orderTypeList() {
	return _orderTypeList
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
},
{
	key: "4",
	text: "个人主页续费"
}
=======
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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
