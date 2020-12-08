<template>
  <a-modal
    title="个人中心"
    v-model="visible"
    width="560px"
    :bodyStyle="{ padding: '10px' }"
    @ok="handleOk"
  >
    <a-form-model
      :model="user"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="头像" class="formItemAvatar">
        <avatar-upload ref="avatarUpload" @change="upload"></avatar-upload>
      </a-form-model-item>

      <a-form-model-item label="用户名">
        <div>
          {{ user.username }}
        </div>
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="user.name" placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input
          v-model="user.password"
          placeholder="无需修改密码请为空"
          type="password"
        />
      </a-form-model-item>
      <a-form-model-item label="角色">
        <div>
          {{ user.roleNames }}
        </div>
      </a-form-model-item>
      <a-form-model-item label="部门">
        <div>
          {{ user.departmentName }}
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { getAdminInfo, saveAdminInfo } from "@/pages/admin/api/sys/admin";
export default {
  name: "userInfo",
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  data() {
    return {
      visible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      user: {
        id: "",
        avatar: "",
        username: "",
        name: "",
        password: "",
        department: [],
        roleIds: [],
        roleKeys: [],
        status: "0",
        roleNames: "",
        departmentName: ""
      }
    };
  },
  mounted() {},
  methods: {
    upload(imgUrl) {
      this.user.avatar = imgUrl;
    },
    loadData() {
      this.visible = true;
      Object.assign(this.user, this.$store.state.adminAccount.user || {});
      getAdminInfo({ id: this.user.id }).then(res => {
        if (res.code === 0) {
          Object.assign(this.user, res.data);

          this.$nextTick(() => {
            this.$refs.avatarUpload.loadData(this.user.avatar);
          });
        }
      });
    },
    handleOk() {
      saveAdminInfo(this.user).then(res => {
        this.visible = false;
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.$store.commit("adminAccount/setUser", this.user);
        }
      });
    }
  }
};
</script>
