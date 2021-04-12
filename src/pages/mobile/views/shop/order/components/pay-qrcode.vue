<template>
	<modal :title="title" @onClose="handleCancel" width="500px">
		<div class="cont">
			<div>
				<img class="zfImg" :src="titleLog" />
			</div>
			<vue-qr :text="codeValue" :margin="0" :dotScale="1"></vue-qr>
			<div @click="handleCancel" class="btn">支付完成</div>
		</div>
	</modal>
</template>

<script>
	import vueQr from "vue-qr";
	export default {
		components: {
<<<<<<< HEAD
			modal: () => import("@/pages/mobile/components/modal.vue"),
=======
			modal: () => import("@/pages/pc/components/modal.vue"),
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			vueQr
		},
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {
						payType: "微信支付"
					};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				title: "",
				titleLog: "",
				codeValue: ""
			};
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.title = "扫码支付";
				this.titleLog = "/img/wxpay.jpg";
				if (this.shopOrder.id) {
					this.codeValue = this.baseUrl + "/pay/wxpay_page?orderId=" + this.shopOrder.id;
				} else {
					this.$notification.error({
						message: "提示",
						description: "订单参数错误"
					});
					this.handleCancel()
				}
				// if (this.shopOrder.payType === "支付宝") {
				//   this.titleLog = "/img/zfbpay.jpg";
				// } else {
				//   this.titleLog = "/img/wxpay.jpg";
				// }
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.cont {
		text-align: center;
		padding: 40px 80px;

		.zfImg {
			height: 100px;
		}

		.btn {
			margin: auto;
			margin-top: 60px;
			width: 180px;
			height: 48px;
			background-color: #004930;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			line-height: 48px;
			color: #ffffff;
			cursor: pointer;
		}
	}
</style>
