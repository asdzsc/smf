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
<<<<<<< HEAD
import { newsList, newsInfo } from "@/pages/mobile/api/news";
import * as utils from "@/pages/mobile/libs/utils";
=======
import { newsList, newsInfo } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.id != from.query.id) {
        this.model.id = to.query.id;
        this._newsInfo();
        this._newsList();
      }
    },
  },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
/deep/ .video-js {
  margin: auto;
}

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
.newsInfo {
  .line {
    margin-top: 5px;
    height: 2px;
    background-color: #d6d6d6;
    width: 89.5%;
    margin: 0 auto;
  }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  .top {
    width: 89.5%;
    margin: 0 auto;
    margin-top: 0.5rem;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .topTitle {
      text-align: center;

      .articleTitle {
        color: #004930;
        font-size: 0.35rem;
      }
<<<<<<< HEAD

      .author {
        margin-top: 0.25rem;
        font-size: 0.3rem;
        color: #666666;
      }
    }

    .htmlContent {
      padding: 0.45rem 0px;
      width: 100%;

      /deep/ p {
        font-size: 0.3rem !important;
        line-height: 1.6;
        width: 100% !important;
        text-align: justify;
        // text-indent: 0px !important;
      }

      /deep/ span {
        font-size: 0.3rem !important;
        line-height: 1.6;
        width: 100% !important;
        text-align: justify;

        margin-top: 0.2rem;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
          Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", miui,
          "Hiragino Sans GB", "Microsoft Yahei", sans-serif !important;
      }

      /deep/ img {
        max-width: 100% !important;
      }
    }
  }

  .bottom {
    padding-bottom: 0.5rem;

=======
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
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .listContent {
      margin-top: 0.35rem;
      width: 89.5%;
      margin: 0 auto;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .item {
        cursor: pointer;
        display: flex;
        margin-top: 0.3rem;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
