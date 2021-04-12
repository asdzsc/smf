<template>
<<<<<<< HEAD
	<div>
		<gywmTabs ref="gywmTabs"></gywmTabs>
		<div class="banner">
			<van-image class="bannerImg" fit="cover" src="/img/mobile/banner13.png" />
		</div>
		<div class="cont">
			<div class="contTitle">到石门峰寻找生命到意义......</div>

			<div class="card">
				<div class="cardImg">
					<!-- <van-image fit="cover" src="/img/mobile/banner13.png" /> -->
					<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
					 :events="events"></video-player>
				</div>
				<!-- <div class="title" style="padding-top: 0.3rem;">
=======
  <div>
    <gywmTabs ref="gywmTabs"></gywmTabs>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner13.png" />
    </div>
    <div class="cont">
      <div class="contTitle">到石门峰寻找生命到意义......</div>

      <div class="card">
        <div class="cardImg">
          <!-- <van-image fit="cover" src="/img/mobile/banner13.png" /> -->
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            :events="events"
          ></video-player>
        </div>
        <!-- <div class="title" style="padding-top: 0.3rem;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          石门峰2020年活动视频
        </div>
        <div class="title2" style="padding-top: 0.2rem;">
          2020年9月9日 13:36
        </div> -->
<<<<<<< HEAD
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			gywmTabs: () => import("@/pages/mobile/views/gywm/components/gywm-tabs.vue")
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
					sources: [{
						type: "video/mp4",
						src: ""
					}],
					poster: "/img/mobile/mp4gb.png", //你的封面地址
					notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				}
			};
		},
		mounted() {
			this.playerOptions.sources[0].src = this.baseUrl + "/img/qysp.mp4";
		},
		methods: {}
	};
</script>

<style lang="less" scoped>
	/deep/ .vjs-tech {
		width: 100%;
		height: 4.2rem;
	}

	/deep/ .vjs-fluid {
		padding-top: 4.2rem;
	}

	/deep/ .video-js .vjs-big-play-button {
		left: calc(50% + 0.5em) !important;
		top: calc(50%) !important;
	}

	.banner {
		.bannerImg {
			width: 100%;
			height: 5rem;
		}
	}

	.cont {
		padding-bottom: 0.5rem;

		.contTitle {
			padding-top: 0.5rem;
			text-align: center;
			font-size: 0.3rem;
			letter-spacing: 3px;
			color: #333333;
		}

		.card {
			padding: 0.6rem 0.4rem 0rem;

			.cardImg {
				width: 100%;
				height: 4.2rem;
				background-color: #000000;
				border-radius: 10px;
				overflow: hidden;
			}

			.title {
				font-size: 0.32rem;
				font-weight: normal;
				color: #333333;
			}

			.title2 {
				font-size: 0.3rem;
				color: #999999;
			}
		}
	}
=======
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    gywmTabs: () => import("@/pages/mobile/views/gywm/components/gywm-tabs.vue")
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
            src: ""
          }
        ],
        poster: "/img/mobile/mp4gb.png", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  mounted() {
    this.playerOptions.sources[0].src = this.baseUrl + "/img/qysp.mp4";
  },
  methods: {}
};
</script>

<style lang="less" scoped>
/deep/ .vjs-tech {
  width: 100%;
  height: 4.2rem;
}

/deep/ .vjs-fluid {
  padding-top: 4.2rem;
}

.banner {
  .bannerImg {
    width: 100%;
    height: 5rem;
  }
}

.cont {
  padding-bottom: 0.5rem;
  .contTitle {
    padding-top: 0.5rem;
    text-align: center;
    font-size: 0.28rem;
    letter-spacing: 3px;
    color: #333333;
  }

  .card {
    padding: 0.6rem 0.4rem 0rem;

    .cardImg {
      width: 100%;
      height: 4.2rem;
      background-color: #000000;
      border-radius: 10px;
      overflow: hidden;
    }

    .title {
      font-size: 0.32rem;
      font-weight: normal;
      color: #333333;
    }

    .title2 {
      font-size: 0.24rem;
      color: #999999;
    }
  }
}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
