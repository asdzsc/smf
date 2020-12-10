<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-article></jn-article>
	</div>
</template>

<script>
	export default{
		components:{
			jnArticle: () => import("@/pages/pc/views/mark/grjn/jn-04/components/jn-article.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-04/components/jn-banner.vue"),
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background: url("/img/pc/04_banner.png") no-repeat;
		background-position-x: center;
		padding-bottom: 200px;
	}
</style>
