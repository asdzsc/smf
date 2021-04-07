<template>
  <a-modal
    :title="title"
    v-model="visible"
    width="600px"
    :bodyStyle="{ padding: '10px' }"
    @cancel="onClose"
    @ok="handleOk"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="纪念者">
        <div>{{ model.memoryName }}</div>
      </a-form-model-item>
      <a-form-model-item label="留言">
        <a-textarea
          v-model="model.cont"
          placeholder="请输入留言内容"
          :rows="5"
          style="width:400px;"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { saveMemoryMsg } from "@/pages/pc/api/mark.js";
export default {
  components: {},
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
    memoryInfo: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      visible: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: {
        id: "",
        memoryId: "",
        memoryName: "",
        msgType: "1",
        title: "",
        cont: "",
        cover: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.visible = true;
      this.title = "添加祭奠留言";
      if (this.memoryInfo) {
        this.model.memoryId = this.memoryInfo.id;
        this.model.memoryName = this.memoryInfo.name;
      }
    },
    handleOk() {
      saveMemoryMsg(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
  },
};
</script>
<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}

.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
</style>
