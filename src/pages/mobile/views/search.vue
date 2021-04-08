<template>
  <div class="main">
    <van-tabs v-model="active">
      <van-tab
        ><template #title> <van-icon name="newspaper-o" />新闻 </template>
        <div class="cont">
          <van-empty
            v-if="modelNews.list.length === 0"
            description="暂无数据"
          />
          <van-list
            v-else
            v-model="loadingNews"
            :finished="finishedNews"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="list">
              <div
                class="item"
                v-for="(item, id) in modelNews.list"
                :key="id"
                @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
              >
                <div class="newsImg">
                  <img :src="baseUrl + item.cover" :onerror="defImg" alt="" />
                </div>
                <div class="desc">
                  <div class="intro">
                    <div class="introTitle">{{ item.title }}</div>
                    <div class="introCont">
                      {{ item.intro }}
                    </div>
                  </div>
                  <div class="dtime">
                    发布时间：{{ parseTime(item.publishTime, "{y}-{m}-{d}") }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab
        ><template #title> <van-icon name="shop-collect-o" />商品 </template>
        <div class="cont">
          <van-empty
            v-if="modelShop.list.length === 0"
            description="暂无数据"
          />
          <van-list
            v-else
            v-model="loadingShop"
            :finished="finishedShop"
            finished-text="没有更多了"
            @load="onLoadShop"
          >
            <div class="list">
              <div
                class="item"
                v-for="item in modelShop.list"
                :key="item.id"
                @click="openGoodsInfo(item)"
              >
                <div class="newsImg">
                  <img
                    :src="getGoodsImg(item.cover)"
                    :onerror="defImg"
                    alt=""
                  />
                </div>
                <div class="desc">
                  <div class="intro">
                    <div class="introTitle">{{ item.title }}</div>
                    <div class="introCont" v-html="item.cont"></div>
                  </div>
                  <div class="dtime">价格：¥ {{ goodsPrice(item) }}</div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab
        ><template #title><van-icon name="description" />个人主页 </template>
        <div class="cont">
          <van-empty v-if="model.list.length === 0" description="暂无数据" />
          <van-list
            v-else
            v-model="loadingMark"
            :finished="finishedMark"
            finished-text="没有更多了"
            @load="onLoadMark"
          >
            <div
              class="list"
              v-for="item in model.list"
              :key="item.id"
              @click="$router.push('/mark/grjn/index?id=' + item.id)"
            >
              <div class="item">
                <div class="newsImg">
                  <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
                </div>
                <div class="desc">
                  <div class="intro">
                    <div class="introTitle">{{ item.name }}</div>
                    <div class="introCont">
                      {{ item.intro }}
                    </div>
                  </div>
                  <div class="dtime">纪念次数： {{ item.msgNum }}次</div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { newsList } from "@/pages/mobile/api/news";
import { goodsList } from "@/pages/mobile/api/shop";
import { memoryList } from "@/pages/mobile/api/mark.js";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      active: 0,
      loadingNews: false,
      loadingShop: false,
      loadingMark: false,
      finishedNews: false,
      finishedShop: false,
      finishedMark: false,
      xhAllList: [],
      // 个人主页
      model: {
        current: "1",
        pageSize: 8,
        searchText: "",
        status: "0",
        columnId: "",
        list: [],
        notId: [],
        total: "",
      },
      // 新闻
      modelNews: {
        current: "1",
        pageSize: "8",
        articleType: "1", //新闻类型
        columnId: "443278534481465344", //栏目id
        total: "0",
        list: [],
        searchText: "",
      },
      // 商品
      modelShop: {
        current: 1,
        pageSize: "8",
        status: "1",
        list: [],
        total: "",
        columnId: "445465710975700992",
        searchText: "",
      },
    };
  },
  watch: {
    "$store.state.account.searchKeyMain": function () {
      this.model.searchText = this.$store.state.account.searchKeyMain;
      this.modelNews.searchText = this.$store.state.account.searchKeyMain;
      this.modelShop.searchText = this.$store.state.account.searchKeyMain;
      this.search();
    },
  },
  mounted() {
    if (this.$store.state.account.searchKeyMain) {
      this.model.searchText = this.$store.state.account.searchKeyMain;
      this.modelNews.searchText = this.$store.state.account.searchKeyMain;
      this.modelShop.searchText = this.$store.state.account.searchKeyMain;
    }
    this._newsList();
    this.getXhList();
    this._memoryList();
  },
  methods: {
    onLoad() {
      this._newsList();
    },
    onLoadShop() {
      this.getXhList();
    },
    onLoadMark() {
      this._memoryList();
    },
    search() {
      this.model.list = [];
      this.model.notId = [];
      this.model.current = 0;
      this._memoryList();
      this.modelNews.list = [];
      this.modelNews.current = 0;
      this._newsList();
      this.modelShop.list = [];
      this.modelShop.current = 0;
      this.getXhList();
    },
    _newsList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loadingNews = true;
      newsList(this.modelNews).then((res) => {
        this.loadingNews = false;
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelNews.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelNews.current++;
          } else {
            this.finishedNews = true;
          }
        }
      });
    },
    _memoryList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loadingMark = true;
      memoryList(this.model).then((res) => {
        this.loadingMark = false;
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finishedMark = true;
          }
        }
      });
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
    //鲜花推荐
    getXhList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loadingShop = true;
      goodsList(this.modelShop).then((res) => {
        this.loadingShop = false;
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelShop.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelShop.current++;
          } else {
            this.finishedShop = true;
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
  },
};
</script>
<style lang="less" scoped>
.main {
  /deep/.van-icon {
    vertical-align: middle;
  }
  /deep/.van-tabs__line {
    background-color: #004930;
  }
  .cont {
    margin-top: 0.2rem;
    .list {
      .showLoading {
        position: absolute;
        left: 50%;
        top: 70%;
      }
      .item {
        display: flex;
        margin-bottom: 0.6rem;
        .newsImg {
          margin-left: 0.4rem;
          width: 2.83rem;
          height: 1.84rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          padding-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .dtime {
            font-size: 0.25rem;
            color: #666666;
          }
          .intro {
            .introTitle {
              width: 3.37rem;
              font-weight: bold;
              font-size: 0.3rem;
              color: #004930;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
            }

            .introCont {
              margin-top: 0.1rem;
              width: 3.61rem;
              font-size: 0.2rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.32rem;
              color: #666666;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
              /deep/ span {
                font-size: 0.28rem !important;
                font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
                  Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", miui,
                  "Hiragino Sans GB", "Microsoft Yahei", sans-serif !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>