export default [
  {
    path: "/live/column/list",
		name: "/live/column/list",
		meta: {
			title: "直播栏目管理"
		},
    component: () => import("@/pages/admin/views/live/column/list.vue")
  },
  {
    path: "/live/room/list",
		name: "/live/room/list",
		meta: {
			title: "直播间"
		},
    component: () => import("@/pages/admin/views/live/room/list.vue")
  },
  {
    path: "/live/anchor/list",
		name: "/live/anchor/list",
		meta: {
			title: "主播管理"
		},
    component: () => import("@/pages/admin/views/live/anchor/list.vue")
  },
  {
    path: "/live/comment/list",
		name: "/live/comment/list",
		meta: {
			title: "评论管理"
		},
    component: () => import("@/pages/admin/views/live/comment/list.vue")
  },
  {
    path: "/live/banner/list",
		name: "/live/banner/list",
		meta: {
			title: "轮播图管理"
		},
    component: () => import("@/pages/admin/views/live/banner/list.vue")
  },
  {
    path: "/live/room/assist-info",
		name: "/live/room/assist-info",
		meta: {
			id: "room_assistInfo",
			title: "辅播管理"
		},
    component: () => import("@/pages/admin/views/live/room/assist-info.vue")
  },
  {
    path: "/live/statistics/list",
		name: "/live/statistics/list",
		meta: {
			title: "数据统计"
		},
    component: () => import("@/pages/admin/views/live/statistics/list.vue")
  },
  {
    path: "/live/config/index",
		name: "/live/config/index",
		meta: {
			title: "直播间api配置"
		},
    component: () => import("@/pages/admin/views/live/config/index.vue")
  }
];
