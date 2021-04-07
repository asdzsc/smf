<template>
  <div class="gywm">
    <div class="banner"></div>
    <gywmHead name="企业视频"></gywmHead>
    <div class="cont">
      <div class="title1">
        到石门峰寻找生命到意义......
      </div>
      <div class="contMp4">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @ready="playerReadied"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @fullscreenchange="onFullscreenChange($event)"
          :events="events"
        ></video-player>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  components: {
    gywmHead: () => import("@/pages/pc/views/gywm/components/gywm-head.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      events: ["fullscreenchange"],
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 16:9横屏 9:16竖屏   将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "",
          },
        ],
        poster: "/img/mp4gb.png", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  mounted() {
    this.playerOptions.sources[0].src = this.baseUrl + "/img/qysp.mp4";
  },
  methods: {
    playerReadied() {
      // var video = $("body").find("video");
      // if (video) {
      //   video.height(600);
      // }
    },
    // eslint-disable-next-line
    onPlayerPlay(player) {},
    // eslint-disable-next-line
    onPlayerPause(player) {
      console.log(player);
    },
    onFullscreenChange(player) {
      // player.exitFullscreen() //强制退出全屏，恢复正常大小
      if (player.isFullscreen()) {
        // var wh = document.documentElement.clientHeight;
        // $(".vjs-tech").css({ height: wh + "px" });
        // $(".vjs-fluid").css({ height: wh + "px" });
      } else {
        // $(".vjs-tech").css({ height: "600px" });
        // $(".vjs-fluid").css({ height: "600px" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .vjs-tech {
  width: 100%;
  height: 600px;
}

/deep/ .vjs-fluid {
  padding-top: 600px;
}

/deep/ .video-js .vjs-big-play-button {
  left: calc(50% + 0.5em) !important;
  top: calc(50%) !important;
}

.gywm {
  .banner {
    background: url("/img/banner13.png") no-repeat center center;
    background-size: cover;
    height: 600px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;
    margin-top: 60px;
    margin-bottom: 100px;

    .title1 {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 3px;
      color: #333333;
    }

    .contMp4 {
      margin-top: 70px;
      height: "600px";
    }
  }
}
</style>
