<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-message style="margin-top: 230px;"></jn-message>
	</div>
</template>

<script>
	export default{
		components:{
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-10/components/jn-message.vue"),
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
