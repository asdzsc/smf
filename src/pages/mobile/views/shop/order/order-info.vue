<template>
  <div class="orderInfo">
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">
      <div class="link">
        <a href="/mobile/#/shop/order/orderList">服务订单</a>
        <span> <van-icon name="arrow" />订单详情</span>
      </div>
    </div>
    <div v-if="model.orderStatus === '1'" style="width: 90%; margin: 10px auto">
      <div slot="description">
        <van-icon
          style="vertical-align: middle; margin-right: 0.1rem"
          name="warning-o"
          color="#faad14"
          size=".5rem"
        />
        <p style="display: inline; line-height: 0.5rem">
          订单当前状态为【待支付】 ,
          <span style="font-weight: 700; color: #d54040">
            {{ dateDown }}
          </span>
          后订单将自动关闭
        </p>
      </div>
    </div>
    <orderInfoCont ref="orderInfoCont" :shopOrder="model"></orderInfoCont>
    <div class="totalMoney">
      实付款：<span class="money">￥{{ formatMoney(model.payment) }}</span>
    </div>
    <div v-if="model.orderStatus === '1'" class="btnCont">
      <div @click="pay()" class="btn">立即支付</div>
    </div>
  </div>
</template>

<script>
import { getOrderInfo, orderLogList } from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      name: "",
      address: "墓地地址墓地地址",
      payWay: "支付宝",
      payTime: "2020-09-15  18:34:21",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      model: {
        id: "",
        orderNum: "",
        createDate: "",
        serveTime: "",
        orderStatus: "0",
        payment: 0,
        payType: "支付宝", // 支付宝  微信支付
        goodsList: [],
        logList: [],
      },
      endDateStr: "", //订单结束时间
      dateDown: "", //倒计时
      jobTime: null, //倒计时
      isSubmit: false,
      showPayQrcode: false, //扫码支付二维码
    };
  },
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
    orderInfoCont: () =>
      import("@/pages/mobile/views/shop/order/components/order-info-cont.vue"),
  },
  mounted() {
    this._getOrderInfo();
    this._orderLogList();
  },
  //页面销毁前
  beforeDestroy() {
    console.log("销毁定时器");
    if (this.jobTime) {
      //销毁定时器
      clearInterval(this.jobTime);
      this.jobTime = null;
    }
  },
  methods: {
    //搜索跳转到订单列表页面
    search(searchText) {
      if (searchText) {
        this.$router.push({
          name: "shop-order-orderList",
          params: {
            searchText: searchText,
          },
        });
      }
    },
    _getOrderInfo() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      if (this.$route.query.id) {
        getOrderInfo({
          id: this.$route.query.id,
        }).then((res) => {
          this.$toast.clear();
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            if (this.model.orderStatus === "1") {
              this.timeDown();
            }
          }
        });
      } else {
        this.$router.push("/shop/order/orderList");
      }
    },
    _orderLogList() {
      if (this.$route.query.id) {
        orderLogList({
          id: this.$route.query.id,
        }).then((res) => {
          if (res.code === 0) {
            this.model.logList = res.data;
          }
        });
      }
    },
    timeDown() {
      var dtime = this.model.createDate.replace(/-/g, "/");
      var date = new Date(dtime);
      var edate = utils.addDate(date, "n", 30);
      this.endDateStr = utils.parseTime(edate);
      this.dateDown = utils.timeDown(this.endDateStr);
      this.jobTime = setInterval(() => {
        this.dateDown = utils.timeDown(this.endDateStr);
      }, 1000);
    },
    pay() {
      if (this.model.payType === "支付宝") {
        this.$router.push({
          path: "/pay/alipay-pay",
          query: {
            id: this.model.id,
          },
        });
      } else {
        //打开支付二维码
        // this.showPayQrcode = true
        const wxPay = this.baseUrl + "/pay/wxpay_page?orderId=" + this.model.id;
        window.location.href = wxPay;
      }
    },
    payQrcodeColse(res) {
      this.showPayQrcode = false;
      window.location.reload();
      // if (res && res.code === 0) {
      // 	console.log("payQrcodeColse", res);
      // } else {
      // 	this.$router.push({
      // 		path: "/shop/order/orderInfo",
      // 		query: {
      // 			id: this.model.id
      // 		}
      // 	});
      // }
    },
    formatMoney(money) {
      return utils.formatMoney(money);
    },
  },
};
</script>

<style lang="less" scoped>
.orderInfo {
  background: #fff;

  .title {
    padding: 4%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 0.32rem;

    .link {
      color: #004930;

      a {
        color: #333333;
      }
    }
  }

  .totalMoney {
    width: 90%;
    margin: 0 auto;
    margin-top: 0.3rem;
    text-align: right;
    font-size: 0.28rem;
    font-weight: normal;
    color: #333333;
    line-height: 0.3rem;

    .money {
      font-size: 0.4rem;
      font-weight: 700;
      color: #d54040;
    }
  }

  .btnCont {
    width: 90%;
    margin: 0 auto;
    position: relative;
    height: 0.8rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;

    .btn {
      position: absolute;
      right: 0px;
      width: 2rem;
      height: 0.8rem;
      background-color: #d54040;
      text-align: center;
      font-size: 0.35rem;
      font-weight: 700;
      line-height: 0.8rem;
      color: #ffffff;
    }
  }
}
</style>
