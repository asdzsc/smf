<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
//import enquireScreen from "@/pages/admin/libs/device";
export default {
  name: "App",
  data() {
    return {
<<<<<<< HEAD
      locale: zhCN,
=======
      locale: zhCN
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  created() {
    // let _this = this;
    // enquireScreen(isMobile => {
    //   _this.$store.commit("adminSetting/setDevice", isMobile);
    // });
<<<<<<< HEAD
  },
=======
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less">
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/*滚动条的设置*/

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/*滚动条移上去的背景*/

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

:global {
  //拖拽控件全局样式
  .dragable-ghost {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-chose {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  .dragable-drag {
    border: 1px dashed #aaaaaa;
    opacity: 0.65;
  }
  //页面切换动画
  // .page-toggle-enter-active {
  //   transition: all 0.2s ease-in 0.25s;
  // }
  // .page-toggle-leave-active {
  //   transition: all 0.2s ease-out 0s;
  // }
  // .page-toggle-enter,
  // .page-toggle-leave-to {
  //   opacity: 0;
  //   padding: 0px;
  // }
}
</style>
