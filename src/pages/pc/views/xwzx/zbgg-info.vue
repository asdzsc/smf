<template>
	<div class="newsInfo">
		<div class="cont">
			<div class="left">
				<div class="head">
					<div class="headTitle">招标广告</div>
				</div>
				<div class="line"></div>
				<div class="title">
					{{model.title}}
				</div>
				<div class="zbNo">
					（招标编号：{{ model.zbNo }}）
				</div>
				<div v-if="model.isCont === '0'" class="pdf">
					<pdf :src="getPdfFile(model.pdfFile)" :page="currentPage" @num-pages="pageCount=$event" @page-loaded="currentPage=$event"
					 @loaded="loadPdfHandler"></pdf>
				</div>
				<div v-if="model.isCont === '0'" class="pdfPage">
					<a-button @click="changePdfPage(0)" :disabled="currentPage <= 1" type="primary">
						上一页
					</a-button>
					<span style="padding: 0px 20px;">{{currentPage}} / {{pageCount}}</span>
					<a-button @click="changePdfPage(1)" :disabled="currentPage >= pageCount" type="primary">
						下一页
					</a-button>
				</div>

				<div v-else class="htmlContent" v-html="model.cont"></div>
			</div>
			<div class="right">
				<div class="head">
					<div class="headTitle">热门招标</div>
				</div>
				<div class="line"></div>
				<div class="listContent">
					<div v-for="(item,index) in pageHot.list" :key="item.id" @click="$router.push('/xwzx/zbggInfo?id='+item.id)" class="item">
						<div class="xh" :class="{'activity':index <= 2}">{{ (index + 1) }}</div>
						<div class="title">{{item.title}}</div>
					</div>
				</div>
			</div>

		</div>
		<myserve></myserve>
	</div>
</template>

<script>
	import pdf from 'vue-pdf'

	import {
		newsZbggList,
		newsZbggInfo
	} from "@/pages/pc/api/news";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			myserve: () => import("@/pages/pc/components/myserve.vue"),
			pdf
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				currentPage: 0, // pdf文件页码
				pageCount: 0, // pdf文件总页数
				model: {
					id: '',
					title: ''
				},
				pageHot: {
					"current": 1,
					"pageSize": 10,
					"searchText": "",
					"isHot": "true",
					list: []
				}
			};
		},
		mounted() {
			if (this.$route.query.id) {
				this.model.id = this.$route.query.id
			}
			this._newsZbggInfo()
			this._newsZbggList()
		},
		methods: {
			_newsZbggInfo() {
				if (this.model.id) {
					newsZbggInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
							utils.setTitle(this.model.title);
							this.loadPdfHandler()
						}
					});
				}
			},
			_newsZbggList() {
				newsZbggList(this.pageHot).then(res => {
					if (res.code === 0) {
						Object.assign(this.pageHot, res.data);
					}
				})
			},
			getPdfFile(filePath) {
				return this.baseUrl + "/readFile?fileName=" + filePath
			},
			// pdf加载时
			loadPdfHandler(e) {
				this.currentPage = 1 // 加载的时候先加载第一页
			},
			changePdfPage(val) {
				if (val === 0 && this.currentPage > 1) {
					this.currentPage--
				}
				if (val === 1 && this.currentPage < this.pageCount) {
					this.currentPage++
				}
			},
			parseTime(time, cFormat) {
				return utils.parseTime(time, cFormat);
			}
		}
	};
</script>

<style lang="less" scoped>
	.newsInfo {
		.cont {
			max-width: 1200px;
			margin: auto;
			display: flex;
			padding-top: 40px;

			.head {
				border-left: 4px solid #004930;
				height: 32px;

				.headTitle {
					padding-left: 15px;
					line-height: 32px;
					font-size: 18px;
					font-weight: 700;
					color: #999999;
				}
			}

			.line {
				margin-top: 5px;
				height: 2px;
				background-color: #d6d6d6;
			}

			.left {
				width: 880px;

				.title {
					margin-top: 50px;
					text-align: center;
					font-size: 28px;
					color: #004930;
					font-weight: 700;
				}

				.zbNo {
					padding-top: 25px;
					text-align: center;
					font-size: 18px;
					color: #666666;
				}

				.htmlContent {
					padding: 45px 0px;

					img {
						max-width: 100%;
					}
				}

				.pdf {
					margin-top: 45px;
					border: 1px solid #ededed;
				}

				.pdfPage {
					text-align: center;
					margin-bottom: 50px;
					margin-top: 20px;
				}
			}

			.right {
				flex: 1;
				padding-left: 80px;

				.listContent {
					margin-top: 35px;

					.item {
						display: flex;
						cursor: pointer;

						.xh {
							width: 24px;
							height: 24px;
							background-color: #e5e5e5;
							font-size: 16px;
							color: #333333;
							text-align: center;
							line-height: 24px;

							&.activity {
								background-color: #00744c;
								color: #FFFFFF;
							}
						}

						.title {
							flex: 1;
							padding-left: 10px;
							line-height: 24px;
							font-size: 16px;
							color: #333333;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							display: -webkit-box;
						}

						margin-top: 30px;
					}
				}
			}
		}
	}
</style>
