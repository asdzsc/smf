<template>
<<<<<<< HEAD
  <div>
    <!-- 头部图片 start -->
    <van-swipe class="bannar" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="item in banners"
        :key="item.id"
        :style="item.phoneUrl ? 'cursor: pointer;' : ''"
        @click="openUrl(item.phoneUrl)"
      >
        <img :src="baseUrl + item.phoneImg" />
      </van-swipe-item>
    </van-swipe>
    <!-- 头部图片 ent -->

    <!-- 线上预约 start -->
    <div class="renshengyuanman">
      <!-- <div class="title">石门峰纪念公园 SHIMENFENG MEMORIAL PARK</div> -->
      <div class="title2">人生圆满 为您服务</div>
      <div class="cont">
        我们专业的服务顾问会陪在您身旁，为您未雨绸缪。二十多年精品规划守护您的家人，多样化的服务与福地选项适合每个家庭的需求。
      </div>
      <van-row @click="$router.push('/zxfw')" class="yuyue" type="flex">
        <van-col>
          <div class="xianshangyuyue">线上预约</div>
        </van-col>
        <van-col class="xingcheng" span="12"> 设置您的行程 </van-col>
      </van-row>
    </div>
    <!-- 线上预约 end -->

    <!-- vr实景选墓 start -->
    <div class="vrxuanmu" style="padding-left: 0px; padding-right: 0px">
      <div class="title">VR 720° 实景选墓</div>
      <a
        href="http://vr100.jsfq.net:19999/tour/65aece4b2f2d4cea"
        target="_blank"
      >
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <div class="item">
              <img src="/img/mobile/mubei1.jpg" />
              <div class="name">明星产品</div>
              <div class="intr">最畅销精简设计的纪念碑</div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <img src="/img/mobile/mubei2.jpg" />
              <div class="name">经典立式</div>
              <div class="intr">精品典雅纪念碑</div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <img src="/img/mobile/mubei3.jpg" />
              <div class="name">经典卧式</div>
              <div class="intr">宝石精品纪念碑</div>
            </div>
          </van-swipe-item>
        </van-swipe>

        <!-- <div class="xuanbeiBox">
          <div class="item">
            <img src="/img/mobile/mubei1.jpg" />
            <div class="name">明星产品</div>
            <div class="intr">最畅销精简设计的纪念碑</div>
          </div>
          <div class="item">
            <img src="/img/mobile/mubei2.jpg" />
            <div class="name">经典立式</div>
            <div class="intr">精品典雅纪念碑</div>
          </div>
          <div class="item">
            <img src="/img/mobile/mubei3.jpg" />
            <div class="name">经典卧式</div>
            <div class="intr">宝石精品纪念碑</div>
          </div>
        </div> -->
      </a>
    </div>
    <!-- vr实景选墓 end -->

    <!-- 线上博物馆 start -->
    <div class="onlineBowuguan">
      <div class="cont">
        <div class="title">博物馆聚落</div>
        <div class="title2">邀您共同探索</div>
        <div class="bowuguanList">
          <div
            @click="$router.push('/bwg/info?id=515384113068720128')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>湖北军民抗战博物馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515389292618924033')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>生活票证馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=526303914752819200')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>楚天将帅馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515392416674955265')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>百姓族谱馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=515386491062927360')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>时代记忆馆
          </div>
          <div
            @click="$router.push('/bwg/info?id=518235353057673216')"
            class="item"
          >
            <i class="iconfont icondouble-arro-right"></i>人生圆满博物馆
          </div>
        </div>
      </div>
    </div>
    <!-- 线上博物馆 end -->

    <!-- 网上纪念馆 start -->
    <div class="onlineJinian" style="padding-left: 0px; padding-right: 0px">
      <div class="title">网上纪念馆</div>
      <div class="more" @click="$router.push('/mark')">点击进入 →</div>
      <div class="jinianList">
        <div class="item" @click="$router.push('/mark')">
          <img src="/img/mobile/zhangsan.jpg" />
          <div class="name">著名曲艺作家、相声表演艺术家</div>
          <div class="intr">夏雨田</div>
        </div>
        <div class="item" @click="$router.push('/mark')">
          <img src="/img/mobile/zhangsan2.jpg" />
          <div class="name">著名作家、散文家</div>
          <div class="intr">碧野</div>
        </div>
      </div>
    </div>
    <!-- 网上纪念馆 end -->

    <div class="store">
      <div class="cont">
        <div class="title">网上商城</div>
        <div class="intr">
          代客祭扫<br />
          鲜花预定<br />
          装饰纪念品<br />
          ....
        </div>
        <div class="jinianfuwu" @click="openUrl('/shop')">购买纪念服务</div>
      </div>
    </div>
  </div>
</template>
<script>
import { bannerList } from "@/pages/mobile/api/shop";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      banners: [],
    };
  },
  mounted() {
    this._bannerList();
  },
  methods: {
    _bannerList() {
      bannerList({
        bannerType: "1",
      }).then((res) => {
        if (res.code === 0) {
          this.banners = res.data;
        }
      });
    },
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.bannar {
  img {
    width: 100%;
    height: 6.7rem;
  }
}

.renshengyuanman {
  background-color: #f7f7f7;
  min-height: 7.3rem;
  padding: 0px 0.4rem;
  padding-top: 0.66rem;

  .title {
    font-size: 0.26rem;
    // letter-spacing: 1px;
    color: #004a30;
    font-weight: 600;
  }

  .title2 {
    font-size: 0.44rem;
    letter-spacing: 5px;
    color: #004a30;
    font-weight: 700;
    padding-top: 0.2rem;
  }

  .cont {
    font-size: 0.3rem;
    line-height: 0.58rem;
    letter-spacing: 1px;
    color: #333333;
    padding-top: 0.65rem;
  }

  .yuyue {
    padding-top: 1.2rem;

    .xianshangyuyue {
      width: 2.26rem;
      height: 0.72rem;
      border-radius: 0.36rem;
      border: solid 1px #004a30;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.7rem;
      color: #004a30;
      font-weight: 400;
    }

    .xingcheng {
      font-size: 0.3rem;
      line-height: 0.7rem;
      color: #004a30;
      padding-left: 0.3rem;
    }
  }
}

.vrxuanmu {
  padding: 1.5rem 0.4rem 3.6rem 0.3rem;
  position: relative;

  .title {
    font-size: 0.46rem;
    color: #004a30;
    font-weight: 700;
    text-align: center;
    padding-bottom: 0.9rem;
  }

  .xuanbeiBox {
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 0.8rem;
    position: relative;

    &::-webkit-scrollbar-track {
      height: 5px;
      background-color: #d2d2d2;
    }

    &::-webkit-scrollbar {
      height: 5px;
      background-color: #004a30;
    }

    &::-webkit-scrollbar-thumb {
      height: 5px;
      background-color: #004a30;
    }
  }

  .item {
    // margin-right: 0.2rem;
    // position: relative;

    // &:last-child {
    // 	margin-right: 0;
    // }

    .name {
      padding-left: 0.38rem;
      font-size: 0.36rem;
      color: #004a30;
      margin-top: 0.47rem;
      font-weight: 700;
    }

    .intr {
      padding-left: 0.38rem;
      padding-top: 10px;
      font-size: 0.3rem;
      color: #333333;
      font-weight: 500;
    }

    img {
      // width: 6.7rem;
      width: 100%;
      height: 7.5rem;
      display: block;
      object-fit: cover;
    }
  }
}

.onlineBowuguan {
  width: 100%;
  height: 16.2rem;
  background: url("/img/mobile/bwg.jpg") no-repeat center center;
  background-size: cover;

  .cont {
    padding-top: 4.5rem;
    padding-left: 0.75rem;

    .title {
      font-size: 0.68rem;
      letter-spacing: 0.1rem;
      color: #ffffff;
      font-weight: 700;
    }

    .title2 {
      font-size: 0.32rem;
      letter-spacing: 0.08rem;
      color: #ffffff;
      padding-top: 0.2rem;
    }

    .bowuguanList {
      padding-top: 0.6rem;

      .item {
        font-size: 0.3rem;
        line-height: 0.7rem;
        letter-spacing: 0.02rem;
        color: #ffffff;
      }
    }
  }
}

.onlineJinian {
  padding: 1.2rem 0.4rem;

  .title {
    text-align: center;
    font-size: 0.46rem;
    letter-spacing: 0.02rem;
    color: #004a30;
    font-weight: 700;
  }

  .more {
    padding-top: 0.3rem;
    font-size: 0.24rem;
    color: #333333;
    text-align: center;
  }

  .jinianList {
    .item {
      padding-top: 0.5rem;
      text-align: center;

      img {
        width: 100%;
        height: 5.3rem;
      }

      .name {
        padding-left: 0.4rem;
        padding-top: 0.3rem;
        font-size: 0.3rem;
        color: #004a30;
        font-weight: 700;
        text-align: left;
      }

      .intr {
        padding-left: 0.4rem;
        padding-top: 0.1rem;
        font-size: 0.3rem;
        color: #333333;
        font-weight: 700;
        text-align: left;
      }
    }
  }
}

.store {
  width: 100%;
  height: 16.36rem;
  background: url("/img/mobile/sc.jpg") no-repeat center center;
  background-size: cover;

  .cont {
    padding-top: 5.2rem;

    .title {
      text-align: center;
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.07rem;
      color: #ffffff;
    }

    .intr {
      padding-top: 0.56rem;
      text-align: center;
      font-size: 0.36rem;
      line-height: 0.66rem;
      color: #ffffff;
    }

    .jinianfuwu {
      width: 2.61rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      border: solid 1px #ffffff;
      margin: auto;
      margin-top: 1rem;
      font-size: 0.3rem;
      line-height: 0.62rem;
      letter-spacing: 0.03rem;
      color: #ffffff;
      text-align: center;
    }
  }
}
=======
	<div>
		<!-- 头部图片 start -->
		<van-swipe class="bannar" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in banners" :key="item.id" :style="item.phoneUrl ? 'cursor: pointer;' : ''" @click="openUrl(item.phoneUrl)">
				<img :src="baseUrl + item.phoneImg" />
			</van-swipe-item>
		</van-swipe>
		<!-- 头部图片 ent -->

		<!-- 线上预约 start -->
		<div class="renshengyuanman">
			<div class="title">
				石门峰纪念公园 SHIMENFENG MEMORIAL PARK
			</div>
			<div class="title2">
				人生圆满 为您服务
			</div>
			<div class="cont">
				我们专业的服务顾问会陪在您身旁，为您未雨绸缪。二十多年精品规划守护您的家人，多样化的服务与福地选项适合每个家庭的需求。
			</div>
			<van-row class="yuyue" type="flex">
				<van-col>
					<div class="xianshangyuyue">
						线上预约
					</div>
				</van-col>
				<van-col class="xingcheng" span="12">
					设置您的行程
				</van-col>
			</van-row>
		</div>
		<!-- 线上预约 end -->

		<!-- vr实景选墓 start -->
		<div class="vrxuanmu">
			<div class="title">VR 720° 实景选墓</div>
			<div class="xuanbeiBox">
				<div class="item">
					<img src="/img/mobile/mubei1.jpg" />
					<div class="name">明星产品</div>
					<div class="intr">最畅销精简设计的纪念碑</div>
				</div>
				<div class="item">
					<img src="/img/mobile/mubei2.jpg" />
					<div class="name">经典立式</div>
					<div class="intr">精品典雅纪念碑</div>
				</div>
				<div class="item">
					<img src="/img/mobile/mubei3.jpg" />
					<div class="name">经典卧式</div>
					<div class="intr">宝石精品纪念碑</div>
				</div>
			</div>
		</div>
		<!-- vr实景选墓 end -->

		<!-- 线上博物馆 start -->
		<div class="onlineBowuguan">
			<div class="cont">
				<div class="title">线上博物馆</div>
				<div class="title2">邀您共同探索</div>
				<div class="bowuguanList">
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>湖北军民抗战博物馆
					</div>
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>计划经济票证馆
					</div>
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>楚天将帅馆
					</div>
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>百家姓族谱馆
					</div>
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>时代记忆馆
					</div>
					<div class="item">
						<i class="iconfont icondouble-arro-right"></i>人生圆满博物馆
					</div>
				</div>
			</div>
		</div>
		<!-- 线上博物馆 end -->

		<!-- 网上纪念馆 start -->
		<div class="onlineJinian">
			<div class="title">网上纪念馆</div>
			<div class="more">点击进入 →</div>
			<div class="jinianList">
				<div class="item">
					<img src="/img/mobile/zhangsan.jpg" />
					<div class="name">著名曲艺作家、相声表演艺术家</div>
					<div class="intr">夏雨田</div>
				</div>
				<div class="item">
					<img src="/img/mobile/zhangsan2.jpg" />
					<div class="name">著名作家、散文家</div>
					<div class="intr">碧野</div>
				</div>
			</div>
		</div>
		<!-- 网上纪念馆 end -->

		<div class="store">
			<div class="cont">
				<div class="title">网上商城</div>
				<div class="intr">
					代客祭扫<br />
					鲜花预定<br />
					装饰纪念品<br />
					....
				</div>
				<div class="jinianfuwu" @click="openUrl('/shop')">购买纪念服务</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		bannerList
	} from "@/pages/mobile/api/shop";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				banners: []
			};
		},
		mounted() {
			this._bannerList()
		},
		methods: {
			_bannerList() {
				bannerList({
					bannerType: '1'
				}).then(res => {
					if (res.code === 0) {
						this.banners = res.data;
					}
				});
			},
			openUrl(url) {
				if (url) {
					if (url.indexOf("http") >= 0) {
						window.location = url;
					} else {
						this.$router.push(url);
					}
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.bannar {
		img {
			width: 100%;
			height: 6.7rem;
		}
	}

	.renshengyuanman {
		background-color: #f7f7f7;
		min-height: 7.3rem;
		padding: 0px 0.4rem;
		padding-top: 0.66rem;

		.title {
			font-size: 0.26rem;
			// letter-spacing: 1px;
			color: #004a30;
			font-weight: 600;
		}

		.title2 {
			font-size: 0.44rem;
			letter-spacing: 5px;
			color: #004a30;
			font-weight: 700;
			padding-top: 0.2rem;
		}

		.cont {
			font-size: 0.3rem;
			line-height: 0.58rem;
			letter-spacing: 1px;
			color: #333333;
			padding-top: 0.65rem;
		}

		.yuyue {
			padding-top: 1.2rem;

			.xianshangyuyue {
				width: 2.26rem;
				height: 0.72rem;
				border-radius: 0.36rem;
				border: solid 1px #004a30;
				text-align: center;
				font-size: 0.3rem;
				line-height: 0.7rem;
				color: #004a30;
				font-weight: 400;
			}

			.xingcheng {
				font-size: 0.3rem;
				line-height: 0.7rem;
				color: #004a30;
				padding-left: 0.3rem;
			}
		}
	}

	.vrxuanmu {
		padding: 1.5rem 0.4rem 3.6rem 0.3rem;
		position: relative;

		.title {
			font-size: 0.46rem;
			color: #004a30;
			font-weight: 700;
			text-align: center;
			padding-bottom: 0.9rem;
		}

		.xuanbeiBox {
			display: flex;
			white-space: nowrap;
			overflow-x: auto;
			padding-bottom: 0.8rem;
			position: relative;

			&::-webkit-scrollbar-track {
				height: 5px;
				background-color: #d2d2d2;
			}

			&::-webkit-scrollbar {
				height: 5px;
				background-color: #004a30;
			}

			&::-webkit-scrollbar-thumb {
				height: 5px;
				background-color: #004a30;
			}

			.item {
				margin-right: 0.2rem;
				position: relative;

				&:last-child {
					margin-right: 0;
				}

				.name {
					font-size: 0.36rem;
					color: #004a30;
					margin-top: 0.47rem;
					font-weight: 700;
				}

				.intr {
					font-size: 0.3rem;
					color: #333333;
					font-weight: 500;
				}

				img {
					width: 6.7rem;
					height: 7.5rem;
					display: block;
					object-fit: cover;
				}
			}
		}
	}

	.onlineBowuguan {
		width: 100%;
		height: 16.2rem;
		background: url("/img/mobile/bwg.jpg") no-repeat center center;
		background-size: cover;

		.cont {
			padding-top: 4.5rem;
			padding-left: 0.75rem;

			.title {
				font-size: 0.68rem;
				letter-spacing: 0.1rem;
				color: #ffffff;
				font-weight: 700;
			}

			.title2 {
				font-size: 0.32rem;
				letter-spacing: 0.08rem;
				color: #ffffff;
				padding-top: 0.2rem;
			}

			.bowuguanList {
				padding-top: 0.6rem;

				.item {
					font-size: 0.3rem;
					line-height: 0.7rem;
					letter-spacing: 0.02rem;
					color: #ffffff;
				}
			}
		}
	}

	.onlineJinian {
		padding: 1.2rem 0.4rem;

		.title {
			text-align: center;
			font-size: 0.46rem;
			letter-spacing: 0.02rem;
			color: #004a30;
			font-weight: 700;
		}

		.more {
			padding-top: 0.3rem;
			font-size: 0.24rem;
			color: #333333;
			text-align: center;
		}

		.jinianList {
			.item {
				padding-top: 0.5rem;
				text-align: center;

				img {
					width: 100%;
					height: 4.88rem;
				}

				.name {
					padding-top: 0.3rem;
					font-size: 0.3rem;
					color: #004a30;
					font-weight: 700;
					text-align: left;
				}

				.intr {
					padding-top: 0.1rem;
					font-size: 0.3rem;
					color: #333333;
					font-weight: 700;
					text-align: left;
				}
			}
		}
	}

	.store {
		width: 100%;
		height: 16.36rem;
		background: url("/img/mobile/sc.jpg") no-repeat center center;
		background-size: cover;

		.cont {
			padding-top: 5.2rem;

			.title {
				text-align: center;
				font-size: 0.66rem;
				font-weight: 700;
				letter-spacing: 0.07rem;
				color: #ffffff;
			}

			.intr {
				padding-top: 0.56rem;
				text-align: center;
				font-size: 0.36rem;
				line-height: 0.66rem;
				color: #ffffff;
			}

			.jinianfuwu {
				width: 2.61rem;
				height: 0.6rem;
				border-radius: 0.3rem;
				border: solid 1px #ffffff;
				margin: auto;
				margin-top: 1rem;
				font-size: 0.3rem;
				line-height: 0.62rem;
				letter-spacing: 0.03rem;
				color: #ffffff;
				text-align: center;
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
