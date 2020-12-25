<template>
  <div class="newsInfo">
    <xwzxTitle title="公司新闻"></xwzxTitle>
    <div class="line"></div>
    <div class="top">
      <div class="topTitle">
        <p class="articleTitle">{{ model.title }}</p>
        <p class="author">
          <span v-if="model.author" style="padding-right: .2rem;">{{
            model.author
          }}</span>
          <span style="padding-right: .2rem;">{{ model.look }}阅读</span>
          <span>{{ parseTime(model.publishTime, "{y}.{m}.{d}") }}</span>
        </p>
      </div>
      <div class="htmlContent" v-html="model.cont"></div>
    </div>
    <div class="bottom">
      <xwzxTitle title="热门新闻"></xwzxTitle>
      <div class="line"></div>
      <div class="listContent">
        <div
          v-for="item in pageHot.list"
          :key="item.id"
          @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
          class="item"
        >
          <img :src="baseUrl + item.cover" :onerror="defImg" />
          <div class="title">
            <p class="nameTitle">{{ item.title }}</p>
            <p>
              <span v-if="model.author" style="padding-right: .2rem;">{{
                model.author
              }}</span>
              <span style="padding-right: .2rem;"> {{ model.look }}阅读</span>
              <span>{{ parseTime(model.publishTime, "{y}.{m}.{d}") }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xwzxTitle from "./components/xwzx-title.vue";
import { newsList, newsInfo } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    xwzxTitle,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      model: {
        id: "",
        title: "",
      },
      pageHot: {
        current: 1,
        pageSize: 10,
        articleType: "1",
        searchText: "",
        status: "1",
        columnId: "",
        isHot: "true",
        list: [],
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.model.id = this.$route.query.id;
    }
    this._newsInfo();
    this._newsList();
  },
  methods: {
    _newsInfo() {
      if (this.model.id) {
        newsInfo({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            utils.setTitle(this.model.title);
          }
        });
      }
    },
    _newsList() {
      newsList(this.pageHot).then((res) => {
        if (res.code === 0) {
          Object.assign(this.pageHot, res.data);
        }
      });
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
.newsInfo {
  .line {
    margin-top: 5px;
    height: 2px;
    background-color: #d6d6d6;
    width: 89.5%;
    margin: 0 auto;
  }
  .top {
    width: 89.5%;
    margin: 0 auto;
    margin-top: 0.5rem;
    .topTitle {
      text-align: center;

      .articleTitle {
        color: #004930;
        font-size: 0.35rem;
      }
      .author {
        margin-top: 0.25rem;
        font-size: 0.25rem;
        color: #666666;
      }
    }
    .htmlContent {
      padding: 0.45rem 0px;
      width: 100%;
      /deep/ p,
      span {
        font-size: 0.3rem !important;
        width: 100% !important;
        text-align: justify;
      }
      /deep/ img {
        max-width: 100%;
      }
    }
  }
  .bottom {
    .listContent {
      margin-top: 0.35rem;
      width: 89.5%;
      margin: 0 auto;
      .item {
        cursor: pointer;
        display: flex;
        margin-top: 0.3rem;
        img {
          width: 2.26rem;
          height: 1.76rem;
        }

        .title {
          padding-left: 0.2rem;
          font-size: 0.3rem;
          color: #999999;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .nameTitle {
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            display: -webkit-box;
          }
        }
      }
    }
  }
}
</style>
