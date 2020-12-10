<template>
	<div class="article">
		<div class="title">
			<img src="/img/pc/05_hert.png" alt="">
			<p>纪念文章</p>
			<img src="/img/pc/05_hert.png" alt="">
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
				<paging v-if="paginghide" ref="paging" @setPage="setPage"></paging>
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
	.article {
		width: 1200px;
		margin: 30px auto;

		.title {
			font-size: 40px;
			color: #0d1351;
			text-align: center;
			margin: 50px auto;
			margin-top: 100px;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 40px;
				height: 40px;
			}

			p {
				margin: 0 10px;
			}
		}

		.articleInfo {

			.articleItem {
				display: flex;
				flex-wrap: wrap;
	background-color: #ffffff;
	box-shadow: 0px 4px 19px 1px 
		rgba(158, 143, 140, 0.2);
	border: solid 3px #ffdcd4;
				.articleList {
					width: 380px;
					margin-right: 25px;
						height: 388px;
 
					
					&:last-child {
						margin-right: 0;
					}



					.articleCont {
						width: 280px;
						padding-bottom: 50px;
						margin: 0 auto;
						margin-top: 10px;
						box-sizing: border-box;
						img {
							    padding-top: 15px;
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
