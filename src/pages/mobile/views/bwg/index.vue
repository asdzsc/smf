<template>
  <div class="bwg">
    <div class="banner"></div>

    <div @click="$router.push('/bwg/info?id=515317043283050496')" class="card">
      <img src="/img/mobile/bwg1.png" />
      <div class="line"></div>
      <div class="title">辛亥革命纪念园</div>
      <div class="intro">
        辛亥革命纪念园建成于2011年即辛亥革命爆发一百周年之际。整个园区由三个部分组成：景观区、人文区和纪念区。被孙中山先生誉为打响辛亥首义第一枪的熊秉坤，武昌起义中打响“第一炮”的蔡汉卿，“辛亥首义三武”之一的张振武，早期同盟会会员杨时杰、李西屏等许多辛亥志士都安息于此。
      </div>
    </div>

    <div @click="$router.push('/bwg/info?id=515375899057012736')" class="card">
      <img src="/img/mobile/bwg2.png" />
      <div class="line"></div>
      <div class="title">武汉抗战纪念园</div>
      <div class="intro">
        纪念园由主入口广场、武汉保卫战纪念墙和英雄广场组成。在主入口广场的文化墙上，雕刻着许多记录武汉抗战历史的画面。在此之前，因为历史原因，全国都从未有过纪念武汉抗战的设施，因此，有媒体评价为：一座纪念墙，弥补一个城市的缺憾。
      </div>
    </div>

    <div class="museum">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item
          @click="$router.push('/bwg/info?id=518218288238247937')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg3.png" />
          <div class="titleCont">
            <div class="title">开国元勋雕塑园</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=515380794388594689')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg4.png" />
          <div class="titleCont">
            <div class="title">保卫大武汉中国空军英烈墓园</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=515381642971791360')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg5.png" />
          <div class="titleCont">
            <div class="title">感恩广场</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=518233318778290176')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg6.png" />
          <div class="titleCont">
            <div class="title">东湖国际生态雕塑双年展</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div @click="$router.push('/bwg/info?id=515384113068720128')" class="card">
      <img src="/img/mobile/bwg7.png" />
      <div class="line"></div>
      <div class="title">湖北军民抗战博物馆</div>
      <div class="intro">
        湖北军民抗战博物馆展出的千余件珍贵藏品是石门峰历时多年研究、考证、从世界各地搜集而来的，其中不少是孤品。展览从湖北抗战和日军侵华罪证等不同侧面，向世人再现武汉会战中，军民同仇敌忾，团结一心，浴血奋战的历史场景，用铁的证据揭露日军侵华期间所犯下的累累罪行。
      </div>
    </div>

    <div @click="$router.push('/bwg/info?id=526303914752819200')" class="card">
      <img src="/img/mobile/bwg8.png" />
      <div class="line"></div>
      <div class="title">楚天将帅馆</div>
      <div class="intro">
        1955至1964年，中华人民共和国为1615名开国将帅授衔，其中湖北籍元帅1名、大将2名、上将14名、中将32名、少将187名，共计236名，名列全国第一位，被誉为“将军的摇篮”。建立楚天将帅馆，纪念和传承湖北将军们的革命精神和丰功伟绩，是石门峰纪念公园多年以来的夙愿，2016年适逢长征胜利80周年，在中国军事博物馆前馆长袁伟将军的大力支持下，楚天将帅馆终于和大家见面了。
      </div>
    </div>

    <div class="museum">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item
          @click="$router.push('/bwg/info?id=515386491062927360')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg9.png" />
          <div class="titleCont">
            <div class="title">时代记忆馆</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=515389292618924033')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg10.png" />
          <div class="titleCont">
            <div class="title">生活票证馆</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=515392416674955265')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg11.png" />
          <div class="titleCont">
            <div class="title">百姓族谱馆</div>
          </div>
        </van-grid-item>
        <van-grid-item
          @click="$router.push('/bwg/info?id=518235353057673216')"
          class="museumItem"
        >
          <img src="/img/mobile/bwg12.png" />
          <div class="titleCont">
            <div class="title">人生圆满博物馆</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.bwg {
  .banner {
    background: url("/img/mobile/banner17.jpg") no-repeat center center;
    background-size: cover;
    height: 14.8rem;
    text-align: center;
  }

  .card {
    padding: 0.4rem;

    img {
      width: 100%;
      height: 4.2rem;
    }

    .line {
      margin-top: 0.4rem;
      width: 2.15rem;
      height: 4px;
      background-color: #004930;
    }

    .title {
      margin-top: 0.2rem;
      font-size: 0.32rem;
      font-weight: 400;
      letter-spacing: 3px;
      color: #004930;
    }

    .intro {
      margin-top: 0.4rem;
      font-size: 0.3rem;
      line-height: 0.51rem;
      letter-spacing: 3px;
      color: #666666;
    }
  }

  .museum {
    background-color: rgba(0, 73, 48, 0.05);
    padding: 0.4rem 0.2rem;

    .museumItem {
      /deep/ .van-grid-item__content--center {
        padding: 0px;
      }

      img {
        width: 100%;
        height: 4.37rem;
      }

      .titleCont {
        width: 100%;
        height: 1rem;
        background-color: #004930;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
          padding: 0px 10px;
          text-align: center;
          font-size: 0.3rem;
          letter-spacing: 3px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
