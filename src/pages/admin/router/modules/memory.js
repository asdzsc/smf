export default [{
		path: "/memory/template/list",
		name: "/memory/template/list",
		meta: {
			title: "模版管理"
		},
		component: () => import("@/pages/admin/views/shop/goods/list.vue")
		// component: () => import("@/pages/admin/views/memory/template/list.vue")
	},
	{
		path: "/memory/column/list",
		name: "/memory/column/list",
		meta: {
			title: "纪念馆栏目管理"
		},
		component: () => import("@/pages/admin/views/memory/column/list.vue")
	},
	{
		path: "/memory/info/list",
		name: "/memory/info/list",
		meta: {
			title: "纪念馆信息管理"
		},
		component: () => import("@/pages/admin/views/memory/info/list.vue")
	},
	{
		path: "/memory/active/list",
		name: "/memory/active/list",
		meta: {
			title: "激活码管理"
		},
		component: () => import("@/pages/admin/views/memory/active/list.vue")
	},
	{
		path: "/memory/msg/list",
		name: "/memory/msg/list",
		meta: {
			title: "留言管理"
		},
		component: () => import("@/pages/admin/views/memory/msg/msg-list.vue")
	},
	{
		path: "/memory/msg/article-list",
		name: "/memory/msg/article-list",
		meta: {
			title: "文章管理"
		},
		component: () => import("@/pages/admin/views/memory/msg/article-list.vue")
	}
];
