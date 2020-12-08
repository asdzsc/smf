<template>
	<div class="member">
		<memberHead ref="memberHead" @search="search"></memberHead>
		<div class="cont">
			<div class="left">
				<memberLeft ref="memberLeft"></memberLeft>
			</div>
			<div class="line"></div>
			<div class="right">
				<div class="title">消息通知</div>
				<div class="card">
					<div class="title">
						<a-row>
							<a-col :span="12">
								系统消息
							</a-col>
							<a-col :span="12" class="btn">
								<span @click="setAllRead()" style="padding-right: 10px;">全部标为已读</span>|<span @click="delAll()" style="padding-left: 10px;">清空</span>
							</a-col>
						</a-row>
					</div>
					<a-spin tip="加载中..." :spinning="loading">
						<div v-for="item in model.list" :key="item.id" class="itemCont">
							<div class="dtime">
								{{ item.createDate }}
							</div>
							<div class="msgCont">
								<div class="msgTitle">
									{{ item.title }}
								</div>
								<div class="msgIntro" :class="{'read':(item.isRead === '1')}">
									{{ item.cont }}
								</div>
								<div @click="openUrl(item.url)" class="link">
									查看详情链接 >
								</div>
							</div>
						</div>
						
						<a-empty v-if="model.list.length === 0" />
					</a-spin>
				</div>
				
				<div style="padding-top: 30px;"></div>
				<paging ref="paging" @setPage="setPage"></paging>
			</div>
		</div>

		<myserve></myserve>

	</div>
</template>

<script>
	import {
		getSysMessageList,
		setSysMessageAllRead,
		delSysMessageAll
	} from '@/pages/pc/api/sysmessage'
	export default {
		components: {
			memberHead: () => import("@/pages/pc/views/member/components/member-head.vue"),
			memberLeft: () => import("@/pages/pc/views/member/components/member-left.vue"),
			paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				model: {
					current: "1",
					pageSize: "8",
					searchText: "",
					total: "0",
					list: []
				},
			}
		},
		mounted() {
			this._getList();
		},
		methods: {
			search(searchText) {
				this.model.current = 1;
				this.model.searchText = searchText;
				this._getList();
			},
			_getList() {
				var vm = this;
				this.loading = true;
				getSysMessageList(this.model).then(res => {
					vm.loading = false;
					if (res.code === 0) {
						Object.assign(vm.model, res.data);
						setTimeout(() => {
							vm.$refs.paging.setPageInfo(vm.model);
						}, 200);
					}
				});
			},
			setPage(pageNum) {
				this.model.current = pageNum;
				this._getList();
			},
			setAllRead() {
				var vm = this
				this.$confirm({
					title: "确认标记所有消息为已读吗?",
					content: "",
					onOk() {
						setSysMessageAllRead().then(res => {
							if (res.code === 0) {
								vm.$message.success("设置成功");
								vm.$store.commit("account/setSysMessageNum", 0);
								vm.setPage(1)
							}
						})
					},
					onCancel() {}
				});
			},
			delAll() {
				var vm = this
				this.$confirm({
					title: "确认清空所有消息吗?",
					content: "",
					onOk() {
						delSysMessageAll().then(res => {
							if (res.code === 0) {
								vm.$message.success("删除成功");
								vm.$store.commit("account/setSysMessageNum", 0);
								vm.setPage(1)
							}
						})
					},
					onCancel() {}
				});
			},
			openUrl(url) {
				if (url) {
					if (url.indexOf("http") >= 0) {
						window.location = url;
					} else {
						this.$router.push(url);
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.member {
		background-color: #f5f5f5;

		.cont {
			width: 1200px;
			margin: auto;
			margin-top: 10px;
			margin-bottom: 50px;
			display: flex;
			min-height: 600px;
			background-color: #ffffff;

			.line {
				border: solid 2px #f2f2f2;
			}

			.left {
				width: 125px;
			}

			.right {
				flex: auto;
				padding: 20px;
				padding-bottom: 80px;

				.title {
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					margin-bottom: 20px;
				}

				.card {
					border: solid 1px #ebebeb;
					padding-bottom: 30px;

					.title {
						height: 40px;
						background-color: #ebebeb;
						font-size: 16px;
						font-weight: bold;
						line-height: 40px;
						color: #333333;
						padding-left: 35px;
						padding-right: 35px;
						margin-bottom: 0px;

						.btn {
							font-size: 14px;
							color: #999999;
							font-weight: normal;
							cursor: pointer;
							text-align: right;
							span{
								&:hover{
									color: #006eff;
								}
							}
						}
					}

					.itemCont {
						padding: 30px 40px 0px;

						.dtime {
							text-align: center;
							font-size: 12px;
							color: #999999;
						}

						.msgCont {
							margin-top: 10px;
							background-color: #f8f8f8;
							padding: 20px;

							.msgTitle {
								font-size: 14px;
								color: #333333;
								padding-bottom: 10px;
								border-bottom: 1px solid #999999;
								font-weight: 700;
								margin-bottom: 20px;
							}

							.msgIntro {
								font-size: 14px;
								line-height: 25px;
								// color: #333333;
								color: #006eff;

								&.read {
									color: #888;
								}
							}

							.link {
								text-align: right;
								padding-top: 20px;
								font-size: 14px;
								color: #004930;
								cursor: pointer;
							}
						}

					}
				}
			}
		}
	}
</style>
