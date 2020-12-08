<template>
	<div class="orderInfoCont">
		<ul class="goodsList">
			<li class="goodsItem">
				<div class="goodsItemTitle">
					<p class="goodsOrderNum">订单号：{{ shopOrder.orderNum }}</p>
					<p class="goodsOrderTime">日期：{{ shopOrder.createDate }}</p>
					<p class="goodsOrderTime"> 服务时间：{{ parseTime(shopOrder.serveTime) }}</p>
				</div>
				<div class="goodsItemInfo" v-for="goodsItem in shopOrder.goodsList" :key="goodsItem.id">
					<div class="divTitle">
						<div class="itemDiv">
							<img :src="baseUrl + goodsItem.cover" alt="">
							<div class="serviceDiv">
								<p class="serviceOrder">{{ goodsItem.title }}</p>
								<p class="orderName" v-if="goodsItem.specVal"> {{ goodsItem.specVal }}</p>
							</div>
						</div>
						<div class="priceWrap">
							<p class="price"> ￥{{ goodsTotalPriceText(goodsItem) }}</p>
							<p class="num">x{{ goodsItem.goodsNum }}</p>
						</div>
					</div>
					<div class="divInfo">
						<p>标准套餐</p>
					</div>
				</div>
				<div class="btnWrap">
					<ul>
						<li class="closeBtn"> {{ orderStatusText(shopOrder.orderStatus).text }}</li>
					</ul>
				</div>
			</li>
		</ul>
		<div style="padding: 0 4%;">
			<div class="modelTitle">
				订单记录
			</div>
			<van-steps :active="active" direction="vertical" v-for="item in shopOrder.logList" :key="item.id" color="#004930">
				<van-step> {{
                parseTime(item.createDate, "{y}-{m}-{d} {h}:{i}")
              }}&nbsp;&nbsp;{{ item.cont }}</van-step>
			</van-steps>
		</div>
		<div class="serviceDiv1">
			<div class="title">
				服务地址
			</div>
			<div class="serviceInfo">
				<div class="name">
					<p>{{ shopOrder.bpname }}</p>
					<p>王小丫</p>
				</div>
				<div class="address">
					<p>服务墓址</p>
					<p>{{ shopOrder.cemeaddress }}</p>
				</div>
			</div>
		</div>
		<div class="serviceDiv1">
			<div class="title">
				服务信息
			</div>
			<div class="serviceInfo">
				<div class="name">
					<p>服务时间：</p>
					<p>{{ parseTime(shopOrder.serveTime) }}</p>
				</div>
				<div class="address">
					<p>联系人：</p>
					<p>{{ shopOrder.contacts }}</p>
				</div>
				<div class="address">
					<p>联系电话：</p>
					<p>{{ shopOrder.mobile }}</p>
				</div>
				<div class="address">
					<p>其他需求：</p>
					<p>{{ shopOrder.remark }}</p>
				</div>
			</div>
		</div>
		<div class="payDiv">
			<div class="title">
				付款信息
			</div>
			<div class="payInfo">
				<div class="name">
					<p>付款方式</p>
					<p>{{ shopOrder.payType }}</p>
				</div>
				<div class="address">
					<p>付款时间：</p>
					<p>{{ shopOrder.payTime }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as utils from "@/pages/mobile/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/admin/img/usernull.png'`,
				active: 1,
			};
		},
		mounted() {
			console.log(this.shopOrder.orderStatus)
		},
		methods: {
			//商品小计
			goodsTotalPrice(item) {
				if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {
					// console.log("goodsTotalPrice")
				} else {
					item.goodsNum = 1;
				}
				var showGoodsPrice = item.price * item.goodsNum;
				return showGoodsPrice;
			},
			goodsTotalPriceText(item) {
				var showGoodsPrice = this.goodsTotalPrice(item);
				return utils.formatMoney(showGoodsPrice);
			},
			parseTime(time, format) {
				if (!format) {
					format = "{y}-{m}-{d}";
				}
				return utils.parseTime(time, format);
			},
			orderStatusText(status) {
				return shop.orderStatusText(status);
			}
		}
	};
</script>

<style lang="less" scoped>
	.orderInfoCont {
		.title {
			padding: 4%;
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
			font-size: .32rem;
		}

		.goodsList {
			padding: 0 4%;

			.goodsItem {
				display: flex;
				justify-content: space-between;
				border-radius: .10rem;
				border: solid 2px #dcdcdc;
				flex-direction: column;
				padding: 4%;
				box-sizing: border-box;
				margin-top: .3rem;

				.goodsItemTitle {
					border-bottom: solid 1px #dcdcdc;
					padding-bottom: .2rem;
					font-size: .26rem;
					line-height: .35rem;
					color: #999999;
					width: 100%;
				}

				.goodsItemInfo {
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					width: 100%;
					margin-top: .3rem;
					border-bottom: 1px solid #dcdcdc;
					padding-bottom: .3rem;

					.divTitle {
						display: flex;
						justify-content: space-between;

						.itemDiv {
							display: flex;

							img {
								width: .8rem;
								height: .8rem;
							}

							.serviceDiv {
								display: flex;
								flex-direction: column;
								line-height: .30rem;
								justify-content: space-around;
								margin-left: .2rem;

								.serviceOrder {
									font-size: .32rem;
									color: #333333;
								}

								.orderName {
									font-size: .26rem;
									color: #999999;
								}
							}
						}
					}

					.divInfo {
						display: flex;
						margin-top: .2rem;

						p {
							margin-right: .2rem;
						}
					}


					.priceWrap {
						font-size: .22rem;
						display: flex;
						align-items: center;
						flex-direction: column;
						justify-content: space-around;

						.price {
							color: #333333;
						}

						.num {
							color: #999999;
						}
					}
				}

				.btnWrap {
					ul {
						display: flex;
						flex-direction: row-reverse;
						margin-top: .3rem;

						li {
							width: 1.40rem;
							height: .50rem;
							display: flex;
							font-size: .24rem;
							align-items: center;
							justify-content: center;
							margin-right: .1rem;
						}

						.assignBtn {
							background-color: #f68b19;
							color: #ffffff;
						}

						.detailBtn,
						.assessBtn {
							border: solid 1px #004930;
							color: #004930;
						}

						.completeBtn {
							background-color: #43c643;
							color: #ffffff;
						}

						.payBtn {
							background-color: #43bec6;
							color: #ffffff;
						}

						.closeBtn {
							color: #666666;
							background-color: #e2e2e2;
						}
					}

				}
			}

			padding-bottom: .3rem;
		}



		.serviceDiv1,
		.payDiv {
			border-top: 5px solid #eee;
			display: flex;
			flex-direction: column;

			.serviceInfo,
			.payInfo {
				padding: 0px 16px;

				.name,
				.address {
					display: flex;
					line-height: 0.7rem;

					p {
						margin-right: .3rem;
					}

					&:first-child {
						border-bottom: 1px solid #e0e0e0;
					}
				}
			}

		}

		.payDiv {
			border-bottom: 5px solid #eee;
		}
	}
</style>
