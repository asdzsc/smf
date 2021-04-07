<template>
	<div>
		<div class="cont">
			<div class="topTitle">
				<p class="articleTitle">{{ model.title }}</p>
			</div>
			<div class="htmlContent" v-html="model.cont"></div>
		</div>

		<zxfwLjyy ref="zxfwLjyy" :goodsId="model.id"></zxfwLjyy>
	</div>
</template>

<script>
	import {
		goodsInfo
	} from "@/pages/mobile/api/shop";
	export default {
		components: {
			zxfwLjyy: () => import("@/pages/mobile/views/zxfw/components/zxfw-ljyy.vue")
		},
		data() {
			return {
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
					cont: "",
				}
			}
		},
		mounted() {
			if (this.$route.query.id) {
				this.model.id = this.$route.query.id;
				this._goodsInfo();
			} else {
				this.$notify({
					type: "warning",
					message: '参数错误'
				});
				this.$router.go(-1)
			}
		},
		methods: {
			_goodsInfo() {
				this.$toast.loading({
					message: "加载中...",
					forbidClick: true,
				});
				goodsInfo({
					id: this.model.id,
				}).then((res) => {
					this.$toast.clear();
					if (res.code === 0) {
						Object.assign(this.model, res.data.shopGoods);
						this.goodsColumnList = res.data.goodsColumnList;
						this.specNameList = res.data.specNameList;
						this.specValList = res.data.specValList;
						this.showGoodsImg = this.model.cover;
						if (!this.model.imgs) {
							this.model.imgs = [];
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.cont {
		padding: 10px;
		.topTitle {
			text-align: center;

			.articleTitle {
				color: #004930;
				font-size: 0.35rem;
			}
		}

		.htmlContent {
			padding: 0.45rem 0px;
			width: 100%;

			/deep/ p {
				font-size: 0.3rem !important;
				line-height: 1.6;
				width: 100% !important;
				text-align: justify;
				// text-indent: 0px !important;
			}

			/deep/ span {
				font-size: 0.3rem !important;
				line-height: 1.6;
				width: 100% !important;
				text-align: justify;

				margin-top: 0.2rem;
				font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
					Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", miui,
					"Hiragino Sans GB", "Microsoft Yahei", sans-serif !important;
			}

			/deep/ img {
				max-width: 100% !important;
			}
		}
	}
</style>
