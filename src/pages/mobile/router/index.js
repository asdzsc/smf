import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/pages/mobile/router/router";
import NProgress from "nprogress";
import store from "@/store";
import { getUserToken, setToken } from "@/pages/mobile/api/sso";
// import Cookies from "js-cookie";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  // mode: "history",
  routes
});

const filtrList = ["/shop/order", "/shop/cart", "/member", "/mark/shop", "/gjfw"];
//直接使用微信身份登录
const filtrWxList = ["/gjfw", "/member/cemetery/buryPersonList"];


router.beforeEach((to, from, next) => {
  NProgress.start();
  var token = store.state.account.token;
  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      //验证是否绑定手机号
      verifyUserMobile(to, from, next);
    }
  } else if (to.query.code) {
    console.log("router ", to);
    getUserToken({
      code: to.query.code
    }).then(res => {
      if (res.code === 0) {
        setToken(res.data);
        delete to.query.code; //js方法
        if (to.path === "/login") {
          next("/");
        } else {
          next(to);
        }
      } else {
        next("/login");
      }
    });
  } else {
    //获取路由是否需要登录
    verifyLogin(to, from, next);
  }
});

router.afterEach(() => {
  NProgress.done();
});

//过滤路由是否需要登录
function verifyLogin(to, from, next) {
  var query = filtrList.filter(x => {
    return to.path.indexOf(x) !== -1;
  });
  if (query.length > 0) {
    var queryWx = filtrWxList.filter(x => {
      return to.path.indexOf(x) !== -1;
    });
    if (queryWx.length > 0) {
      var toUrl = encodeURIComponent(
        process.env.VUE_APP_BASE_URL + "/mobile/#" + to.fullPath
      );
      window.location = process.env.VUE_APP_BASE_URL + "/wx/oauth?url=" + toUrl;
    } else {
      var toUrl = encodeURIComponent(to.fullPath);
      next(`/login?redirect=${toUrl}`);
    }
    NProgress.done();
    // console.log(to.fullPath)
    // var urlQuery = "";
    // if (to.query) {
    //   var count = 0;
    //   for (let [key, value] of Object.entries(to.query)) {
    //     if (count === 0) {
    //       urlQuery += "?" + key + "=" + value;
    //     } else {
    //       urlQuery += "&" + key + "=" + value;
    //     }
    //     count++
    //   }
    // }
    // var toUrl = encodeURIComponent(to.path + urlQuery);
  } else {
    next();
  }
}

//过滤路由判断用户是否填写手机号
function verifyUserMobile(to, from, next) {
  try {
    var user = store.state.account.user;
    if (!user.mobile) {
      if (to.path.indexOf("/member/user-bind-mobile") >= 0) {
        //绑定手机号
        next();
      } else {
        var query = filtrList.filter(x => {
          return to.path.indexOf(x) !== -1;
        });
        if (query.length > 0) {
          var toUrl = encodeURIComponent(to.path);
          next(`/member/user-bind-mobile?redirect=${toUrl}`);
          NProgress.done();
        } else {
          next();
        }
      }
    } else {
      next();
    }
  } catch (e) {
    next();
  }
}

export default router;
