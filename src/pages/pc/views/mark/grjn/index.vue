<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-photo></jn-photo>
		<jn-message></jn-message>
		<div class="moreBtn"  @click="openUrl('/mark/grjn/jn-free/jn-more-message')">
			更多留言
		</div>
		<jn-article></jn-article>
		<div class="moreBtn" @click="openUrl('/mark/grjn/jn-free/jn-more-article')">
			更多文章
		</div>
		<jn-video></jn-video>
		<div class="moreBtn" @click="openUrl('/mark/grjn/jn-free/jn-more-video')">
			更多视频
		</div>
	</div>
</template>

<script>
	export default{
		components:{
			jnPhoto: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-photo.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-banner.vue"),
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-message.vue"),
			jnArticle: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-article.vue"),
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-video.vue")
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
		background: url("/img/pc/1_banner.png") no-repeat center center;
		background-size: cover;
		padding-bottom: 100px;
		.moreBtn {
			font-size: 20px;
			line-height: 20px;
			color: #00744c;
			text-align: center;
			margin-top: 30px;
			margin-bottom: 100px;
			cursor: pointer;
		}
		.paging{
			display: none;
		}
	}
</style>
