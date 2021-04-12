//个人中心
<<<<<<< HEAD
export default [{
        path: "/member",
        name: "/member",
        meta: {
            title: "个人中心"
        },
        redirect: "/member/userInfo"
    },
    {
        path: "/member/userInfo",
        name: "/member/userInfo",
        meta: {
            title: "个人中心"
        },
        component: () =>
            import ("@/pages/pc/views/member/user-info.vue")
    },
    {
        path: "/member/user-bind-mobile",
        name: "/member/user-bind-mobile",
        meta: {
            title: "个人中心"
        },
        component: () =>
            import ("@/pages/pc/views/member/user-bind-mobile.vue")
    },
    {
        path: "/member/sys-message-list",
        name: "/member/sys-message-list",
        meta: {
            title: "消息通知"
        },
        component: () =>
            import ("@/pages/pc/views/member/sys-message-list.vue")
    },
    {
        path: "/member/cemetery/buryPersonList",
        name: "/member/cemetery/buryPersonList",
        meta: {
            title: "落葬人信息"
        },
        component: () =>
            import ("@/pages/pc/views/member/cemetery/buryPersonList.vue")
    },
    {
        path: "/member/grjnUser",
        name: "/member/grjnUser",
        meta: {
            title: "个人纪念馆列表"
        },
        component: () =>
            import ("@/pages/pc/views/member/grjn-user.vue")
    }, {
        path: "/member/zpg",
        name: "/member/zpg",
        meta: {
            title: "族谱馆列表"
        },
        component: () =>
            import ("@/pages/pc/views/member/zpg.vue")
    }, {
        path: "/member/cemetery/cemeteryList",
        name: "/member/cemetery/cemeteryList",
        meta: {
            title: "墓地列表"
        },
        component: () =>
            import ("@/pages/pc/views/member/cemetery/cemeteryList.vue")
    },
    {
        path: "/member/cemetery/cemeteryOrder",
        name: "/member/cemetery/cemeteryOrder",
        meta: {
            title: "墓地订单"
        },
        component: () =>
            import ("@/pages/pc/views/member/cemetery/cemeteryOrderList.vue")
    },
    {
        path: "/member/cemetery/cemeteryOrderInfo",
        name: "/member/cemetery/cemeteryOrderInfo",
        meta: {
            title: "墓地订单详情"
        },
        component: () =>
            import ("@/pages/pc/views/member/cemetery/cemeteryOrderInfo.vue")
    },
    {
        path: "/member/cemetery/formalities",
        name: "/member/cemetery/formalities",
        meta: {
            title: "手续办理"
        },
        component: () =>
            import ("@/pages/pc/views/member/cemetery/formalities.vue")
    }
];
=======
export default [
  {
    path: "/member",
    name: "/member",
    meta: {
      title: "个人中心"
    },
		redirect: "/member/userInfo"
  },
	{
	  path: "/member/userInfo",
	  name: "/member/userInfo",
	  meta: {
	    title: "个人中心"
	  },
	  component: () => import("@/pages/pc/views/member/user-info.vue")
	},
	{
	  path: "/member/user-bind-mobile",
	  name: "/member/user-bind-mobile",
	  meta: {
	    title: "个人中心"
	  },
	  component: () => import("@/pages/pc/views/member/user-bind-mobile.vue")
	},
	{
	  path: "/member/sys-message-list",
	  name: "/member/sys-message-list",
	  meta: {
	    title: "消息通知"
	  },
	  component: () => import("@/pages/pc/views/member/sys-message-list.vue")
	},
	
];
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
