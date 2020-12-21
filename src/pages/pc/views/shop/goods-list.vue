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
				<a-breadcrumb-item>
					{{ columnInfo.name }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</div>
		<!-- 商品类别导航 end -->
		<div class="vrxm">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />

				<div class="goodsCont">
					<a-empty v-if="model.list.length === 0" />
					<div v-for="item in model.list" :key="item.id" class="goodsItem" @click="openGoodsInfo(item)">
						<img :src="getGoodsImg(item.cover)" />
						<div class="goodsTitleCont">
							<div class="goodsTitle">
								{{ item.title }}
							</div>
							<!-- 	<div class="goodsSubhead">
							最畅销精简设计的纪念碑
						</div> -->
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

				</div>
			</a-spin>
			<paging ref="paging" @setPage="setPage"></paging>
		</div>
		<myserve></myserve>
	</div>

</template>
<script>
	import {
		goodsColumnList,
		getGoodsColumnInfo,
		goodsList
	} from "@/pages/pc/api/shop";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				columnInfo: {
					name: '全部商品'
				},
				loading: false,
				model: {
					current: "1",
					pageSize: "8",
					columnId: "", //栏目id
					total: "0",
					list: []
				}
			}
		},
		mounted() {
			if (this.$route.query.cid) {
				this.model.columnId = this.$route.query.cid
			}
			this._getGoodsColumnInfo()
			this._goodsList()
		},
		methods: {
			_getGoodsColumnInfo() {
				if (this.model.columnId) {
					getGoodsColumnInfo({
						id: this.model.columnId
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.columnInfo, res.data)
						}
					})
				}
			},
			// 礼仪服务
			_goodsList() {
				this.loading = true;
				goodsList(this.model).then(res => {
					this.loading = false;
					if (res.code === 0) {
						Object.assign(this.model, res.data);
						setTimeout(() => {
							this.$refs.paging.setPageInfo(this.model);
						}, 200)
					}
				});
			},
			setPage(pageNum) {
				this.model.current = pageNum;
				this._goodsList();
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
	}
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

		.vrxm {
			max-width: 1200px;
			margin: auto;
			// padding-top: 80px;
			// padding-bottom: 80px;

			.title {
				font-size: 30px;
				font-weight: 400;
				color: #333333;
				justify-content: center;
				display: flex;
				align-items: center;
			}

			p {
				margin: 0 20px;
			}

			.goodsCont {
				display: flex;
				// padding-top: 40px;
				padding-bottom: 25px;
				flex-wrap: wrap;

				.goodsItem {
					width: 276px;
					height: 434px;
					margin-right: 30px;
					margin-top: 30px;
					cursor: pointer;
					position: relative;

					&:nth-child(4) {
						margin-right: 0px;
					}

					&:last-child {
						margin-right: 0px;
					}

					img {
						width: 100%;
						height: 314px;
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
						left: 27px;
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
			}
		}
	}
</style>
