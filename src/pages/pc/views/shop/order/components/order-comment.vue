<template>
	<modal title="订单评论" @onClose="handleCancel" width="840px">
		<div class="cont">
			<div class="fromCont">
				<a-row class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						订单号：
					</a-col>
					<a-col class="inputCont" style="line-height: 36px;">
						{{ model.orderNum }}
					</a-col>
				</a-row>
				<a-row class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						订单描述：
					</a-col>
					<a-col class="inputCont" style="line-height: 36px;">
						{{ model.orderSubject }}
					</a-col>
				</a-row>
				<a-row class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						评分：
					</a-col>
					<a-col class="inputCont">
						<a-rate v-model="model.score" />
					</a-col>
				</a-row>
				<a-row class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						评论：
					</a-col>
					<a-col class="inputCont">
						<a-textarea v-model="model.cont" placeholder="评论内容..." style="width: 500px; height: 115px;" :maxLength="200" />
					</a-col>
				</a-row>
				<div>
					<imgsUpload ref="imgsUpload"></imgsUpload>
				</div>

			</div>

			<div @click="submit()" class="btn" :class="{ loading: isSubmit }">
				<a-icon v-if="isSubmit" type="loading" spin />
				提交评论
			</div>

		</div>
	</modal>
</template>

<script>
	import {
		saveOrderComment
	} from '@/pages/pc/api/shop'
	export default {
		components: {
			modal: () => import("@/pages/pc/components/modal.vue"),
			imgsUpload: () => import("@/pages/pc/components/upload/imgs-upload"),
		},
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/usernull.png'`,
				model: {
					id: '',
					orderId: '',
					orderNum: '',
					orderSubject: '',
					commentType: '1',
					pid: '0',
					img: [],
					cont: '',
					score: 0
				},
				isSubmit: false
			};
		},
		mounted() {
			this.model.orderId = this.shopOrder.id
			this.model.orderNum = this.shopOrder.orderNum
			this.model.orderSubject = this.shopOrder.orderSubject
		},
		methods: {
			submit() {
				this.isSubmit = true
				var fileList = this.$refs.imgsUpload.getFileList();
				this.model.img = fileList.map(x => {
					return x.imgUrl;
				});
				saveOrderComment(this.model).then(res => {
					this.isSubmit = false
					if (res.code === 0) {
						this.$message.success("评论提交成功");
						this.handleCancel(res)
					}
				})
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.cont {
		padding: 40px 80px;

		.btn {
			margin: auto;
			margin-top: 30px;
			width: 180px;
			height: 48px;
			background-color: #004930;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			line-height: 48px;
			color: #ffffff;
			cursor: pointer;

			&.loading {
				opacity: 0.7;
				cursor: no-drop;
			}
		}
	}
</style>
