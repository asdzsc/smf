<template>
  <div class="zbggInfo">
    <xwzxTitle title="招标广告"></xwzxTitle>
    <div class="line"></div>
    <div class="top">
      <div class="topTitle">
        <div class="title">
          {{ model.title }}
        </div>
        <div class="zbNo">（招标编号：{{ model.zbNo }}）</div>
      </div>
      <div v-if="model.isCont === '0'" class="pdf">
        <pdf
          :src="getPdfFile(model.pdfFile)"
          :page="currentPage"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        ></pdf>
      </div>
      <div v-if="model.isCont === '0'" class="pdfPage">
        <span @click="changePdfPage(0)">上一页</span>
        <span style="padding: 0px 20px"
          >{{ currentPage }} / {{ pageCount }}</span
        >
        <span @click="changePdfPage(1)"> 下一页</span>
      </div>
      <div v-else class="htmlContent" v-html="model.cont"></div>
    </div>
    <div class="bottom">
      <xwzxTitle title="热门招标"></xwzxTitle>
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
              <span v-if="model.author" style="padding-right: 0.2rem">{{
                model.author
              }}</span>
              <span style="padding-right: 0.2rem"> {{ model.look }}阅读</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xwzxTitle from "./components/xwzx-title.vue";
import pdf from "vue-pdf";
import { newsZbggList, newsZbggInfo } from "@/pages/mobile/api/news";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  components: {
    xwzxTitle,
    pdf,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      model: {
        id: "",
        title: "",
      },
      pageHot: {
        current: 1,
        pageSize: 10,
        searchText: "",
        isHot: "true",
        list: [],
      },
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.model.id = this.$route.query.id;
    }
    this._newsZbggInfo();
    this._newsZbggList();
  },
  methods: {
    _newsZbggInfo() {
      if (this.model.id) {
        newsZbggInfo({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            utils.setTitle(this.model.title);
            this.loadPdfHandler();
          }
        });
      }
    },
    _newsZbggList() {
      newsZbggList(this.pageHot).then((res) => {
        if (res.code === 0) {
          Object.assign(this.pageHot, res.data);
        }
      });
    },
    getPdfFile(filePath) {
      return this.baseUrl + "/readFile?fileName=" + filePath;
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
.zbggInfo {
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

      .title {
        color: #004930;
        font-size: 0.35rem;
      }
      .zbNo {
        margin-top: 0.25rem;
        font-size: 0.25rem;
        color: #666666;
      }
    }
    .htmlContent {
      padding: 0.45rem 0px;
      width: 100%;
    }
    .pdf {
      margin-top: 45px;
      border: 1px solid #ededed;
    }

    .pdfPage {
      text-align: center;
      margin-bottom: 50px;
      margin-top: 20px;
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
