<template>
  <div class="searchIndex">
    <div class="banner">
      <img src="/img/pc/search_banner.png" alt="" />
      <div class="checkBox">
        <img class="imgLeft" @click="" src="/img/pc/search_left.png" alt="" />
        <ul class="checkList">
          <li>辛亥英烈</li>
          <li>抗战英雄</li>
          <li>红色先烈</li>
          <li>共和国卫士</li>
          <li>爱心天使</li>
          <li>文学巨匠</li>
          <li>艺术大师</li>
          <li>白衣天使</li>
          <li>辛勤园丁</li>
          <li>钢铁英雄</li>
          <li>不凡人生</li>
        </ul>
        <img class="imgRight" src="/img/pc/search_right.png" alt="" />
      </div>
    </div>
    <div class="tabCon">
      <!-- 辛亥英烈 -->
      <div class="searchCont">
        <div class="searchTop">
          <div class="searchTitle">
            纪念墙
          </div>
          <ul class="topList">
            <li>
              <img src="/img/pc/search_01.png" alt="" />
              <div class="topBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="topBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_02.png" alt="" />
              <div class="topBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="topBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_03.png" alt="" />
              <div class="topBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="topBoxBtn">纪念他</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="middleLine"></div>
        <div class="searchBottom">
          <ul class="bottomList">
            <li>
              <img src="/img/pc/search_04.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_05.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_06.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_07.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_04.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_05.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_06.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
            <li>
              <img src="/img/pc/search_07.png" alt="" />
              <div class="bottomBox">
                <div class="name">
                  <p>刘一曙</p>
                  <p>1213次纪念</p>
                </div>
                <div class="bottomBoxBtn">纪念他</div>
              </div>
            </li>
          </ul>
          <div class="moreBtn">
            查看更多
          </div>
        </div>
      </div>
      <!-- 抗战英雄 -->
      <!-- 红色先烈 -->
      <!-- 共和国卫士 -->
      <!-- 爱心天使 -->
      <!-- 文学巨匠 -->
      <!-- 艺术大师 -->
      <!-- 白衣天使 -->
      <!-- 辛勤园丁 -->
      <!-- 钢铁英雄 -->
      <!-- 不凡人生 -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { getUserMemoryList } from "@/pages/pc/api/mark.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      checkList: [],
      searchList: [],
      model: {
        current: 1,
        pageSize: 15,
        searchText: "",
        status: "",
        columnId: "",
      },
    };
  },
  mounted() {
    this._getUserMemoryList();
    //纪念墙分类选中背景
    $(".checkList li").click(function() {
      $(this)
        .addClass("checkListSelect")
        .siblings()
        .removeClass("checkListSelect");
    });
    //纪念墙分类左右移动
    $(".imgLeft").click(function() {
      $(".checkList").animate({ left: "-60px" }, 300);
    });
    $(".imgRight").click(function() {
      $(".checkList").animate({ left: "60px" }, 300);
    });
  },
  methods: {
    _getUserMemoryList() {
      this.loading = true;
      const token = localStorage.getItem("wxtoken");
      getUserMemoryList(this.model).then((res) => {
        this.loading = false;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.searchIndex {
  ul {
    padding: 0;
  }
  .banner {
    position: relative;
    img {
      width: 100%;
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
  }

  .searchCont {
    width: 1250px;
    margin: 0 auto;
    .middleLine {
      height: 1px;
      background-color: #d6d6d6;
      margin-top: 100px;
    }
    .searchTop {
      .searchTitle {
        width: 130px;
        height: 40px;
        font-size: 40px;
        font-weight: bold;
        line-height: 70px;
        letter-spacing: 3px;
        color: #00744c;
        margin: 100px auto;
      }
      .topList {
        list-style: none;
        display: flex;
        li {
          width: 400px;
          height: 400px;
          position: relative;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
          .topBox {
            display: none;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 155px;
            background-color: #004930;
            opacity: 0.6;
            color: #fff;
            font-size: 26px;
            font-weight: bold;
            .name {
              height: 55px;
              display: flex;
              line-height: 55px;
              justify-content: space-around;
              border-bottom: 4px solid #eee;
            }
            .topBoxBtn {
              margin: 0 auto;
              margin-top: 20px;
              width: 220px;
              height: 60px;
              color: #004930;
              text-align: center;
              line-height: 60px;
              background-color: #ffffff;
              border-radius: 30px;
              cursor: pointer;
            }
          }
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            .topBox {
              display: block;
            }
          }
        }
      }
    }
    .searchBottom {
      margin-top: 75px;
      .moreBtn {
        width: 290px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #00744c;
        border-radius: 25px;
        font-size: 20px;
        color: #fff;
        margin: 0 auto;
        cursor: pointer;
        margin-top: 50px;
        margin-bottom: 200px;
      }
      .bottomList {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 285px;
          height: 285px;
          position: relative;
          margin-right: 35px;
          margin-top: 25px;
          img {
            width: 100%;
            height: 100%;
          }
          .bottomBox {
            display: none;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 95px;
            background-color: #0d0e08;
            opacity: 0.6;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            .name {
              width: 90%;
              margin: 0 auto;
              height: 40px;
              display: flex;
              line-height: 40px;
              padding-bottom: 5px;
              justify-content: space-around;
              border-bottom: 2px solid #eee;
              box-sizing: border-box;
            }
            .bottomBoxBtn {
              margin: 0 auto;
              margin-top: 12.5px;
              width: 110px;
              height: 30px;
              color: #004930;
              text-align: center;
              line-height: 30px;
              background-color: #ffffff;
              border-radius: 15px;
              cursor: pointer;
            }
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
          &:hover {
            .bottomBox {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
