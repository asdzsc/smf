<template>
  <div class="head">
    <div class="tabs">
      <div
        @click="openUrl('/xwzx/ggzx')"
        class="tabItem"
        :class="{ actvit: this.name === '公告中心' }"
      >
        公告中心
      </div>
      <div
        @click="openUrl('/xwzx/xwdt')"
        class="tabItem"
        :class="{ actvit: this.name === '新闻动态' }"
      >
        新闻动态
      </div>
      <div
        @click="openUrl('/xwzx/zbgg')"
        class="tabItem"
        :class="{ actvit: this.name === '招标广告' }"
      >
        招标广告
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
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
  methods: {
    ckAtvit(_name) {
      return this.name === _name;
    },
    openUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 6px 14px 1px rgba(0, 0, 0, 0.1);
  .tabs {
    width: 552px;
    margin: auto;
    display: flex;
    .tabItem {
      width: 144px;
      margin-right: 60px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #666666;
      text-align: center;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
      &.actvit {
        color: #004930;
        border-bottom: 6px solid #004930;
      }
    }
  }
}
</style>
