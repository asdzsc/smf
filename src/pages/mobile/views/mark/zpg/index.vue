<template>
  <div class="zpg">
    <div class="banner">
      <div class="bannerTitle">
        <p class="bannerTitleName">寻 根 问 祖</p>
        <p class="bannerTitleDesc">
          你是谁？你从哪里来？<br />
          在这里，你将追根溯源<br />
          找到你想要知道的答案
        </p>
      </div>
    </div>
    <div class="cont">
      <div class="contMain">
        <div class="contTitle">
          <!-- <div class="line"></div> -->
          <p class="name">在线族谱馆</p>
        </div>
        <img src="/img/mobile/mark/main1.png" alt="" />
      </div>
      <div class="contTitle">
        <!-- <div class="line"></div> -->
        <p class="name">他们的美好，需要你来留住</p>
        <p class="desc">海量模版为您的“他/她”量身打造私人网上纪念馆</p>
      </div>
      <!-- 轮播图 start-->
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#004830">
        <van-swipe-item>
          <img src="/img/mobile/mark/swiper1.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="/img/mobile/mark/swiper2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="/img/mobile/mark/swiper3.png" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图 end-->
      <div class="makeBtn" @click="handleCreate">我要制作</div>
      <div class="contList">
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <van-image
                round
                width=".61rem"
                height=".61rem"
                middle
                src="/img/mobile/mark/avatar.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p class="desc">
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……
          </p>
        </div>
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <van-image
                round
                width=".61rem"
                height=".61rem"
                middle
                src="/img/mobile/mark/avatar.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p class="desc">
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……
          </p>
        </div>
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <van-image
                round
                width=".61rem"
                height=".61rem"
                middle
                src="/img/mobile/mark/avatar.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p class="desc">
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”……
          </p>
        </div>
      </div>
    </div>
    <!-- 激活码框 start -->
    <!-- <div class="activeDiv" v-show="activeDiv">
      <img src="/img/pc/syjhm.jpg" alt="" />
      <p class="activeTitle">创建主页</p>
      <p>请输入我们给您提供的激活码，即可获得该追思主页使用权：</p>
      <van-field
        class="input"
        v-model="activateCode"
        placeholder="请输入激活码"
      />
      <div class="activeBtn">
        <div class="cancel" @click="activeDiv = false">取消</div>
        <div class="continue" @click="goCreate">继续</div>
      </div>
    </div> -->
    <!-- 激活码框 end -->
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      activateCode: "",
      activeDiv: false,
    };
  },
  methods: {
    handleCreate() {
      Dialog.alert({
        message: `手机端暂不支持族谱的制作<br/>请前往Pc端进行操作`,
      }).then(() => {
        // on close
      });
    },
  },
};
</script>

<style lang="less" scoped>
.zpg {
  .activeDiv {
    text-align: center;
    z-index: 99;
    background-color: white;
    width: 90%;
    height: 6.5rem;
    position: fixed;
    top: 15%;
    left: 5%;
    border: 1px;
    border-radius: 10px;
    border-color: #22be6d;
    border-style: solid;

    img {
      margin: 0.4rem 0;
    }

    .activeTitle {
      margin: 0.2rem 0;
      font-size: 0.4rem;
      font-weight: bold;
    }

    p {
      padding: 0 0.4rem;
    }

    .input {
      border-radius: 0.08rem;
      width: 80%;
      margin: 0 auto;
      margin-top: 0.3rem;
      // height: 0.4rem;
      background-color: #fff;
      border-color: #00744c;
    }

    /deep/ .van-cell__value {
      background: #e1e9e0;
    }

    .activeBtn {
      display: flex;
      justify-content: center;
      margin-top: 0.4rem;

      div {
        width: 1.2rem;
        height: 0.55rem;
        line-height: 0.55rem;
        border-radius: 0.08rem;
        font-size: 0.28rem;
      }

      .cancel {
        background-color: #fff;
        color: #22be6d;
      }

      .continue {
        background-color: #22be6d;
        color: #fff;
      }
    }
  }

  .banner {
    position: relative;
    height: 16.2rem;
    width: 100%;
    background: url("/img/mobile/mark/banner4.png") no-repeat center center;
    background-size: cover;

    .bannerTitle {
      color: #ffffff;
      padding-top: 4rem;
      text-align: center;

      .bannerTitleName {
        font-size: 0.52rem;
        line-height: 0.48rem;
        letter-spacing: 0.03rem;
      }

      .bannerTitleDesc {
        font-size: 0.28rem;
        line-height: 0.5rem;
        letter-spacing: 0.01rem;
        margin-top: 0.2rem;
      }
    }

    .searchBtn {
      margin: 0.2rem auto;
    }
  }

  .cont {
    .contMain {
      background: url("/img/mobile/mark/main.png") no-repeat center center;
      background-size: cover;
      height: 16.2rem;
      text-align: center;

      img {
        width: 95%;
        margin-top: 1rem;
      }
    }

    .contTitle {
      padding-top: 2rem;
      text-align: center;

      .line {
        width: 0.81rem;
        height: 0.06rem;
        background-color: #004830;
        border-radius: 0.03rem;
        margin: 0.3rem auto;
      }

      .name {
        font-size: 0.36rem;
        font-weight: bold;
        line-height: 0.28rem;
        letter-spacing: 0.02rem;
        color: #333333;
      }

      .desc {
        font-size: 0.24rem;
        line-height: 0.66rem;
        letter-spacing: 0.01rem;
        color: #666666;
      }
    }

    .my-swipe {
      width: 85%;
      margin: 0.3rem auto;

      img {
        width: 100%;
      }
    }

    .makeBtn {
      width: 2.4rem;
      height: 0.73rem;
      background-color: #004830;
      border-radius: 0.36rem;
      text-align: center;
      line-height: 0.73rem;
      color: #fff;
      margin: 0 auto;
    }

    .contList {
      padding: 0 0.4rem;

      .contItem {
        width: 6.7rem;
        height: 3.25rem;
        background-image: url("/img/mobile/mark/main2.png");
        background-size: 100% 100%;
        padding: 0.5rem;
        box-sizing: border-box;
        margin-top: 0.35rem;

        .ant-avatar-image {
          border: 1px solid #000;
          margin-right: 0.1rem;
        }

        .avatar {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .van-image {
            vertical-align: middle;
          }

          p {
            font-size: 0.22rem;
            line-height: 0.2rem;
            letter-spacing: 0.01rem;
            color: #333333;
          }

          span {
            font-size: 0.28rem;
            line-height: 0.2px;
            letter-spacing: 0.01px;
            color: #333333;
            padding-left: 0.2rem;
          }
        }

        .desc {
          margin-top: 0.2rem;
          font-size: 0.24rem;
          line-height: 0.3rem;
          text-align: justify;
          letter-spacing: 0.01rem;
          color: #666666;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          display: -webkit-box;
        }
      }
    }
  }
}
</style>
