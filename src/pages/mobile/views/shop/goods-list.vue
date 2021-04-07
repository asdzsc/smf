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
            @click="openGoodsInfo(item)"
            class="v_item"
          >
            <img :src="getGoodsImg(item.cover)" />
            <div class="b_box">
              <div class="cont">
                <p class="name">{{ item.title }}</p>
                <p class="price">¥ {{ goodsPrice(item) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
      <!-- <div class="div" v-else>
        <van-empty description="暂无数据" />
      </div> -->
      <!-- 相似商品 end-->
    </div>
  </div>
</template>

<script>
import {
  goodsColumnList,
  getGoodsColumnInfo,
  goodsList,
} from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      columnInfo: {
        name: "全部商品",
      },
      model: {
        current: 1,
        pageSize: 8,
        columnId: "", //栏目id
				status: '1',
        total: 0,
        list: [],
      },
    };
  },
  mounted() {
    if (this.$route.query.cid) {
      this.model.columnId = this.$route.query.cid;
    }
    this._getGoodsColumnInfo();
    this._goodsList();
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
    onLoad() {
      this._goodsList();
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
    //商品详情
    openGoodsInfo(goodsInfo) {
      if (goodsInfo.id) {
        this.$router.push({
          path: "/shop/goodsInfo",
          query: {
            id: goodsInfo.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.same {
  .sameList {
    padding-bottom: 0.5rem;

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
</style>
