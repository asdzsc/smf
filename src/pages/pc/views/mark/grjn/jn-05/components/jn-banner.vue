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
<<<<<<< HEAD
        <a-avatar :size="50" :src="handleAvatar(bannerModel.createAvatar)" />
=======
        <a-avatar :size="50" :src="bannerModel.createAvatar" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
      <div class="bannerBtn" @click="handleClick">
        纪念Ta
=======
      <div class="bannerBtn">
        纪念她
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
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
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
.banner {
  height: 806px;
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
      top: -30px;
      margin-left: -70px;
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
        padding-left: 5px;
      }
    }

    .bannerName {
      margin-top: 190px;
      font-size: 40px;
      letter-spacing: 1px;
      color: #777777;
      font-weight: bold;
      margin-left: 15px;
    }

    .bannerTime {
      font-size: 20px;
      line-height: 10px;
      color: #333333;
    }

    .bannerMsg {
      width: 735px;
      font-size: 20px;
      line-height: 30px;
      color: #333333;
      margin-left: 120px;
      margin-top: 20px;
<<<<<<< HEAD
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      overflow: hidden;
      display: -webkit-box;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    }

    .bannerBtn {
      width: 220px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      font-size: 28px;
      color: #343437;
      cursor: pointer;
      background-color: #ffdcd4;
    }
    .bannerTimes {
      font-size: 26px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #343437;
<<<<<<< HEAD
      margin-top: 30px;
=======
      position: absolute;
      bottom: 30px;
      left: 50%;
      margin-left: -100px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
