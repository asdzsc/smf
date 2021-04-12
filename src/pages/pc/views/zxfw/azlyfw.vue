<template>
<<<<<<< HEAD
	<div class="w1920 zxfw">
		<div class="banner"></div>

		<zxfwTitle title="安葬礼仪服务"></zxfwTitle>

		<div class="cont">
			<div class="title">礼仪追思、无忧圆满</div>
			<a-row class="cont1">
				<a-col class="cont1Item" :span="12">
					<img src="/img/zxfw7.png" />
					<div class="titleCont">圆满人生 ★ 定制礼仪</div>
				</a-col>
				<a-col class="cont1Item" :span="12">
					<img src="/img/zxfw8.png" />
					<div class="titleCont">专享服务 ★ 深度告别</div>
				</a-col>
				<a-col class="cont1Item" :span="12">
					<img src="/img/zxfw9.png" />
					<div class="titleCont">精美布场 ★ 人生守护</div>
				</a-col>
				<a-col class="cont1Item" :span="12">
					<img src="/img/zxfw10.png" />
					<div class="titleCont">全程陪同 ★ 省心贴心</div>
				</a-col>
			</a-row>

			<!-- <div class="title">人生告别太单调、让人伤心和伤感</div>
			<a-row class="cont2">
				<a-col class="cont2Item" :span="6">
					<img src="/img/zxfw11.png" />
					<div class="titleCont">现场清理粗糙</div>
				</a-col>
				<a-col class="cont2Item" :span="6">
					<img src="/img/zxfw12.png" />
					<div class="titleCont">没有鲜花和告别</div>
				</a-col>
				<a-col class="cont2Item" :span="6">
					<img src="/img/zxfw13.png" />
					<div class="titleCont">亲人没人照顾</div>
				</a-col>
				<a-col class="cont2Item" :span="6">
					<img src="/img/zxfw14.png" />
					<div class="titleCont">简单下葬伤心又伤感</div>
				</a-col>
			</a-row> -->

			<div class="title">葬礼服务——让告别变美丽</div>
			<div class="title2">
				礼仪追思，专属人生葬礼服务，全面解决人生告别的最后烦忧
			</div>
			<div class="cont3">
				<img src="/img/zxfw15.png" />
				<a-row class="describe">
					<a-col class="describeItem" :span="12">
						<i class="iconfont iconshichang "></i><span class="fwtitle">服务时长</span><span class="fwtitle2">1小时标准化服务</span>
					</a-col>
					<a-col class="describeItem" :span="12">
						<i class="iconfont iconyonghu1"></i><span class="fwtitle">服务人员</span>
						<span class="fwtitle2">专用进口设备器材，交响乐现场感</span>
					</a-col>
					<a-col class="describeItem" :span="12">
						<i class="iconfont iconfanwei"></i><span class="fwtitle">服务范围</span><span class="fwtitle2">6大环节40项服务标准</span>
					</a-col>
					<a-col class="describeItem" :span="12">
						<i class="iconfont iconshoucang"></i><span class="fwtitle">服务特色</span><span class="fwtitle2">全面、温情、个性、圆满</span>
					</a-col>
					<a-col class="describeItem" :span="12">
						<i class="iconfont icongongju"></i><span class="fwtitle">专业工具</span><span class="fwtitle2">6大环节40项服务标准</span>
					</a-col>
					<a-col class="describeItem" :span="12">
						<i class="iconfont iconyonghu2"></i><span class="fwtitle">适用对象</span><span class="fwtitle2">所有逝者安葬人生告别</span>
					</a-col>
				</a-row>
			</div>

			<div class="title">百里挑一的金牌礼仪师</div>
			<div class="title2">
				懂得生命文化的金牌礼仪师，十大技能考核，严选标准服务
			</div>
			<div class="cont4">
				<img src="/img/zxfw16.png" />
			</div>
		</div>
		<myserve></myserve>
		<zxfwLjyy goodsId="491476588290318337"></zxfwLjyy>
	</div>
</template>
<script>
	export default {
		components: {
			zxfwTitle: () => import("@/pages/pc/views/zxfw/components/zxfw-title.vue"),
			zxfwLjyy: () => import("@/pages/pc/views/zxfw/components/zxfw-ljyy.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	};
</script>
<style lang="less" scoped>
	.zxfw {
		.banner {
			background: url("/img/banner5.png") no-repeat center center;
			background-size: cover;
			height: 540px;
			text-align: center;
			position: relative;
		}

		.cont {
			width: 1200px;
			margin: auto;
			padding-top: 90px;

			.title {
				font-size: 36px;
				color: #333333;
				text-align: center;
			}

			.title2 {
				padding-top: 10px;
				text-align: center;
				font-size: 24px;
				color: #666666;
			}

			.cont1 {
				margin-top: 30px;
				margin-bottom: 50px;

				.cont1Item {
					width: 580px;
					height: 300px;
					margin-right: 40px;
					margin-bottom: 40px;
					position: relative;

					&:nth-child(even) {
						margin-right: 0px;
					}

					img {
						width: 580px;
						height: 300px;
					}

					.titleCont {
						position: absolute;
						bottom: 0px;
						width: 100%;
						height: 121px;
						background: url("/img/zhezhao.png") no-repeat center center;
						background-size: cover;
						text-align: center;
						padding-top: 70px;
						font-size: 26px;
						color: #ffffff;
					}
				}
			}

			.cont2 {
				margin-top: 30px;
				margin-bottom: 100px;

				.cont2Item {
					width: 255px;
					margin-right: 60px;

					&:last-child {
						margin-right: 0px;
					}

					img {
						width: 255px;
						height: 206px;
					}

					.titleCont {
						padding-top: 20px;
						text-align: center;
						font-size: 24px;
						color: #666666;
					}
				}
			}

			.cont3 {
				margin-top: 30px;
				margin-bottom: 100px;
				position: relative;

				img {
					width: 100%;
				}

				.describe {
					position: absolute;
					width: 100%;
					bottom: 20px;

					.describeItem {
						color: #ffffff;
						margin-bottom: 20px;

						&:nth-child(odd) {
							padding-left: 160px;
						}

						&:nth-child(even) {
							padding-left: 40px;
						}

						.iconfont {
							font-size: 28px;
							position: relative;
							top: 3px;
						}

						.fwtitle {
							font-size: 24px;
							padding: 0px 15px;
						}

						.fwtitle2 {
							font-size: 18px;
						}
					}
				}
			}

			.cont4 {
				margin-top: 30px;

				img {
					width: 100%;
				}
			}
		}
	}
=======
  <div class="w1920 zxfw">
    <div class="banner"></div>

    <zxfwTitle title="安葬礼仪服务"></zxfwTitle>

    <div class="cont">
      <div class="title">礼仪追思、无忧圆满</div>
      <a-row class="cont1">
        <a-col class="cont1Item" :span="12">
          <img src="/img/zxfw7.png" />
          <div class="titleCont">圆满人生 ★ 定制礼仪</div>
        </a-col>
        <a-col class="cont1Item" :span="12">
          <img src="/img/zxfw8.png" />
          <div class="titleCont">专享服务 ★ 深度告别</div>
        </a-col>
        <a-col class="cont1Item" :span="12">
          <img src="/img/zxfw9.png" />
          <div class="titleCont">精美布场 ★ 人生守护</div>
        </a-col>
        <a-col class="cont1Item" :span="12">
          <img src="/img/zxfw10.png" />
          <div class="titleCont">全程陪同 ★ 省心贴心</div>
        </a-col>
      </a-row>

      <div class="title">人生告别太单调、让人伤心和伤感</div>
      <a-row class="cont2">
        <a-col class="cont2Item" :span="6">
          <img src="/img/zxfw11.png" />
          <div class="titleCont">现场清理粗糙</div>
        </a-col>
        <a-col class="cont2Item" :span="6">
          <img src="/img/zxfw12.png" />
          <div class="titleCont">没有鲜花和告别</div>
        </a-col>
        <a-col class="cont2Item" :span="6">
          <img src="/img/zxfw13.png" />
          <div class="titleCont">亲人没人照顾</div>
        </a-col>
        <a-col class="cont2Item" :span="6">
          <img src="/img/zxfw14.png" />
          <div class="titleCont">简单下葬伤心又伤感</div>
        </a-col>
      </a-row>

      <div class="title">葬礼服务——让告别变美丽</div>
      <div class="title2">
        礼仪追思，专属人生葬礼服务，全面解决人生告别的最后烦忧
      </div>
      <div class="cont3">
        <img src="/img/zxfw15.png" />
        <a-row class="describe">
          <a-col class="describeItem" :span="12">
            <i class="iconfont iconshichang "></i
            ><span class="fwtitle">服务时长</span
            ><span class="fwtitle2">1小时标准化服务</span>
          </a-col>
          <a-col class="describeItem" :span="12">
            <i class="iconfont iconyonghu1"></i
            ><span class="fwtitle">服务人员</span>
            <span class="fwtitle2">专用进口设备器材，交响乐现场感</span>
          </a-col>
          <a-col class="describeItem" :span="12">
            <i class="iconfont iconfanwei"></i
            ><span class="fwtitle">服务范围</span
            ><span class="fwtitle2">6大环节40项服务标准</span>
          </a-col>
          <a-col class="describeItem" :span="12">
            <i class="iconfont iconshoucang"></i
            ><span class="fwtitle">服务特色</span
            ><span class="fwtitle2">全面、温情、个性、圆满</span>
          </a-col>
          <a-col class="describeItem" :span="12">
            <i class="iconfont icongongju"></i
            ><span class="fwtitle">专业工具</span
            ><span class="fwtitle2">6大环节40项服务标准</span>
          </a-col>
          <a-col class="describeItem" :span="12">
            <i class="iconfont iconyonghu2"></i
            ><span class="fwtitle">适用对象</span
            ><span class="fwtitle2">所有逝者安葬人生告别</span>
          </a-col>
        </a-row>
      </div>

      <div class="title">百里挑一的金牌礼仪师</div>
      <div class="title2">
        懂得生命文化的金牌礼仪师，十大技能考核，严选标准服务
      </div>
      <div class="cont4">
        <img src="/img/zxfw16.png" />
      </div>
    </div>
    <myserve></myserve>
    <zxfwLjyy goodsId="491476588290318337"></zxfwLjyy>
  </div>
</template>
<script>
export default {
  components: {
    zxfwTitle: () => import("@/pages/pc/views/zxfw/components/zxfw-title.vue"),
    zxfwLjyy: () => import("@/pages/pc/views/zxfw/components/zxfw-ljyy.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.zxfw {
  .banner {
    background: url("/img/banner5.png") no-repeat center center;
    background-size: cover;
    height: 540px;
    text-align: center;
    position: relative;
  }
  .cont {
    width: 1200px;
    margin: auto;
    padding-top: 90px;
    .title {
      font-size: 36px;
      color: #333333;
      text-align: center;
    }
    .title2 {
      padding-top: 10px;
      text-align: center;
      font-size: 24px;
      color: #666666;
    }
    .cont1 {
      margin-top: 30px;
      margin-bottom: 50px;
      .cont1Item {
        width: 580px;
        height: 300px;
        margin-right: 40px;
        margin-bottom: 40px;
        position: relative;
        &:nth-child(even) {
          margin-right: 0px;
        }
        img {
          width: 580px;
          height: 300px;
        }
        .titleCont {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 121px;
          background: url("/img/zhezhao.png") no-repeat center center;
          background-size: cover;
          text-align: center;
          padding-top: 70px;
          font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .cont2 {
      margin-top: 30px;
      margin-bottom: 100px;
      .cont2Item {
        width: 255px;
        margin-right: 60px;
        &:last-child {
          margin-right: 0px;
        }
        img {
          width: 255px;
          height: 206px;
        }
        .titleCont {
          padding-top: 20px;
          text-align: center;
          font-size: 24px;
          color: #666666;
        }
      }
    }
    .cont3 {
      margin-top: 30px;
      margin-bottom: 100px;
      position: relative;
      img {
        width: 100%;
      }
      .describe {
        position: absolute;
        width: 100%;
        bottom: 20px;
        .describeItem {
          color: #ffffff;
          margin-bottom: 20px;
          &:nth-child(odd) {
            padding-left: 160px;
          }
          &:nth-child(even) {
            padding-left: 40px;
          }

          .iconfont {
            font-size: 28px;
            position: relative;
            top: 3px;
          }
          .fwtitle {
            font-size: 24px;
            padding: 0px 15px;
          }
          .fwtitle2 {
            font-size: 18px;
          }
        }
      }
    }
    .cont4 {
      margin-top: 30px;
      img {
        width: 100%;
      }
    }
  }
}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
