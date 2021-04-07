<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner7.png" />
    </div>

    <div class="cont" style="padding-top: 0.7rem">
      <div class="bannerTitle">
        <div class="text1">艺术墓碑设计首创不取福盒换新</div>
      </div>

      <div class="title">深度服务 品质升级</div>
      <div class="title2">服务增加全面清理消毒环节</div>
      <div style="padding-top: 0.6rem">
        <van-image fit="fill" src="/img/mobile/jmhxfw1.png" />
      </div>
    </div>

    <div class="cont" style="padding-top: 1rem; padding-bottom: 1.2rem">
      <div class="title">安心服务 旧墓换新</div>
      <div class="title2">服务增加全面清理消毒环节</div>
      <div style="padding: 0rem 1rem; padding-top: 0.6rem">
        <van-image fit="fill" src="/img/mobile/jmhxfw2.png" />
      </div>
    </div>

    <div class="cont intro">
      <van-row type="flex" justify="center">
        <van-col class="itemCont">
          <van-image src="/img/mobile/jmhxfw3.png" />
        </van-col>
        <van-col class="itemCont">
          <div class="title4 right">磨</div>
          <div class="title3 right">手工打磨精工细作<br />拒绝机器暴力抛光</div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col class="itemCont">
          <div class="title4 left">孝</div>
          <div class="title3 left">
            首创不取福盒换新<br />不搅扰亲人才是福孝双全
          </div>
        </van-col>
        <van-col class="itemCont">
          <van-image src="/img/mobile/jmhxfw4.png" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col class="itemCont">
          <van-image src="/img/mobile/jmhxfw5.png" />
        </van-col>
        <van-col class="itemCont">
          <div class="title4 right">亮</div>
          <div class="title3 right">要明亮、不要油亮</div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col class="itemCont">
          <div class="title4 left">色</div>
          <div class="title3 left">
            还原本色<br />
            可能连你都没见过的<br />
            一面终将呈现<br />
          </div>
        </van-col>
        <van-col class="itemCont">
          <van-image src="/img/mobile/jmhxfw6.png" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col class="itemCont">
          <van-image src="/img/mobile/jmhxfw7.png" />
        </van-col>
        <van-col class="itemCont">
          <div class="title4 right">净</div>
          <div class="title3 right">
            干燥杀菌<br />
            让亲人住的窗明洁净<br />
            福孝双全<br />
          </div>
        </van-col>
      </van-row>
    </div>

    <zxfwLjyy ref="zxfwLjyy" goodsId="491476786345353217"></zxfwLjyy>
  </div>
</template>

<script>
export default {
  components: {
    zxfwTabs: () =>
      import("@/pages/mobile/views/zxfw/components/zxfw-tabs.vue"),
    zxfwLjyy: () =>
      import("@/pages/mobile/views/zxfw/components/zxfw-ljyy.vue"),
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
  .bannerTitle {
    padding-bottom: 0.6rem;
    .text1 {
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 0.44rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #333333;
    }
  }

  .title {
    text-align: center;
    font-size: 0.36rem;
    font-weight: 700;
    color: #333333;
  }

  .title2 {
    font-size: 0.24rem;
    color: #666666;
    text-align: center;
    padding-top: 0.3rem;
  }

  &.intro {
    padding: 0.8rem 0.4rem 1rem;
    background-color: #f3f3f3;

    .itemCont {
      width: 3.35rem;
      height: 2.4rem;
      background-color: #ffffff;

      .title4 {
        padding-top: 0.4rem;
        font-size: 0.3rem;
        font-weight: 700;
        &.left {
          padding-right: 0.2rem;
          text-align: right;
        }

        &.right {
          padding-left: 0.2rem;
          text-align: left;
        }
      }

      .title3 {
        padding-top: 0.1rem;
        font-size: 0.3rem;
        color: #333333;
        line-height: 0.4rem;
        &.left {
          padding-right: 0.2rem;
          text-align: right;
        }

        &.right {
          padding-left: 0.2rem;
          text-align: left;
        }
      }

      .van-image {
        width: 3.35rem;
        height: 2.4rem;
      }
    }
  }
}
</style>
