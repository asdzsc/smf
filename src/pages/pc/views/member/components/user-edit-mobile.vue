<template>
	<modal :title="title" @onClose="handleCancel" width="700px">
		<div class="cont">

			<a-steps :current="current" size="small">
				<a-step title="原手机号" />
				<a-step title="新手机号" />
			</a-steps>

			<div class="contInfo">
				<userMobileVerify1 v-if="current === 0" ref="userMobileVerify1"></userMobileVerify1>
				<userMobileVerify2 v-if="current === 1" ref="userMobileVerify2"></userMobileVerify2>
			</div>

			<div v-if="current === 0" @click="next()" class="btn">下一步</div>
			<div v-if="current === 1" @click="submit()" class="btn">保存</div>

		</div>
	</modal>
</template>

<script>
	import {
		verifySms
	} from '@/pages/pc/api/sso'
	import {
		updateMobile
	} from '@/pages/pc/api/user'
	export default {
		components: {
			modal: () => import("@/pages/pc/components/modal.vue"),
			userMobileVerify1: () => import("@/pages/pc/views/member/components/user-mobile-verify1.vue"),
			userMobileVerify2: () => import("@/pages/pc/views/member/components/user-mobile-verify2.vue")
		},
		data() {
			return {
				title: '编辑手机号',
				current: 0,
				model: {}
			}
		},
		mounted() {
			Object.assign(this.model, this.$store.state.account.user)
		},
		methods: {
			//下一步
			next() {
				var data = this.$refs.userMobileVerify1.getData();
				verifySms(data).then(res => {
					if (res.code === 0) {
						this.current = 1
					}
				})
			},
			submit() {
				var data = this.$refs.userMobileVerify2.getData();
				updateMobile(data).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.handleCancel(res);
					}
				})
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.cont {
		padding: 40px 80px;

		.contInfo {
			padding-top: 50px;
		}

		.btn {
			margin: auto;
			margin-top: 60px;
			width: 180px;
			height: 48px;
			background-color: #004930;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			line-height: 48px;
			color: #ffffff;
			cursor: pointer;
		}
	}
</style>
