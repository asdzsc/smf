<template>
	<modal :title="title" @onClose="handleCancel" width="840px">
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
						服务人员：
					</a-col>
					<a-col class="inputCont" style="line-height: 36px; display: flex;">
						<div style="width: 100px;">
							{{ model.name }}
						</div>
						<div>
							<a-button @click="selServeUser()" type="primary" size="small" icon="edit">
								选择服务人员
							</a-button>
						</div>
					</a-col>
				</a-row>
				<a-row v-if="model.commentType === '1'" class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						评分：
					</a-col>
					<a-col class="inputCont">
						<a-rate v-model="model.score" />
					</a-col>
				</a-row>
				<a-row class="fromRow" type="flex">
					<a-col flex="80px" class="lable">
						{{ model.commentType === '1' ? '评论' : '反馈' }}：
					</a-col>
					<a-col class="inputCont">
						<a-textarea v-model="model.cont" :placeholder="model.commentType === '1' ? '评论内容...' : '反馈内容...'" style="width: 500px; height: 115px;"
						 :maxLength="200" />
					</a-col>
				</a-row>
				<div>
					<imgsUpload ref="imgsUpload"></imgsUpload>
				</div>
			</div>

			<div @click="submit()" class="btn" :class="{ loading: isSubmit }">
				<a-icon v-if="isSubmit" type="loading" spin />
				{{ model.commentType === '1' ? '提交评论' : '提交反馈' }}
			</div>
		</div>

		<!-- 选择服务人员 -->
		<userModel ref="userModel" deptType="1" :multiple="false" :showUser="true" userType="3" @return="getServeUserList"></userModel>

	</modal>
</template>

<script>
	import {
		saveOrderComment
	} from "@/pages/admin/api/shop/order";
	export default {
		components: {
			modal: () => import("@/pages/admin/components/modal/index.vue"),
			imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
			userModel: () => import("@/pages/admin/components/user-model/index")
		},
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {};
				},
			},
			commentType: {
				type: String,
				default () {
					return "";
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/usernull.png'`,
				title: '',
				model: {
					id: "",
					orderId: "",
					orderNum: "",
					orderSubject: "",
					commentType: "1",
					pid: "0",
					userid: '',
					name: '',
					avatar: '',
					img: [],
					cont: "",
					score: 0,
				},
				isSubmit: false,
			};
		},
		mounted() {
			this.model.orderId = this.shopOrder.id;
			this.model.orderNum = this.shopOrder.orderNum;
			this.model.orderSubject = this.shopOrder.orderSubject;
			this.model.commentType = this.commentType;
			if (this.model.commentType === '1') {
				this.title = '订单评论';
			} else if (this.model.commentType === '2') {
				this.title = '服务反馈';
			}
		},
		methods: {
			//选择服务人员
			selServeUser() {
				var checkedList = []
				if(this.model.userid){
					var ckItem = {
						id: this.model.userid,
						treeType: 'user',
						title: this.model.name
					}
					checkedList.push(ckItem)
				}
				this.$refs.userModel.loadData(checkedList)
			},
			getServeUserList(list) {
				if(list.length > 0){
					this.model.userid = list[0].id
					this.model.name = list[0].name
				}
			},
			submit() {
				this.isSubmit = true;
				var fileList = this.$refs.imgsUpload.getFileList();
				this.model.img = fileList.map((x) => {
					return x.imgUrl;
				});
				saveOrderComment(this.model).then((res) => {
					this.isSubmit = false;
					if (res.code === 0) {
						this.$message.success("评论提交成功");
						this.handleCancel(res);
					}
				});
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			},
		},
	};
</script>

<style lang="less" scoped>
	.fromCont {
		.fromRow {
			margin-bottom: 20px;

			.lable {
				line-height: 36px;
				text-align: right;
			}

			.inputCont {
				padding-right: 20px;
			}

			&:last-child {
				margin-bottom: 0px;
			}
		}
	}

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
