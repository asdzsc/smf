<template>
	<div class="grjn">
		<jnBanner style="height: 820px;"></jnBanner>
		<jn-video></jn-video>
	</div>
</template>

<script>
	export default{
		components:{
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-03/components/jn-video.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-03/components/jn-banner.vue")
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-image: url("/img/pc/03_banner11.png");
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
</style>
