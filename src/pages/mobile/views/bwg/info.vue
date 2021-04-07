<template>
  <div class="newsInfo">
    <div class="top">
      <div class="topTitle">
        <p class="articleTitle">{{ model.title }}</p>
        <!-- <p class="author">
					<span v-if="model.author" style="padding-right: .2rem;">{{
            model.author
          }}</span>
					<span style="padding-right: .2rem;">{{ model.look }}阅读</span>
					<span>{{ parseTime(model.publishTime, "{y}.{m}.{d}") }}</span>
				</p> -->
      </div>
      <div class="htmlContent" v-html="model.cont"></div>
    </div>
  </div>
</template>

<script>
import { newsInfo } from "@/pages/mobile/api/news";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      model: {
        id: "",
        title: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.model.id = this.$route.query.id;
    }
    this._newsInfo();
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
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .video-js {
  margin: auto;
}

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
        font-size: 0.3rem;
        color: #666666;
      }
    }

    /deep/ .htmlContent {
      padding: 0.45rem 0px;
      width: 100%;

      /deep/ p {
        font-size: 0.3rem !important;
        line-height: 1.6;
        width: 100% !important;
        text-align: justify;
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
}
</style>
