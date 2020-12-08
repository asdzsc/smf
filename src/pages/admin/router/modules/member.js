export default [
  {
    path: "/member/user/list",
		name: "/member/user/list",
		meta: {
			title: "用户管理"
		},
    component: () => import("@/pages/admin/views/member/user/list.vue")
  },
  {
    path: "/member/banned/list",
		name: "/member/banned/list",
		meta: {
			title: "禁言记录"
		},
    component: () => import("@/pages/admin/views/member/banned/list.vue")
  }
];
