<template>
  <div class="member">
    <memberHead ref="memberHead"></memberHead>

    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="title">墓地订单</div>
        <a-row type="flex" style="line-height: 36px;">
          <a-col style="padding-right:10px;">
            墓址：
          </a-col>
          <a-col style="padding-right:40px;">
            <a-input
              v-model="model.address"
              @keyup.enter="search()"
              placeholder="填写墓址"
              style="width:300px;"
            />
          </a-col>
          <a-col>
            <div @click="search()" class="btn">
              查询
            </div>
          </a-col>
        </a-row>
        <div
          style="border-bottom: solid 1px #cccccc; margin-top: 28px; margin-bottom: 20px;"
        ></div>

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
          <table class="tablelist">
            <tr class="tableHead">
              <td>编号</td>
              <td>墓址</td>
              <td>落葬人</td>
              <td>订单状态</td>
              <td>订单金额</td>
              <td>日期</td>
              <td style="width: 60px; text-align: center;">操作</td>
            </tr>
            <tr v-for="item in model.list" :key="item.tid" class="tableRr">
              <td>{{ item.code }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.buryPersonName }}</td>
              <td>{{ erpOrderStatusText(item.orderStatus).text }}</td>
              <td>
                <span class="money">￥{{ formatMoney(item.orderAmount) }}</span>
              </td>
              <td>{{ parseTime(item.recordDate) }}</td>
              <td style="text-align: center; cursor: pointer;">
                <div
                  @click="
                    $router.push(
                      `/member/cemetery/cemeteryOrderInfo?id=${item.tid}`
                    )
                  "
                  class="showInfo"
                >
                  详情
                </div>
              </td>
            </tr>
          </table>
        </a-spin>

        <a-empty v-if="model.list.length === 0" />
        <div style="padding-top: 30px;"></div>
        <paging ref="paging" @setPage="setPage"></paging>
      </div>
    </div>

    <myserve></myserve>
  </div>
</template>

<script>
import { findSaleCemeteryOrderList } from "@/pages/pc/api/smferp";
import * as utils from "@/pages/pc/libs/utils";
import * as dictionary from "@/comment/dictionary";
export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
  },
  data() {
    return {
      loading: false,
      model: {
        current: "1",
        pageSize: "15",
        address: "", //墓址
        total: "0",
        list: [],
      },
    };
  },
  mounted() {
    this._findSaleCemeteryOrderList();
  },
  methods: {
    search() {
      this.setPage(1);
    },
    _findSaleCemeteryOrderList() {
      this.loading = true;
      findSaleCemeteryOrderList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.model.total = res.data.totalRows;
          this.model.list = res.data.data;
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._findSaleCemeteryOrderList();
    },
    parseTime(dtime) {
      if (dtime) {
        if (dtime.length <= 10) {
          dtime += " 00:00:00";
        }
        return utils.parseTime(dtime, "{y}年{m}月{d}日");
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

      .tablelist {
        width: 100%;
        border: 1px solid #ebebeb;

        .tableHead {
          height: 40px;
          background-color: #f5f5f5;
          font-size: 12px;
          line-height: 40px;
          color: #333333;
          text-align: center;

          td {
            padding: 5px;
          }
        }

        .tableRr {
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          color: #333333;
          border-top: 1px solid #ebebeb;
          text-align: center;

          td {
            padding: 5px;
          }
        }

        .money {
          font-weight: 700;
          color: #d54040;
        }

        .showInfo {
          font-size: 12px;
          color: #004930;
        }
      }
    }
  }
}
</style>
