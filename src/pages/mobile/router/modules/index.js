import gywm from "./gywm"; //关于我们
import zxfw from "./zxfw"; //在线服务
import xwzx from "./xwzx"; //公司新闻
import shop from "./shop"; //商城
import member from "./member"; //个人中心
<<<<<<< HEAD
import mark from "./mark"; //个人纪念馆
import live from "./live"; //直播
import bwg from "./bwg"; //博物馆
=======

import mark from "./mark"; //个人纪念馆
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

export default [{
        path: "/login",
        name: "/login",
        meta: {
<<<<<<< HEAD
            title: "登录",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/login.vue"),
=======
            title: "登录"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/login.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/register",
        name: "/register",
        meta: {
<<<<<<< HEAD
            title: "注册",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/register.vue"),
=======
            title: "注册"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/register.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/find-pwd",
        name: "/find-pwd",
        meta: {
<<<<<<< HEAD
            title: "忘记密码",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/find-pwd.vue"),
=======
            title: "忘记密码"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/find-pwd.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/pay/alipay-pay",
        name: "/pay/alipay-pay",
        meta: {
<<<<<<< HEAD
            title: "支付宝支付",
        },
        component: () =>
            import ("@/pages/mobile/views/pay/alipay-pay.vue"),
=======
            title: "支付宝支付"
        },
        component: () =>
            import ("@/pages/mobile/views/pay/alipay-pay.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/pay/return_url",
        name: "/pay/return_url",
        meta: {
<<<<<<< HEAD
            title: "支付完成",
        },
        component: () =>
            import ("@/pages/mobile/views/pay/return_url.vue"),
=======
            title: "支付完成"
        },
        component: () =>
            import ("@/pages/mobile/views/pay/return_url.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/",
        name: "mobile-home",
        meta: {
<<<<<<< HEAD
            title: "首页",
=======
            title: "首页"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        redirect: "/index",
        component: () =>
            import ("@/pages/mobile/layouts/mobile-main.vue"),
        children: [{
                path: "/index",
                name: "/index",
                meta: {
<<<<<<< HEAD
                    title: "首页",
                },
                component: () =>
                    import ("@/pages/mobile/views/index.vue"),
=======
                    title: "首页"
                },
                component: () =>
                    import ("@/pages/mobile/views/index.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            },
            {
                path: "/lxwm",
                name: "/lxwm",
                meta: {
<<<<<<< HEAD
                    title: "联系我们",
                },
                component: () =>
                    import ("@/pages/mobile/views/lxwm.vue"),
            },
            {
                path: "/search",
                name: "/search",
                meta: {
                    title: "网站搜索",
                },
                component: () =>
                    import ("@/pages/mobile/views/search.vue"),
=======
                    title: "联系我们"
                },
                component: () =>
                    import ("@/pages/mobile/views/lxwm.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            },
            ...gywm,
            ...zxfw,
            ...xwzx,
            ...member,
<<<<<<< HEAD
            ...shop,
            ...bwg,
        ],
=======
            ...shop
        ]
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/mark",
        name: "/mark/home",
        meta: {
<<<<<<< HEAD
            title: "个人圆满纪念",
        },
        redirect: "/mark/index",
        component: () =>
            import ("@/pages/mobile/layouts/new-mobile-main.vue"),
        children: [{
                path: "/mark/index",
                name: "/mark/index",
                meta: {
                    title: "个人圆满纪念",
                },
                component: () =>
                    import ("@/pages/mobile/views/mark/index.vue"),
            },
            ...mark,
        ],
    },
    {
        path: "/live",
        name: "/live",
        meta: {
            title: "石门峰直播",
        },
        // redirect: "/mark/home",
        component: () =>
            import ("@/pages/mobile/layouts/live-main.vue"),
        children: [...live],
    },
    {
        path: "/gjfw",
        name: "/gjfw",
        meta: {
            title: "维修登记",
        },
        component: () =>
            import ("@/pages/mobile/views/member/gjfw/gjfw.vue"),
    },
    {
        path: "/gjfw/fwjl",
        name: "/gjfw/fwjl",
        meta: {
            title: "维修记录",
        },
        component: () =>
            import ("@/pages/mobile/views/member/gjfw/fwjl.vue"),
    },
=======
            title: "纪念馆首页"
        },
        redirect: "/mark/home",
        component: () =>
            import ("@/pages/mobile/layouts/new-mobile-main.vue"),
        children: [{
                path: "/mark/home",
                name: "/mark/home",
                meta: {
                    title: "纪念馆首页"
                },
                component: () =>
                    import ("@/pages/mobile/views/mark/index.vue")
            },
            ...member,
            ...mark,
        ]
    }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
];