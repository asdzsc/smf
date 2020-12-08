//个人中心
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
