<template>
	<div class="member">
		<memberHead ref="memberHead" @search="search"></memberHead>

		<div class="cont">
			<div class="left">
				<memberLeft ref="memberLeft"></memberLeft>
			</div>
			<div class="line"></div>
			<div class="right">
				<div class="title">服务订单 > 订单详情</div>

				<div v-if="model.orderStatus === '1'" style="margin-bottom: 10px;">
					<a-alert show-icon message="订单提示" type="warning">
						<div slot="description">
							订单当前状态为 【待支付】 ,<span style="font-size: 16px; font-weight: 700; color: #d54040;">{{ dateDown }}</span> 后订单将自动关闭
						</div>
					</a-alert>
				</div>

				<orderInfoCont ref="orderInfoCont" :shopOrder="model"></orderInfoCont>

				<div class="totalMoney">
					实付款：<span class="money">￥{{ formatMoney(model.payment) }}</span>
				</div>
				<div v-if="model.orderStatus === '1'" class="btnCont">
					<div @click="pay()" class="btn" :class="{ loading: isSubmit }">
						<a-icon v-if="isSubmit" type="loading" spin />
						立即支付
					</div>
				</div>
			</div>
		</div>

		<myserve></myserve>

		<!-- 扫码支付 -->
		<payQrcode v-if="showPayQrcode" ref="payQrcode" :shopOrder="model" @onClose="payQrcodeColse"></payQrcode>
	</div>
</template>

<script>
	import {
		getOrderInfo,
		orderLogList
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			memberHead: () => import("@/pages/pc/views/member/components/member-head.vue"),
			memberLeft: () => import("@/pages/pc/views/member/components/member-left.vue"),
			orderInfoCont: () => import("@/pages/pc/views/shop/order/components/order-info-cont.vue"),
			payQrcode: () => import("@/pages/pc/views/shop/order/components/pay-qrcode.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				model: {
					id: "",
					orderNum: "",
					createDate: "",
					serveTime: "",
					orderStatus: "0",
					payment: 0,
					payType: "支付宝", // 支付宝  微信支付
					goodsList: [],
					logList: []
				},
				endDateStr: '', //订单结束时间
				dateDown: '', //倒计时
				jobTime: null, //倒计时
				isSubmit: false,
				showPayQrcode: false //扫码支付二维码
			};
		},
		mounted() {
			this._getOrderInfo();
			this._orderLogList();
		},
		//页面销毁前
		beforeDestroy() {
			console.log('销毁定时器')
			if (this.jobTime) {
				//销毁定时器
				clearInterval(this.jobTime);
				this.jobTime = null;
			}
		},
		methods: {
			//搜索跳转到订单列表页面
			search(searchText) {
				if (searchText) {
					this.$router.push({
						name: "shop-order-orderList",
						params: {
							searchText: searchText
						}
					});
				}
			},
			_getOrderInfo() {
				if (this.$route.query.id) {
					getOrderInfo({
						id: this.$route.query.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							if (this.model.orderStatus === '1') {
								this.timeDown()
							}
						}
					});
				} else {
					this.$notification.error({
						message: "提示",
						description: "订单详情参数错误"
					});
					this.$router.push("mobile/#/shop/order/orderList");
				}
			},
			_orderLogList() {
				if (this.$route.query.id) {
					orderLogList({
						id: this.$route.query.id
					}).then(res => {
						if (res.code === 0) {
							this.model.logList = res.data;
						}
					});
				}
			},
			timeDown() {
				var dtime = this.model.createDate.replace(/-/g, "/")
				var date = new Date(dtime);
				var edate = utils.addDate(date, 'n', 30)
				this.endDateStr = utils.parseTime(edate)
				this.dateDown = utils.timeDown(this.endDateStr);
				this.jobTime = setInterval(() => {
					this.dateDown = utils.timeDown(this.endDateStr);
				}, 1000);
			},
			pay() {
				if (this.model.payType === '支付宝') {
					this.$router.push({
						path: '/pay/alipay-pay',
						query: {
							id: this.model.id
						}
					})
				} else {
					//打开支付二维码
					this.showPayQrcode = true
				}
			},
			payQrcodeColse(res) {
				this.showPayQrcode = false;
				window.location.reload()
				// if (res && res.code === 0) {
				// 	console.log("payQrcodeColse", res);
				// } else {
				// 	this.$router.push({
				// 		path: "/shop/order/orderInfo",
				// 		query: {
				// 			id: this.model.id
				// 		}
				// 	});
				// }
			},
			formatMoney(money) {
				return utils.formatMoney(money);
			}
		}
	};
</script>

<style lang="less" scoped>
	.member {
		background-color: #f5f5f5;

		.cont {
			width: 1200px;
			margin: auto;
			margin-top: 10px;
			margin-bottom: 50px;
			display: flex;
			min-height: 600px;
			background-color: #ffffff;

			.line {
				border: solid 2px #f2f2f2;
			}

			.left {
				width: 125px;
			}

			.right {
				flex: auto;
				padding: 20px;
				padding-bottom: 80px;

				.title {
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					margin-bottom: 20px;
				}

				.totalMoney {
					margin-top: 30px;
					text-align: right;
					font-size: 14px;
					font-weight: normal;
					color: #333333;
					line-height: 30px;

					.money {
						font-size: 20px;
						font-weight: 700;
						color: #d54040;
					}
				}

				.btnCont {
					position: relative;
					height: 48px;
					margin-top: 30px;
					margin-bottom: 30px;

					.btn {
						position: absolute;
						right: 0px;
						width: 160px;
						height: 48px;
						background-color: #d54040;
						text-align: center;
						font-size: 18px;
						font-weight: 700;
						line-height: 48px;
						color: #ffffff;
						cursor: pointer;

						&.loading {
							opacity: 0.7;
							cursor: no-drop;
						}
					}
				}
			}
		}
	}
</style>
