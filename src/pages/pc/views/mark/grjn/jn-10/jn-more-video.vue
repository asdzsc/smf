<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-video style="margin-top: 230px;"></jn-video>
	</div>
</template>

<script>
	export default{
		components:{
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-10/components/jn-video.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-10/components/jn-banner.vue")
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
