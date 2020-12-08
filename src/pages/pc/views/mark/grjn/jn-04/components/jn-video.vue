<template>
	<div class="video">
		<div class="title">
					<div class="top"> <p>纪念</p>
					 <span>★</span>
					 <p>视频	</p></div>
					 <div class="bottom">
						 <img src="/img/pc/04_title.png" alt="">
					 </div>
				</div>
		<div class="videoInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<img class="spLeft" src="/img/pc/04_sp.png" alt="">
				<div class="videoInfoBox"></div>
				<img class="spRight" src="/img/pc/04_sp.png" alt="">
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
			<paging ref="paging" @setPage="setPage"></paging>
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
				model: {
					current: "1",
					pageSize: "8",
					total: "0",
					list: []
				}
			};
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
			text-align: center;
			margin: 50px auto;
			margin-top: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.top{
				display: flex;
				justify-content: center;
				    height: 55px;
				color: #333333;
				span{
					color: #ff4125;
				}
			}

		}
		
		.videoInfo {
					position: relative;
					.videoInfoBox{
						width: 1260px;
						height: 280px;
						background-color: #df0024;
						border-radius: 10px;
						position: absolute;
						left: -30px;
						top: 0;
					}
					.spLeft{
						position: absolute;
						left: -115px;
						top: 0;
					}
					.spRight{
						position: absolute;
						right: -115px;
						top: 0;
					}
			.videoItem {
				display: flex;
				flex-wrap: wrap;
				padding-top: 80px;
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
