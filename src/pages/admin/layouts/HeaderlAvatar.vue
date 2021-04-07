<template>
  <a-dropdown
    style="display: inline-block; height: 100%; vertical-align: initial"
  >
    <span style="cursor: pointer">
      <a-avatar
        v-if="currUser.avatar"
        class="avatar"
        size="small"
        shape="circle"
        :src="baseUrl + currUser.avatar"
        alt="U"
      />
      <a-avatar v-else class="avatar" size="small" shape="circle" icon="user" />
      <span>{{ currUser.name }}</span>

      <userInfo ref="userInfo"></userInfo>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item @click="showUserInfo()">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <!-- <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item> -->
      <a-menu-divider />
      <a-menu-item @click="logout()">
        <a-icon type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { logout } from "@/pages/admin/api/sso";
export default {
  name: "HeaderAvatar",
  components: {
    userInfo: () => import("@/pages/admin/layouts/components/user-info")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  computed: {
    currUser() {
      return this.$store.state.adminAccount.user || {};
    }
  },
  mounted() {},
  methods: {
    avatarError(bl) {
      console.log(bl);
    },
    showUserInfo() {
      this.$refs.userInfo.loadData();
    },
    logout() {
      logout();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  margin: 20px 4px 20px 0;
  color: #1890ff;
  background: hsla(0, 0%, 100%, 0.85);
  vertical-align: middle;
}
</style>
