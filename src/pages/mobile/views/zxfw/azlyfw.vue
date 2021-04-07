<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner5.png" />
    </div>

    <div class="cont">
      <div class="title" style="padding-top: 0.8rem;">礼仪追思 无忧圆满</div>

      <div class="itemImg">
        <van-image fit="cover" src="/img/mobile/azlyfw1.png" />
      </div>
      <div class="itemImg">
        <van-image fit="cover" src="/img/mobile/azlyfw2.png" />
      </div>
      <div class="itemImg">
        <van-image fit="cover" src="/img/mobile/azlyfw3.png" />
      </div>
      <div class="itemImg">
        <van-image fit="cover" src="/img/mobile/azlyfw4.png" />
      </div>
    </div>

   <!-- <div class="cont">
      <div class="title" style="padding-top: 1.45rem;">人生告别太单调、让人伤心和伤感</div>
      <van-grid :column-num="2" :border="false" style="padding:0rem 0.4rem;">
        <van-grid-item>
          <div>
            <van-image class="itemImg2" src="/img/mobile/azlyfw5.png" />
          </div>
          <div class="title2">
            现场清理粗糙
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <van-image class="itemImg2" src="/img/mobile/azlyfw6.png" />
          </div>
          <div class="title2">
            没有鲜花和告别
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <van-image class="itemImg2" src="/img/mobile/azlyfw7.png" />
          </div>
          <div class="title2">
            亲人没人照顾
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            <van-image class="itemImg2" src="/img/mobile/azlyfw8.png" />
          </div>
          <div class="title2">
            简单下葬伤心又伤感
          </div>
        </van-grid-item>
      </van-grid>
    </div> -->

    <div class="cont">
      <div class="title" style="padding-top: 1.17rem;">
        葬礼服务——让告别变美丽
      </div>
      <div class="title2">
        礼仪追思，专属人生葬礼服务，全面解决人生告别的最后烦忧
      </div>
      <div style="padding-top: 0.8rem;">
        <van-image src="/img/mobile/azlyfw9.png" />
      </div>
    </div>

    <div class="cont" style="padding-bottom: 0.3rem;">
      <div class="title" style="padding-top: 1.17rem;">
        百里挑一的金牌礼仪师
      </div>
      <div class="title2">
        懂得生命文化的金牌礼仪师，十大技能考核，严选标准服务
      </div>
      <div style="padding-top: 0.8rem;">
        <van-image src="/img/mobile/azlyfw10.png" />
      </div>
    </div>

    <zxfwLjyy ref="zxfwLjyy" goodsId="491476588290318337"></zxfwLjyy>
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

  .itemImg {
    padding: 0rem 0.4rem;
    text-align: center;
    padding-top: 0.6rem;
  }

  .itemImg2 {
    width: 3rem;
    height: 2.42rem;
  }
}
</style>
