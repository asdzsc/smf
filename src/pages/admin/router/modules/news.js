export default [
  {
    path: "/news/column/list",
		name: "/news/column/list",
		meta: {
			title: "新闻栏目管理"
		},
    component: () => import("@/pages/admin/views/news/column/list.vue")
  },
  {
    path: "/news/article/list",
		name: "/news/article/list",
		meta: {
			title: "新闻管理"
		},
    component: () => import("@/pages/admin/views/news/article/list.vue")
  },
  {
    path: "/news/article/bwgq-list",
		name: "/news/article/bwgq-list",
		meta: {
			title: "博物馆群"
		},
    component: () => import("@/pages/admin/views/news/article/bwgq-list.vue")
  },
  {
    path: "/news/article/zbgg-list",
		name: "/news/article/zbgg-list",
		meta: {
			title: "招标广告"
		},
    component: () => import("@/pages/admin/views/news/article/zbgg-list.vue")
  }
];
