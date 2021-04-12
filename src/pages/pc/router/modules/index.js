//路由
import zxfw from "./zxfw"; //在线服务
import gywm from "./gywm"; //关于我们
import shop from "./shop"; //商城
import memory from "./memory"; //纪念馆
import xwzx from "./xwzx"; //新闻资讯
import member from "./member"; //个人中心
<<<<<<< HEAD
import mark from "./mark"; //个人纪念馆
import bwg from "./bwg"; //博物馆

=======

import mark from "./mark"; //个人纪念馆
 
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

export default [{
		path: "/login",
		name: "/login",
		meta: {
			title: "登录"
		},
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/views/sso/login.vue")
=======
		component: () => import("@/pages/pc/views/sso/login.vue")
	},
	{
		path: "/test",
		name: "/test",
		meta: {
			title: "测试"
		},
		component: () => import("@/pages/pc/views/test/index.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	},
	{
		path: "/register",
		name: "/register",
		meta: {
			title: "注册"
		},
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/views/sso/register.vue")
=======
		component: () => import("@/pages/pc/views/sso/register.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	},
	{
		path: "/find-pwd",
		name: "/find-pwd",
		meta: {
			title: "忘记密码"
		},
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/views/sso/find-pwd.vue")
=======
		component: () => import("@/pages/pc/views/sso/find-pwd.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	},
	{
		path: "/pay/alipay-pay",
		name: "/pay/alipay-pay",
		meta: {
			title: "支付宝支付"
		},
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/views/pay/alipay-pay.vue")
=======
		component: () => import("@/pages/pc/views/pay/alipay-pay.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	},
	{
		path: "/pay/return_url",
		name: "/pay/return_url",
		meta: {
			title: "支付完成"
		},
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/views/pay/return_url.vue")
=======
		component: () => import("@/pages/pc/views/pay/return_url.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	},
	{
		path: "/",
		name: "home",
		meta: {
			title: "首页"
		},
		redirect: "/index",
<<<<<<< HEAD
		component: () =>
			import("@/pages/pc/layouts/main.vue"),
=======
		component: () => import("@/pages/pc/layouts/main.vue"),
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		children: [{
				path: "/index",
				name: "/index",
				meta: {
					title: "首页"
				},
<<<<<<< HEAD
				component: () =>
					import("@/pages/pc/views/index.vue")
=======
				component: () => import("@/pages/pc/views/index.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			},
			{
				path: "/lxwm",
				name: "/lxwm",
				meta: {
					title: "联系我们"
				},
<<<<<<< HEAD
				component: () =>
					import("@/pages/pc/views/lxwm.vue")
			},
			{
				path: "/search",
				name: "/search",
				meta: {
					title: "网站搜索"
				},
				component: () =>
					import("@/pages/pc/views/search.vue")
=======
				component: () => import("@/pages/pc/views/lxwm.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			},
			...zxfw,
			...gywm,
			...shop,
			...memory,
			...xwzx,
<<<<<<< HEAD
			...member,
			...bwg
=======
			...member
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		]
	},
	{
		path: "/mark",
<<<<<<< HEAD
		name: "/mark",
		meta: {
			title: "个人圆满纪念"
		},
		redirect: "/mark/index",
		component: () =>
			import("@/pages/pc/layouts/new-main.vue"),
		children: [{
				path: "/mark/index",
				name: "/mark/index",
				meta: {
					title: "个人圆满纪念"
				},
				component: () =>
					import("@/pages/pc/views/mark/index.vue")
			},
=======
		name: "/mark/home",
		meta: {
			title: "纪念馆首页"
		},
		redirect: "/mark/home",
		component: () => import("@/pages/pc/layouts/new-main.vue"),
		children: [{
				path: "/mark/home",
				name: "/mark/home",
				meta: {
					title: "纪念馆首页"
				},
				component: () => import("@/pages/pc/views/mark/index.vue")
			},
			...member,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			...mark,
		]
	}
];
