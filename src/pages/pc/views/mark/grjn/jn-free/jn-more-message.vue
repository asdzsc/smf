<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-message></jn-message>
	</div>
</template>

<script>
	export default{
		components:{
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-message.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-free/components/jn-banner.vue"),
			
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background-repeat: no-repeat;
		background-image: url("/img/pc/1_banner.png");
		background-size: 100% auto;
		padding-bottom: 100px;
	}
</style>
