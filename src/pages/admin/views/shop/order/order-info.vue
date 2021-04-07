<template>
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-row type="flex" class="orderInfo">
			<a-col :span="12" style="border-right: 1px solid #ededed;">
				<div class="title">订单信息</div>
				<div style="padding-left:20px; padding-top: 20px;">
					<table class="orderInfoCont">
						<tr>
							<td class="lable">订单编号：</td>
							<td class="text">{{ model.orderNum }}</td>
						</tr>
						<tr>
							<td class="lable">订单状态：</td>
							<td class="text">
								<a-tag style="width:80px; text-align: center;" :color="orderStatusText(model.orderStatus).color">
									{{ orderStatusText(model.orderStatus).text }}
								</a-tag>
								<a-button @click="selOrderStauts()" type="primary" size="small" icon="edit">
									编辑状态
								</a-button>
							</td>
						</tr>
						<tr>
							<td class="lable">联系人：</td>
							<td class="text">{{ model.contacts }}</td>
						</tr>
						<tr>
							<td class="lable">联系电话：</td>
							<td class="text">{{ model.mobile }}</td>
						</tr>
						<tr>
							<td class="lable">服务时间：</td>
							<td class="text">{{ parseTime(model.serveTime) }}</td>
						</tr>
						<tr>
							<td class="lable">服务方式：</td>
							<td class="text">{{ model.serveType }}</td>
						</tr>
						<tr>
							<td class="lable">服务墓主：</td>
							<td class="text">{{ model.bpname }}</td>
						</tr>
						<tr>
							<td class="lable">服务墓址：</td>
							<td class="text">{{ model.cemeaddress }}</td>
						</tr>
						<tr>
							<td class="lable">其他需求：</td>
							<td class="text">{{ model.remark }}</td>
						</tr>
					</table>
				</div>
			</a-col>
			<a-col :span="12" style="padding-left:20px">
				<div class="title">服务人员</div>
				<div style="padding-left:20px; padding-top: 20px;">
					<div>
						<a-button @click="selServePrincipal()" type="primary" size="small" icon="edit" style="margin-right: 20px;">
							选择负责人
						</a-button>
						<a-button @click="selServeUser()" type="primary" size="small" icon="edit">
							选择服务人员
						</a-button>
					</div>
					<a-divider orientation="left">
						服务部门
					</a-divider>
					<table class="orderInfoCont">
						<tr>
							<td class="lable">服务部门：</td>
							<td class="text">{{ model.serveDeptname }}</td>
							<td class="lable">部门负责人：</td>
							<td class="text">{{ model.servePrincipalInfo.name }}</td>
							<td class="lable">联系电话：</td>
							<td class="text">{{ model.servePrincipalInfo.mobile }}</td>
						</tr>
					</table>
					<a-divider orientation="left">
						服务人员
					</a-divider>
					<table v-if="model.serveUserList.length > 0" class="orderInfoCont">
						<template v-for="item in model.serveUserList">
							<tr :key="item.id">
								<td class="lable">服务人员：</td>
								<td class="text">{{ item.name }}</td>
								<td class="lable">联系电话：</td>
								<td class="text">{{ item.mobile }}</td>
							</tr>
						</template>
					</table>
					<div v-if="model.serveUserList.length === 0">
						未选择服务人员
					</div>

				</div>
			</a-col>
		</a-row>
		<!-- 订单商品 -->
		<orderInfoGoodsList ref="orderInfoGoodsList" :shopOrder="model"></orderInfoGoodsList>
		<!-- 订单日志 -->
		<orderInfoLogList ref="orderInfoLogList" :shopOrder="model"></orderInfoLogList>
		<!-- 订单评论/反馈 -->
		<orderInfoComment ref="orderInfoComment" :shopOrder="model" @reload="_orderCommentList()"></orderInfoComment>

		<!-- 选择订单状态 -->
		<orderInfoStauts v-if="showOrderStauts" :shopOrder="model" ref="orderInfoStauts" @onClose="orderStautsClose"></orderInfoStauts>
		<!-- 选择服务部门 -->
		<userModel ref="deptModel" deptType="1" :multiple="false" :showUser="false" userType="3" @return="getServeDept"></userModel>
		<!-- 选择服务人员 -->
		<userModel ref="userModel" deptType="1" :multiple="true" :showUser="true" userType="3" @return="getServeUserList"></userModel>

	</a-drawer>

</template>

<script>
	import {
		getOrderInfo,
		orderLogList,
		orderCommentList,
		updateOrderServePrincipal,
		updateOrderServeUsers
	} from "@/pages/admin/api/shop/order";
	import * as utils from "@/pages/admin/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		components: {
			orderInfoGoodsList: () => import("@/pages/admin/views/shop/order/components/order-info-goodsList"),
			orderInfoLogList: () => import("@/pages/admin/views/shop/order/components/order-info-logList"),
			orderInfoComment: () => import("@/pages/admin/views/shop/order/components/order-info-comment"),
			orderInfoStauts: () => import("@/pages/admin/views/shop/order/components/order-info-stauts"),
			userModel: () => import("@/pages/admin/components/user-model/index")
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				visible: false,
				title: "订单详情",
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				model: {
					id: '',
					isComment: '0',
					isFeedback: '0',
					orderStatus: '',
					serveTime: '',
					serveDeptid: '',
					serveDeptname: '',
					servePrincipal: '',
					servePrincipalInfo: {},
					serveUsers: [],
					serveUserList: [],
					goodsList: [],
					logList: [],
					commentList: []
				},
				showOrderStauts: false,
				isUpdate: false //数据是否更新
			}
		},
		mounted() {
			this.visible = true;
			this.loadData()
		},
		methods: {
			loadData() {
				if (this.id) {
					getOrderInfo({
						id: this.id
					}).then(res => {
						if (res.code === 0) {
							this.assignModel(res.data)
							//加载订单日志
							this._orderLogList()
							//加载评论日志
							this._orderCommentList()
						}
					})
				} else {
					this.$notification.error({
						message: "提示",
						description: "订单参数错误"
					});
					this.onClose()
				}
			},
			//赋值订单实体
			assignModel(data) {
				Object.assign(this.model, data)
				if (!this.model.servePrincipalInfo) {
					this.model.servePrincipalInfo = {}
				}
				if (!this.model.serveUserList) {
					this.model.serveUserList = []
				}
			},
			//订单日志
			_orderLogList() {
				orderLogList({
					id: this.model.id
				}).then(res => {
					if (res.code === 0) {
						this.$set(this.model, 'logList', res.data)
					}
				})
			},
			//用户评论
			_orderCommentList() {
				orderCommentList({
					id: this.model.id,
					commentType: '', //评论类型
					isUser: false,
					isPaging: false
				}).then(res => {
					if (res.code === 0) {
						this.model.commentList = res.data
						this.model.commentList.forEach(item => {
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
			orderStatusText(status) {
				return shop.orderStatusText(status);
			},
			parseTime(time) {
				if (time) {
					return utils.parseTime(time, "{y}-{m}-{d}");
				} else {
					return ''
				}
			},
			//选择订单状态
			selOrderStauts() {
				this.showOrderStauts = true;
			},
			orderStautsClose(res) {
				this.$nextTick(() => {
					this.showOrderStauts = false;
				});
				if (res.code === 0) {
					this.model.orderStatus = res.data.orderStatus
					this.isUpdate = true
				}
			},
			//选择负责人
			selServePrincipal() {
				var checkedList = []
				if (this.model.serveDeptid) {
					var ckItem = {
						id: this.model.serveDeptid,
						treeType: 'dept',
						title: this.model.serveDeptname
					}
					checkedList.push(ckItem)
				}
				this.$refs.deptModel.loadData(checkedList)
			},
			//服务部门
			getServeDept(list) {
				var serveDeptid = ''
				if (list.length > 0) {
					serveDeptid = list[0].id
				}
				updateOrderServePrincipal({
					id: this.model.id,
					serveDeptid: serveDeptid
				}).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.assignModel(res.data)
					}
				})
			},
			//选择服务人员
			selServeUser() {
				var checkedList = []
				this.model.serveUserList.forEach(x => {
					var ckItem = {
						id: x.id,
						treeType: 'user',
						title: x.name
					}
					checkedList.push(ckItem)
				})
				this.$refs.userModel.loadData(checkedList)
			},
			getServeUserList(list) {
				var ulist = list.map(x => {
					return x.id
				})
				updateOrderServeUsers({
					id: this.model.id,
					serveUsers: ulist
				}).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.assignModel(res.data)
					}
				})
			},
			onClose(res) {
				this.visible = false;
				console.log(res)
				if (this.isUpdate) {
					res = {
						code: 0
					}
				}
				this.$emit("onClose", res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderInfo {
		height: 300px;

		.title {
			font-size: 16px;
			font-weight: bold;
		}

		.orderInfoCont {
			width: 100%;
			border-collapse: collapse;

			.lable {
				width: 90px;
				font-size: 14px;
				color: #333333;
				line-height: 25px;
			}

			.text {
				font-size: 14px;
				color: #666666;
			}
		}
	}
</style>
