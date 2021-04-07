<template>
  <div class="member">
    <memberHead ref="memberHead"></memberHead>

    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="title">墓地订单 > 墓地订单详情</div>
        <a-spin
          size="large"
          tip="加载中..."
          :spinning="loading"
          style="width:100%; "
        >
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 30px; color: #004930; text-align: center;"
            spin
          />
          <div>
            <div class="modelTitle">
              订单详情
            </div>
            <div class="card" style="padding-top: 0px;">
              <div class="cardItem" style="padding-top: 0px;">
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    订单编号:
                  </a-col>
                  <a-col>
                    {{ model.code }}
                  </a-col>
                </a-row>
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    订单日期:
                  </a-col>
                  <a-col>
                    {{ parseTime(model.recordDate) }}
                  </a-col>
                </a-row>
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    订单状态:
                  </a-col>
                  <a-col>
                    {{ erpOrderStatusText(model.orderStatus).text }}
                  </a-col>
                </a-row>
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    订单金额:
                  </a-col>
                  <a-col>
                    <span class="money"
                      >￥{{ formatMoney(model.orderAmount) }}</span
                    >
                  </a-col>
                </a-row>
              </div>
              <div class="cardItem">
                <a-row class="cardRow" type="flex" style="padding-top: 0px;">
                  <a-col class="lable">
                    落葬人:
                  </a-col>
                  <a-col>
                    {{ model.buryPersonName }}
                  </a-col>
                </a-row>
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    墓址:
                  </a-col>
                  <a-col>
                    {{ cemeteryAddress }}
                  </a-col>
                </a-row>
              </div>
              <div class="cardItem">
                <a-row class="cardRow" type="flex" style="padding-top: 0px;">
                  <a-col class="lable">
                    主办人:
                  </a-col>
                  <a-col>
                    {{ model.customerName }}
                  </a-col>
                </a-row>
                <a-row class="cardRow" type="flex">
                  <a-col class="lable">
                    联系电话:
                  </a-col>
                  <a-col>
                    {{ model.customerPhone }}
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <myserve></myserve>
  </div>
</template>

<script>
import { findSaleCemeteryOrderDetail } from "@/pages/pc/api/smferp";
import * as utils from "@/pages/pc/libs/utils";
import * as dictionary from "@/comment/dictionary";
export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      loading: false,
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
        this.loading = true;
        findSaleCemeteryOrderDetail({
          id: this.$route.query.id,
        }).then((res) => {
          this.loading = false;
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

      .btn {
        width: 160px;
        height: 36px;
        line-height: 36px;
        background-color: #004930;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        color: #ffffff;
      }

      .modelTitle {
        height: 48px;
        background-color: #ebebeb;
        font-size: 16px;
        line-height: 48px;
        color: #333333;
        padding-left: 30px;
      }

      .card {
        border: solid 1px #ebebeb;
        margin-bottom: 10px;
        padding: 30px;

        &:last-child {
          margin-bottom: 0px;
        }

        .cardItem {
          border-bottom: 1px dashed #e7e7e7;
          padding: 20px 0px;

          &:last-child {
            border-bottom: 0px;
          }

          .money {
            font-weight: 700;
            color: #d54040;
          }

          .fontStyle {
            font-size: 14px;
            color: #4a4a4a;
          }

          .cardRow {
            padding-top: 15px;

            .lable {
              width: 65px;
            }
          }
        }
      }
    }
  }
}
</style>
