<template>
<<<<<<< HEAD
	<div class="zxfw">
		<div class="banner"></div>

		<div class="cont">
			<div class="card">
				<div class="imgCont">
					<img src="/img/mobile/zxfw1.png" />
				</div>
				<div class="itemCont">
					<div class="title">
						免费上门服务
					</div>
					<div class="intr">
						7 X 24小时标准服务<br />
						全程免费服务，贴心陪伴<br />
						客户投诉及时响应， 24小时受理
					</div>
					<div @click="$router.push('/zxfw/mfsmfw')" class="btn">了解详情</div>
				</div>
			</div>

			<div class="card">
				<div class="imgCont">
					<img src="/img/mobile/zxfw2.png" />
				</div>
				<div class="itemCont">
					<div class="title">
						人生纪念服务
					</div>
					<div class="intr">
						雕塑铜像 / 瓷像 / 墓志铭<br />
						纪念馆及周年 / 生日 / 忌日<br />
						从“爱”到一种职业
					</div>
					<div @click="$router.push('/zxfw/rsjnfw')" class="btn">了解详情</div>
				</div>
			</div>

			<div class="card">
				<div class="imgCont">
					<img src="/img/mobile/zxfw3.png" />
				</div>
				<div class="itemCont">
					<div class="title">
						安葬礼仪服务
					</div>
					<div class="intr">
						让告别变美丽<br />
						礼仪追思，专属人生葬礼服务<br />
						全面解决人生告别的最后烦忧
					</div>
					<div @click="$router.push('/zxfw/azlyfw')" class="btn">了解详情</div>
				</div>
			</div>

			<div class="card">
				<div class="imgCont">
					<img src="/img/mobile/zxfw4.png" />
				</div>
				<div class="itemCont">
					<div class="title">
						旧墓换新服务
					</div>
					<div class="intr">
						艺术墓碑设计<br />
						首创不取福盒换新<br />
						服务增加全面清理消毒环节
					</div>
					<div @click="$router.push('/zxfw/jmhxfw')" class="btn">了解详情</div>
				</div>
			</div>

			<div class="card">
				<div class="imgCont">
					<img src="/img/mobile/zxfw6.png" />
				</div>
				<div class="itemCont">
					<div class="title">
						墓碑保洁服务
					</div>
					<div class="intr">
						1小时全福位日式保洁<br />
						金牌专职保洁师<br />
						服务增加消杀护理环节
					</div>
					<div @click="$router.push('/zxfw/mbbjfw')" class="btn">了解详情</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	};
</script>

<style lang="less" scoped>
	.zxfw {
		background-color: #f3f3f3;

		.banner {
			background: url("/img/mobile/banner2.png") no-repeat center center;
			background-size: cover;
			height: 14.8rem;
			text-align: center;
		}

		.cont {
			padding: 1rem 0.4rem;

			.card {
				background-color: #ffffff;
				margin-bottom: 0.8rem;

				&:last-child {
					margin-bottom: 0rem;
				}

				.imgCont {
					height: 3rem;

					img {
						width: 100%;
						height: 3rem;
					}
				}

				.itemCont {
					height: 3rem;
					position: relative;

					.title {
						font-size: 0.3rem;
						font-weight: 700;
						line-height: 48px;
						color: #333333;
						padding-left: 0.4rem;
						padding-top: 0.4rem;
					}

					.intr {
						padding-left: 0.4rem;
						width: 4.2rem;
						font-size: 0.24rem;
						line-height: 0.31rem;
						color: #666666;
					}

					.btn {
						position: absolute;
						right: 0.4rem;
						bottom: 0.7rem;
						width: 1.6rem;
						height: 0.65rem;
						background-color: #004930;
						border-radius: 0.32rem;
						font-size: 0.24rem;
						line-height: 0.65rem;
						color: #ffffff;
						text-align: center;
					}
				}
			}
		}
	}
=======
  <div class="zxfw">
    <div class="banner"></div>

    <div class="cont">
      <div class="card">
        <div class="imgCont">
          <img src="/img/mobile/zxfw1.png" />
        </div>
        <div class="itemCont">
          <div class="title">
            免费上门服务
          </div>
          <div class="intr">
            7 X 24小时标准服务<br />
            全程免费服务，贴心陪伴<br />
            客户投诉及时响应， 24小时受理
          </div>
          <div @click="$router.push('/zxfw/mfsmfw')" class="btn">了解详情</div>
        </div>
      </div>

      <div class="card">
        <div class="imgCont">
          <img src="/img/mobile/zxfw2.png" />
        </div>
        <div class="itemCont">
          <div class="title">
            人生纪念服务
          </div>
          <div class="intr">
            雕塑铜像 / 瓷像 / 墓志铭<br />
            纪念馆及周年 / 生日 / 忌日<br />
            从“爱”到一种职业
          </div>
          <div @click="$router.push('/zxfw/rsjnfw')" class="btn">了解详情</div>
        </div>
      </div>

      <div class="card">
        <div class="imgCont">
          <img src="/img/mobile/zxfw3.png" />
        </div>
        <div class="itemCont">
          <div class="title">
            安葬礼仪服务
          </div>
          <div class="intr">
            让告别变美丽<br />
            礼仪追思，专属人生葬礼服务<br />
            全面解决人生告别的最后烦忧
          </div>
          <div @click="$router.push('/zxfw/azlyfw')" class="btn">了解详情</div>
        </div>
      </div>

      <div class="card">
        <div class="imgCont">
          <img src="/img/mobile/zxfw4.png" />
        </div>
        <div class="itemCont">
          <div class="title">
            旧墓换新服务
          </div>
          <div class="intr">
            艺术墓碑设计<br />
            首创不取福盒换新<br />
            服务增加全面清理消毒环节
          </div>
          <div @click="$router.push('/zxfw/jmhxfw')" class="btn">了解详情</div>
        </div>
      </div>

      <div class="card">
        <div class="imgCont">
          <img src="/img/mobile/zxfw6.png" />
        </div>
        <div class="itemCont">
          <div class="title">
            墓碑保洁服务
          </div>
          <div class="intr">
            1小时全福位日式保洁<br />
            金牌专职保洁师<br />
            服务增加消杀护理环节
          </div>
          <div @click="$router.push('/zxfw/mbbjfw')" class="btn">了解详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.zxfw {
  background-color: #f3f3f3;

  .banner {
    background: url("/img/mobile/banner2.png") no-repeat center center;
    background-size: cover;
    height: 5rem;
    text-align: center;
  }

  .cont {
    padding: 1rem 0.4rem;

    .card {
      background-color: #ffffff;
      margin-bottom: 0.8rem;

      &:last-child {
        margin-bottom: 0rem;
      }

      .imgCont {
        height: 3rem;

        img {
          width: 100%;
          height: 3rem;
        }
      }

      .itemCont {
        height: 3rem;
        position: relative;

        .title {
          font-size: 0.3rem;
          font-weight: 700;
          line-height: 48px;
          color: #333333;
          padding-left: 0.4rem;
          padding-top: 0.4rem;
        }

        .intr {
          padding-left: 0.4rem;
          width: 4.2rem;
          font-size: 0.24rem;
          line-height: 0.31rem;
          color: #666666;
        }

        .btn {
          position: absolute;
          right: 0.4rem;
          bottom: 0.7rem;
          width: 1.6rem;
          height: 0.65rem;
          background-color: #004930;
          border-radius: 0.32rem;
          font-size: 0.24rem;
          line-height: 0.65rem;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
