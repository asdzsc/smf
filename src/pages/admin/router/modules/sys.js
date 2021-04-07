export default [{
		path: "/sys/dept/list",
		name: "/sys/dept/list",
		meta: {
			title: "部门管理"
		},
		component: () => import("@/pages/admin/views/sys/dept/list.vue")
	},
	{
		path: "/sys/role/list",
		name: "/sys/role/list",
		meta: {
			title: "角色管理"
		},
		component: () => import("@/pages/admin/views/sys/role/list.vue")
	},
	{
		path: "/sys/admin/list",
		name: "/sys/admin/list",
		meta: {
			title: "管理员"
		},
		component: () => import("@/pages/admin/views/sys/admin/list.vue")
	},
	{
		path: "/sys/module/list",
		name: "/sys/module/list",
		meta: {
			title: "菜单管理"
		},
		component: () => import("@/pages/admin/views/sys/module/list.vue")
	},
	{
		path: "/sys/log/list",
		name: "/sys/log/list",
		meta: {
			title: "系统日志"
		},
		component: () => import("@/pages/admin/views/sys/log/list.vue")
	},
	{
		path: "/sys/banner/list",
		name: "/sys/banner/list",
		meta: {
			title: "轮播图"
		},
		component: () => import("@/pages/admin/views/sys/banner/list.vue")
	}
];
