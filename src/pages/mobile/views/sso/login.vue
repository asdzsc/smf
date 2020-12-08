<template>
	<div style="padding-bottom: 0.5rem;">
		<div class="logo">
			<img src="/img/mobile/logo2.png" />
		</div>

		<div class="tabsCont">
			<div class="tabs">
				<div @click="acvtion = 'tab1'" :class="{'acvtion': acvtion === 'tab1'}" class="tabItem">
					短信登录
					<div class="line"></div>
				</div>
				<div @click="acvtion = 'tab2'" :class="{'acvtion': acvtion === 'tab2'}" class="tabItem">
					密码登录
					<div class="line"></div>
				</div>
			</div>
		</div>

		<!-- 手机号登录 -->
		<mobilelogin v-if="acvtion === 'tab1'"></mobilelogin>
		<!-- 帐号密码登录 -->
		<pwdlogin v-if="acvtion === 'tab2'"></pwdlogin>


		<loginfoot ref="loginfoot"></loginfoot>

	</div>
</template>

<script>
	export default {
		components: {
			mobilelogin: () => import("@/pages/mobile/views/sso/components/mobile-login.vue"),
			pwdlogin: () => import("@/pages/mobile/views/sso/components/pwd-login.vue"),
			loginfoot: () => import("@/pages/mobile/views/sso/components/login-foot.vue")
		},
		data() {
			return {
				acvtion: 'tab1'
			}
		},
		mounted() {},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.logo {
		text-align: center;
		padding: 0.4rem 0px;

		img {
			width: 1.76rem;
			height: 1.14rem;
		}
	}

	.tabsCont {
		padding-top: 0.76rem;
		margin: 0rem 0.3rem;
		border-bottom: 0.01rem solid #e0e0e0;

		.tabs {
			width: 5rem;
			margin: auto;
			display: flex;

			.tabItem {
				width: 2.5rem;
				text-align: center;
				font-size: 0.30rem;
				color: #999999;
				font-weight: 700;

				.line {
					display: none;
					width: 1rem;
					height: 3px;
					background-color: #004930;
					margin: auto;
					margin-top: 0.2rem;
				}

				&.acvtion {
					color: #004930;

					.line {
						display: block;
					}
				}
			}
		}
	}
</style>
