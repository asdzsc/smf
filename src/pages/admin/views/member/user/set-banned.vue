<template>
  <a-modal
    title="禁言设置"
    v-model="visible"
    @ok="hideModal"
    okText="确认"
    cancelText="取消"
  >
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-model-item label="用户">
        <div>
          {{ model.name }}
        </div>
      </a-form-model-item>
      <a-form-model-item label="禁言时长">
        <a-select
          v-model="model.bannedTimeKey"
          @change="changeTime"
          placeholder="请选择禁言时长"
          labelInValue
          style="width: 120px"
        >
          <a-select-option value="10">10分钟</a-select-option>
          <a-select-option value="30">30分钟</a-select-option>
          <a-select-option value="60">1小时</a-select-option>
          <a-select-option value="-1">永久</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { setBanned } from "@/pages/admin/api/live/livebanned";
export default {
  name: "set-banned",
  data() {
    return {
      visible: false,
      model: {}
    };
  },
  mounted() {},
  methods: {
    initModel() {
      this.model = {
        userId: "",
        name: "",
        liveId: "0",
        bannedTime: "",
        bannedTimeKey: ""
      };
    },
    changeTime(value) {
      this.model.bannedTime = value.key;
    },
    // eslint-disable-next-line no-unused-vars
    loadData(userid, name, liveId) {
      this.initModel();
      this.visible = true;
      this.model.userId = userid;
      this.model.name = name;
      if (liveId) this.model.liveId = liveId;
    },
    hideModal() {
      setBanned(this.model).then(res => {
        if (res.code === 0) {
          this.visible = false;
          this.$message.success("数据提交成功");
          this.$emit("close", res);
        }
      });
    }
  }
};
</script>
