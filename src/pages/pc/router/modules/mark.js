export default [{
        path: "/mark/grjn",
        name: "/mark/grjn",
        meta: {
<<<<<<< HEAD
            title: "个人纪念馆"
=======
            title: "查找纪念馆"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        component: () =>
            import ("@/pages/pc/views/mark/grjn/search-index.vue"),
    },
    {
<<<<<<< HEAD
        path: "/mark/grjn/index",
        name: "/mark/grjn/index",
        meta: {
            title: "个人主页详情"
=======
        path: "/mark/grjn/index?id=:id",
        name: "/mark/grjn-00",
        meta: {
            title: "个人纪念馆"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        component: () =>
            import ("@/pages/pc/views/mark/grjn/index.vue"),
    },
    {
<<<<<<< HEAD
        path: "/mark/shop/goodsList",
        name: "/mark/shop/goodsList",
        meta: {
            title: "我要纪念-商品列表"
        },
        component: () =>
            import ("@/pages/pc/views/mark/shop/goods-list.vue"),
=======
        path: "/mark/grjn/keyword=:keyword",
        name: "/mark/grjn-02",
        meta: {
            title: "查找纪念馆"
        },
        component: () =>
            import ("@/pages/pc/views/mark/grjn/search-index.vue"),
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    },
    {
        path: "/mark/gybg",
        name: "/mark/gybg",
        meta: {
            title: "关于本馆"
        },
        component: () =>
            import ("@/pages/pc/views/mark/gybg/index.vue")
    },
    {
        path: "/mark/zpg",
        name: "/mark/zpg",
        meta: {
            title: "族谱馆"
        },
        component: () =>
            import ("@/pages/pc/views/mark/zpg/index.vue")
    },
    {
        path: "/mark/create",
        name: "/mark/create",
        meta: {
            title: "创建主页"
        },
        component: () =>
            import ("@/pages/pc/views/mark/create/index.vue")
<<<<<<< HEAD
    },

=======
    }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
];