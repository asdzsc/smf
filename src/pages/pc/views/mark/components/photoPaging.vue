<template>
  <div class="paging">
    <span @click="setPage(model.prePage)" class="pointer prev">＜</span>
    <span @click="setPage(model.nextPage)" class="pointer next">＞</span>
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
        navigatepageNums: [], //分页数字
      },
    };
  },
<<<<<<< HEAD
  mounted() {},
=======
  mounted() {
 
  },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  methods: {
    setPageInfo(pageInfo) {
      Object.assign(this.model, pageInfo);
    },
    setPage(pageNum) {
      this.$emit("setPage", pageNum);
    },
<<<<<<< HEAD
=======
   
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
};
</script>

<style lang="less" scoped>
.paging {
  text-align: right;
  margin-bottom: 25px;
  margin-top: 25px;
<<<<<<< HEAD
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 43%;
=======
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -295px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

  span {
    margin-left: 20px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    color: #333333;

    &.pointer {
      cursor: pointer;
      font-size: 60px;
      color: #00744c;
    }

    &.acvtion {
      text-decoration: underline;
      color: #0b9b0b;
    }
  }
  .prev {
    margin-left: -70px;
  }
  .next {
    margin-right: -60px;
  }
}
</style>
