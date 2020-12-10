<template>
	<div class="video">
		<div class="title">
			<p>纪</p>
			<p>念</p>
			<p>视</p>
			<p>频</p>
		</div>
		<div class="videoInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="videoItem">
					<div class="videoList">
						<div class="videoPlay">
							<img class="video_icon" src="/img/pc/1_video.png" alt="">
							<video src="movie.ogg" poster="/img/pc/02_01.png"></video>
						</div>
						<div class="videoCont">
							<p class="videoTitle">怀念你视频</p>
							<p class="videoTime">2017年12月25日 17：30</p>
						</div>
					</div>
					<div class="videoList">
						<div class="videoPlay">
							<img class="video_icon" src="/img/pc/1_video.png" alt="">
							<video src="movie.ogg" poster="/img/pc/02_01.png"></video>
						</div>
						<div class="videoCont">
							<p class="videoTitle">怀念你视频</p>
							<p class="videoTime">2017年12月25日 17：30</p>
						</div>
					</div>
					<div class="videoList">
						<div class="videoPlay">
							<img class="video_icon" src="/img/pc/1_video.png" alt="">
							<video src="movie.ogg" poster="/img/pc/02_01.png"></video>
						</div>
						<div class="videoCont">
							<p class="videoTitle">怀念你视频</p>
							<p class="videoTime">2017年12月25日 17：30</p>
						</div>
					</div>
 
				</div>
			</a-spin>
			<paging  v-if="paginghide" ref="paging" @setPage="setPage"></paging>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			paging: () => import("@/pages/pc/views/mark/components/paging.vue"),
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				paginghide:true,
				model: {
					current: "1",
					pageSize: "8",
					total: "0",
					list: []
				}
			};
		},
		watch: {
		   $route: {
		    handler: function(route) {
		     if (route.path.split("-")[0] == "/mark/grjn") {
		      this.paginghide = false;
		     }
		    },
		    immediate: true
		   }
		  },
		methods: {
			setPage() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.video {
		width: 1200px;
		margin: 30px auto;

		.title {
			font-size: 40px;
			color: #333333;
			text-align: center;
			margin: 50px 0;
			margin-top: 100px;
			display: flex;
			justify-content: center;

			p {
				width: 71px;
				height: 71px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				border: solid 6px #872121;
				margin-right: 2px;
			}

			&:last-child {
				margin-right: 0;
			}
		}

		.videoInfo {
			.videoItem {
				display: flex;
				flex-wrap: wrap;

				.videoList {
					width: 380px;
					position: relative;
					margin-right: 30px;
					display: flex;
					flex-direction: column;
					cursor: pointer;

					.videoPlay {
						width: 100%;
						position: relative;
						video{
							height: 230px;
							width: 100%;
						}
						.video_icon {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
					}

					&:last-child {
						margin-right: 0;
					}

					.videoCont {
						line-height: 28px;
						color: #927255;
						text-align: center;
						margin-top: 20px;

						.videoTitle {
							font-size: 20px;
						}

						.videoTime {
							font-size: 14px;
						}
					}
				}
			}

		}
	}
</style>
