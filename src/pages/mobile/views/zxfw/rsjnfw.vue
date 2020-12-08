<template>
  <div>
    <zxfwTabs ref="zxfwTabs"></zxfwTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner6.png" />
    </div>
    <div class="intro">
      <van-image fit="cover" src="/img/mobile/rsjnfw_intro.png" />
    </div>
    <div>
      <van-image fit="cover" src="/img/mobile/rsjnfw_intro2.png" />
    </div>

    <div class="cont">
      <div class="title">人生纪念服务 日式收纳一次搞定</div>
      <div class="title2">
        1个小时，1个标准服务套餐
      </div>

      <div class="itemCont">
        <div class="itemImg">
          <van-image fit="cover" src="/img/mobile/rsjnfw1.png" />
        </div>
        <div class="title2 width">
          适用选瓷像、定影雕、排碑文及各类纪念预定
        </div>
      </div>

      <div class="itemCont">
        <div class="itemImg">
          <van-image fit="cover" src="/img/mobile/rsjnfw2.png" />
        </div>
        <div class="title2 width">
          细致精选图片，确定合适尺寸，精选人生精彩故事和经典墓志铭文，优化合理设计
        </div>
      </div>

      <div class="itemCont">
        <div class="itemImg">
          <van-image fit="cover" src="/img/mobile/rsjnfw3.png" />
        </div>
        <div class="title2 width">
          布局碑面，根据人体工学，动线布局碑面空间，完成所有手续收纳式一次搞定
        </div>
      </div>
    </div>

    <div class="cont">
      <div class="title">收纳套餐</div>
      <div class="title2">
        墓志铭文收纳、墓志铭+瓷像收纳、墓志铭+影雕收纳<br />纪念馆+纪念服务收纳
      </div>
      <van-row type="flex" justify="center" style="padding-top: 0.57rem;">
        <van-col class="itemCont2">
          <div class="itemImg">
            <van-image
              fit="fill"
              width="2rem"
              height="2rem"
              src="/img/mobile/rsjnfw4.png"
            />
          </div>
          <div class="title2">
            墓志铭文收纳
          </div>
        </van-col>
        <van-col class="itemCont2">
          <div class="itemImg">
            <van-image
              fit="fill"
              width="2.3rem"
              height="2.12rem"
              src="/img/mobile/rsjnfw5.png"
            />
          </div>
          <div class="title2">
            墓志铭+瓷像收纳
          </div>
        </van-col>
      </van-row>

      <van-row type="flex" justify="center" style="padding-top: 0.57rem;">
        <van-col class="itemCont2">
          <div class="itemImg">
            <van-image
              fit="fill"
              width="2.3rem"
              height="2.12rem"
              src="/img/mobile/rsjnfw6.png"
            />
          </div>
          <div class="title2">
            墓志铭+影雕收纳
          </div>
        </van-col>
        <van-col class="itemCont2">
          <div class="itemImg">
            <van-image
              fit="fill"
              width="2.3rem"
              height="2.12rem"
              src="/img/mobile/rsjnfw7.png"
            />
          </div>
          <div class="title2">
            纪念馆+纪念服务收纳
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="cont" style="padding-bottom: 1.2rem;">
      <div class="btn"><i class="iconfont iconxiangmu"></i></div>
      <div class="title3">项目任选</div>
      <div class="title4">瓷像、影雕和碑文，自由组合选择，任意时间</div>

      <div class="btn" style="margin-top: 0.6rem;">
        <i class="iconfont iconkefu"></i>
      </div>
      <div class="title3">金牌客服</div>
      <div class="title4">金牌客服人员为您服务</div>

      <div class="btn" style="margin-top: 0.6rem;">
        <i class="iconfont iconfuwu"></i>
      </div>
      <div class="title3">周到放心</div>
      <div class="title4">金牌客服保障，服务人员健康</div>
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

.intro {
  padding: 0.55rem 0.4rem;

  .van-image {
    width: 100%;
  }
}

.cont {
  padding-top: 1.2rem;

  .title {
    text-align: center;
    font-size: 0.36rem;
    font-weight: 700;
    color: #333333;
  }

  .title2 {
    padding-top: 0.2rem;
    font-size: 0.24rem;
    color: #666666;
    line-height: 0.36rem;
    text-align: center;

    &.width {
      width: 5rem;
      margin: auto;
    }
  }

  .title3 {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
    padding-top: 0.2rem;
  }
  .title4 {
    padding-top: 0.2rem;
    font-size: 0.24rem;
    color: #333333;
    text-align: center;
  }

  .itemCont {
    padding-top: 0.6rem;

    .itemImg {
      text-align: center;

      .van-image {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }

  .itemCont2 {
    width: 3.5rem;

    .itemImg {
      text-align: center;
      height: 2.3rem;
    }
  }

  .btn {
    width: 4.7rem;
    height: 0.72rem;
    background-color: #f0f0f0;
    border-radius: 0.36rem;
    margin: auto;
    text-align: center;
    line-height: 0.72rem;

    .iconfont {
      font-size: 0.5rem;
      color: #004930;
    }
  }
}
</style>
