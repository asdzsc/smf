import modules from "@/pages/admin/router/modules";
import menuView from "@/pages/admin/layouts/MenuView";

const routes = [
  {
    path: "/login",
		name: "/login",
		meta: {
			title: "登录页"
		},
    component: () => import("@/pages/admin/views/login.vue")
  },
  {
    path: "/",
		name: "/",
		meta: {
			title: "首页"
		},
    component: menuView,
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/dashboard/workplace",
        name: "workplace",
        component: () => import("@/pages/admin/views/dashboard/workplace.vue")
        // component: () => import("@/pages/admin/views/live/statistics/list.vue")
      },
      ...modules
    ]
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/pages/admin/views/exception/404.vue")
  }
];

export default routes;
