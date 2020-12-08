<template>
	<div>
		<memberTabs ref="memberTabs"></memberTabs>
		<div class="title">
			落葬人信息查询
		</div>

		<div class="form">
			<div class="formItem">
				<div class="label">
					购买人
				</div>
				<div class="inputCont">
					<input v-model="model.bpname" @change="_searchCemeteryList()" placeholder="填写购买人信息" />
				</div>
			</div>
			<div class="formItem">
				<div class="label">
					安葬者或合葬者
				</div>
				<div class="inputCont">
					<input v-model="model.mastername" placeholder="填写安葬者或合葬者信息" />
				</div>
			</div>
			<van-button @click="submit()" size="large" type="primary" color="#004930"><span style="color: #fff;">查询</span></van-button>
			<template>
				<div class="div"  v-if="modelList.length > 0" v-for="item in modelList" :key="item.id">
					<div class="divBox">
						<p class="color">购买人</p>
						<p class="width">{{item.bpname}}</p>
						<p class="color">安葬者</p>
						<p class="width">{{item.mastername}}</p>
					</div>
					<div class="divBox">
						<p class="color">逝世日期</p>
						<p class="width">{{item.recordtime.substring(0,10) }}</p>
						<p class="color">安葬日期</p>
						<p class="width">{{item.burytime.substring(0,10)}}</p>
					</div>
					<div class="divBoxArea">
						<p class="color">墓址</p>
						<p style="margin-left: .2rem;"> {{ item.cemeaddress }}</p>
					</div>
				</div>
				<div v-else>
					暂无数据
				</div>
			</template>

		</div>
		<div class="cartIcon" @click="openUrl('/shop/cart')">
			<van-icon size="0.4rem" color="#fff" name="shopping-cart-o" />
		</div>

	</div>
</template>

<script>
	import {
		searchCemeteryList
	} from "@/pages/mobile/api/user";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				title: "",
				loading: false, // 控制加载中的 loading 状态
				model: {
					id: "",
					bpname: "",
					cemeaddress: "",
					isCheck: "0",
					mastername: ""
				},
				modelList: []
			};
		},
		components: {
			memberTabs: () => import("@/pages/mobile/views/member/components/member-tabs.vue")
		},
		methods: {
			_searchCemeteryList() {
				if (this.model.bpname) {
					searchCemeteryList({
						current: 1,
						pageSize: 1,
						searchText: this.model.bpname
					}).then(res => {
						this.modelList = res.data.list;
						if (res.code === 0) {
							if (res.data.list.length > 0) {
								var info = res.data.list[0];
								this.model.mastername = info.mastername;
							}
						}
					});
				}
			},
			submit() {
				if (!this.model.bpname) {
					this.$notify({
						type: "warning",
						message: "填写购买人信息或安葬者或合葬者信息"
					});
				}
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
	.title {
		padding: 0rem 0.5rem;
		padding-top: 0.5rem;
		font-weight: 700;
		font-size: 0.36rem;
		color: #333333;
	}

	.cartIcon {
		width: .88rem;
		height: .64rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #303030;
		border-radius: 0px .10rem .10rem 0px;
	}

	.form {
		padding: 0.5rem;

		.div {
			margin-top: .5rem;

			.divBoxArea {
				display: flex;

				.color {
					background: #f5f5f5;
					color: #999999;
					width: 25%;
				}

				p {
					display: block;
					height: .80rem;
					text-align: center;
					line-height: .8rem;
				}
			}

			.divBox {
				display: flex;
				justify-content: space-between;

				p {
					display: block;
					height: .80rem;
					width: 25%;
					text-align: center;
					line-height: .8rem;
				}

				.color {
					background: #f5f5f5;
					color: #999999;
				}
			}
		}


		.formItem {
			padding-bottom: 0.3rem;

			.label {
				font-size: 0.22rem;
				font-weight: 700;
				color: #333333;
			}

			.inputCont {
				padding-top: 0.1rem;

				input {
					width: 6.1rem;
					height: 0.8rem;
					border: solid 0.02rem #e0e0e0;
					padding: 0rem 0.2rem;
					outline: none;
				}
			}

			.verifyCode {
				padding-top: 0.1rem;
				display: flex;

				input {
					flex: 1;
					height: 0.8rem;
					border: solid 0.02rem #e0e0e0;
					padding: 0rem 0.2rem;
					outline: none;
				}

				.codeImg {
					width: 1.6rem;
					height: 0.8rem;
					border: solid 1px #e0e0e0;
					border-left: 0px;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.smsCodeBtn {
					width: 1.6rem;
					height: 0.8rem;
					background-color: #004930;
					text-align: center;
					line-height: 0.8rem;
					font-size: 0.26rem;
					font-weight: normal;
					color: #ffffff;
					cursor: pointer;

					&.disabled {
						background-color: #b0b0b0;
						cursor: not-allowed;
					}
				}
			}
		}
	}
</style>
