//路由
import zxfw from "./zxfw"; //在线服务
import gywm from "./gywm"; //关于我们
import shop from "./shop"; //商城
import memory from "./memory"; //纪念馆
import xwzx from "./xwzx"; //新闻资讯
import member from "./member"; //个人中心
import mark from "./mark"; //个人纪念馆
import bwg from "./bwg"; //博物馆


export default [{
		path: "/login",
		name: "/login",
		meta: {
			title: "登录"
		},
		component: () =>
			import("@/pages/pc/views/sso/login.vue")
	},
	{
		path: "/register",
		name: "/register",
		meta: {
			title: "注册"
		},
		component: () =>
			import("@/pages/pc/views/sso/register.vue")
	},
	{
		path: "/find-pwd",
		name: "/find-pwd",
		meta: {
			title: "忘记密码"
		},
		component: () =>
			import("@/pages/pc/views/sso/find-pwd.vue")
	},
	{
		path: "/pay/alipay-pay",
		name: "/pay/alipay-pay",
		meta: {
			title: "支付宝支付"
		},
		component: () =>
			import("@/pages/pc/views/pay/alipay-pay.vue")
	},
	{
		path: "/pay/return_url",
		name: "/pay/return_url",
		meta: {
			title: "支付完成"
		},
		component: () =>
			import("@/pages/pc/views/pay/return_url.vue")
	},
	{
		path: "/",
		name: "home",
		meta: {
			title: "首页"
		},
		redirect: "/index",
		component: () =>
			import("@/pages/pc/layouts/main.vue"),
		children: [{
				path: "/index",
				name: "/index",
				meta: {
					title: "首页"
				},
				component: () =>
					import("@/pages/pc/views/index.vue")
			},
			{
				path: "/lxwm",
				name: "/lxwm",
				meta: {
					title: "联系我们"
				},
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
			},
			...zxfw,
			...gywm,
			...shop,
			...memory,
			...xwzx,
			...member,
			...bwg
		]
	},
	{
		path: "/mark",
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
			...mark,
		]
	}
];
