<template>
  <a-modal
    :title="this.specNameObj ? '编辑规格' : '添加规格'"
    v-model="visible"
    width="500px"
    style="top: 10px;"
    @ok="handleOk"
    @cancel="onClose"
    :maskClosable="false"
  >
    <div>
      <a-form-model
        :model="model"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="规格名称">
          <a-input
            v-model="model.specName"
            placeholder="请输入规格名称"
            style="width:350px;"
          />
        </a-form-model-item>
        <a-form-model-item label="规格内容">
          <a-tag
            v-for="tag in model.specTags"
            :key="tag"
            closable
            @close="() => handleTagClose(tag)"
          >
            {{ tag }}
          </a-tag>
          <a-input
            v-if="inputTagVisible"
            ref="inputTag"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            v-model="inputTagValue"
            @blur="handleInputTagConfirm"
            @keyup.enter="handleInputTagConfirm"
          />
          <a-tag
            v-else
            style="background: #fff; borderStyle: dashed;"
            @click="showInputTag()"
          >
            <a-icon type="plus" /> 添加
          </a-tag>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input-number :min="0" v-model="model.sortId" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>
<script>
import * as utils from "@/pages/admin/libs/utils";
export default {
  name: "infoSpecName",
  components: {},
  props: {
    specNameObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      visible: false,
      model: {
        id: "",
        goodsId: "",
        specName: "",
        specTags: [],
        cover: "",
        sortId: 0
      },
      inputTagVisible: false,
      inputTagValue: ""
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.visible = true;
      this.model.id = utils.getId();
      if (this.specNameObj) {
        Object.assign(this.model, this.specNameObj);
      }
    },
    handleTagClose(removedTag) {
      this.model.specTags = this.model.specTags.filter(
        tag => tag !== removedTag
      );
    },
    showInputTag() {
      this.inputTagVisible = true;
      this.$nextTick(() => {
        this.$refs.inputTag.focus();
      });
    },
    handleInputTagConfirm() {
      if (
        this.inputTagValue &&
        this.model.specTags.indexOf(this.inputTagValue) === -1
      ) {
        this.model.specTags = [...this.model.specTags, this.inputTagValue];
      }
      this.inputTagValue = "";
      this.inputTagVisible = false;
    },
    handleOk() {
      if (!this.model.specName) {
        this.$error({
          title: "提示",
          content: "规格名称不能为空"
        });
        return;
      }
      if (this.model.specTags.length === 0) {
        this.$error({
          title: "提示",
          content: "规格内容不能为空"
        });
        return;
      }
      this.$emit("getInfo", this.model);
      this.visible = false;
    },
    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>
