<template>
  <div class="paging">
    <span v-if="model.isFirstPage" @click="setPage(1)" class="pointer"
      >首页</span
    >
    <span v-else>首页</span>
    <span
      v-if="model.hasPreviousPage"
      @click="setPage(model.prePage)"
      class="pointer"
      >上一页</span
    >
    <span v-else>上一页</span>
    <span
      v-for="item in model.navigatepageNums"
      :key="item"
      :class="{ acvtion: model.pageNum === item }"
      class="pointer"
      @click="setPage(item)"
      >{{ item }}</span
    >
    <span
      v-if="model.hasNextPage"
      @click="setPage(model.nextPage)"
      class="pointer"
      >下一页</span
    >
    <span v-else>下一页</span>
    <span v-if="model.isLastPage" @click="setPage(model.pages)" class="pointer"
      >尾页</span
    >
    <span v-else>尾页</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        pageNum: 1,
        total: 0,
        pageSize: 10,
        pages: 1,
        hasPreviousPage: false, //是否有上一页
        hasNextPage: false, //是否有下一页
        isFirstPage: false, //是否有首页
        isLastPage: false, //是否有尾页
        navigatepageNums: [] //分页数字
      }
    };
  },
  mounted() {},
  methods: {
    setPageInfo(pageInfo) {
      Object.assign(this.model, pageInfo);
    },
    setPage(pageNum) {
      this.$emit("setPage", pageNum);
    }
  }
};
</script>

<style lang="less" scoped>
.paging {
  text-align: right;
  margin-bottom: 50px;

  span {
    margin-left: 20px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #333333;

    &.pointer {
      cursor: pointer;
    }

    &.acvtion {
      text-decoration: underline;
      color: #0b9b0b;
    }
  }
}
</style>
