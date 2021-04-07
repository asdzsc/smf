<template>
	<div class="newsInfo">
		<div class="cont">
			<div class="title">
				{{model.title}}
			</div>
			<div class="htmlContent" v-html="model.cont"></div>
		</div>

		<myserve></myserve>

		<zxfwLjyy ref="zxfwLjyy" :goodsId="model.id"></zxfwLjyy>
	</div>
</template>

<script>
	import {
		goodsInfo
	} from "@/pages/mobile/api/shop";
	export default {
		components: {
			myserve: () => import("@/pages/pc/components/myserve.vue"),
			zxfwLjyy: () => import("@/pages/pc/views/zxfw/components/zxfw-ljyy.vue")
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
				this.$message.error("参数错误");
				this.$router.go(-1)
			}
		},
		methods: {
			_goodsInfo() {
				goodsInfo({
					id: this.model.id,
				}).then((res) => {
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
	.video-js {
		margin: auto;
	}

	.newsInfo {
		.cont {
			max-width: 1200px;
			margin: auto;
			padding-top: 40px;

			.title {
				// margin-top: 50px;
				text-align: center;
				font-size: 28px;
				color: #004930;
			}

			.publishTime {
				margin-top: 25px;
				text-align: center;
				font-size: 18px;
				color: #666666;
			}

			.htmlContent {
				padding: 45px 0px;

				/deep/ img {
					max-width: 100% !important;
				}
			}
		}
	}
</style>
