<template>
	<div class="w1920 shop">
		<div class="banner">
			<a-carousel arrows :autoplay="true">
				<!-- <div slot="prevArrow" class="custom-slick-arrow left-circle">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow right-circle">
          <a-icon type="right-circle" />
        </div>-->
				<div v-for="item in banners" :key="item.id" :style="item.url ? 'cursor: pointer;' : ''" @click="openUrl(item.url)">
					<img :src="baseUrl + item.img" />
				</div>
			</a-carousel>
			<div class="menu">
				<div class="title">石门峰线上商城</div>
				<div class="module">
					<div class="title2">服务</div>
					<div class="moduleCont">
						<div v-for="item in columnList" :key="item.id" class="moduleItem">
							{{ item.name }}
						</div>
					</div>
					<div class="title2">品牌</div>
					<div class="moduleCont">
						<div class="moduleItem">所有品牌</div>
						<div class="moduleItem">线上商城</div>
					</div>
				</div>
				<div @click="openUrl('/shop/cart')" class="cart">
					<div v-if="cartNum === 0" class="cartText">暂无商品</div>
					<div v-else class="cartText">{{ cartNum }} 件商品</div>
					<div class="cartIcon">
						<i class="iconfont iconadd-cart"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="vrxm">
			<div class="title">VR720°实景选墓</div>
			<div class="goodsCont">
				<div class="goodsItem">
					<img src="/img/mubei1.jpg" />
					<div class="goodsTitleCont">
						<div class="goodsTitle">
							明星产品
						</div>
						<div class="goodsSubhead">
							最畅销精简设计的纪念碑
						</div>
						<div class="goodsPrice"><span class="money">￥</span> 000.00</div>
					</div>
					<div class="buyCont">
						<div class="buyLeft">加入购物车</div>
						<div class="buyRight">
							立即购买
						</div>
					</div>
				</div>
				<div class="goodsItem">
					<img src="/img/mubei2.jpg" />
					<div class="goodsTitleCont">
						<div class="goodsTitle">
							经典立式
						</div>
						<div class="goodsSubhead">
							精品典雅纪念碑
						</div>
						<div class="goodsPrice"><span class="money">￥</span> 000.00</div>
					</div>
					<div class="buyCont">
						<div class="buyLeft">加入购物车</div>
						<div class="buyRight">
							立即购买
						</div>
					</div>
				</div>
				<div class="goodsItem">
					<img src="/img/mubei3.jpg" />
					<div class="goodsTitleCont">
						<div class="goodsTitle">
							经典卧式
						</div>
						<div class="goodsSubhead">
							宝石精品纪念碑
						</div>
						<div class="goodsPrice"><span class="money">￥</span> 000.00</div>
					</div>
					<div class="buyCont">
						<div class="buyLeft">加入购物车</div>
						<div class="buyRight">
							立即购买
						</div>
					</div>
				</div>
			</div>
			<div class="more">查看更多</div>
		</div>
		<!-- 鲜花推荐 start -->
		<div class="goods">
			<div class="title">鲜花推荐</div>
			<div v-if="xhAllList.length > 0" class="goodsCont">
				<div @click="openGoodsInfo(xhMainInfo)" class="goodsLeft">
					<img :src="getGoodsImg(xhMainInfo.cover)" />
					<div class="goodsLeftTitle">
						<div class="goodsTitle">{{ xhMainInfo.title }}</div>
						<div class="goodsPrice">
							<span class="money">￥</span>
							{{ goodsPrice(xhMainInfo) }}
						</div>
					</div>
					<div class="buyCont">
						<div @click.stop="openGoodsInfo(xhMainInfo)" class="buyLeft">加入购物车</div>
						<div @click.stop="openGoodsInfo(xhMainInfo)" class="buyRight">
							立即购买
						</div>
					</div>
				</div>
				<div class="goodsRight">
					<a-row :gutter="[20, 20]">
						<a-col v-for="item in xhList" :key="item.id" class="gutter-row" :span="12" @click="openGoodsInfo(item)">
							<div class="gutter-box">
								<img :src="getGoodsImg(item.cover)" />
								<div class="goodsRightTitle">
									<div class="goodsTitle">{{ item.title }}</div>
									<div class="goodsPrice">
										<span class="money">￥</span>
										{{ goodsPrice(item) }}
									</div>
								</div>

								<div class="buyCont">
									<div @click.stop="openGoodsInfo(item)" class="buyLeft">加入购物车</div>
									<div @click.stop="openGoodsInfo(item)" class="buyRight">
										立即购买
									</div>
								</div>
							</div>
						</a-col>
					</a-row>
				</div>
			</div>
			<div v-else class="noData">暂无数据</div>
			<div @click="$router.push('/shop/goodsList?cid=445465710975700992')" class="more">查看更多</div>
		</div>
		<!-- 鲜花推荐 end -->
		<!-- 代客祭扫 start -->
		<div class="serviceCont">
			<div class="title">代客祭扫</div>
			<div class="serviceGoods">
				<div v-for="item in dkjsList" :key="item.id" @click="openGoodsInfo(item)" class="goodsItem">
					<div class="goodsImg">
						<img :src="getGoodsImg(item.cover)" />
					</div>
					<div class="goodsTitleCont">
						<div class="goodsTitle">{{ item.title }}</div>
						<div class="goodsPrice">
							<span class="money">￥</span>
							{{ goodsPrice(item) }}
						</div>
						<div class="buyCont">
							<div class="buyLeft">已有0人购买</div>
							<div class="buyRight">
								<div @click.stop="openGoodsInfo(item)" class="buyBtn">
									立即购买
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 代客祭扫 end -->
		<!-- 礼仪服务 start -->
		<div class="etiquette">
			<div class="etiquetteCont">
				<div class="etiquetteLeft">
					<div class="etiquetteLeftTitle">
						礼仪服务
					</div>
					<div class="etiquetteLeftSubhead">{{ lyfwInfo.title }}</div>
					<div class="etiquetteLeftIntro">
						{{ lyfwInfo.intro }}
					</div>
					<div class="buyCont">
						<div class="buyLeft">
							<div @click.stop="openGoodsInfo(lyfwInfo)" class="buyBtn">
								立即购买
							</div>
						</div>
						<div class="buyRight">
							<span class="money">￥</span> {{ goodsPrice(lyfwInfo) }}
						</div>
					</div>
				</div>
				<div class="etiquetteRight">
					<a-carousel ref="lyfwCarousel" :afterChange="lyfwChange" :autoplay="true" :dots="false">
						<div v-for="item in lyfwList" :key="item.id" @click="openGoodsInfo(item)">
							<img :src="getGoodsImg(item.cover)" />
						</div>
					</a-carousel>
					<div class="carouselPage">
						<div class="pageNum">
							<span class="currentPage">{{ lyfwIndex + 1 }}</span> /{{
                lyfwList.length
              }}
						</div>
						<div class="paging">
							<a-icon @click="prevLyfw()" type="left" />
							<a-icon @click="nextLyfw()" class="right" type="right" />
						</div>
					</div>
				</div>
			</div>
			<myserve></myserve>
		</div>
		<!-- 礼仪服务 end -->
	</div>
</template>
<script>
	import {
		bannerList,
		goodsColumnList,
		goodsList
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";

	export default {
		components: {
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				banners: [],
				columnList: [],
				xhAllList: [],
				xhMainInfo: {},
				xhList: [],
				dkjsList: [],
				lyfwList: [],
				lyfwIndex: -1
			};
		},
		computed: {
			cartNum() {
				return this.$store.state.account.cartNum;
			},
			lyfwInfo() {
				if (this.lyfwIndex >= 0) {
					return this.lyfwList[this.lyfwIndex];
				} else {
					return {
						id: "",
						title: "",
						intro: "",
						isSpec: "0",
						price: 0
					};
				}
			}
		},
		mounted() {
			this._bannerList();
			this._goodsColumnList();

			//鲜花推荐
			this.getXhList();
			//代客祭扫
			this.getDkjsList();
			//礼仪服务
			this.getLyfwList();
		},
		methods: {
			_bannerList() {
				bannerList({
					bannerType: '2'
				}).then(res => {
					if (res.code === 0) {
						this.banners = res.data;
					}
				});
			},
			_goodsColumnList() {
				goodsColumnList().then(res => {
					if (res.code === 0) {
						this.columnList = res.data;
					}
				});
			},
			//鲜花推荐
			getXhList() {
				goodsList({
					current: 1,
					pageSize: 5,
					status: "1",
					columnId: "445465710975700992"
				}).then(res => {
					if (res.code === 0) {
						this.xhAllList = res.data.list;
						if (this.xhAllList.length > 0) {
							this.xhMainInfo = this.xhAllList[0];
						}
						if (this.xhAllList.length >= 2) {
							this.xhList = [...this.xhAllList];
							this.xhList.splice(0, 1);
						}
					}
				});
			},
			// 代客祭扫
			getDkjsList() {
				goodsList({
					current: 1,
					pageSize: 10,
					status: "1",
					columnId: "451643107446018048"
				}).then(res => {
					if (res.code === 0) {
						this.dkjsList = res.data.list;
					}
				});
			},
			// 礼仪服务
			getLyfwList() {
				goodsList({
					current: 1,
					pageSize: 10,
					status: "1",
					columnId: "445465805926354944"
				}).then(res => {
					if (res.code === 0) {
						this.lyfwList = res.data.list;
						if (this.lyfwList.length > 0) {
							this.lyfwIndex = 0;
						}
					}
				});
			},
			lyfwChange(current) {
				this.lyfwIndex = current;
			},
			prevLyfw() {
				this.$refs.lyfwCarousel.prev();
			},
			nextLyfw() {
				this.$refs.lyfwCarousel.next();
			},
			getGoodsImg(cover) {
				if (cover) {
					if (cover.indexOf("http") >= 0) {
						return cover;
					} else {
						return this.baseUrl + cover;
					}
				} else {
					return "/img/zwtp.jpg";
				}
			},
			goodsPrice(goodsInfo) {
				if (goodsInfo.isSpec === "1") {
					return (
						utils.parseMoney(goodsInfo.minPrice) +
						" ~ " +
						utils.parseMoney(goodsInfo.maxPrice)
					);
				} else {
					return utils.parseMoney(goodsInfo.price);
				}
			},
			openUrl(url) {
				if (url) {
					if (url.indexOf("http") >= 0) {
						window.location = url;
					} else {
						this.$router.push(url);
					}
				}
			},
			//商品详情
			openGoodsInfo(goodsInfo) {
				if (goodsInfo.id) {
					this.$router.push({
						path: "/shop/goodsInfo",
						query: {
							id: goodsInfo.id
						}
					});
				}
			},
			//立即购买
			openConfirmOrder(goodsInfo) {
				if (goodsInfo.id) {
					this.$router.push({
						path: "/shop/order/confirmOrder",
						query: {
							gid: goodsInfo.id
						}
					});
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.shop {
		.banner {
			position: relative;

			// 顶部图片
			/deep/ .ant-carousel {
				.slick-prev::before {
					display: none;
				}

				.slick-next::before {
					display: none;
				}

				.left-circle {
					left: 10px;
					z-index: 1;
					color: #ffffff;
					font-size: 40px;

					&:hover {
						opacity: 0.5;
					}
				}

				.right-circle {
					right: 30px;
					z-index: 1;
					color: #ffffff;
					font-size: 40px;

					&:hover {
						opacity: 0.5;
					}
				}

				.slick-slide {
					width: 100%;
					height: 420px;
					text-align: center;
					overflow: hidden;

					img {
						display: block;
						width: 100%;
						height: 420px;
					}
				}
			}

			//菜单
			.menu {
				width: 285px;
				height: 420px;
				position: absolute;
				top: 0px;
				left: 360px;
				background-color: #f3f3f2;
				padding: 60px 30px 30px 30px;

				.title {
					font-size: 24px;
					font-weight: 700;
					color: #004930;
				}

				.module {
					padding-top: 30px;

					.title2 {
						font-size: 16px;
						font-weight: 700;
						color: #333333;
					}

					.moduleCont {
						padding-top: 10px;
						padding-bottom: 20px;
						display: flex;

						.moduleItem {
							padding-right: 18px;
						}
					}
				}

				.cart {
					margin: auto;
					width: 175px;
					height: 40px;
					border: solid 1px #d54040;
					bottom: 30px;
					position: absolute;
					left: 57px;
					display: flex;
					cursor: pointer;

					.cartText {
						flex: 1;
						font-size: 14px;
						font-weight: 400;
						line-height: 40px;
						color: #d54040;
						text-align: center;
					}

					.cartIcon {
						width: 55px;
						background-color: #d54040;
						text-align: center;

						.iconfont {
							color: #ffffff;
							font-size: 35px;
							position: relative;
							top: -5px;
						}
					}
				}
			}
		}

		.vrxm {
			max-width: 1200px;
			margin: auto;
			padding-top: 80px;
			padding-bottom: 80px;

			.title {
				text-align: center;
				font-size: 30px;
				font-weight: 400;
				color: #333333;
			}

			.goodsCont {
				display: flex;
				padding-top: 40px;
				padding-bottom: 25px;

				.goodsItem {
					width: 373px;
					height: 544px;
					margin-right: 40px;
					cursor: pointer;
					position: relative;

					&:last-child {
						margin-right: 0px;
					}

					img {
						width: 100%;
						height: 424px;
					}

					.goodsTitleCont {
						height: 120px;
						background-color: #fff;

						.goodsTitle {
							text-align: center;
							font-size: 18px;
							font-weight: normal;
							color: #333333;
							padding-top: 20px;
							font-weight: 400;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.goodsSubhead {
							text-align: center;
							font-size: 14px;
							font-weight: 400;
							color: #999999;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.goodsPrice {
							text-align: center;
							font-size: 18px;
							font-weight: 400;
							color: #d54040;
							padding-top: 10px;

							.money {
								font-size: 14px;
							}
						}
					}

					.buyCont {
						display: none;
						width: 220px;
						height: 40px;
						position: absolute;
						top: 10px;
						left: 77px;
						border: solid 1px #d54040;
						cursor: pointer;

						.buyLeft {
							flex: 0.5;
							font-size: 14px;
							line-height: 40px;
							color: #d54040;
							text-align: center;
							font-weight: 400;
							background-color: #fff;
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

					&:hover {
						.goodsTitleCont {
							transition: 0.5s;
							background-color: #004930;

							.goodsTitle {
								color: #fff;
							}

							.goodsSubhead {
								color: #fff;
							}

							.goodsPrice {
								color: #fff;
							}
						}

						.buyCont {
							display: flex;
						}
					}
				}
			}

			.more {
				text-align: center;
				font-size: 16px;
				font-weight: 400;
				color: #999999;
				cursor: pointer;
			}
		}

		.goods {
			max-width: 1200px;
			margin: auto;
			padding-bottom: 80px;

			.title {
				text-align: center;
				font-size: 30px;
				font-weight: 400;
				color: #333333;
			}

			.goodsCont {
				display: flex;
				padding-top: 40px;
				padding-bottom: 50px;
				position: relative;

				.goodsLeft {
					cursor: pointer;
					width: 590px;
					height: 660px;
					margin-right: 20px;
					position: relative;

					img {
						width: 100%;
						height: 660px;
					}

					.goodsLeftTitle {
						height: 80px;
						background-color: #ebebeb;
						opacity: 0.9;
						position: absolute;
						bottom: 0px;
						width: 100%;
						padding: 0px 20px;
						line-height: 80px;
						font-size: 18px;
						display: flex;

						.goodsTitle {
							color: #333333;
							font-weight: 400;
							flex: 0.5;
						}

						.goodsPrice {
							text-align: right;
							color: #d54040;
							font-weight: 400;
							flex: 0.5;
							font-size: 24px;

							.money {
								font-size: 18px;
							}
						}
					}

					.buyCont {
						display: none;
						width: 220px;
						height: 40px;
						position: absolute;
						top: 10px;
						right: 10px;
						border: solid 1px #d54040;
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

					&:hover {
						.goodsLeftTitle {
							background-color: #000000;
							opacity: 0.65;
							transition: 0.5s;

							.goodsTitle {
								color: #ffffff;
							}

							.goodsPrice {
								color: #ffffff;
							}
						}

						.buyCont {
							display: flex;
						}
					}
				}

				.goodsRight {
					flex: 1;
					position: relative;

					.gutter-box {
						cursor: pointer;
						width: 285px;
						height: 320px;

						img {
							width: 100%;
							height: 100%;
						}

						.goodsRightTitle {
							width: 285px;
							height: 40px;
							background-color: #ebebeb;
							opacity: 0.9;
							position: absolute;
							bottom: 10px;
							padding: 0px 20px;
							display: flex;
							line-height: 40px;

							.goodsTitle {
								color: #333333;
								font-weight: 400;
								flex: 0.5;
								font-size: 14px;
							}

							.goodsPrice {
								text-align: right;
								color: #d54040;
								font-weight: 400;
								flex: 0.5;
								font-size: 18px;

								.money {
									font-size: 14px;
								}
							}
						}

						.buyCont {
							display: none;
							width: 180px;
							height: 30px;
							position: absolute;
							top: 20px;
							right: 20px;
							border: solid 1px #d54040;
							cursor: pointer;

							.buyLeft {
								flex: 0.5;
								font-size: 12px;
								line-height: 30px;
								color: #d54040;
								text-align: center;
								font-weight: 400;
							}

							.buyRight {
								flex: 0.5;
								background-color: #d54040;
								font-size: 12px;
								line-height: 30px;
								color: #ffffff;
								text-align: center;
								font-weight: 400;
							}
						}

						&:hover {
							.goodsRightTitle {
								background-color: #000000;
								opacity: 0.65;
								transition: 0.5s;

								.goodsTitle {
									color: #ffffff;
								}

								.goodsPrice {
									color: #ffffff;
								}
							}

							.buyCont {
								display: flex;
							}
						}
					}
				}
			}

			.noData {
				padding-top: 40px;
				padding-bottom: 50px;
				text-align: center;
				font-size: 16px;
			}

			.more {
				text-align: center;
				font-size: 16px;
				font-weight: 400;
				color: #999999;
				cursor: pointer;
			}
		}

		.serviceCont {
			height: 638px;
			background-color: #ebebeb;
			padding-top: 75px;

			.title {
				text-align: center;
				font-size: 30px;
				font-weight: 400;
				color: #333333;
				padding-bottom: 30px;
			}

			.serviceGoods {
				width: 1200px;
				margin: auto;
				display: flex;
				white-space: nowrap;
				overflow-x: auto;
				padding-bottom: 67px;
				position: relative;

				&::-webkit-scrollbar-track {
					height: 5px;
					background-color: #c8cac9;
				}

				&::-webkit-scrollbar {
					height: 5px;
					background-color: #004a35;
				}

				&::-webkit-scrollbar-thumb {
					height: 5px;
					background-color: #004a35;
				}

				.goodsItem {
					width: 285px;
					height: 416px;
					margin-right: 20px;
					cursor: pointer;

					&:last-child {
						margin-right: 0px;
					}

					.goodsImg {
						width: 285px;
						height: 260px;

						img {
							width: 100%;
							height: 260px;
						}
					}

					.goodsTitleCont {
						background-color: #ffffff;
						height: 156px;
						padding-top: 20px;
						padding-left: 15px;
						padding-right: 10px;

						.goodsTitle {
							font-size: 16px;
							font-weight: normal;
							color: #333333;
						}

						.goodsPrice {
							font-size: 24px;
							color: #d54040;
							font-weight: 400;

							.money {
								font-size: 18px;
								color: #d54040;
							}
						}
					}

					.buyCont {
						padding-top: 15px;
						display: flex;

						.buyLeft {
							flex: 0.5;
							font-size: 14px;
							color: #999999;
							line-height: 34px;
						}

						.buyRight {
							flex: 0.5;
							text-align: right;

							.buyBtn {
								cursor: pointer;
								width: 100px;
								height: 34px;
								background-color: #004930;
								border-radius: 17px;
								float: right;
								text-align: center;
								line-height: 34px;
								color: #fff;
							}
						}
					}
				}
			}
		}

		.etiquette {
			height: 820px;
			background-color: #fff;
			padding-top: 120px;

			.etiquetteCont {
				width: 1200px;
				margin: auto;
				display: flex;
				padding-bottom: 100px;

				.etiquetteLeft {
					flex: 1;

					.etiquetteLeftTitle {
						font-size: 30px;
						font-weight: 400;
						color: #333333;
					}

					.etiquetteLeftSubhead {
						font-size: 18px;
						color: #004930;
						font-weight: 700;
						padding-top: 100px;
					}

					.etiquetteLeftIntro {
						font-size: 16px;
						color: #666666;
						padding-top: 15px;
						line-height: 30px;
						padding-right: 100px;
						height: 140px;
						margin-bottom: 35px;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 4;
						overflow: hidden;
						display: -webkit-box;
						width: 600px;
					}

					.buyCont {
						display: flex;

						.buyLeft {
							.buyBtn {
								cursor: pointer;
								width: 120px;
								height: 38px;
								background-color: #004930;
								border-radius: 19px;
								text-align: center;
								line-height: 38px;
								color: #ebebeb;
								font-size: 16px;
							}
						}

						.buyRight {
							flex: 1;
							padding-left: 20px;
							font-size: 24px;
							color: #d54040;
							font-weight: 400;

							.money {
								font-size: 18px;
								color: #d54040;
							}
						}
					}
				}

				.etiquetteRight {
					cursor: pointer;
					width: 600px;
					height: 400px;
					position: relative;

					img {
						display: block;
						width: 100%;
						height: 400px;
					}

					.carouselPage {
						width: 180px;
						height: 45px;
						background-color: #ebebeb;
						opacity: 0.9;
						position: absolute;
						bottom: 0px;
						left: 0px;
						padding: 0px 20px;
						display: flex;
						line-height: 45px;

						.pageNum {
							flex: 0.5;
							font-size: 16px;
							color: #666666;

							.currentPage {
								font-size: 30px;
								color: #004930;
								font-weight: 700;
							}
						}

						.paging {
							flex: 0.5;
							text-align: right;
							font-size: 20px;
							color: #396552;

							.right {
								margin-left: 15px;
							}
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 1600px) {
		.shop {
			.banner {
				.menu {
					left: 250px;
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.shop {
			.banner {
				.menu {
					left: 50px;
				}
			}
		}
	}
</style>
