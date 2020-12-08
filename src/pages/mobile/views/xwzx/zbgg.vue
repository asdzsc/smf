<template>
	<div class="zbgg">
		<xwzxHead name="招标广告"></xwzxHead>
		<div class="banner"></div>
		<div class="cont">
			<xwzxTitle title="招标广告"></xwzxTitle>
			<van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="list">
					<div v-if="model.list.length == 0">
						<van-empty description="暂无数据" />
					</div>
					<div class="item" v-for="item in model.list" :key="item.id">
						<div class="itemTitleCont">
							<div class="line"></div>
							<div class="itemTitle"> {{ item.title }}</div>
							<div class="downfile">下载项目详情</div>
						</div>
						<div class="intro">项目简介：{{ item.intro }}</div>
						<ul class="tableCont">
							<li class="item1">
								<div class="left">
									<div>
										{{ item.zbNum }}
									</div>
								</div>
								<div class="right">
									<div>3<span>家</span></div>
								</div>
							</li>
							<li class="item1">
								<div class="left">
									<div>{{ item.tbNum }}</div>
								</div>
								<div class="right">
									<div>5</div>
								</div>
							</li>
							<li class="item1">
								<div class="left">
									<div>{{ parseTime(item.endTime,'{y}-{m}-{d}') }}</div>
								</div>
								<div class="right">
									<div>2020.08.19</div>
								</div>
							</li>
							<li class="item1">
								<div class="left">
									<div>{{ item.jsxs }}</div>
								</div>
								<div class="right">
									<div>TT 30%</div>
								</div>
							</li>
							<li class="item1">
								<div class="left">
									<div>{{ parseTime(item.proTime,'{y}-{m}-{d}') }}</div>
								</div>
								<div class="right">
									<div>2020.09.20</div>
								</div>
							</li>
							<li class="item1">
								<div class="left">
									<div>招投标的状态</div>
								</div>
								<div class="right" v-html="statusText(item)">
									<div>即将开始</div>
								</div>
							</li>
						</ul>
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
		newsZbggList
	} from "@/pages/pc/api/news";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			xwzxHead,
			xwzxTitle,
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				finished: false,
				show: false,
				model: {
					current: "1",
					pageSize: "8",
					total: "0",
					list: []
				}
			};
		},
		mounted() {
			this._newsList();
		},
		methods: {
			onLoad() {
				this._newsList();
			},
			_newsList() {
				this.loading = true;
				newsZbggList(this.model).then(res => {
					var vm = this;
					vm.loading = false;
					vm.show = false
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
					if (vm.model.list.length === 0) {
						this.finished = false;
					}
				});
			},
			statusText(item) {
				var s = new Date()
				var sstr = utils.parseTime(s, '{y}-{m}-{d}')
				console.log(sstr)
				var estr = utils.parseTime(item.endTime, '{y}-{m}-{d}')
				var e = new Date(estr + ' 23:59:59')
				if (sstr === estr) {
					return `<div class="statusDiv jxz">进行中</div>`
				} else if (s < e) {
					return `<div class="statusDiv jjks">即将开始</div>`
				} else if (s > e) {
					return `<div class="statusDiv yjs">已结束</div>`
				}
			},
			parseTime(time, cFormat) {
				return utils.parseTime(time, cFormat);
			},
			openUrl(url) {
				var tempPage = window.open("", "_blank");
				tempPage.location = url;
			}
		}
	};
</script>

<style lang="less" scoped>
	.zbgg {
		.banner {
			background: url("/img/mobile/ggzx1.png") no-repeat center center;
			background-size: cover;
			height: 5rem;
			text-align: center;
			position: relative;
		}

		.cont {
			.list {
				margin: .6rem 0 .4rem .4rem;

				.showLoading {
					position: absolute;
					left: 50%;
					top: 70%;
				}

				.item {
					width: 6.64rem;

					.itemTitleCont {
						display: flex;

						.line {
							width: .04rem;
							height: .40rem;
							background-color: #004930;
						}

						.itemTitle {
							width: 2.53rem;
							padding-left: 10px;
							font-weight: 700;
							font-size: .32rem;
							line-height: .4rem;
							color: #004930;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							display: -webkit-box;
							flex: 1;
						}

						.downfile {
							width: 2.1rem;
							height: .48rem;
							text-align: center;
							font-size: .24rem;
							font-weight: 700;
							color: #16543e;
							line-height: .48rem;
							border: solid 2px #004930;
						}
					}

					.intro {
						width: 100%;
						margin-top: .35rem;
						height: .57rem;
						font-size: .24rem;
						color: #2e2e2e;
					}

					.tableCont {
						width: 100%;
						margin-top: .3rem;
						color: #2e2e2e;
						height: 5.27rem;

						.item1 {
							display: flex;
							height: .87rem;
							line-height: .87rem;
							font-size: .3rem;

							.left {
								width: 40%;
								text-align: right;
								color: #2e2e2e !important;
								background-color: rgb(229, 236, 234);

								div {
									width: 80%;
									height: 90%;
									margin: 0 auto;
									border-bottom: 1px solid #cecece;
									padding-right: 5%;
								}
							}

							.right {
								color: #0f513a;
								width: 60%;
								background-color: #f8f8f8;

								div {
									width: 80%;
									height: 90%;
									margin: 0 auto;
									border-bottom: 1px solid #cecece;
									padding: 0 5%;
									text-align: center;

									span {
										font-size: .16rem;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
