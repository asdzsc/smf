<template>
	<div class="goodsInfo">
		<div class="banner">
			<img :src="goodsImg" alt="">
			<div @click="showGoodsImgModal()" class="magnify">
				<van-icon name="search" class="search" />
			</div>
		</div>
		<!-- 商品价格 start -->
		<div class="goodsPrice">
			<div class="priceUp">
				<p class="price"><span>￥</span>{{ goodsPriceText }}</p>
				<p class="buy">（已有0人购买）</p>
			</div>
			<div class="priceDown">
				<p class="name">{{ model.title }}</p>
				<p class="desc"> {{ model.subtitle }}</p>
			</div>
		</div>
		<!-- 商品价格 end-->
		<!-- 规格选择 start-->
		<div v-if="model.isSpec === '1'" class="goodsChoose">
			<div v-for="item in specNameList" :key="item.id" class="specList">
				<div class="specName">
					{{ item.specName }}
				</div>
				<div class="specValList">
					<div v-for="(sv, index) in item.specTags" :key="'sv' + index" class="specValItem" :class="{ check: isCheckSpec(item.id, sv) }"
					 @click="checkSpec(item.id, sv)">
						{{ sv }}
					</div>
				</div>
			</div>
			<div class="quantity">
				<div class="quantityTitle">数量</div>
				<div class="goodsNumCont">
					<div class="goodsNum">
						<div @click="minusGoodsNum()" class="goodsNumLeft">
							<van-icon name="minus" />
						</div>
						<div class="goodsNumInput">
							<input v-model="goodsNum" type="number" />
						</div>
						<div @click="plusGoodsNum()" class="goodsNumRight">
							<van-icon name="plus" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 规格选择 end-->
		<!-- 用户评价 start -->
		<goodsComment v-if="model.id" :goodsId="model.id"></goodsComment>
		<!-- 用户评价 end -->
		<!-- 商品详情 start -->
		<div class="goodDetail"  >
			<div class="assessUser">产品详情</div>
			<div v-html="model.cont" v-if="model.cont">
				
			</div>
			<div v-else><van-empty description="暂无数据" /></div>
		</div>
		<div class="detailCart">
			<div class="buy" @click="openConfirmOrder">立即购买</div>
			<!-- <div class="add" @click="addCart">加入购物车</div> -->
		</div>
		<!-- 商品详情 end -->
	</div>
</template>

<script>
	import {
		goodsInfo,
		addCart
	} from "@/pages/mobile/api/shop";
	import * as utils from "@/pages/mobile/libs/utils";
	import {
		ImagePreview,
	} from 'vant';
	export default {
		components: {
			goodsComment: () => import("@/pages/mobile/views/shop/components/goods-comment.vue"),
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCarouselIndex: 0,
				imgCarouselList: [], //商品图片
				showGoodsImg: "",
				showGoodsPrice: "",
				loading:false,
				model: {
					id: "",
					cover: "",
					title: "",
					subtitle: "",
					imgs: [],
					originalPrice: 0, //原价
					price: 0, //销售价格
					minPrice: 0, //多规格最低价格
					maxPrice: 0, //多规格最高价格
					isSpec: "0", //有无规格 0无 1有
					cont: ""
				},
				goodsColumnList: [],
				specNameList: [], //商品规格
				specValList: [], //多规格商品
				goodsNum: 1, //购买商品数量
				checkSpecList: [], //选中的规格名称
				tabId: "0",
				showImgModal: false //图片显示
			};
		},
		computed: {
			goodsImg() {
				if (this.showGoodsImg) {
					return this.baseUrl + this.showGoodsImg;
				} else {
					return "/img/zwtp.jpg";
				}
			},
			goodsPriceText() {
				if (this.showGoodsPrice) {
					return utils.formatMoney(this.showGoodsPrice);
				} else {
					if (this.model.isSpec === "1") {
						if (this.model.minPrice === this.model.maxPrice) {
							return utils.formatMoney(this.model.maxPrice);
						} else {
							return (
								utils.formatMoney(this.model.minPrice) +
								" ~ " +
								utils.formatMoney(this.model.maxPrice)
							);
						}
					} else {
						return utils.formatMoney(this.model.price);

					}
				}
			}
		},
		mounted() {
			if (this.$route.query.id) {
				this.model.id = this.$route.query.id;
				this._goodsInfo();
			}
		},
		methods: {
			_goodsInfo() {
				this.loading = true
				goodsInfo({
					id: this.model.id
				}).then(res => {
					this.loading = false
					if (res.code === 0) {
						Object.assign(this.model, res.data.shopGoods);
						this.goodsColumnList = res.data.goodsColumnList;
						this.specNameList = res.data.specNameList;
						this.specValList = res.data.specValList;
						this.showGoodsImg = this.model.cover;
						if (!this.model.imgs) {
							this.model.imgs = [];
						}

						this.getGoodsImgList();
					}
				});
			},
			getGoodsImgList() {
				if (this.model.imgs.length > 0) {
					var num = 0;
					var obj;
					for (var i = 0; i < this.model.imgs.length; i++) {
						var imgUrl = this.model.imgs[i];
						if (num === 0) {
							obj = [imgUrl];
							num++;
						} else {
							obj.push(imgUrl);
							if (num === 2) {
								num = 0;
								this.imgCarouselList.push(obj);
							} else {
								num++;
							}
						}
						//最后不满足一组
						if (i + 1 === this.model.imgs.length) {
							this.imgCarouselList.push(obj);
						}
					}
				}
			},
			//图片预览
			showGoodsImgModal(imgUrl) {
				let imgList = this.model.imgs.map(i => {
					return this.baseUrl + i
				})
				this.imgCarouselList = imgList;
				ImagePreview(imgList);
			},
			//判断选中规格
			isCheckSpec(sid, sv) {
				var query = this.checkSpecList.filter(x => {
					return x.id === sid && x.val === sv;
				});
				return query.length > 0 ? true : false;
			},
			//选中规格
			checkSpec(sid, sv) {
				var query = this.checkSpecList.filter(x => {
					return x.id === sid && x.val === sv;
				});
				if (query.length === 0) {
					this.checkSpecList = this.checkSpecList.filter(x => {
						return x.id !== sid;
					});
					this.checkSpecList.push({
						id: sid,
						val: sv
					});
					this.specValInfo();
				} else {
					this.checkSpecList = this.checkSpecList.filter(x => {
						return x.id !== sid;
					});
					this.showGoodsPrice = "";
					this.setShowGoodsImg(this.model.cover);
				}
			},
			//获取选中的规格商品
			specValInfo() {
				if (this.model.isSpec === "1") {
					var svk = this.specValKey();
					var query = this.specValList.filter(x => {
						return x.specVal === svk;
					});
					if (query.length > 0) {
						var svInfo = query[0];
						this.showGoodsPrice = svInfo.price;
						this.setShowGoodsImg(svInfo.cover);
						return svInfo;
					}
				}
				return null;
			},
			//获取用户选中的多规格名称
			specValKey() {
				if (this.specNameList.length > 0) {
					var query = this.specNameList.map(x => {
						return x.id;
					});
					var svList = [];
					query.map(sid => {
						var squery = this.checkSpecList.filter(x => {
							return x.id === sid;
						});
						if (squery.length > 0) {
							svList.push(squery[0].val);
						}
					});
					return svList.toString();
				} else {
					return "";
				}
			},

			//设置展示商品大图
			setShowGoodsImg(imgUrl) {
				if (imgUrl) {
					this.showGoodsImg = imgUrl;
				}
			},
			//获取选中的规格商品
			specValInfo() {
				if (this.model.isSpec === "1") {
					var svk = this.specValKey();
					var query = this.specValList.filter(x => {
						return x.specVal === svk;
					});
					if (query.length > 0) {
						var svInfo = query[0];
						this.showGoodsPrice = svInfo.price;
						this.setShowGoodsImg(svInfo.cover);
						return svInfo;
					}
				}
				return null;
			},
			// 减少
			minusGoodsNum() {
				if (typeof this.goodsNum === "number" && !isNaN(this.goodsNum)) {
					this.goodsNum--;
					if (this.goodsNum < 1) {
						this.goodsNum = 1;
					}
				} else {
					this.goodsNum = 1;
				}
			},
			// 增加
			plusGoodsNum() {
				if (typeof this.goodsNum === "number" && !isNaN(this.goodsNum)) {
					this.goodsNum++;
				} else {
					this.goodsNum = 1;
				}
			},
			//加入购物车
			addCart() {
				if (this.model.id) {
					var data = {
						id: this.model.id,
						goodsNum: this.goodsNum,
						specVal: ""
					};
					if (this.model.isSpec === "1") {
						var sv = this.specValInfo();
						if (!sv) {
							this.$notify({
								type: "warning",
								message: "请选择商品规格"
							});
							return;
						} else {
							data.specVal = sv.specVal;
						}
					}
					addCart(data).then(res => {
						if (res.code === 0) {
							this.$router.push("/shop/cart");
						}
					});
				}
			},
			//立即购买
			openConfirmOrder() {
				if (this.model.id) {
					var data = {
						type: "shop",
						gid: this.model.id,
						goodsNum: this.goodsNum,
						spec: ""
					};
					if (this.model.isSpec === "1") {
						var sv = this.specValInfo();
						if (!sv) {
							this.$notify({
								type: "warning",
								message: "请选择商品规格"
							});
							return;
						} else {
							data.spec = sv.specVal;
						}
					}
					this.$router.push({
						path: "/shop/order/confirmOrder",
						query: data
					});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.goodsInfo {
		background: #f4f4f4;

		.banner {
			width: 100%;
			position: relative;
			height: 50vh;
			background: #eee;

			img {
				position: absolute;
				height: 100%;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				-ms-transform: translate(-50%, -50%);
				-moz-transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				overflow: hidden;
			}

			.magnify {
				position: absolute;
				bottom: 10px;
				right: 10px;
				width: 44px;
				height: 44px;
				background-color: #000000;
				opacity: 0.4;
				display: flex;
				justify-content: center;
				align-items: center;

				.search {
					font-size: 30px;
					color: #ffffff;

				}
			}
		}

		.goodsPrice {
			margin: .2rem .14rem;
			background-color: #ffffff;
			box-shadow: 0px 0px 5px 0px rgba(169, 169, 169, 0.35);
			border-radius: 10px;
			padding-bottom: .2rem;

			.priceUp {
				display: flex;
				justify-content: space-between;
				line-height: .42rem;

				.price {
					font-size: .46rem;
					margin: .3rem .2rem;
					margin-bottom: .1rem;
					letter-spacing: 0px;
					color: #d54040;

					span {
						font-size: .22rem;
					}
				}

				.buy {
					margin: .3rem .2rem;
					font-size: .24rem;
					color: #999999;
				}
			}

			.priceDown {
				margin: 0 .2rem;

				.name {
					font-size: .28rem;
					line-height: .42rem;
					color: #333333;
				}

				.desc {
					font-size: .24rem;
					font-weight: normal;
					margin-top: .1rem;
					color: #666666;
				}
			}

		}

		.goodsChoose {
			background-color: #ffffff;
			box-shadow: 0px 0px 5px 0px rgba(169, 169, 169, 0.35);
			padding: .2rem;
			box-sizing: border-box;

			.quantity {
				display: flex;
				margin: 0 .14rem;

				.quantityTitle {
					margin-right: 0.2rem;
					font-size: 0.28rem;
					font-weight: 400;
					color: #666666;
					line-height: 40px;
				}

				.goodsNumCont {
					flex: 1;

					.goodsNum {
						width: 2.40rem;
						border: solid 1px #dddddd;
						display: flex;

						.goodsNumLeft {
							width: 40px;
							text-align: center;
							border-right: solid 1px #dddddd;
							line-height: 40px;
							cursor: pointer;
						}

						.goodsNumRight {
							width: 40px;
							text-align: center;
							border-left: solid 1px #dddddd;
							line-height: 40px;
							cursor: pointer;
						}

						.goodsNumInput {
							flex: 1;

							input {
								width: 100%;
								height: 100%;
								border: 0px;
								padding: 0px 5px;
								text-align: center;
								outline: none;
								-moz-appearance: textfield;

								&::-webkit-inner-spin-button {
									-webkit-appearance: none;
									appearance: none;
									margin: 0;
								}
							}
						}
					}
				}
			}

			.specList {
				margin: .2rem .14rem;
				background-color: #ffffff;

				border-radius: 10px;

				padding-bottom: .3rem;
				display: flex;
				align-items: center;

				.specName {
					margin-right: .2rem;
					font-size: .28rem;
					font-weight: 400;
					color: #666666;
				}

				.specValList {
					display: flex;

					.specValItem {
						padding: 0 .1rem;
						box-sizing: border-box;
						text-align: center;
						line-height: .5rem;
						height: .50rem;
						margin-right: .2rem;
						border-radius: .10rem;
						color: #999999;
						background-color: #f4f4f4;

						&:hover {
							color: #004930;
							border: solid 1px #004930;
						}

						&.check {
							.specValCheck {
								display: block;
							}

							color: #004930;
							border: solid 1px #004930;
						}
					}
				}
			}
		}



		.goodDetail {
			background: #fff;
			padding-top: .3rem;
			box-sizing: border-box;
			margin: .2rem .14rem;
			padding: .2rem;
			box-sizing: border-box;
			/deep/ img {
			  max-width: 100%;
			  height: auto;
			}
			// .detailTitle {
			// 	color: #333333;
			// 	line-height: .48rem;
			// 	font-weight: bolder;
			// 	font-size: .32rem;
			// 	margin-left: .45rem;
			// }

			// .detailDesc {
			// 	text-align: center;
			// 	font-family: MicrosoftYaHei;
			// 	font-size: .28rem;
			// 	line-height: .38rem;
			// 	margin-top: .25rem;
			// 	color: #333333;

			// 	.card {
			// 		margin-top: .5rem;
			// 		margin-bottom: .2rem;
			// 	}

			// 	img {
			// 		width: 100%;
			// 	}
			// }


		}

		.detailCart {
			text-align: center;
			line-height: .88rem;
			margin: 0.2rem 0.14rem;
			padding: 0.2rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			background: #fff;


			.add {
				width: 2rem;
				font-size: .28rem;
				height: 100%;
				color: #004930;
				border-left: 2px solid #004930;
			}

			.buy {
				width: 2rem;
				height: 100%;
				background-color: #004930;
				color: #ffffff;
			}
		}
	}
</style>
