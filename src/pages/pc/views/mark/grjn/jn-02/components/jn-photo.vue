<template>
  <div class="photos">
    <div class="title">
      <img src="/img/pc/02_star.png" alt="" />
      <p>纪念相册</p>
      <img src="/img/pc/02_star.png" alt="" />
    </div>
    <div class="photosInfo">
      <div class="img" v-for="item in this.model.list" :key="item.id">
        <img :src="baseUrl + item.url" :onerror="defImg" alt="" />
      </div>
      <photoPaging class="page" ref="paging" @setPage="setPage"></photoPaging>
    </div>
  </div>
</template>

<script>
import { memoryMediaList } from "@/pages/pc/api/mark.js";
import $ from "jquery";
export default {
  components: {
    photoPaging: () =>
      import("@/pages/pc/views/mark/components/photoPaging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',

      model: {
        isPage: true,
        current: 1,
        pageSize: 6,
        searchText: "",
        mediaType: "image",
        list: [],
        memoryId: this.$route.params.id,
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
          if (this.model.list.length <= 3) {
            $(".page").css("top", "0");
          } else {
            $(".page").css("top", "-295px");
          }
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
    color: #0d1351;
    text-align: center;
    margin: 50px 0;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
    }

    p {
      margin: 0 10px;
    }
  }
  .photosInfo {
    height: 520px;
    .img {
      display: inline-block;
      width: 340px;
      height: 240px;
      margin-top: 20px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
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
</style>
