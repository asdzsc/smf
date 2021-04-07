import modules from "@/pages/mobile/router/modules";

const routes = [
  ...modules,
  {
    path: "*",
    name: "404",
    component: () => import("@/pages/mobile/views/exception/404.vue")
  }
];
export default routes;
