<template>
	<div class="ggzx">
		<xwzxHead name="公告中心"></xwzxHead>
		<div class="banner"></div>
		<div class="cont">
			<xwzxTitle  title="公告中心"></xwzxTitle>
			<!--
			<ul class="list">
			<li class="item" v-for="(item,id) in model.list" :key="id">
				<div class="newsImg">
					<img :src="baseUrl + item.cover" alt="">
				</div>
				<div class="desc">
					<div class="newsDtime">
						<div class="day">{{ parseTime(item.publishTime, "{d}") }}</div>
						<div class="dtime">
							{{ parseTime(item.publishTime, "{y}-{m}") }}
						</div>
					</div>
					<div class="intro">
						<div class="introTitle">{{ item.title }}</div>
						<div class="introCont">{{ item.intro }}</div>
					</div>
				</div>
			</li>
			</ul> -->
			<van-list  :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="list">
					<div class="item" v-for="(item,id) in model.list" :key="id">
						<div class="newsImg">
							<img :src="baseUrl + item.cover" alt="">
						</div>
						<div class="desc">
							<div class="newsDtime">
								<div class="day">{{ parseTime(item.publishTime, "{d}") }}</div>
								<div class="dtime">
									{{ parseTime(item.publishTime, "{y}-{m}") }}
								</div>
							</div>
							<div class="intro">
								<div class="introTitle">{{ item.title }}</div>
								<div class="introCont">{{ item.intro }}</div>
							</div>
						</div>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
	import xwzxHead from './components/xwzx-head.vue'
	import xwzxTitle from './components/xwzx-title.vue'
	import paging from './components/paging.vue'
	import {
		newsList
	} from "@/pages/pc/api/news";
	import * as utils from "@/pages/pc/libs/utils";
	import {
		Toast
	} from 'vant';
	export default {
		components: {
			xwzxHead,
			xwzxTitle,
			paging
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				finished: false,
				model: {
					current: "1",
					pageSize: "8",
					articleType: "1", //新闻类型
					columnId: "443278534481465344", //栏目id
					total: "0",
					list: []
				}
			};
		},
		mounted() {
			this._newsList();
		},
		methods: {
			onLoad(){
				 this._newsList();
			},
			_newsList() {
				var vm = this;
				vm.loading = true;
				newsList(this.model).then(res => {
					vm.loading = false;
					if (res.code === 0) {
						const results = res.data.list;
						vm.model.list = results
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
			parseTime(time, cFormat) {
				return utils.parseTime(time, cFormat);
			}
		}
	}
</script>

<style lang="less" scoped>
	.ggzx {
		.banner {
			background: url("/img/mobile/ggzx1.png") no-repeat center center;
			background-size: cover;
			height: 5rem;
			text-align: center;
			position: relative;
		}

		.cont {
			.list {
				.item {
					display: flex;
					margin-bottom: .6rem;

					.newsImg {
						margin-left: .4rem;
						width: 2.83rem;
						height: 1.84rem;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.desc {
						padding-left: 15px;

						.newsDtime {
							display: flex;

							.day {
								width: .52rem;
								height: .37rem;
								font-family: MicrosoftYaHei;
								font-size: .48rem;
								font-weight: normal;
								font-stretch: normal;
								letter-spacing: 0px;
								color: #666666;
							}

							.dtime {
								margin-top: .25rem;
								margin-left: 0.1rem;
								height: .17rem;
								font-family: MicrosoftYaHei;
								font-size: .22rem;
								font-weight: normal;
								font-stretch: normal;
								letter-spacing: 0px;
								color: #666666;
							}
						}

						.intro {
							margin-top: 17px;

							.introTitle {
								width: 3.16rem;
								color: #004930;
								font-size: .28rem;
								margin-bottom: .1rem;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								overflow: hidden;
								display: -webkit-box;
							}

							.introCont {
								width: 3.61rem;
								font-family: MicrosoftYaHei;
								font-size: .22rem;
								line-height: .32rem;
								letter-spacing: 0px;
								color: #666666;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								display: -webkit-box;
							}
						}
					}

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
</style>
