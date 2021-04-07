<template>
  <a-drawer
    :title="title"
    width="50%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="头像" class="formItemAvatar">
        <avatar-upload ref="avatarUpload" @change="upload"></avatar-upload>
      </a-form-model-item>

      <a-form-model-item label="用户名">
        <a-input
          v-model="model.username"
          placeholder="请输入用户名"
          :disabled="model.id ? true : false"
        />
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="model.name" placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input
          v-model="model.password"
          :placeholder="model.id ? '无需修改密码请为空' : '请输入密码'"
          type="password"
          autocomplete
        />
      </a-form-model-item>
      <a-form-model-item label="角色">
        <a-select
          v-model="model.roleKeys"
          labelInValue
          mode="multiple"
          optionFilterProp="children"
          placeholder="请选择管理员角色"
          :disabled="
            model.username === 'admin' && model.adminType === 'sys'
              ? true
              : false
          "
        >
          <a-select-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :disabled="
              model.username === 'admin' && model.adminType === 'sys'
                ? true
                : false
            "
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="状态">
        <a-switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          :checked="model.status === '0' ? true : false"
          @change="setStatus()"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
        <a-button @click="onClose" style="margin-left: 10px;">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { getAdminInfo, saveAdminInfo } from "@/pages/admin/api/sys/admin";
import { getAllRole } from "@/pages/admin/api/sys/sysrole";

export default {
  name: "role-info",
  props: {},
  data() {
    return {
      visible: false,
      title: "",
      model: {},
      roleList: []
    };
  },
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  activated() {
    // this.getModule();
  },
  mounted() {},
  methods: {
    initModel() {
      return {
        id: "",
        avatar: "",
        username: "",
        name: "",
        password: "",
        adminType: "user",
        roleIds: [],
        roleKeys: [],
        status: "0",
        userType: "2" //管理员
      };
    },
    _getAllRole() {
      getAllRole().then(res => {
        if (res.code === 0) {
          this.roleList = res.data;
        }
      });
    },
    loadData(title, nid) {
      this._getAllRole();
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getAdminInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.model.roleIds.map(x => {
              this.model.roleKeys.push({ key: x });
            });
            this.$nextTick(() => {
              this.$refs.avatarUpload.loadData(this.model.avatar);
            });
          }
        });
      } else {
        this.model = this.initModel();
        this.$nextTick(() => {
          this.$refs.avatarUpload.loadData("");
        });
      }
    },
    upload(imgUrl) {
      this.model.avatar = imgUrl;
    },
    setStatus() {
      this.model.status = this.model.status === "0" ? "1" : "0";
    },
    onSubmit() {
      this.model.roleIds = this.model.roleKeys.map(x => {
        return x.key;
      });
      saveAdminInfo(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      if (res) this.$emit("onClose", res);
    }
  }
};
</script>

<style lang="less" scoped>
.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}
</style>
