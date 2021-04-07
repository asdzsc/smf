export default [
  {
    path: "/zxfw",
    name: "/zxfw",
    meta: {
      title: "在线服务"
    },
    component: () => import("@/pages/pc/views/zxfw/zxfw.vue")
  },
  {
    path: "/zxfw/mfsmfw",
    name: "/zxfw/mfsmfw",
    meta: {
      title: "免费上门服务"
    },
    component: () => import("@/pages/pc/views/zxfw/mfsmfw.vue")
  },
  {
    path: "/zxfw/azlyfw",
    name: "/zxfw/azlyfw",
    meta: {
      title: "安葬礼仪服务"
    },
    component: () => import("@/pages/pc/views/zxfw/azlyfw.vue")
  },
  {
    path: "/zxfw/rsjnfw",
    name: "/zxfw/rsjnfw",
    meta: {
      title: "人生纪念服务"
    },
    component: () => import("@/pages/pc/views/zxfw/rsjnfw.vue")
  },
  {
    path: "/zxfw/jmhxfw",
    name: "/zxfw/jmhxfw",
    meta: {
      title: "旧墓换新服务"
    },
    component: () => import("@/pages/pc/views/zxfw/jmhxfw.vue")
  },
  {
    path: "/zxfw/mbbjfw",
    name: "/zxfw/mbbjfw",
    meta: {
      title: "墓碑保洁服务"
    },
    component: () => import("@/pages/pc/views/zxfw/mbbjfw.vue")
  },
  {
    path: "/zxfw/info",
    name: "/zxfw/info",
    meta: {
      title: "预约服务"
    },
    component: () => import("@/pages/pc/views/zxfw/info.vue")
  }
];
