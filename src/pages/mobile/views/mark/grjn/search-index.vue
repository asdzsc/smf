<template>
  <div class="searchIndex">
    <div class="banner">
<<<<<<< HEAD
      <img v-if="showImg" src="/img/mobile/mark/banner5.png" alt="" />
      <div class="imgBox" v-for="(item, index) in checkList" :key="item.id">
        <img
          v-show="swiperindex == index"
          :src="baseUrl + item.phoneImg"
          :onerror="defImg1"
          alt=""
        />
      </div>
=======
      <img src="/img/mobile/mark/banner5.png" alt="" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
        <div class="searchCont" v-if="this.model.list.length != 0">
          <xhWall ref="xhWall" @handleMore="_memoryList"></xhWall>
        </div>
        <div v-else>
          <van-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <div class="bottomMenu">
      <div class="createBtn" @click="activeDiv = true">
        <img src="/img/pc/search_create.png" alt="" />
        创建主页
      </div>
      <div class="writeBtn">
        <img src="/img/pc/search_write.png" alt="" />
        完善资料
      </div>
    </div>
    <!-- 激活码框 start -->
    <activeCode v-show="activeDiv"></activeCode>
    <!-- 激活码框 end -->
=======
        <div class="searchCont">
          <xhWall></xhWall>
        </div>
      </div>
    </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  </div>
</template>

<script>
import { getMemoryColumnList, memoryList } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    xhWall: () =>
      import("@/pages/mobile/views/mark/grjn/components/xhWall.vue"),
<<<<<<< HEAD
    activeCode: () =>
      import("@/pages/mobile/views/mark/create/components/active-code.vue"),
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      defImg1: 'this.src="/img/mobile/mark/banner5.png"',
      loading: false,
<<<<<<< HEAD
      allList: [], //所有数据
      checkList: [], //tab 数据
      topList: [], //前三个数据
      tab: null,
=======
      show: false,
      tag: true,
      allList: [],
      checkList: [],
      topList: [],
      tab: null,
      tabIndex: 0,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
        total: "",
      },
      swiperindex: null,
      showImg: true, //默认墓碑图片
      activeDiv: false,
    };
  },
  watch: {
    topList: function(nv) {
      this.model.notId = nv.map((v) => {
        return v.id;
      });
    },
    "$store.state.account.searchKey": function() {
      this.model.searchText = this.$store.state.account.searchKey;
      this.handleSearch();
    },
  },
  mounted() {
    if (this.$store.state.account.searchKey) {
      this.model.searchText = this.$store.state.account.searchKey;
    }
    this._memoryList();
    this._getMemoryColumnList();
  },
  methods: {
    handleHide() {
      this.activeDiv = false;
    },
    // tab 切换
    handleCheck(id, index) {
      this.model.notId = [];
      if (this.tab == id) {
        this.tab = -1;
        this.checkList.mergerId = "";
        this.model.columnId = "";
        this.swiperindex = null;
        this.showImg = true;
        this.handleSearch();
      } else {
        this.tab = id;
        this.checkList.mergerId = id;
        this.model.columnId = id;
        this.swiperindex = index;
        this.showImg = false;
        this.model.current = 0;
        this._memoryList();
      }
    },
    // 搜索
    handleSearch() {
      this.model.list = [];
      this.model.notId = [];
      this.model.current = 0;
      this._memoryList();
    },
    // 获取查看纪念馆栏目列表
    _getMemoryColumnList() {
      getMemoryColumnList(this.modelCol).then((res) => {
        if (res.code === 0) {
          this.checkList = res.data.list;
        }
      });
    },
    // 前端展示纪念馆列表(所有列表)
    _memoryList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.model.current++;
      if (this.model.current === 1) {
        this.model.pageSize = 11;
      } else {
        this.model.pageSize = 8;
      }
      memoryList(this.model).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          this.allList = this.model.list;
          setTimeout(() => {
            this.$refs.xhWall.showMore();
            this.$refs.xhWall.loadData(this.model);
            if (this.model.isLastPage) {
              this.$refs.xhWall.closeMore();
            }
          }, 200);
        }
      });
    },
=======
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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
};
</script>

<style lang="less" scoped>
.searchIndex {
<<<<<<< HEAD
  /deep/ .van-loading {
    left: 50%;
    margin-left: -15px;
    margin-top: 100px;
    padding-bottom: 100px;
  }

  .bottomMenu {
    display: flex;
    padding: 0 0.4rem;
    margin: 0.5rem 0;
    justify-content: space-between;

    .createBtn {
      width: 3rem;
      height: 0.72rem;
      background-color: #00744c;
      border-radius: 0.36rem;
      line-height: 0.72rem;
      text-align: center;
      color: #fff;
      img {
        display: inline-block;
        padding-right: 0.2rem;
      }
    }

    .writeBtn {
      width: 3rem;
      height: 0.72rem;
      background-color: #0bc182;
      border-radius: 0.36rem;
      line-height: 0.72rem;
      text-align: center;
      color: #fff;
      img {
        display: inline-block;
        padding-right: 0.2rem;
      }
    }
  }

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  .banner {
    img {
      width: 100%;
    }
  }
<<<<<<< HEAD

  .info {
    padding: 0 0.4rem;

=======
  .info {
    padding: 0 0.4rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .checkList {
      display: flex;
      white-space: nowrap;
      overflow-x: auto;
<<<<<<< HEAD

      li {
        font-size: 0.3rem;
=======
      li {
        font-size: 0.28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        line-height: 0.6rem;
        letter-spacing: 0.03rem;
        color: #2e2e2e;
        margin-right: 0.2rem;
      }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .checkListSelect {
        color: #00744c;
        border-bottom: 0.05rem solid #00744c;
      }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
