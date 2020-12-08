<template>
  <div class="w1920 zxfw">
    <div class="banner"></div>
    <zxfwTitle title="墓碑保洁服务"></zxfwTitle>

    <div class="cont">
      <div class="title">日式保洁、服务升级</div>
      <div class="title2">服务增加消杀护理环节</div>
      <div class="contImg">
        <img src="/img/zxfw31.png" />
      </div>
    </div>

    <div class="cont">
      <div class="title">套餐内容</div>
      <div class="contImg">
        <img src="/img/zxfw32.png" />
      </div>
    </div>

    <div class="cont">
      <div class="title">您需要一份日式墓碑保洁服务</div>
      <div class="contImg">
        <img src="/img/zxfw33.png" />
      </div>
    </div>

    <div class="cont" style="padding-bottom: 100px;">
      <div class="title">进口日式工具组 有效清除顽渍尘污</div>
      <div class="contImg">
        <img src="/img/zxfw34.png" />
      </div>
    </div>

    <myserve></myserve>
    <zxfwLjyy goodsId="491476945640824833"></zxfwLjyy>
  </div>
</template>
<script>
export default {
  components: {
    zxfwTitle: () => import("@/pages/pc/views/zxfw/components/zxfw-title.vue"),
    zxfwLjyy: () => import("@/pages/pc/views/zxfw/components/zxfw-ljyy.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.zxfw {
  .banner {
    background: url("/img/banner8.png") no-repeat center center;
    background-size: cover;
    height: 540px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;
    margin-top: 100px;

    .title {
      text-align: center;
      font-size: 36px;
      letter-spacing: 2px;
      color: #333333;
    }

    .title2 {
      padding-top: 10px;
      text-align: center;
      font-size: 24px;
      letter-spacing: 1px;
      color: #666666;
    }

    .contImg {
      padding-top: 20px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
