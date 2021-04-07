//石门峰直播
export default [{
	path: "/live/live-play",
	name: "/live/live-play",
	meta: {
		title: "石门峰直播"
	},
	component: () => import("@/pages/mobile/views/live/live-play.vue")
}, {
	path: "/live/live-info",
	name: "/live/live-info",
	meta: {
		title: "石门峰直播"
	},
	component: () => import("@/pages/mobile/views/live/live-info.vue")
}]
