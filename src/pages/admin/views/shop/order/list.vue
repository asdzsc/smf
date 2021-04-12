<template>
<<<<<<< HEAD
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <!-- <a-col style="padding-right:10px;">
=======
	<a-card>
		<div class="operator">
			<a-row type="flex" justify="start">
				<!-- <a-col style="padding-right:10px;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          <a-button @click="add()" type="primary" icon="plus">新增</a-button>
          &nbsp;
          <a-button @click="delAll()" icon="delete" type="danger"
            >批量删除</a-button
          >
        </a-col> -->
<<<<<<< HEAD
        <a-col style="padding-right: 10px">
          <a-range-picker
            :placeholder="['开始时间', '结束时间']"
            :allowClear="true"
            @change="onChangeDate"
            v-model="dtime"
            style="width: 200px"
          />
        </a-col>
        <a-col :span="5">
          <a-input-search
            v-model="pagination.searchText"
            placeholder="关键字搜索"
            :loading="loading"
            @search="onSearch"
            enterButton
          />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row type="flex" class="orderHead">
        <a-col flex="auto">订单详情</a-col>
        <a-col flex="100px">数量</a-col>
        <a-col flex="110px">金额</a-col>
        <a-col flex="450px">服务信息</a-col>
        <a-col flex="110px">状态</a-col>
        <a-col flex="150px">实付金额</a-col>
      </a-row>
      <div v-for="item in list" :key="item.id" class="orderItem">
        <a-row type="flex" class="orderItemHead">
          <a-col class="orderNum">
            <span style="color: #aaa">订单：</span>{{ item.orderNum }}
          </a-col>
          <a-col class="orderNum" style="padding-left: 30px">
            <span style="color: #aaa">ERP_ID：</span>{{ item.erpOrderId }}
          </a-col>
          <a-col style="padding-left: 30px">
            日期：{{ item.createDate }}
          </a-col>
          <a-col flex="auto" class="showInfo">
            <span
              v-if="item.isComment === '1'"
              style="padding-right: 20px; color: #0055aa"
              >【买家已评价】</span
            >
            <span
              v-if="item.isFeedback === '1'"
              style="padding-right: 20px; color: #0055aa"
              >【服务人员已反馈】</span
            >
            <a @click="openOrderInfo(item)">查看详情</a>
          </a-col>
        </a-row>
        <table style="width: 100%; border-collapse: collapse">
          <tr>
            <td>
              <a-row
                v-for="goodsItem in item.goodsList"
                :key="goodsItem.id"
                type="flex"
                class="orderBody"
              >
                <a-col flex="100px" class="orderGoodsImg">
                  <img
                    class="goodsImg"
                    :src="baseUrl + goodsItem.cover"
                    :onerror="defImg"
                  />
                </a-col>
                <a-col flex="auto" class="orderGoodsTitle">
                  <div>{{ goodsItem.title }}</div>
                  <div v-if="goodsItem.specVal" class="specVal">
                    {{ goodsItem.specVal }}
                  </div>
                </a-col>
                <a-col flex="100px" class="orderGoodsNum">
                  x {{ goodsItem.goodsNum }}
                </a-col>
                <a-col flex="110px" class="orderGoodsPrice">
                  {{ goodsTotalPriceText(goodsItem) }}
                </a-col>
              </a-row>
            </td>
            <td class="orderContacts" style="width: 450px">
              <table class="orderContactsCont">
                <tr>
                  <td class="lable">联系人：</td>
                  <td class="text">{{ item.contacts }}</td>
                </tr>
                <tr>
                  <td class="lable">联系电话：</td>
                  <td class="text">{{ item.mobile }}</td>
                </tr>
                <tr>
                  <td class="lable">服务时间：</td>
                  <td class="text">{{ parseTime(item.serveTime) }}</td>
                </tr>
                <tr>
                  <td class="lable">服务方式：</td>
                  <td class="text">{{ item.serveType }}</td>
                </tr>
                <tr>
                  <td class="lable">服务墓主：</td>
                  <td class="text">{{ item.bpname }}</td>
                </tr>
                <tr>
                  <td class="lable">服务墓址：</td>
                  <td class="text">{{ item.cemeaddress }}</td>
                </tr>
              </table>
            </td>
            <td class="status" style="width: 110px">
              <a-tag
                style="width: 80px"
                :color="orderStatusText(item.orderStatus).color"
              >
                {{ orderStatusText(item.orderStatus).text }}
              </a-tag>
            </td>
            <td class="money" style="width: 150px">
              <div style="font-size: 14px; font-weight: bold">
                ￥{{ formatMoney(item.payment) }}
              </div>
              <div>{{ item.payType }}</div>
            </td>
          </tr>
        </table>
      </div>
      <div style="text-align: right; padding-top: 10px">
        <a-pagination
          size="small"
          @change="onChange"
          @showSizeChange="onChange"
          :total="pagination.total"
          :pageSize="pagination.pageSize"
          :show-total="(total) => `共 ${total} 条`"
          show-size-changer
        />
      </div>
    </div>
    <orderInfo
      v-if="showInfo"
      :id="infoId"
      ref="orderInfo"
      @onClose="infoClose"
    ></orderInfo>
  </a-card>
</template>
<script>
import { orderList } from "@/pages/admin/api/shop/order";
import * as utils from "@/pages/admin/libs/utils";
import * as shop from "@/comment/dictionary";
export default {
  components: {
    orderInfo: () => import("@/pages/admin/views/shop/order/order-info"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      dtime: [],
      list: [],
      selectedRowKeys: [],
      pagination: {
        searchText: "",
        startTime: "",
        endTime: "",
        isAdmin: true,
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => {
          return `共 ${total} 条`;
        },
      },
      loading: false,
      showInfo: false,
      infoId: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onChangeDate(date, dateString) {
      this.pagination.startTime = dateString[0];
      this.pagination.endTime = dateString[1];
      this.onSearch();
    },
    //分页
    onChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.getList();
    },
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
      const pagination = { ...this.pagination };
      orderList(pagination).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    //商品小计
    goodsTotalPrice(item) {
      if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {
        // console.log("goodsTotalPrice")
      } else {
        item.goodsNum = 1;
      }
      var showGoodsPrice = item.price * item.goodsNum;
      return showGoodsPrice;
    },
    goodsTotalPriceText(item) {
      var showGoodsPrice = this.goodsTotalPrice(item);
      return utils.formatMoney(showGoodsPrice);
    },
    parseTime(time) {
      if (time) {
        return utils.parseTime(time, "{y}-{m}-{d}");
      } else {
        return "";
      }
    },
    formatMoney(money) {
      return utils.formatMoney(money);
    },
    orderStatusText(status) {
      return shop.orderStatusText(status);
    },
    openOrderInfo(item) {
      this.showInfo = true;
      this.infoId = item.id;
    },
    infoClose(res) {
      this.$nextTick(() => {
        this.showInfo = false;
      });
      if (res.code === 0) {
        this.onSearch();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}

.orderHead {
  height: 40px;
  background-color: #f5f5f5;
  font-size: 12px;
  line-height: 40px;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}

.orderItem {
  border: solid 1px #ebebeb;
  margin-bottom: 10px;

  .orderItemHead {
    height: 30px;
    line-height: 30px;
    background-color: #f5f5f5;
    padding: 0px 20px;
    color: #aaa;
    font-size: 12px;

    .orderNum {
      color: #333333;
    }

    .showInfo {
      text-align: right;
    }
  }

  .orderBody {
    border-bottom: 1px solid #ebebeb;

    &:last-child {
      border-bottom: none;
    }

    .orderGoodsImg {
      padding: 10px;

      .goodsImg {
        width: 100px;
        height: 100px;
      }
    }

    .orderGoodsTitle {
      padding: 10px;
      font-size: 14px;
      color: #333333;
      border-right: 1px solid #ebebeb;

      .specVal {
        font-size: 12px;
        line-height: 30px;
        color: #999999;
      }
    }

    .orderGoodsNum {
      text-align: center;
      font-weight: bold;
      line-height: 120px;
      border-right: 1px solid #ebebeb;
    }

    .orderGoodsPrice {
      text-align: center;
      font-weight: bold;
      line-height: 120px;
      border-right: 1px solid #ebebeb;
    }
  }

  .orderContacts {
    border-right: 1px solid #ebebeb;
    padding-left: 10px;

    .orderContactsCont {
      width: 100%;
      border-collapse: collapse;

      .lable {
        width: 75px;
        font-size: 12px;
        color: #333333;
        line-height: 25px;
      }

      .text {
        font-size: 12px;
        color: #666666;
      }
    }
  }

  .status {
    text-align: center;
    border-right: 1px solid #ebebeb;
  }

  .money {
    text-align: center;
  }
}
=======
				<a-col style="padding-right:10px;">
					<a-range-picker :placeholder="['开始时间', '结束时间']" :allowClear="true" @change="onChangeDate" v-model="dtime" style="width:200px;" />
				</a-col>
				<a-col :span="5">
					<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
					 enterButton />
				</a-col>
			</a-row>
		</div>
		<div>
			<a-row type="flex" class="orderHead">
				<a-col flex="auto">订单详情</a-col>
				<a-col flex="100px">数量</a-col>
				<a-col flex="110px">金额</a-col>
				<a-col flex="450px">服务信息</a-col>
				<a-col flex="110px">状态</a-col>
				<a-col flex="150px">实付金额</a-col>
			</a-row>
			<div v-for="item in list" :key="item.id" class="orderItem">
				<a-row type="flex" class="orderItemHead">
					<a-col class="orderNum">
						<span style="color:#aaa;">订单：</span>{{ item.orderNum }}
					</a-col>
					<a-col style="padding-left: 30px;">
						日期：{{ item.createDate }}
					</a-col>
					<a-col flex="auto" class="showInfo">
						<span v-if="item.isComment === '1'" style="padding-right: 20px; color: #0055AA;">【买家已评价】</span>
						<span v-if="item.isFeedback === '1'" style="padding-right: 20px; color: #0055AA;">【服务人员已反馈】</span>
						<a @click="openOrderInfo(item)">查看详情</a>
					</a-col>
				</a-row>
				<table style="width: 100%; border-collapse:collapse;">
					<tr>
						<td>
							<a-row v-for="goodsItem in item.goodsList" :key="goodsItem.id" type="flex" class="orderBody">
								<a-col flex="100px" class="orderGoodsImg">
									<img class="goodsImg" :src="baseUrl + goodsItem.cover" :onerror="defImg" />
								</a-col>
								<a-col flex="auto" class="orderGoodsTitle">
									<div>{{ goodsItem.title }}</div>
									<div v-if="goodsItem.specVal" class="specVal">
										{{ goodsItem.specVal }}
									</div>
								</a-col>
								<a-col flex="100px" class="orderGoodsNum">
									x {{ goodsItem.goodsNum }}
								</a-col>
								<a-col flex="110px" class="orderGoodsPrice">
									{{ goodsTotalPriceText(goodsItem) }}
								</a-col>
							</a-row>
						</td>
						<td class="orderContacts" style="width: 450px;">
							<table class="orderContactsCont">
								<tr>
									<td class="lable">联系人：</td>
									<td class="text">{{ item.contacts }}</td>
								</tr>
								<tr>
									<td class="lable">联系电话：</td>
									<td class="text">{{ item.mobile }}</td>
								</tr>
								<tr>
									<td class="lable">服务时间：</td>
									<td class="text">{{ parseTime(item.serveTime) }}</td>
								</tr>
								<tr>
									<td class="lable">服务方式：</td>
									<td class="text">{{ item.serveType }}</td>
								</tr>
								<tr>
									<td class="lable">服务墓主：</td>
									<td class="text">{{ item.bpname }}</td>
								</tr>
								<tr>
									<td class="lable">服务墓址：</td>
									<td class="text">{{ item.cemeaddress }}</td>
								</tr>
							</table>
						</td>
						<td class="status" style="width: 110px;">
							<a-tag style="width:80px;" :color="orderStatusText(item.orderStatus).color">
								{{ orderStatusText(item.orderStatus).text }}
							</a-tag>
						</td>
						<td class="money" style="width: 150px;">
							<div style="font-size: 14px; font-weight: bold;">
								￥{{ formatMoney(item.payment) }}
							</div>
							<div>{{ item.payType }}</div>
						</td>
					</tr>
				</table>
			</div>
			<div style="text-align: right; padding-top: 10px;">
				<a-pagination size="small" @change="onChange" @showSizeChange="onChange" :total="pagination.total" :pageSize="pagination.pageSize"
				 :show-total="total => `共 ${total} 条`" show-size-changer />
			</div>

		</div>
		<orderInfo v-if="showInfo" :id="infoId" ref="orderInfo" @onClose="infoClose"></orderInfo>
	</a-card>
</template>
<script>
	import {
		orderList
	} from "@/pages/admin/api/shop/order";
	import * as utils from "@/pages/admin/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		components: {
			orderInfo: () => import("@/pages/admin/views/shop/order/order-info")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				dtime: [],
				list: [],
				selectedRowKeys: [],
				pagination: {
					searchText: "",
					startTime: "",
					endTime: "",
					isAdmin: true,
					current: 1,
					pageSize: 10,
					total: 0,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				showInfo: false,
				infoId: ""
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			onChangeDate(date, dateString) {
				this.pagination.startTime = dateString[0];
				this.pagination.endTime = dateString[1];
				this.onSearch();
			},
			//分页
			onChange(page, pageSize) {
				this.pagination.current = page
				this.pagination.pageSize = pageSize
				this.getList();
			},
			onSearch() {
				this.pagination.current = 1;
				this.getList();
			},
			getList() {
				this.loading = true;
				this.selectedRowKeys = [];
				const pagination = { ...this.pagination
				};
				orderList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			//商品小计
			goodsTotalPrice(item) {
				if (typeof item.goodsNum === "number" && !isNaN(item.goodsNum)) {
					// console.log("goodsTotalPrice")
				} else {
					item.goodsNum = 1;
				}
				var showGoodsPrice = item.price * item.goodsNum;
				return showGoodsPrice;
			},
			goodsTotalPriceText(item) {
				var showGoodsPrice = this.goodsTotalPrice(item);
				return utils.formatMoney(showGoodsPrice);
			},
			parseTime(time) {
				return utils.parseTime(time, "{y}-{m}-{d}");
			},
			formatMoney(money) {
				return utils.formatMoney(money);
			},
			orderStatusText(status) {
				return shop.orderStatusText(status);
			},
			openOrderInfo(item) {
				this.showInfo = true;
				this.infoId = item.id
			},
			infoClose(res) {
				this.$nextTick(() => {
					this.showInfo = false;
				});
				if (res.code === 0) {
					this.onSearch();
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}

	.orderHead {
		height: 40px;
		background-color: #f5f5f5;
		font-size: 12px;
		line-height: 40px;
		color: #333333;
		text-align: center;
		margin-bottom: 20px;
	}

	.orderItem {
		border: solid 1px #ebebeb;
		margin-bottom: 10px;

		.orderItemHead {
			height: 30px;
			line-height: 30px;
			background-color: #f5f5f5;
			padding: 0px 20px;
			color: #aaa;
			font-size: 12px;

			.orderNum {
				color: #333333;
			}

			.showInfo {
				text-align: right;
			}
		}

		.orderBody {
			border-bottom: 1px solid #ebebeb;

			&:last-child {
				border-bottom: none;
			}

			.orderGoodsImg {
				padding: 10px;

				.goodsImg {
					width: 100px;
					height: 100px;
				}
			}

			.orderGoodsTitle {
				padding: 10px;
				font-size: 14px;
				color: #333333;
				border-right: 1px solid #ebebeb;

				.specVal {
					font-size: 12px;
					line-height: 30px;
					color: #999999;
				}
			}

			.orderGoodsNum {
				text-align: center;
				font-weight: bold;
				line-height: 120px;
				border-right: 1px solid #ebebeb;
			}

			.orderGoodsPrice {
				text-align: center;
				font-weight: bold;
				line-height: 120px;
				border-right: 1px solid #ebebeb;
			}
		}

		.orderContacts {
			border-right: 1px solid #ebebeb;
			padding-left: 10px;

			.orderContactsCont {
				width: 100%;
				border-collapse: collapse;

				.lable {
					width: 75px;
					font-size: 12px;
					color: #333333;
					line-height: 25px;
				}

				.text {
					font-size: 12px;
					color: #666666;
				}
			}
		}

		.status {
			text-align: center;
			border-right: 1px solid #ebebeb;
		}

		.money {
			text-align: center;
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
