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
      <div class="bannerCreate">
        <a-avatar :size="50" :src="handleAvatar(bannerModel.createAvatar)" />
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
      <div class="bannerBtn" @click="handleClick">
        纪念Ta
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
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.png"',
    };
  },
  mounted() {
    this.bannerModel.birthday = this.bannerModel.birthday.substring(0, 10);
    this.bannerModel.dieTime = this.bannerModel.dieTime.substring(0, 10);
  },
  methods: {
    handleAvatar(createAvatar) {
      if (createAvatar) {
        if (createAvatar.indexOf("http" || "https") >= 0) {
          return createAvatar;
        } else {
          return process.env.VUE_APP_BASE_URL + createAvatar;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    handleClick() {
      this.$router.push({
        path: "/mark/shop/goodsList",
        query: {
          cid: "445465710975700992",
          id: this.bannerModel.id,
        },
      });
    },
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

    .bannerCreate {
      display: flex;
      align-items: center;
      position: absolute;
      right: 150px;
      top: 50px;

      .bannerCreateName {
        font-size: 20px;
        padding-left: 5px;
        color: #ffffff;
        margin-top: 20px;
      }
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
      // height: 160px;
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      margin-left: 85px;
      margin-top: 40px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      overflow: hidden;
      display: -webkit-box;
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
      margin-top: 60px;
      cursor: pointer;
    }

    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #fff;
      margin: 20px 0;

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
