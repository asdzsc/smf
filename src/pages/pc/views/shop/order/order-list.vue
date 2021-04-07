<template>
  <div class="member">
    <memberHead ref="memberHead" @search="search"></memberHead>

    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="title">服务订单</div>

        <a-row type="flex" class="cardTitle">
          <a-col flex="auto"> 订单详情 </a-col>
          <a-col flex="110px"> 数量 </a-col>
          <a-col flex="110px"> 金额 </a-col>
          <a-col flex="110px"> 状态 </a-col>
          <a-col flex="110px"> 操作 </a-col>
        </a-row>

        <a-spin
          size="large"
          tip="加载中..."
          :spinning="loading"
          style="width: 100%"
        >
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 30px; color: #004930; text-align: center"
            spin
          />

          <div v-for="item in model.list" :key="item.id" class="card">
            <a-row type="flex" class="cartHead">
              <a-col class="orderNum">
                <span style="color: #aaa">订单：</span>{{ item.orderNum }}
              </a-col>
              <a-col style="padding-left: 30px">
                日期：{{ item.createDate }}
              </a-col>
              <a-col style="padding-left: 30px">
                服务时间：{{ parseTime(item.serveTime) }}
              </a-col>
            </a-row>

            <table style="width: 100%; border-collapse: collapse">
              <tr>
                <td style="width: 800px">
                  <a-row
                    v-for="goodsItem in item.goodsList"
                    :key="goodsItem.id"
                    type="flex"
                    class="cardBody"
                  >
                    <a-col flex="100px" class="orderGoodsImg">
                      <img
                        class="goodsImg"
                        :src="baseUrl + goodsItem.cover"
                        :onerror="defImg"
                      />
                    </a-col>
                    <a-col flex="auto" class="orderGoodsTitle">
                      <div
                        @click="openGoodsInfo(goodsItem)"
                        style="color: #2483d5; cursor: pointer"
                      >
                        {{ goodsItem.title }}
                      </div>
                      <div v-if="goodsItem.specVal" class="specVal">
                        {{ goodsItem.specVal }}
                      </div>
                    </a-col>
                    <a-col flex="110px" class="orderGoodsNum">
                      x {{ goodsItem.goodsNum }}
                    </a-col>
                    <a-col flex="110px" class="orderGoodsPrice">
                      {{ goodsTotalPriceText(goodsItem) }}
                    </a-col>
                  </a-row>
                </td>
                <td class="status" style="width: 110px">
                  <a-tag
                    :style="{
                      width: '80px',
                      color: orderStatusText(item.orderStatus).fontColor,
                    }"
                    :color="orderStatusText(item.orderStatus).color"
                  >
                    {{ orderStatusText(item.orderStatus).text }}
                  </a-tag>
                </td>
                <td class="operation" style="width: 110px">
                  <div @click="openOrderInfo(item)" class="showInfo">
                    【查看详情】
                  </div>
                  <div
                    v-if="item.isFeedback === '1'"
                    @click="showFeedback(item)"
                    class="comment"
                  >
                    【查看服务反馈】
                  </div>
                  <div
                    v-if="item.isComment === '1'"
                    @click="showComment(item)"
                    class="comment"
                  >
                    【查看我的评价】
                  </div>
                  <div
                    v-if="item.orderStatus === '5' && item.isComment === '0'"
                    @click="saveComment(item)"
                    class="comment"
                  >
                    【点击评价】
                  </div>
                </td>
              </tr>
            </table>

            <a-row type="flex" justify="end" class="totalMoney">
              <a-col style="padding-right: 20px">
                付款方式：<span>{{ item.payType }}</span>
              </a-col>
              <a-col>
                实付款：<span class="money">{{
                  formatMoney(item.payment)
                }}</span>
              </a-col>
            </a-row>
          </div>
        </a-spin>
        <a-empty v-if="model.list.length === 0" />
        <div style="padding-top: 30px"></div>
        <paging ref="paging" @setPage="setPage"></paging>
      </div>
    </div>

    <myserve></myserve>

    <!-- 评论信息 -->
    <orderCommentList
      v-if="showCommentList"
      ref="orderCommentList"
      :orderId="orderId"
      commentType="1"
      @onClose="closeOrderComment"
    ></orderCommentList>
    <!-- 反馈信息 -->
    <orderCommentList
      v-if="showFeedbackList"
      ref="orderFeedbackList"
      :orderId="orderId"
      commentType="2"
      @onClose="closeOrderFeedback"
    ></orderCommentList>
    <!-- 反馈信息 -->
    <orderComment
      v-if="showSaveComment"
      ref="orderComment"
      :shopOrder="shopOrder"
      @onClose="closeSaveComment"
    ></orderComment>
  </div>
</template>

<script>
import { orderList } from "@/pages/pc/api/shop";
import * as utils from "@/pages/pc/libs/utils";
import * as shop from "@/comment/dictionary";
export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
    orderCommentList: () =>
      import("@/pages/pc/views/shop/order/components/order-comment-list.vue"),
    orderComment: () =>
      import("@/pages/pc/views/shop/order/components/order-comment.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
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
  mounted() {
    this._orderList();
  },
  methods: {
    search(searchText) {
      this.model.current = 1;
      this.model.searchText = searchText;
      this._orderList();
    },
    _orderList() {
      var vm = this;
      this.loading = true;
      orderList(this.model).then((res) => {
        console.log(res);
        vm.loading = false;
        if (res.code === 0) {
          Object.assign(vm.model, res.data);
          setTimeout(() => {
            vm.$refs.paging.setPageInfo(vm.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._orderList();
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
      console.log(item);
      this.$router.push({
        path: "/shop/order/orderInfo",
        query: {
          id: item.id,
        },
      });
    },
    showFeedback(item) {
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
      try {
        if (res.code === 0) {
          //刷新
          this._orderList();
        }
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
.member {
  background-color: #f5f5f5;

  .cont {
    width: 1200px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 50px;
    display: flex;
    min-height: 600px;
    background-color: #ffffff;

    .line {
      border: solid 2px #f2f2f2;
    }

    .left {
      width: 125px;
    }

    .right {
      flex: auto;
      padding: 20px;
      padding-bottom: 80px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }

      .cardTitle {
        height: 40px;
        background-color: #f5f5f5;
        font-size: 12px;
        line-height: 40px;
        color: #333333;
        text-align: center;
        margin-bottom: 20px;
      }

      .card {
        border: solid 1px #ebebeb;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0px;
        }

        .cartHead {
          height: 30px;
          line-height: 30px;
          background-color: #f5f5f5;
          padding: 0px 20px;
          color: #aaa;
          font-size: 12px;

          .orderNum {
            color: #333333;
          }
        }

        .cardBody {
          border-bottom: 1px solid #ebebeb;

          &:last-child {
            border-bottom: none;
          }

          .orderGoodsImg {
            padding: 10px;

            .goodsImg {
              width: 100px;
              height: 100px;
            }
          }

          .orderGoodsTitle {
            padding: 10px;
            font-size: 14px;
            color: #333333;
            border-right: 1px solid #ebebeb;

            .specVal {
              font-size: 12px;
              line-height: 30px;
              color: #999999;
            }
          }

          .orderGoodsNum {
            text-align: center;
            font-weight: bold;
            line-height: 120px;
            border-right: 1px solid #ebebeb;
          }

          .orderGoodsPrice {
            text-align: center;
            font-weight: bold;
            line-height: 120px;
            border-right: 1px solid #ebebeb;
          }
        }

        .status {
          height: 100%;
          text-align: center;
        }

        .operation {
          text-align: center;
          cursor: pointer;
          border-left: 1px solid #ebebeb;

          .showInfo {
            font-size: 12px;
            color: #004930;
          }

          .comment {
            padding-top: 10px;
            font-size: 12px;
            color: #004930;
          }
        }

        .totalMoney {
          border-top: 1px solid #ebebeb;
          text-align: right;
          font-size: 14px;
          font-weight: normal;
          color: #333333;
          line-height: 30px;
          padding: 10px;

          .money {
            font-size: 20px;
            font-weight: 700;
            color: #d54040;
          }
        }
      }
    }
  }
}
</style>
