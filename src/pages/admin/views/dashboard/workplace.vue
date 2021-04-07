<template>
  <div>
    <a-row style="margin: 0 -12px">
      <a-col :sm="24" :md="24" :xl="24" style="padding-bottom: 24px;">
        <a-card :bodyStyle="{ padding: '15px' }">
          <div class="timeDiv">
            欢迎管理员：{{ currUser.name }}（{{ currUser.username }}）
            当前时间：{{ time }}
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24">
        <a-card title="系统信息" size="small">
          <a-card-grid style="width:10%;text-align:right" :hoverable="false"
            >服务器地址</a-card-grid
          >
          <a-card-grid style="width:90%;text-align:left" :hoverable="false">{{
            baseUrl
          }}</a-card-grid>

          <a-card-grid style="width:10%;text-align:right" :hoverable="false"
            >注册用户数</a-card-grid
          >
          <a-card-grid style="width:90%;text-align:left" :hoverable="false">{{
            formatMoney(10000, 0)
          }}</a-card-grid>

          <a-card-grid style="width:10%;text-align:right" :hoverable="false"
            >当月评论数</a-card-grid
          >
          <a-card-grid style="width:90%;text-align:left" :hoverable="false">{{
            formatMoney(10000, 0)
          }}</a-card-grid>

          <a-card-grid style="width:10%;text-align:right" :hoverable="false"
            >直播流量</a-card-grid
          >
          <a-card-grid style="width:90%;text-align:left" :hoverable="false"
            >{{ formatMoney(100, 0) }} G</a-card-grid
          >
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as utils from "@/pages/admin/libs/utils";
export default {
  name: "workplace",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      time: "",
      model: {
        webUrl: "",
        ports: "",
        osName: "",
        javaVersion: "",
        fileSize: "",
        datasource: "",
      },
    };
  },
  components: {},
  computed: {
    currUser() {
      return this.$store.state.adminAccount.user || {};
    },
  },
  watch: {},
  created() {},
  mounted() {
    //当前时间
    setInterval(() => {
      this.time = utils.parseTime(new Date());
    }, 1000);
  },
  activated() {
    //加载事件 console.log("activated");
  },
  methods: {
    formatMoney(num, len) {
      return utils.formatMoney(num, len);
    },
  },
};
</script>

<style lang="less" scoped>
.timeDiv {
  padding: 15px;
  line-height: 22px;
  border-left: 5px solid #1890ff;
  border-radius: 0 2px 2px 0;
  background-color: #f2f2f2;
}
.ant-card-grid {
  padding: 10px;
}
</style>
