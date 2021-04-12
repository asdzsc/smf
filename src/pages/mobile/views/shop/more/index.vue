<template>
<<<<<<< HEAD
  <div class="same">
    <div class="sameList">
      <div class="sameTitle">
        <div class="link">
          <a href="/mobile/#/shop">商城首页</a>
          <span> <van-icon name="arrow" /> {{ columnInfo.name }} </span>
        </div>
      </div>
      <!-- vr实景选墓 start -->
      <div class="vrxuanmu">
        <div class="xuanbeiLeft">
          <img src="/img/mobile/vr_left.png" alt="" />
        </div>
        <div class="xuanbeiBox">
          <div class="item">
            <img src="/img/mobile/mubei1.jpg" />
            <div class="bt_box">
              <div class="name">明星产品</div>
              <div class="price">￥999</div>
            </div>
          </div>
          <div class="item">
            <img src="/img/mobile/mubei2.jpg" />
            <div class="bt_box">
              <div class="name">经典立式</div>
              <div class="price">￥999</div>
            </div>
          </div>
          <div class="item">
            <img src="/img/mobile/mubei3.jpg" />
            <div class="bt_box">
              <div class="name">经典卧式</div>
              <div class="price">￥999</div>
            </div>
          </div>
        </div>
      </div>
      <!-- vr实景选墓 end -->
      <div class="title">
        <img src="/img/mobile/icon_l.png" alt="" />
        <p>更多精品</p>
        <img src="/img/mobile/icon_r.png" alt="" />
      </div>
      <!-- 相似商品 start -->
      <ul class="xhtj dkjs">
        <li class="v_item">
          <img src="/img/mobile/vr_bei.png" alt="" />
          <div class="b_box">
            <div class="cont">
              <p class="name">其他明星产品</p>
              <p class="price">¥288.00</p>
            </div>
          </div>
        </li>
        <li class="v_item">
          <img src="/img/mobile/vr_bei.png" alt="" />
          <div class="b_box">
            <div class="cont">
              <p class="name">其他经典立式</p>
              <p class="price">¥288.00</p>
            </div>
          </div>
        </li>
        <li class="v_item">
          <img src="/img/mobile/vr_bei.png" alt="" />
          <div class="b_box">
            <div class="cont">
              <p class="name">其他明星产品</p>
              <p class="price">¥288.00</p>
            </div>
          </div>
        </li>
        <li class="v_item">
          <img src="/img/mobile/vr_bei.png" alt="" />
          <div class="b_box">
            <div class="cont">
              <p class="name">其他经典立式</p>
              <p class="price">¥288.00</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- 相似商品 end-->
    </div>
  </div>
</template>

<script>
import { getGoodsColumnInfo } from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      columnInfo: {
        name: "全部商品",
      },
      model: {
        current: "1",
        pageSize: "8",
        columnId: "", //栏目id
        total: "0",
        list: [],
      },
    };
  },
  mounted() {
    this._getGoodsColumnInfo();
  },
  methods: {
    _getGoodsColumnInfo() {
      if (this.model.columnId) {
        getGoodsColumnInfo({
          id: this.model.columnId,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.columnInfo, res.data);
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.same {
  .sameList {
    .vrxuanmu {
      margin: auto 0.14rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .xuanbeiLeft {
        width: 2.8rem;
        height: 2.6rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .xuanbeiBox {
        display: flex;
        white-space: nowrap;
        overflow-x: auto;
        position: relative;

        &::-webkit-scrollbar-track {
          height: 0px;
          background-color: transparent;
        }

        &::-webkit-scrollbar {
          height: 0px;
          background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
          height: 0px;
          background-color: transparent;
        }

        .item {
          margin-right: 0.2rem;
          position: relative;

          &:last-child {
            margin-right: 0;
          }

          .bt_box {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #000000;
            opacity: 0.65;
            color: #fff;
            width: 100%;
            height: 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .name {
              font-size: 0.26rem;
              font-weight: 700;
              line-height: 0.24rem;
            }

            .price {
              font-size: 0.24rem;
              line-height: 0.36rem;
            }
          }

          img {
            width: 2rem;
            height: 2.25rem;
            display: block;
            object-fit: cover;
          }
        }
      }
    }

    .title {
      font-size: 0.32rem;
      line-height: 20px;
      color: #333333;
      justify-content: center;
      display: flex;
      align-items: center;
      margin: 0.2rem 0;

      p {
        margin: 0 0.2rem;
      }
    }
    .sameTitle {
      display: flex;
      justify-content: space-between;
      font-size: 0.32rem;
      line-height: 60px;
      height: 1.1rem;
      align-items: center;
      margin: 0 0.14rem;

      .link {
        a {
          color: #333333;
        }

        span {
          color: #004930;
        }
      }
    }

    .xhtj {
      margin: auto 0.14rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .v_item {
        position: relative;
        margin-top: 0.2rem;
        width: 3.5rem;
        height: 3.8rem;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(143, 143, 143, 0.5);
        border-radius: 0.1rem;
        box-sizing: border-box;
        text-align: center;
        img {
          height: 2.5rem;
          width: 3.3rem;
          margin: 0.2rem auto;
        }

        .b_box {
          text-align: left;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0.98rem;
          line-height: 0.98rem;
          background-color: #050001;
          opacity: 0.5;

          .cont {
            display: flex;
            justify-content: space-between;
            width: 90%;
            margin: 0 auto;
            color: #fff;

            .name {
              font-size: 0.3rem;
            }

            .price {
              width: 1rem;
              font-size: 0.22rem;
            }
          }
        }
      }
    }

    .dkjs {
      .v_item {
        box-shadow: 0px 0px 10px 0px rgba(143, 143, 143, 0.5);
        height: 3.6rem;
        border-radius: 10px;

        .b_box {
          width: 100%;
          background-color: #fff;
          height: 1.2rem;
          opacity: inherit;

          .cont {
            display: flex;
            flex-direction: column;

            .name {
              font-size: 0.3rem;
              color: #333;
              line-height: 0.4rem;
              margin-top: 0.2rem;
            }

            .price {
              width: 1rem;
              color: #d54040;
              line-height: 0.2rem;
              margin-top: 0.2rem;
              font-size: 0.22rem;
            }
          }
        }
      }
    }
  }
}
=======
	<div class="same">
		<div class="sameList">
			<div class="sameTitle">
				<div class="link">
					<a href="/mobile/#/shop">商城首页</a>
					<span>
						<van-icon name="arrow" />VR720°实景选墓
					</span>
				</div>
			</div>
			<!-- vr实景选墓 start -->
			<div class="vrxuanmu">
				<div class="xuanbeiLeft">
					<img src="/img/mobile/vr_left.png" alt="">
				</div>
				<div class="xuanbeiBox">
					<div class="item">
						<img src="/img/mobile/mubei1.jpg" />
						<div class="bt_box">
							<div class="name">明星产品</div>
							<div class="price">￥999</div>
						</div>
					</div>
					<div class="item">
						<img src="/img/mobile/mubei2.jpg" />
						<div class="bt_box">
							<div class="name">经典立式</div>
							<div class="price">￥999</div>
						</div>
					</div>
					<div class="item">
						<img src="/img/mobile/mubei3.jpg" />
						<div class="bt_box">
							<div class="name">经典卧式</div>
							<div class="price">￥999</div>
						</div>
					</div>
				</div>
			</div>
			<!-- vr实景选墓 end -->
			<div class="title">
				<img src="/img/mobile/icon_l.png" alt="">
				<p>更多精品</p>
				<img src="/img/mobile/icon_r.png" alt="">
			</div>
			<!-- 相似商品 start -->
			<ul class="xhtj dkjs">
				<li class="v_item">
					<img src="/img/mobile/vr_bei.png" alt="">
					<div class="b_box">
						<div class="cont">
							<p class="name">其他明星产品</p>
							<p class="price">¥288.00</p>
						</div>
					</div>
				</li>
				<li class="v_item">
					<img src="/img/mobile/vr_bei.png" alt="">
					<div class="b_box">
						<div class="cont">
							<p class="name">其他经典立式</p>
							<p class="price">¥288.00</p>
						</div>
					</div>
				</li>
				<li class="v_item">
					<img src="/img/mobile/vr_bei.png" alt="">
					<div class="b_box">
						<div class="cont">
							<p class="name">其他明星产品</p>
							<p class="price">¥288.00</p>
						</div>
					</div>
				</li>
				<li class="v_item">
					<img src="/img/mobile/vr_bei.png" alt="">
					<div class="b_box">
						<div class="cont">
							<p class="name">其他经典立式</p>
							<p class="price">¥288.00</p>
						</div>
					</div>
				</li>
			</ul>
			<!-- 相似商品 end-->
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	.same {

		.sameList {
			.vrxuanmu {
				margin: auto .14rem;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				.xuanbeiLeft{
					width: 2.8rem;
					height: 2.60rem;
					margin-right: .2rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.xuanbeiBox {
					display: flex;
					white-space: nowrap;
					overflow-x: auto;
					position: relative;

					&::-webkit-scrollbar-track {
						height: 0px;
						background-color: transparent;
					}

					&::-webkit-scrollbar {
						height: 0px;
						background-color: transparent;
					}

					&::-webkit-scrollbar-thumb {
						height: 0px;
						background-color: transparent;
					}

					.item {
						margin-right: 0.2rem;
						position: relative;

						&:last-child {
							margin-right: 0;
						}

						.bt_box {
							position: absolute;
							bottom: 0;
							left: 0;
							background-color: #000000;
							opacity: 0.65;
							color: #fff;
							width: 100%;
							height: .80rem;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: flex-end;

							.name {
								font-size: 0.26rem;
								font-weight: 700;
								line-height: .24rem;
							}

							.price {
								font-size: .24rem;
								line-height: .36rem;
							}
						}


						img {
						width: 2rem;
						height: 2.25rem;
							display: block;
							object-fit: cover;
						}
					}
				}
			}

			.title {
				font-size: .32rem;
				line-height: 20px;
				color: #333333;
				justify-content: center;
				display: flex;
				align-items: center;
				margin: 0.2rem 0;

				p {
					margin: 0 0.2rem;
				}
			}
			.sameTitle {
				display: flex;
				justify-content: space-between;
				font-size: .32rem;
				line-height: 60px;
				height: 1.1rem;
				align-items: center;
				margin: 0 .14rem;

				.link {
					a {
						color: #333333;
					}

					span {
						color: #004930;
					}
				}

			}

			.xhtj {
				margin: auto .14rem;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.v_item {
					position: relative;
					margin-top: .2rem;
					width: 3.50rem;
					height: 3.80rem;
					background-color: #ffffff;
					box-shadow: 0px 0px 10px 0px 
						rgba(143, 143, 143, 0.5);
					border-radius: .10rem;
					box-sizing: border-box;
					text-align: center;
					img {
						height: 2.50rem;
						width: 3.30rem;
						margin: 0.2rem auto;
					}

					.b_box {
						text-align: left;
						width: 100%;
						position: absolute;
						left: 0;
						bottom: 0;
						height: .98rem;
						line-height: .98rem;
						background-color: #050001;
						opacity: 0.5;

						.cont {
							display: flex;
							justify-content: space-between;
							width: 90%;
							margin: 0 auto;
							color: #fff;

							.name {
								font-size: .3rem;
							}

							.price {
								width: 1rem;
								font-size: .22rem;
							}
						}
					}
				}
			}

			.dkjs {
				.v_item {
					box-shadow: 0px 0px 10px 0px rgba(143, 143, 143, 0.5);
					height: 3.6rem;
					border-radius: 10px;

					.b_box {
						width: 100%;
						background-color: #fff;
						height: 1.2rem;
						opacity: inherit;

						.cont {
							display: flex;
							flex-direction: column;

							.name {
								font-size: .3rem;
								color: #333;
								line-height: .4rem;
								margin-top: .2rem;
							}

							.price {
								width: 1rem;
								color: #d54040;
								line-height: .2rem;
								margin-top: .2rem;
								font-size: .22rem;
							}
						}
					}
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
