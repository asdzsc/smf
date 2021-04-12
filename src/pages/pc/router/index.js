import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/pages/pc/router/router";
import NProgress from "nprogress";
import store from "@/store";
<<<<<<< HEAD
=======
import Cookies from "js-cookie";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
<<<<<<< HEAD
    return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
    // mode: "history",
    routes
});

const filtrList = ["/shop/order", "/shop/cart", "/member", "/pay", "/mark/shop"];

router.beforeEach((to, from, next) => {
    NProgress.start();
    var token = store.state.account.token;
    if (token) {
        if (to.path === "/login") {
            next("/");
        } else {
            //验证是否绑定手机号
            verifyUserMobile(to, from, next)
        }
    } else {
        verifyLogin(to, from, next)
    }
});

router.afterEach(() => {
    NProgress.done();
=======
	return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
	// mode: "history",
	routes
});

const filtrList = ["/shop/order", "/shop/cart", "/member", "/pay"];

router.beforeEach((to, from, next) => {
	NProgress.start();
	var token = store.state.account.token;
	if (token) {
		if (to.path === "/login") {
			next("/");
		} else {
			//验证是否绑定手机号
			verifyUserMobile(to, from, next)
		}
	} else {
		verifyLogin(to, from, next)
	}
});

router.afterEach(() => {
	NProgress.done();
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
});

//过滤路由是否需要登录
function verifyLogin(to, from, next) {
<<<<<<< HEAD
    var query = filtrList.filter(x => {
        return to.path.indexOf(x) !== -1
    })
    if (query.length > 0) {
        console.log(to)
        var toUrl = encodeURIComponent(to.fullPath)
        next(`/login?redirect=${toUrl}`);
        NProgress.done();
    } else {
        next();
    }
=======
	var query = filtrList.filter(x => {
		return to.path.indexOf(x) !== -1
	})
	if (query.length > 0) {
		console.log(to)
		var toUrl = encodeURIComponent(to.fullPath)
		next(`/login?redirect=${toUrl}`);
		NProgress.done();
	} else {
		next();
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

//过滤路由判断用户是否填写手机号
function verifyUserMobile(to, from, next) {
<<<<<<< HEAD
    try {
        var user = store.state.account.user;
        if (!user.mobile) {
            if (to.path.indexOf('/member/user-bind-mobile') >= 0) {
                //绑定手机号
                next();
            } else {
                var query = filtrList.filter(x => {
                    return to.path.indexOf(x) !== -1
                })
                if (query.length > 0) {
                    var toUrl = encodeURIComponent(to.path)
                    next(`/member/user-bind-mobile?redirect=${toUrl}`);
                    NProgress.done();
                } else {
                    next();
                }
            }
        } else {
            next()
        }
    } catch (e) {
        next()
    }
}

export default router;
=======
	try {
		var user = store.state.account.user;
		if (!user.mobile) {
			if (to.path.indexOf('/member/user-bind-mobile') >= 0) {
				//绑定手机号
				next();
			} else {
				var query = filtrList.filter(x => {
					return to.path.indexOf(x) !== -1
				})
				if (query.length > 0) {
					var toUrl = encodeURIComponent(to.path)
					next(`/member/user-bind-mobile?redirect=${toUrl}`);
					NProgress.done();
				} else {
					next();
				}
			}
		} else {
			next()
		}
	} catch (e) {
		next()
	}
}

export default router;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
