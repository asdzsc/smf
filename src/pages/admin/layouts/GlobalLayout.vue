<template>
  <a-layout>
    <a-drawer
      v-if="isMobile"
      :visible="collapsed"
      :afterVisibleChange="onDrawerChange"
    >
      <sider-menu
        ref="siderMenu"
        :theme="theme"
        :defaultOpenKeys="defaultOpenKeys"
        :menuData="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </a-drawer>
    <sider-menu
      ref="siderMenu"
      :theme="theme"
      :defaultOpenKeys="defaultOpenKeys"
      v-else-if="layout === 'side'"
      :menuData="menuData"
      :collapsed="collapsed"
      :collapsible="true"
      @menuSelect="onMenuSelect"
    />
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '240px' }">
      <global-header :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <div
        class="tabs-div"
        :style="{
          width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)'
        }"
      >
        <a-tabs
          @contextmenu.native="e => onContextmenu(e)"
          :active-key="activePage"
          :hide-add="true"
          type="editable-card"
          @change="changePage"
          @edit="editPage"
        >
          <a-tab-pane
            v-for="page in pageList"
            :id="page.id + '_' + page.name"
            :key="page.id + '_' + page.name"
            :closable="page.closable"
          >
            <span slot="tab" :pagekey="page.id + '_' + page.name">{{
              page.name
            }}</span>
          </a-tab-pane>
        </a-tabs>
      </div>
      <contextmenu
        :itemList="menuItemList"
        :visible.sync="menuVisible"
        @select="onTabsMenuSelect"
      ></contextmenu>
      <a-layout-content
        :style="{ minHeight: minHeight, margin: '122px 24px 0px' }"
      >
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { getModuleTree } from "@/pages/admin/api/sys/sysmodule";
import { getModuleItem } from "@/pages/admin/libs/sysModule";

const tabWorkplace = "0_工作台";
const minHeight = window.innerHeight - 64 - 48 - 93 - 10;
export default {
  name: "GlobalLayout",
  components: {
    contextmenu: () => import("@/pages/admin/components/menu/Contextmenu"),
    siderMenu: () => import("@/pages/admin/components/menu/SiderMenu"),
    globalFooter: () => import("@/pages/admin/layouts/GlobalFooter"),
    globalHeader: () => import("@/pages/admin/layouts/GlobalHeader")
  },
  data() {
    return {
      minHeight: minHeight + "px",
      collapsed: false,
      menuData: [],
      pageList: [],
      moduleIds: [],
      activePage: "",
      menuVisible: true,
      menuItemList: [
        { key: "1", icon: "arrow-left", text: "关闭左侧" },
        { key: "2", icon: "arrow-right", text: "关闭右侧" },
        { key: "3", icon: "close", text: "关闭其它" }
      ],
      defaultOpenKeys: []
    };
  },
  watch: {
    activePage: function(key) {
      //   if (key === '0_workplace') {
      if (key === tabWorkplace) {
        this.$router.push("/dashboard/workplace");
        if (this.$refs.siderMenu) {
          this.$refs.siderMenu.setSelectedKey("0");
        }
      } else {
        var query = this.pageList.filter(
          item => item.id + "_" + item.name === key
        );
        if (query.length > 0) {
          var moduleItem = query[0];
          this.$router.push(moduleItem.url);
          if (this.$refs.siderMenu) {
            this.$refs.siderMenu.setSelectedKey(moduleItem.id);
          }
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      var query = this.moduleList.filter(x => x.url === to.path);
      if (query.length > 0) {
        var item = query[0];
        this.$set(item, "key", item.id);
        this.onMenuSelect(item);
      }
    },
    "$store.state.adminSetting.tabPageUrl"() {
      if (this.$store.state.adminSetting.tabPageUrl) {
        var obj = this.$store.state.adminSetting.tabPageUrl;
        var tabKey = obj.id + "_" + obj.name;

        var query = this.pageList.filter(item => item.id === obj.id);
        if (query.length === 0) {
          this.moduleIds.push(tabKey);
          this.pageList.push(obj);
        }
        this.activePage = tabKey;
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.adminSetting.isMobile;
    },
    theme() {
      return this.$store.state.adminSetting.theme;
    },
    layout() {
      return this.$store.state.adminSetting.layout;
    },
    copyright() {
      return this.$store.state.adminSetting.copyright;
    },
    moduleList() {
      return this.$store.state.adminSetting.moduleList;
    }
  },
  beforeCreate() {
    //获取菜单
    getModuleTree().then(res => {
      if (res.code === 0) {
        this.$store.commit("adminSetting/setModuleList", res.data.list);
        //添加当前路由
        var query = this.moduleList.filter(x => x.url === this.$route.path);

        if (query.length > 0) {
          var item = query[0];
          this.defaultOpenKeys = [item.pid];
          this.$set(item, "key", item.id);
          this.onMenuSelect(item);
          this.$nextTick(() => {
            this.$refs.siderMenu.setSelectedKey(item.id);
          });

          //   this.addWorkplace(true)
        } else {
          this.$nextTick(() => {
            this.$refs.siderMenu.setSelectedKey("0");
          });
        }
        this.menuData = res.data.treeData;
      }
    });
  },
  created() {
    this.addWorkplace(true);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    addWorkplace(isActive) {
      var query = this.moduleIds.filter(x => x === tabWorkplace);

      if (query.length === 0) {
        this.pageList.splice(0, 0, {
          id: "0",
          name: "工作台",
          url: "/dashboard/workplace",
          closable: false
        });
        this.moduleIds.splice(0, 0, tabWorkplace);
        // if (isActive) {
        //   this.activePage = tabWorkplace;
        // }
      }
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onDrawerChange(show) {
      this.collapsed = show;
    },
    onMenuSelect(obj) {
      if (obj.key === "0") {
        this.activePage = tabWorkplace;
      } else {
        var moduleItem = getModuleItem(obj.key);
        if (moduleItem) {
          var tabKey = obj.key + "_" + moduleItem.name;
          if (this.moduleIds.indexOf(tabKey) < 0) {
            this.moduleIds.push(tabKey);
            this.pageList.push(moduleItem);
          }
          this.activePage = tabKey;
        }
      }
    },
    changePage(key) {
      this.activePage = key;
    },
    editPage(key, action) {
      this[action](key);
    },
    remove(key) {
      this.pageList = this.pageList.filter(
        item => item.id + "_" + item.name !== key
      );
      let index = this.moduleIds.indexOf(key);
      this.moduleIds = this.moduleIds.filter(item => item !== key);
      index =
        index >= this.moduleIds.length ? this.moduleIds.length - 1 : index;
      this.activePage = this.moduleIds[index];
    },
    onContextmenu(e) {
      const pagekey = this.getPageKey(e.target);
      if (pagekey !== null) {
        e.preventDefault();
        this.menuVisible = true;
      }
    },
    /**
     * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
     * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
     * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
     * @param target 查询开始目标
     * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
     * @returns {String}
     */
    getPageKey(target, depth) {
      depth = depth || 0;
      if (depth > 2) {
        return null;
      }
      let pageKey = target.getAttribute("pagekey");
      pageKey =
        pageKey ||
        (target.previousElementSibling
          ? target.previousElementSibling.getAttribute("pagekey")
          : null);
      return (
        pageKey ||
        (target.firstElementChild
          ? this.getPageKey(target.firstElementChild, ++depth)
          : null)
      );
    },
    onTabsMenuSelect(key, target) {
      let pageKey = this.getPageKey(target);
      switch (key) {
        case "1":
          this.closeLeft(pageKey);
          break;
        case "2":
          this.closeRight(pageKey);
          break;
        case "3":
          this.closeOthers(pageKey);
          break;
        default:
          break;
      }
    },
    closeOthers(pageKey) {
      let index = this.moduleIds.indexOf(pageKey);
      this.moduleIds = this.moduleIds.slice(index, index + 1);
      this.pageList = this.pageList.slice(index, index + 1);
      this.activePage = this.moduleIds[0];
      this.addWorkplace(this.moduleIds.length == 0 ? true : false);
    },
    closeLeft(pageKey) {
      let index = this.moduleIds.indexOf(pageKey);
      this.moduleIds = this.moduleIds.slice(index);
      this.pageList = this.pageList.slice(index);
      if (this.moduleIds.indexOf(this.activePage) < 0) {
        this.activePage = this.moduleIds[0];
      }
      this.addWorkplace(this.moduleIds.length == 0 ? true : false);
    },
    closeRight(pageKey) {
      let index = this.moduleIds.indexOf(pageKey);
      this.moduleIds = this.moduleIds.slice(0, index + 1);
      this.pageList = this.pageList.slice(0, index + 1);
      if (this.moduleIds.indexOf(this.activePage < 0)) {
        this.activePage = this.moduleIds[this.moduleIds.length - 1];
      }
      this.addWorkplace(this.moduleIds.length == 0 ? true : false);
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-div {
  position: fixed;
  z-index: 1;
  margin-top: 64px;
  background-color: #f0f2f5;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #e8e8e8;
}

/deep/ .ant-tabs-bar {
  margin: 0px;
  border-bottom: 0px;
}
</style>
