<template>
	<div class="lijiyuyue pointer">
		<img @click="openConfirmOrder()" src="/img/ljyy.png" alt="" />
	</div>
</template>

<script>
	export default {
		props: {
			goodsId: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {
			//立即购买
			openConfirmOrder() {
				if (this.goodsId) {
					var data = {
						type: "shop",
						gid: this.goodsId,
						goodsNum: 1,
						spec: "",
						orderType: 1
					};
					this.$router.push({
						path: "/shop/order/confirmOrder",
						query: data
					});
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.lijiyuyue {
		position: fixed;
		top: 200px;
		right: 15px;
		z-index: 2;
	}
</style>
