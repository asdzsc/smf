import modules from "@/pages/pc/router/modules";

const routes = [
  ...modules,
  {
    path: "*",
    name: "404",
    component: () => import("@/pages/pc/views/exception/404.vue")
  }
];
export default routes;
