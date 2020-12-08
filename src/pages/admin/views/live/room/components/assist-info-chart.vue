<template>
  <a-card class="chart-cont">
    <div id="myChart" :style="{ width: '100%', height: '400px' }"></div>
  </a-card>
</template>

<script>
import { liveChartList } from "@/pages/admin/api/live/livelist";

export default {
  name: "assist-info-chart",
  data() {
    return {
      jobTime: null, //定时器
      id: "",
      option: {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        legend: {
          padding: [20, 0, 0, 0],
          data: ["消息", "人数"]
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "5%",
          right: "3%",
          bottom: "10%"
        },
        dataZoom: [
          {
            show: true,
            realtime: true
          },
          {
            type: "inside",
            realtime: true
          }
        ],
        series: [
          {
            name: "消息",
            data: [],
            type: "line",
            smooth: true
          },
          {
            name: "人数",
            data: [],
            type: "line",
            smooth: true
          }
        ]
      }
    };
  },
  mounted() {
    this.jobTime = setInterval(() => {
      this._liveChartList();
    }, 1000 * 60);
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.jobTime);
    this.jobTime = null;
  },
  methods: {
    _liveChartList() {
      if (this.id) {
        liveChartList({ id: this.id }).then(res => {
          if (res.code === 0) {
            this.option.xAxis.data = res.data.xList;
            this.option.series[0].data = res.data.msgList;
            this.option.series[1].data = res.data.playList;
            this.drawLine();
          }
        });
      }
    },
    loadData(nid) {
      this.id = nid;
      this._liveChartList();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(this.option);
    }
  }
};
</script>

<style lang="less" scoped>
.chart-cont {
  /deep/ .ant-card-body {
    padding: 0px !important;
  }
}
</style>
