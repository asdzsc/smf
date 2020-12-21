<template>
  <div class="searchIndex">
    <div class="rightMenu">
      <div class="createBtn">
        <img src="/img/pc/search_create.png" alt="" />
        <p @click="openUrl('/mark/create')">创建主页</p>
      </div>
      <div class="writeBtn">
        <img src="/img/pc/search_write.png" alt="" />
        <p>完善资料</p>
      </div>
    </div>
    <div class="banner">
      <img src="/img/pc/search_banner.png" alt="" />
    </div>
    <div class="checkBox">
      <img
        class="imgLeft"
        @click="handlePrev()"
        src="/img/pc/search_left.png"
        alt=""
      />
      <ul class="checkList">
        <li
          @click="handleCheck(item.id)"
          :class="{ checkListSelect: tab == item.id }"
          :key="item.id"
          v-for="(item, index) in checkList"
          v-if="index >= tabIndex && index <= tabIndex + 8"
        >
          {{ item.name }}
        </li>
      </ul>
      <img
        @click="handleNext()"
        class="imgRight"
        src="/img/pc/search_right.png"
        alt=""
      />
    </div>
    <div class="tabCon">
      <div class="searchCont" v-if="this.model.list.length != 0">
        <xhWall ref="xhWall" @handleMore="_memoryList"></xhWall>
      </div>
      <div v-else style="margin:100px 0;"><a-empty /></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { getMemoryColumnList, memoryList } from "@/pages/pc/api/mark.js";
import xhWall from "@/pages/pc/views/mark/grjn/components/xhWall.vue";
export default {
  components: {
    xhWall: xhWall,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
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
    };
  },
  watch: {
    topList: function(nv) {
      this.model.notId = nv.map((v) => {
        return v.id;
      });
    },
  },
  mounted() {
    this._memoryList();
    this._getMemoryColumnList();
    //纪念墙分类左右移动
    $(".imgLeft").click(function() {
      $(".checkList").animate({ left: "-60px" }, 300);
    });
    $(".imgRight").click(function() {
      $(".checkList").animate({ left: "60px" }, 300);
    });
  },
  methods: {
    handleCheck(id) {
      this.tab = id;
      this.model.columnId = id;
      this.model.current = 0;
      this.allList = [];
      this._memoryList();
    },
    // 获取查看纪念馆栏目列表
    _getMemoryColumnList() {
      this.loading = true;
      getMemoryColumnList(this.modelCol).then((res) => {
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          this.checkList = this.model.list;
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
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          this.allList = this.model.list;
          setTimeout(() => {
            this.$refs.xhWall.loadData(this.model);
            if (this.model.isLastPage) {
              this.$refs.xhWall.closeMore();
            }
          }, 200);
        }
      });
    },
    // 左移
    handlePrev() {
      if (this.tabIndex <= 0) {
        this.tabIndex = 0;
        return;
      } else {
        this.tabIndex = this.tabIndex - 1;
      }
    },
    // 右移
    handleNext() {
      if (this.tabIndex >= this.size - 9) {
        this.tabIndex = this.size - 9;
        return;
      } else {
        this.tabIndex = this.tabIndex + 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.searchIndex {
  .rightMenu {
    position: fixed;
    right: 0;
    top: 50%;
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
        margin-top: revert;
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
        margin-top: revert;
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
    }
  }
  .checkBox {
    width: 1250px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    img {
      width: 32px;
      height: 32px;
    }
    .checkList {
      padding-left: 15px;
      padding-right: 15px;
      width: 1170px;
      height: 60px;
      margin: 0 auto;
      padding-bottom: 5px;
      border-bottom: 4px solid #00744c;
      li {
        cursor: pointer;
        float: left;
        list-style: none;
        transition: all 0.2s ease-in-out;
        width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 20px;
        color: #00744c;
      }
      .checkListSelect {
        color: #f2f2f2;
        background-color: #00744c;
        box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.16);
      }
    }
  }
  .searchCont {
    width: 1250px;
    margin: 0 auto;
  }
  // .searchCont {
  //   width: 1250px;
  //   margin: 0 auto;
  //   .middleLine {
  //     height: 1px;
  //     background-color: #d6d6d6;
  //     margin-top: 100px;
  //   }
  //   .searchTop {
  //     .searchTitle {
  //       width: 130px;
  //       height: 40px;
  //       font-size: 40px;
  //       font-weight: bold;
  //       line-height: 70px;
  //       letter-spacing: 3px;
  //       color: #00744c;
  //       margin: 100px auto;
  //     }
  //     .topList {
  //       list-style: none;
  //       display: flex;
  //       li {
  //         width: 400px;
  //         height: 400px;
  //         position: relative;
  //         margin-right: 20px;
  //         img {
  //           width: 100%;
  //           height: 100%;
  //         }
  //         .topBox {
  //           display: none;
  //           position: absolute;
  //           bottom: 0;
  //           left: 0;
  //           width: 100%;
  //           height: 155px;
  //           background-color: #004930;
  //           opacity: 0.6;
  //           color: #fff;
  //           font-size: 26px;
  //           font-weight: bold;
  //           .name {
  //             height: 55px;
  //             display: flex;
  //             line-height: 55px;
  //             justify-content: space-around;
  //             border-bottom: 4px solid #eee;
  //           }
  //           .topBoxBtn {
  //             margin: 0 auto;
  //             margin-top: 20px;
  //             width: 220px;
  //             height: 60px;
  //             color: #004930;
  //             text-align: center;
  //             line-height: 60px;
  //             background-color: #ffffff;
  //             border-radius: 30px;
  //             cursor: pointer;
  //           }
  //         }
  //         &:last-child {
  //           margin-right: 0;
  //         }
  //         &:hover {
  //           .topBox {
  //             display: block;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   .searchBottom {
  //     margin-top: 75px;
  //     .moreBtn {
  //       width: 290px;
  //       height: 50px;
  //       text-align: center;
  //       line-height: 50px;
  //       background-color: #00744c;
  //       border-radius: 25px;
  //       font-size: 20px;
  //       color: #fff;
  //       margin: 0 auto;
  //       cursor: pointer;
  //       margin-top: 50px;
  //       margin-bottom: 200px;
  //     }
  //     .bottomList {
  //       list-style: none;
  //       display: flex;
  //       flex-wrap: wrap;
  //       li {
  //         width: 285px;
  //         height: 285px;
  //         position: relative;
  //         margin-right: 35px;
  //         margin-top: 25px;
  //         img {
  //           width: 100%;
  //           height: 100%;
  //         }
  //         .bottomBox {
  //           display: none;
  //           position: absolute;
  //           bottom: 0;
  //           left: 0;
  //           width: 100%;
  //           height: 95px;
  //           background-color: #0d0e08;
  //           opacity: 0.6;
  //           color: #fff;
  //           font-size: 14px;
  //           font-weight: bold;
  //           .name {
  //             width: 90%;
  //             margin: 0 auto;
  //             height: 40px;
  //             display: flex;
  //             line-height: 40px;
  //             padding-bottom: 5px;
  //             justify-content: space-around;
  //             border-bottom: 2px solid #eee;
  //             box-sizing: border-box;
  //           }
  //           .bottomBoxBtn {
  //             margin: 0 auto;
  //             margin-top: 12.5px;
  //             width: 110px;
  //             height: 30px;
  //             color: #004930;
  //             text-align: center;
  //             line-height: 30px;
  //             background-color: #ffffff;
  //             border-radius: 15px;
  //             cursor: pointer;
  //           }
  //         }
  //         &:nth-child(4n) {
  //           margin-right: 0;
  //         }
  //         &:hover {
  //           .bottomBox {
  //             display: block;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
