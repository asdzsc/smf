<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">
      墓地订单详情
    </div>
    <div class="form">
      <div class="div" style="border:1px solid #dcdcdc;">
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">订单编号</van-col>
          <van-col class="text" span="18">{{ model.code }}</van-col>
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">订单日期</van-col>
          <van-col class="text" span="18">{{
            parseTime(model.recordDate)
          }}</van-col>
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">订单状态</van-col>
          <van-col class="text" span="18">{{
            erpOrderStatusText(model.orderStatus).text
          }}</van-col>
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">订单金额</van-col>
          <van-col class="text" span="18"
            ><span class="money"
              >￥{{ formatMoney(model.orderAmount) }}</span
            ></van-col
          >
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">落葬人</van-col>
          <van-col class="text" span="18">{{ model.buryPersonName }}</van-col>
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">墓址</van-col>
          <van-col class="text" span="18">{{ cemeteryAddress }}</van-col>
        </van-row>
        <van-row type="flex" style="border-bottom:1px solid #dcdcdc;">
          <van-col class="color" span="6">主办人</van-col>
          <van-col class="text" span="18">{{ model.customerName }}</van-col>
        </van-row>
        <van-row type="flex">
          <van-col class="color" span="6">联系电话</van-col>
          <van-col class="text" span="18">{{ model.customerPhone }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { findSaleCemeteryOrderDetail } from "@/pages/mobile/api/smferp";
import * as utils from "@/pages/mobile/libs/utils";
import * as dictionary from "@/comment/dictionary";

export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      model: {
        tid: "",
        cemetery: null,
        reserveList: null,
      },
    };
  },
  computed: {
    cemeteryAddress() {
      if (this.model.cemetery) {
        return this.model.cemetery.cemeteryAddress;
      } else if (this.model.reserveList) {
        var query = this.model.reserveList.map((x) => {
          return x.cemeteryAddress;
        });
        return query.join(",");
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.$route.query.id) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        findSaleCemeteryOrderDetail({
          id: this.$route.query.id,
        }).then((res) => {
          this.$toast.clear();
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      }
    },
    parseTime(dtime) {
      if (dtime) {
        if (dtime.length <= 10) {
          dtime += " 00:00:00";
        }
        return utils.parseTime(dtime, "{y}/{m}/{d} {h}:{i}:{s}");
      }
      return "";
    },
    erpOrderStatusText(orderStatus) {
      return dictionary.erpOrderStatusText(orderStatus);
    },
    formatMoney(money) {
      return utils.formatMoney(money);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 0rem 0.5rem;
  padding-top: 0.5rem;
  font-weight: 700;
  font-size: 0.36rem;
  color: #333333;
}

.cartIcon {
  width: 0.88rem;
  height: 0.64rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  border-radius: 0px 0.1rem 0.1rem 0px;
}

.form {
  padding: 0.5rem;

  .div {
    .color {
      background: #f5f5f5;
      color: #999999;
      min-height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
    }

    .text {
      padding: 10px;
      line-height: 20px;
    }

    .money {
      font-weight: 700;
      color: #d54040;
    }
  }

  .formItem {
    padding-bottom: 0.3rem;

    .label {
      font-size: 0.3rem;
      font-weight: 700;
      color: #333333;
    }

    .inputCont {
      padding-top: 0.1rem;

      input {
        width: 6.1rem;
        height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }
    }

    .verifyCode {
      padding-top: 0.1rem;
      display: flex;

      input {
        flex: 1;
        height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }

      .codeImg {
        width: 1.6rem;
        height: 0.8rem;
        border: solid 1px #e0e0e0;
        border-left: 0px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .smsCodeBtn {
        width: 1.6rem;
        height: 0.8rem;
        background-color: #004930;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.26rem;
        font-weight: normal;
        color: #ffffff;
        cursor: pointer;

        &.disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
