<template>
  <div class="searchIndex">
    <div class="rightMenu">
      <div class="createBtn" @click="activeDiv = true">
        <img src="/img/pc/search_create.png" alt="" />
        <p>创建主页</p>
      </div>
      <div class="writeBtn" @click="openUrl('/member/grjnUser/')">
        <img src="/img/pc/search_write.png" alt="" />
        <p>完善资料</p>
      </div>
    </div>
    <div class="banner">
      <img v-if="showImg" src="/img/pc/banner7.png" alt="" />
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930"
          spin
        />
        <div class="imgBox" v-for="(item, index) in checkList" :key="item.id">
          <img
            v-show="swiperindex == index"
            :src="baseUrl + item.img"
            :onerror="defImg1"
            alt=""
          />
        </div>
      </a-spin>
    </div>
    <div class="carouselBox">
      <div class="swiper-wrap" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide swipera"
            @click="handleCheck(item.id, index)"
            :class="{ checkListSelect: tab == item.id }"
            :key="item.id"
            v-for="(item, index) in checkList"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="swiper-button-prev">
        <img class="imgLeft" src="/img/pc/search_left.png" alt="" />
      </div>
      <div class="swiper-button-next">
        <img class="imgRight" src="/img/pc/search_right.png" alt="" />
      </div>
    </div>
    <div class="tabCon">
      <div class="searchCont" v-if="this.model.list.length != 0">
        <xhWall ref="xhWall" @handleMore="_memoryList"></xhWall>
      </div>
      <div v-else style="margin: 100px 0">
        <a-empty />
      </div>
    </div>
    <!-- 激活码框 start -->
    <activeCode v-show="activeDiv"></activeCode>
    <!-- 激活码框 end -->
  </div>
</template>

<script>
import { getMemoryColumnList, memoryList } from "@/pages/pc/api/mark.js";
import xhWall from "@/pages/pc/views/mark/grjn/components/xhWall.vue";
export default {
  components: {
    xhWall: xhWall,
    activeCode: () =>
      import("@/pages/pc/views/mark/components/active-code.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      defImg1: 'this.src="/img/pc/banner7.png"',
      loading: false,
      allList: [], //所有数据
      checkList: [], //tab 数据
      topList: [], //前三个数据
      tab: null,
      tabIndex: 0,
      swiperOption: {
        //banner轮播
        slidesPerView: 8,
        direction: this.getDirection(),
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
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
        total: "",
      },
      activeDiv: false,
      swiperindex: null,
      showImg: true, //默认墓碑图片
    };
  },
  watch: {
    topList: function (nv) {
      this.model.notId = nv.map((v) => {
        return v.id;
      });
    },
    "$store.state.account.searchKey": function () {
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
    getDirection() {
      var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";
      return direction;
    },
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
        // console.log(this.model.notId);
        this.tab = id;
        this.checkList.mergerId = id;
        this.model.columnId = id;
        this.swiperindex = index;
        this.showImg = false;
        this.model.current = 0;
        this._memoryList();
      }
    },
    // 获取查看纪念馆栏目列表
    _getMemoryColumnList() {
      this.loading = true;
      getMemoryColumnList(this.modelCol).then((res) => {
        this.loading = true;
        if (res.code === 0) {
          this.checkList = res.data.list;
        }
      });
    },
    // 前端展示纪念馆列表(所有列表)
    _memoryList() {
      this.loading = true;
      this.model.current++;
      if (this.model.current === 1) {
        this.model.pageSize = 11;
      } else {
        this.model.pageSize = 8;
      }
      memoryList(this.model).then((res) => {
        // console.log(res);
        this.loading = false;
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
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
      }
    },
    // 搜索
    handleSearch() {
      this.model.list = [];
      this.model.notId = [];
      this.model.current = 0;
      this._memoryList();
    },
  },
};
</script>

<style lang="less" scoped>
.searchIndex {
  .search {
    width: 340px;
    height: 46px;
    margin: 20px auto;
    position: relative;

    .input {
      width: 100%;
      height: 100%;
      padding-top: 14px;
      padding-bottom: 14px;
      background-color: #ededed;
      border-radius: 4px;
      font-size: 18px;
      padding-left: 10px;
      padding-right: 48px;
    }

    img {
      position: absolute;
      right: -40px;
      top: 8px;
    }
  }

  .rightMenu {
    position: fixed;
    right: 0;
    top: 50%;
    z-index: 66;
    transform: translateY(-75%);
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;

    .createBtn {
      width: 178px;
      height: 60px;
      background-color: #00744c;
      border-radius: 30px 0px 0px 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;

      p {
        margin-top: 20px;
      }
    }

    .writeBtn {
      width: 178px;
      height: 60px;
      margin-top: 20px;
      background-color: #0bc182;
      border-radius: 30px 0px 0px 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;

      p {
        margin-top: 20px;
      }
    }
  }

  ul {
    padding: 0;
  }

  .banner {
    position: relative;

    img {
      width: 100%;
      height: 377px;
    }
  }
  .carouselBox {
    padding-left: 15px;
    padding-right: 15px;
    width: 1170px;
    height: 60px;
    margin: 0 auto;
    padding-bottom: 5px;
    border-bottom: 4px solid #00744c;
    position: relative;
    .swiper-slide {
      cursor: pointer;
      font-size: 20px;
    }
    /deep/ .swiper-wrapper {
      height: 60px;
      line-height: 60px;
      text-align: center;
      .checkListSelect {
        color: #f2f2f2;
        background-color: #00744c;
        box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.16);
      }
    }
    /deep/ .swiper-button-prev {
      left: -30px;
      right: auto;
    }
    /deep/ .swiper-button-next {
      right: -30px;
      left: auto;
    }
    /deep/ .swiper-button-prev:after,
    .swiper-container-rtl .swiper-button-next:after {
      content: "";
    }
    /deep/ .swiper-button-next:after,
    .swiper-container-rtl .swiper-button-prev:after {
      content: "";
    }
  }
  .searchCont {
    width: 1250px;
    margin: 0 auto;
  }
}
</style>
