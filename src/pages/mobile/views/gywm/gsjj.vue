<template>
  <div>
    <gywmTabs ref="gywmTabs"></gywmTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner9.png" />
    </div>
    <div class="cont">
      <div
        class="titleCont"
<<<<<<< HEAD
        style="padding-top: 0.5rem; padding-bottom: 0.2rem"
      >
        <div class="titleLine"></div>
        <div class="title">公司简介</div>
      </div>
      <div class="intro">
        <p class="text">
          石门峰纪念公园位于武汉中心城区九峰城市森林保护区，占地面积1110亩，是全国殡葬改革示范单位、全国学雷锋先进单位、2020中国品牌影响力（文旅行业）十大消费者优选品牌、2020中国公益慈善十大影响力企业、湖北省国防教育基地、武汉市爱国主义教育基地和关心下一代党史国史教育基地。
        </p>
        <div style="padding-top: 0.4rem">
=======
        style="padding-top:0.5rem; padding-bottom: 0.2rem;"
      >
        <div class="titleLine"></div>
        <div class="title">
          公司简介
        </div>
      </div>
      <div class="intro">
        <p class="text">
          石门峰纪念公园位于武汉中心城区九峰城市森林保护区，占地面积1109亩，是全国殡葬改革示范单位、湖北省国防教育基地、武汉市爱国主义教育基地和关心下一代党史国史教育基地。
        </p>
        <div style="padding-top: 0.4rem;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          <van-image
            width="6.6rem"
            height="3.8rem"
            fit="cover"
            src="/img/mobile/gsjj1.png"
          />
        </div>
        <p class="text">
<<<<<<< HEAD
          二十多年来，石门峰纪念公园按“公墓变公园+博物馆”的发展模式，陆续建成由
          “日、月、星、光、山、川、林、海”
          八大纪念园区和“开国元勋雕塑园”、“辛亥革命纪念园”、
          “武汉抗战纪念园”、“保卫大武汉中国抗日空军烈士纪念墓园”、
          “湖北军民抗战博物馆”、“楚天将帅馆”、 “时代记忆馆”、 “生活票证馆”、
          “百姓族谱馆” 及 “人生圆满博物馆”
          等博物馆聚落组成的现代化人文纪念公园。围绕着可持续发展的绿色生态理念，石门峰纪念公园还通过持续举办“东湖国际生态雕塑双年展”，邀请全球艺术家用艺术的语言与生命对话，用艺术的手法诠释生命美学，为武汉的未来留下宝贵的文化遗产。
        </p>
        <div style="padding-top: 0.4rem">
=======
          二十多年来，石门峰纪念公园按“公墓变公园+博物馆”的发展模式，陆续建成由“日、月、星、光、山、川、林、海”八大纪念园区和“开国元勋雕塑园”、“辛亥革命纪念园”、“武汉抗战纪念园”、“保卫大武汉中国抗日空军烈士纪念墓园”、“湖北军民抗战博物馆”、“楚天将帅馆”、“时代记忆馆”、“生活票证馆”、“百姓族谱馆”及“圆满人生博物馆”等博物馆聚落组成的现代化人文纪念公园。
        </p>
        <div style="padding-top: 0.4rem;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          <van-image
            width="6.6rem"
            height="3.8rem"
            fit="cover"
            src="/img/mobile/gsjj2.png"
          />
        </div>
        <p class="text">
          未来，石门峰纪念公园将继续以企业责任、社会责任、历史责任为重，集人文艺术、文化、旅游、教育、殡葬及配套服务创新为一体，深耕生命文化产业，力争打造一座凝聚生命艺术、承载武汉城市编年史的文艺殿堂。
        </p>
<<<<<<< HEAD
        <div style="padding-top: 0.4rem">
=======
        <div style="padding-top: 0.4rem;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          <van-image
            width="6.6rem"
            height="3.8rem"
            fit="cover"
            src="/img/mobile/gsjj3.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
<<<<<<< HEAD
    gywmTabs: () =>
      import("@/pages/mobile/views/gywm/components/gywm-tabs.vue"),
=======
    gywmTabs: () => import("@/pages/mobile/views/gywm/components/gywm-tabs.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {};
  },
<<<<<<< HEAD
  mounted() {},
  methods: {},
=======
  mounted() {
	},
  methods: {}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
    font-size: 0.3rem;
=======
    font-size: 0.24rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    line-height: 0.5rem;
    letter-spacing: 1px;
    color: #333333;
    padding: 0rem 0.4rem;
    padding-bottom: 0.8rem;

    .text {
      text-indent: 2em;
    }
  }
}
</style>
