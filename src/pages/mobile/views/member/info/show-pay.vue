<template>
  <div>
    <div style="padding: 0 4%">
      <memberTabs ref="memberTabs"></memberTabs>
      <van-field label="当前主页:" v-model="model.memoryName" readonly />
      <van-field label="开通时长:" readonly />
      <div class="orderPayType">
        <div class="orderPayInfo">
          <div
            @click="setCheck('1个月')"
            class="itemDiv"
            :class="{ check: modelType.payType === '1个月' }"
          >
            <span class="time">1个月</span>
            <div>
              <span class="money">￥</span>
              <span style="font-size: 0.4rem">30</span>
            </div>
          </div>
          <div
            @click="setCheck('3个月')"
            class="itemDiv"
            :class="{ check: modelType.payType === '3个月' }"
          >
            <span class="time">3个月</span>
            <div>
              <span class="money">￥</span>
              <span style="font-size: 0.4rem">90</span>
            </div>
          </div>
          <div
            @click="setCheck('1年')"
            class="itemDiv"
            :class="{ check: modelType.payType === '1年' }"
          >
            <span class="time">1年</span>
            <div>
              <span class="money">￥</span>
              <span style="font-size: 0.4rem">360</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="footTool">
      <div class="btnCont" @click="pay()">提交订单</div>
    </div> -->
    </div>
    <div class="btn">
      <div class="div" @click="pay">立即支付</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      model: {
        memoryId: this.$route.query.id, //纪念馆id
        memoryName: this.$route.query.name,
      },
      modelType: {
        payType: "1个月",
      },
    };
  },
  mounted() {},
  methods: {
    setCheck(_payType) {
      this.modelType.payType = _payType;
    },
    //立即续费
    pay() {
      if (!this.modelType.payType) {
        this.$notification.error({
          message: "提示",
          description: "请选择续费时长",
        });
        return null;
      } else if (this.modelType.payType == "1个月") {
        let data = {
          type: "shop",
          gid: "536353943395766272",
          memoryId: this.model.memoryId,
          goodsNum: 1,
          spec: "",
          orderType: 4,
        };
        this.$router.push({
          path: "/shop/order/confirmOrder",
          query: data,
        });
      } else if (this.modelType.payType == "3个月") {
        let data = {
          type: "shop",
          gid: "536354115978792960",
          memoryId: this.model.memoryId,
          goodsNum: 1,
          spec: "",
          orderType: 4,
        };
        this.$router.push({
          path: "/shop/order/confirmOrder",
          query: data,
        });
      } else {
        let data = {
          type: "shop",
          gid: "536354297290166272",
          memoryId: this.model.memoryId,
          goodsNum: 1,
          spec: "",
          orderType: 4,
        };
        this.$router.push({
          path: "/shop/order/confirmOrder",
          query: data,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  position: fixed;
  bottom: 0rem;
  z-index: 2;
  width: 100%;
  padding: 0.25rem 0rem;
  background-color: rgba(241, 241, 241, 0.8);
  .div {
    opacity: 1;
    width: 4.46rem;
    height: 0.8rem;
    background-color: #00744c;
    border-radius: 0.4rem;
    margin: auto;
    font-size: 0.32rem;
    font-weight: 700;
    line-height: 0.8rem;
    letter-spacing: 4px;
    color: #ffffff;
    text-align: center;
  }
}

.orderPayType {
  margin-top: 0.2rem;
  margin-top: 0.2rem;
  background: #fff;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.35rem;
    font-weight: bold;
    font-size: 0.28rem;
  }

  .orderPayInfo {
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
    display: flex;
    .itemDiv {
      width: 3rem;
      margin-top: 0.2rem;
      border: solid 2px #cccccc;
      position: relative;
      margin-right: 0.3rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 0.8rem;
      color: #004930;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;

      .time {
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.35rem;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background: #004930;
        color: #fff;
      }

      &.check {
        background: rgba(0, 73, 48, 0.8);
        border: solid 2px #004930;
        color: #fff;
      }
    }
  }
}
</style>
