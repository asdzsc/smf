<template>
	<div class="article">
		<div class="title">
			<p>纪念文章</p>
			<div class="line"></div>
		</div>
		<div class="articleInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
			  <a-icon
			    slot="indicator"
			    type="loading"
			    style="font-size: 30px; color: #004930;"
			    spin
			  />
			  <div class="articleItem">
				<div class="articleList">
					<img src="/img/pc/1_07.png" alt="">
					<div class="articleCont">
						<p class="articleTitle">纪念你（hover）</p>
						<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
					</div>
				</div>
				<div class="articleList">
					<img src="/img/pc/1_08.png" alt="">
					<div class="articleCont">
						<p class="articleTitle">纪念你（hover）</p>
						<p class="articleMsg">时间一晃黄的，跨过了2014，在时间的长河中，你我她，都如大海里的一滴水，渺小的激不起一点点涟漪。感叹生命的短暂，然又为生命的伟大而惊奇。</p>
					</div>
				</div>
				<div class="articleList">
					<img src="/img/pc/1_09.png" alt="">
					<div class="articleCont">
						<p class="articleTitle">纪念你（hover）</p>
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
	export default{
		components:{
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
		methods:{
			setPage(){
				
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
		.articleInfo {

			.articleItem{
				display: flex;
				flex-wrap: wrap;
				.articleList {
					width: 380px;
					height: 440px;
					background-color: #ffffff;
					margin-right: 30px;
				
					&:last-child {
						margin-right: 0;
					}
				
					&:hover {
						border-bottom: 8px solid #00744c;
					}
				
					img {
						width: 380px;
						height: 240px;
						background-color: #000000;
					}
				
					.articleCont {
						height: 200px;
				
						.articleTitle {
							width: 335px;
							margin: 0 auto;
							font-size: 24px;
							line-height: 30px;
							letter-spacing: 1px;
							color: #00744c;
							margin-top: 30px;
						}
				
						.articleMsg {
							width: 335px;
							margin: 0 auto;
							margin-top: 20px;
							text-align: justify;
							font-size: 14px;
							line-height: 20px;
							letter-spacing: 1px;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>
