<template>
	<div class="orderList">
		<memberTabs ref="memberTabs"></memberTabs>
		<div class="title">服务订单</div>
		<!-- 		<ul class="goodsList" v-for="item in model.list" :key="item.id">
			<li class="goodsItem">
				<div class="goodsItemTitle">
					<p class="goodsOrderNum">订单号：{{ item.orderNum }}</p>
					<p class="goodsOrderTime">日期：{{ item.createDate }}</p>
					<p class="goodsOrderTime">服务时间：{{ parseTime(item.serveTime) }}</p>
				</div>
				<div class="goodsItemInfo" v-for="goodsItem in item.goodsList" :key="goodsItem.id">
					<div class="divTitle">
						<div class="itemDiv">
							<img :src="baseUrl + goodsItem.cover" alt="">
							<div class="serviceDiv">
								<p class="serviceOrder" @click="openGoodsInfo(goodsItem)">{{ goodsItem.title }}</p>
								<p class="orderName" v-if="goodsItem.specVal"> {{ goodsItem.specVal }}</p>
							</div>
						</div>
						<div class="priceWrap">
							<p class="price">¥{{ goodsTotalPriceText(goodsItem) }}</p>
							<p class="num">x {{ goodsItem.goodsNum }}</p>
						</div>
					</div>
				</div>
				<div class="btnWrap">
					<ul>
						<li class="detailBtn" @click="openOrderInfo(item)">查看详情</li>
						<li>
							<span :color="orderStatusText(item.orderStatus).color">
								{{ orderStatusText(item.orderStatus).text }}
							</span>
						</li>
					</ul>
				</div>
			</li>
		</ul> -->


		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="goodsList">
				<div class="goodsItem" v-for="(item,id) in model.list" :key="item.id">
					<div class="goodsItemTitle">
						<p class="goodsOrderNum">订单号：{{ item.orderNum }}</p>
						<p class="goodsOrderTime">日期：{{ item.createDate }}</p>
						<p class="goodsOrderTime">服务时间：{{ parseTime(item.serveTime) }}</p>
					</div>
					<div class="goodsItemInfo" v-for="goodsItem in item.goodsList" :key="goodsItem.id">
						<div class="divTitle">
							<div class="itemDiv">
								<img :src="baseUrl + goodsItem.cover" alt="">
								<div class="serviceDiv">
									<p class="serviceOrder" @click="openGoodsInfo(goodsItem)">{{ goodsItem.title }}</p>
									<p class="orderName" v-if="goodsItem.specVal"> {{ goodsItem.specVal }}</p>
								</div>
							</div>
							<div class="priceWrap">
								<p class="price">¥{{ goodsTotalPriceText(goodsItem) }}</p>
								<p class="num">x {{ goodsItem.goodsNum }}</p>
							</div>
						</div>
					</div>
					<div class="btnWrap">
						<ul>
							<li class="detailBtn" @click="openOrderInfo(item)">查看详情</li>
							<li>
								<span :color="orderStatusText(item.orderStatus).color">
									{{ orderStatusText(item.orderStatus).text }}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</van-list>
		<!-- <paging ref="paging" @setPage="setPage"></paging> -->
		<!-- 		<div class="totalWrap">
			<div class="btnCont">
				查看更多
			</div>
		</div> -->
		<div class="cartIcon" @click="openUrl('/shop/cart')">
			<van-icon size="0.4rem" color="#fff" name="shopping-cart-o" />
		</div>
	</div>
</template>

<script>
	import {
		orderList
	} from "@/pages/mobile/api/shop";
	import * as utils from "@/pages/mobile/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false, // 控制加载中的 loading 状态
				finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
				model: {
					current: "1",
					pageSize: "8",
					searchText: "",
					total: "0",
					list: []
				},
				orderId: '',
				showCommentList: false,
				showFeedbackList: false,
				showSaveComment: false,
				shopOrder: null

			};
		},
		components: {
			memberTabs: () => import("@/pages/mobile/views/member/components/member-tabs.vue"),
			paging: () => import("@/pages/mobile/views/xwzx/components/paging.vue"),
		},
		mounted() {
			this._orderList();
		},
		methods: {
			onLoad() {
				this._orderList();
			},
			openUrl(url) {
				if (url) {
					this.$router.push(url);
				}
			},
			search(searchText) {
				this.model.current = 1;
				this.model.searchText = searchText;
				this._orderList();
			},
			_orderList() {
				var vm = this;
				vm.loading = true;
				orderList(this.model).then(res => {
					vm.loading = false;
					if (res.code === 0) {
						const results = res.data.list;
						vm.model.list.push(...results);
						if (res.data.hasNextPage) {
							setTimeout(() => {
								vm.model.current = ++vm.model.current
							}, 500)
						} else {
							this.finished = true;
						}
					}
				});
			},
			setPage(pageNum) {
				this.model.current = pageNum;
				this._orderList();
			},
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
			formatMoney(money) {
				return utils.formatMoney(money);
			},
			parseTime(time) {
				return utils.parseTime(time, "{y}-{m}-{d}");
			},
			orderStatusText(status) {
				return shop.orderStatusText(status);
			},
			openOrderInfo(item) {
				this.$router.push({
					path: "/shop/order/orderInfo",
					query: {
						id: item.id
					}
				});
			},
			showFeedback(item) {
				this.orderId = item.id
				this.showFeedbackList = true
			},
			closeOrderFeedback(res) {
				this.$nextTick(() => {
					this.showFeedbackList = false
				})
			},
			showComment(item) {
				this.orderId = item.id
				this.showCommentList = true
			},
			closeOrderComment(res) {
				this.$nextTick(() => {
					this.showCommentList = false
				})
			},
			//保存评论
			saveComment(item) {
				this.shopOrder = item
				this.showSaveComment = true
			},
			closeSaveComment(res) {
				this.$nextTick(() => {
					this.showSaveComment = false
				})
				try {
					if (res.code === 0) {
						//刷新
						this._orderList();
					}
				} catch {}
			},
			//商品详情
			openGoodsInfo(goodsInfo) {
				if (goodsInfo.goodsId) {
					this.$router.push({
						path: "/shop/goodsInfo",
						query: {
							id: goodsInfo.goodsId
						}
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderList {
		background: #fff;

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
					color: #999999;
					line-height: .35rem;
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

							span {
								color: rgba(0, 0, 0, 0.65);
								font-size: .24rem;
								display: inline-block;
								width: 100%;
								height: 100%;
								line-height: .5rem;
								text-align: center;
								background: #fafafa;
								border: solid 1px #004930;
							}
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
		}

		.totalWrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: .88rem;
			line-height: .88rem;
			background-color: #ffffff;
			border-bottom: 5px solid #eee;

			.btnCont {
				font-size: .26rem;
				height: 100%;
				color: #999999;
			}
		}

		.cartIcon {
			margin-top: -0.5rem;
			width: .88rem;
			height: .64rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #303030;
			border-radius: 0px .10rem .10rem 0px;
		}
	}
</style>
