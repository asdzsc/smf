<template>
  <a-layout-sider
    :class="[theme, 'sider', isMobile ? null : 'shadow']"
    width="240px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
  >
    <div :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <img src="/img/admin/logo.png" />
        <h1>{{ systemName }}</h1>
      </router-link>
    </div>

    <a-menu
      v-if="menuData.length"
      mode="inline"
      :selectedKeys="selectedKeys"
      :theme="theme"
      :inlineCollapsed="collapsed"
      :default-open-keys="defaultOpenKeys"
      @select="onSelect"
    >
      <a-menu-item key="0">
        <a-icon type="dashboard" />
        <span>工作台</span>
      </a-menu-item>
      <template v-for="item in menuData">
        <a-menu-item v-if="item.isLeaf" :key="item.id">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="item.id">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item
            v-for="childrenItem in item.children"
            :key="childrenItem.id"
            >{{ childrenItem.name }}</a-menu-item
          >
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "SiderMenu",
  components: {},
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    },
    //默认展开
    defaultOpenKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedKeys: []
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.adminSetting.isMobile;
    },
    systemName() {
      return this.$store.state.adminSetting.systemName;
    },
    moduleList() {
      return this.$store.state.adminSetting.moduleList;
    }
  },
  methods: {
    setSelectedKey(key) {
      var query = this.moduleList.filter(x => x.id === key);
      if (query.length > 0) {
        this.selectedKeys = [key];
      } else if (key === "0") {
        this.selectedKeys = ["0"];
      }
    },
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    }
  }
};
</script>

<style lang="less" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.sider {
  z-index: 10;
  &.light {
    background-color: #fff;
  }
  &.dark {
    background-color: #001529;
  }
  .logo {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;
    &.light {
      background-color: #fff;
      h1 {
        color: #1890ff;
      }
    }
    &.dark {
      background-color: #002140;
      h1 {
        color: #fff;
      }
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
    img {
      width: 32px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
