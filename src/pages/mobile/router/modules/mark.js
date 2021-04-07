export default [{
        path: "/mark/grjn",
        name: "/mark/grjn",
        meta: {
            title: "个人纪念馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/grjn/search-index.vue"),
    },
    {
        path: "/mark/grjn/index",
        name: "/mark/grjn/index",
        meta: {
            title: "个人主页详情"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/grjn/index.vue"),
    },
    {
        path: "/mark/shop/goodsList",
        name: "/mark/shop/goodsList",
        meta: {
            title: "我要纪念-商品列表"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/shop/goods-list.vue"),
    },
    {
        path: "/mark/gybg",
        name: "/mark/gybg",
        meta: {
            title: "关于本馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/gybg/index.vue")
    },
    {
        path: "/mark/zpg",
        name: "/mark/zpg",
        meta: {
            title: "族谱馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/zpg/index.vue")
    },
    {
        path: "/mark/create",
        name: "/mark/create",
        meta: {
            title: "创建主页"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/create/index.vue")
    }
];