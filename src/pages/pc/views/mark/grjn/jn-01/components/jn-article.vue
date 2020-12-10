<template>
	<div class="article">
		<div class="title">
			<p>纪</p>
			<p>念</p>
			<p>文</p>
			<p>章</p>
		</div>
		<div class="articleInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="articleItem">
					<div class="articleList">
						<img src="/img/pc/1_07.png" alt="">
						<div class="articleCont">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
					<div class="articleList">
						<img src="/img/pc/1_08.png" alt="">
						<div class="articleCont">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
					<div class="articleList">
						<img src="/img/pc/1_09.png" alt="">
						<div class="articleCont">
							<p class="articleTitle">纪念文章</p>
							<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
						</div>
					</div>
				</div>
				<paging  v-if="paginghide" ref="paging" @setPage="setPage"></paging>
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
				paginghide: true,
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
	.article {
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

		.articleInfo {

			.articleItem {
				display: flex;
				flex-wrap: wrap;

				.articleList {
					width: 380px;
					background-image: url("/img/pc/01line1.png");
					background-size: 100% 100%;
					margin-right: 30px;
					box-sizing: border-box;
					padding-top: 65px;
					padding-left: 70px;

					&:last-child {
						margin-right: 0;
					}

					img {
						width: 260px;
					}

					.articleCont {
						width: 260px;
						padding-bottom: 50px;

						.articleTitle {
							margin: 0 auto;
							font-size: 24px;
							letter-spacing: 1px;
							margin-top: 30px;
							line-height: 30px;
							letter-spacing: 1px;
							color: #333333;
						}

						.articleMsg {
							margin: 0 auto;
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
