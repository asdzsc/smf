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
				在1938年武汉“4．29空战”中，陈怀民的战机在击落一架敌机后受到5架敌机围攻，他的飞机油箱着火。当时他本可跳伞求生，但他猛拉操纵杆，战机拖着浓浓的黑烟，向上翻转了180度，撞向从后面扑来的敌机，与日本吹嘘的所谓“红武士”高桥宪一同归于尽。
			</div>
			<div class="bannerTimes">
				已有<span>432</span>次纪念
			</div>
			<div class="bannerBtn">
				纪念她
				<img src="/img/pc/09_btn.png" alt="">
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
		height: 860px;
		display: flex;
		justify-content: center;
		align-items: center;

		.bannerTitle {
			  	width: 694px;

			text-align: center;
			position: relative;

			.bannerAvatar {
				position: absolute;
				left: 50%;
				top: 50px;
				margin-left: -80px;
				background: #fff;
				border-radius: 50%;
			}

			.bannerCreate {
				display: flex;
				align-items: center;
				position: absolute;
				right: 50px;
				top: 50px;

				.bannerCreateName {
					font-size: 20px;
					color: #865647;
					margin-top: 20px;

				}
			}

			.bannerName {
				margin-top: 220px;
				font-size: 40px;
				letter-spacing: 1px;
				color: #865647;
				font-weight: bold;
			}

			.bannerTime {
				font-size: 20px;
				line-height: 10px;
				color: #865647;
			}

			.bannerMsg {
				width: 610px;
				height: 160px;
				font-size: 20px;
				line-height: 30px;
				color: #865647;
				margin: 0 auto;
			}

			.bannerBtn {
				width: 298px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				margin: 0 auto;
				margin-top: 50px;
				font-size: 28px;
				color: #343437;
				cursor: pointer;
				background-color: #511404;
				border-radius: 25px;
				color: #fff;
				position: relative;
				img{
					position: absolute;
					right: -40px;
					top: -40px;
				}
			}

			.bannerTimes {
				font-size: 26px;
				line-height: 28px;
				letter-spacing: 1px;
				color: #610a0a;
				position: absolute;
				bottom: 80px;
				left: 50%;
				margin-left: -100px;

				span {
					font-size: 40px;
					font-weight: bold;
				}
			}



		}
	}
</style>
