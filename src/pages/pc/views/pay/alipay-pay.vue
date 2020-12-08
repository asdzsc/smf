<template>
	<div v-html="formHtml">

	</div>
</template>

<script>
	import {
		tradePay
	} from '@/pages/pc/api/webpay'
	export default {
		data() {
			return {
				//支付宝支付表单
				formHtml: ''
			}
		},
		mounted() {
			this._tradePay()
		},
		methods: {
			_tradePay() {
				if (this.$route.query.id) {
					tradePay({
						orderId: this.$route.query.id
					}).then(res => {
						if (res.code === 0) {
							this.formHtml = res.data
							this.$nextTick(() => {
								document.forms[0].submit();
							})
						} else if (res.code === 1) {
							//订单金额为0 直接修改为支付成功并跳转到订单详情
							this.$router.push({
								path: "/shop/order/orderInfo",
								query: {
									id: this.$route.query.id
								}
							});
						} else {
							this.$router.push("/shop/order/orderList");
						}
					})
				} else {
					this.$notification.error({
						message: "提示",
						description: "订单参数错误"
					});
					return;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
