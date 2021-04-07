<template>
  <div>
    <div class="banner-img">
      <div class="overlay"></div>
      <img
        class="live-img"
        :src="baseUrl + model.img"
        :onerror="'this.src=\'' + defImg + '\''"
      />
      <div class="live-title">
        <div class="font">{{ model.title }}</div>
        <div class="dtime">{{ parseTime(model.liveTime) }}开始</div>
      </div>
      <div class="yg-cont">
        <img class="yg-img" src="/img/mobile/live/kaibodaojishi.png" />
        <div class="yg-title">
          开播倒计时
        </div>
        <div class="yg-dtime">{{ dateDown }}</div>
      </div>
    </div>
    <div class="space-cont"></div>
    <div class="zbjs">— 直播简介 —</div>
    <div v-if="model.intro" class="cont" v-html="model.intro"></div>
    <div v-else class="cont">
      <van-empty description="暂无内容" />
    </div>

    <div @click="openLive()" class="zb-btn" :class="{ pattern: !isLive }">
      进入直播间
    </div>

    <van-dialog v-model="verPwd" title="观看密码" :before-close="vpwdClose">
      <van-field v-model="pwd" label="密码" placeholder="请输入观看密码" />
    </van-dialog>
  </div>
</template>

<script>
import { liveInfo, verifyPwd } from "@/pages/mobile/api/live";
import * as utils from "@/pages/mobile/libs/utils";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: "/img/mobile/live/def-play.jpg",
      model: {
        id: "",
        title: "",
        img: "",
        pwd: "",
        ckPwd: false,
        anchorList: [],
        intro: "",
      },
      tabList: [],
      dateDown: "",
      isAttention: false,
      jobTime: null,
      isLive: false,
      verPwd: false,
      pwd: "",
    };
  },
  mounted() {
    this._liveInfo();
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.jobTime);
    this.jobTime = null;
  },
  methods: {
    _liveInfo() {
      if (this.$route.query.id) {
        liveInfo({
          id: this.$route.query.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data.liveList);
            this.chPwd();
            this.tabList = res.data.tabList;
            //倒计时
            this.timeDown(utils.parseTime(this.model.liveTime));
          }
        });
      } else {
        this.$dialog
          .alert({
            message: "直播id参数错误",
          })
          .then(() => {
            this.$router.go(-1);
          });
      }
    },
    //验证密码
    chPwd() {
      var liveVerifyPwd = this.$store.state.account.liveVerifyPwd;
      if (liveVerifyPwd && liveVerifyPwd.indexOf(this.model.id) >= 0) {
        this.verPwd = false;
        this.livePlay();
      } else {
        if (this.model.ckPwd) {
          this.verPwd = true;
        } else {
          this.verPwd = false;
          this.livePlay();
        }
      }
    },
    vpwdClose(action, done) {
      verifyPwd({
        id: this.model.id,
        pwd: this.pwd,
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit(
            "account/setLiveVerifyPwd",
            this.model.id + "_" + this.pwd
          );
          this.verPwd = false;
          this.livePlay();
          done();
        } else {
          this.$notify({
            type: "warning",
            message: res.msg,
          });
          done(false);
        }
      });
    },
    livePlay() {
      if (this.model.state === "2" || this.model.state === "3") {
        //打开播放页面
        this.$router.push({
          path: "/live/live-play",
          query: {
            id: this.model.id,
          },
        });
      }
    },
    openLive() {
      if (this.isLive) {
        this.$router.push({
          path: "/live/live-play",
          query: {
            id: this.model.id,
          },
        });
      }
    },
    parseTime(s) {
      return utils.parseTime(s, "{y}-{m}-{d} {h}:{i}");
    },
    timeDown(s) {
      this.jobTime = setInterval(() => {
        this.dateDown = utils.timeDown(s);

        //是否直播
        var sdate = new Date();
        var time = this.model.liveTime.replace(/-/g, "/");
        const edate = new Date(time);
        var msecNum = edate.getTime() - sdate.getTime();
        this.isLive = msecNum <= 0 ? true : false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.banner-img {
  position: relative;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.45;
  }

  .live-title {
    position: absolute;
    top: 20px;
    left: 30px;
    right: 20px;
    line-height: 0.4rem;

    .font {
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 0.3rem;
    }

    .dtime {
      color: #ffffff;
    }
  }

  .live-img {
    width: 100%;
    height: 6rem;
  }

  .yg-cont {
    position: absolute;
    text-align: center;
    top: calc(50% - 1.1rem);
    left: calc(50% - 1.88rem);

    .yg-img {
      width: 0.88rem;
      height: 0.88rem;
    }

    .yg-title {
      color: #fefefe;
      padding-top: 0.5rem;
      padding-bottom: 0.1px;
    }

    .yg-dtime {
      color: #fefefe;
      font-size: 0.36rem;
    }
  }
}

.anchor {
  padding: 0.16rem 0.2rem;

  .anchor-photo {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
  }

  .anchor-gz {
    width: 1.6rem;
    margin-top: 0.15rem;
  }

  .zb {
    color: #333333;
    padding-left: 0.3rem;
    font-size: 0.3rem;
  }
}

.space-cont {
  background-color: #efefef;
  height: 0.2rem;
}

.zbjs {
  text-align: center;
  height: 0.88rem;
  border-bottom: 1px solid #efefef;
  font-size: 0.34rem;
  line-height: 0.88rem;
  color: #333333;
}

.cont {
  padding: 0.2rem;
  padding-bottom: 0.88rem;

  /deep/ img {
    max-width: 100%;
    height: auto;
  }
}

.zb-btn {
  position: fixed;
  bottom: 0.3rem;
  width: calc(100% - 0.6rem);
  height: 0.88rem;
  left: 0.3rem;
  background-image: url(/img/mobile/live/anniu2.png);
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.34rem;
  line-height: 0.88rem;
  text-align: center;

  &.pattern {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 1;
  }
}

.float-tool {
  position: fixed;
  right: 0.1rem;
  bottom: 2.4rem;
  text-align: center;
  z-index: 20;

  .home {
    background: #ee0a24;
    color: #ffffff;
    font-size: 28px;
    padding: 10px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
