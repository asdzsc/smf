<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-video></jn-video>
	</div>
</template>

<script>
	export default{
		components:{
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-11/components/jn-video.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-11/components/jn-banner.vue")
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-image: url("/img/pc/11_banner.png");
		background-repeat: no-repeat;
		background-size: cover;
		padding-bottom: 100px;
	}
</style>
