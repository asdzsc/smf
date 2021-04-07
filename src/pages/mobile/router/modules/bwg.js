//博物馆
export default [
  {
    path: "/bwg",
    name: "/bwg",
    meta: {
      title: "博物馆聚落"
    },
    component: () => import("@/pages/mobile/views/bwg/index.vue")
  },
  {
    path: "/bwg/info",
    name: "/bwg/info",
    meta: {
      title: "博物馆聚落"
    },
    component: () => import("@/pages/mobile/views/bwg/info.vue")
  }
];
