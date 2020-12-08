<template>
	<div class="goodsInfo">
		<!-- 商品类别导航 start -->
		<div class="breadcrumb">
			<a-breadcrumb separator="》">
				<a-breadcrumb-item>
					<a href="/#/shop">
						<i class="iconfont iconhome-fill home"></i>
						商城首页
					</a>
				</a-breadcrumb-item>
				<a-breadcrumb-item v-if="goodsColumnList.length > 0">
					<template v-for="(item, index) in goodsColumnList">
						<a :key="item.id" :href="`/#/goodsList?cid=${item.id}`">
							{{ item.name }}
						</a>
						<label :key="`label${item.id}`" v-if="index !== goodsColumnList.length - 1">/</label>
					</template>
				</a-breadcrumb-item>
				<a-breadcrumb-item>{{ model.title }}</a-breadcrumb-item>
			</a-breadcrumb>
		</div>
		<!-- 商品类别导航 end -->

		<!-- 商品图片价格 start -->
		<div class="goodsSpec">
			<div class="goodsSpecLeft">
				<div class="goodsCoverCont">
					<img class="goodsCover" :src="goodsImg" />
					<div @click="showGoodsImgModal()" class="magnify">
						<a-icon class="search" type="search" />
					</div>
				</div>
				<div class="goodsImgsCont">
					<table style="width: 100%;">
						<tr>
							<td class="carouselLeft">
								<img @click="prevLyGoodsImg()" src="/img/left.png" />
							</td>
							<td>
								<div class="carousel">
									<a-carousel ref="goodsCarousel" :autoplay="true" :dots="false" :afterChange="goodsImgChange">
										<div v-for="(item, index) in imgCarouselList" :key="'imgCarousel' + index" class="goodsCarouselGroup">
											<div v-for="imgUrl in item" :key="imgUrl" class="carouselImg" @mousemove="setShowGoodsImg(imgUrl)" @click="showGoodsImgModal(imgUrl)">
												<img :src="baseUrl + imgUrl" />
											</div>
										</div>
									</a-carousel>
								</div>
							</td>
							<td class="carouselRight">
								<img @click="nextGoodsImg()" src="/img/right.png" />
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="goodsSpecRight">
				<div class="title1">
					{{ model.title }}
				</div>
				<div class="title2">
					{{ model.subtitle }}
				</div>
				<div class="goodsPrice">
					<span class="priceTitle">商品价格</span>
					<span class="priceTitle">￥</span><span class="price">{{ goodsPriceText }}</span>
					<span class="orderNum">（已有0人购买）</span>
				</div>
				<div v-if="model.isSpec === '1'">
					<div v-for="item in specNameList" :key="item.id" class="specList">
						<div class="specName">
							{{ item.specName }}
						</div>
						<div class="specValList">
							<div v-for="(sv, index) in item.specTags" :key="'sv' + index" class="specValItem" :class="{ check: isCheckSpec(item.id, sv) }"
							 @click="checkSpec(item.id, sv)">
								{{ sv }}
								<div class="specValCheck">
									<a-icon type="check" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="model.goodsType === '0' || model.goodsType === '3'" class="quantity">
					<div class="quantityTitle">数量</div>
					<div class="goodsNumCont">
						<div class="goodsNum">
							<div @click="minusGoodsNum()" class="goodsNumLeft">
								<a-icon type="minus" />
							</div>
							<div class="goodsNumInput">
								<input v-model="goodsNum" type="number" />
							</div>
							<div @click="plusGoodsNum()" class="goodsNumRight">
								<a-icon type="plus" />
							</div>
						</div>
					</div>
				</div>

				<div v-if="model.goodsType === '0'" class="buyCont">
					<div @click.stop="addCart()" class="buyLeft">加入购物车</div>
					<div @click.stop="openConfirmOrder()" class="buyRight">
						立即购买
					</div>
				</div>
				<div v-else class="buyCont" style="width: 110px;">
					<div @click.stop="openConfirmOrder()" class="buyRight" style="flex: 1;">
						立即购买
					</div>
				</div>
			</div>
		</div>
		<!-- 商品图片价格 end -->

		<!-- 商品详情、评论 start -->
		<div class="goodsInfoContent">
			<a-affix :offset-top="0">
				<div class="tabs">
					<div @click="setTabId('0')" class="tabItem" :class="{ check: tabId === '0' }">
						产品详情
					</div>
					<div @click="setTabId('1')" class="tabItem" :class="{ check: tabId === '1' }">
						用户评论
					</div>
				</div>
			</a-affix>
			<div class="tabCont">
				<div v-show="tabId === '0'" class="htmlContent" v-html="model.cont"></div>
				<goodsComment v-if="tabId === '1'" :goodsId="model.id"></goodsComment>
			</div>
		</div>
		<!-- 商品详情、评论 end -->

		<myserve></myserve>
		<!-- 显示图片 -->
		<goodsShowImg v-if="showImgModal" ref="goodsShowImg" @onClose="goodsShowImgClose"></goodsShowImg>
	</div>
</template>
<script>
	import {
		goodsInfo,
		addCart
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";

	export default {
		components: {
			myserve: () => import("@/pages/pc/components/myserve.vue"),
			goodsComment: () => import("@/pages/pc/views/shop/components/goods-comment.vue"),
			goodsShowImg: () => import("@/pages/pc/views/shop/components/goods-showimg.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				imgCarouselIndex: 0,
				imgCarouselList: [], //商品图片
				showGoodsImg: "",
				showGoodsPrice: "",
				model: {
					id: "",
					cover: "",
					title: "",
					subtitle: "",
					goodsType: '0',
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
				goodsInfo({
					id: this.model.id
				}).then(res => {
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
			goodsImgChange(current) {
				this.imgCarouselIndex = current;
			},
			prevLyGoodsImg() {
				this.$refs.goodsCarousel.prev();
			},
			nextGoodsImg() {
				this.$refs.goodsCarousel.next();
			},
			//设置展示商品大图
			setShowGoodsImg(imgUrl) {
				if (imgUrl) {
					this.showGoodsImg = imgUrl;
				}
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
							this.$notification.error({
								message: "提示",
								description: "请选择商品规格"
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
						spec: "",
						orderType: '0'
					};
					if (this.model.isSpec === "1") {
						var sv = this.specValInfo();
						if (!sv) {
							this.$notification.error({
								message: "提示",
								description: "请选择商品规格"
							});
							return;
						} else {
							data.spec = sv.specVal;
						}
					}
					if (this.model.goodsType === '2') {
						data.orderType = '1'
					} else if (this.model.goodsType === '3') {
						data.orderType = '2'
					}
					this.$router.push({
						path: "/shop/order/confirmOrder",
						query: data
					});
				}
			},
			setTabId(tabId) {
				this.tabId = tabId;
				this.$el.querySelector(".goodsInfoContent").scrollIntoView();
			},
			//预览商品图片
			showGoodsImgModal(imgUrl) {
				this.showImgModal = true;
				if (imgUrl) {
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.goodsShowImg.loadData(imgUrl, this.model);
						}, 200);
					});
				} else {
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.goodsShowImg.loadData(this.showGoodsImg, this.model);
						}, 200);
					});
				}
			},
			goodsShowImgClose() {
				this.showImgModal = false;
			},
			openUrl(url) {
				if (url) {
					if (url.indexOf("http") >= 0) {
						window.location = url;
					} else {
						this.$router.push(url);
					}
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.goodsInfo {
		width: 1200px;
		margin: auto;
		padding-top: 10px;

		.breadcrumb {
			.home {
				color: #004930;
				font-size: 25px;
				position: relative;
				top: 3px;
				margin-right: 10px;
			}

			.ant-breadcrumb {
				a {
					font-size: 16px;
					font-weight: 400;
					color: #666666;
				}

				span:last-child {
					color: #bbbbbb;
				}
			}
		}

		.goodsSpec {
			display: flex;
			margin-top: 20px;
			margin-bottom: 50px;

			.goodsSpecLeft {
				margin-right: 40px;
				width: 580px;
				// height: 400px;

				.goodsCoverCont {
					background-color: #ebebeb;
					position: relative;
					text-align: center;
					height: 400px;

					.goodsCover {
						max-width: 580px;
						height: 400px;
					}

					.magnify {
						position: absolute;
						bottom: 10px;
						right: 10px;
						width: 44px;
						height: 44px;
						background-color: #000000;
						opacity: 0.4;

						.search {
							font-size: 30px;
							color: #ffffff;
							padding-top: 8px;
						}
					}
				}

				.goodsImgsCont {
					height: 113px;
					margin-top: 25px;

					.carouselLeft {
						width: 12px;
						height: 113px;
						padding-right: 10px;
					}

					.carouselRight {
						width: 12px;
						text-align: right;
					}

					.carousel {
						width: 535px;
						height: 113px;

						.ant-carousel {
							width: 100%;

							.goodsCarouselGroup {
								display: flex !important;

								.carouselImg {
									margin-right: 20px;
									cursor: pointer;

									&:last-child {
										margin-right: 0px;
									}

									img {
										width: 165px;
										height: 113px;
									}
								}
							}
						}
					}
				}
			}

			.goodsSpecRight {
				flex: 1;

				.title1 {
					font-size: 24px;
					font-weight: 400;
					color: #333333;
				}

				.title2 {
					margin-top: 10px;
					font-size: 14px;
					font-weight: 400;
					color: #666666;
				}

				.goodsPrice {
					margin-top: 20px;
					margin-bottom: 50px;

					.priceTitle {
						font-size: 14px;
						font-weight: 400;
						color: #d54040;
						padding-left: 10px;
					}

					.price {
						font-size: 36px;
						font-weight: 400;
						color: #d54040;
					}

					.orderNum {
						font-size: 14px;
						font-weight: 400;
						color: #bbbbbb;
						padding-left: 20px;
					}
				}

				.specList {
					display: flex;
					margin-bottom: 20px;

					.specName {
						width: 66px;
						font-size: 14px;
						font-weight: 400;
						color: #666666;
						padding-top: 10px;
					}

					.specValList {
						flex: 1;
						display: flex;

						.specValItem {
							min-width: 90px;
							height: 40px;
							background-color: #ffffff;
							border: solid 1px #dddddd;
							text-align: center;
							padding: 0px 10px;
							line-height: 40px;
							margin-right: 10px;
							position: relative;
							cursor: pointer;

							.specValCheck {
								display: none;
								position: absolute;
								right: 0px;
								bottom: 0px;
								width: 14px;
								height: 14px;
								color: #ff0036;

								i {
									position: relative;
									top: -12px;
								}
							}

							&:hover {
								border: solid 2px #ff0036;
							}

							&.check {
								.specValCheck {
									display: block;
								}

								border: solid 2px #ff0036;
							}
						}
					}
				}

				.quantity {
					display: flex;

					.quantityTitle {
						width: 66px;
						font-size: 14px;
						font-weight: 400;
						color: #666666;
						padding-top: 10px;
					}

					.goodsNumCont {
						flex: 1;

						.goodsNum {
							width: 140px;
							height: 40px;
							background-color: #ffffff;
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

				.buyCont {
					display: flex;
					width: 220px;
					height: 40px;
					border: solid 1px #d54040;
					margin-top: 30px;
					cursor: pointer;

					.buyLeft {
						flex: 0.5;
						font-size: 14px;
						line-height: 40px;
						color: #d54040;
						text-align: center;
						font-weight: 400;
					}

					.buyRight {
						flex: 0.5;
						background-color: #d54040;
						font-size: 14px;
						line-height: 40px;
						color: #ffffff;
						text-align: center;
						font-weight: 400;
					}
				}
			}
		}

		.goodsInfoContent {
			.tabs {
				display: flex;
				background-color: #fff;
				width: 99%;

				.tabItem {
					width: 120px;
					height: 40px;
					background-color: #ebebeb;
					font-size: 16px;
					font-weight: 400;
					line-height: 40px;
					color: #999999;
					text-align: center;
					margin-right: 10px;
					cursor: pointer;

					&.check {
						background-color: #004930;
						color: #ffffff;
					}
				}
			}

			.tabCont {
				min-height: 450px;
				border: solid 1px #ebebeb;

				.htmlContent {
					padding: 20px;

					img {
						max-width: 100%;
					}
				}
			}
		}
	}
</style>
