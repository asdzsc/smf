<template>
  <div class="bwg">
    <div class="banner">
      <div class="titleCont">
        <div class="title">博 | 物 | 馆 | 聚 | 落</div>
        <div class="remark">英烈忠义传万代，后辈敬仰永记心</div>
      </div>
    </div>

    <div class="cardCont">
      <div
        @click="$router.push('/bwg/info?id=515317043283050496')"
        class="card"
        style="cursor: pointer"
      >
        <div class="left">
          <img class="cardImg" src="/img/bwg1.png" />
        </div>
        <div class="right">
          <img class="bg1" src="/img/bwg2.png" />
          <div class="intro">
            <div class="line"></div>
            <div class="title">辛亥革命纪念园</div>
            <div class="remark">
              辛亥革命纪念园建成于2011年即辛亥革命爆发一百周年之际。整个园区由三个部分组成：景观区、人文区和纪念区。被孙中山先生誉为打响辛亥首义第一枪的熊秉坤，武昌起义中打响“第一炮”的蔡汉卿，“辛亥首义三武”之一的张振武，早期同盟会会员杨时杰、李西屏等许多辛亥志士都安息于此。
            </div>
          </div>
        </div>
      </div>
      <div
        @click="$router.push('/bwg/info?id=515375899057012736')"
        class="card"
        style="cursor: pointer"
      >
        <div class="left">
          <img class="bg1" src="/img/bwg4.png" />
          <div class="intro">
            <div class="line"></div>
            <div class="title">武汉抗战纪念园</div>
            <div class="remark">
              纪念园由主入口广场、武汉保卫战纪念墙和英雄广场组成。在主入口广场的文化墙上，雕刻着许多记录武汉抗战历史的画面。在此之前，因为历史原因，全国都从未有过纪念武汉抗战的设施，因此，有媒体评价为：一座纪念墙，弥补一个城市的缺憾。
            </div>
          </div>
        </div>
        <div class="right">
          <img class="cardImg" src="/img/bwg3.png" />
        </div>
      </div>
    </div>

    <div class="cardCont museum">
      <div class="title">主 | 题 | 园 | 区</div>
      <div class="museumList">
        <table>
          <tr>
            <td
              @click="$router.push('/bwg/info?id=518218288238247937')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg5.png" />
                <div class="titleCont">
                  <div class="museumTitle">开国元勋雕塑园</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=515380794388594689')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg6.png" />
                <div class="titleCont">
                  <div class="museumTitle">保卫大武汉中国空军英烈墓园</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=515381642971791360')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg7.png" />
                <div class="titleCont">
                  <div class="museumTitle">感恩广场</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=518233318778290176')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg8.png" />
                <div class="titleCont">
                  <div class="museumTitle">东湖国际生态雕塑双年展</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="cardCont">
      <div
        @click="$router.push('/bwg/info?id=515384113068720128')"
        class="card"
        style="cursor: pointer"
      >
        <div class="left">
          <img class="cardImg" src="/img/bwg9.png" />
        </div>
        <div class="right">
          <img class="bg1" src="/img/bwg2.png" />
          <div class="intro">
            <div class="line"></div>
            <div class="title">湖北军民抗战博物馆</div>
            <div class="remark">
              湖北军民抗战博物馆展出的千余件珍贵藏品是石门峰历时多年研究、考证、从世界各地搜集而来的，其中不少是孤品。展览从湖北抗战和日军侵华罪证等不同侧面，向世人再现武汉会战中，军民同仇敌忾，团结一心，浴血奋战的历史场景，用铁的证据揭露日军侵华期间所犯下的累累罪行。
            </div>
          </div>
        </div>
      </div>
      <div
        @click="$router.push('/bwg/info?id=526303914752819200')"
        class="card"
        style="cursor: pointer"
      >
        <div class="left">
          <img class="bg1" src="/img/bwg4.png" />
          <div class="intro">
            <div class="line"></div>
            <div class="title">楚天将帅馆</div>
            <div class="remark">
              1955至1964年，中华人民共和国为1615名开国将帅授衔，其中湖北籍元帅1名、大将2名、上将14名、中将32名、少将187名，共计236名，名列全国第一位，被誉为“将军的摇篮”。建立楚天将帅馆，纪念和传承湖北将军们的革命精神和丰功伟绩，是石门峰纪念公园多年以来的夙愿，2016年适逢长征胜利80周年，在中国军事博物馆前馆长袁伟将军的大力支持下，楚天将帅馆终于和大家见面了。
            </div>
          </div>
        </div>
        <div class="right">
          <img class="cardImg" src="/img/bwg10.png" />
        </div>
      </div>
    </div>

    <div class="cardCont museum">
      <div class="title">室 | 内 | 场 | 馆</div>
      <div class="museumList">
        <table>
          <tr>
            <td
              @click="$router.push('/bwg/info?id=515386491062927360')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg11.png" />
                <div class="titleCont">
                  <div class="museumTitle">时代记忆馆</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=515389292618924033')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg12.png" />
                <div class="titleCont">
                  <div class="museumTitle">生活票证馆</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=515392416674955265')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg13.png" />
                <div class="titleCont">
                  <div class="museumTitle">百姓族谱馆</div>
                </div>
              </div>
            </td>
            <td
              @click="$router.push('/bwg/info?id=518235353057673216')"
              class="museumItem"
              style="cursor: pointer"
            >
              <div class="museumCont">
                <img src="/img/bwg14.png" />
                <div class="titleCont">
                  <div class="museumTitle">人生圆满博物馆</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <myserve></myserve>
  </div>
</template>

<script>
export default {
  components: {
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
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
    background: url("/img/banner17.png") no-repeat center center;
    background-size: cover;
    height: calc(100vh - 70px);
    text-align: center;
    position: relative;

    .titleCont {
      position: absolute;
      width: 100%;
      bottom: 0px;
      height: 200px;
      background-color: rgba(0, 73, 48, 0.8);

      .title {
        margin-top: 50px;
        height: 55px;
        text-align: center;
        font-size: 48px;
        font-weight: 400;
        line-height: 37px;
        letter-spacing: 4px;
        color: #ffffff;
      }

      .remark {
        margin-top: 15px;
        text-align: center;
        font-size: 24px;
        font-weight: normal;
        line-height: 37px;
        letter-spacing: 2px;
        color: #ffffff;
      }
    }
  }

  .cardCont {
    height: calc(100vh);

    .card {
      height: 50%;
      display: flex;

      .intro {
        position: absolute;
        top: 100px;

        .line {
          width: 215px;
          height: 4px;
          background-color: #004930;
        }

        .title {
          padding-top: 15px;
          font-size: 28px;
          font-weight: normal;
          letter-spacing: 3px;
          color: #004930;
        }

        .remark {
          padding-top: 40px;
          width: 500px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 2px;
          color: #666666;
          text-align: justify; /*实现两端对齐*/
          text-justify: newspaper; /*通过增加或减少字或字母之间的空格对齐文本*/
          word-break: break-all; /*允许在单词内换行*/
        }
      }

      .left {
        width: 50%;
        position: relative;

        .intro {
          right: 90px;

          .line {
            float: right;
          }

          .title {
            text-align: right;
          }
        }
      }

      .right {
        width: 50%;
        position: relative;

        .intro {
          left: 90px;
        }
      }

      .bg1 {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
      }

      .cardImg {
        width: 100%;
        height: 100%;
      }
    }

    &.museum {
      background-color: rgba(0, 73, 48, 0.05);

      .title {
        padding-top: 84px;
        font-size: 36px;
        text-align: center;
        color: #333333;
        letter-spacing: 4px;
      }

      .museumList {
        padding: 50px 0px;
        padding-bottom: 80px;
        margin: auto;
        width: 1600px;

        .museumItem {
          &:last-child {
            .museumCont {
              margin-right: 0px;
            }
          }

          .museumCont {
            position: relative;
            width: 366px;
            height: 632px;
            margin-right: 42px;

            img {
              width: 100%;
              height: 100%;
            }

            .titleCont {
              position: absolute;
              bottom: 40px;
              left: 50%;
              transform: translate(-50%);
              background-color: rgba(0, 73, 48, 0.7);
              margin: auto;
              padding: 10px 0px;
              height: 54px;
              width: 298px;

              .museumTitle {
                font-size: 20px;
                letter-spacing: 2px;
                color: #ffffff;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .bwg {
    min-width: 1200px;

    .banner {
      .titleCont {
        height: 120px;
        background-color: #004930;
        background-color: rgba(0, 73, 48, 0.8);

        .title {
          margin-top: 20px;
          font-size: 36px;
          line-height: 20px;
        }

        .remark {
          margin-top: 5px;
          font-size: 16px;
          line-height: 10px;
        }
      }
    }

    .cardCont {
      .card {
        .intro {
          top: 70px;

          .remark {
            padding-top: 5px;
          }
        }
      }

      &.museum {
        .title {
          padding-top: 44px;
          font-size: 28px;
        }

        .museumList {
          padding: 30px 0px;
          padding-bottom: 50px;
          width: 1200px;

          .museumItem {
            &:last-child {
              .museumCont {
                margin-right: 0px;
              }
            }

            .museumCont {
              width: 280px;
              height: 466px;
              margin-right: 22px;

              .titleCont {
                bottom: 40px;
                height: 44px;
                width: 212px;

                .museumTitle {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
