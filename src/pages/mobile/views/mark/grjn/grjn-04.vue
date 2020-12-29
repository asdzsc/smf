<template>
  <div class="grjn">
    <!-- banner start -->
    <div class="banner">
      <div class="bannerTitle">
        <div class="create">
          <div class="createAvatar">
            <van-image
              round
              width=".50rem"
              height=".50rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="createName">创建者</div>
        </div>
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
          <p class="bannerTimes">已有<span>432</span>次纪念</p>
        </div>
      </div>
    </div>
    <!-- banner end -->
    <!-- photo start -->
    <div class="photo">
      <div class="title" style="margin-top:2rem;">
        <p>纪念相册</p>
        <img src="/img/mobile/mark/title_04.png" alt="" />
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
    <!-- ly start -->
    <div class="ly">
      <div class="lyTitle">
        <div class="lyBtn">我要纪念</div>
        <div class="title">
          <p>祭奠留言</p>
          <img src="/img/mobile/mark/title_04.png" alt="" />
        </div>
      </div>
      <div class="lyInfo">
        <div class="lyList">
          <img class="line" src="/img/mobile/mark/ly_04.png" alt="" />
          <div class="lyListAvatar">
            <van-image
              round
              width=".64rem"
              height=".64rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="lyListInfo">
            <div class="lyListGift">
              <div class="lyListGiftName">
                <p>“小姑姑”</p>
                给
                <p>“姚贝娜”</p>
                送出了
                <p>月季</p>
              </div>
              <div class="lyListGiftIcon">
                <van-image
                  round
                  width=".64rem"
                  height=".64rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
            </div>
            <div class="lyListMsg">
              贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
            </div>
            <div class="lyListName">
              <p style="margin-right: .20rem;">爸爸</p>
              <p>2020年1月1日 11:40</p>
            </div>
          </div>
          <img class="line1" src="/img/mobile/mark/ly_041.png" alt="" />
        </div>
        <div class="lyList">
          <img class="line" src="/img/mobile/mark/ly_04.png" alt="" />
          <div class="lyListAvatar">
            <van-image
              round
              width=".64rem"
              height=".64rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="lyListInfo">
            <div class="lyListGift">
              <div class="lyListGiftName">
                <p>“小姑姑”</p>
                给
                <p>“姚贝娜”</p>
                送出了
                <p>月季</p>
              </div>
              <div class="lyListGiftIcon">
                <van-image
                  round
                  width=".64rem"
                  height=".64rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
            </div>
            <div class="lyListMsg">
              贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
            </div>
            <div class="lyListName">
              <p style="margin-right: .20rem;">爸爸</p>
              <p>2020年1月1日 11:40</p>
            </div>
          </div>
          <img class="line1" src="/img/mobile/mark/ly_041.png" alt="" />
        </div>
      </div>
      <div class="moreBtn">更多留言</div>
    </div>
    <!-- ly end -->
    <!-- article start -->
    <div class="article">
      <div class="title">
        <p>纪念文章</p>
        <img src="/img/mobile/mark/title_04.png" alt="" />
      </div>
      <div class="articleInfo">
        <div class="articleList">
          <img src="/img/mobile/mark/photo_05.png" alt="" />
          <div class="articleCont">
            <p class="articleTitle">纪念你</p>
            <p class="articleMsg">
              时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。
            </p>
          </div>
        </div>
        <div class="articleList">
          <img src="/img/mobile/mark/photo_06.png" alt="" />
          <div class="articleCont">
            <p class="articleTitle">纪念你</p>
            <p class="articleMsg">
              时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。
            </p>
          </div>
        </div>
      </div>
      <div class="moreBtn">更多文章</div>
    </div>
    <!-- article end -->
    <!-- video start -->
    <div class="video">
      <div class="title">
        <p>纪念视频</p>
        <img src="/img/mobile/mark/title_04.png" alt="" />
      </div>
      <div class="videoInfo">
        <div class="videoList">
          <video
            src=""
            poster="/img/mobile/mark/photo_07.png"
            :onerror="defImg"
          ></video>
          <div class="videoCont">
            <van-icon size=".94rem" name="play-circle-o" />
          </div>
          <p class="videoTitle">第一次演唱会</p>
          <p class="videoTime">2020年1月1日</p>
        </div>
        <div class="videoList">
          <video
            src=""
            poster="/img/mobile/mark/photo_08.png"
            :onerror="defImg"
          ></video>
          <div class="videoCont">
            <van-icon size=".94rem" name="play-circle-o" />
          </div>
          <p class="videoTitle">第一次演唱会</p>
          <p class="videoTime">2020年1月1日</p>
        </div>
      </div>
      <div class="moreBtn">更多视频</div>
    </div>
    <!-- video end -->
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
  background-image: url("/img/mobile/mark/banner_04.png");
  background-size: cover;
  .moreBtn {
    font-size: 0.24rem;
    color: #333;
    margin: 0.3rem auto 0.7rem;
    text-align: center;
  }
  .title {
    font-size: 0.36rem;
    color: #333333;
    text-align: center;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      height: 0.36rem;
      margin: 0 0.2rem;
    }
  }
  .banner {
    // width: 5.82rem;
    width: 92%;
    margin: 0 auto;
    padding: 20% 0;
    padding-bottom: 3%;
    .bannerTimes {
      font-size: 0.26rem;
      line-height: 0.28rem;
      color: #333333;
      text-align: center;
      margin-top: 0.2rem;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        color: #ff4125;
        letter-spacing: 0.02rem;
      }
    }
    .bannerTitle {
      height: 6.54rem;
      position: relative;
      text-align: center;
      color: #333333;
      .create {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }
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
          background-color: #ff4125;
          border-radius: 0.36rem;
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
  .ly {
    padding: 0 0.4rem;
    .lyTitle {
      display: flex;
      flex-direction: row-reverse;
      .title {
        font-size: 0.36rem;
        letter-spacing: 0.02rem;
        color: #333333;
        display: flex;
        margin-right: 0.6rem;
      }
      .lyBtn {
        width: 1.58rem;
        height: 0.55rem;
        font-size: 0.24rem;
        line-height: 0.55rem;
        color: #eae9e9;
        background: #df0024;
        border-radius: 0.24rem;
        text-align: center;
        margin-top: 10%;
      }
    }
    .lyInfo {
      width: 100%;
      .lyList {
        display: flex;
        padding: 1rem 0.5rem;
        box-sizing: border-box;
        margin-top: 0.5rem;
        position: relative;
        .line {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .line1 {
          width: 90%;
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .lyListInfo {
          margin-left: 0.2rem;
          .lyListGift {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .lyListGiftIcon {
              margin-right: 0.3rem;
              border-radius: 50%;
              width: 0.64rem;
              height: 0.64rem;
            }
            .lyListGiftName {
              display: flex;
              font-size: 0.2rem;
              line-height: 0.62rem;
              color: #583b03;
            }
          }
          .lyListMsg {
            font-size: 0.24rem;
            line-height: 0.32rem;
            color: #333333;
            margin: 0.2rem 0;
          }
          .lyListName {
            display: flex;
            color: #583b03;
            font-size: 0.2rem;
          }
        }
      }
    }
  }
  .article {
    padding: 0 0.4rem;
    .articleInfo {
      .articleList {
        width: 100%;
        border-radius: 0.1rem;
        background-image: url("/img/mobile/mark/wz_04.png");
        background-size: 100% 100%;
        margin-top: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box;
        padding-bottom: 2rem;
        img {
          width: 100%;
          margin-top: 0.25rem;
        }
        .articleCont {
          // padding: 0.3rem 0.5rem;
          box-sizing: border-box;
          .articleTitle {
            font-size: 0.3rem;
            margin: 0.2rem 0;
            letter-spacing: 0.01rem;
            color: #fff;
          }
          .articleMsg {
            text-align: justify;
            font-size: 0.24rem;
            line-height: 0.32rem;
            color: #fff;
          }
        }
      }
    }
  }
  .video {
    padding: 0 0.4rem;
    padding-bottom: 0.5rem;
    .videoInfo {
      background: #df0024;
      padding: 0.2rem;
      box-sizing: border-box;
      .videoList {
        text-align: center;
        position: relative;
        margin-top: 0.5rem;
        video {
          width: 100%;
          height: 4rem;
        }
        .videoCont {
          color: #ffffff;
          position: absolute;
          left: 50%;
          top: 38%;
          transform: translate(-0.47rem, -0.47rem);
        }
        .videoTitle {
          font-size: 0.3rem;
          line-height: 0.3rem;
          margin-top: 0.5rem;
          color: #fff;
        }
        .videoTime {
          font-size: 0.22rem;
          line-height: 0.7rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
