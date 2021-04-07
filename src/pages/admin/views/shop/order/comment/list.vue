<template>
	<a-card>
		<a-row>
			<a-col :span="24">
				<div class="operator">
					<a-row type="flex" justify="start">
						<a-col style="padding-right:10px;">
							<a-button @click="add()" type="primary" icon="plus">新增</a-button>
							&nbsp;
							<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
						</a-col>
						<a-col :span="5">
							<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
							 enterButton />
						</a-col>
					</a-row>
				</div>
				<div>
					<a-table size="middle" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="pagination"
					 :rowSelection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
					 :loading="loading" @change="onChange">

						<template slot="cont" slot-scope="record">
							<div class="fromCont">
								<a-row type="flex" class="fromRow">
									<a-col class="lable">订单号：</a-col>
									<a-col class="text"><a href="javascript:void(0)" @click="openOrderInfo(record)">{{ record.order_num }}</a></a-col>
								</a-row>
								<a-row type="flex" class="fromRow">
									<a-col class="lable">评论内容：</a-col>
									<a-col class="text" v-html="record.cont"></a-col>
								</a-row>
								<div v-if="record.imgList.length > 0" class="commentImgs">
									<a-row type="flex">
										<a-col v-for="(imgItem,index) in record.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, record.imgList)"
										 class="commentImgItem">
											<img :src="baseUrl + imgItem" />
										</a-col>
									</a-row>
								</div>
							</div>
						</template>
						<template slot="user" slot-scope="record">
							<div>{{ record.name }}</div>
						</template>
						<template slot="isShow" slot-scope="record">
							<a-switch checkedChildren="显示" unCheckedChildren="隐藏" :checked="record.is_show === '1' ? true : false" @change="setIsShow(record)" />
						</template>
						<template slot="action" slot-scope="record">
							<!-- <a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
							&nbsp; -->
							<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" />
						</template>
					</a-table>

				</div>
			</a-col>
		</a-row>


		<!-- 订单详情 -->
		<orderInfo v-if="showOrderInfo" :id="orderInfoId" ref="orderInfo" @onClose="orderInfoClose"></orderInfo>
		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>

	</a-card>
</template>

<script>
	import {
		orderCommentList,
		updateOrderCommentShow,
		delOrderComment
	} from "@/pages/admin/api/shop/order";

	export default {
		components: {
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
			orderInfo: () => import("@/pages/admin/views/shop/order/order-info")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					commentType: '1', //订单评论
					isPaging: true,
					searchText: "",
					current: 1,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				columns: [{
						title: "内容",
						dataIndex: "",
						scopedSlots: {
							customRender: "cont"
						}
					},
					{
						title: "用户",
						dataIndex: "",
						scopedSlots: {
							customRender: "user"
						},
						width: 250
					},
					{
						title: "是否显示",
						dataIndex: "",
						scopedSlots: {
							customRender: "isShow"
						},
						align: "center",
						width: 100
					},
					{
						title: "创建日期",
						dataIndex: "create_date",
						align: "center",
						width: 150
					},
					{
						title: "操作",
						dataIndex: "",
						width: 130,
						align: "center",
						scopedSlots: {
							customRender: "action"
						}
					}
				],
				showOrderInfo: false,
				orderInfoId: "",
				showImgModal: false
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			// eslint-disable-next-line no-unused-vars
			onChange(pagination, filters, sorter) {
				// console.log("params", pagination, filters, sorter);
				this.pagination = Object.assign(this.pagination, pagination);
				this.getList();
			},
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys;
			},
			onSearch() {
				this.pagination.current = 1;
				this.getList();
			},
			getList() {
				this.loading = true;
				this.selectedRowKeys = [];
				const pagination = { ...this.pagination
				};
				orderCommentList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						this.list.forEach(item => {
							if (item.img) {
								var imgList = item.img.split(',')
								this.$set(item, 'imgList', imgList)
							} else {
								this.$set(item, 'imgList', [])
							}
							item.cont = item.cont.replace(/\n/g, '<br>')
						})

						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
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
			//批量删除
			delAll() {
				this.del(this.selectedRowKeys);
			},
			del(list) {
				if (list.length === 0) {
					this.$notification.warning({
						message: "提示",
						description: "请选择需要删除的数据"
					});
					return;
				}
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						delOrderComment({
							ids: list
						}).then(res => {
							if (res.code === 0) {
								vm.onSearch();
							}
						});
					},
					onCancel() {}
				});
			},
			//查看订单详情
			openOrderInfo(item) {
				this.showOrderInfo = true;
				this.orderInfoId = item.order_id
			},
			orderInfoClose(res) {
				this.$nextTick(() => {
					this.showOrderInfo = false
				})
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
			}
		}
	};
</script>

<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
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
</style>
