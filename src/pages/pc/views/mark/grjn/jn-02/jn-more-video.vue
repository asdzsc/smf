<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-video></jn-video>
	</div>
</template>

<script>
	export default{
		components:{
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-02/components/jn-video.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-02/components/jn-banner.vue")
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-image: url("/img/pc/02_banner.png");
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
</style>
