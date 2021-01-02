<template>
  <div class="lyInfo">
    <div class="cont">
      <div class="selfInfo">
        <span>主题</span>
        <textarea
          v-model="msgList.title"
          placeholder="请输入留言主题"
          style="height:30px;"
        ></textarea>
      </div>
      <div class="selfInfo">
        <span>祭奠留言</span>
        <textarea
          v-model="msgList.cont"
          placeholder="请输入祭奠留言"
        ></textarea>
      </div>
    </div>
    <div @click="handleAdd" class="btn">再写一条</div>
  </div>
</template>

<script>
export default {
  props: {
    msgList: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    console.log(this.msgList);
  },
  methods: {
    // 添加乘机人
    handleAdd() {
      this.users.push({ username: "", id: "" });
    },
  },
};
</script>

<style lang="less" scoped>
.lyInfo {
  .selfInfo {
    display: flex;
    margin-top: 20px;
    span {
      width: 70px;
      text-align: right;
      padding-right: 10px;
    }
    textarea {
      width: 93%;
      height: 200px;
    }
  }
  .btn {
    width: 80px;
    height: 20px;
    margin: 20px auto;
    font-size: 16px;
    color: #00744c;
    cursor: pointer;
  }
}
</style>
