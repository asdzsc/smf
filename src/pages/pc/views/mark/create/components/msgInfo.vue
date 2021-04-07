<template>
  <div>
    <a-form-model :model="{ model }">
      <div v-for="(item, index) in model" :key="index">
        <a-form-model-item label="祭奠留言">
          <a-textarea
            v-model="item.cont"
            placeholder="请输入留言内容"
            :rows="5"
          />
        </a-form-model-item>
      </div>
    </a-form-model>
    <div class="btn" @click="handleAdd">再写一条</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: [
        {
          id: "",
          memoryId: "",
          memoryName: "",
          msgType: "1",
          title: "",
          cont: "",
          cover: "",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getfileMsg() {
      if (this.model[0].cont == "") {
        return;
      } else {
        return this.model;
      }
    },
    handleAdd() {
      this.model.push({
        id: "",
        memoryId: "",
        memoryName: "",
        msgType: "1",
        title: "",
        cont: "",
        cover: "",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.btn {
  margin: 0 auto;
  width: 100px;
  height: 70px;
  font-size: 16px;
  line-height: 70px;
  color: #00744c;
  cursor: pointer;
}
</style>
