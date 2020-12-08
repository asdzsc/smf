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
      <a-form-model-item label="上级栏目">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择上级栏目"
          v-model="model.pid"
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="栏目名称">
        <a-input v-model="model.name" placeholder="请输入栏目名称" />
      </a-form-model-item>
      <a-form-model-item label="状态">
        <a-switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          :checked="model.status === '0' ? true : false"
          @change="setStatus()"
        />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
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
// import * as utils from "@/pages/admin/libs/utils";
import {
  getMemoryColumnList,
  getMemoryColumnInfo,
  saveMemoryColumnInfo
} from "@/pages/admin/api/memory/column";

export default {
  name: "goodsColumnInfo",
  props: {
    id: {
      type: String,
      default: ""
    },
    pid: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      visible: false,
      title: "",
      model: {
        id: "",
        pid: "0",
        name: "",
        status: "0",
        sortId: 0
      },
      treeData: []
    };
  },
  components: {},
  activated() {},
  mounted() {
    this.model.id = this.id;
    this.model.pid = this.pid || "0";
    this.loadData();
  },
  methods: {
    loadData() {
      this.getModule();
      this.visible = true;
      this.title = this.model.id ? "编辑纪念馆栏目" : "添加纪念馆栏目";
      if (this.model.id) {
        getMemoryColumnInfo({ id: this.model.id }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      }
    },
    getModule() {
      getMemoryColumnList({}).then(res => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
          this.treeData.splice(0, 0, {
            id: "0",
            key: "0",
            value: "0",
            pid: "-1",
            title: "顶级栏目",
            name: "顶级栏目"
          });
        }
      });
    },
    setStatus() {
      this.model.status = this.model.status === "0" ? "1" : "0";
    },
    onSubmit() {
      saveMemoryColumnInfo(this.model).then(res => {
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

<style lang="less" scoped></style>
