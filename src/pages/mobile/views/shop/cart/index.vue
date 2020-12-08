<template>
	<div class="cart">
		<div class="cartList">
			<div class="cartTitle">
				<div class="link"> <a href="/mobile/#/shop">商城首页</a><span>
						<van-icon name="arrow" />购物车</span></div>
				<div class="allShop">全部商品 : {{ list.length > 0 ? list.length : "0" }}</div>
			</div>
			<!--购物车信息  start  -->
			<div class="cartInfo" v-if="list.length > 0">
				<!-- 未失效商品 start -->
				<ul class="normalGoods">
					<li v-for="item in list" :key="item.cartId" :class="{ invalid: !item.isValid }">
						<div class="check">
							<van-checkbox v-model="item.check" icon-size=".31rem" checked-color="#dedede"></van-checkbox>
						</div>
						<!-- <span >删除</span> -->
						<van-swipe-cell>
							<van-card :desc="item.specVal " :title="item.title" class="goods-card" :thumb="baseUrl + item.cover" />
							<template #right>
								<van-button square text="删除" @click="_delCart([item.cartId])" type="danger" />
							</template>
							<div class="cartNumWrap">
								<div class="goodsPrice">￥{{ item.price }}</div>
								<numCalculate v-model="item.goodsNum" :disabled="!item.isValid"></numCalculate>
							</div>
						</van-swipe-cell>
					</li>
				</ul>

				<!-- 未失效商品 end -->
				<!-- 失效商品 start -->
				<!--<div class="failTitle">
					<p class="name">失效商品 </p>
					<p class="clear">清空失效商品</p>
				</div>
				<ul class="failGoods">
					<li>
						<div class="check">
							<van-icon icon-size=".31rem" name="close" />
							<div class="goodsImg">
								<img src="/img/mobile/cart2.png" alt="">
								<div class="goodsBox">找相似</div>
							</div>
						</div>
						<div class="goodsWrap">
							<div class="goodsName">
								<p class="name">花样年华</p>
								<p class="flowerName">鲜花</p>
							</div>
							<div class="cartNumWrap">
								<div class="goodsPrice">￥999</div>
								<div class="goodsNum">×2</div>
							</div>
						</div>

					</li>
				</ul> -->
				<!-- 未失效商品 end -->
			</div>
			<div v-else>
				<van-empty description="暂无数据" />
			</div>
			<!--购物车信息  end  -->
			<!-- 底部工具栏 start -->
			<div class="footerTool" v-if="list.length > 0">
				<div class="allCheck">
					<van-checkbox v-model="checkAll" @change="changeCheckAll" icon-size=".31rem" checked-color="#dedede">全选</van-checkbox>
				</div>
				<div class="totalPrice">
					合计：￥{{ ckGoodsTotalPriceText }}
				</div>
				<div class="orderPay" @click="buy()">
					去结算
				</div>
			</div>
			<!-- 底部工具栏 end-->
		</div>
	</div>
</template>

<script>
	import {
		cartList,
		updateCartGoodsNum,
		delCart
	} from "@/pages/mobile/api/shop";
	import {
		Dialog,
	} from 'vant';
	import * as utils from "@/pages/mobile/libs/utils";
	export default {
		components: {
			numCalculate: () => import("@/pages/mobile/components/num-calculate.vue"),
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false, //列表加载
				checkAll: false,
				list: [],
				isBuy: false //立即结算
			};
		},
		computed: {
			totalGoodsNum() {
				var goodsNum = 0;
				this.list.forEach(x => {
					goodsNum += x.goodsNum;
				});
				return goodsNum;
			},
			ckCartGoodsNum() {
				var goodsNum = 0;
				this.list.forEach(x => {
					if (x.check) {
						goodsNum += x.goodsNum;
					}
				});
				return goodsNum;
			},
			ckGoodsTotalPriceText() {
				var showGoodsPrice = 0;
				this.list.forEach(x => {
					if (x.check) {
						var goodsPrice = this.goodsTotalPrice(x);
						showGoodsPrice += goodsPrice;
					}
				});
				return utils.formatMoney(showGoodsPrice);
			}
		},
		mounted() {
			this._cartList();
		},
		beforeDestroy() {
			//页面关闭前更新购物车商品数量
			if (!this.isBuy) {}
		},
		methods: {
			_cartList() {
				this.loading = true;
				cartList().then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data;
						this.list.forEach(x => {
							this.$set(x, "check", false);
						});
					}
				});
			},
			// position 为关闭时点击的位置
			// instance 为对应的 SwipeCell 实例
			// 左滑删除
			beforeClose({
				position,
				instance,
			}) {
				switch (position) {
					case 'left':
					case 'cell':
					case 'outside':
						instance.close();
						break;
					case 'right':
						break;
				}
			},
			//删除购物车
			_delCart(cartIds) {
				console.log(cartIds)
				var vm = this;
				Dialog.confirm({
					message: '确定删除吗？',
				}).then(() => {
					delCart({
						ids: cartIds
					}).then(res => {
						if (res.code === 0) {
							vm.list = vm.list.filter(x => {
								return cartIds.indexOf(x.cartId) !== 0;
							});
						}
					});
				})
			},
			//全选
			changeCheckAll() {
				this.list.forEach(v => {
					v.check = this.checkAll;
				});
			},
			//商品小计
			goodsTotalPrice(item) {
				if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {} else {
					item.goodsNum = 1;
				}
				var showGoodsPrice = item.price * item.goodsNum;
				return showGoodsPrice;
			},
			goodsTotalPriceText(item) {
				var showGoodsPrice = this.goodsTotalPrice(item);
				return utils.formatMoney(showGoodsPrice);
			},
			// 更新购物车商品数量
			updateCartNum() {
				updateCartGoodsNum(this.list).then(res => {
					if (res.code === 0) {
						var cartNum = this.$store.state.account.cartNum;
						var goodsNum = this.totalGoodsNum;
						if (cartNum !== goodsNum) {
							this.$store.commit("account/setCartNum", goodsNum);
						}
						//跳转订单确认页面
						this.toBuy();
					}
				});
			},
			//立即结算
			buy() {
				this.isBuy = true;
				this.updateCartNum();
			},
			toBuy() {
				if (this.isBuy) {
					var query = this.list.filter(x => x.check && x.isValid);
					var cartIds = query.map(x => {
						return x.cartId;
					});
					if (cartIds.length == 0) {
						this.$notify({
						  type: "warning",
						  message: "请选中要结算的商品"
						});
						this.isBuy = false;
					} else {
						var ids = cartIds.toString();
						this.$router.push({
							path: "/shop/order/confirmOrder",
							query: {
								type: "cart",
								cids: ids
							}
						});
					}
				}
			},
			formatMoney(money) {
				return utils.formatMoney(money);
			}

		}

	}
</script>

<style lang="less" scoped>
	.cart {
		background: #f4f4f4;

		.cartList {
			.cartTitle {
				display: flex;
				justify-content: space-between;
				font-size: .32rem;
				line-height: 60px;
				height: 1.1rem;
				align-items: center;
				margin: 0 .2rem;

				.link {
					/deep/ .van-icon {
						vertical-align: middle;
					}

					a {
						color: #333333;
					}

					span {
						color: #004930;
					}
				}

				.allShop {
					font-size: .26rem;
					line-height: 40px;
					color: #999999;
				}
			}

		}

		.cartInfo {
			width: 7.10rem;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 10px;

			.failTitle {
				line-height: .62rem;
				border-bottom: .03rem solid #c8cbd0;
				display: flex;
				justify-content: space-between;
				width: 98%;
				margin: 0 auto;
				box-sizing: border-box;

				.name {
					font-size: .28rem;
					margin-left: .1rem;
					color: #333333;
				}

				.clear {
					font-size: .24rem;
					color: #004930;
					margin-right: .1rem;
				}
			}

			.normalGoods,
			.failGoods {
				li {
					display: flex;
					justify-content: space-around;
					align-items: center;
					padding: .14rem;
					box-sizing: border-box;

					/deep/ .van-swipe-cell {
						width: 100%;
					}

					/deep/ .van-swipe-cell__right {
						top: 30px;
					}

					/deep/ .van-swipe-cell__wrapper {
						position: relative;
					}

					.cartNumWrap {
						position: absolute;
						right: 0;
						top: 17px;
						width: 2rem;
						height: 1.5rem;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;

						.goodsPrice {
							font-size: .28rem;
							font-weight: bold;
							line-height: .30rem;
							color: #004930;
						}

						.edit {
							display: flex;

							.cartEdit {
								width: .3rem;
								height: .3rem;
								border-radius: 50%;
								border: 1px solid #666666;
								text-align: center;
								line-height: .3rem;
							}

							.goodsNum {
								width: .60rem;
								height: .42rem;
								background-color: #f5f5f5;
								border-radius: .04rem;
								text-align: center;
								line-height: .42rem;
								margin: 0 0.1rem;
							}
						}
					}

					.goods-card {
						margin: 0;
						background-color: #fff;
					}

					.check {
						flex: 1;
						display: flex;
						align-items: center;

						.goodsImg {
							width: 1.60rem;
							height: 1.36rem;
							background-color: #ebebeb;
							border-radius: .04rem;
							margin-left: .2rem;

							img {
								width: 100%;
								height: 100%;
							}
						}
					}

					.goodsWrap {
						flex: 5;
						display: flex;
						justify-content: space-between;

						.goodsName {
							display: flex;
							flex-direction: column;
							margin-left: .2rem;
							justify-content: space-around;

							.name {
								font-size: .28rem;
								line-height: .42rem;
								color: #333333;
							}

							.flowerName {
								font-size: .26rem;
								line-height: .42rem;
								color: #999999;
							}

							.goodsSet {
								display: block;
								width: 1.20rem;
								height: .50rem;
								line-height: .5rem;
								;
								background-color: #f5f5f5;
								border: solid 1px #f5f5f5;
								font-size: .24rem;
								text-align: center;
							}
						}
					}
				}
			}

			.failGoods {
				.goodsImg {
					position: relative;

					.goodsBox {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: .40rem;
						line-height: .4rem;
						text-align: center;
						color: #fff;
						background-color: #000000;
						opacity: 0.5;
						font-size: .24rem;
					}
				}

				.cartNumWrap {
					position: inherit !important;
				}
			}

		}

		.footerTool {
			display: flex;
			width: 100%;
			height: .88rem;
			align-items: center;
			justify-content: space-between;
			background-color: #f5f5f5;
			box-shadow: 0px -8px 13px 0px rgba(0, 0, 0, 0.17);

			.allCheck {
				flex: 0.8;
				padding-left: .2rem;

				.none {
					display: none;
				}
			}

			.totalPrice {
				margin: 0 0.26rem;
			}

			.orderPay {
				flex: 1.5;
				height: 100%;
				background-color: #004930;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
		}
	}
</style>
