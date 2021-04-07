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
      <div class="bannerBtn" @click="handleClick">
        纪念Ta
      </div>
      <div class="bannerTimes">
        已有<span>{{ bannerModel.msgNum }}</span
        >次纪念
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
      defImg: 'this.src="/img/zwtp.jpg"',
    };
  },
  mounted() {
    this.bannerModel.birthday = this.bannerModel.birthday.substring(0, 10);
    this.bannerModel.dieTime = this.bannerModel.dieTime.substring(0, 10);
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/mark/shop/goodsList",
        query: {
          cid: "445465710975700992",
          id: this.bannerModel.id,
        },
      });
    },
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
  },
};
</script>

<style lang="less" scoped>
.banner {
  height: 844px;
  display: flex;
  justify-content: center;
  align-items: center;

  .bannerTitle {
    width: 965px;
    height: 680px;
    text-align: center;
    background: url("/img/pc/06line.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;

    .bannerAvatar {
      position: absolute;
      left: 50%;
      top: -30px;
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
        color: #343437;
        margin-top: 20px;
        padding-left: 5px;
      }
    }

    .bannerName {
      margin-top: 130px;
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
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      overflow: hidden;
      display: -webkit-box;
    }

    .bannerBtn {
      width: 190px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      font-size: 28px;
      color: #343437;
      cursor: pointer;
      background-color: #f6f3f2;
      box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.24);
      border-radius: 25px;
    }

    .line {
      width: 739px;
      height: 1px;
      border: dashed 1px #0d1351;
      margin: 0 auto;
      margin-top: 25px;
    }

    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #343437;
      margin-top: 50px;

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
