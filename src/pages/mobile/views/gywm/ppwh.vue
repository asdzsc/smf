<template>
  <div>
    <gywmTabs ref="gywmTabs"></gywmTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner12.png" />
    </div>
    <div class="cont">
      <div style="padding:0.5rem 0.9rem 1rem;">
        <van-image src="/img/mobile/ppwh1.png"></van-image>
      </div>

      <div class="title1">
        企业责任
      </div>
      <div class="title2" style="padding-top: 0.1rem;">
        我们不仅肩负着企业责任，还要勇于承担社会责任和历史责任
      </div>
      <div style="padding-top: 0.3rem;">
        <van-image src="/img/mobile/ppwh2.png"></van-image>
      </div>
      <div style="padding: 1rem 0.5rem 0rem;">
        <van-image src="/img/mobile/ppwh3.png"></van-image>
      </div>

      <div
        class="titleCont"
        style="padding-top:0.5rem; padding-bottom: 0.2rem;"
      >
        <div class="titleLine"></div>
        <div class="title">
          石门峰员工特质
        </div>
      </div>
      <div>
        <van-image src="/img/mobile/ppwh4.png"></van-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    gywmTabs: () => import("@/pages/mobile/views/gywm/components/gywm-tabs.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.banner {
  .bannerImg {
    width: 100%;
    height: 5rem;
  }
}

.cont {
  .titleCont {
    display: flex;
    padding: 0rem 0.4rem;

    .titleLine {
      width: 8px;
      height: 0.4rem;
      background-color: #004930;
    }

    .title {
      padding-left: 0.25rem;
      font-weight: 700;
      line-height: 0.5rem;
      color: #666666;
      font-size: 0.32rem;
      letter-spacing: 1px;
    }
  }

  .title1 {
    text-align: center;
    font-size: 0.36rem;
    font-weight: normal;
    color: #004930;
  }

  .title2 {
    text-align: center;
    font-size: 0.3rem;
    color: #333333;
  }

  .intro {
    font-size: 0.3rem;
    line-height: 0.5rem;
    letter-spacing: 1px;
    color: #333333;
    padding: 0rem 0.4rem;
    padding-bottom: 0.8rem;

    .text {
      text-indent: 2em;
    }

    /deep/ .van-grid-item__content {
      padding: 0.1rem 0rem;

      .itemImg {
        width: 3rem;
        height: 1.6rem;
      }
    }

    .map {
      width: 5.5rem;
      height: 3rem;
      margin: auto;
      margin-top: 0.5rem;

      .amapContainer {
        height: 100%;
      }
    }
  }
}
</style>
