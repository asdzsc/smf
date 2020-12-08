export default {
	namespaced: true,
	state: {
		token: "",
		user: {},
		cartNum: 0, //购物车商品数量
		sysMessageNum: 0 //消息通知数量
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
		}
	}
};
