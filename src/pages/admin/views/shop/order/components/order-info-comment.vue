<template>
	<div style="padding-top: 30px;">
		<div class="modelTitle">
			订单评论
		</div>
		<div class="card">
			<a-row type="flex" class="cardCont">
				<a-col :span="12" style="border-right: 1px solid #ededed;">
					<a-divider orientation="left">
						客户评论
					</a-divider>
					<div v-if="shopOrder.isComment == '1'" class="goodsComment">
						<a-comment v-for="item in commentList1" :key="item.id">
							<div class="commentAuthor" slot="author">
								{{item.name}}<span class="commentDtime">{{ parseTime(item.create_date) }}</span>
								<a-rate :default-value="item.score" disabled />
							</div>
							<a-avatar :size="64" slot="avatar" :src="getAvatar(item.avatar)" />
							<div slot="content">
								<!-- <div class="goodsCont">
									2020年10月10日，购买了【标准套餐,18cm】 x 1
								</div> -->
								<div class="comment" v-html="item.cont">
								</div>
								<div v-if="item.imgList.length > 0" class="commentImgs">
									<a-row type="flex">
										<a-col v-for="(imgItem,index) in item.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, item.imgList)"
										 class="commentImgItem">
											<img :src="baseUrl + imgItem" />
										</a-col>
									</a-row>
								</div>
							</div>
							<a-row type="flex" justify="space-between">
								<a-col style="padding-right: 20px;">
									是否显示：
									<a-switch checkedChildren="显示" unCheckedChildren="隐藏" :checked="item.is_show === '1' ? true : false" @change="setIsShow(item)" />
								</a-col>
								<a-col>
									<a-button @click="delOrderComment(item.id)" type="danger">
										<a-icon type="delete" />删除评论
									</a-button>
								</a-col>
							</a-row>
						</a-comment>
						<a-empty v-if="commentList1.length === 0">
							<span slot="description">评论不存在或已删除</span>
						</a-empty>
					</div>
					<div v-else>
						<a-empty />
					</div>
				</a-col>
				<a-col :span="12">
					<a-divider orientation="left">
						服务人员反馈
					</a-divider>
					<div v-if="shopOrder.isFeedback == '1'" class="goodsComment">
						<a-comment v-for="item in commentList2" :key="item.id">
							<div class="commentAuthor" slot="author">
								{{item.name}}<span class="commentDtime">{{ parseTime(item.create_date) }}</span>
								<!-- <a-rate :default-value="item.score" disabled /> -->
							</div>
							<a-avatar :size="64" slot="avatar" :src="getAvatar(item.avatar)" />
							<div slot="content">
								<!-- <div class="goodsCont">
									2020年10月10日，购买了【标准套餐,18cm】 x 1
								</div> -->
								<div class="comment" v-html="item.cont">
								</div>
								<div v-if="item.imgList.length > 0" class="commentImgs">
									<a-row type="flex">
										<a-col v-for="(imgItem,index) in item.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, item.imgList)"
										 class="commentImgItem">
											<img :src="baseUrl + imgItem" />
										</a-col>
									</a-row>
								</div>
							</div>
							<a-row type="flex" justify="end">
								<a-col>
									<a-button @click="delOrderComment(item.id)" type="danger">
										<a-icon type="delete" />删除反馈
									</a-button>
								</a-col>
							</a-row>
						</a-comment>
						<a-empty v-if="commentList2.length === 0">
							<span slot="description">评论不存在或已删除</span>
						</a-empty>
					</div>
					<div v-else>
						<a-empty />
					</div>
				</a-col>
			</a-row>
		</div>

		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
	</div>
</template>

<script>
	import {
		delOrderComment,
		updateOrderCommentShow
	} from "@/pages/admin/api/shop/order";

	import * as utils from "@/pages/admin/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		components: {
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue")
		},
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				showImgModal: false
			}
		},
		watch: {
			// shopOrder: {
			// 	handler: function(val, oldval) {
			// 		console.log(this.shopOrder)
			// 	},
			// 	deep: true //对象内部的属性监听，也叫深度监听
			// }
		},
		computed: {
			commentList1() {
				return this.getCommentList('1')
			},
			commentList2() {
				return this.getCommentList('2')
			}
		},
		mounted() {

		},
		methods: {
			//返回评论列表
			getCommentList(commentType) {
				var list = this.shopOrder.commentList.filter(x => x.comment_type === commentType)
				return list
			},
			getAvatar(record) {
				if (record) {
					if (record.indexOf("http") >= 0) {
						return record;
					} else {
						return this.baseUrl + record;
					}
				} else {
					return "/img/admin/usernull.png";
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
			setIsShow(record) {
				this.$confirm({
					title: "确定要修改显示状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var isShow = record.is_show === "1" ? "0" : "1";
						updateOrderCommentShow({
							id: record.id,
							isShow: isShow
						}).then(
							res => {
								if (res.code === 0) {
									record.is_show = isShow;
								}
							}
						);
					},
					onCancel() {}
				});
			},
			//删除评论
			delOrderComment(nid) {
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						delOrderComment({
							ids: [nid]
						}).then(res => {
							if (res.code === 0) {
								vm.$emit('reload')
							}
						});
					},
					onCancel() {}
				});
			},
			parseTime(time) {
				if (time) {
					return utils.parseTime(time, "{y}-{m}-{d}");
				} else {
					return ''
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.modelTitle {
		height: 48px;
		background-color: #ebebeb;
		font-size: 16px;
		line-height: 48px;
		color: #333333;
		padding-left: 30px;
	}

	.card {
		border: solid 1px #ebebeb;
		margin-bottom: 10px;

		.cardCont {
			min-height: 200px;
		}

		.goodsComment {
			padding: 0px 10px;

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

			.comment {
				padding: 10px 0px;
			}

			.commentImgs {
				.commentImgItem {
					height: 100px;
					border: 1px solid #dddddd;
					cursor: pointer;
					margin-bottom: 10px;
					margin-right: 10px;

					img {
						max-width: 175px;
						height: 100px;
					}
				}
			}
		}

	}
</style>
