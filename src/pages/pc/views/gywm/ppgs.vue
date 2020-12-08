<template>
  <div class="gywm">
    <div class="banner"></div>
    <gywmHead name="品牌故事"></gywmHead>

    <div class="cont">
      <div class="titleCont">
        <div class="titleLine"></div>
        <div class="title">
          公司简介
        </div>
      </div>
      <div class="intro">
        <div class="introCont">
          <p>
            石门峰位于东湖之滨的九峰城市森林保护区，由纪念公园和名人文化公园组成，是全国殡葬改革示范单位、湖北省国防教育基地、武汉市爱国主义教育基地。
            纪念公园有“日月星光、山川林海
            ”八大福陵，名门望族、先贤智者多长眠于此，是纪念先人、福荫后代的风水宝地。名人文化公园有“开国元勋雕塑园、辛亥革命纪念园、武汉抗战纪念园、中国抗日空军烈士纪念碑、湖北军民抗战博物馆、圆满人生博物馆、楚天将帅馆、时代记忆馆”等纪念园区和博物馆群落。
            在这里可以看到武汉这片土地凝固了的编年史，在这里可以寻找到生命的意义……
          </p>
        </div>
        <div class="introImgs">
          <div class="imgItem">
            <img src="/img/ppgs1.png" />
          </div>
          <div class="imgItem">
            <img src="/img/ppgs2.png" />
          </div>
          <div class="imgItem">
            <img src="/img/ppgs3.png" />
          </div>
          <div class="imgItem">
            <img src="/img/ppgs4.png" />
          </div>
          <div class="imgItem">
            <img src="/img/ppgs5.png" />
          </div>
          <div class="imgItem">
            <img src="/img/ppgs6.png" />
          </div>
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
    background: url("/img/banner11.png") no-repeat center center;
    background-size: cover;
    height: 600px;
    text-align: center;
    position: relative;
  }
  .cont {
    width: 1200px;
    margin: auto;

    .titleCont {
      display: flex;
      margin-top: 60px;
      .titleLine {
        width: 8px;
        height: 40px;
        background-color: #004930;
      }
      .title {
        padding-left: 25px;
        font-size: 24px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 1px;
        color: #666666;
      }
    }
    .intro {
      margin-top: 20px;
      margin-bottom: 60px;
      .introCont {
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
        color: #333333;
        text-indent: 2em;
      }
      .introImgs {
        margin-top: 50px;
        display: inline-block;
        .imgItem {
          width: 380px;
          height: 220px;
          float: left;
          margin-right: 30px;
          margin-bottom: 30px;
          &:nth-child(3n + 3) {
            margin-right: 0px;
          }
          img {
            width: 380px;
            height: 220px;
          }
        }
      }
    }
  }
}
</style>
