//个人中心
export default [
  {
    path: "/member",
    name: "/member",
    meta: {
      title: "个人中心",
    },
    redirect: "/member/userInfo",
  },
  {
    path: "/member/userInfo",
    name: "/member/userInfo",
    meta: {
      title: "个人中心",
    },
    component: () => import("@/pages/mobile/views/member/user-info.vue"),
  },
  {
    path: "/member/user-edit-mobile",
    name: "/member/user-edit-mobile",
    meta: {
      title: "编辑手机号",
    },
    component: () => import("@/pages/mobile/views/member/user-edit-mobile.vue"),
  },
  {
    path: "/member/user-edit-pwd",
    name: "/member/user-edit-pwd",
    meta: {
      title: "编辑密码",
    },
    component: () => import("@/pages/mobile/views/member/user-edit-pwd.vue"),
  },
  {
    path: "/member/user-bind-mobile",
    name: "/member/user-bind-mobile",
    meta: {
      title: "绑定手机号",
    },
    component: () => import("@/pages/mobile/views/member/user-bind-mobile.vue"),
  },
  {
    path: "/member/cemetery-info",
    name: "/member/cemetery-info",
    meta: {
      title: "新增服务墓址",
    },
    component: () => import("@/pages/mobile/views/member/cemetery-info.vue"),
  },
  {
    path: "/member/sys-message-list",
    name: "/member/sys-message-list",
    meta: {
      title: "消息通知",
    },
    component: () => import("@/pages/mobile/views/member/sys-message-list.vue"),
  },
  {
    path: "/member/cemetery/buryPersonList",
    name: "/member/cemetery/buryPersonList",
    meta: {
      title: "落葬人信息",
    },
    component: () =>
      import("@/pages/mobile/views/member/cemetery/buryPersonList.vue"),
  },
  {
    path: "/member/cemetery/cemeteryList",
    name: "/member/cemetery/cemeteryList",
    meta: {
      title: "墓址列表",
    },
    component: () =>
      import("@/pages/mobile/views/member/cemetery/cemeteryList.vue"),
  },
  {
    path: "/member/cemetery/cemeteryOrder",
    name: "/member/cemetery/cemeteryOrder",
    meta: {
      title: "墓地订单",
    },
    component: () =>
      import("@/pages/mobile/views/member/cemetery/cemeteryOrderList.vue"),
  },
  {
    path: "/member/cemetery/cemeteryOrderInfo",
    name: "/member/cemetery/cemeteryOrderInfo",
    meta: {
      title: "墓地订单详情",
    },
    component: () =>
      import("@/pages/mobile/views/member/cemetery/cemeteryOrderInfo.vue"),
  },
  {
    path: "/member/cemetery/formalities",
    name: "/member/cemetery/formalities",
    meta: {
      title: "手续办理",
    },
    component: () =>
      import("@/pages/mobile/views/member/cemetery/formalities.vue"),
  },
  {
    path: "/member/grjnUser",
    name: "/member/grjnUser",
    meta: {
      title: "个人纪念馆列表",
    },
    component: () => import("@/pages/mobile/views/member/grjn-user.vue"),
  },
  {
    path: "/member/grjnUser/info",
    name: "/member/grjnUser/info",
    meta: {
      title: "个人纪念馆列表-管理主页",
    },
    component: () => import("@/pages/mobile/views/member/info/show-info.vue"),
  },
  {
    path: "/member/grjnUser/showMediaImg",
    name: "/member/grjnUser/showMediaImg",
    meta: {
      title: "个人纪念馆列表-管理相册",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-media-img.vue"),
  },
  {
    path: "/member/grjnUser/showMediaAddImg",
    name: "/member/grjnUser/showMediaAddImg",
    meta: {
      title: "个人纪念馆列表-新增相册",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-media-addImg.vue"),
  },
  {
    path: "/member/grjnUser/showMediaVideo",
    name: "/member/grjnUser/showMediaVideo",
    meta: {
      title: "个人纪念馆列表-管理视频",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-media-video.vue"),
  },
  {
    path: "/member/grjnUser/showMediaAddVideo",
    name: "/member/grjnUser/showMediaAddVideo",
    meta: {
      title: "个人纪念馆列表-新增视频",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-media-addVideo.vue"),
  },
  {
    path: "/member/grjnUser/showMsg",
    name: "/member/grjnUser/showMsg",
    meta: {
      title: "个人纪念馆列表-管理留言",
    },
    component: () => import("@/pages/mobile/views/member/info/show-msg.vue"),
  },
  {
    path: "/member/grjnUser/showMsgAddMsg",
    name: "/member/grjnUser/showMsgAddMsg",
    meta: {
      title: "个人纪念馆列表-新增留言",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-msg-addMsg.vue"),
  },
  {
    path: "/member/grjnUser/showArticle",
    name: "/member/grjnUser/showArticle",
    meta: {
      title: "个人纪念馆列表-管理文章",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-article.vue"),
  },
  {
    path: "/member/grjnUser/showArticleAddArticle",
    name: "/member/grjnUser/showArticleAddArticle",
    meta: {
      title: "个人纪念馆列表-新增文章",
    },
    component: () =>
      import("@/pages/mobile/views/member/info/show-article-addArticle.vue"),
  },
  {
    path: "/member/grjnUser/showPay",
    name: "/member/grjnUser/showPay",
    meta: {
      title: "个人纪念馆列表-模板续费",
    },
    component: () => import("@/pages/mobile/views/member/info/show-pay.vue"),
  },
];
