<template>
	<div class="banner">
		<div class="bannerTitle">
			<div class="bannerAvatar">
				<a-avatar :size="160" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
			</div>
			<div class="bannerCreate">
				<a-avatar :size="50" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				<p class="bannerCreateName">创建者</p>
			</div>
			<p class="bannerName">夏雨田</p>
			<div class="bannerTime">
				<p>出生：1981年09月26日 中国 武汉</p>
				<p>离世：2015年01月16日 中国 北京</p>
			</div>
			<div class="bannerMsg">
				一级编剧。曾任中国曲协、湖北省文联副主席，省曲协、武汉市文联主席。1960年毕业于华中师范大学中文系。1961年到武汉市说唱团任相声演员、团长等职。1982年调武汉市文联，后任武汉市宣传部副部长、武汉市政协常委。1953年以来共发表诗歌、小说、散文、评论、剧本、曲艺作品约400余万字......
			</div>
			<div class="bannerBtn">
				纪念她
			</div>
			<div class="bannerTimes">
				已有<span>432</span>次纪念
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
		align-items: center;

		.bannerTitle {
			width: 831px;
			height: 613px;
			text-align: center;
			background: url("/img/pc/01line.png") no-repeat center center;
			background-size: 100% 100%;
			position: relative;

			.bannerAvatar {
				position: absolute;
				left: 50%;
				margin-left: -120px;
				top: -80px;
				background: #fff;
				border-radius: 50%;
			}

			.bannerCreate {
				display: flex;
				align-items: center;
				position: absolute;
				right: 130px;
				top: 50px;
				.bannerCreateName {
					font-size: 20px;
					color: #343437;
					margin-top: 20px;

				}
			}

			.bannerName {
				margin-top: 100px;
				font-size: 40px;
				margin-right: 80px;
				letter-spacing: 1px;
				color: #872121;
			}

			.bannerTime {
				font-size: 20px;
				line-height: 10px;
				color: #872121;
				margin-right: 80px;
			}

			.bannerMsg {
				width: 516px;
				height: 160px;
				font-size: 20px;
				line-height: 30px;
				letter-spacing: 1px;
				color: #872121;
				margin-left: 120px;
				margin-top: 40px;
			}

			.bannerBtn {
				width: 220px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				font-size: 28px;
				color: #343437;
				cursor: pointer;
				background-color: #f6f3f2;
				box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.24);
				border-radius: 25px;
				position: absolute;
				bottom: 10px;
				left: 50%;
				margin-left: -130px;
			}

			.bannerTimes {
				font-size: 26px;
				line-height: 28px;
				letter-spacing: 1px;
				color: #610a0a;
				position: absolute;
				bottom: -60px;
				left: 50%;
				margin-left: -120px;

				span {
					font-size: 40px;
					font-weight: bold;
				}
			}

		}
	}
</style>
