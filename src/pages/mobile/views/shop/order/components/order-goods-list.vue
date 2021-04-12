<template>
	<div class="orderGoodsList">
		<div class="title">商品清单</div>
		<ul class="goodsList" v-for="item in model.goodsList" :key="item.id">
			<li class="goodsItem">
				<div class="goodsItemTitle">
					<p class="goodsOrderNum">订单号：E20180308000051</p>
					<p class="goodsOrderTime">2018/03/08 16:11:39</p>
				</div>
				<div class="goodsItemInfo">
					<div class="itemDiv">
						<img :src="baseUrl + item.cover" alt="">
						<div class="serviceDiv">
							<p class="serviceOrder">{{ item.title }}</p>
							<p class="orderName" v-if="item.specVal"> {{ item.specVal }}</p>
						</div>
					</div>
					<div class="priceWrap">
						<p class="price">￥{{ formatMoney(item.price) }}</p>
						<p class="num">x {{ item.goodsNum }}</p>
					</div>
				</div>

			</li>
		</ul>

	</div>
</template>

<script>
	import {
		getGoodsListByCartId,
		getGoodsByCart
<<<<<<< HEAD
	} from "@/pages/mobile/api/shop";
	import * as utils from "@/pages/mobile/libs/utils";
=======
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				type: "shop",
				model: {
					goodsList: []
				}
			};
		},
		mounted() {
			this.type = this.$route.query.type ? this.$route.query.type : "shop";
			this.loadGoodsList();
		},
		methods: {
			//加载商品
			loadGoodsList() {
				if (this.type === "cart") {
					var cids = this.$route.query.cids;
					getGoodsListByCartId({
						cids: cids
					}).then(res => {
						if (res.code === 0) {
							this.model.goodsList = res.data;
							//计算订单金额
							this.statistics();
						}
					});
				} else {
					var data = this.$route.query;
					getGoodsByCart(data).then(res => {
						if (res.code === 0) {
							this.model.goodsList = res.data;
							//计算订单金额
							this.statistics();
						}
					});
				}
			},
			//商品小计
			goodsTotalPrice(item) {
				if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {
					// console.log(item);
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
			//订单总价格
			totalPriceText() {
				var showGoodsPrice = 0;
				this.model.goodsList.forEach(x => {
					var goodsPrice = this.goodsTotalPrice(x);
					showGoodsPrice += goodsPrice;
				});
				return utils.formatMoney(showGoodsPrice);
			},
			//统计
			statistics() {
				var data = {
					goodsNum: this.model.goodsList.length,
					totalPriceText: this.totalPriceText()
				};
				this.$emit("statistics", data);
			},
			formatMoney(money) {
				return utils.formatMoney(money);
			},
			//获取数据
			getData() {
				return this.model.goodsList;
			}

		}
	}
</script>

<style lang="less" scoped>
	.orderGoodsList {
		margin-top: .2rem;
		background: #fff;


		.title {
			padding: 0 4%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: .35rem;
			font-weight: bold;
			font-size: .28rem;
		}

		.goodsList {
			padding: 0 4%;

			.goodsItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 10px;
<<<<<<< HEAD
				border: solid 1px #dcdcdc;
=======
				border: solid 2px #dcdcdc;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
				flex-direction: column;
				padding: 4%;
				box-sizing: border-box;
				margin-top: .3rem;

				.goodsItemTitle {
					display: flex;
					justify-content: space-between;
					border-bottom: solid 1px #dcdcdc;
					;
					padding-bottom: .2rem;
					font-size: .26rem;
					line-height: .30rem;
					color: #999999;
					width: 100%;
				}

				.goodsItemInfo {
					display: flex;
					justify-content: space-between;
					width: 100%;
					margin-top: .3rem;

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


			}

			padding-bottom: .3rem;
		}


	}
</style>
