import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import setting from "./modules/setting";

import adminAccount from "./modules/adminAccount";
import adminSetting from "./modules/adminSetting";
//store持久化，刷新后不消失
import vuexAlong from "vuex-along";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		account,
		setting,
		adminAccount,
		adminSetting
	},
	plugins: [vuexAlong()]
});
