<template>
  <div class="container">
    <div class="cont" v-html="model.cont"></div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "tabinfo",
  props: {
    model: {
      type: Object,
      default() {
        return { tabType: "", cont: "", housesImgs: [] };
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  mounted() {},
  methods: {
    openImg(index) {
      if (this.model.housesImgs && this.model.housesImgs.length > 0) {
        var imgList = this.model.housesImgs.map(x => {
          return this.baseUrl + x;
        });
        ImagePreview({
          images: imgList,
          startPosition: index,
          closeable: true,
          onClose() {
            // do something
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0.2rem;
  padding-bottom: 1rem;
  .houses {
    padding: 0.2rem 0.5rem;
    line-height: 0.6rem;
    .houses-title {
      font-weight: bold;
      color: #333333;
    }
  }

  .houses-img-list {
    width: 100%;
    white-space: nowrap;
    overflow: auto;
    margin-bottom: 0.2rem;
    .houses-img {
      width: 2.5rem;
      height: 1.6rem;
      margin-right: 0.1rem;
    }
  }
  .cont {
    /deep/ img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
