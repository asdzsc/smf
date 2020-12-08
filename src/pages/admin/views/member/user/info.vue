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
      <a-form-model-item label="手机号">
        <a-input v-model="model.mobile" placeholder="请输入手机号" />
      </a-form-model-item>
      <a-form-model-item label="性别">
        <a-select
          v-model="model.genderKey"
          @change="changeSex"
          labelInValue
          style="width: 120px"
        >
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="2">女</a-select-option>
          <a-select-option value="0">未知</a-select-option>
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
import { getLiveUserInfo, saveLiveUserInfo } from "@/pages/admin/api/live/liveuser";

export default {
  name: "user-info",
  props: {},
  data() {
    return {
      visible: false,
      title: "",
      model: {}
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
      this.$nextTick(() => {
        this.$refs.avatarUpload.loadData("");
      });
      return {
        id: "",
        avatar: "",
        name: "",
        password: "",
        gender: "0",
        genderKey: { key: "0" },
        mobile: "",
        status: "0",
        userType: "0" //普通用户
      };
    },
    loadData(title, nid) {
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getLiveUserInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            var gender = this.model.gender ? this.model.gender : "0";
            this.model.genderKey = { key: gender };
            this.$refs.avatarUpload.loadData(this.model.avatar);
          }
        });
      } else {
        this.model = this.initModel();
      }
    },
    upload(imgUrl) {
      this.model.avatar = imgUrl;
    },
    changeSex(value) {
      this.model.gender = value.key;
    },
    setStatus() {
      this.model.status = this.model.status === "0" ? "1" : "0";
    },
    onSubmit() {
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
      if (!reg.test(this.model.mobile)) {
        this.$notification.warning({
          message: "提示",
          description: "手机号格式不正确"
        });
      } else {
        saveLiveUserInfo(this.model).then(res => {
          if (res.code === 0) {
            this.$message.success("数据提交成功");
            this.onClose(res);
          }
        });
      }
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
