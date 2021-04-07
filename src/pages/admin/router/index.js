import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/pages/admin/router/router";
import NProgress from "nprogress";
import store from "@/store";
import Cookies from "js-cookie";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // mode: "history",
  routes
});

const whiteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  // console.log(Date.parse(new Date()))
  NProgress.start(); // start progress bar
  var token = store.state.adminAccount.token || '';
  if (token) {
    // determine if there has sessionId
    /* has sessionId*/
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    /* has no sessionId*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      const comp = Cookies.get("comp");
      if (comp) {
        next(`/login?comp=${comp}`);
      } else {
        next("/login"); // 否则全部重定向到登录页
      }
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
