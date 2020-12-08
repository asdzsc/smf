<template>
	<div class="goodsComment">
		<a-comment v-for="item in model.list" :key="item.id">
			<div class="commentAuthor" slot="author">
				{{ item.name }}<span class="commentDtime">{{ parseTime(item.create_date) }}</span>
				<a-rate :default-value="item.score" disabled />
			</div>
			<a-avatar :size="64" slot="avatar" :src="getAvatar(item.avatar)" />
			<div slot="content">
				<div class="goodsCont">
					{{ item.goods_cont }}
				</div>
				<div class="comment" v-html="item.cont">
				</div>
				<div class="commentImgs">
					
					<a-row type="flex">
						<a-col v-for="(imgItem,index) in item.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, item.imgList)"
						 class="commentImgItem">
							<img :src="baseUrl + imgItem" />
						</a-col>
					</a-row>
					
				</div>
			</div>
		</a-comment>
		
		<a-empty v-if="model.list.length === 0" />
		
		<div style="padding-top: 30px;"></div>
		<paging ref="paging" @setPage="setPage"></paging>

		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
	</div>
</template>

<script>
	import {
		orderCommentList
	} from '@/pages/pc/api/shop'
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			showImg: () => import("@/pages/pc/components/show-img.vue"),
			paging: () => import("@/pages/pc/views/xwzx/components/paging.vue")
		},
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
						setTimeout(() => {
							vm.$refs.paging.setPageInfo(vm.model);
						}, 200);
					}
				})
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
						this.$refs.showImg.loadData(imgUrl, imgList);
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
		padding: 20px;

		/deep/ .ant-comment-avatar {
			img {
				width: 64px;
				height: 64px;
			}
		}

		.commentAuthor {
			font-size: 16px;
			font-weight: 700;
			color: #333333;

			.commentDtime {
				font-size: 14px;
				font-weight: normal;
				color: #a9a9a9;
				padding-left: 10px;
				padding-right: 30px;
			}
		}

		.goodsCont {
			font-size: 14px;
			color: #a9a9a9;
			padding: 10px 0px;
		}

		.commentImgs {
			margin-top: 20px;

			.commentImgItem {
				height: 145px;
				border: 1px solid #dddddd;
				text-align: center;
				cursor: pointer;
				margin-bottom: 10px;
				margin-right: 10px;

				img {
					max-width: 220px;
					height: 145px;
				}
			}
		}
	}
</style>
