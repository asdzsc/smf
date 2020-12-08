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
          :disabled="model.id ? true : false"
          placeholder="请输入用户名"
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
      <!-- <a-form-model-item label="部门">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择上级菜单"
          v-model="model.department"
          multiple
          treeNodeFilterProp="title"
        >
        </a-tree-select>
      </a-form-model-item> -->

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
import { getSysDeptTree } from "@/pages/admin/api/sys/sysdept";
import { getLiveUserInfo, saveLiveUserInfo } from "@/pages/admin/api/live/liveuser";

export default {
  name: "anchor-info",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      title: "",
      model: {},
      treeData: []
    };
  },
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  activated() {
    // this.getModule();
  },
  mounted() {
    this.loadData(this.id);
  },
  methods: {
    initModel() {
      return {
        id: "",
        avatar: "",
        username: "",
        name: "",
        password: "",
        department: [],
        gender: "0",
        genderKey: { key: "0" },
        mobile: "",
        status: "0",
        userType: "1" //主播用户
      };
    },
    getDeptList() {
      getSysDeptTree({ showUser: false }).then(res => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
        }
      });
    },
    loadData(nid) {
      // this.getDeptList();
      this.visible = true;
      if (nid) {
        this.title = "编辑主播";
        this.model = this.initModel();
        getLiveUserInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            var gender = this.model.gender ? this.model.gender : "0";
            this.model.genderKey = { key: gender };
            setTimeout(() => {
              this.$refs.avatarUpload.loadData(this.model.avatar);
            }, 200);
          }
        });
      } else {
        this.title = "添加主播";
        this.model = this.initModel();
        setTimeout(() => {
          this.$refs.avatarUpload.loadData("");
        }, 200);
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
      saveLiveUserInfo(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
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
