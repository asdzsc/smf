<template>
	<div class="goodsList">
		<div class="goodsListtitle">商品清单</div>
		<div class="table">
			<a-row type="flex" class="tableHead">
				<a-col flex="50px"></a-col>
				<a-col flex="auto" style="text-align: center;">商品</a-col>
				<a-col flex="120px" style="text-align: center;">单价</a-col>
				<a-col flex="120px" style="text-align: center;">数量</a-col>
				<a-col flex="120px" style="text-align: center;">小计</a-col>
				<a-col flex="50px"></a-col>
			</a-row>

			<div v-for="item in model.goodsList" :key="item.id" class="goodsItemCont">
				<div class="goodsItem">
					<a-row type="flex">
						<a-col flex="50px"></a-col>
						<a-col flex="120px">
							<img class="goodsImg" :src="baseUrl + item.cover" :onerror="defImg" />
						</a-col>
						<a-col flex="auto">
							<div>{{ item.title }}</div>
							<div v-if="item.specVal" class="specVal">
								{{ item.specVal }}
							</div>
							<span v-if="item.goodsType==='3'" class="specVal">一年有效期</span>
						</a-col>
						<a-col flex="120px" style="text-align: center;">￥{{ formatMoney(item.price) }}</a-col>
						<a-col flex="120px" style="text-align: center;">x {{ item.goodsNum }}</a-col>
						<a-col flex="120px" style="text-align: center; font-weight: 700;">￥{{ goodsTotalPriceText(item) }}</a-col>
						<a-col flex="50px"></a-col>
					</a-row>
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getGoodsListByCartId,
		getGoodsByCart
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";
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
	};
</script>

<style lang="less" scoped>
	.goodsList {
		padding-bottom: 60px;

		.goodsListtitle {
			margin: 20px;
			font-size: 14px;
			font-weight: 700;
			color: #333333;
		}

		.table {
			.tableHead {
				height: 30px;
				line-height: 30px;
				background-color: #ebebeb;
				font-size: 14px;
				font-weight: 700;
				color: #333333;
			}

			.goodsItemCont {
				.goodsItem {
					min-height: 60px;
					padding-top: 20px;
					padding-bottom: 20px;

					.goodsImg {
						width: 100px;
						height: 100px;
					}

					.specVal {
						font-size: 12px;
						line-height: 30px;
						color: #999999;
					}
				}

				.line {
					width: 1100px;
					border-bottom: solid 1px #cccccc;
					margin: auto;
				}
			}
		}
	}
</style>
