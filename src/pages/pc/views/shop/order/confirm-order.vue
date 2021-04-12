<template>
<<<<<<< HEAD
  <div class="order">
    <a-row type="flex" class="breadcrumb">
      <a-col flex="auto">
        <a-breadcrumb separator="》">
          <a-breadcrumb-item>
            <a href="/#/shop">
              <a-icon
                type="home"
                theme="filled"
                style="color: #004930; font-size: 16px"
              />
              商城首页
            </a>
          </a-breadcrumb-item>
          <template v-if="type === 'cart'">
            <a-breadcrumb-item>
              <a href="/#/shop/cart">购物车</a>
            </a-breadcrumb-item>
          </template>
          <a-breadcrumb-item> 核对订单信息 </a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>
      <a-col>
        <steps v-if="type === 'cart'" ref="steps" :num="2"></steps>
        <steps v-else ref="steps" :num="1"></steps>
      </a-col>
    </a-row>

    <div class="orderInfo">
      <div class="title">填写并核对订单信息</div>
      <div class="cont">
        <orderAddress
          v-show="showOrderAddress"
          ref="orderAddress"
        ></orderAddress>
        <orderForm v-show="showOrderForm" ref="orderForm"></orderForm>
        <orderPayType ref="orderPayType"></orderPayType>
      </div>

      <orderGoodsList
        ref="orderGoodsList"
        @statistics="statistics"
      ></orderGoodsList>
    </div>
    <div class="totalMoney">
      {{ goodsNum }}件商品， 应付总额：<span class="money"
        >￥{{ totalPriceText }}</span
      >
    </div>
    <div class="btnCont">
      <div @click="pay()" class="btn" :class="{ loading: isSubmit }">
        <a-icon v-if="isSubmit" type="loading" spin />
        提交订单
      </div>
    </div>
    <myserve></myserve>

    <!-- 扫码支付 -->
    <payQrcode
      v-if="showPayQrcode"
      ref="payQrcode"
      :shopOrder="shopOrder"
      @onClose="payQrcodeColse"
    ></payQrcode>
  </div>
</template>
<script>
import { saveOrder, getCartNum } from "@/pages/pc/api/shop";
export default {
  components: {
    steps: () => import("@/pages/pc/views/shop/components/steps.vue"),
    orderAddress: () =>
      import("@/pages/pc/views/shop/order/components/order-address.vue"),
    orderForm: () =>
      import("@/pages/pc/views/shop/order/components/order-form.vue"),
    orderPayType: () =>
      import("@/pages/pc/views/shop/order/components/order-pay-type.vue"),
    orderGoodsList: () =>
      import("@/pages/pc/views/shop/order/components/order-goods-list.vue"),
    payQrcode: () =>
      import("@/pages/pc/views/shop/order/components/pay-qrcode.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      type: "shop", //进去类型 shop商城 cart购物车
      loading: false,
      model: {
        orderType: "0",
      }, //表单提交数据
      goodsNum: 0,
      totalPriceText: "",
      isSubmit: false,
      showPayQrcode: false, //扫码支付二维码
      shopOrder: {}, //订单数据
      gid: "", //商品id
    };
  },
  computed: {
    //显示服务墓址
    showOrderAddress() {
      if (this.model.orderType.toString() === "0") {
        return true;
      } else if (
        this.model.orderType.toString() === "1" &&
        this.gid !== "491462777001680896"
      ) {
        // 491462777001680896 免费上面服务 不需要选择服务墓址
        return true;
      }
      return false;
    },
    showOrderForm() {
      if (
        this.model.orderType.toString() === "3" ||
        this.model.orderType.toString() === "4"
      ) {
        //模版商品不显示表单
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.type = this.$route.query.type ? this.$route.query.type : "shop";
    this.gid = this.$route.query.gid ? this.$route.query.gid : "";
    this.loadData();
  },
  methods: {
    loadData() {
      var data = {
        orderType: "0", //默认普通订单
        erpCemeteryId: "", //erp墓址id
        bpname: "", //落葬人
        cemeaddress: "", //墓址
        contacts: "", //联系人
        mobile: "", //联系电话
        serveTime: "",
        serveTimeDate: null,
        serveType: "代客服务", // 代客服务  自取方式
        remark: "",
        payType: "支付宝", // 支付宝  微信支付
        memoryId: "", //个人主页id
        goodsList: [], //商品
      };
      data.orderType = this.$route.query.orderType
        ? this.$route.query.orderType
        : "0";
      data.memoryId = this.$route.query.memoryId
        ? this.$route.query.memoryId
        : "";
      Object.assign(this.model, data);
      Object.assign(this.shopOrder, data);
    },
    statistics(res) {
      this.goodsNum = res.goodsNum;
      this.totalPriceText = res.totalPriceText;
    },
    //提交订单支付
    pay() {
      if (!this.isSubmit) {
        this.isSubmit = true;
        //支付方式
        var payType = this.$refs.orderPayType.getData();
        //商品列表
        var goodsList = this.$refs.orderGoodsList.getData();

        if (payType) {
          if (this.showOrderAddress) {
            //服务墓址
            var cemetery = this.$refs.orderAddress.getData();
            if (cemetery) {
              this.model.erpCemeteryId = cemetery.erpCemeteryId;
              this.model.bpname = cemetery.bpname;
              this.model.cemeaddress = cemetery.cemeaddress;
            } else {
              this.isSubmit = false;
              return;
            }
          }
          if (this.showOrderForm) {
            //服务信息
            var orderForm = this.$refs.orderForm.getData();
            if (orderForm) {
              Object.assign(this.model, orderForm);
            } else {
              this.isSubmit = false;
              return;
            }
          }
          this.model.payType = payType;
          this.model.goodsList = goodsList;
          console.log(this.model);
          saveOrder(this.model).then((res) => {
            this.isSubmit = false;
            if (res.code === 0) {
              //刷下购物车
              this._getCartNum();
              Object.assign(this.shopOrder, res.data);
              this.$message.success("订单提交成功");
              if (res.data.payment > 0) {
                if (this.model.payType === "支付宝") {
                  this.$router.push({
                    path: "/pay/alipay-pay",
                    query: {
                      id: res.data.id,
                    },
                  });
                } else {
                  //打开支付二维码
                  this.showPayQrcode = true;
                }
              } else {
                //免费直接打开订单详情
                this.$router.push({
                  path: "/shop/order/orderInfo",
                  query: {
                    id: res.data.id,
                  },
                });
              }
            }
          });
        } else {
          this.isSubmit = false;
        }
      }
    },
    payQrcodeColse(res) {
      this.showPayQrcode = false;
      this.$router.push({
        path: "/shop/order/orderInfo",
        query: {
          id: this.shopOrder.id,
        },
      });
      // if (res && res.code === 0) {
      // 	console.log("payQrcodeColse", res);
      // } else {
      // 	this.$router.push({
      // 		path: '/shop/order/orderInfo',
      // 		query: {
      // 			id: this.shopOrder.id
      // 		}
      // 	})
      // }
    },
    //刷新购物车
    _getCartNum() {
      if (this.type === "cart") {
        getCartNum().then((res) => {
          if (res.code === 0) {
            this.$store.commit("account/setCartNum", res.data);
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.order {
  width: 1200px;
  margin: auto;

  .breadcrumb {
    margin-top: 15px;

    /deep/ .ant-breadcrumb {
      font-size: 16px;
    }
  }

  .orderInfo {
    margin-top: 40px;
    border: solid 1px #e0e0e0;

    .title {
      font-size: 16px;
      font-weight: normal;
      color: #333333;
      padding: 10px 20px;
      border-bottom: 2px solid #aaaaaa;
    }

    .cont {
      margin: 20px;
    }
  }

  .totalMoney {
    margin-top: 40px;
    text-align: right;
    font-size: 14px;
    font-weight: normal;
    color: #333333;
    line-height: 30px;

    .money {
      font-size: 20px;
      font-weight: 700;
      color: #d54040;
    }
  }

  .btnCont {
    position: relative;
    height: 48px;
    margin-top: 30px;
    margin-bottom: 30px;

    .btn {
      position: absolute;
      right: 0px;
      width: 160px;
      height: 48px;
      background-color: #d54040;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      line-height: 48px;
      color: #ffffff;
      cursor: pointer;

      &.loading {
        opacity: 0.7;
        cursor: no-drop;
      }
    }
  }
}
=======
	<div class="order">
		<a-row type="flex" class="breadcrumb">
			<a-col flex="auto">
				<a-breadcrumb separator="》">
					<a-breadcrumb-item>
						<a href="/#/shop">
							<a-icon type="home" theme="filled" style="color:#004930; font-size:16px;" />
							商城首页
						</a>
					</a-breadcrumb-item>
					<template v-if="type === 'cart'">
						<a-breadcrumb-item>
							<a href="/#/shop/cart">购物车</a>
						</a-breadcrumb-item>
					</template>
					<a-breadcrumb-item>
						核对订单信息
					</a-breadcrumb-item>
				</a-breadcrumb>
			</a-col>
			<a-col>
				<steps v-if="type === 'cart'" ref="steps" :num="2"></steps>
				<steps v-else ref="steps" :num="1"></steps>
			</a-col>
		</a-row>

		<div class="orderInfo">
			<div class="title">
				填写并核对订单信息
			</div>
			<div class="cont">
				<orderAddress v-show="showOrderAddress" ref="orderAddress"></orderAddress>
				<orderForm v-show="showOrderForm" ref="orderForm"></orderForm>
				<orderPayType ref="orderPayType"></orderPayType>
			</div>

			<orderGoodsList ref="orderGoodsList" @statistics="statistics"></orderGoodsList>
		</div>
		<div class="totalMoney">
			{{ goodsNum }}件商品， 应付总额：<span class="money">￥{{ totalPriceText }}</span>
		</div>
		<div class="btnCont">
			<div @click="pay()" class="btn" :class="{ loading: isSubmit }">
				<a-icon v-if="isSubmit" type="loading" spin />
				提交订单
			</div>
		</div>
		<myserve></myserve>

		<!-- 扫码支付 -->
		<payQrcode v-if="showPayQrcode" ref="payQrcode" :shopOrder="shopOrder" @onClose="payQrcodeColse"></payQrcode>
	</div>
</template>
<script>
	import {
		saveOrder,
		getCartNum
	} from "@/pages/pc/api/shop";
	export default {
		components: {
			steps: () => import("@/pages/pc/views/shop/components/steps.vue"),
			orderAddress: () => import("@/pages/pc/views/shop/order/components/order-address.vue"),
			orderForm: () => import("@/pages/pc/views/shop/order/components/order-form.vue"),
			orderPayType: () => import("@/pages/pc/views/shop/order/components/order-pay-type.vue"),
			orderGoodsList: () =>
				import("@/pages/pc/views/shop/order/components/order-goods-list.vue"),
			payQrcode: () => import("@/pages/pc/views/shop/order/components/pay-qrcode.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				type: "shop", //进去类型 shop商城 cart购物车
				loading: false,
				model: {
					orderType: '0'
				}, //表单提交数据
				goodsNum: 0,
				totalPriceText: "",
				isSubmit: false,
				showPayQrcode: false, //扫码支付二维码
				shopOrder: {}, //订单数据
				gid: '' //商品id
			};
		},
		computed: {
			//显示服务墓址
			showOrderAddress() {
				if (this.model.orderType.toString() === '0') {
					return true;
				} else if ((this.model.orderType.toString() === '1' && this.gid !== '491462777001680896')) {
					// 491462777001680896 免费上面服务 不需要选择服务墓址
					return true;
				}
				return false
			},
			showOrderForm() {
				if (this.model.orderType.toString() === '3') {
					//模版商品不显示表单
					return false;
				}
				return true
			}
		},
		mounted() {
			this.type = this.$route.query.type ? this.$route.query.type : "shop";
			this.gid = this.$route.query.gid ? this.$route.query.gid : "";
			this.loadData();
		},
		methods: {
			loadData() {
				var data = {
					orderType: "0", //默认普通订单
					bpname: "", //落葬人
					cemeaddress: "", //墓址
					contacts: "", //联系人
					mobile: "", //联系电话
					serveTime: "",
					serveTimeDate: null,
					serveType: "代客服务", // 代客服务  自取方式
					remark: "",
					payType: "支付宝", // 支付宝  微信支付
					goodsList: [] //商品
				};
				data.orderType = this.$route.query.orderType ? this.$route.query.orderType : "0";
				Object.assign(this.model, data);
				Object.assign(this.shopOrder, data);
			},
			statistics(res) {
				this.goodsNum = res.goodsNum;
				this.totalPriceText = res.totalPriceText;
			},
			//提交订单支付
			pay() {
				if (!this.isSubmit) {
					this.isSubmit = true;
					//支付方式
					var payType = this.$refs.orderPayType.getData();
					//商品列表
					var goodsList = this.$refs.orderGoodsList.getData();

					if (payType) {
						if (this.showOrderAddress) {
							//服务墓址
							var cemetery = this.$refs.orderAddress.getData();
							if (cemetery) {
								this.model.bpname = cemetery.bpname;
								this.model.cemeaddress = cemetery.cemeaddress;
							} else {
								this.isSubmit = false;
								return;
							}
						}
						if (this.showOrderForm) {
							//服务信息
							var orderForm = this.$refs.orderForm.getData();
							if (orderForm) {
								Object.assign(this.model, orderForm);
							} else {
								this.isSubmit = false;
								return;
							}
						}
						this.model.payType = payType;
						this.model.goodsList = goodsList;
						saveOrder(this.model).then(res => {
							this.isSubmit = false;
							if (res.code === 0) {
								//刷下购物车
								this._getCartNum();
								Object.assign(this.shopOrder, res.data);
								this.$message.success("订单提交成功");
								if (res.data.payment > 0) {
									if (this.model.payType === '支付宝') {
										this.$router.push({
											path: '/pay/alipay-pay',
											query: {
												id: res.data.id
											}
										})
									} else {
										//打开支付二维码
										this.showPayQrcode = true
									}
								} else {
									//免费直接打开订单详情
									this.$router.push({
										path: '/shop/order/orderInfo',
										query: {
											id: res.data.id
										}
									})
								}
							}
						});
					} else {
						this.isSubmit = false;
					}
				}
			},
			payQrcodeColse(res) {
				this.showPayQrcode = false;
				this.$router.push({
					path: '/shop/order/orderInfo',
					query: {
						id: this.shopOrder.id
					}
				})
				// if (res && res.code === 0) {
				// 	console.log("payQrcodeColse", res);
				// } else {
				// 	this.$router.push({
				// 		path: '/shop/order/orderInfo',
				// 		query: {
				// 			id: this.shopOrder.id
				// 		}
				// 	})
				// }
			},
			//刷新购物车
			_getCartNum() {
				if (this.type === 'cart') {
					getCartNum().then(res => {
						if (res.code === 0) {
							this.$store.commit("account/setCartNum", res.data);
						}
					});
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.order {
		width: 1200px;
		margin: auto;

		.breadcrumb {
			margin-top: 15px;

			/deep/ .ant-breadcrumb {
				font-size: 16px;
			}
		}

		.orderInfo {
			margin-top: 40px;
			border: solid 1px #e0e0e0;

			.title {
				font-size: 16px;
				font-weight: normal;
				color: #333333;
				padding: 10px 20px;
				border-bottom: 2px solid #aaaaaa;
			}

			.cont {
				margin: 20px;
			}
		}

		.totalMoney {
			margin-top: 40px;
			text-align: right;
			font-size: 14px;
			font-weight: normal;
			color: #333333;
			line-height: 30px;

			.money {
				font-size: 20px;
				font-weight: 700;
				color: #d54040;
			}
		}

		.btnCont {
			position: relative;
			height: 48px;
			margin-top: 30px;
			margin-bottom: 30px;

			.btn {
				position: absolute;
				right: 0px;
				width: 160px;
				height: 48px;
				background-color: #d54040;
				text-align: center;
				font-size: 18px;
				font-weight: 700;
				line-height: 48px;
				color: #ffffff;
				cursor: pointer;

				&.loading {
					opacity: 0.7;
					cursor: no-drop;
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
