<template>
	<div>

		<div class="steps">
			<van-steps :active="current" active-color="#004930">
				<van-step>原手机号</van-step>
				<van-step>新手机号</van-step>
			</van-steps>
		</div>

		<userMobileVerify1 v-if="current === 0" ref="userMobileVerify1"></userMobileVerify1>
		<userMobileVerify2 v-if="current === 1" ref="userMobileVerify2"></userMobileVerify2>

		<div class="loginBtnCont">
			<div v-if="current === 0" @click="next()" class="loginBtn">
				下一步
			</div>
			<div v-if="current === 1" @click="submit()" class="loginBtn">
				保 存
			</div>
		</div>

		<div class="page-line"></div>

	</div>
</template>

<script>
	import {
		verifySms
	} from '@/pages/mobile/api/sso'
	import {
		updateMobile
	} from '@/pages/mobile/api/user'

	export default {
		components: {
			userMobileVerify1: () => import("@/pages/mobile/views/member/components/user-mobile-verify1.vue"),
			userMobileVerify2: () => import("@/pages/mobile/views/member/components/user-mobile-verify2.vue")
		},
		data() {
			return {
				current: 0,
				model: {}
			}
		},
		mounted() {},
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
						this.$notify({
							type: 'success',
							message: '数据提交成功'
						});
						//更新用户资料
						this.$store.commit("account/setUser", res.data)
						this.$router.push("/member/userInfo")
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-line {
		padding-bottom: 0.2rem;
		background-color: #F5F5F5;
	}

	.steps {
		padding: 0.5rem;
	}


	.loginBtnCont {
		padding: 0.5rem;
		padding-top: 0rem;

		.loginBtn {
			margin: auto;
			width: 100%;
			height: 0.8rem;
			background-color: #004930;
			text-align: center;
			line-height: 0.8rem;
			font-size: 0.28rem;
			font-weight: 700;
			color: #ffffff;
			cursor: pointer;
		}

		.recoverPwd {
			margin-top: 0.3rem;

		}
	}
</style>
