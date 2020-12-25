<template>
  <div class="banner">
    <div class="bannerTitle">
      <div class="bannerAvatar">
        <a-avatar
          :size="160"
          :src="baseUrl + bannerModel.photo"
          :onerror="defImg"
        />
      </div>
      <p class="bannerName">{{ bannerModel.name }}</p>
      <div class="bannerTime">
        <p>
          出生：{{ bannerModel.birthday }}
          {{ bannerModel.birthdayAddress }}
        </p>
        <p>
          离世：{{ bannerModel.dieTime }}
          {{ bannerModel.dieAddress }}
        </p>
      </div>
      <div class="bannerMsg">
        {{ bannerModel.intro }}
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
    bannerModel: {
      //type 接收的数据类型
      type: Object,
      default: {},
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
  height: 880px;
  display: flex;
  justify-content: center;
  .bannerTitle {
    width: 800px;
    // height: 613px;
    text-align: center;
    background: url("/img/pc/1line.png") no-repeat center center;
    background-size: 100% 100%;
    margin-top: 8%;
    position: relative;

    .bannerAvatar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -80px;
      background: #fff;
      border-radius: 50%;
    }

    .bannerName {
      margin-top: 100px;
      font-size: 40px;
      font-weight: bold;
      line-height: 70px;
      letter-spacing: 1px;
      color: #ffffff;
    }

    .bannerTime {
      font-size: 20px;
      color: #ffffff;
      line-height: 10px;
    }

    .bannerMsg {
      text-align: justify;
      width: 580px;
      height: 160px;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      margin-left: 85px;
      margin-top: 40px;
    }

    .bannerBtn {
      width: 220px;
      height: 50px;
      background-color: #00744c;
      border-radius: 25px;
      line-height: 50px;
      text-align: center;
      font-size: 28px;
      color: #ffffff;
      margin: 0 auto;
      margin-top: 220px;
      cursor: pointer;
    }
  }
}
</style>
