<template>
  <div class="contItem">
    <div class="contTitle">支付方式</div>
    <div class="contInfo">
      <a-row type="flex">
        <a-col>
          <div
            @click="setCheck('支付宝')"
            class="itemDiv"
            :class="{ check: model.payType === '支付宝' }"
          >
            支付宝
            <img class="ok" src="/img/check1.png" />
          </div>
        </a-col>
        <a-col>
          <div
            @click="setCheck('微信支付')"
            class="itemDiv"
            :class="{ check: model.payType === '微信支付' }"
          >
            微信支付
            <img class="ok" src="/img/check1.png" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        payType: "支付宝",
      },
    };
  },
  mounted() {},
  methods: {
    setCheck(_payType) {
      this.model.payType = _payType;
    },
    //获取数据
    getData() {
      if (!this.model.payType) {
        this.$notification.error({
          message: "提示",
          description: "请选择支付方式",
        });
        return null;
      }
      return this.model.payType;
    },
  },
};
</script>

<style lang="less" scoped>
.contItem {
  .contTitle {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
  }

  .addAddress {
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    color: #004930;
  }

  .contInfo {
    padding: 20px 0px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    border-bottom: solid 1px #cccccc;

    .itemDiv {
      width: 140px;
      height: 40px;
      border: solid 2px #cccccc;
      position: relative;
      margin-right: 50px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 35px;
      color: #333333;
      cursor: pointer;

      .ok {
        position: absolute;
        right: 0px;
        bottom: 0px;
        display: none;
      }

      &:hover {
        border: solid 2px #004930;
      }

      &.check {
        border: solid 2px #004930;

        .ok {
          display: block;
        }
      }
    }
  }
}
</style>
