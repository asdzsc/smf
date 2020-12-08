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
  .contTitle {
    height: .41rem;
    margin: 0.74rem 0 .25rem .4rem; 
    font-family: SourceHanSansCN-Bold;
    font-size: .32rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;
    padding-left: 0.16rem;
    border-left: 8px solid #004930;
  }
}
</style>
