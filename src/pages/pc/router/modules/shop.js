export default [{
<<<<<<< HEAD
        path: "/shop",
        name: "shop-index",
        meta: {
            title: "石门峰线上商城"
        },
        component: () =>
            import ("@/pages/pc/views/shop/index.vue")
    },
    {
        path: "/shop/goodsInfo",
        name: "shop-goodsInfo",
        meta: {
            title: "商品详情"
        },
        component: () =>
            import ("@/pages/pc/views/shop/goods-info.vue")
    },
    {
        path: "/shop/order/confirmOrder",
        name: "shop-order-confirmOrder",
        meta: {
            title: "确定订单"
        },
        component: () =>
            import ("@/pages/pc/views/shop/order/confirm-order.vue")
    },
    {
        path: "/shop/order/orderInfo",
        name: "shop-order-orderInfo",
        meta: {
            title: "订单详情"
        },
        component: () =>
            import ("@/pages/pc/views/shop/order/order-info.vue")
    },
    {
        path: "/shop/order",
        name: "shop-order",
        meta: {
            title: "服务订单"
        },
        redirect: "/shop/order/orderList"
    },
    {
        path: "/shop/order/orderList",
        name: "shop-order-orderList",
        meta: {
            title: "服务订单"
        },
        component: () =>
            import ("@/pages/pc/views/shop/order/order-list.vue")
    },
    {
        path: "/shop/cart",
        name: "shop-cart",
        meta: {
            title: "购物车"
        },
        component: () =>
            import ("@/pages/pc/views/shop/cart/index.vue")
    }, {
        path: "/shop/more",
        name: "/shop/more",
        meta: {
            title: "VR720°实景选墓更多"
        },
        component: () =>
            import ("@/pages/pc/views/shop/vr-more.vue")
    }, {
        path: "/shop/goodsList",
        name: "/shop/goodsList",
        meta: {
            title: "商品列表"
        },
        component: () =>
            import ("@/pages/pc/views/shop/goods-list.vue")
    }
];
=======
		path: "/shop",
		name: "shop-index",
		meta: {
			title: "石门峰线上商城"
		},
		component: () =>
			import("@/pages/pc/views/shop/index.vue")
	},
	{
		path: "/shop/goodsInfo",
		name: "shop-goodsInfo",
		meta: {
			title: "商品详情"
		},
		component: () =>
			import("@/pages/pc/views/shop/goods-info.vue")
	},
	{
		path: "/shop/order/confirmOrder",
		name: "shop-order-confirmOrder",
		meta: {
			title: "确定订单"
		},
		component: () =>
			import("@/pages/pc/views/shop/order/confirm-order.vue")
	},
	{
		path: "/shop/order/orderInfo",
		name: "shop-order-orderInfo",
		meta: {
			title: "订单详情"
		},
		component: () =>
			import("@/pages/pc/views/shop/order/order-info.vue")
	},
	{
		path: "/shop/order",
		name: "shop-order",
		meta: {
			title: "服务订单"
		},
		redirect: "/shop/order/orderList"
	},
	{
		path: "/shop/order/orderList",
		name: "shop-order-orderList",
		meta: {
			title: "服务订单"
		},
		component: () =>
			import("@/pages/pc/views/shop/order/order-list.vue")
	},
	{
		path: "/shop/cart",
		name: "shop-cart",
		meta: {
			title: "购物车"
		},
		component: () =>
			import("@/pages/pc/views/shop/cart/index.vue")
	}, {
		path: "/shop/vrMore",
		name: "vr-more",
		meta: {
			title: "vr更多"
		},
		component: () =>
			import("@/pages/pc/views/shop/vr-more.vue")
	}, {
		path: "/shop/goodsList",
		name: "/shop/goodsList",
		meta: {
			title: "商品列表"
		},
		component: () =>
			import("@/pages/pc/views/shop/goods-list.vue")
	}
];
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
