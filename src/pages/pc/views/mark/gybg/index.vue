<template>
  <div class="gybg">
    <div class="banner">
      <img src="/img/pc/gybg_banner.png" alt="" />
      <div class="bannerTitle">
        <p class="name">人生圆满，为您服务</p>
        <p class="desc">颠覆对传统祭祀的所有想象！</p>
      </div>
    </div>
    <div class="gybgInfo">
      <div class="infoTitle">
        <div class="line"></div>
        关于本馆
      </div>
      <div class="infoCont">
        <p style="margin-top:20px;">
          圆满人生服务是石门峰纪念公园推出的一项网上服务项目，是一家专业的生命关怀服务预订平台，目前在武汉三镇开通，更多可服务城市正在持续开通中。
        </p>
        <p>
          客户可以通过这个平台预订全年祭祀服务，并完成支付。与其他平台不同的是圆满人生并不是一个传统的服务平台。我们更专注服务品质，我们将“虚拟"的生命关怀服务包装，生成“产业化”，并将这些“服务产品"
          提供到平台供客户预订。所提供服务的人员都必须通过石门峰线下的培训站培训并考核通过才能进行服务。每一个订单服务完成后都将执行严格的品质监管工作，以保证服务的品质。
        </p>
        <div class="infoList">
          <img src="/img/pc/gybg_01.png" alt="" />
          <img src="/img/pc/gybg_02.png" alt="" />
          <img src="/img/pc/gybg_03.png" alt="" />
          <img src="/img/pc/gybg_04.png" alt="" />
          <img src="/img/pc/gybg_05.png" alt="" />
          <img src="/img/pc/gybg_06.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.gybg {
  .banner {
    position: relative;

    img {
      height: 600px;
      width: 100%;
    }

    .bannerTitle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      width: 750px;
      text-align: center;

      .name {
        font-size: 48px;
        line-height: 27px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        display: block;
        background-color: #004830;
        opacity: 0.6;
      }

      .desc {
        font-size: 24px;
        line-height: 27px;
        color: #ffffff;
      }
    }
  }

  .gybgInfo {
    width: 1200px;
    margin: 0 auto;

    .infoTitle {
      margin-top: 80px;
      display: flex;

      .line {
        width: 8px;
        height: 40px;
        background-color: #004930;
        margin-right: 20px;
      }

      font-size: 24px;
      line-height: 40px;
      letter-spacing: 1px;
      color: #666666;
    }

    .infoCont {
      .infoList {
        img {
          display: inline-block;
          width: 380px;
          height: 220px;
          margin-right: 30px;
          margin-top: 30px;

          &:nth-child(3n) {
            margin-right: 0;
          }
        }

        margin-bottom: 100px;
      }
    }
  }
}
</style>
