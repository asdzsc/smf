<template>
	<div class="grjn">
		<jn-banner></jn-banner>
		<jn-video></jn-video>
	</div>
</template>

<script>
	export default{
		components:{
			jnVideo: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-video.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-banner.vue")
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background: url("/img/pc/1_banner.png") no-repeat;
		background-position-x: center;
		padding-bottom: 100px;
	}
</style>
