import gywm from "./gywm"; //关于我们
import zxfw from "./zxfw"; //在线服务
import xwzx from "./xwzx"; //公司新闻
import shop from "./shop"; //商城
import member from "./member"; //个人中心

import mark from "./mark"; //个人纪念馆

export default [{
        path: "/login",
        name: "/login",
        meta: {
            title: "登录"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/login.vue")
    },
    {
        path: "/register",
        name: "/register",
        meta: {
            title: "注册"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/register.vue")
    },
    {
        path: "/find-pwd",
        name: "/find-pwd",
        meta: {
            title: "忘记密码"
        },
        component: () =>
            import ("@/pages/mobile/views/sso/find-pwd.vue")
    },
    {
        path: "/pay/alipay-pay",
        name: "/pay/alipay-pay",
        meta: {
            title: "支付宝支付"
        },
        component: () =>
            import ("@/pages/mobile/views/pay/alipay-pay.vue")
    },
    {
        path: "/pay/return_url",
        name: "/pay/return_url",
        meta: {
            title: "支付完成"
        },
        component: () =>
            import ("@/pages/mobile/views/pay/return_url.vue")
    },
    {
        path: "/",
        name: "mobile-home",
        meta: {
            title: "首页"
        },
        redirect: "/index",
        component: () =>
            import ("@/pages/mobile/layouts/mobile-main.vue"),
        children: [{
                path: "/index",
                name: "/index",
                meta: {
                    title: "首页"
                },
                component: () =>
                    import ("@/pages/mobile/views/index.vue")
            },
            {
                path: "/lxwm",
                name: "/lxwm",
                meta: {
                    title: "联系我们"
                },
                component: () =>
                    import ("@/pages/mobile/views/lxwm.vue")
            },
            ...gywm,
            ...zxfw,
            ...xwzx,
            ...member,
            ...shop
        ]
    },
    {
        path: "/mark",
        name: "/mark/home",
        meta: {
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
];