export default {
	namespaced: true,
	state: {
		tabHeight: 200,
		emojiList: [
			"微笑",
			"撇嘴",
			"色",
			"发呆",
			"得意",
			"流泪",
			"害羞",
			"闭嘴",
			"睡",
			"发怒",
			"调皮",
			"呲牙",
			"惊讶",
			"难过",
			"冷汗",
			"抓狂",
			"可爱",
			"流汗",
			"憨笑",
			"奋斗",
			"晕",
			"折磨",
			"衰",
			"坏笑",
			"左哼哼",
			"右哼哼",
			"口罩"
		]
	},
	mutations: {
		setTabHeight(state, tabHeight) {
		  state.tabHeight = tabHeight;
		}
	}
};
