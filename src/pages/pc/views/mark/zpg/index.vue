<template>
  <div class="zpg">
    <div class="banner">
      <div class="bannerTitle">
        <p class="titleName">寻 根 问 祖</p>
        <p class="titleDesc">
          你是谁？你从哪里来？ <br />
          在这里，你将追根溯源，找到你想要知道的答案
        </p>
      </div>
    </div>
    <div class="cont">
      <div class="contMain">
        <div class="contTitle">
          <div class="line"></div>
          <p class="name">在线族谱馆</p>
        </div>
        <img src="/img/pc/main1.png" alt="" />
      </div>
      <div class="contTitle">
        <div class="line"></div>
        <p class="name">他们的美好，需要你来留住</p>
        <p class="desc">海量模版为您的“他/她”量身打造私人网上纪念馆</p>
      </div>
      <!-- 轮播图片 start -->
      <div class="carouselBox">
        <div class="swiper-wrap" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide swipera">
              <img src="/img/pc/banner4.png" alt="" />
            </div>
            <div class="swiper-slide swipera">
              <img src="/img/pc/banner5.png" alt="" />
            </div>
            <div class="swiper-slide swipera">
              <img src="/img/pc/banner6.png" alt="" />
            </div>
          </div>
        </div>
        <div class="swiper-button-prev" slot="button"></div>
        <div class="swiper-button-next" slot="button"></div>
      </div>
      <div class="makeBtn">
        我要制作
      </div>
      <!-- 轮播图片 end -->
      <div class="contTitle">
        <div class="line"></div>
        <p class="name">他们的纪念，让爱长存</p>
        <p class="desc">同一个家族，共一份亲情，让爱长存</p>
      </div>
      <div class="contList">
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <a-avatar
                :size="50"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p>
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”
          </p>
        </div>
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <a-avatar
                :size="50"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p>
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”
          </p>
        </div>
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <a-avatar
                :size="50"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p>
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”
          </p>
        </div>
        <div class="contItem">
          <div class="avatar">
            <div class="left">
              <a-avatar
                :size="50"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <span>小姑姑</span>
            </div>
            <p>2020.03.04</p>
          </div>
          <p>
            我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”我们惋惜，因为人世间少了您带给大家的欢笑。我们欣慰，因为有您的天堂更似天堂！”
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        //banner轮播
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: true, //自动轮播
        loop: true, //循环
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        effect: "coverflow", //3d效果
        centeredSlides: true,
        slidesPerView: 1.4,
        coverflowEffect: {
          //修改其中的数值，即可
          rotate: 0, //旋转
          stretch: 450, //拉伸
          depth: 150, //深度
          modifier: 1,
          slideShadows: true,
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.zpg {
  .banner {
    background: url("/img/pc/banner3.png") no-repeat center center;
    background-size: cover;
    align-items: inherit;
    height: calc(100vh - 70px);
    position: relative;
    display: flex;
    justify-content: center;

    .bannerTitle {
      position: absolute;
      top: 15%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .titleName {
        color: #fff;
        line-height: 28px;
        font-size: 46px;
        font-weight: bold;
        line-height: 66px;
        letter-spacing: 2px;
      }

      .titleDesc {
        color: #fff;
        line-height: 36px;
        font-size: 24px;
        line-height: 66px;
        letter-spacing: 1px;
        margin-top: 0;
      }
    }
  }

  .cont {
    .carouselBox {
      width: 969px;
      margin: 0 auto;
      position: relative;
      .swiper-button-prev {
        background-image: url("/img/pc/icon_left.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: transparent;
        width: 50px;
        height: 50px;
        left: -100px;
      }
      .swiper-button-next {
        background-image: url("/img/pc/icon_right.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: transparent;
        width: 50px;
        height: 50px;
        right: -100px;
      }
      .swiper-wrap {
        .swipera {
          width: 500px;
          img {
            height: 420px;
          }
        }
      }
    }

    .contMain {
      background: url("/img/pc/main.png") no-repeat center center;
      background-size: cover;
      align-items: inherit;
      text-align: center;
      height: 997px;
    }

    .makeBtn {
      width: 160px;
      height: 41px;
      background-color: #004830;
      border-radius: 20px;
      font-size: 18px;
      line-height: 41px;
      text-align: center;
      margin: 50px auto;
      cursor: pointer;
      letter-spacing: 1px;
      color: #ffffff;
    }

    .contTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 75px;

      .line {
        width: 81px;
        height: 6px;
        background-color: #004830;
        border-radius: 3px;
      }

      .name {
        font-size: 36px;
        font-weight: bold;
        line-height: 28px;
        letter-spacing: 1px;
        color: #333333;
        margin-top: 25px;
      }

      .desc {
        font-size: 24px;
        line-height: 66px;
        letter-spacing: 1px;
        color: #666666;
      }
    }

    .contList {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .contItem {
        width: 560px;
        height: 235px;
        background-image: url("/img/pc/main2.png");
        background-size: 100% 100%;
        padding: 35px;
        box-sizing: border-box;
        margin-top: 35px;

        .ant-avatar-image {
          border: 1px solid #000;
          margin-right: 10px;
        }

        .avatar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        p {
          font-size: 14px;
          margin-top: 10px;
          line-height: 24px;
          letter-spacing: 0px;
          color: #666666;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          display: -webkit-box;
        }
      }
    }
  }
}
</style>
