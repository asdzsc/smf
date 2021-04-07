export default {
	namespaced: true,
	state: {
		token: "",
		user: {},
		cartNum: 0, //购物车商品数量
		sysMessageNum: 0, //消息通知数量
		liveVerifyPwd: '', //直播观看密码
		searchKey: '', //导航栏搜索
		searchKeyMain: '' //主站搜索
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		setUser(state, user) {
			state.user = user;
		},
		setCartNum(state, cartNum) {
			state.cartNum = cartNum;
		},
		setSysMessageNum(state, sysMessageNum) {
			state.sysMessageNum = sysMessageNum;
		},
		setLiveVerifyPwd(state, liveVerifyPwd) {
			state.liveVerifyPwd = liveVerifyPwd;
		},
		setSearchKey(state, searchKey) {
			state.searchKey = searchKey;
		},
		setSearchKeyMain(state, searchKeyMain) {
			state.searchKeyMain = searchKeyMain;
		}
	}
};
