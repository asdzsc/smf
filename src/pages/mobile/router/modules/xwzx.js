export default [{
        path: "/xwzx",
        name: "xwzx",
        meta: {
            title: "公司新闻"
        },
        redirect: "/xwzx/ggzx"
    },
    {
        path: "/xwzx/ggzx",
        name: "xwzx-ggzx",
        meta: {
            title: "公告中心"
        },
        component: () =>
            import ("@/pages/mobile/views/xwzx/ggzx.vue")
    },
    {
        path: "/xwzx/xwdt",
        name: "xwzx-xwdt",
        meta: {
            title: "新闻动态"
        },
        component: () =>
            import ("@/pages/mobile/views/xwzx/xwdt.vue")
    },
    {
        path: "/xwzx/zbgg",
        name: "xwzx-zbgg",
        meta: {
            title: "招标广告"
        },
        component: () =>
            import ("@/pages/mobile/views/xwzx/zbgg.vue")
    }
];