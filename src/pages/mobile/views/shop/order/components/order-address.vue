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
					<span>{{item.cemeaddress}}</span>
				</div>
			</div>

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
					pageSize: 3
				},
				list: [],
				showInfo: false
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
					cemeteryList(this.model).then(res => {
						if (res.code === 0) {
							res.data.list.forEach(x => {
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
				saveCemetery(item).then(res => {
					if (res.code === 0) {
						this.$notify({
							type: "success",
							message: "设置成功"
						});
						this.loadData();
					} else {
						item.isCheck = "0";
					}
				});
			},
			setCheck(item) {
				this.list.forEach(x => {
					x.check = false;
				});
				item.check = true;
			},
			//获取数据
			getData() {
				var query = this.list.filter(x => x.check);
				if (query.length > 0) {
					return query[0];
				} else {
					this.$notify({
						type: "warning",
						message: "请选择服务墓址"
					});
					return null;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderAddress {
		margin-top: .2rem;
		background: #fff;
		padding: 0 4%;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: .35rem;

			p {
				font-size: .32rem;
				color: #333333;
			}

			.addAddress {
				font-size: .28rem;

				a {
					color: #004930;
				}
			}
		}

		.serviceTitle {
			margin-top: .6rem;
			font-size: .28rem;
			font-weight: bold;
			color: #333333;
		}

		.serviceCont {
			margin-top: .3rem;

			&:last-child {
				padding-bottom: .3rem;
			}

			.serviceName {
				font-size: .28rem;
				box-sizing: border-box;
				padding: 0.2rem;
				color: #333333;
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
					font-size: .24rem;
					display: flex;
					align-items: center;
					margin-top: .15rem;

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
		}
	}
</style>
