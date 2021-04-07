<template>
  <div class="newsInfo">
    <div class="cont">
      <div class="left">
        <div class="title">
          {{ model.title }}
        </div>
        <!-- <div class="publishTime">
					<span v-if="model.author" style="padding-right: 20px;">{{ model.author }}</span>
					<span style="padding-right: 20px;">{{model.look}}阅读</span>
					<span>{{ parseTime(model.publishTime,'{y}.{m}.{d}') }}</span>
				</div> -->
        <div class="htmlContent" v-html="model.cont"></div>
      </div>
    </div>
    <myserve></myserve>
  </div>
</template>

<script>
import { newsInfo } from "@/pages/pc/api/news";
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
    };
  },
  activated() {},
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
      width: 1200px;

      .title {
        // margin-top: 50px;
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
        text-align: justify; /*实现两端对齐*/
        text-justify: newspaper; /*通过增加或减少字或字母之间的空格对齐文本*/
        word-break: break-all; /*允许在单词内换行*/

        /deep/ img {
          max-width: 100% !important;
        }
      }
    }
  }
}
</style>
