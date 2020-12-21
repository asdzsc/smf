export default [{
		path: "/shop/goods/class-list",
		name: "/shop/goods/class-list",
		meta: {
			title: "商品栏目管理"
		},
		component: () => import("@/pages/admin/views/shop/goods/class-list.vue")
	},
	{
		path: "/shop/banner/list",
		name: "/shop/banner/list",
		meta: {
			title: "轮播图"
		},
		component: () => import("@/pages/admin/views/sys/banner/list.vue")
	},
	{
		path: "/shop/goods/list",
		name: "/shop/goods/list",
		meta: {
			title: "商品管理"
		},
		component: () => import("@/pages/admin/views/shop/goods/list.vue")
	},
	{
		path: "/shop/order/list",
		name: "/shop/order/list",
		meta: {
			title: "商品订单"
		},
		component: () => import("@/pages/admin/views/shop/order/list.vue")
	},
	{
		path: "/shop/order/comment/list",
		name: "/shop/order/comment/list",
		meta: {
			title: "订单-评论管理"
		},
		component: () => import("@/pages/admin/views/shop/order/comment/list.vue")
	},
	{
		path: "/shop/serveuser/list",
		name: "/shop/serveuser/list",
		meta: {
			title: "服务人员"
		},
		component: () => import("@/pages/admin/views/shop/serveuser/list.vue")
	}

];
