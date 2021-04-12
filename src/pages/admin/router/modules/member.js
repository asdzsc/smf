export default [
  {
    path: "/member/user/list",
<<<<<<< HEAD
    name: "/member/user/list",
    meta: {
      title: "用户管理"
    },
=======
		name: "/member/user/list",
		meta: {
			title: "用户管理"
		},
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    component: () => import("@/pages/admin/views/member/user/list.vue")
  },
  {
    path: "/member/banned/list",
<<<<<<< HEAD
    name: "/member/banned/list",
    meta: {
      title: "禁言记录"
    },
    component: () => import("@/pages/admin/views/member/banned/list.vue")
  },
  {
    path: "/member/gjfw/repairsList",
    name: "/member/gjfw/repairsList",
    meta: {
      title: "报修列表"
    },
    component: () => import("@/pages/admin/views/member/gjfw/repairsList.vue")
  },
=======
		name: "/member/banned/list",
		meta: {
			title: "禁言记录"
		},
    component: () => import("@/pages/admin/views/member/banned/list.vue")
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
];
