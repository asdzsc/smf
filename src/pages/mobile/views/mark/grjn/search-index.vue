<template>
  <div class="searchIndex">
    <div class="banner">
      <img src="/img/mobile/mark/banner5.png" alt="" />
    </div>
    <div class="info">
      <ul class="checkList">
        <li
          @click="handleCheck(item.id, index)"
          :class="{ checkListSelect: tab == item.id }"
          :key="item.id"
          v-for="(item, index) in checkList"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="tabCont">
        <div class="searchCont">
          <xhWall></xhWall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMemoryColumnList, memoryList } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    xhWall: () =>
      import("@/pages/mobile/views/mark/grjn/components/xhWall.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      defImg1: 'this.src="/img/mobile/mark/banner5.png"',
      loading: false,
      show: false,
      tag: true,
      allList: [],
      checkList: [],
      topList: [],
      tab: null,
      tabIndex: 0,
      modelCol: {
        status: "0",
      },
      model: {
        current: 0,
        pageSize: 11,
        searchText: "",
        status: "0",
        columnId: "",
        list: [],
        notId: [],
      },
      swiperindex: null,
      showImg: true,
    };
  },
  mounted() {
    this._getMemoryColumnList();
  },
  methods: {
    handleCheck(id, index) {
      this.tab = id;
      // this.checkList.mergerId = id;
      // this.model.columnId = id;
      // this.model.current = 0;
      // this.showImg = false;
      // this.swiperindex = index;
      // this._memoryList();
    },
    // 获取查看纪念馆栏目列表
    _getMemoryColumnList() {
      this.loading = true;
      getMemoryColumnList(this.modelCol).then((res) => {
        // console.log(res);
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          this.checkList = this.model.list;
        }
      });
    },
    // 前端展示纪念馆列表(所有列表)
    // _memoryList() {
    //   this.loading = true;
    //   this.model.current++;
    //   if (this.model.current === 1) {
    //     this.model.pageSize = 11;
    //   } else {
    //     this.model.pageSize = 8;
    //   }
    //   memoryList(this.model).then((res) => {
    //     this.loading = false;
    //     if (res.code === 0) {
    //       Object.assign(this.model, res.data);
    //       this.allList = this.model.list;
    //       setTimeout(() => {
    //         this.$refs.xhWall.loadData(this.model);
    //         if (this.model.isLastPage) {
    //           this.$refs.xhWall.closeMore();
    //         }
    //       }, 200);
    //     }
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.searchIndex {
  .banner {
    img {
      width: 100%;
    }
  }
  .info {
    padding: 0 0.4rem;
    .checkList {
      display: flex;
      white-space: nowrap;
      overflow-x: auto;
      li {
        font-size: 0.28rem;
        line-height: 0.6rem;
        letter-spacing: 0.03rem;
        color: #2e2e2e;
        margin-right: 0.2rem;
      }
      .checkListSelect {
        color: #00744c;
        border-bottom: 0.05rem solid #00744c;
      }
      &::-webkit-scrollbar-track {
        height: 0px;
        background-color: transparent;
      }

      &::-webkit-scrollbar {
        height: 0px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        height: 0px;
        background-color: transparent;
      }
    }
  }
}
</style>
