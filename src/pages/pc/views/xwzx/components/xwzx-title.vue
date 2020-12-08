<template>
  <div class="contHead">
    <div class="contTitle">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.contHead {
  border-bottom: 2px solid #d6d6d6;
  margin-bottom: 80px;
  position: relative;
  height: 60px;
  margin-top: 60px;

  .contTitle {
    position: absolute;
    top: 0px;
    left: calc(50% - 65px);
    width: 130px;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #004930;
    margin: auto;
    padding-bottom: 7px;
    border-bottom: 5px solid #004930;
  }
}
</style>
