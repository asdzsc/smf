<template>
  <div class="main">
    <div class="tabCheck">
      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="book" />
            新闻
          </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <a-empty v-if="modelNews.list.length === 0" />
                <div
                  v-for="item in modelNews.list"
                  :key="item.id"
                  @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
                  class="item"
                >
                  <div class="newsImg">
                    <img :src="baseUrl + item.cover" :onerror="defImg" />
                  </div>
                  <div class="intro">
                    <div class="introTitle">{{ item.title }}</div>
                    <div class="introCont" v-html="item.intro"></div>
                    <div class="dtime">
                      发布时间：{{ parseTime(item.publishTime, "{y}-{m}-{d}") }}
                    </div>
                  </div>
                </div>
              </div>
            </a-spin>
            <paging ref="paging" @setPage="setPage"></paging>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab"> <a-icon type="shop" />商品 </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <a-empty v-if="modelShop.list.length === 0" />
                <div
                  class="item"
                  v-for="item in modelShop.list"
                  :key="item.id"
                  @click="openGoodsInfo(item)"
                >
                  <div class="newsImg">
                    <img :src="getGoodsImg(item.cover)" :onerror="defImg" />
                  </div>
                  <div class="intro">
                    <div class="introTitle">{{ item.title }}</div>
                    <div class="introCont" v-html="item.cont"></div>
                    <div class="dtime">价格：¥ {{ goodsPrice(item) }}</div>
                  </div>
                </div>
              </div>
            </a-spin>
            <pagingShop ref="pagingShop" @setPage="setPageShop"></pagingShop>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="solution" />
            个人主页
          </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <a-empty v-if="model.list.length === 0" />
                <div
                  class="item"
                  v-for="item in model.list"
                  :key="item.id"
                  @click="handleClick(item.id)"
                >
                  <div class="newsImg">
                    <img :src="baseUrl + item.photo" :onerror="defImg" />
                  </div>
                  <div class="intro">
                    <div class="introTitle">{{ item.name }}</div>
                    <div class="introCont">
                      {{ item.intro }}
                    </div>
                    <div class="dtime">纪念次数： {{ item.msgNum }}次</div>
                  </div>
                </div>
              </div>
            </a-spin>
            <pagingMark ref="pagingMark" @setPage="setPageMark"></pagingMark>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { newsList } from "@/pages/pc/api/news";
import { memoryList } from "@/pages/pc/api/mark.js";
import { goodsList } from "@/pages/pc/api/shop";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    pagingShop: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    pagingMark: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      xhAllList: [],
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
      modelNews: {
        current: "1",
        pageSize: "8",
        articleType: "1", //新闻类型
        columnId: "443278534481465344", //栏目id
        total: "0",
        list: [],
        searchText: "",
      },
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
    this._memoryList();
    this.getXhList();
  },
  methods: {
    handleClick(id) {
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: id,
        },
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
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
      this.loading = true;
      newsList(this.modelNews).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.modelNews, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.modelNews);
          }, 200);
        }
      });
    },
    _memoryList() {
      this.loading = true;
      memoryList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.pagingMark.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    getXhList() {
      this.loading = true;
      goodsList(this.modelShop).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.modelShop, res.data);
          setTimeout(() => {
            this.$refs.pagingShop.setPageInfo(this.modelShop);
          }, 200);
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
    setPage(pageNum) {
      this.modelNews.current = pageNum;
      this._newsList();
    },
    setPageMark(pageNum) {
      this.model.current = pageNum;
      this._memoryList();
    },
    setPageShop(pageNum) {
      this.modelShop.current = pageNum;
      this.getXhList();
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  width: 1200px;
  margin: auto;
  .tabCheck {
    margin: 30px 0;
    /deep/ .ant-tabs-nav .ant-tabs-tab-active {
      color: #004930;
      font-weight: 500;
    }
    /deep/.ant-tabs-nav .ant-tabs-tab:hover {
      color: #004930;
    }
    /deep/.ant-tabs-ink-bar {
      background-color: #004930;
    }
    .cont {
      width: 1200px;
      margin: auto;

      .list {
        margin-bottom: 50px;

        .item {
          display: flex;
          margin-top: 60px;
          cursor: pointer;

          .newsImg {
            width: 280px;
            height: 195px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .intro {
            padding-left: 60px;
            flex: 1;
            margin-top: 20px;
            position: relative;

            .introTitle {
              font-family: MicrosoftYaHei;
              font-size: 28px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #004930;
              line-height: 30px;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              display: -webkit-box;
            }

            .introCont {
              margin-top: 25px;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              color: #666666;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
            }

            .dtime {
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #666666;
              position: absolute;
              bottom: 0px;
            }
          }
        }
      }
    }
  }
}
</style>
