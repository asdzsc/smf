<template>
  <div>
    <div v-for="(item, index) in model" :key="index">
      <van-field
        rows="3"
        autosize
        label="祭奠留言"
        type="textarea"
        v-model="item.cont"
        placeholder="请输入留言内容"
      />
      <div
        v-if="model.length > 1"
        style="padding-right: 20px; text-align: right; padding-top: 10px"
      >
        <van-button
          @click="delItem(item.id)"
          type="danger"
          size="mini"
          icon="delete-o"
          >删除</van-button
        >
      </div>
    </div>
    <div class="btn" @click="handleAdd">再写一条</div>
  </div>
</template>

<script>
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: [],
    };
  },
  mounted() {
    this.handleAdd();
  },
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
        id: utils.getId(),
        memoryId: "",
        memoryName: "",
        msgType: "1",
        title: "",
        cont: "",
        cover: "",
      });
    },
    delItem(id) {
      this.$dialog
        .confirm({
          title: "确认删除吗?",
          message: "",
        })
        .then(() => {
          this.model = this.model.filter((x) => {
            return x.id !== id;
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-field {
  margin: 0 auto;
  margin-top: 0.2rem;
  line-height: 0.5rem;
  padding: 0.1rem 0.2rem;
  .van-cell__title {
    width: 1.5rem;
  }
}

.btn {
  font-size: 0.3rem;
  margin: 0.2rem auto;
  line-height: 0.7rem;
  color: #00744c;
  text-align: center;
}
</style>
