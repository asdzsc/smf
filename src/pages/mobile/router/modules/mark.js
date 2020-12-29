export default [{
        path: "/mark/grjn",
        name: "/mark/grjn",
        meta: {
            title: "查找纪念馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/grjn/search-index.vue"),
    },
    {
        path: "/mark/grjn/grjn-00",
        name: "/mark/grjn-00",
        meta: {
            title: "个人纪念馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/grjn/grjn-08.vue"),
    },
    {
        path: "/mark/grjn/index?id=:id",
        name: "/mark/grjn-00",
        meta: {
            title: "个人纪念馆"
        },
        component: () =>
            import ("@/pages/mobile/views/mark/grjn/index.vue"),
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