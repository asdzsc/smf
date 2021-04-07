<template>
  <div class="photos">
    <div class="title">
      <p>纪</p>
      <p>念</p>
      <p>相</p>
      <p>册</p>
    </div>
    <a-spin size="large" tip="加载中..." :spinning="loading">
      <a-icon
        slot="indicator"
        type="loading"
        style="font-size: 30px; color: #004930;"
        spin
      />
      <div class="photosInfo" v-if="this.model.list != ''">
        <viewer class="viewer" :images="this.model.list">
          <img
            v-for="item in this.model.list"
            :key="item.id"
            :src="baseUrl + item.url"
            :onerror="defImg"
            alt=""
          />
        </viewer>
        <photoPaging class="page" ref="paging" @setPage="setPage"></photoPaging>
      </div>
      <div v-else><a-empty /></div>
    </a-spin>
  </div>
</template>

<script>
import { memoryMediaList } from "@/pages/pc/api/mark.js";

export default {
  props: {
    //数据
    bannerModel: {
      //type 接收的数据类型
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    photoPaging: () =>
      import("@/pages/pc/views/mark/components/photoPaging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {
        isPage: true,
        current: 1,
        pageSize: 6,
        searchText: "",
        mediaType: "image",
        list: [],
        memoryId: this.bannerModel.id,
      },
    };
  },
  mounted() {
    this._memoryMediaList();
  },
  methods: {
    _memoryMediaList() {
      this.loading = true;
      memoryMediaList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);

          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._memoryMediaList();
    },
  },
};
</script>

<style lang="less" scoped>
.photos {
  width: 1200px;
  margin: 30px auto;
  margin-top: 80px;

  .title {
    font-size: 40px;
    color: #d64f4e;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 50px auto;
    margin-top: 100px;
    display: flex;
    p {
      background-image: url("/img/pc/09_title.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 50px;
      height: 50px;
    }
  }

  .photosInfo {
    .viewer {
      height: 520px;
      position: relative;
      img {
        display: inline-block;
        width: 340px;
        height: 240px;
        margin-top: 20px;
        margin-right: 20px;
        &:nth-child(3) {
          width: 460px;
          height: 240px;
          margin-right: 0;
        }
        &:nth-child(4) {
          width: 460px;
          height: 240px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
