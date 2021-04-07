export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: "dark",
    layout: "side",
    systemName: "石门峰管理后台",
    copyright: "2020 石门峰",
    //系统模块菜单
    moduleList: [],
    tabPageUrl: null //在标签打开新页面
  },
  mutations: {
    setDevice(state, isMobile) {
      state.isMobile = isMobile;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLayout(state, layout) {
      state.layout = layout;
    },
    setModuleList(state, moduleList) {
      state.moduleList = moduleList;
    },
    setTabPageUrl(state, tabPageUrl) {
      state.tabPageUrl = tabPageUrl;
    }
  }
};
