<template>
  <div class="lijiyuyue">
    <div class="btn">立即预订</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.lijiyuyue {
  position: fixed;
  bottom: 0rem;
  z-index: 2;
  width: 100%;
  padding: 0.25rem 0rem;
  background-color: #ffffff;
  opacity: 0.8;

  .btn {
    opacity: 1;
    width: 4.46rem;
    height: 0.8rem;
    background-color: #00744c;
    border-radius: 0.4rem;
    margin: auto;
    font-size: 0.32rem;
    font-weight: 700;
    line-height: 0.8rem;
    letter-spacing: 4px;
    color: #ffffff;
    text-align: center;
  }
}
</style>
