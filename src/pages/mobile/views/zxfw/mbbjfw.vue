<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner8.png" />
    </div>

    <div class="cont" style="padding-top: 0.7rem;">
      <div class="title">日式保洁 品质升级</div>
      <div class="title2">服务增加全面清理消毒环节</div>
      <div style="padding-top: 0.6rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw1.png" />
      </div>
    </div>

    <div class="cont" style="padding-top: 1rem;">
      <div class="title">套餐内容</div>
      <div style="padding-top: 0.5rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw2.png" />
      </div>
    </div>

    <div class="cont" style="padding-top: 1rem;">
      <div class="title">您需要一份日式墓碑保洁服务</div>
      <div style="padding-top: 0.5rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw3.png" />
      </div>
    </div>

    <div class="cont" style="padding-top: 1rem; padding-bottom: 1rem;">
      <div class="title">进口日式工具组 有效清除顽渍尘污</div>

      <div style="padding: 0.5rem 0.4rem 0rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw4.png" />
      </div>
      <div class="title3" style="padding-top: 0.4rem;">双桶清洁</div>
      <div class="title4">清污水全分离，双桶双用更清洁</div>

      <div style="padding: 1rem 0.4rem 0rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw5.png" />
      </div>
      <div class="title3" style="padding-top: 0.4rem;">七色保洁布</div>
      <div class="title4">干湿分离、分区使用</div>

      <div style="padding: 1rem 0.4rem 0rem;">
        <van-image fit="fill" src="/img/mobile/mbbjfw6.png" />
      </div>
      <div class="title3" style="padding-top: 0.4rem;">专业工具组合</div>
      <div class="title4">分功能搭配使用，有效提升清洁效率</div>
    </div>

    <zxfwLjyy ref="zxfwLjyy"></zxfwLjyy>
  </div>
</template>

<script>
export default {
  components: {
    zxfwTabs: () => import("@/pages/mobile/views/zxfw/components/zxfw-tabs.vue"),
    zxfwLjyy: () => import("@/pages/mobile/views/zxfw/components/zxfw-ljyy.vue")
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

  .title3 {
    font-size: 0.32rem;
    letter-spacing: 2px;
    color: #333333;
    text-align: center;
  }

  .title4 {
    font-size: 0.24rem;
    letter-spacing: 1px;
    color: #333333;
    text-align: center;
  }
}
</style>
