<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <van-field label="纪念者:" v-model="model.memoryName" readonly />
    <van-field
      rows="3"
      autosize
      label="祭奠留言:"
      type="textarea"
      placeholder="请输入留言内容"
      v-model="model.cont"
    />
    <div class="button-group">
      <van-button type="primary" color="#004930" size="large" @click="handleOk"
        >确定</van-button
      >
      <van-button
        plain
        type="primary"
        color="#004930"
        size="large"
        @click="handleCancel"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
import { saveMemoryMsg } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: {
        id: "",
        memoryId: this.$route.query.id, //纪念馆id
        memoryName: this.$route.query.name,
        msgType: "1",
        title: "",
        cont: "",
        cover: "",
        isGoods: "0",
        orderId: "",
      },
    };
  },
  mounted() {},
  methods: {
    // 确认
    handleOk() {
      saveMemoryMsg(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "提交成功",
          });
          this.$router.go(-1);
        }
      });
    },
    // 取消
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.button-group {
  padding-top: 0.42rem;
  padding-bottom: 0.22rem;
  width: 90%;
  margin: 0 auto;
  /deep/ .van-button--plain {
    margin-top: 0.2rem;
  }
}
</style>
