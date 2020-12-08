<template>
  <a-drawer
    :title="title"
    width="50%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div class="detail-info">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <div class="lable">用户名</div>
          <div class="content">{{ model.userid }}</div>
        </a-col>
        <a-col :span="12">
          <div class="lable">姓名</div>
          <div class="content">{{ model.name }}</div></a-col
        >
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <div class="lable">日期</div>
          <div class="content">{{ model.createDate }}</div>
        </a-col>
        <a-col :span="12">
          <div class="lable">IP</div>
          <div class="content">{{ model.ip }}</div></a-col
        >
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <div class="lable">操作</div>
          <div class="content">{{ model.operation }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
          <div class="lable">方法</div>
          <div class="content">{{ model.method }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
          <div class="lable">参数</div>
          <div class="content">{{ model.params }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
          <div class="lable">浏览器</div>
          <div class="content">{{ model.userAgent }}</div>
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: "log-info",
  props: {
    title: {
      default: "日志详情"
    }
  },
  data() {
    return {
      visible: false,
      model: {}
    };
  },
  mounted() {},
  methods: {
    loadData(obj) {
      this.visible = true;
      Object.assign(this.model, obj);
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
