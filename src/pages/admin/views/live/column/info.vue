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
      <a-form-model-item label="栏目名称">
        <a-input v-model="model.name" placeholder="请输入栏目名称" />
      </a-form-model-item>

      <a-form-model-item label="栏目标签">
        <a-tag
          v-for="(item, index) in model.tags"
          :key="item + '_' + index"
          closable
          @close="() => handleCloseTag(item)"
        >
          {{ item }}
        </a-tag>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag
          v-else
          @click="showInput"
          style="background: #fff; borderStyle: dashed; cursor: pointer;"
        >
          <a-icon type="plus" />添加
        </a-tag>
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
import { getLiveColumnInfo, saveLiveColumnInfo } from "@/pages/admin/api/live/livecolumn";

export default {
  name: "livecolumn-info",
  data() {
    return {
      visible: false,
      title: "",
      model: this.initModel(),
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    initModel() {
      return {
        id: "",
        name: "",
        tags: [],
        sortId: 0
      };
    },
    handleCloseTag(removedTag) {
      var tags = this.model.tags.filter(tag => tag !== removedTag);
      this.model.tags = tags;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.model.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.model.tags = tags;
      this.inputVisible = false;
      this.inputValue = "";
    },
    loadData(title, nid) {
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getLiveColumnInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      } else {
        this.model = this.initModel();
      }
    },
    onSubmit() {
      saveLiveColumnInfo(this.model).then(res => {
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
