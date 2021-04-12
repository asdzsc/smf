<template>
  <div class="orderList">
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">服务订单</div>
    <van-empty v-if="model.list.length === 0" description="暂无数据" />
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="goodsList">
<<<<<<< HEAD
        <div
          class="goodsItem"
          v-for="item in model.list"
          :key="item.id"
          @click.stop="openOrderInfo(item)"
        >
=======
        <div class="goodsItem" v-for="item in model.list" :key="item.id">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          <div class="goodsItemTitle">
            <p class="goodsOrderNum">订单号：{{ item.orderNum }}</p>
            <p class="goodsOrderTime">日期：{{ item.createDate }}</p>
            <p class="goodsOrderTime">
              服务时间：{{ parseTime(item.serveTime) }}
            </p>
          </div>
          <div
            class="goodsItemInfo"
            v-for="goodsItem in item.goodsList"
            :key="goodsItem.id"
          >
            <div class="divTitle">
              <div class="itemDiv">
                <img :src="baseUrl + goodsItem.cover" alt="" />
                <div class="serviceDiv">
                  <p class="serviceOrder" @click="openGoodsInfo(goodsItem)">
                    {{ goodsItem.title }}
                  </p>
                  <p class="orderName" v-if="goodsItem.specVal">
                    {{ goodsItem.specVal }}
                  </p>
                </div>
              </div>
              <div class="priceWrap">
                <p class="price">¥{{ goodsTotalPriceText(goodsItem) }}</p>
                <p class="num">x {{ goodsItem.goodsNum }}</p>
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div class="btnWrap" style="padding-top:.2rem;">
            <ul>
              <li v-if="item.isFeedback === '1'">
                <van-tag type="primary" @click.stop="showFeedback(item)"
                  >【查看服务反馈】</van-tag
                >
              </li>
              <li v-if="item.isComment === '1'">
                <van-tag type="primary" @click.stop="showComment(item)"
                  >【查看我的评价】</van-tag
                >
              </li>
              <li v-if="item.orderStatus === '5' && item.isComment === '0'">
                <van-tag type="primary" @click.stop="saveComment(item)"
                  >【点击评价】</van-tag
                >
              </li>
            </ul>
          </div>
          <div class="btnWrap">
            <ul>
              <li class="detail" @click.stop="openOrderInfo(item)">
                <van-tag type="primary">【查看详情】</van-tag>
              </li>
              <li>
                <van-tag
                  class="tag"
                  :color="orderStatusText(item.orderStatus).color"
                  :style="{
                    color: orderStatusText(item.orderStatus).fontColor,
                  }"
                >
                  {{ orderStatusText(item.orderStatus).text }}</van-tag
                >
=======
          <div class="btnWrap">
            <ul>
              <li class="detailBtn" @click="openOrderInfo(item)">查看详情</li>
              <li>
                <span :color="orderStatusText(item.orderStatus).color">
                  {{ orderStatusText(item.orderStatus).text }}
                </span>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              </li>
            </ul>
          </div>
        </div>
      </div>
    </van-list>
<<<<<<< HEAD
    <van-overlay v-show="showSaveComment">
      <div class="wrapper" @click="showSaveComment = false">
        <div class="block"></div>
      </div>
    </van-overlay>
    <!-- 评论 -->
    <orderComment
      v-if="showSaveComment"
      ref="orderComment"
      :shopOrder="shopOrder"
      @onClose="closeSaveComment"
    ></orderComment>
    <!-- 评论列表 -->
    <van-overlay v-show="showCommentList">
      <div class="wrapper" @click="showCommentList = false">
        <div class="block"></div>
      </div>
    </van-overlay>
    <orderCommentList
      v-if="showCommentList"
      ref="orderCommentList"
      :orderId="orderId"
      commentType="1"
      @onClose="closeOrderComment"
    ></orderCommentList>

    <van-overlay v-show="showFeedbackList">
      <div class="wrapper" @click="showFeedbackList = false">
        <div class="block"></div>
      </div>
    </van-overlay>

    <orderCommentList
      v-if="showFeedbackList"
      ref="orderFeedbackList"
      :orderId="orderId"
      commentType="2"
      @onClose="closeOrderFeedback"
    ></orderCommentList>
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <div class="cartIcon" @click="openUrl('/shop/cart')">
      <van-icon size="0.4rem" color="#fff" name="shopping-cart-o" />
    </div>
  </div>
</template>

<script>
import { orderList } from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
import * as shop from "@/comment/dictionary";
export default {
<<<<<<< HEAD
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
    orderComment: () =>
      import("@/pages/mobile/views/shop/order/components/order-comment.vue"),
    orderCommentList: () =>
      import(
        "@/pages/mobile/views/shop/order/components/order-comment-list.vue"
      ),
  },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      model: {
        current: "1",
        pageSize: "8",
        searchText: "",
        total: "0",
        list: [],
      },
      orderId: "",
      showCommentList: false,
      showFeedbackList: false,
      showSaveComment: false,
      shopOrder: null,
    };
  },
<<<<<<< HEAD

=======
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
    paging: () => import("@/pages/mobile/views/xwzx/components/paging.vue"),
  },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  mounted() {
    this._orderList();
  },
  methods: {
    onLoad() {
      this._orderList();
    },
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
    },
    search(searchText) {
      this.model.current = 1;
      this.model.searchText = searchText;
      this._orderList();
    },
    _orderList() {
<<<<<<< HEAD
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      var vm = this;
      vm.loading = true;
      orderList(this.model).then((res) => {
        vm.$toast.clear();
=======
      var vm = this;
      vm.loading = true;
      orderList(this.model).then((res) => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        vm.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          vm.model.list.push(...results);
          if (res.data.hasNextPage) {
<<<<<<< HEAD
            vm.model.current++;
=======
            setTimeout(() => {
              vm.model.current = ++vm.model.current;
            }, 500);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          } else {
            this.finished = true;
          }
        }
      });
    },
    //商品小计
    goodsTotalPrice(item) {
      if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {
        // console.log("goodsTotalPrice")
      } else {
        item.goodsNum = 1;
      }
      var showGoodsPrice = item.price * item.goodsNum;
      return showGoodsPrice;
    },
    goodsTotalPriceText(item) {
      var showGoodsPrice = this.goodsTotalPrice(item);
      return utils.formatMoney(showGoodsPrice);
    },
    formatMoney(money) {
      return utils.formatMoney(money);
    },
    parseTime(time) {
      return utils.parseTime(time, "{y}-{m}-{d}");
    },
    orderStatusText(status) {
      return shop.orderStatusText(status);
    },
    openOrderInfo(item) {
      this.$router.push({
        path: "/shop/order/orderInfo",
        query: {
          id: item.id,
        },
      });
    },
    showFeedback(item) {
<<<<<<< HEAD
      console.log(item);
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      this.orderId = item.id;
      this.showFeedbackList = true;
    },
    closeOrderFeedback(res) {
      this.$nextTick(() => {
        this.showFeedbackList = false;
      });
    },
    showComment(item) {
      this.orderId = item.id;
      this.showCommentList = true;
    },
    closeOrderComment(res) {
      this.$nextTick(() => {
        this.showCommentList = false;
      });
    },
    //保存评论
    saveComment(item) {
      this.shopOrder = item;
      this.showSaveComment = true;
    },
    closeSaveComment(res) {
      this.$nextTick(() => {
        this.showSaveComment = false;
      });
<<<<<<< HEAD
      if (res.code === 0) {
        //刷新
        // this._orderList();
        this.$router.go(0);
      }
      try {
=======
      try {
        if (res.code === 0) {
          //刷新
          this._orderList();
        }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      } catch {}
    },
    //商品详情
    openGoodsInfo(goodsInfo) {
      if (goodsInfo.goodsId) {
        this.$router.push({
          path: "/shop/goodsInfo",
          query: {
            id: goodsInfo.goodsId,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.orderList {
  background: #fff;

  .title {
    padding: 4%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 0.32rem;
  }

  .goodsList {
    padding: 0 4%;

    .goodsItem {
      display: flex;
      justify-content: space-between;
      border-radius: 0.1rem;
      border: solid 2px #dcdcdc;
      flex-direction: column;
      padding: 4%;
      box-sizing: border-box;
      margin-top: 0.3rem;

      .goodsItemTitle {
        border-bottom: solid 1px #dcdcdc;
        padding-bottom: 0.2rem;
        font-size: 0.26rem;
        color: #999999;
        line-height: 0.35rem;
        width: 100%;
      }

      .goodsItemInfo {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        margin-top: 0.3rem;
        border-bottom: 1px solid #dcdcdc;
        padding-bottom: 0.3rem;

        .divTitle {
          display: flex;
          justify-content: space-between;

          .itemDiv {
            display: flex;

            img {
              width: 0.8rem;
              height: 0.8rem;
            }

            .serviceDiv {
              display: flex;
              flex-direction: column;
              line-height: 0.3rem;
              justify-content: space-around;
              margin-left: 0.2rem;

              .serviceOrder {
                font-size: 0.32rem;
                color: #333333;
              }

              .orderName {
                font-size: 0.26rem;
                color: #999999;
              }
            }
          }
        }

        .divInfo {
          display: flex;
          margin-top: 0.2rem;

          p {
            margin-right: 0.2rem;
          }
        }

        .priceWrap {
          font-size: 0.22rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-around;

          .price {
            color: #333333;
          }

          .num {
            color: #999999;
          }
        }
      }

      .btnWrap {
        ul {
          display: flex;
          flex-direction: row-reverse;
<<<<<<< HEAD
          // margin-top: 0.3rem;

          li {
            text-align: center;
            padding: 5px 10px;
            box-sizing: border-box;
            font-size: 0.24rem;
=======
          margin-top: 0.3rem;

          li {
            width: 1.4rem;
            height: 0.5rem;
            display: flex;
            font-size: 0.24rem;
            align-items: center;
            justify-content: center;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            margin-right: 0.1rem;

            span {
              color: rgba(0, 0, 0, 0.65);
              font-size: 0.24rem;
              display: inline-block;
              width: 100%;
<<<<<<< HEAD
              line-height: 0.5rem;
              text-align: center;
              background: #d9d9d9d9;
              // border: solid 1px #004930;
            }
            .tag {
              color: #000;
              opacity: 0.85;
            }
          }
          .detail {
            span {
              color: #004930;
              background: none;
            }
          }
          .detailBtn {
            border: solid 1px #004930;
            color: #004930;
          }
=======
              height: 100%;
              line-height: 0.5rem;
              text-align: center;
              background: #fafafa;
              border: solid 1px #004930;
            }
          }

          .assignBtn {
            background-color: #f68b19;
            color: #ffffff;
          }

          .detailBtn,
          .assessBtn {
            border: solid 1px #004930;
            color: #004930;
          }

          .completeBtn {
            background-color: #43c643;
            color: #ffffff;
          }

          .payBtn {
            background-color: #43bec6;
            color: #ffffff;
          }

          .closeBtn {
            color: #666666;
            background-color: #e2e2e2;
          }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      }
    }
  }

  .totalWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #ffffff;
    border-bottom: 5px solid #eee;

    .btnCont {
      font-size: 0.26rem;
      height: 100%;
      color: #999999;
    }
  }

  .cartIcon {
<<<<<<< HEAD
    position: fixed;
    bottom: 2.5rem;
=======
    margin-top: -0.5rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    width: 0.88rem;
    height: 0.64rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #303030;
    border-radius: 0px 0.1rem 0.1rem 0px;
  }
}
</style>
