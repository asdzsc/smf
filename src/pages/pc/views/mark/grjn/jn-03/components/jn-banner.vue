<template>
  <div class="banner">
    <div class="bannerTitle">
      <div class="bannerAvatar">
        <a-avatar :size="160" :src="baseUrl + bannerModal.photo" />
      </div>
      <p class="bannerName">{{ bannerModal.name }}</p>
      <div class="bannerTime">
        <p>
          出生：{{ bannerModal.birthday }}
          {{ bannerModal.birthdayAddress }}
        </p>
        <p>
          离世：{{ bannerModal.dieTime }}
          {{ bannerModal.dieAddress }}
        </p>
      </div>
      <div class="bannerMsg">
        {{ bannerModal.intro }}
      </div>
      <div class="bannerBtn">
        纪念她
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //数据
    bannerModal: {
      //type 接收的数据类型
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
    };
  },
};
</script>

<style lang="less" scoped>
.banner {
  height: 1220px;
  display: flex;
  justify-content: center;
  .bannerTitle {
    width: 823px;
    height: 636px;
    margin-top: 132px;
    text-align: center;
    position: relative;

    .bannerAvatar {
      position: absolute;
      top: 3%;
      left: 50%;
      margin-left: -75px;
      background: #fff;
      border-radius: 50%;
    }
    .bannerCreate {
      display: flex;
      align-items: center;
      position: absolute;
      right: 100px;
      top: 50px;

      .bannerCreateName {
        font-size: 20px;
        color: #343437;
        margin-top: 20px;
      }
    }
    .bannerName {
      margin-top: 190px;
      font-size: 40px;
      letter-spacing: 1px;
      color: #333333;
    }

    .bannerTime {
      font-size: 20px;
      line-height: 10px;
      color: #333333;
    }

    .bannerMsg {
      width: 600px;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 1px;
      color: #666666;
      margin-left: 160px;
      margin-top: 40px;
      text-align: justify;
    }

    .bannerBtn {
      width: 220px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 28px;
      color: #ffffff;
      cursor: pointer;
      background-color: #782225;
      box-shadow: 0px 7px 0px 0px rgba(0, 0, 0, 0.15);
      border-radius: 28px;
      margin: 0 auto;
      margin-top: 30px;
    }
    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #666666;
      margin-top: 50px;
      span {
        color: #782225;
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
