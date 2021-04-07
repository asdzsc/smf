<template>
  <div class="footBg">
    <div class="footContent">
      <table class="footTable">
        <tr>
          <td class="menu">
            <table>
              <tr>
                <td class="title">关于我们</td>
                <td class="title">公司新闻</td>
                <td class="title">在线服务</td>
                <td class="title">博物馆聚落</td>
                <td class="title">纪念园区</td>
              </tr>
              <tr>
                <td class="menuName">
                  <div @click="$router.push('/gywm/gsjj')">公司简介</div>
                  <div @click="$router.push('/gywm/gsry')">公司荣誉</div>
                  <div @click="$router.push('/gywm/ppgs')">品牌故事</div>
                  <div @click="$router.push('/gywm/ppwh')">品牌文化</div>
                  <div @click="$router.push('/gywm/qysp')">企业视频</div>
                </td>
                <td class="menuName">
                  <div @click="$router.push('/xwzx/ggzx')">公告中心</div>
                  <div @click="$router.push('/xwzx/xwdt')">新闻动态</div>
                  <div @click="$router.push('/xwzx/zbgg')">招标广告</div>
                </td>
                <td class="menuName">
                  <div @click="$router.push('/zxfw/mfsmfw')">免费上门服务</div>
                  <div @click="$router.push('/zxfw/rsjnfw')">人生纪念服务</div>
                  <div @click="$router.push('/zxfw/azlyfw')">安葬礼仪服务</div>
                  <div @click="$router.push('/zxfw/jmhxfw')">旧墓换新服务</div>
                  <div @click="$router.push('/zxfw/mbbjfw')">墓碑保洁服务</div>
                </td>
                <td class="menuName">
                  <div @click="$router.push('/bwg/info?id=515384113068720128')">
                    湖北军民抗战博物馆
                  </div>
                  <div @click="$router.push('/bwg/info?id=526303914752819200')">
                    楚天将帅馆
                  </div>
                  <div @click="$router.push('/bwg/info?id=515386491062927360')">
                    时代记忆馆
                  </div>
                  <div @click="$router.push('/bwg/info?id=515389292618924033')">
                    生活票证馆
                  </div>
                  <div @click="$router.push('/bwg/info?id=515392416674955265')">
                    百姓族谱馆
                  </div>
                  <div>人生圆满博物馆</div>
                </td>
                <td class="menuName">
                  <div @click="$router.push('/bwg/info?id=515317043283050496')">
                    辛亥革命纪念园
                  </div>
                  <div @click="$router.push('/bwg/info?id=515375899057012736')">
                    武汉抗战纪念园
                  </div>
                  <div @click="$router.push('/bwg/info?id=518218288238247937')">
                    开国元勋雕塑园
                  </div>
                  <div @click="$router.push('/bwg/info?id=515380794388594689')">
                    保卫大武汉中国抗战空军纪念墓园
                  </div>
                  <div @click="$router.push('/bwg/info?id=515381642971791360')">
                    感恩广场
                  </div>
                </td>
              </tr>
            </table>
          </td>
          <td class="code">
            <img src="/img/code.jpg" alt="" />
            <div class="codeText">关注石门峰公众号更多了解我们</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="copyright">
      ©2019<span style="padding: 0 5px"></span>武汉石门峰纪念公园有限公司<span
        style="padding: 0 5px"
      ></span
      >版权所有<span style="padding: 0 20px"></span>
      <div>
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          style="color: #ffffff"
        >
          <img src="/img/beian.png" />
          鄂ICP备15004424号-1</a
        >
      </div>
    </div>

    <div v-if="showBackTop" class="backTop pointer">
      <!-- <div class="item">
        <i class="iconfont iconweixin"></i>
      </div> -->
      <a-popover placement="left">
        <template slot="content">
          <img src="/img/code.jpg" alt="" />
        </template>
        <div class="item pointer">
          <i class="iconfont iconQRcode"></i>
        </div>
      </a-popover>
      <div class="item pointer" @click="toTop()">
        <i class="iconfont iconfanhuidingbu"></i>
        <div>顶部</div>
      </div>
    </div>

    <img src="/img/zixun.jpg" class="zixungirl pointer" alt="" />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "myhead",
  data() {
    return {
      showBackTop: false,
    };
  },
  computed: {},
  mounted() {
    var vm = this;
    $(window).scroll(function() {
      var topp = $(document).scrollTop();
      if (topp >= 100) {
        vm.showBackTop = true;
      } else {
        vm.showBackTop = false;
      }
    });
  },
  methods: {
    toTop() {
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth"
      // });
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    },
  },
};
</script>

<style lang="less" scoped>
.footBg {
  background-color: #004930;
  color: #fff;
  height: 670px;
  position: relative;

  .backTop {
    width: 53px;
    height: 150px;
    background-color: rgba(155, 155, 155, 0.8);
    border-radius: 5px;
    position: fixed;
    right: 15px;
    bottom: 50px;

    .item {
      height: 50%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;

      .iconfont {
        font-size: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:last-child {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .iconfont {
          font-size: 30px;
          height: 22px;
        }
      }
    }
  }

  .zixungirl {
    position: fixed;
    top: 80px;
    right: 15px;
    z-index: 2;
  }

  .footContent {
    display: flex;
    width: 1477px;
    margin: auto;
    padding-top: 135px;

    .footTable {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0px;

      .menu {
        width: 1170px;

        .title {
          font-size: 19px;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          padding-right: 100px;
          padding-bottom: 10px;

          &:last-child {
            padding-right: 0px;
          }
        }

        .menuName {
          vertical-align: top;
          line-height: 35px;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 1px;
          padding-top: 15px;
          padding-right: 100px;

          &:last-child {
            padding-right: 0px;
          }

          div {
            cursor: pointer;
          }
        }
      }

      .code {
        padding-left: 130px;
        text-align: center;

        .codeText {
          width: 140px;
          text-align: center;
          font-size: 16px;
          margin: auto;
          margin-top: 15px;
          font-weight: 400;
          line-height: 25px;
        }

        img {
          border-radius: 5px;
          width: 165px;
          height: 165px;
        }
      }
    }
  }

  .copyright {
    padding-top: 180px;
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-weight: 200;
    letter-spacing: 3px;
  }
}

@media screen and (max-width: 1600px) {
  .footBg {
    .footContent {
      width: 1200px;

      .footTable {
        .menu {
          width: 1170px;

          .title {
            font-size: 16px;
            padding-right: 80px;
          }

          .menuName {
            font-size: 16px;
            padding-right: 20px;
          }
        }

        .code {
          padding-left: 0px;
        }
      }
    }

    .copyright {
      font-size: 16px;
    }
  }
}
</style>
