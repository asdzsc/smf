export default {
	namespaced: true,
	state: {
		token: "",
		user: {},
		cartNum: 0, //购物车商品数量
<<<<<<< HEAD
		sysMessageNum: 0, //消息通知数量
		liveVerifyPwd: '', //直播观看密码
		searchKey: '', //导航栏搜索
		searchKeyMain: '' //主站搜索
=======
		sysMessageNum: 0 //消息通知数量
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
		},
		setLiveVerifyPwd(state, liveVerifyPwd) {
			state.liveVerifyPwd = liveVerifyPwd;
		},
		setSearchKey(state, searchKey) {
			state.searchKey = searchKey;
		},
		setSearchKeyMain(state, searchKeyMain) {
			state.searchKeyMain = searchKeyMain;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		}
	}
};
