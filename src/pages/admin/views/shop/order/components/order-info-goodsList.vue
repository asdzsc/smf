<template>
	<div>
		<div class="modelTitle">
			商品详情
		</div>
		<a-row type="flex" class="cardTitle">
			<a-col flex="auto">
				订单详情
			</a-col>
			<a-col flex="110px">
				数量
			</a-col>
			<a-col flex="110px">
				金额
			</a-col>
			<a-col flex="110px">
				状态
			</a-col>
		</a-row>

		<div class="card">
			<a-row type="flex" class="cartHead">
				<a-col class="orderNum">
					<span style="color:#aaa;">订单：</span>{{ shopOrder.orderNum }}
				</a-col>
				<a-col style="padding-left: 30px;">
					日期：{{ shopOrder.createDate }}
				</a-col>
				<a-col style="padding-left: 30px;">
					服务时间：{{ parseTime(shopOrder.serveTime) }}
				</a-col>
			</a-row>

			<table style="width: 100%; border-collapse:collapse;">
				<tr>
					<td>
						<a-row v-for="goodsItem in shopOrder.goodsList" :key="goodsItem.id" type="flex" class="cardBody">
							<a-col flex="100px" class="orderGoodsImg">
								<img class="goodsImg" :src="baseUrl + goodsItem.cover" :onerror="defImg" />
							</a-col>
							<a-col flex="auto" class="orderGoodsTitle">
								<div>{{ goodsItem.title }}</div>
								<div v-if="goodsItem.specVal" class="specVal">
									{{ goodsItem.specVal }}
								</div>
							</a-col>
							<a-col flex="110px" class="orderGoodsNum">
								x {{ goodsItem.goodsNum }}
							</a-col>
							<a-col flex="110px" class="orderGoodsPrice">
								{{ goodsTotalPriceText(goodsItem) }}
							</a-col>
						</a-row>
					</td>
					<td class="status" style="width: 110px;">
						<a-tag style="width:80px;" :color="orderStatusText(shopOrder.orderStatus).color">
							{{ orderStatusText(shopOrder.orderStatus).text }}
						</a-tag>
					</td>
				</tr>
			</table>
			<div class="totalMoney">
			  实付款：<span class="money">￥{{ formatMoney(shopOrder.payment) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import * as utils from "@/pages/admin/libs/utils";
	import * as shop from "@/comment/dictionary";
	export default {
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`
			}
		},
		mounted() {

		},
		methods: {
			orderStatusText(status) {
				return shop.orderStatusText(status);
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
					return ''
				}
			},
			formatMoney(money){
				return utils.formatMoney(money);
			}
		}
	}
</script>

<style lang="less" scoped>
	.modelTitle {
	  height: 48px;
	  background-color: #ebebeb;
	  font-size: 16px;
	  line-height: 48px;
	  color: #333333;
	  padding-left: 30px;
	}
	
	.cardTitle {
	  height: 40px;
	  background-color: #f5f5f5;
	  font-size: 12px;
	  line-height: 40px;
	  color: #333333;
	  text-align: center;
	}
	
	.card {
	  border: solid 1px #ebebeb;
	  margin-bottom: 10px;
	
	  &:last-child {
	    margin-bottom: 0px;
	  }
	
	  .cartHead {
	    height: 30px;
	    line-height: 30px;
	    // background-color: #f5f5f5;
	    padding: 0px 20px;
	    color: #aaa;
	    font-size: 12px;
	    border-bottom: 1px solid #ebebeb;
	
	    .orderNum {
	      color: #333333;
	    }
	  }
	
	  .cardBody {
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
	
	  .status {
	    height: 100%;
	    text-align: center;
	  }
	
	  .operation {
	    text-align: center;
	    cursor: pointer;
	    border-left: 1px solid #ebebeb;
	
	    .showInfo {
	      font-size: 12px;
	      color: #004930;
	    }
	
	    .comment {
	      font-size: 12px;
	      color: #666666;
	    }
	  }
	
	  .orderLog {
	    padding: 30px;
	    height: 180px;
	    overflow-y: auto;
	  }
	
	  .orderInfo {
	    height: 240px;
	
	    .orderInfoItem {
	      border-right: 1px solid #ebebeb;
	      padding: 30px;
	
	      &:last-child {
	        border-right: none;
	      }
	
	      .orderInfoItemTitle {
	        font-size: 16px;
	        line-height: 30px;
	        color: #333333;
	      }
	
	      .itemCont {
	        width: 100%;
	        border-collapse: collapse;
	        margin-top: 20px;
	
	        .lable {
	          width: 75px;
	          font-size: 14px;
	          color: #333333;
	          line-height: 30px;
	        }
	
	        .text {
	          font-size: 14px;
	          color: #666666;
	        }
	      }
	    }
	  }
	
		.totalMoney {
			border-top: 1px solid #ebebeb;
			padding: 10px 20px;
		  text-align: right;
		  font-size: 14px;
		  color: #333333;
		  line-height: 30px;
		
		  .money {
		    font-size: 20px;
		    font-weight: 700;
		    color: #d54040;
		  }
		}
	}
	
</style>
