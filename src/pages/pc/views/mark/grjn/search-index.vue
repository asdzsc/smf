<template>
  <div class="searchIndex">
    <div class="rightMenu">
      <div class="createBtn" @click="showDiv = true">
        <img src="/img/pc/search_create.png" alt="" />
        <p>创建主页</p>
      </div>
      <div class="writeBtn">
        <img src="/img/pc/search_write.png" alt="" />
        <p>完善资料</p>
      </div>
    </div>
    <div class="banner">
      <img v-if="showImg" src="/img/pc/banner7.png" alt="" />
      <div class="imgBox" v-for="(item, index) in checkList" :key="item.id">
        <img
          v-show="swiperindex == index"
          :src="baseUrl + item.img"
          :onerror="defImg1"
          alt=""
        />
      </div>
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
          @click="handleCheck(item.id, index)"
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
    <div class="activeDiv" v-if="showDiv">
      <img src="/img/pc/syjhm.jpg" alt="" />
      <p class="activeTitle">创建主页</p>
      <p>请输入我们给您提供的激活码，即可获得该追思主页使用权：</p>
      <input
        type="text"
        class="input"
        v-model="divCode"
        placeholder="输入激活码"
      />
      <div class="popup-btn">
        <input
          type="button"
          @click="showDiv = false"
          class="back-btn"
          value="取消"
        />
        <input
          type="button"
          @click="handleCreate"
          class="submit-btn"
          value="继续"
        />
      </div>
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
      defImg1: 'this.src="/img/pc/banner7.png"',
      loading: false,
      show: false,
      tag: true,
      showDiv: false, //激活码框
      allList: [], //所有数据
      checkList: [], //tab 数据
      topList: [], //前三个数据
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
        total: "",
      },
      swiperindex: null,
      showImg: true, //默认墓碑图片
      divCode: "", //激活码
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
    // tab 切换
    handleCheck(id, index) {
      this.tab = id;
      this.checkList.mergerId = id;
      this.model.columnId = id;
      this.model.current = 0;
      // this.allList = [];
      this.showImg = false;
      this.swiperindex = index;
      this._memoryList();
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
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
      }
    },
    //创建模板
    handleCreate() {
      // alert("")
      if (this.divCode != "") {
        // this.$router.push({
        //   name: "/mark/create",
        // });
        this.$message.success("验证成功！");
      } else {
        this.$message.error("激活码不能为空！");
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
      height: 377px;
    }
  }
  .activeDiv {
    background-color: #fff;
    width: 600px;
    height: 400px;
    position: fixed;
    left: 30%;
    right: 30%;
    top: 15%;
    border: 2px;
    border-radius: 10px;
    border-color: #22be6d;
    border-style: solid;
    text-align: center;
    z-index: 99;
    img {
      margin: 30px 0;
    }
    .activeTitle {
      font-size: 20px;
      font-weight: bold;
    }
    .input {
      border-radius: 8px;
      width: 80%;
      margin-left: 10%;
      margin-top: 30px;
      height: 35px;
      background-color: #fff;
    }
    .popup-btn {
      input {
        width: 120px;
        height: 35px;
        border-radius: 8px;
        font-size: 18px;
        border-style: solid;
        margin-top: 30px;
      }
      .back-btn {
        background-color: #fff;
        color: #22be6d;
        border-color: #22be6d;
        margin-left: 70px;
      }
      .submit-btn {
        background-color: #22be6d;
        color: #fff;
        border: none;
        margin-left: 30px;
      }
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
}
</style>
