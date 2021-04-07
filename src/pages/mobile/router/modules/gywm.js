//关于我们
export default [
  {
    path: "/gywm",
    name: "/gywm",
    meta: {
      title: "关于我们"
    },
    redirect: "/gywm/gsjj"
  },
  {
    path: "/gywm/gsjj",
    name: "/gywm/gsjj",
    meta: {
      title: "公司简介"
    },
    component: () => import("@/pages/mobile/views/gywm/gsjj.vue")
  },
  {
    path: "/gywm/gsry",
    name: "/gywm/gsry",
    meta: {
      title: "公司荣誉"
    },
    component: () => import("@/pages/mobile/views/gywm/gsry.vue")
  },
  {
    path: "/gywm/ppgs",
    name: "/gywm/ppgs",
    meta: {
      title: "品牌故事"
    },
    component: () => import("@/pages/mobile/views/gywm/ppgs.vue")
  },
  {
    path: "/gywm/ppwh",
    name: "/gywm/ppwh",
    meta: {
      title: "品牌文化"
    },
    component: () => import("@/pages/mobile/views/gywm/ppwh.vue")
  },
  {
    path: "/gywm/qysp",
    name: "/gywm/qysp",
    meta: {
      title: "企业视频"
    },
    component: () => import("@/pages/mobile/views/gywm/qysp.vue")
  }
];
