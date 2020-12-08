<template>
  <a-card>
    <div class="operator">
      <span class="title">概况</span>

      <a-select
        v-model="columnKey"
        labelInValue
        placeholder="选择栏目查看"
        @change="changeColumn"
        style="width:150px;"
      >
        <a-select-option
          v-for="item in columnList"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <a-button @click="_exportExcel()" type="primary" style="float: right;"
        >导出</a-button
      >
    </div>
    <!-- 观看数据 -->
    <div class="cell">
      <div class="left">观看数据</div>
      <div class="right">
        <a-select
          :defaultValue="{ key: '7' }"
          labelInValue
          style="width:110px;"
          @change="changeDay"
        >
          <a-select-option key="7" value="7">
            最近一周
          </a-select-option>
          <a-select-option key="30" value="30">
            最近一月
          </a-select-option>
          <a-select-option key="180" value="180">
            最近半年
          </a-select-option>
        </a-select>
      </div>
    </div>
    <ul class="survey">
      <li>
        <div class="imgBox">
          <a-icon type="eye" style="font-size: 20px;color: #fff" />
        </div>
        <div class="right">
          <p class="tip">累计观看人数(人)</p>
          <p class="number">
            {{ tranNumber(liveNum) }}<span>直播</span> {{ tranNumber(playNum)
            }}<span>回放</span>
          </p>
        </div>
      </li>
      <li>
        <div class="imgBox">
          <a-icon type="like" style="font-size: 20px;color: #fff" />
        </div>
        <div class="right">
          <p class="tip">累计点赞人数(人)</p>
          <p class="number">{{ tranNumber(zanNum) }}</p>
        </div>
      </li>
      <li>
        <div class="imgBox">
          <a-icon type="form" style="font-size: 20px;color: #fff" />
        </div>
        <div class="right">
          <p class="tip">累计评论人数(人)</p>
          <p class="number">{{ tranNumber(chatNum) }}</p>
        </div>
      </li>
    </ul>

    <div id="content1"></div>

    <!-- 并发 -->
    <div class="cell">
      <div class="left">并发(直播已结束)</div>
      <div class="right">
        <a-range-picker
          :allowClear="false"
          @change="onChangeDate"
          v-model="dtime"
        />
      </div>
    </div>
    <div id="content2"></div>
  </a-card>
</template>

<script>
import { getLiveColumnListAll } from "@/pages/admin/api/live/livecolumn";
import { lookData, lookDataByTime, exportExcel } from "@/pages/admin/api/dashboard";
import * as utils from "@/pages/admin/libs/utils";
import moment from "moment";

import echarts from "echarts";
export default {
  data() {
    return {
      columnList: [],
      columnKey: [],
      model: {
        columnId: "", //栏目
        day: "7" //默认查询近一周的数据
      },
      liveNum: 0, //直播累计观看人数
      playNum: 0, //回播累计观看人数
      zanNum: 0, //点赞人数
      chatNum: 0, //评论人数
      line1: {
        legend: {
          type: "plain",
          bottom: 0
        },
        tooltip: {
          show: true,
          trigger: "axis",
          formatter: "{b} <br/>{c0}{a0} <br />{c1}{a1}"
        },
        grid: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 70
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          data: []
        },
        yAxis: [
          {
            name: "次(人)",
            type: "value",
            splitNumber: 5
          },
          {
            name: "分钟",
            type: "value",
            splitNumber: 5
          }
        ],
        series: [
          {
            name: "次(人)",
            data: [],
            type: "line"
          },
          {
            name: "分钟",
            yAxisIndex: 1,
            data: [],
            type: "line"
          }
        ],
        color: ["#1890ff", "#ff5455", "#ff9b54"]
      },
      dtime: [],
      startTime: "",
      endTime: "",
      line2: {
        tooltip: {
          show: true,
          trigger: "axis",
          formatter: "{b} <br/>{c}{a}"
        },
        grid: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 20
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          data: []
        },
        yAxis: [
          {
            name: "人",
            type: "value"
          }
        ],
        series: [
          {
            name: "人",
            data: [],
            type: "line"
          }
        ],
        color: ["#1890ff", "#ff5455", "#ff9b54"]
      }
    };
  },
  mounted() {
    this._getLiveColumnListAll();
    this._lookData();
    // this.draw();

    var st = moment().add(-30, "days");
    var et = moment();
    this.dtime = [st, et];
    this.startTime = st.format("YYYY-MM-DD");
    this.endTime = et.format("YYYY-MM-DD");
    this._lookDataByTime();
  },
  methods: {
    _getLiveColumnListAll() {
      getLiveColumnListAll().then(res => {
        if (res.code === 0) {
          this.columnList = res.data;
        }
      });
    },
    //栏目选择
    // eslint-disable-next-line no-unused-vars
    changeColumn(value, option) {
      this.model.columnId = value.key;
      this._lookData();
    },
    //栏目天数
    // eslint-disable-next-line no-unused-vars
    changeDay(value, option) {
      this.model.day = value.key;
      this._lookData();
    },
    _lookData() {
      lookData(this.model).then(res => {
        if (res.code === 0) {
          this.liveNum = res.data.liveNum;
          this.playNum = res.data.playNum;
          this.zanNum = res.data.zanNum;
          this.chatNum = res.data.chatNum;

          this.line1.xAxis.data = res.data.xList;
          // this.line1.yAxis[0].min = Math.min(...res.data.playList);
          // this.line1.yAxis[0].max = Math.max(...res.data.playList);
          // this.line1.yAxis[0].interval =
          //   (Math.max(...res.data.playList) - Math.min(...res.data.playList)) /
          //   5;

          // this.line1.yAxis[1].min = Math.min(...res.data.playMinuteList);
          // this.line1.yAxis[1].max = Math.max(...res.data.playMinuteList);
          // this.line1.yAxis[1].interval =
          //   (Math.max(...res.data.playMinuteList) -
          //     Math.min(...res.data.playMinuteList)) /
          //   5;

          this.line1.series[0].data = res.data.playList;
          this.line1.series[1].data = res.data.playMinuteList;
          this.draw();
        }
      });
    },
    draw() {
      let myChart = echarts.init(document.getElementById("content1"));
      myChart.clear();
      myChart.setOption(this.line1);
    },
    _lookDataByTime() {
      lookDataByTime({ startTime: this.startTime, endTime: this.endTime }).then(
        res => {
          if (res.code === 0) {
            this.line2.xAxis.data = res.data.xList;
            this.line2.series[0].data = res.data.playList;
            this.draw2();
          }
        }
      );
    },
    //时间选择
    onChangeDate(date, dateString) {
      this.startTime = dateString[0];
      this.endTime = dateString[1];
      this._lookDataByTime();
    },
    draw2() {
      let myChart = echarts.init(document.getElementById("content2"));
      myChart.clear();
      myChart.setOption(this.line2);
    },
    _exportExcel() {
      this.$message.loading("导出数据生成中...", 0);
      exportExcel(this.model).then(res => {
        this.$message.destroy();
        if (res.code === 0) {
          window.open(process.env.VUE_APP_BASE_URL + res.data);
        }
      });
    },
    tranNumber(n) {
      return utils.tranNumber(n);
    }
  }
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
  .title {
    position: relative;
    margin-right: 10px;
    display: inline-block;
    padding-left: 10px;
    font-size: 15px;
    font-weight: bold;
    &:after {
      content: "";
      width: 3px;
      height: 15px;
      background-color: #1890ff;
      position: absolute;
      left: 0;
      top: 4px;
    }
  }
}
.survey {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    position: relative;
    display: inline-block;
    width: 33.33%;
    .imgBox {
      float: left;
      width: 40px;
      height: 40px;
      line-height: 44px;
      text-align: center;
      background-color: #1890ff;
      margin-right: 14px;
      margin-top: 7px;
      border-radius: 3px;
    }
    p {
      margin: 0;
    }
    .tip {
      margin-bottom: 5px;
      font-size: 12px;
      color: #666;
    }
    .number {
      font-size: 18px;
      word-spacing: 6px;
      font-weight: bold;
      span {
        font-size: 12px;
        margin-left: 4px;
        font-weight: 400;
      }
    }
  }
  li:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 17%;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    background-color: #e8e8e8;
  }
}
.cell {
  display: block;
  column-span: all;
  height: 40px;
  line-height: 40px;
  margin: 20px 0 10px;
  .left {
    float: left;
    font-size: 15px;
    font-weight: bold;
  }
  .right {
    float: right;
  }
}
#content1,
#content2 {
  height: 350px;
}
</style>
