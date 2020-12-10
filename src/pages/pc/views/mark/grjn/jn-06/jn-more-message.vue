<template>
	<div class="grjn">
		<jnBanner></jnBanner>
		<jn-message></jn-message>
	</div>
</template>

<script>
	export default{
		components:{
			jnMessage: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-message.vue"),
			jnBanner: () => import("@/pages/pc/views/mark/grjn/jn-06/components/jn-banner.vue"),
			
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.grjn {
		background: url("/img/pc/06_banner.png") no-repeat;
		background-position-x: center;
		padding-bottom: 100px;
	}
</style>
