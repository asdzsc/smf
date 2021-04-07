<template>
	<div class="cont">
		<div class="title">
			<p>新增服务墓址</p>
			<van-icon @click="handleCancel" name="cross" />
		</div>
		<div class="input">
			<span>落葬人:</span>
			<input v-model="model.bpname" @change="_searchCemeteryList()" placeholder="请输入落葬人姓名" />
		</div>
		<div class="input">
			<span>墓&nbsp;&nbsp;&nbsp;&nbsp;址:</span>
			<input v-model="model.cemeaddress" style="margin-left: .2rem;" placeholder="请输入墓址" />
		</div>
		<div @click="submit()" class="btn">保存服务墓址</div>
	</div>
</template>

<script>
	import {
		searchCemeteryList,
		getCemeteryInfo,
		saveCemetery
	} from "@/pages/mobile/api/user";
	export default {
		components: {
			modal: () => import("@/pages/mobile/components/modal.vue")
		},
		props: {
			id: {
				type: String,
				default () {
					return "";
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				title: "",
				model: {
					id: "",
					bpname: "",
					cemeaddress: "",
					isCheck: "0"
				}
			};
		},
		mounted() {
			this.model.id = this.id;
			this.loadData();
		},
		methods: {
			loadData() {
				if (!this.model.id) {
					this.title = "新增服务墓址";
				} else {
					this.title = "编辑服务墓址";
					getCemeteryInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
						}
					});
				}
			},
			_searchCemeteryList() {
				if (this.model.bpname) {
					searchCemeteryList({
						current: 1,
						pageSize: 1,
						searchText: this.model.bpname
					}).then(res => {
						if (res.code === 0) {
							if (res.data.data.length > 0) {
								var info = res.data.data[0];
								this.model.cemeaddress = info.cemetery;
							}
						}
					});
				}
			},
			submit() {
				saveCemetery(this.model).then(res => {
					if (res.code === 0) {
						this.$notify({
						  type: "success",
						  message: "设置成功"
						});
						this.handleCancel(res);
					}
				});
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.cont {
		padding: .40rem .8rem;
		box-sizing: border-box;
		position: absolute;
		top: 35%;
		left: 8%;
		z-index: 1;
		background: rgba(0,0,0,0.7);
		.title {
			display: flex;
			justify-content: space-between;
			height: .5rem;
			line-height: .5rem;
			align-items: center;
			background: #f3f3f3;
			color: #999;
		}

		.input {
			margin-top: .2rem;
			span {
				margin-right: .2rem;
				color:#fff;
			}
		}

		.btn {
			margin: auto;
			margin-top: .60rem;
			width: 1.80rem;
			height: .48rem;
			background-color: #004930;
			text-align: center;
			font-size: .16rem;
			font-weight: 700;
			line-height: .48rem;
			color: #ffffff;
		}
	}
</style>
