<template>
	<div class="banner">
		<div class="bannerTitle">
			<div class="bannerAvatar">
				<a-avatar :size="160" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
			</div>
			<p class="bannerName">姚贝娜</p>
			<div class="bannerTime">
				<p>出生：1981年09月26日 中国 武汉</p>
				<p>离世：2015年01月16日 中国 北京</p>
			</div>
			<div class="bannerMsg">
				她会变成天上那颗最耀眼的星星，照亮我们每个人的梦，飞过苍穹，穿越永恒。永远都不要忘了她，因为她是真正的天使。天堂会收下你的美，会让你在那里生活的更加幸福快乐。你的笑容，挥之不去。
				睡吧，睡吧。总有一天，你会醒来。
				时光不老，伊人不朽…
			</div>
			<div class="bannerBtn">
				纪念她
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		height: 880px;
		display: flex;
		justify-content: center;
		.bannerTitle {
			width: 768px;
			height: 613px;
			text-align: center;
			background: url("/img/pc/1line.png") no-repeat center center;
			background-size: 100% 100%;
			margin-top: 12%;
			position: relative;

			.bannerAvatar {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -80px;
				background: #fff;
				border-radius: 50%;
			}

			.bannerName {
				margin-top: 100px;
				font-size: 40px;
				font-weight: bold;
				line-height: 70px;
				letter-spacing: 1px;
				color: #ffffff;
			}

			.bannerTime {
				font-size: 20px;
				color: #ffffff;
				line-height: 10px;
			}

			.bannerMsg {
				width: 516px;
				height: 160px;
				font-size: 20px;
				line-height: 28px;
				color: #ffffff;
				margin-left: 100px;
				margin-top: 40px;
			}

			.bannerBtn {
				width: 220px;
				height: 50px;
				background-color: #00744c;
				border-radius: 25px;
				line-height: 50px;
				text-align: center;
				font-size: 28px;
				color: #ffffff;
				margin: 0 auto;
				margin-top: 30px;
				cursor: pointer;
			}

		}
	}
</style>
