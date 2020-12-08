<template>
	<div class="loginFoot">
		<div class="footMenu">
			<div class="menuItem">关于我们</div>
			<div class="line"></div>
			<div class="menuItem">公司新闻</div>
			<div class="line"></div>
			<div class="menuItem">在线服务</div>
			<div class="line"></div>
			<div class="menuItem">博物馆群</div>
			<div class="line"></div>
			<div class="menuItem">纪念园区</div>
		</div>
		<div class="copyright">
			©2019<span style="padding:0 5px;"></span>武汉石门峰纪念公园有限公司<span style="padding:0 5px;"></span>版权所有<span style="padding:0 20px;"></span>鄂公网安备
			42018502001747号
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.loginFoot {
		width: 1200px;
		margin: auto;
		border-top: 1px solid #e0e0e0;
		margin-top: 70px;

		.footMenu {
			margin-top: 20px;
			display: flex;
			justify-content: center;

			.menuItem {
				font-size: 14px;
				color: #999999;
				line-height: 15px;
			}

			.line {
				height: 15px;
				width: 1px;
				background-color: #999999;
				margin: 0px 15px;
			}
		}

		.copyright {
			margin-top: 50px;
			margin-bottom: 20px;
			text-align: center;
			font-size: 12px;
			line-height: 30px;
			color: #999999;
		}
	}
</style>
