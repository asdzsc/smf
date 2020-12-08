<template>
	<div style="min-height:100%">
		<myhead />
		<div class="content">
			<div class="skeleton">
				<a-skeleton />
			</div>
		</div>
		<myfoot />
	</div>
</template>

<script>
	import {
		getOrderInfo
	} from "@/pages/pc/api/shop";
	import * as shop from "@/comment/dictionary";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			myhead: () => import("@/pages/pc/components/myhead.vue"),
			myfoot: () => import("@/pages/pc/components/myfoot.vue")
		},
		data() {
			return {
				model: {
					orderStatus: '1'
				}
			}
		},
		mounted() {
			this._getOrderInfo()
		},
		methods: {
			_getOrderInfo() {
				if (this.$route.query.out_trade_no) {
					getOrderInfo({
						orderNum: this.$route.query.out_trade_no
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							this.$router.push({
								path: "/shop/order/orderInfo",
								query: {
									id: this.model.id
								}
							});
						}
					});
				} else {
					this.$notification.error({
						message: "提示",
						description: "订单详情参数错误"
					});
					this.$router.push("/shop/order/orderList");
				}
			},
			orderStatusText(status) {
				return shop.orderStatusText(status);
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		.skeleton {
			width: 1200px;
			margin: auto;
			text-align: center;
			padding: 50px;
		}

	}
</style>
