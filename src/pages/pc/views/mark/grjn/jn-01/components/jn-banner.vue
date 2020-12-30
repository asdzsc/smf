<template>
  <div class="banner">
    <div class="bannerTitle">
      <div class="bannerAvatar">
        <a-avatar
          :size="160"
          :onerror="defImg"
          :src="baseUrl + bannerModel.photo"
        />
      </div>
      <div class="bannerCreate">
        <a-avatar :size="50" :src="bannerModel.createAvatar" />
        <p class="bannerCreateName">{{ bannerModel.createName }}</p>
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
      <div class="bannerTimes">
        已有<span>{{ bannerModel.msgNum }}</span
        >次纪念
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
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
    };
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.banner {
  height: 880px;
  display: flex;
  justify-content: center;
  align-items: center;

  .bannerTitle {
    width: 850px;
    height: 613px;
    text-align: center;
    background: url("/img/pc/01line.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .bannerAvatar {
      position: absolute;
      left: 50%;
      margin-left: -120px;
      top: -80px;
      background: #fff;
      border-radius: 50%;
    }

    .bannerCreate {
      display: flex;
      align-items: center;
      position: absolute;
      right: 130px;
      top: 50px;
      .bannerCreateName {
        font-size: 20px;
        color: #343437;
        margin-top: 20px;
        padding-left: 5px;
      }
    }

    .bannerName {
      margin-top: 100px;
      font-size: 40px;
      margin-right: 80px;
      letter-spacing: 1px;
      color: #872121;
    }

    .bannerTime {
      font-size: 20px;
      line-height: 10px;
      color: #872121;
      margin-right: 80px;
    }

    .bannerMsg {
      width: 695px;
      height: 160px;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 1px;
      color: #872121;
      margin-left: 50px;
      margin-top: 40px;
    }

    .bannerBtn {
      width: 220px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 28px;
      color: #343437;
      cursor: pointer;
      background-color: #f6f3f2;
      box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.24);
      border-radius: 25px;
      position: absolute;
      bottom: 10px;
      left: 50%;
      margin-left: -130px;
    }

    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #610a0a;
      position: absolute;
      bottom: -60px;
      left: 50%;
      margin-left: -120px;

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
