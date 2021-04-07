<template>
	<div style="min-height:100%">
		<myhead></myhead>
		<div class="login">
			<img class="loginBgImg left" src="/img/login-left.jpg" />
			<img class="loginBgImg right" src="/img/login-right.jpg" />
			<div class="loginCont">
				<div class="title">
					用户登录
				</div>
				<div class="tabsCont">
					<div class="tabs">
						<div @click="acvtion = 'tab1'" :class="{'acvtion': acvtion === 'tab1'}" class="tabItem">
							手机号登录
						</div>
						<div @click="acvtion = 'tab2'" :class="{'acvtion': acvtion === 'tab2'}" class="tabItem">
							密码登录
						</div>
					</div>
				</div>
				<div class="operation">
					<span>没有账号？</span><a href="/#/register">立即免费注册></a>
				</div>
				<!-- 手机号登录 -->
				<mobilelogin v-if="acvtion === 'tab1'"></mobilelogin>
				<!-- 帐号密码登录 -->
				<pwdlogin v-if="acvtion === 'tab2'"></pwdlogin>

				<morelogin ref="morelogin"></morelogin>

			</div>

			<loginfoot></loginfoot>
		</div>
	</div>
</template>

<script>
	import {
		sendSms
	} from '@/pages/pc/api/sso'
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			myhead: () => import("@/pages/pc/components/myhead.vue"),
			mobilelogin: () => import("@/pages/pc/views/sso/components/mobile-login.vue"),
			pwdlogin: () => import("@/pages/pc/views/sso/components/pwd-login.vue"),
			morelogin: () => import("@/pages/pc/views/sso/components/more-login.vue"),
			loginfoot: () => import("@/pages/pc/views/sso/components/loginfoot.vue")
		},
		data() {
			return {
				acvtion: 'tab1'
			}
		},
		mounted() {},
		beforeDestroy() {},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.login {
		position: relative;
		min-height: 888px;

		.loginBgImg {
			position: absolute;
			top: 15px;
			z-index: -1;

			&.left {
				left: 15px;
			}

			&.right {
				right: 15px;
			}
		}

		.loginCont {
			width: 1200px;
			margin: auto;

			.title {
				padding-top: 45px;
				padding-left: 200px;
				font-size: 24px;
				font-weight: 700;
				line-height: 20px;
				color: #333333;
			}

			.tabsCont {
				border-bottom: 1px solid #e0e0e0;
				margin-top: 30px;

				.tabs {
					width: 300px;
					margin: auto;
					display: flex;

					.tabItem {
						width: 100px;
						text-align: center;
						font-size: 16px;
						font-weight: 700;
						line-height: 20px;
						color: #999999;
						margin-right: 100px;
						padding-bottom: 10px;
						cursor: pointer;

						&.acvtion {
							color: #004930;
							border-bottom: 3px solid #004930;
						}

						&:last-child {
							margin-right: 0px;
						}
					}
				}
			}

			.operation {
				text-align: right;
				padding-top: 20px;

				span {
					font-size: 16px;
					font-weight: normal;
					color: #666666;
				}

				a {
					font-size: 16px;
					font-weight: normal;
					color: #004930;
				}
			}

		}


	}
</style>
