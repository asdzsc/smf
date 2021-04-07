<template>
  <a-modal
    :title="title"
    v-model="visible"
    width="860px"
    :bodyStyle="{ padding: '10px' }"
    @cancel="onClose"
    :footer="null"
  >
    <div class="operator">
      <div class="contTitle">当前主页：{{ memoryInfo.name }}</div>
      <div class="contItem">
        <div class="contTitle">开通时长：</div>
        <div class="contInfo">
          <a-row type="flex">
            <a-col>
              <div
                @click="setCheck('1个月')"
                class="itemDiv"
                :class="{ check: model.payType === '1个月' }"
              >
                <span class="time">1个月</span>
                <span style="color: #004930">￥</span>
                <span style="font-size: 20px">30</span>
                <img class="ok" src="/img/check1.png" />
              </div>
            </a-col>
            <a-col>
              <div
                @click="setCheck('3个月')"
                class="itemDiv"
                :class="{ check: model.payType === '3个月' }"
              >
                <span class="time">3个月</span>
                <span style="color: #004930">￥</span>
                <span style="font-size: 20px">90</span>
                <img class="ok" src="/img/check1.png" />
              </div>
            </a-col>
            <a-col>
              <div
                @click="setCheck('1年')"
                class="itemDiv"
                :class="{ check: model.payType === '1年' }"
              >
                <span class="time">1年</span>
                <span style="color: #004930">￥</span>
                <span style="font-size: 20px">360</span>
                <img class="ok" src="/img/check1.png" />
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="btnCont">
          <div @click="pay()" class="btn">立即续费</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    memoryInfo: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      visible: true,
      title: "模板续费",
      model: {
        payType: "1个月",
      },
    };
  },
  mounted() {
    console.log(this.memoryInfo);
  },
  methods: {
    onClose() {
      this.visible = false;
      this.$emit("onClose");
    },
    setCheck(_payType) {
      this.model.payType = _payType;
    },
    //立即续费
    pay() {
      if (!this.model.payType) {
        this.$notification.error({
          message: "提示",
          description: "请选择续费时长",
        });
        return null;
      } else if (this.model.payType == "1个月") {
        let data = {
          type: "shop",
          gid: "536353943395766272",
          memoryId: this.memoryInfo.id,
          goodsNum: 1,
          spec: "",
          orderType: 4,
        };
        this.$router.push({
          path: "/shop/order/confirmOrder",
          query: data,
        });
      } else if (this.model.payType == "3个月") {
        let data = {
          type: "shop",
          gid: "536354115978792960",
          memoryId: this.memoryInfo.id,
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
          memoryId: this.memoryInfo.id,
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
.operator {
  padding: 0 15px;
  .contTitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .contItem {
    margin-top: 20px;

    .contInfo {
      padding: 20px 0px;
      margin-left: 30px;
      margin-right: 30px;
      margin-bottom: 20px;
      border-bottom: solid 1px #cccccc;

      .itemDiv {
        width: 190px;
        height: 60px;
        border: solid 2px #cccccc;
        position: relative;
        margin-right: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        line-height: 60px;
        color: #000;
        cursor: pointer;
        .time {
          float: left;
          width: 60px;
          height: 56px;
          line-height: 56px;
          color: #707070;
          text-align: center;
          cursor: pointer;
          border-radius: 2px 0 0 2px;
          background: #ededed;
          font-size: 16px;
        }
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
    .btnCont {
      position: relative;
      height: 48px;
      margin-top: 30px;
      margin-bottom: 30px;

      .btn {
        position: absolute;
        right: 0px;
        width: 160px;
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
}
</style>
