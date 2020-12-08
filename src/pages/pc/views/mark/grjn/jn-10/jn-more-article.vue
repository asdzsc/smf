<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-article style="margin-top: 230px;"></jn-article>
	</div>
</template>

<script>
	export default{
		components:{
			jnArticle: () => import("@/pages/pc/views/mark/grjn/jn-10/components/jn-article.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-10/components/jn-banner.vue"),
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-image: url("/img/pc/10_banner.png");
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
