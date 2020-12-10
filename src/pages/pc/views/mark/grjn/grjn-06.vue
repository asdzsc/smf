<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-photo></jn-photo>
		<jn-message></jn-message>
		<div class="moreBtn"  @click="openUrl('/mark/grjn/jn-06/jn-more-message')">
			<img src="/img/pc/06_l.png" alt="">
			<p>更多留言</p> 
			<img src="/img/pc/06_r.png" alt="">
		</div>
		<jn-article></jn-article>
		<div class="moreBtn" @click="openUrl('/mark/grjn/jn-06/jn-more-article')">
			<img src="/img/pc/06_l.png" alt="">
			<p>更多文章</p> 
			<img src="/img/pc/06_r.png" alt="">
		</div>
		<jn-video></jn-video>
		<div class="moreBtn" @click="openUrl('/mark/grjn/jn-06/jn-more-video')">
			<img src="/img/pc/06_l.png" alt="">
			<p>更多视频</p> 
			<img src="/img/pc/06_r.png" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			jnPhoto: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-photo.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-banner.vue"),
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-message.vue"),
			jnArticle: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-article.vue"),
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-video.vue")
		},
		data(){
			return{
				
			}
		},
		methods:{
			openUrl(url) {
			  if (url) {
			    if (url.indexOf("http") >= 0) {
			      window.location = url;
			    } else {
			      this.$router.push(url);
			    }
			  }
			},
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background: url("/img/pc/06_banner.png") no-repeat;
		background-position-x: center;
		padding-bottom: 100px;
		.moreBtn {
			font-size: 20px;
			line-height: 20px;
			color: #343437;
			text-align: center;
			margin-top: 30px;
			cursor: pointer;
			display: flex;
			justify-content: center;
			p{
					margin: 0 10px;
			}
		}
		.paging{
			display: none!important;
		}
	}
</style>
