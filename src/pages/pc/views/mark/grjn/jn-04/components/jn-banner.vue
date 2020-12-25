<template>
  <div class="banner">
    <div class="bannerTitle">
      <div class="bannerAvatar">
        <a-avatar
          :size="160"
          :src="baseUrl + bannerModal.photo"
          :onerror="defImg"
        />
      </div>
      <div class="bannerCreate">
        <a-avatar
          :size="50"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <p class="bannerCreateName">创建者</p>
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
      <div class="bannerTimes">
        已有<span>432</span>次纪念
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
  height: 990px;
  display: flex;
  justify-content: center;
  .bannerTitle {
    width: 823px;
    height: 636px;
    margin-top: 102px;
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
      width: 516px;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 1px;
      color: #666666;
      margin-left: 160px;
      margin-top: 40px;
    }

    .bannerBtn {
      width: 220px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 28px;
      color: #ffffff;
      cursor: pointer;
      background-color: #ff4125;
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
        color: #ff4125;
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
