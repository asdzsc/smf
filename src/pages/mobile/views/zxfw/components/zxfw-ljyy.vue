<template>
	<div class="lijiyuyue">
		<div @click="openConfirmOrder()" class="btn">立即预约</div>
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
		bottom: 0rem;
		z-index: 2;
		width: 100%;
		padding: 0.25rem 0rem;
		background-color: rgba(255, 255, 255, 0.8);

		.btn {
			opacity: 1;
			width: 4.46rem;
			height: 0.8rem;
			background-color: #00744c;
			border-radius: 0.4rem;
			margin: auto;
			font-size: 0.32rem;
			font-weight: 700;
			line-height: 0.8rem;
			letter-spacing: 4px;
			color: #ffffff;
			text-align: center;
		}
	}
</style>
