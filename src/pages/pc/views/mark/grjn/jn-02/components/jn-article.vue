<template>
	<div class="article">
		<div class="title">
			<img src="/img/pc/02_star.png" alt="">
			<p>纪念相册</p>
			<img src="/img/pc/02_star.png" alt="">
		</div>
		<div class="articleInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="articleItem">
					<div class="articleList">
						<div class="articleCont">
							<img src="/img/pc/1_07.png" alt="">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
					<div class="articleList">
						
						<div class="articleCont">
							<img src="/img/pc/1_08.png" alt="">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
					<div class="articleList">
						<div class="articleCont">
							<img src="/img/pc/1_09.png" alt="">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
				</div>
				<paging ref="paging" @setPage="setPage"></paging>
			</a-spin>
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
	.article {
		width: 1200px;
		margin: 30px auto;

		.title {
			font-size: 40px;
			color: #0d1351;
			text-align: center;
			margin: 50px 0;
			margin-top: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
					width: 40px;
					height: 40px;
			}
			p{
				margin: 0 10px;
			}
		}

		.articleInfo {

			.articleItem {
				display: flex;
				flex-wrap: wrap;

				.articleList {
					width: 380px;
					margin-right: 30px;
						height: 388px;
						background-color: #ffffff;
						box-shadow: 2px 4px 10px 0px 
							rgba(101, 101, 101, 0.35);
					
					&:last-child {
						margin-right: 0;
					}



					.articleCont {
						width: 280px;
						padding-bottom: 50px;
						margin: 0 auto;
						margin-top: 10px;
						img {
							width: 280px;
						}
						.articleTitle {
						
							font-size: 24px;
							letter-spacing: 1px;
							margin-top: 30px;
							line-height: 30px;
							letter-spacing: 1px;
							color: #333333;
						}

						.articleMsg {
							margin-top: 20px;
							text-align: justify;
							font-size: 14px;
							line-height: 20px;
							color: #666666;
						}
					}
				}
			}
		}
	}
</style>
