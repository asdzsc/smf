<template>
  <div>
    <gywmTabs ref="gywmTabs"></gywmTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner11.png" />
    </div>
    <div class="cont">
      <div
        class="titleCont"
        style="padding-top:0.5rem; padding-bottom: 0.2rem;"
      >
        <div class="titleLine"></div>
        <div class="title">
          品牌故事
        </div>
      </div>
      <div class="intro">
        <p class="text">
          石门峰位于东湖之滨的九峰城市森林保护区，由纪念公园和名人文化公园组成，是全国殡葬改革示范单位、湖北省国防教育基地、武汉市爱国主义教育基地。纪念公园有“日月星光、山川林海”八大福陵，名门望族、先贤智者多长眠于此，是纪念先人、福荫后代的风水宝地。名人文化公园有“开国元勋雕塑园、辛亥革命纪念园、武汉抗战纪念园、中国抗日空军烈士纪念碑、湖北军民抗战博物馆、圆满人生博物馆、楚天将帅馆、时代记忆馆”等纪念园区和博物馆群落。在这里可以看到武汉这片土地凝固了的编年史，在这里可以寻找到生命的意义……
        </p>

        <van-grid :column-num="2" :border="false">
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs2.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs3.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs4.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs5.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/ppgs6.png" />
          </van-grid-item>
        </van-grid>
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

  .intro {
    font-size: 0.24rem;
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
