//路由
import zxfw from "./zxfw"; //在线服务
import gywm from "./gywm"; //关于我们
import shop from "./shop"; //商城
import memory from "./memory"; //纪念馆
import xwzx from "./xwzx"; //新闻资讯
import member from "./member"; //个人中心
import mark from "./mark"; //个人中心

import jnFree from "./grjn/jn-free"; //免费模板
import jn01 from "./grjn/jn-01"; //模板1 辛亥英烈
import jn02 from "./grjn/jn-02"; //模板2 抗战英雄
import jn03 from "./grjn/jn-03"; //模板3 红色先烈
import jn04 from "./grjn/jn-04"; //模板4 共和国卫士
import jn05 from "./grjn/jn-05"; //模板5 爱心天使
import jn06 from "./grjn/jn-06"; //模板6 文学巨匠
import jn07 from "./grjn/jn-07"; //模板7 艺术大师
import jn08 from "./grjn/jn-08"; //模板8 白衣天使
import jn09 from "./grjn/jn-09"; //模板9 辛勤园丁
import jn10 from "./grjn/jn-10"; //模板10 钢铁英雄
import jn11 from "./grjn/jn-11"; //模板11 不凡人生

export default [{
		path: "/login",
		name: "/login",
		meta: {
			title: "登录"
		},
		component: () => import("@/pages/pc/views/sso/login.vue")
	},
	{
		path: "/test",
		name: "/test",
		meta: {
			title: "测试"
		},
		component: () => import("@/pages/pc/views/test/index.vue")
	},
	{
		path: "/register",
		name: "/register",
		meta: {
			title: "注册"
		},
		component: () => import("@/pages/pc/views/sso/register.vue")
	},
	{
		path: "/find-pwd",
		name: "/find-pwd",
		meta: {
			title: "忘记密码"
		},
		component: () => import("@/pages/pc/views/sso/find-pwd.vue")
	},
	{
		path: "/pay/alipay-pay",
		name: "/pay/alipay-pay",
		meta: {
			title: "支付宝支付"
		},
		component: () => import("@/pages/pc/views/pay/alipay-pay.vue")
	},
	{
		path: "/pay/return_url",
		name: "/pay/return_url",
		meta: {
			title: "支付完成"
		},
		component: () => import("@/pages/pc/views/pay/return_url.vue")
	},
	{
		path: "/",
		name: "home",
		meta: {
			title: "首页"
		},
		redirect: "/index",
		component: () => import("@/pages/pc/layouts/main.vue"),
		children: [{
				path: "/index",
				name: "/index",
				meta: {
					title: "首页"
				},
				component: () => import("@/pages/pc/views/index.vue")
			},
			{
				path: "/lxwm",
				name: "/lxwm",
				meta: {
					title: "联系我们"
				},
				component: () => import("@/pages/pc/views/lxwm.vue")
			},
			...zxfw,
			...gywm,
			...shop,
			...memory,
			...xwzx,
			...member
		]
	},
	{
		path: "/mark",
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
			...mark,
			...jnFree,
			...jn01,
			...jn02,
			...jn03,
			...jn04,
			...jn05,
			...jn06,
			...jn07,
			...jn08,
			...jn09,
			...jn10,
			...jn11
		]
	}
];
