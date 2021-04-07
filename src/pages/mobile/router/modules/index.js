import gywm from "./gywm"; //关于我们
import zxfw from "./zxfw"; //在线服务
import xwzx from "./xwzx"; //公司新闻
import shop from "./shop"; //商城
import member from "./member"; //个人中心
import mark from "./mark"; //个人纪念馆
import live from "./live"; //直播
import bwg from "./bwg"; //博物馆

export default [{
        path: "/login",
        name: "/login",
        meta: {
            title: "登录",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/login.vue"),
    },
    {
        path: "/register",
        name: "/register",
        meta: {
            title: "注册",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/register.vue"),
    },
    {
        path: "/find-pwd",
        name: "/find-pwd",
        meta: {
            title: "忘记密码",
        },
        component: () =>
            import ("@/pages/mobile/views/sso/find-pwd.vue"),
    },
    {
        path: "/pay/alipay-pay",
        name: "/pay/alipay-pay",
        meta: {
            title: "支付宝支付",
        },
        component: () =>
            import ("@/pages/mobile/views/pay/alipay-pay.vue"),
    },
    {
        path: "/pay/return_url",
        name: "/pay/return_url",
        meta: {
            title: "支付完成",
        },
        component: () =>
            import ("@/pages/mobile/views/pay/return_url.vue"),
    },
    {
        path: "/",
        name: "mobile-home",
        meta: {
            title: "首页",
        },
        redirect: "/index",
        component: () =>
            import ("@/pages/mobile/layouts/mobile-main.vue"),
        children: [{
                path: "/index",
                name: "/index",
                meta: {
                    title: "首页",
                },
                component: () =>
                    import ("@/pages/mobile/views/index.vue"),
            },
            {
                path: "/lxwm",
                name: "/lxwm",
                meta: {
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
            },
            ...gywm,
            ...zxfw,
            ...xwzx,
            ...member,
            ...shop,
            ...bwg,
        ],
    },
    {
        path: "/mark",
        name: "/mark/home",
        meta: {
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
];