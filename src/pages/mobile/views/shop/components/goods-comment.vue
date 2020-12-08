<template>
	<div class="goodsComment">
		<div class="assessUser">用户评价</div>
		<div v-if="model.list.length>0">
			<div class="assess" v-for="item in model.list" :key="item.id">
				<div class="percent">
					<p>好评度：{{(item.score * 20) + '%'}}</p>
					<van-rate v-model="item.score" readonly :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
				</div>
				<ul>
					<li>
						<div class="userDesc">
							<van-image round width=".6rem" height=".6rem" :src="getAvatar(item.avatar)" />
							<div class="userIntro">
								<p class="name">用户名:{{ item.name }}</p>
								<p class="date">	<span class="commentDtime">{{ parseTime(item.create_date) }}</span></p>
							</div>
						</div>
						<p class="desc">{{ item.goods_cont }}</p>
						<div class="assessDesc">
							<div class="assessDescImg"
							 v-for="(imgItem,index) in item.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, item.imgList)">
								<img :src="baseUrl + imgItem"   alt="">
							</div>
						</div>
					</li>
				</ul>
				<div class="btn">查看全部</div>
			</div>
		</div>
		<div v-else><van-empty description="暂无数据" /></div>
		<!-- 用户评价 end -->
	</div>
</template>

<script>
	import {
		orderCommentList
	} from '@/pages/mobile/api/shop'
	import {
		ImagePreview
	} from 'vant';
	import * as utils from "@/pages/mobile/libs/utils";
	export default {
		props: {
			goodsId: {
				type: String,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/usernull.png'`,
				showImgModal: false,
				loading: false,
				model: {
					current: "1",
					pageSize: "10",
					goodsId: this.goodsId,
					commentType: "1",
					isUser: false,
					isPaging: true,
					isShow: '1',
					total: "0",
					list: []
				}
			};
		},
		mounted() {
			this.loadData();
			this.showGoodsImgModal();
		},
		methods: {
			loadData() {
				var vm = this;
				this.loading = true
				orderCommentList(this.model).then(res => {
					this.loading = false
					if (res.code === 0) {
						Object.assign(vm.model, res.data);
						vm.model.list.forEach(item => {
							if (item.img) {
								var imgList = item.img.split(',')
								this.$set(item, 'imgList', imgList)
							} else {
								this.$set(item, 'imgList', [])
							}
							item.cont = item.cont.replace(/\n/g, '<br>')
						})
					}
				})
			},
			showGoodsImgModal() {
				// let imgList = this.model.list.imgList.map(i => {
				// 	return this.baseUrl + i
				// })
				// ImagePreview(imgList);
			},
			setPage(pageNum) {
				this.model.current = pageNum;
				this.loadData();
			},
			getAvatar(record) {
				if (record) {
					if (record.indexOf("http") >= 0) {
						return record;
					} else {
						return this.baseUrl + record;
					}
				} else {
					return "/img/usernull.png";
				}
			},
			showImg(imgUrl, imgList) {
				this.showImgModal = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.loadData(imgUrl, imgList);
					}, 200);
				});
			},
			showImgClose() {
				this.showImgModal = false;
			},
			parseTime(time) {
				return utils.parseTime(time, "{y}-{m}-{d}");
			}
		}
	};
</script>

<style lang="less" scoped>
	.goodsComment {
		margin: .2rem .14rem;
		background-color: #ffffff;
		padding: .2rem;
		box-sizing: border-box;
		padding-bottom: .3rem;
		.assess {
			.percent {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: .3rem;

				p {
					color: #666666;
					font-size: .28rem;
				}
			}

			.userDesc {
				margin-top: .3rem;
				display: flex;

				.userIntro {
					display: flex;
					flex-direction: column;
					margin-left: .3rem;

					.name {
						color: #333333;
					}

					.date {
						color: #999999;
					}
				}
			}
				.desc{
					margin: .3rem 0 0.2rem 0;
				}
			.assessDesc {
				display: flex;
				    flex-wrap: wrap;
					justify-content: space-around;

				.assessDescImg {
					margin-top: 0.1rem;
					img {
						width: 3.20rem;
						height: 2rem;
					}
				}
			}

			.btn {
				margin: .3rem auto 0;
				text-align: center;
				color: #999999;
				font-size: .24rem;
			}
		}

	}
</style>
