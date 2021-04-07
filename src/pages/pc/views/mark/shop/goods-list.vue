<template>
  <div class="goodsInfo">
    <!-- 商品类别导航 start -->
    <div class="breadcrumb">
      <a-breadcrumb separator="》">
        <a-breadcrumb-item>
          <a href="/#/shop">
            <i class="iconfont iconhome-fill home"></i>
            商城首页
          </a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          {{ columnInfo.name }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 商品类别导航 end -->
    <div class="vrxm">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930;"
          spin
        />

        <div class="goodsCont">
          <a-empty v-if="model.list.length === 0" />
          <ul>
            <li
              v-for="item in model.list"
              :key="item.id"
              @click="handleCheck(item.id)"
              :class="{ checkListSelect: tab == item.id }"
            >
              <img :src="getGoodsImg(item.cover)" />
              <div class="goodsTitleCont">
                <div class="goodsTitle">
                  {{ item.title }}
                </div>
                <!-- 	<div class="goodsSubhead">
							最畅销精简设计的纪念碑
						</div> -->
                <div class="goodsPrice">
                  <span class="money">￥</span>
                  {{ goodsPrice(item) }}
                </div>
              </div>
              <div class="buyCont">
                <!-- <div @click.stop="openGoodsInfo(item)" class="buyLeft">
                加入购物车
              </div> -->
                <div class="buyRight">
                  已选择
                </div>
              </div>
            </li>
          </ul>
          <!-- <div class="goodsItem"></div> -->
        </div>
      </a-spin>
      <paging ref="paging" @setPage="setPage"></paging>

      <div class="textarea">
        <div class="textarea-cont">
          <h1>寄语</h1>
          <div id="message" class="text">
            <a-textarea
              v-model="msgModel.cont"
              placeholder="请输入留言信息"
              :auto-size="{ minRows: 5, maxRows: 5 }"
            />
          </div>
          <!-- <orderForm v-show="showOrderForm" ref="orderForm"></orderForm> -->
          <orderPayType
            style="width: 95%;margin-top:20px;margin-bottom:0;margin-left:20px;"
            ref="orderPayType"
            v-show="showPayType"
          ></orderPayType>
          <div class="button-group clearfix">
            <button class="btn-submit" @click="sendMsg()">提交</button>
            <button class="btn-cancel" @click="returnPage()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 扫码支付 -->
    <payQrcode
      v-if="showPayQrcode"
      ref="payQrcode"
      :shopOrder="shopOrder"
      @onClose="payQrcodeColse"
    ></payQrcode>
    <myserve></myserve>
  </div>
</template>
<script>
import moment from "moment";
import { getGoodsColumnInfo, goodsList } from "@/pages/pc/api/shop";
import {
  saveMemoryMsg,
  saveOrder,
  getMemoryInfo,
} from "@/pages/pc/api/mark.js";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
    orderPayType: () =>
      import("@/pages/pc/views/shop/order/components/order-pay-type.vue"),
    payQrcode: () =>
      import("@/pages/pc/views/shop/order/components/pay-qrcode.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      columnInfo: {
        name: "全部商品",
      },
      user: {
        mobile: "",
      },
      msgBox: false,
      loading: false,
      psid: false,
      showPayType: false,
      showPayQrcode: false,
      shopOrder: {}, //订单数据
      goodsList: [], //商品
      tab: null,
      //  商品列表
      model: {
        current: "1",
        pageSize: "8",
        columnId: "", //栏目id
        total: "0",
        status: "1",
        list: [],
      },
      // 获取用户信息
      modelUser: {
        id: "1",
        createId: null,
        createDate: "2020-11-27 13:59:18",
        updateDate: "2020-12-02 10:02:51",
        deleteState: 0,
        columnIds: [""],
        name: "测试",
        gender: null,
        birthday: null,
        dieTime: null,
        birthdayAddress: null,
        dieAddress: null,
        photo: null,
        cover: null,
        phoneCover: null,
        bg: null,
        phoneBg: null,
        buryAddress: null,
        templateId: "",
        activateCode: null,
        mobiles: ["17612770945"],
        status: "0",
        memoryType: "0",
        sortId: 0,
        expireTime: null,
        intro: null,
        cont: null,
        columnName: null,
        mergerId: null,
        templateName: "null",
        erpCemeteryId: "", //关联erp墓址id
        erpCemeteryIdKey: { key: "" },
      },
      // 获取订单号
      orderModel: {
        erpCemeteryId: "", //erp墓址id
        orderType: "0",
        bpname: "",
        cemeaddress: "",
        contacts: "",
        mobile: "",
        serveTime: "",
        serveType: "代客服务",
        serveTimeDate: null,
        remark: "",
        payType: "",
        goodsList: [
          {
            goodsId: "",
            goodsNum: 1,
          },
        ],
      },
      //   商品信息
      modelInfo: {
        id: "",
        cover: "",
        title: "",
        subtitle: "",
        goodsType: "0",
        imgs: [],
        originalPrice: 0, //原价
        price: 0, //销售价格
        minPrice: 0, //多规格最低价格
        maxPrice: 0, //多规格最高价格
        isSpec: "0", //有无规格 0无 1有
        cont: "",
      },
      //  留言对象
      msgModel: {
        id: "",
        memoryId: this.$route.query.id,
        memoryName: "",
        msgType: "1",
        title: "",
        cont: "",
        cover: "",
        isGoods: "0",
        orderId: "",
        erpCemeteryId: "", //erp墓址id
      },
    };
  },
  computed: {
    showOrderForm() {
      if (this.orderModel.orderType.toString() === "3") {
        //模版商品不显示表单
        return false;
      }
      return true;
    },
  },
  mounted() {
    if (this.$route.query.cid) {
      this.model.columnId = this.$route.query.cid;
    }
    this._getGoodsColumnInfo();
    this._goodsList();

    const id = this.$route.query.id;
    this.loading = true;
    getMemoryInfo({
      id: id,
    }).then((res) => {
      console.log(res);
      this.loading = false;
      if (res.code === 0) {
        Object.assign(this.modelUser, res.data);
      }
    });
    this.user = this.$store.state.account.user;
    if (this.user.mobile) {
      this.orderModel.mobile = this.user.mobile;
      this.orderModel.contacts = this.user.name;
    }
    //服务时间
    this.orderModel.serveTimeDate = moment().add(1, "days");
    this.orderModel.serveTime = this.orderModel.serveTimeDate.format(
      "YYYY-MM-DD 00:00:00"
    );
  },
  methods: {
    handleCheck(id) {
      if (this.tab == id) {
        this.tab = -1;
        this.showPayType = false;
        this.modelInfo.id = "";
      } else {
        this.tab = id;
        this.showPayType = true;
        this.modelInfo.id = id;
      }
    },
    payQrcodeColse() {
      this.showPayQrcode = false;
      this.$router.push({
        path: "/shop/order/orderInfo",
        query: {
          id: this.shopOrder.id,
        },
      });
    },
    // 提交
    sendMsg() {
      if (this.msgModel.cont == "") {
        // this.msgBox = true;
        this.$message.warning("留言不能为空！");
      } else {
        if (this.modelInfo.id) {
          // 支付方式
          var payType = this.$refs.orderPayType.getData();
          if (payType) {
            // 支付方式
            this.orderModel.payType = payType;
            // 留言信息
            this.orderModel.remark = this.msgModel.cont;
            // 商品id
            this.orderModel.goodsList[0].goodsId = this.modelInfo.id;
            // 服务对象
            this.orderModel.bpname = this.modelUser.name;
            // 服务墓址
            this.msgModel.memoryName = this.modelUser.name;
            // erpId
            this.orderModel.erpCemeteryId = this.modelUser.erpCemeteryId;
            this.orderModel.cemeaddress = this.modelUser.buryAddress;
            console.log(
              "🚀 ~ file: goods-list.vue ~ line 279 ~ sendMsg ~ this.orderModel",
              this.orderModel
            );
            saveOrder(this.orderModel).then((res) => {
              if (!this.orderModel.cemeaddress) {
                this.$message.warning("没有服务墓址，无法购买商品！");
                // setTimeout(this.returnPage(), 2000);
                setTimeout(() => {
                  saveMemoryMsg(this.msgModel);
                  this.$message.success("留言提交成功！");
                  const id = this.$route.query.id;
                  this.$router.push({
                    path: "/mark/grjn/index",
                    query: {
                      id: id,
                    },
                  });
                }, 2000);
              }
              // 订单id
              this.msgModel.orderId = res.data.id;
              // 包含商品
              this.msgModel.isGoods = "1";
              saveMemoryMsg(this.msgModel);
              this.$message.success("留言提交成功！");
              if (res.code === 0) {
                Object.assign(this.shopOrder, res.data);
                this.$message.success("订单提交成功！");
                if (res.data.payment > 0) {
                  if (this.orderModel.payType === "支付宝") {
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
          }
        } else {
          this.msgModel.memoryName = this.modelUser.name;
          saveMemoryMsg(this.msgModel);
          this.$message.success("留言提交成功！");
          // const id = this.$route.query.id;
          // this.$router.push({
          // 	path: "/mark/grjn/index",
          // 	query: {
          // 		id: id,
          // 	},
          // });
          this.returnPage();
        }
      }
    },
    // 取消
    returnPage() {
      this.msgModel.cont = "";
      const id = this.$route.query.id;
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: id,
        },
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 10);
    },
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
    // 礼仪服务
    _goodsList() {
      this.loading = true;
      goodsList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._goodsList();
    },
    getGoodsImg(cover) {
      if (cover) {
        if (cover.indexOf("http") >= 0) {
          return cover;
        } else {
          return this.baseUrl + cover;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    goodsPrice(goodsInfo) {
      if (goodsInfo.isSpec === "1") {
        return (
          utils.parseMoney(goodsInfo.minPrice) +
          " ~ " +
          utils.parseMoney(goodsInfo.maxPrice)
        );
      } else {
        return utils.parseMoney(goodsInfo.price);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.goodsInfo {
  width: 1200px;
  margin: auto;
  padding-top: 10px;

  .breadcrumb {
    .home {
      color: #004930;
      font-size: 25px;
      position: relative;
      top: 3px;
      margin-right: 10px;
    }

    .ant-breadcrumb {
      a {
        font-size: 16px;
        font-weight: 400;
        color: #666666;
      }

      span:last-child {
        color: #bbbbbb;
      }
    }
  }

  .vrxm {
    max-width: 1200px;
    margin: auto;

    .title {
      font-size: 30px;
      font-weight: 400;
      color: #333333;
      justify-content: center;
      display: flex;
      align-items: center;
    }

    p {
      margin: 0 20px;
    }

    .goodsCont {
      display: flex;
      padding-bottom: 25px;
      flex-wrap: wrap;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;

        .checkListSelect {
          .goodsTitleCont {
            transition: 0.5s;
            background-color: #004930;

            .goodsTitle {
              color: #fff;
            }

            .goodsSubhead {
              color: #fff;
            }

            .goodsPrice {
              color: #fff;
            }
          }

          .buyCont {
            display: flex;
          }
        }

        li {
          list-style: none;
          width: 276px;
          height: 434px;
          margin-right: 30px;
          margin-top: 30px;
          cursor: pointer;
          position: relative;

          &:nth-child(4) {
            margin-right: 0px;
          }

          &:last-child {
            margin-right: 0px;
          }

          img {
            width: 100%;
            height: 314px;
          }

          .goodsTitleCont {
            height: 120px;
            background-color: #fff;

            .goodsTitle {
              text-align: center;
              font-size: 18px;
              font-weight: normal;
              color: #333333;
              padding-top: 20px;
              font-weight: 400;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            .goodsSubhead {
              text-align: center;
              font-size: 14px;
              font-weight: 400;
              color: #999999;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            .goodsPrice {
              text-align: center;
              font-size: 18px;
              font-weight: 400;
              color: #d54040;
              padding-top: 10px;

              .money {
                font-size: 14px;
              }
            }
          }

          .buyCont {
            display: none;
            width: 220px;
            height: 40px;
            position: absolute;
            top: 10px;
            left: 27px;
            cursor: pointer;

            .buyLeft {
              flex: 0.5;
              font-size: 14px;
              line-height: 40px;
              color: #d54040;
              text-align: center;
              font-weight: 400;
              background-color: #fff;
            }

            .buyRight {
              flex: 0.5;
              margin: 0 auto;
              background-color: #d54040;
              font-size: 14px;
              line-height: 40px;
              color: #ffffff;
              text-align: center;
              font-weight: 400;
            }
          }
        }
      }
    }

    .textarea {
      width: 1200px;
      display: block;
      margin: 0 auto;
      overflow: hidden;
      background-color: #e1e1e1;
      position: fixed;
      bottom: 0;
      left: 50%;
      margin-left: -600px;
      z-index: 99;

      .textarea-cont {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: transparent;

        h1 {
          text-align: center;
          color: #004930;
          font-size: 40px;
          margin-bottom: 0;
          line-height: 80px;
        }

        .text {
          width: 100%;
          background: #fff;
          resize: none;
          box-shadow: 3px 3px 3px #555;
          outline: none;
          z-index: auto !important;

          /deep/ .ant-input {
            min-height: 150px !important;
          }
        }

        .button-group {
          width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: row-reverse;
          padding: 20px 0;

          .btn-submit {
            width: 180px;
            height: 40px;
            line-height: 40px;
            border-radius: 21px;
            font-size: 20px;
            border: none;
            outline: none;
            cursor: pointer;
            margin-left: 20px;
            background-color: #004930 !important;
            color: #fff;
          }

          .btn-cancel {
            border: 4px solid #004930 !important;
            color: #004930;
            line-height: 32px !important;
            width: 180px;
            height: 40px;
            line-height: 40px;
            border-radius: 21px;
            font-size: 20px;
            border: none;
            outline: none;
            cursor: pointer;
            margin-left: 20px;
          }
        }
      }
    }

    .more {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
