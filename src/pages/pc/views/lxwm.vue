<template>
  <div class="lxwm">
    <div class="banner"></div>
    <div class="titleCont">
      <div class="title">联系我们</div>
      <div class="title2">contact us</div>
    </div>
    <div class="addressCont">
      <div class="address">
        <div class="title">石门峰纪念公园</div>
        <div class="item">
          <span class="lable">地址：</span>武汉市东湖高新区九峰街道石门峰路9号
        </div>
        <div class="item">
          <span class="lable">电话：</span>027-87635298 / 87635632 / 87639736
        </div>
        <div class="item"><span class="lable">公众号：</span>smfgzh</div>
      </div>
      <div class="addressMap">
        <img src="/img/lxwm-maps.png" />
        <div class="yjdh">
          <div class="btn" @click="yjdh()">一键导航</div>
        </div>
      </div>
    </div>
    <myserve></myserve>
  </div>
</template>

<script>
export default {
  components: {
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    yjdh() {
      var tempPage = window.open("", "_blank");
      tempPage.location = "https://surl.amap.com/x0iIcMbz1";
    }
  }
};
</script>

<style lang="less" scoped>
.lxwm {
  .banner {
    background: url("/img/banner14.png") no-repeat center center;
    background-size: cover;
    height: 500px;
    text-align: center;
    position: relative;
  }

  .titleCont {
    position: relative;
    width: 1200px;
    margin: auto;
    height: 60px;
    border-bottom: 2px solid #d6d6d6;
    margin-top: 80px;
    margin-bottom: 68px;

    .title {
      position: absolute;
      top: 0px;
      left: 0px;
      font-size: 32px;
      font-weight: 700;
      color: #004930;
      padding-bottom: 7px;
      border-bottom: 5px solid #004930;
    }

    .title2 {
      text-align: right;
      font-size: 20px;
      font-weight: 400;
      color: #004930;
      line-height: 60px;
    }
  }

  .addressCont {
    display: flex;
    width: 1200px;
    margin: auto;
    margin-bottom: 70px;

    .address {
      width: 430px;
      height: 300px;
      background-color: #f8f8f8;
      padding: 30px 20px;

      .title {
        font-size: 20px;
        font-weight: 400;
        color: #004930;
        margin-bottom: 50px;
      }

      .item {
        margin-top: 20px;
        font-size: 17px;
        font-weight: 400;
        color: #004930;
        padding-bottom: 20px;
        border-bottom: 1px solid #d4d4d4;

        .lable {
          color: #2e2e2e;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }

    .addressMap {
      flex: 1;
      padding-left: 20px;
      position: relative;

      .yjdh {
        position: absolute;
        bottom: 0px;
        height: 50px;
        background-color: #e6e6e6;
        width: 750px;
        padding-top: 10px;

        .btn {
          cursor: pointer;
          margin: auto;
          text-align: center;
          width: 162px;
          height: 30px;
          background-color: #004930;
          border-radius: 15px;
          font-size: 20px;
          font-weight: normal;
          line-height: 27px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
