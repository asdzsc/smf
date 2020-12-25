<template>
  <div class="grjn">
    <!-- banner start -->
    <div class="banner">
      <div class="bannerTitle">
        <div class="bannerAvatar">
          <van-image
            round
            width="1.60rem"
            height="1.60rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="bannerInfo">
          <p class="bannerName">姚贝娜</p>
          <div class="bannerTime">
            <p>出生：1981年09月26日 中国 武汉</p>
            <p>离世：2015年01月16日 中国 北京</p>
          </div>
          <div class="bannerMsg">
            她会变成天上那颗最耀眼的星星，照亮我们每个人的梦，飞过苍穹，穿越永恒。永远都不要忘了她，因为她是真正的天使。天堂会收下你的美，会让你在那里生活的更加幸福快乐。你的笑容，挥之不去。
            睡吧，睡吧。总有一天，你会醒来。 时光不老，伊人不朽…
          </div>
          <div class="bannerBtn">纪念他</div>
        </div>
      </div>
      <p class="bannerTimes">已有<span>432</span>次纪念</p>
    </div>
    <!-- banner end -->
    <!-- photo start -->
    <div class="photo">
      <div class="title">
        <img src="/img/mobile/mark/star_02.png" alt="" />
        <p>纪念相册</p>
        <img src="/img/mobile/mark/star_02.png" alt="" />
      </div>
      <div class="photoInfo">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="transparent"
        >
          <van-swipe-item>
            <img src="/img/mobile/mark/photo_01.png" alt="" />
            <img src="/img/mobile/mark/photo_02.png" alt="" />
            <img src="/img/mobile/mark/photo_03.png" alt="" />
            <img src="/img/mobile/mark/photo_04.png" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img src="/img/mobile/mark/photo_01.png" alt="" />
            <img src="/img/mobile/mark/photo_02.png" alt="" />
            <img src="/img/mobile/mark/photo_03.png" alt="" />
            <img src="/img/mobile/mark/photo_04.png" alt="" />
          </van-swipe-item>
        </van-swipe>
        <div class="moreBtn">查看更多</div>
      </div>
    </div>
    <!-- photo end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
    };
  },
};
</script>

<style lang="less" scoped>
.grjn {
  background-image: url("/img/mobile/mark/banner_02.png");
  background-size: cover;
  .moreBtn {
    font-size: 0.24rem;
    color: #333;
    margin: 0.3rem auto 0.7rem;
    text-align: center;
  }
  .title {
    display: flex;
    font-size: 0.36rem;
    color: #0d1351;
    text-align: center;
    margin: 0.5rem 0;
    justify-content: center;
    align-items: center;
    p {
      margin: 0 0.2rem;
    }
  }
  .banner {
    // width: 5.82rem;
    width: 92%;
    margin: 0 auto;
    padding: 15% 0;
    padding-bottom: 3%;
    .bannerTimes {
      font-size: 0.26rem;
      line-height: 0.28rem;
      color: #0d1351;
      text-align: center;
      margin-top: 0.2rem;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        letter-spacing: 0.02rem;
      }
    }
    .bannerTitle {
      height: 6.54rem;
      background-image: url("/img/mobile/mark/line_02.png");
      background-size: 100% 100%;
      position: relative;
      text-align: center;
      color: #333333;
      .bannerAvatar {
        position: absolute;
        top: -0.8rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .bannerInfo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0.8rem;
        width: 70%;
        .bannerName {
          margin: 0.2rem 0;
          font-size: 0.4rem;
          font-weight: bold;
          line-height: 0.7rem;
          letter-spacing: 0.01rem;
        }
        .bannerTime {
          font-size: 0.24rem;
          line-height: 0.5rem;
        }
        .bannerMsg {
          text-align: justify;
          text-indent: 0.44rem;
          font-size: 0.22rem;
          line-height: 0.3rem;
          letter-spacing: 0.01rem;
          margin: 0.1rem auto;
        }
        .bannerBtn {
          width: 3rem;
          margin: 0 auto;
          height: 0.72rem;
          text-align: center;
          line-height: 0.72rem;
          border-radius: 0.36rem;
          color: #fff;
          background-color: #0d1351;
          box-shadow: 0px 0.02rem 0.03rem 0px rgba(0, 0, 0, 0.24);
        }
      }
    }
  }
  .photo {
    padding: 0 0.4rem;
    .my-swipe {
      img {
        display: inline-block;
        margin-top: 0.5rem;
        margin-right: 4%;
        width: 48%;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
