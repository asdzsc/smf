<template>
  <div class="gywm">
    <div class="banner"></div>
    <gywmHead name="品牌文化"></gywmHead>

    <div class="cont">
      <div class="ppwh1">
        <img src="/img/ppwh1.png" />
      </div>
      <div class="ppwh2">
        <div class="title1">
          企业责任
        </div>
        <div class="title2">
          我们不仅肩负着企业责任还要勇于承担社会责任和历史责任
        </div>
        <div class="ppwh2Img">
          <img src="/img/ppwh2.png" />
        </div>
      </div>
      <div class="ppwh3">
        <img src="/img/ppwh3.png" />
      </div>
      <div class="ppwh4">
        <div class="title1">
          石门峰员工特质
        </div>
        <div class="ppwh4Img">
          <img src="/img/ppwh4.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    gywmHead: () => import("@/pages/pc/views/gywm/components/gywm-head.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.gywm {
  .banner {
    background: url("/img/banner12.png") no-repeat center center;
    background-size: cover;
    height: 600px;
    text-align: center;
    position: relative;
  }
  .cont {
    width: 1200px;
    margin: auto;

    .ppwh1 {
      margin-top: 60px;
      text-align: center;
      img {
        max-width: 100%;
      }
    }
    .ppwh2 {
      margin-top: 80px;
      .title1 {
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        color: #333333;
      }
      .title2 {
        text-align: center;
        font-size: 24px;
        color: #666666;
      }
      .ppwh2Img {
        margin-top: 50px;
        text-align: center;
        img {
          max-width: 100%;
        }
      }
    }
    .ppwh3 {
      text-align: center;
      margin-top: 70px;
      img {
        max-width: 100%;
      }
    }
    .ppwh4 {
      text-align: center;
      margin-top: 60px;
      margin-bottom: 90px;
      .title1 {
        text-align: center;
        font-weight: 700;
        font-size: 32px;
        color: #333333;
      }
      .ppwh4Img {
        margin-top: 50px;
        text-align: center;
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
