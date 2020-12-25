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
      <img style="margin-top: 140px;" src="/img/pc/07_ds.png" alt="" />
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
      <div class="bannerBox">
        <div class="bannerTimes">
          已有<span>432</span>次纪念
        </div>
        <div class="bannerBtn">
          纪念她
        </div>
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
  height: 1023px;
  display: flex;
  justify-content: center;
  align-items: center;

  .bannerTitle {
    width: 965px;
    height: 680px;
    text-align: center;
    position: relative;

    .bannerAvatar {
      position: absolute;
      left: 50%;
      top: -50px;
      margin-left: -80px;
      background: #fff;
      border-radius: 50%;
    }

    .bannerCreate {
      display: flex;
      align-items: center;
      position: absolute;
      right: -50px;
      top: 50px;

      .bannerCreateName {
        font-size: 20px;
        color: #fff;
        margin-top: 20px;
      }
    }

    .bannerName {
      font-size: 40px;
      letter-spacing: 1px;
      color: #e6e6e6;
      font-weight: bold;
    }

    .bannerTime {
      font-size: 20px;
      line-height: 10px;
      color: #e6e6e6;
    }

    .bannerMsg {
      width: 735px;
      font-size: 20px;
      line-height: 30px;
      color: #e6e6e6;
      margin-left: 120px;
      margin-top: 20px;
    }

    .bannerBox {
      width: 388px;
      height: 174px;
      background-color: #782225;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .bannerBtn {
        width: 190px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 0 auto;
        margin-top: 20px;
        font-size: 28px;
        color: #fff;
        cursor: pointer;
        background-color: #181818;
        box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.24);
        border-radius: 25px;
      }

      .bannerTimes {
        font-size: 26px;
        line-height: 28px;
        letter-spacing: 1px;
        color: #fff;
        span {
          font-size: 40px;
          font-weight: bold;
          color: #d4a45a;
        }
      }
    }
  }
}
</style>
