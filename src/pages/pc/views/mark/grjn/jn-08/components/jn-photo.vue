<template>
  <div class="photos">
    <div class="title">
      <p>纪念相册</p>
    </div>
    <div class="photosInfo" v-if="this.model.list != ''">
      <div class="img" v-for="item in this.model.list" :key="item.id">
        <viewer class="viewer">
          <img :src="baseUrl + item.url" :onerror="defImg" alt="" />
        </viewer>
      </div>
      <photoPaging class="page" ref="paging" @setPage="setPage"></photoPaging>
    </div>
    <div v-else><a-empty /></div>
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
    color: #343437;
    height: 110px;
    width: 350px;
    line-height: 110px;
    text-align: center;
    margin: 50px auto;
    margin-top: 100px;
    background-image: url("/img/pc/08_title.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .photosInfo {
    height: 520px;
    .img {
      display: inline-block;
      width: 340px;
      height: 240px;
      margin-top: 20px;
      margin-right: 20px;
      .viewer {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
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
