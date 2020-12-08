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
    component: () => import("@/pages/mobile/views/member/user-info.vue")
  },
  {
    path: "/member/user-edit-mobile",
    name: "/member/user-edit-mobile",
    meta: {
      title: "编辑手机号"
    },
    component: () => import("@/pages/mobile/views/member/user-edit-mobile.vue")
  },
  {
    path: "/member/user-edit-pwd",
    name: "/member/user-edit-pwd",
    meta: {
      title: "编辑密码"
    },
    component: () => import("@/pages/mobile/views/member/user-edit-pwd.vue")
  },
  {
    path: "/member/user-bind-mobile",
    name: "/member/user-bind-mobile",
    meta: {
      title: "绑定手机号"
    },
    component: () => import("@/pages/mobile/views/member/user-bind-mobile.vue")
  },
  {
    path: "/member/cemetery-info",
    name: "/member/cemetery-info",
    meta: {
      title: "新增服务墓址"
    },
    component: () => import("@/pages/mobile/views/member/cemetery-info.vue")
  },
  {
    path: "/member/sys-message-list",
    name: "/member/sys-message-list",
    meta: {
      title: "消息通知"
    },
    component: () => import("@/pages/mobile/views/member/sys-message-list.vue")
  }
];
