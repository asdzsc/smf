<template>
  <div class="cart">
    <a-row class="breadcrumb">
      <a-col span="24">
        <a-breadcrumb separator="》">
          <a-breadcrumb-item>
            <a href="/#/shop">
              <a-icon
                type="home"
                theme="filled"
                style="color:#004930; font-size:16px;"
              />
              商城首页
            </a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            购物车
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
    </a-row>
    <a-spin size="large" tip="加载中..." :spinning="loading">
      <a-icon
        slot="indicator"
        type="loading"
        style="font-size: 30px; color: #004930;"
        spin
      />
      <div class="cartList">
        <div class="cartTitle">
          全部商品 {{ list.length > 0 ? list.length : "" }}
        </div>
        <div class="cartTable">
          <a-row type="flex" class="cartHead">
            <a-col flex="50px" style="text-align: center;">
              <a-checkbox v-model="checkAll" @change="changeCheckAll" />
            </a-col>
            <a-col flex="120px">全选</a-col>
            <a-col flex="auto">商品</a-col>
            <a-col flex="120px" style="text-align: center;">单价</a-col>
            <a-col flex="120px" style="text-align: center;">数量</a-col>
            <a-col flex="120px" style="text-align: center;">小计</a-col>
            <a-col flex="100px" style="text-align: center;">操作</a-col>
            <a-col flex="50px"></a-col>
          </a-row>

          <div
            v-for="item in list"
            :key="item.cartId"
            class="cartItem"
            :class="{ invalid: !item.isValid }"
          >
            <a-row class="cartItemRow" type="flex">
              <a-col flex="50px" style="text-align: center;">
                <a-checkbox v-model="item.check" />
              </a-col>
              <a-col flex="120px">
                <img
                  class="goodsImg"
                  :src="baseUrl + item.cover"
                  :onerror="defImg"
                />
              </a-col>
              <a-col flex="auto">
                <div>{{ item.title }}</div>
                <div v-if="item.specVal" class="specVal">
                  {{ item.specVal }}
                </div>
                <div v-if="!item.isValid" style="color: red;">
                  该商品信息已失效
                </div>
              </a-col>
              <a-col flex="120px" style="padding-left: 30px;"
                >￥{{ formatMoney(item.price) }}</a-col
              >
              <a-col flex="120px" style="text-align: center;">
                <numCalculate
                  v-model="item.goodsNum"
                  :disabled="!item.isValid"
                ></numCalculate>
              </a-col>
              <a-col flex="120px" style="padding-left: 30px; font-weight: 700;"
                >￥{{ goodsTotalPriceText(item) }}</a-col
              >
              <a-col flex="100px" style="text-align: center;">
                <span @click="_delCart([item.cartId])" style="cursor: pointer;"
                  >删除</span
                >
              </a-col>
              <a-col flex="50px"></a-col>
            </a-row>
            <div class="line"></div>
          </div>
          <a-empty
            v-if="list.length === 0"
            style="margin-top: 50px; margin-bottom: 50px;"
          />
        </div>
      </div>
    </a-spin>

    <div v-if="list.length > 0" class="operation">
      <a-row type="flex" class="operationRow">
        <a-col flex="50px" style="text-align: center;">
          <a-checkbox v-model="checkAll" @change="changeCheckAll" />
        </a-col>
        <a-col flex="60px">全选</a-col>
        <a-col @click="delCartList()" flex="120px" style="cursor: pointer;"
          >删除选中商品</a-col
        >
        <a-col
          @click="delCartAll()"
          flex="auto"
          style="cursor: pointer; font-weight: 700;"
          >清理购物车</a-col
        >
        <a-col flex="150px" style="text-align: right; padding-right: 20px;"
          >已选择
          <span style="color: #004930; font-size: 14px;">{{
            ckCartGoodsNum
          }}</span>
          件商品</a-col
        >
        <a-col flex="220px" style="text-align: right; padding-right: 20px;"
          >总价：<span
            style="font-size: 20px; color: #d54040; font-weight: 700;"
            >￥{{ ckGoodsTotalPriceText }}</span
          ></a-col
        >
        <a-col flex="120px">
          <div @click="buy()" class="btn" :class="{ loading: isBuy }">
            <a-icon v-if="isBuy" type="loading" spin />
            去结算
          </div>
        </a-col>
      </a-row>
    </div>

    <myserve></myserve>
  </div>
</template>
<script>
import { cartList, updateCartGoodsNum, delCart } from "@/pages/pc/api/shop";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    numCalculate: () => import("@/pages/pc/components/num-calculate.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false, //列表加载
      checkAll: false,
      list: [],
      isBuy: false //立即结算
    };
  },
  computed: {
    totalGoodsNum() {
      var goodsNum = 0;
      this.list.forEach(x => {
        goodsNum += x.goodsNum;
      });
      return goodsNum;
    },
    ckCartGoodsNum() {
      var goodsNum = 0;
      this.list.forEach(x => {
        if (x.check) {
          goodsNum += x.goodsNum;
        }
      });
      return goodsNum;
    },
    ckGoodsTotalPriceText() {
      var showGoodsPrice = 0;
      this.list.forEach(x => {
        if (x.check) {
          var goodsPrice = this.goodsTotalPrice(x);
          showGoodsPrice += goodsPrice;
        }
      });
      return utils.formatMoney(showGoodsPrice);
    }
  },
  mounted() {
    this._cartList();
  },
  beforeDestroy() {
    //页面关闭前更新购物车商品数量
    if (!this.isBuy) {
      this.updateCartNum();
    }
  },
  methods: {
    _cartList() {
      this.loading = true;
      cartList().then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data;
          this.list.forEach(x => {
            this.$set(x, "check", false);
          });
        }
      });
    },
    //全选
    changeCheckAll() {
      this.list.forEach(x => {
        x.check = this.checkAll;
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
    // 更新购物车商品数量
    updateCartNum() {
      updateCartGoodsNum(this.list).then(res => {
        if (res.code === 0) {
          var cartNum = this.$store.state.account.cartNum;
          var goodsNum = this.totalGoodsNum;
          if (cartNum !== goodsNum) {
            this.$store.commit("account/setCartNum", goodsNum);
          }
          //跳转订单确认页面
          this.toBuy();
        }
      });
    },
    //删除购物车
    _delCart(cartIds) {
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delCart({
            ids: cartIds
          }).then(res => {
            if (res.code === 0) {
              vm.list = vm.list.filter(x => {
                return cartIds.indexOf(x.cartId) !== 0;
              });
            }
          });
        },
        onCancel() {}
      });
    },
    //批量删除
    delCartList() {
      // var vm = this;
      var query = this.list.filter(x => x.check);
      var cartIds = query.map(x => {
        return x.cartId;
      });
      if (cartIds.length == 0) {
        this.$notification.error({
          message: "提示",
          description: "请选中要删除的商品"
        });
      } else {
        this._delCart(cartIds);
      }
    },
    delCartAll() {
      // var vm = this;
      var cartIds = this.list.map(x => {
        return x.cartId;
      });
      if (this.list.length == 0) {
        this.$notification.error({
          message: "提示",
          description: "没有要清理的商品"
        });
      } else {
        this._delCart(cartIds);
      }
    },
    //立即结算
    buy() {
      this.isBuy = true;
      this.updateCartNum();
    },
    toBuy() {
      if (this.isBuy) {
        var query = this.list.filter(x => x.check && x.isValid);
        var cartIds = query.map(x => {
          return x.cartId;
        });
        if (cartIds.length == 0) {
          this.$notification.error({
            message: "提示",
            description: "请选中要结算的商品"
          });
          this.isBuy = false;
        } else {
          var ids = cartIds.toString();
          this.$router.push({
            path: "/shop/order/confirmOrder",
            query: {
              type: "cart",
              cids: ids
            }
          });
        }
      }
    },
    formatMoney(money) {
      return utils.formatMoney(money);
    }
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: auto;

  .breadcrumb {
    margin-top: 15px;

    /deep/ .ant-breadcrumb {
      font-size: 16px;
    }
  }

  .cartList {
    margin-top: 40px;

    .cartTitle {
      width: 100px;
      text-align: center;
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: normal;
      line-height: 20px;
      color: #004930;
      border-bottom: 2px solid #004930;
    }

    .cartTable {
      border: solid 1px #e0e0e0;

      .cartHead {
        height: 40px;
        line-height: 40px;
        background-color: #f3f3f3;
        border-bottom: solid 1px #e0e0e0;
      }

      .cartItem {
        padding-top: 20px;

        .cartItemRow {
          min-height: 100px;
          padding-bottom: 20px;
        }

        &.invalid {
          background-color: #eeeeee;
          opacity: 0.5;
        }

        .goodsImg {
          width: 100px;
          height: 100px;
        }

        .line {
          width: 1100px;
          border-bottom: solid 1px #cccccc;
          margin: auto;
        }

        .specVal {
          font-size: 12px;
          line-height: 30px;
          color: #999999;
        }

        &:last-child {
          .line {
            display: none;
          }
        }
      }
    }
  }

  .operation {
    margin-top: 70px;
    margin-bottom: 50px;
    height: 48px;
    line-height: 48px;
    background-color: #ffffff;
    border: solid 1px #e0e0e0;
    font-size: 12px;
    font-weight: normal;
    color: #666666;

    .btn {
      width: 120px;
      height: 48px;
      background-color: #d54040;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      line-height: 48px;
      color: #ffffff;
      cursor: pointer;

      &.loading {
        opacity: 0.7;
        cursor: no-drop;
      }
    }
  }
}
</style>
