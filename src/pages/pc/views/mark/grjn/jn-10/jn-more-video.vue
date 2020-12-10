<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-video style="margin-top: 430px;"></jn-video>
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
	background: url("/img/pc/10_banner.png") no-repeat;
		background-position-x: center;
		padding-bottom: 100px;
	}
</style>
