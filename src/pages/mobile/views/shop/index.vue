<template>
  <div class="index">
    <van-tabs v-model="active" color="#004930" scrollspy sticky>
      <div
        class="banner"
        v-for="item in banners"
        :key="item.id"
        @click="openUrl(item.phoneUrl)"
      >
        <img :src="baseUrl + item.phoneImg" alt="" />
      </div>
      <div class="contHead">
        <div class="contTitle">VR720°实景选墓</div>
        <a
          href="http://vr100.jsfq.net:19999/tour/65aece4b2f2d4cea"
          target="_blank"
        >
          <div class="more">查看更多</div>
        </a>
      </div>
      <!-- vr实景选墓 start -->
      <div class="vrxuanmu">
        <a
          href="http://vr100.jsfq.net:19999/tour/65aece4b2f2d4cea"
          target="_blank"
        >
          <div class="xuanbeiBox">
            <div class="item">
              <img src="/img/mobile/mubei1.jpg" />
              <div class="name">明星产品</div>
              <div class="intr">最畅销精简设计的纪念碑</div>
              <div class="price">
                <!-- ￥999 -->
              </div>
            </div>
            <div class="item">
              <img src="/img/mobile/mubei2.jpg" />
              <div class="name">经典立式</div>
              <div class="intr">精品典雅纪念碑</div>
              <div class="price">
                <!-- ￥999 -->
              </div>
            </div>
            <div class="item">
              <img src="/img/mobile/mubei3.jpg" />
              <div class="name">经典卧式</div>
              <div class="intr">宝石精品纪念碑</div>
              <div class="price">
                <!-- ￥999 -->
              </div>
            </div>
          </div>
        </a>
      </div>
      <!-- vr实景选墓 end -->
      <!-- 鲜花推荐 start-->
      <van-tab :title="'鲜花推荐'">
        <div class="contHead">
          <div class="contTitle">鲜花推荐</div>
          <div
            class="more"
            @click="$router.push('/shop/goodsList?cid=445465710975700992')"
          >
            查看更多
          </div>
        </div>
        <ul class="xhtj" v-if="xhAllList.length > 0">
          <li
            v-for="item in xhAllList"
            :key="item.id"
            @click="openGoodsInfo(item)"
            class="v_item"
          >
            <img :src="getGoodsImg(item.cover)" :onerror="defImg" alt="" />
            <div class="b_box">
              <div class="cont">
                <p class="name">{{ item.title }}</p>
                <p class="price">¥ {{ goodsPrice(item) }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="div" v-else>
          <van-empty description="暂无数据" />
        </div>
      </van-tab>
      <!-- 鲜花推荐 end-->
      <!-- 代客祭扫 start -->
      <van-tab :title="'代客祭扫'">
        <div class="contHead">
          <div class="contTitle">代客祭扫</div>
          <!-- <div class="more">查看更多</div> -->
          <div
            class="more"
            @click="$router.push('/shop/goodsList?cid=451643107446018048')"
          >
            查看更多
          </div>
        </div>
        <ul class="xhtj dkjs" v-if="dkjsList.length > 0">
          <li
            class="v_item"
            v-for="item in dkjsList"
            :key="item.id"
            @click="openGoodsInfo(item)"
          >
            <img :src="getGoodsImg(item.cover)" alt="" />
            <div class="b_box">
              <div class="cont">
                <p class="name">{{ item.title }}</p>
                <p class="price">¥ {{ goodsPrice(item) }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="div" v-else>
          <van-empty description="暂无数据" />
        </div>
      </van-tab>
      <!-- 代客祭扫 end -->
      <!-- 礼仪服务 start-->
      <van-tab :title="'礼仪服务'">
        <div class="contHead">
          <div class="contTitle">礼仪服务</div>
          <div
            class="more"
            @click="$router.push('/shop/goodsList?cid=445465805926354944')"
          >
            查看更多
          </div>
        </div>
        <van-swipe
          @change="onChange"
          autoplay="5000"
          v-if="lyfwList.length > 0"
        >
          <van-swipe-item
            v-for="item in lyfwList"
            :key="item.id"
            @click="openGoodsInfo(item)"
          >
            <div class="lyfw">
              <img
                @click="openGoodsInfo(item)"
                :src="getGoodsImg(item.cover)"
                alt=""
              />
              <div class="cont">
                <div class="title">{{ item.title }}</div>
                <div class="desc">
                  {{ item.intro ? item.intro : "暂无描述" }}
                </div>
              </div>
              <div class="buy">
                <div class="price">￥{{ goodsPrice(item) }}</div>
                <div class="btn" @click.stop="openGoodsInfo(item)">
                  立即购买
                </div>
              </div>
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/ {{ lyfwList.length }}
            </div>
          </template>
        </van-swipe>
        <div class="div" v-else>
          <van-empty description="暂无数据" />
        </div>
      </van-tab>
      <!-- 礼仪服务 end-->
    </van-tabs>
  </div>
</template>

<script>
import { bannerList, goodsList } from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      active: 0,
      list: [
        {
          title: "公告中心",
        },
        {
          title: "新闻动态",
        },
        {
          title: "招标广告",
        },
      ],
      columnList: [],
      banners: [],
      xhAllList: [],
      dkjsList: [],
      lyfwList: [],
      current: 0,
    };
  },
  computed: {
    cartNum() {
      return this.$store.state.account.cartNum;
    },
    lyfwInfo() {
      if (this.lyfwIndex >= 0) {
        return this.lyfwList[this.lyfwIndex];
      } else {
        return {
          id: "",
          title: "",
          intro: "",
          isSpec: "0",
          price: 0,
        };
      }
    },
  },
  mounted() {
    this._bannerList();
    //鲜花推荐
    this.getXhList();
    //代客祭扫
    this.getDkjsList();
    //礼仪服务
    this.getLyfwList();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    _bannerList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      bannerList({
        bannerType: "2",
      }).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          this.banners = res.data;
        }
      });
    },
    //鲜花推荐
    getXhList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      goodsList({
        current: 1,
        pageSize: 6,
        status: "1",
        columnId: "445465710975700992",
      }).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          this.xhAllList = res.data.list;
          if (this.xhAllList.length > 0) {
            this.xhMainInfo = this.xhAllList[0];
          }
          if (this.xhAllList.length >= 2) {
            this.xhList = [...this.xhAllList];
            this.xhList.splice(0, 1);
          }
        }
      });
    },
    // 代客祭扫
    getDkjsList() {
      goodsList({
        current: 1,
        pageSize: 6,
        status: "1",
        columnId: "451643107446018048",
      }).then((res) => {
        if (res.code === 0) {
          this.dkjsList = res.data.list;
        }
      });
    },
    // 礼仪服务
    getLyfwList() {
      goodsList({
        current: 1,
        pageSize: 10,
        status: "1",
        columnId: "445465805926354944",
      }).then((res) => {
        if (res.code === 0) {
          this.lyfwList = res.data.list;
          if (this.lyfwList.length > 0) {
            this.lyfwIndex = 0;
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
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
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
    //立即购买
    openConfirmOrder(goodsInfo) {
      if (goodsInfo.id) {
        this.$router.push({
          path: "/shop/order/confirmOrder",
          query: {
            gid: goodsInfo.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  .banner {
    height: 4rem;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .contHead {
    display: flex;
    justify-content: space-between;
    margin: 0.3rem 0.3rem 0.21rem 0.14rem;

    .contTitle {
      height: 0.41rem;
      font-family: SourceHanSansCN-Bold;
      font-size: 0.32rem;
      letter-spacing: 1px;
      color: #666666;
      padding-left: 0.16rem;
      border-left: 8px solid #004930;
    }

    .more {
      line-height: 0.41rem;
      font-size: 0.22rem;
      color: #999999;
    }
  }

  .vrxuanmu {
    margin: auto 0.14rem;
    position: relative;

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

        .name {
          font-size: 0.3rem;
          color: #333333;
          margin-top: 0.1rem;
          font-weight: 700;
        }

        .intr {
          font-size: 0.3rem;
          color: #999999;
          font-size: 0.2rem;
          font-weight: 500;
          margin-top: 0.14rem;
        }

        .price {
          color: #d54040;
          margin-top: 0.1rem;
        }

        img {
          width: 3rem;
          height: 3.3rem;
          display: block;
          object-fit: cover;
        }
      }
    }
  }

  .xhtj {
    margin: auto 0.14rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .v_item {
      width: 3.52rem;
      position: relative;
      margin-top: 0.2rem;

      img {
        width: 100%;
        height: 4rem;
      }

      .b_box {
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

      img {
        height: 2.6rem;
      }

      .b_box {
        width: 100%;
        background-color: #fff;
        height: 1.2rem;
        opacity: inherit;

        .cont {
          display: flex;
          height: 100%;
          flex-direction: column;
          justify-content: space-around;
          .name {
            font-size: 0.3rem;
            color: #333;
            line-height: 0.4rem;
          }

          .price {
            color: #d54040;
            line-height: 0.2rem;
            font-size: 0.22rem;
          }
        }
      }
    }
  }

  .custom-indicator {
    right: 1%;
    bottom: 43%;
    font-size: 0.5rem;
    color: #fff;
  }

  .lyfw {
    margin: auto 0.14rem;
    padding-bottom: 0.2rem;
    margin-bottom: 0.2rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(143, 143, 143, 0.5),
      0px 0px 10px 0px rgba(143, 143, 143, 0.5);

    img {
      width: 100%;
      height: 4.2rem;
    }

    .cont {
      width: 95%;
      margin: 0 auto;

      .title {
        font-size: 0.32rem;
        line-height: 0.5rem;
        font-weight: bold;
        color: #004930;
        margin-top: 0.2rem;
      }

      .desc {
        font-size: 0.22rem;
        font-weight: normal;
        margin-top: 0.2rem;
        letter-spacing: 1px;
        color: #666666;
      }
    }

    .buy {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;
      margin: 0 auto;
      margin-top: 0.2rem;
      .price {
        color: #d54040;
        font-size: 0.22rem;
        line-height: 0.2rem;
      }

      .btn {
        width: 2.2rem;
        height: 0.6rem;
        background-color: #004930;
        border-radius: 30px;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
      }
    }
  }
}
</style>
