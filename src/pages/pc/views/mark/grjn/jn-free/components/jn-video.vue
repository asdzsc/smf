<template>
	<div class="video">
		<div class="title">
			<p>纪念视频</p>
			<div class="line"></div>
		</div>
		<div class="videoInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="videoItem">


					<div class="videoList">
						<video src="movie.ogg" poster="/img/pc/1_10.png"></video>
						<div class="videoCont">
							<img src="/img/pc/1_video.png" alt="">
							<p class="videoTitle">第一次演唱会</p>
							<p class="videoTime">2020年1月1日</p>
						</div>
					</div>
					<div class="videoList">
						<video src="movie.ogg" poster="/img/pc/1_11.png"></video>
						<div class="videoCont">
							<img src="/img/pc/1_video.png" alt="">
							<p class="videoTitle">第一次演唱会</p>
							<p class="videoTime">2020年1月1日</p>
						</div>
					</div>
					<div class="videoList">
						<video src="movie.ogg" poster="/img/pc/1_12.png"></video>
						<div class="videoCont">
							<img src="/img/pc/1_video.png" alt="">
							<p class="videoTitle">第一次演唱会</p>
							<p class="videoTime">2020年1月1日</p>
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
			line-height: 30px;
			color: #00744c;
			text-align: center;
			margin-top: 50px;
					margin-bottom: 20px;

			.line {
				margin: 0 auto;
				width: 160px;
				height: 8px;
				background-color: #00744c;
				border-radius: 4px;
			}
		}

		.videoInfo {

			.videoItem {
				display: flex;
				flex-wrap: wrap;

				.videoList {
					width: 380px;
					height: 300px;
					position: relative;
					margin-right: 30px;
					display: flex;
					justify-content: center;
					cursor: pointer;

					&:last-child {
						margin-right: 0;
					}

					.videoCont {
						position: absolute;
						bottom: 0;
						display: flex;
						flex-direction: column;
						align-items: center;

						.videoTitle {
							font-size: 24px;
							line-height: 20px;
							color: #ffffff;
							margin-top: 65px;
						}

						.videoTime {
							font-size: 14px;
							line-height: 20px;
							color: #ffffff;
						}
					}
				}
			}

		}
	}
</style>
