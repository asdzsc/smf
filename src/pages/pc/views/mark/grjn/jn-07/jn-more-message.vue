<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-message></jn-message>
	</div>
</template>

<script>
	export default{
		components:{
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-07/components/jn-message.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-07/components/jn-banner.vue"),
			
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-image: url("/img/pc/07_banner.png");
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
</style>
