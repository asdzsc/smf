<template>
	<div class="photos">
		<div class="title">
			<p>纪念相册</p>
		</div>
		<div class="photosInfo">
			<a-carousel :autoplay="true" arrows>
				<div slot="prevArrow" class="custom-slick-arrow left-circle">
					<a-icon type="left-circle" />
				</div>
				<div slot="nextArrow" class="custom-slick-arrow right-circle">
					<a-icon type="right-circle" />
				</div>
				<div class="carsoule">
					<div class="top">
						<div class="w340">
							<img src="/img/pc/1_01.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_02.png" alt="">
						</div>
						<div class="w460">
							<img src="/img/pc/1_03.png" alt="">
						</div>
					</div>
					<div class="bottom">
						<div class="w460">
							<img src="/img/pc/1_04.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_05.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_06.png" alt="">
						</div>
					</div>
				</div>
				<div class="carsoule">
					<div class="top">
						<div class="w340">
							<img src="/img/pc/1_01.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_02.png" alt="">
						</div>
						<div class="w460">
							<img src="/img/pc/1_03.png" alt="">
						</div>
					</div>
					<div class="bottom">
						<div class="w460">
							<img src="/img/pc/1_04.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_05.png" alt="">
						</div>
						<div class="w340">
							<img src="/img/pc/1_06.png" alt="">
						</div>
					</div>
				</div>
			</a-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	.photos {
		width: 1200px;
		margin: 30px auto;
		margin-top: 80px;

		.title {
			font-size: 40px;
			color: #343437;
			height: 110px;
			width: 350px;
			line-height: 110px;
			text-align: center;
			margin: 50px auto;
			margin-top: 100px;
			background-image: url('/img/pc/08_title.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.photosInfo {


			// 顶部图片
			/deep/ .ant-carousel {
				.slick-prev::before {
					display: none;
				}

				.slick-next::before {
					display: none;
				}

				.left-circle {
					left: -50px;
					z-index: 1;
					color: #00744c;
					font-size: 40px;

					&:hover {
						opacity: 0.5;
					}
				}

				.right-circle {
					right: -30px;
					z-index: 1;
					color: #00744c;
					font-size: 40px;

					&:hover {
						opacity: 0.5;
					}
				}
			}

			.carsoule {

				.top,
				.bottom {
					display: flex;
					margin-top: 20px;

					.w340 {
						width: 340px;
						height: 240px;
						margin-right: 30px;

						&:last-child {
							margin-right: 0;
						}

						img {
							width: 100%;
							height: 100%;
						}
					}

					.w460 {
						margin-right: 30px;

						&:last-child {
							margin-right: 0;
						}

						width: 460px;
						height: 240px;

						img {
							width: 100%;
							height: 100%;
						}
					}
				}

			}
		}
	}
</style>
