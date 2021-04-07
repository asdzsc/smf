<template>
  <div @click="hideMsg()" class="content">
    <div v-if="isActive || model.state === '3'">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="playsinline"
        :options="playerOptions"
        @ready="playerReadied"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @canplay="onPlayerCanplay($event)"
      ></video-player>
    </div>
    <div v-else class="banner-img">
      <img
        class="live-img"
        :style="type === 'vertical' ? 'height: 100vh;' : ''"
        :src="getLiveImg"
      />
    </div>
    <div class="live-state">
      <div v-if="isActive || model.state === '3'" class="online">
        <table>
          <tr>
            <td>
              <img class="canyu" src="/img/mobile/live/canyu.png" />
            </td>
            <td class="font-text">{{ getOnline }}人观看</td>
          </tr>
        </table>
      </div>
      <div v-else>未开始直播</div>
    </div>

    <!-- 竖屏模式下的聊天 -->
    <tabmsg
      v-if="type === 'vertical' && isSendMsg"
      class="vertical-container"
      :model="model"
      @addonline="addonline"
      @addpeople="addpeople"
    ></tabmsg>

    <van-notice-bar
      v-if="model.notice"
      color="#E13F3F"
      background="#EFEFEF"
      :text="model.notice"
      class="notice"
      :class="{ vertical: type === 'vertical', noticeByNoMsg: !isSendMsg }"
    >
      <img
        class="notice-img"
        slot="left-icon"
        src="/img/mobile/live/news.png"
      />
    </van-notice-bar>

    <transition :name="showTab ? 'van-slide-up' : 'van-slide-down'">
      <div
        v-if="(type === 'vertical' && showTab) || type === 'horizontal'"
        :class="{ popup: type === 'vertical' }"
      >
        <van-tabs v-model="tagId" @click="changeTab" color="#1c34bf">
          <van-tab
            v-for="item in tabList"
            :key="item.id"
            :title="item.title"
            :name="item.id"
          >
            <tabmsg
              v-if="item.tabType === '2'"
              ref="livemsg"
              :model="model"
              :anchor="anchor"
              @addonline="addonline"
              @addpeople="addpeople"
            ></tabmsg>
            <tabinfo
              v-else-if="item.tabType !== '2'"
              :ref="item.id"
              :model="item"
            ></tabinfo>
          </van-tab>
        </van-tabs>
      </div>
    </transition>

    <div
      v-if="tabList.length > 0"
      class="float-tool"
      :class="{ vertical: type === 'vertical' }"
    >
      <div
        class="xs-div"
        v-if="type === 'vertical'"
        @click="showTab = !showTab"
      >
        <van-icon
          size="35"
          style="font-weight: bold;"
          color="#cccccc"
          :name="showTab ? 'arrow-down' : 'arrow-up'"
        />
      </div>
    </div>

    <!-- 关闭微信x5内核 -->
    <iframe
      src="https://debugmm.qq.com/?forcex5=false"
      style="display:none;"
    ></iframe>
  </div>
</template>
<script>
// import { getUserInfo, enterLive, saveLiveLookLog } from "@/api/liveuser";
import { liveInfo, liveState, livePlayInfo } from "@/pages/mobile/api/live";
import * as utils from "@/pages/mobile/libs/utils";
import $ from "jquery";
export default {
  components: {
    tabinfo: () => import("@/pages/mobile/views/live/components/tabinfo.vue"),
    tabmsg: () => import("@/pages/mobile/views/live/components/tabmsg.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      isActive: false, //直播状态
      jobTime: null, //定时器
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 16:9横屏 9:16竖屏   将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: "", //你的m3u8地址（必填）
          },
        ],
        poster: "/mobile/img/def-play.png", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      defImg: "/img/mobile/live/def-play.png",
      defUserImg: "this.src='/img/mobile/live/wode-2.png'",
      user: {},
      model: {
        id: "",
        title: "",
        img: "",
        anchorList: [],
        intro: "",
        shareCont: "", //分享简介
        people: 0,
        peopleOnline: 0,
        isVertical: "0", //横屏
        verticalImg: "", //竖屏直播图片
        state: "", //直播间状态
        notice: "", //公告内容
        hbUrl: "", //红包链接
        zxUrl: "", //咨询链接
        thirdRtmpPlayUrl: "",
      },
      tabList: [],
      tagId: "", //选中选项卡id
      anchor: {
        avatar: "",
        name: "",
      },
      isAttention: false, //关注状态
      isSendMsg: true, //是否有发消息功能
      showTab: false, //当竖屏模式时是否显示tab栏
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    playsinline() {
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (
        ua.indexOf("android") > -1 ||
        ua.indexOf("linux") > -1 ||
        ua.match(/tencenttraveler/) != null ||
        ua.match(/qqbrowse/) != null
      ) {
        return false;
      } else {
        //ios端
        return true;
      }
    },
    type() {
      //type: "vertical", //vertical竖屏 horizontal横屏
      return this.model.isVertical === "1" ? "vertical" : "horizontal";
    },
    voideScale() {
      return this.model.isVertical === "1" ? this.aspect : "16:9";
    },
    aspect() {
      var w = document.documentElement.clientWidth; //screen.width;
      var h = document.documentElement.clientHeight; //screen.height;
      var r = this.gcd(w, h);
      var _aspect = w / r + ":" + h / r;
      console.log("aspect", _aspect);
      return _aspect;
    },
    getLiveImg() {
      if (this.model.isVertical === "1") {
        return this.baseUrl + this.model.verticalImg;
      } else {
        return this.baseUrl + this.model.img;
      }
    },
    getOnline() {
      var online = Number(this.model.people) + Number(this.model.peopleOnline);
      return utils.tranNumber(online);
    },
  },
  watch: {
    isActive() {
      this.$nextTick(() => {
        this.playerReadied();
        this.getTabHeight();
      });
    },
  },
  mounted() {
    this._liveInfo();
    this.jobTime = setInterval(() => {
      //查询一次直播状态
      this._liveState();
      //在线人数
      this._livePlayInfo();
      //记录用户观看时长
      // this._saveLiveLookLog();
    }, 1000 * 30);
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.jobTime);
    this.jobTime = null;
  },
  methods: {
    //验证密码
    chPwd() {
      if (
        this.$store.state.account.liveVerifyPwd.indexOf(this.model.id) === -1 &&
        this.model.ckPwd
      ) {
        //未验证密码
        this.$router.push({
          path: "/live/live-info",
          query: {
            id: this.model.id,
          },
        });
      }
    },
    hideMsg() {
      console.log("hideMsg");
    },
    gcd(a, b) {
      return b == 0 ? a : this.gcd(b, a % b);
    },
    // _getUserInfo() {
    //   if (!this.$store.state.account.user) {
    //     getUserInfo().then(res => {
    //       if (res.code === 0) {
    //         this.user = res.data;
    //         this.$store.commit("account/setUser", this.user);
    //       }
    //     });
    //   }
    // },
    // //通知进入直播间
    // _enterLive() {
    //   enterLive({ id: this.model.id }).then(res => {
    //     if (res.code === 0) {
    //       console.log("通知进入直播间");
    //     }
    //   });
    // },
    _liveState() {
      if (this.model.id) {
        liveState({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            if (this.model.thirdRtmpPlayUrl) {
              //使用第三方直播流
              this.isActive = true;
              this.playerOptions.aspectRatio = this.voideScale;
            } else {
              var playState = res.data.playState;
              if (playState === "active") {
                this.playerOptions.aspectRatio = this.voideScale;
              }
              this.isActive = playState === "active" ? true : false;
            }
          }
        });
      }
    },
    _livePlayInfo() {
      if (this.model.id) {
        if (!this.model.thirdRtmpPlayUrl) {
          var dtime = utils.parseTime(new Date());
          livePlayInfo({
            id: this.model.id,
            dtime: dtime,
          }).then((res) => {
            if (res.code === 0) {
              if (res.data) {
                this.model.peopleOnline =
                  res.data.Online <= 0 ? 1 : res.data.Online;
              }
            }
          });
        }
      }
    },
    addonline() {
      this.model.peopleOnline = this.model.peopleOnline + 1;
    },
    addpeople(obj) {
      this.model.people = obj.people;
      this.model.zan += obj.zan;
    },
    _liveInfo() {
      if (this.$route.query.id) {
        liveInfo({
          id: this.$route.query.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data.liveList);
            //验证密码
            this.chPwd();

            utils.setTitle(this.model.title);
            this.model.people = Number(this.model.people) || 0;
            this.model.peopleOnline = Number(this.model.peopleOnline) || 0;
            this.model.shareCont = this.model.shareCont || ""; //分享简介
            this.tabList = res.data.tabList;

            this.isSendMsg =
              this.tabList.filter((item) => item.tabType === "2").length > 0;
            //竖屏模式去掉 互动栏
            if (this.type === "vertical") {
              this.tabList = this.tabList.filter(
                (item) => item.tabType !== "2"
              );
            }
            this.playerOptions.aspectRatio = this.voideScale;
            //封面图
            this.playerOptions.poster = this.getLiveImg;

            if (this.model.state === "3") {
              this.playerOptions.sources[0].type = "video/mp4";
              this.playerOptions.sources[0].src = this.model.mediaUrl;
            } else {
              this.playerOptions.sources[0].type = "application/x-mpegURL";
              this.playerOptions.sources[0].src = this.model.rtmpPlayUrl;
            }

            //通知进入直播间
            this.$nextTick(() => {
              this.getTabHeight();
            });

            //直播间状态
            this._liveState();
            this._livePlayInfo();
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
    changeTab() {
      var query = this.tabList.filter((x) => x.id === this.tagId);
      if (query.length > 0) {
        var tabInfo = query[0];
        if (tabInfo.tabType === "4" && tabInfo.url) {
          window.location = tabInfo.url;
        } else if (tabInfo.tabType === "2") {
          this.getTabHeight();
        }
      }
    },
    getTabHeight() {
      if (this.model.isVertical !== "1") {
        var vh = 400;
        if (this.isActive || this.model.state === "3") {
          vh = $("video").height();
        } else {
          vh = $(".banner-img").height();
        }

        var nh = 0;
        if (this.model.notice) {
          nh = $(".notice").height();
        }
        var wh = $(window).outerHeight();
        var cth = $(".van-tabs__wrap").outerHeight();
        var th = wh - vh - nh - cth - 90;
        console.log("th", th);
        // $("#tabs").css({height: th + 'px'})
        if (th < 200) {
          th = 200;
        }
        this.$store.commit("setting/setTabHeight", th);
      }
    },
    playerReadied() {
      var video = $("body").find("video");
      // console.log("video", video);
      if (video) {
        //竖屏模式去掉 互动栏
        if (this.type === "vertical") {
          video.width(window.innerWidth);
          video.height(window.innerHeight);
        }
      }
    },
    //在vue-video-player的onPlayerCanplay(视频可播放)这个方法中添加回调
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
      //解决自动全屏
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (
        ua.indexOf("android") > -1 ||
        ua.indexOf("linux") > -1 ||
        ua.match(/tencenttraveler/) != null ||
        ua.match(/qqbrowse/) != null
      ) {
        console.log("android");
        $("body")
          .find("video")
          .attr("x-webkit-airplay", true)
          .attr("webkit-playsinline", true)
          .attr("playsinline", true)
          .attr("x5-video-player-type", "h5")
          .attr("x5-video-player-fullscreen", true)
          .attr("preload", "auto")
          .attr("controls", "");
        //.attr("x5-playsinline", true);
        // .attr(
        //   "x5-video-orientation",
        //   this.model.isVertical === "1" ? "portraint" : "landscape"
        // )
        //.removeAttr("x5-video-player-type");
        // .attr("x5-video-orientation", "h5")
      } else {
        //ios端
        $("body")
          .find("video")
          .attr("webkit-playsinline", true)
          .attr("playsinline", "true");
      }
      if (this.type === "vertical") {
        $("body")
          .find("video")
          .width(window.innerWidth);
        $("body")
          .find("video")
          .height(window.innerHeight);
      }
      setTimeout(() => {
        this.$refs.videoPlayer.player.play();
      }, 1000);
    },
    // eslint-disable-next-line no-unused-vars
    onPlayerPlay(player) {},
    // eslint-disable-next-line no-unused-vars
    onPlayerPause(player) {
      console.log(player);
    },
    _tranNumber(s) {
      return utils.tranNumber(s);
    },
  },
};
</script>

<style lang="less" scoped>
.banner-img {
  position: relative;

  .live-img {
    width: 100%;
    height: 6rem;
  }
}

.live-anchor {
  position: fixed;
  top: 0.2rem;
  left: 0.2rem;
  z-index: 999;

  .anchor-photo {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50%;
    background: #ffffff;
    margin-right: 0.1rem;
  }

  .anchor-name {
    color: #ffffff;
    font-size: 13px;
  }

  .anchor-gz {
    width: 1rem;
    margin-top: 0.1rem;
  }
}

.live-state {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  color: #fff;
  z-index: 999;

  .online {
    margin-top: 0.1rem;
    line-height: 0.28rem;

    .canyu {
      width: 0.28rem;
    }

    .font-text {
      padding-top: 0.05rem;
      padding-left: 0.1rem;
    }
  }
}

.notice {
  padding: 0 10px;

  .notice-img {
    width: 1.2rem;
    padding-right: 0.1rem;
  }
}

.float-tool {
  position: fixed;
  right: 0.1rem;
  bottom: 2.4rem;
  line-height: 0.6rem;
  text-align: center;
  z-index: 20;

  .hb-div {
    .hb {
      width: 0.64rem;
      padding-bottom: 10px;
    }
  }

  .zan-div {
    .zan {
      width: 0.64rem;
      height: 0.64rem;
    }

    .zan-font {
    }
  }

  .wallet {
    width: 37px;
    margin-bottom: 20px;
  }

  .fx-div {
    padding: 10px 0;

    .fx {
      width: 0.64rem;
      height: 0.64rem;
    }

    .fx-font {
      color: #a23232;
    }
  }

  .xs-div {
    font-size: 12px;
    line-height: 12px;
  }

  &.vertical,
  .fx-div .fx-font {
    color: #fff;
  }
}

/deep/ .van-tabs__nav--line {
  z-index: 5;
}

/deep/ .van-tab--active {
  .van-tab__text {
    color: #1c34bf;
  }
}

/deep/ .vjs-poster {
  background-size: 100%;
}

.popup {
  position: fixed;
  z-index: 11;
  width: 100%;
  bottom: 0;
  background-color: #fff;

  /deep/ .van-tabs__content {
    height: 40vh;
    overflow: auto;
  }
}

.vertical.notice {
  position: fixed;
  bottom: 1.2rem;
  width: 100%;
  color: #fff !important;
  background-color: transparent !important;
  z-index: 3;

  &.noticeByNoMsg {
    bottom: 10px;
  }
}

// @left: Math.random();
// @riseList: 1, 2, 3;
// .rise(@i) when (@i < length(@riseList)+1) {
//   //
// }
@keyframes rise {
  0% {
    left: 0;
    top: -0;
    opacity: 0.8;
  }

  20% {
    left: -10px;
    top: -70px;
    opacity: 0.7;
  }

  40% {
    left: 0;
    top: -140px;
    opacity: 0.6;
  }

  60% {
    left: 10px;
    top: -200px;
    opacity: 0.4;
  }

  80% {
    left: 0;
    top: -240px;
    opacity: 0.2;
  }

  100% {
    left: -10px;
    top: -270px;
    opacity: 0;
  }
}
</style>
<style lang="less">
.star-js {
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  line-height: 32px;
  text-align: center;
  top: 0;
  left: 0;
  opacity: 0.8;

  //   animation: rise 3s linear infinite;
  //   transition: all 0.5s;
  img {
    width: 18px;
  }
}
</style>
