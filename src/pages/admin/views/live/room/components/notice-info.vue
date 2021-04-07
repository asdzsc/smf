<template>
  <a-modal
    title="发布公告"
    v-model="visible"
    @ok="hideModal"
    okText="确认"
    cancelText="取消"
  >
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-model-item label="公告内容">
        <a-input
          v-model="model.notice"
          placeholder="请输入直播间公告"
          style="width:350px;"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { saveNotice } from "@/pages/admin/api/live/livelist";
export default {
  name: "notice-info",
  data() {
    return {
      visible: false,
      model: {
        id: "",
        notice: ""
      }
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    loadData(nid) {
      this.model.id = nid;
      this.visible = true;
    },
    hideModal() {
      saveNotice(this.model).then(res => {
        if (res.code === 0) {
          this.visible = false;
          this.$message.success("数据提交成功");
          this.$emit("close", this.model);
        }
      });
    }
  }
};
</script>
