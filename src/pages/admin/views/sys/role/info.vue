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
      <a-form-model-item label="角色名称">
        <a-input v-model="model.name" />
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="model.remark" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="系统模块">
        <a-tree
          checkable
          v-model="model.ckIds"
          :treeData="treeData"
          @check="onCheck"
        />
      </a-form-model-item>
      <a-form-model-item label="管理部门">
        <a-tree
          checkable
          v-model="model.ckDeptIds"
          :treeData="treeDeptData"
          @check="onCheckDept"
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
import { getSysRoleInfo, saveSysRoleInfo } from "@/pages/admin/api/sys/sysrole";
import { getModuleList } from "@/pages/admin/api/sys/sysmodule";
import { getSysDeptTree } from "@/pages/admin/api/sys/sysdept";

export default {
  name: "role-info",
  props: {},
  data() {
    return {
      visible: false,
      title: "角色详情",
      model: this.initModel(),
      treeData: [],
      treeDeptData: []
    };
  },
  activated() {
    // this.getModule();
  },
  mounted() {},
  methods: {
    initModel() {
      return {
        id: "",
        name: "",
        remark: "",
        ckIds: [],
        halfCkIds: [],
        ckDeptIds: [],
        halfCkDeptIds: []
      };
    },
    getModule() {
      getModuleList({ showPermission: true }).then(res => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
        }
      });
    },
    onCheck(checkedKeys, event) {
      this.model.ckIds = checkedKeys;
      this.model.halfCkIds = event.halfCheckedKeys;
    },
    getDeptList() {
      getSysDeptTree({ showUser: false }).then(res => {
        if (res.code === 0) {
          this.treeDeptData = res.data.treeData;
        }
      });
    },
    onCheckDept(checkedKeys, event) {
      this.model.ckDeptIds = checkedKeys;
      this.model.halfCkDeptIds = event.halfCheckedKeys;
    },
    loadData(title, nid) {
      this.getModule();
      this.getDeptList();
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getSysRoleInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      } else {
        this.model = this.initModel();
      }
    },
    onSubmit() {
      // console.log("onCheck", this.model.ckIds, this.model.halfCkIds);
      saveSysRoleInfo(this.model).then(res => {
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

<style lang="less" scoped></style>
