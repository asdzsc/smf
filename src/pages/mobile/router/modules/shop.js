export default [{
<<<<<<< HEAD
        path: "/shop",
        name: "shop-index",
        meta: {
            title: "石门峰线上商城"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/index.vue")
    },
    {
        path: "/shop/goodsInfo",
        name: "shop-goodsInfo",
        meta: {
            title: "商品详情"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/goods-info.vue")
    },
    {
        path: "/shop/order/confirmOrder",
        name: "/shop-order-confirmOrder",
        meta: {
            title: "确定订单"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/order/confirm-order.vue")
    },
    {
        path: "/shop/order/orderInfo",
        name: "/shop-order-orderInfo",
        meta: {
            title: "订单详情"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/order/order-info.vue")
    },
    {
        path: "/shop/order",
        name: "/shop-order",
        meta: {
            title: "服务订单"
        },
        redirect: "/shop/order/orderList"
    },
    {
        path: "/shop/order/orderList",
        name: "/shop-order-orderList",
        meta: {
            title: "服务订单"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/order/order-list.vue")
    },
    {
        path: "/shop/cart",
        name: "/shop-cart",
        meta: {
            title: "购物车"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/cart/index.vue")
    },

    {
        path: "/shop/order/addaddress",
        name: "shop-add-address",
        meta: {
            title: "新增服务墓址"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/order/add-address.vue"),
    },
    {
        path: "/shop/more/",
        name: "/shop-vr-more",
        meta: {
            title: "VR720°实景选墓更多"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/more/index.vue"),
    },
    {
        path: "/shop/goodsList",
        name: "/shop/goodsList",
        meta: {
            title: "商品列表"
        },
        component: () =>
            import ("@/pages/mobile/views/shop/goods-list.vue")
    }


];
=======
		path: "/shop",
		name: "shop-index",
		meta: {
			title: "石门峰线上商城"
		},
		component: () =>
			import("@/pages/mobile/views/shop/index.vue")
	},
	{
		path: "/shop/goodsInfo",
		name: "shop-goodsInfo",
		meta: {
			title: "商品详情"
		},
		component: () =>
			import("@/pages/mobile/views/shop/goods-info.vue")
	},
	{
		path: "/shop/order/confirmOrder",
		name: "/shop-order-confirmOrder",
		meta: {
			title: "确定订单"
		},
		component: () =>
			import("@/pages/mobile/views/shop/order/confirm-order.vue")
	},
	{
		path: "/shop/order/orderInfo",
		name: "/shop-order-orderInfo",
		meta: {
			title: "订单详情"
		},
		component: () =>
			import("@/pages/mobile/views/shop/order/order-info.vue")
	},
	{
		path: "/shop/order",
		name: "/shop-order",
		meta: {
			title: "服务订单"
		},
		redirect: "/shop/order/orderList"
	},
	{
		path: "/shop/order/orderList",
		name: "/shop-order-orderList",
		meta: {
			title: "服务订单"
		},
		component: () =>
			import("@/pages/mobile/views/shop/order/order-list.vue")
	},
	{
		path: "/shop/cart",
		name: "/shop-cart",
		meta: {
			title: "购物车"
		},
		component: () =>
			import("@/pages/mobile/views/shop/cart/index.vue")
	},

	{
		path: "/shop/order/addaddress",
		name: "shop-add-address",
		meta: {
			title: "新增服务墓址"
		},
		component: () =>
			import("@/pages/mobile/views/shop/order/add-address.vue"),
	},
	{
		path: "/cemetery/cemetery-info/",
		name: "/cemetery/cemetery-info",
		meta: {
			title: "落墓信息"
		},
		component: () => import("@/pages/mobile/views/cemetery/index.vue")
	},
	{
		path: "/shop/more/",
		name: "/shop-vr-more",
		meta: {
			title: "VR720°实景选墓更多"
		},
		component: () =>
			import("@/pages/mobile/views/shop/more/index.vue"),
	},


];
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
