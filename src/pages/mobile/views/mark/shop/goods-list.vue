<template>
  <div class="same">
    <div class="sameList">
      <div class="sameTitle">
        <div class="link">
          <a href="/mobile/#/shop">商城首页</a>
          <span> <van-icon name="arrow" /> {{ columnInfo.name }} </span>
        </div>
      </div>
      <!-- 相似商品 start -->
      <van-empty v-if="model.list.length === 0" description="暂无数据" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="xhtj" v-if="model.list.length > 0">
          <li
            v-for="item in model.list"
            :key="item.id"
            @click="handleCheck(item.id)"
            :class="{ checkListSelect: tab == item.id }"
          >
            <img :src="getGoodsImg(item.cover)" />
            <div class="buyRight">已选择</div>
            <div class="b_box">
              <div class="cont">
                <p class="name">{{ item.title }}</p>
                <p class="price">¥ {{ goodsPrice(item) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
      <div class="textarea">
        <div class="textarea-cont">
          <h1>寄语</h1>
          <div id="message" class="text">
            <van-field
              v-model="msgModel.cont"
              rows="4"
              autosize
              type="textarea"
              placeholder="请输入留言信息"
            />
          </div>
          <orderPayType
            style="width: 95%; margin: 0 auto; padding-bottom: 0.3rem"
            ref="orderPayType"
            v-show="showPayType"
          ></orderPayType>
          <div class="button-group">
            <button class="btn-submit" @click="sendMsg()">提交</button>
            <button class="btn-cancel" @click="returnPage()">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getGoodsColumnInfo, goodsList } from "@/pages/mobile/api/shop";
import {
  saveMemoryMsg,
  saveOrder,
  getMemoryInfo,
} from "@/pages/mobile/api/mark.js";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  components: {
    orderPayType: () =>
      import("@/pages/mobile/views/shop/order/components/order-pay-type.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      columnInfo: {
        name: "全部商品",
      },
      user: {
        mobile: "",
      },
      finished: false,
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
        list: [],
        status: "1",
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
    getMemoryInfo({
      id: id,
    }).then((res) => {
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
    onLoad() {
      this._goodsList();
    },
    // 提交
    sendMsg() {
      if (this.msgModel.cont == "") {
        this.$notify({
          type: "warning",
          message: "留言信息不能为空！",
        });
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
            this.orderModel.cemeaddress = this.modelUser.buryAddress;
            // erpId
            this.orderModel.erpCemeteryId = this.modelUser.erpCemeteryId;
            this.orderModel.cemeaddress = this.modelUser.buryAddress;
            console.log(
              "🚀 ~ file: goods-list.vue ~ line 279 ~ sendMsg ~ this.orderModel",
              this.orderModel
            );
            saveOrder(this.orderModel).then((res) => {
              let orderId = res.data.id;
              if (!this.orderModel.cemeaddress) {
                this.$notify({
                  type: "warning",
                  message: "没有服务墓址，无法购买商品！",
                });
                setTimeout(() => {
                  saveMemoryMsg(this.msgModel);
                  this.$notify({
                    type: "success",
                    message: "留言提交成功！",
                  });
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
              this.$notify({
                type: "success",
                message: "留言提交成功！",
              });
              if (res.code === 0) {
                Object.assign(this.shopOrder, res.data);
                this.$notify({
                  type: "success",
                  message: "订单提交成功！",
                });
                console.log(res.data);
                if (res.data.payment) {
                  //打开支付二维码
                  // this.showPayQrcode = true
                  const wxPay =
                    this.baseUrl + "/pay/wxpay_page?orderId=" + orderId;
                  window.location.href = wxPay;
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
          this.$notify({
            type: "success",
            message: "留言提交成功！",
          });
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
    },
    // 商品列表
    _goodsList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      goodsList(this.model).then((res) => {
        this.$toast.clear();
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
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
.same {
  padding: 0 0.4rem;
  .sameList {
    padding-bottom: 0.5rem;
    .sameTitle {
      display: flex;
      justify-content: space-between;
      font-size: 0.32rem;
      line-height: 60px;
      height: 1.1rem;
      align-items: center;

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
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .checkListSelect {
        .buyRight {
          display: block;
        }
      }
      li {
        position: relative;
        margin-top: 0.2rem;
        width: 48%;
        height: 3.8rem;
        background-color: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(143, 143, 143, 0.5);
        border-radius: 0.1rem;
        box-sizing: border-box;
        text-align: center;
        img {
          height: 2.5rem;
          width: 100%;
          margin: 0.2rem auto;
        }
        .buyRight {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          background-color: #d54040;
          font-size: 0.3rem;
          line-height: 0.8rem;
          color: #ffffff;
          opacity: 0.8;
          text-align: center;
          font-weight: 400;
          width: 100%;
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
              font-size: 0.22rem;
            }
          }
        }
      }
    }
    .textarea {
      width: 100%;
      display: block;
      margin: 0 auto;
      overflow: hidden;

      background-color: #e1e1e1;
      position: fixed;
      bottom: 0rem;
      left: 0;
      .textarea-cont {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: transparent;
        h1 {
          text-align: center;
          color: #004930;
          font-size: 0.4rem;
          font-weight: normal;
          line-height: 1rem;
        }
        .text {
          /deep/ .van-field {
            border: 1px solid #004930;
          }
        }
        .button-group {
          padding-top: 0.22rem;
          padding-bottom: 0.22rem;
          display: flex;
          flex-direction: row-reverse;
          width: 90%;
          margin: 0 auto;
          .btn-submit {
            width: 1.8rem;
            height: 0.6rem;
            border-radius: 0.21rem;
            font-size: 0.2rem;
            margin-left: 0.2rem;
            background-color: #004930 !important;
            color: #fff;
          }
          .btn-cancel {
            border: 0.04rem solid #004930 !important;
            color: #004930;
            width: 1.8rem;
            height: 0.6rem;
            border-radius: 0.21rem;
            font-size: 0.2rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
