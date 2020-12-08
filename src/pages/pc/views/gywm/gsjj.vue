<template>
  <div class="gywm">
    <div class="banner"></div>
    <gywmHead name="公司简介"></gywmHead>

    <div class="cont">
      <div class="topImg">
        <img src="/img/zxfw35.png" />
      </div>
      <div class="titleCont">
        <div class="titleLine"></div>
        <div class="title">
          公司简介
        </div>
      </div>
      <div class="intro">
        <div class="introCont">
          <p>
            石门峰纪念公园位于武汉中心城区九峰城市森林保护区，占地面积1109亩，是全国殡葬改革示范单位、湖北省国防教育基地、武汉市爱国主义教育基地和关心下一代党史国史教育基地。
          </p>
          <p>
            二十多年来，石门峰纪念公园按“公墓变公园+博物馆”的发展模式，陆续建成由“日、月、星、光、山、川、林、海”八大纪念园区和“开国元勋雕塑园”、“辛亥革命纪念园”、“武汉抗战纪念园”、“保卫大武汉中国抗日空军烈士纪念墓园”、“湖北军民抗战博物馆”、“楚天将帅馆”、“时代记忆馆”、“生活票证馆”、“百姓族谱馆”及“圆满人生博物馆”等博物馆聚落组成的现代化人文纪念公园。
          </p>
          <p>
            未来，石门峰纪念公园将继续以企业责任、社会责任、历史责任为重，集人文艺术、文化、旅游、教育、殡葬及配套服务创新为一体，深耕生命文化产业，力争打造一座凝聚生命艺术、承载武汉城市编年史的文艺殿堂。
          </p>
        </div>
        <div class="introImgs">
          <div class="imgItem">
            <img src="/img/zxfw36.png" />
          </div>
          <div class="imgItem">
            <img src="/img/zxfw37.png" />
          </div>
          <div class="imgItem">
            <img src="/img/zxfw38.png" />
          </div>
          <div class="imgItem">
            <img src="/img/zxfw39.png" />
          </div>
          <div class="imgItem">
            <img src="/img/zxfw40.png" />
          </div>
          <div class="imgItem">
            <img src="/img/zxfw41.png" />
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
    background: url("/img/banner9.png") no-repeat center center;
    background-size: cover;
    height: 600px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;
    .topImg {
      text-align: center;
      margin-top: 60px;
    }
    .titleCont {
      display: flex;
      margin-top: 20px;
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
        p {
          margin-bottom: 30px;
          &:last-child {
            margin-bottom: 0px;
          }
        }
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
