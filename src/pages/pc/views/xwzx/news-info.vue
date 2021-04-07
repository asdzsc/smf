<template>
  <div class="newsInfo">
    <div class="cont">
      <div class="left">
        <div class="head">
          <div class="headTitle">公司新闻</div>
        </div>
        <div class="line"></div>
        <div class="title">
          {{ model.title }}
        </div>
        <div class="publishTime">
          <span v-if="model.author" style="padding-right: 20px">{{
            model.author
          }}</span>
          <span style="padding-right: 20px">{{ model.look }}阅读</span>
          <span>{{ parseTime(model.publishTime, "{y}.{m}.{d}") }}</span>
        </div>
        <div class="htmlContent" v-html="model.cont"></div>
      </div>
      <div class="right">
        <div class="head">
          <div class="headTitle">热门新闻</div>
        </div>
        <div class="line"></div>
        <div class="listContent">
          <div
            v-for="item in pageHot.list"
            :key="item.id"
            @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
            class="item"
          >
            <img :src="baseUrl + item.cover" :onerror="defImg" />
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <myserve></myserve>
  </div>
</template>

<script>
import { newsList, newsInfo } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    myserve: () => import("@/pages/pc/components/myserve.vue"),
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
  activated() {},
  mounted() {
    if (this.$route.query.id) {
      this.model.id = this.$route.query.id;
    }
    this._newsInfo();
    this._newsList();
  },
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
.video-js {
  margin: auto;
}

.newsInfo {
  .cont {
    max-width: 1200px;
    margin: auto;
    display: flex;
    padding-top: 40px;

    .head {
      border-left: 4px solid #004930;
      height: 32px;

      .headTitle {
        padding-left: 15px;
        line-height: 32px;
        font-size: 18px;
        font-weight: 700;
        color: #999999;
      }
    }

    .line {
      margin-top: 5px;
      height: 2px;
      background-color: #d6d6d6;
    }

    .left {
      width: 880px;

      .title {
        margin-top: 50px;
        text-align: center;
        font-size: 28px;
        color: #004930;
      }

      .publishTime {
        margin-top: 25px;
        text-align: center;
        font-size: 18px;
        color: #666666;
      }

      .htmlContent {
        padding: 45px 0px;

        /deep/ img {
          max-width: 100% !important;
        }
      }
    }

    .right {
      flex: 1;
      padding-left: 80px;

      .listContent {
        margin-top: 35px;

        .item {
          cursor: pointer;

          img {
            width: 227px;
            height: 158px;
          }

          .title {
            padding-top: 10px;
            font-size: 14px;
            color: #999999;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            display: -webkit-box;
          }

          margin-top: 30px;
        }
      }
    }
  }
}
</style>
