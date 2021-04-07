//纪念馆
export default [
  {
    path: "/memory/info",
    name: "memory-info",
    meta: {
      title: "个人主页"
    },
    component: () => import("@/pages/pc/views/memory/info.vue")
  }
];
