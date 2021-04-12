<template>
	<div class="orderAddress">
		<div class="title">
			<p>填写并核对订单信息</p>
			<div class="addAddress">
				<a href="/mobile/#/shop/order/addaddress">+新增服务墓址</a>
				<!-- <a @click="showAddressInfo">+新增服务墓址</a> -->
			</div>
		</div>
		<div class="serviceTitle">服务地址</div>
		<div class="serviceCont" v-for="item in list" :key="item.id">
			<div class="serviceName" @click="setCheck(item)" :class="{ check: item.check }">
				<p>{{ item.bpname }}</p>
				<div class="default">
					<div v-if="item.isCheck === '1'" class="defBtn">
						默认墓址
					</div>
					<div v-else @click="saveIsCheck(item)" class="defBtn2">
						设为默认
					</div>
<<<<<<< HEAD
					<span>{{ item.cemeaddress }}</span>
				</div>
			</div>
=======
					<span>{{item.cemeaddress}}</span>
				</div>
			</div>

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		</div>
		<div class="moreAddress" v-if="!finished" @click="_cemeteryList()">
			更多墓址
		</div>
		<van-empty v-if="list.length === 0" description="暂无数据" />
		<!-- <addAddress v-if="showInfo" ref="info" @onClose="closeInfo"></addAddress> -->
	</div>
</template>

<script>
	import {
		cemeteryList,
		saveCemetery
	} from "@/pages/mobile/api/user";

	export default {
		components: {
			// addAddress: () => import("@/pages/mobile/views/shop/order/add-address.vue")
		},
		data() {
			return {
				finished: false,
				model: {
					current: 0,
<<<<<<< HEAD
					pageSize: 3,
				},
				list: [],
				showInfo: false,
=======
					pageSize: 3
				},
				list: [],
				showInfo: false
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			};
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.finished = false;
				this.model.current = 0;
				this.list = [];
				this._cemeteryList();
			},
			_cemeteryList() {
				if (!this.finished) {
					this.model.current++;
<<<<<<< HEAD
					cemeteryList(this.model).then((res) => {
						if (res.code === 0) {
							res.data.list.forEach((x) => {
=======
					cemeteryList(this.model).then(res => {
						if (res.code === 0) {
							res.data.list.forEach(x => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
								if (x.isCheck === "1") {
									this.$set(x, "check", true);
								} else {
									this.$set(x, "check", false);
								}
								this.list.push(x);
							});
							if (res.data.isLastPage) {
								this.finished = true;
							}
						}
					});
				}
			},
			showAddressInfo() {
				this.showInfo = true;
			},
			closeInfo(res) {
				this.showInfo = false;
				if (res) {
					this.loadData();
				}
			},
			saveIsCheck(item) {
				item.isCheck = "1";
<<<<<<< HEAD
				saveCemetery(item).then((res) => {
					if (res.code === 0) {
						this.$notify({
							type: "success",
							message: "设置成功",
=======
				saveCemetery(item).then(res => {
					if (res.code === 0) {
						this.$notify({
							type: "success",
							message: "设置成功"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
						});
						this.loadData();
					} else {
						item.isCheck = "0";
					}
				});
			},
			setCheck(item) {
<<<<<<< HEAD
				this.list.forEach((x) => {
=======
				this.list.forEach(x => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
					x.check = false;
				});
				item.check = true;
			},
			//获取数据
			getData() {
<<<<<<< HEAD
				var query = this.list.filter((x) => x.check);
=======
				var query = this.list.filter(x => x.check);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
				if (query.length > 0) {
					return query[0];
				} else {
					this.$notify({
						type: "warning",
<<<<<<< HEAD
						message: "请选择服务墓址",
					});
					return null;
				}
			},
		},
	};
=======
						message: "请选择服务墓址"
					});
					return null;
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</script>

<style lang="less" scoped>
	.orderAddress {
<<<<<<< HEAD
		margin-top: 0.2rem;
=======
		margin-top: .2rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		background: #fff;
		padding: 0 4%;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
<<<<<<< HEAD
			padding-top: 0.35rem;

			p {
				font-size: 0.32rem;
=======
			padding-top: .35rem;

			p {
				font-size: .32rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
				color: #333333;
			}

			.addAddress {
<<<<<<< HEAD
				font-size: 0.28rem;
=======
				font-size: .28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

				a {
					color: #004930;
				}
			}
		}

		.serviceTitle {
<<<<<<< HEAD
			margin-top: 0.6rem;
			font-size: 0.28rem;
=======
			margin-top: .6rem;
			font-size: .28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
			font-weight: bold;
			color: #333333;
		}

		.serviceCont {
<<<<<<< HEAD
			margin-top: 0.3rem;

			&:last-child {
				padding-bottom: 0.3rem;
			}

			.serviceName {
				font-size: 0.28rem;
				box-sizing: border-box;
				padding: 0.2rem;
				color: #333333;

=======
			margin-top: .3rem;

			&:last-child {
				padding-bottom: .3rem;
			}

			.serviceName {
				font-size: .28rem;
				box-sizing: border-box;
				padding: 0.2rem;
				color: #333333;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
				&:hover {
					border: solid 2px #004930;
				}

				&.check {
					border: solid 2px #004930;

					.ok {
						display: block;
					}
				}

				.default {
<<<<<<< HEAD
					font-size: 0.24rem;
					display: flex;
					align-items: center;
					margin-top: 0.15rem;
=======
					font-size: .24rem;
					display: flex;
					align-items: center;
					margin-top: .15rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

					.defBtn {
						width: 70px;
						height: 24px;
						line-height: 24px;
						background-color: #ebebeb;
						text-align: center;
					}

					.defBtn2 {
						width: 70px;
						height: 24px;
						line-height: 24px;
						text-align: center;
						cursor: pointer;

						&:hover {
							color: #004930;
						}
					}

					span {
<<<<<<< HEAD
						margin-left: 0.3rem;
					}
				}
			}
		}

		.moreAddress {
			margin-top: 0.3rem;
			font-size: 0.26rem;
			line-height: 0.44rem;
			color: #999999;
			border-top: 1px solid #ccc;
			text-align: center;
			padding: 0.3rem 0;
=======
						margin-left: .3rem;
					}


				}
			}

		}

		.moreAddress {
			margin-top: .3rem;
			font-size: .26rem;
			line-height: .44rem;
			color: #999999;
			border-top: 1px solid #ccc;
			text-align: center;
			padding: .3rem 0;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		}
	}
</style>
