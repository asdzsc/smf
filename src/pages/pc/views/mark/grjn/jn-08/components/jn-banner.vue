<template>
  <div class="banner">
    <div class="bannerTitle">
      <div class="bannerAvatar">
        <a-avatar :size="160" :src="baseUrl + bannerModal.photo" />
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
  height: 860px;
  display: flex;
  justify-content: center;

  .bannerTitle {
    width: 870px;
    background-size: 100% 100%;
    background-image: url("/img/pc/08line.png");
    background-repeat: no-repeat;
    text-align: center;
    position: relative;

    .bannerAvatar {
      position: absolute;
      left: 50%;
      top: 50px;
      margin-left: -80px;
      background: #fff;
      border-radius: 50%;
    }

    .bannerCreate {
      display: flex;
      align-items: center;
      position: absolute;
      right: 50px;
      top: 50px;

      .bannerCreateName {
        font-size: 20px;
        color: #872121;
        margin-top: 20px;
      }
    }

    .bannerName {
      margin-top: 460px;
      font-size: 40px;
      letter-spacing: 1px;
      color: #872121;
      font-weight: bold;
    }

    .bannerTime {
      font-size: 20px;
      line-height: 10px;
      color: #872121;
    }

    .bannerMsg {
      width: 600px;
      font-size: 20px;
      line-height: 30px;
      color: #872121;
      margin: 0 auto;
    }

    .bannerBtn {
      width: 298px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 0 auto;
      margin-top: 50px;
      font-size: 28px;
      color: #343437;
      cursor: pointer;
      background-color: #9e142c;
      border-radius: 25px;
      color: #fff;
    }

    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #610a0a;
      position: absolute;
      bottom: 60px;
      left: 50%;
      margin-left: -100px;

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
