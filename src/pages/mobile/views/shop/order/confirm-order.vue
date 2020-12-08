<template>
	<div class="confirmOrder">
		<div class="orderTitle">
			<div class="link">
				<a href="/mobile/#/shop">商城首页</a>
				<van-icon name="arrow" />
				<a href="/mobile/#/shop/cart">购物车</a>
				<span>
					<van-icon name="arrow" />核对订单信息
				</span>
			</div>
		</div>
		<div class="orderInfo">
			<div class="cont">
				<orderAddress ref="orderAddress"></orderAddress>
				<orderForm ref="orderForm"></orderForm>
				<orderPayType ref="orderPayType"></orderPayType>
			</div>
			<orderGoodsList ref="orderGoodsList" @statistics="statistics"></orderGoodsList>
		</div>
		<div class="totalWrap">
			<div class="totalMoney">
				{{ goodsNum }}件商品 合计:<span class="money">{{ totalPriceText }}</span>
			</div>
			<div class="btnCont" @click="pay()">
				提交订单
				<!-- 
				<van-button v-if="isSubmit" loading size="normal" type="primary" >
				</van-button> 
				-->
			</div>
		</div>
		<!-- 扫码支付 -->
		<!-- <payQrcode v-if="showPayQrcode" ref="payQrcode" :shopOrder="shopOrder" @onClose="payQrcodeColse"></payQrcode> -->
	</div>
</template>


<script>
	import {
		saveOrder,
		getCartNum
	} from "@/pages/mobile/api/shop";
	export default {
		components: {
			orderAddress: () => import("@/pages/mobile/views/shop/order/components/order-address.vue"),
			orderForm: () => import("@/pages/mobile/views/shop/order/components/order-form.vue"),
			orderPayType: () => import("@/pages/mobile/views/shop/order/components/order-pay-type.vue"),
			orderGoodsList: () => import("@/pages/mobile/views/shop/order/components/order-goods-list.vue"),
			payQrcode: () => import("@/pages/mobile/views/shop/order/components/pay-qrcode.vue"),
		},
		data() {
			return {
				show: false,
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				type: "shop", //进去类型 shop商城 cart购物车
				loading: false,
				model: {}, //表单提交数据
				goodsNum: 0,
				totalPriceText: "",
				isSubmit: false,
				showPayQrcode: false, //扫码支付二维码
				shopOrder: {} //订单数据
			}
		},
		mounted() {
			this.type = this.$route.query.type ? this.$route.query.type : "shop";
			this.loadData();
		},
		methods: {
			loadData() {
				var data = {
					orderType: "0", //默认普通订单
					bpname: "", //落葬人
					cemeaddress: "", //墓址
					contacts: "", //联系人
					mobile: "", //联系电话
					serveTime: "",
					serveTimeDate: null,
					serveType: "代客服务", // 代客服务  自取方式
					remark: "",
					payType: "支付宝", // 支付宝  微信支付
					goodsList: [] //商品
				};
				data.orderType = this.$route.query.orderType ? this.$route.query.orderType : "0";
				Object.assign(this.model, data);
				Object.assign(this.shopOrder, data);
			},
			statistics(res) {
				this.goodsNum = res.goodsNum;
				this.totalPriceText = res.totalPriceText;
			},
			//提交订单支付
			pay() {
				if (!this.isSubmit) {
					this.isSubmit = true;
					//服务墓址
					var cemetery = this.$refs.orderAddress.getData();
					//服务信息
					var orderForm = this.$refs.orderForm.getData();
					//支付方式
					var payType = this.$refs.orderPayType.getData();
					//商品列表
					var goodsList = this.$refs.orderGoodsList.getData();

					if (cemetery && orderForm && payType) {
						this.model.bpname = cemetery.bpname;
						this.model.cemeaddress = cemetery.cemeaddress;
						Object.assign(this.model, orderForm);
						this.model.payType = payType;
						this.model.goodsList = goodsList;
						saveOrder(this.model).then(res => {
							console.log(res)
							let orderId = res.data.id;
							if (res.code === 0) {
								//刷下购物车
								this._getCartNum();
								Object.assign(this.shopOrder, res.data);
								this.$notify({
								  type: "success",
								  message: "订单提交成功"
								});
								if (res.data.payment > 0) {
									if (this.model.payType === '支付宝') {
										// this.$router.push({
										// 	path: '/pay/alipay-pay',
										// 	query: {
										// 		id: res.data.id
										// 	}
										// })
									} else {
										//打开支付二维码
										// this.showPayQrcode = true
										const wxPay = this.baseUrl + '/pay/wxpay_page?orderId=' + orderId
										window.location.href = wxPay
									}
								} else {
									//免费直接打开订单详情
									this.$router.push({
										path: '/shop/order/orderInfo',
										query: {
											id: res.data.id
										}
									})
								}
							}
						});
					} else {
						this.isSubmit = false;
					}
				}
			},
			//刷新购物车
			_getCartNum() {
				if (this.type === 'cart') {
					getCartNum().then(res => {
						if (res.code === 0) {
							this.$store.commit("account/setCartNum", res.data);
						}
					});
				}
			}
		}

	}
</script>

<style lang="less" scoped>
	.confirmOrder {
		background: #f4f4f4;

		.orderTitle {
			background: #fff;
			display: flex;
			font-size: .32rem;
			height: 1.1rem;
			align-items: center;
			padding: 0 4%;

			.link {
				a {
					color: #333333;
				}
			}
		}

		.totalWrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0 0 4%;
			height: .88rem;
			background-color: #ffffff;
			box-shadow: 0px -3px 5px 0px #c1c1c1;

			.totalMoney {
				font-size: .26rem;
				color: #333333;

				.money {
					color: #d54040;
					margin-left: .1rem;
				}
			}

			.btnCont {
				width: 2.36rem;
				background-color: #004930;
				font-size: .28rem;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
			}
		}


	}
</style>
