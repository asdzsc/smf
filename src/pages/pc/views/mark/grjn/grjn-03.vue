<template>
  <div class="grjn">
    <img class="bannerImg" src="/img/pc/03_03.png" alt="" />
    <jn-banner :bannerModel="this.model"></jn-banner>
    <jn-photo :bannerModel="this.model" v-if="photoTag"></jn-photo>
    <jn-message
      :bannerModel="this.model"
      ref="myChild"
      @videoMore="videoMore"
      v-if="msgTag"
    ></jn-message>
    <div class="moreBtn" v-if="hideTag" @click="msgMore()">
      更多留言
    </div>
    <jn-article
      :bannerModel="this.model"
      ref="myChild"
      v-if="articleTag"
      @videoMore="videoMore"
    ></jn-article>
    <div class="moreBtn" v-if="hideTag" @click="articleMore()">
      更多文章
    </div>
    <jn-video
      :bannerModel="this.model"
      ref="myChild"
      v-if="videoTag"
      @videoMore="videoMore"
    ></jn-video>
    <div class="moreBtn" v-if="hideTag" @click="videoMore()">
      更多视频
    </div>
    <img class="img" v-if="imgTag" src="/img/pc/03_0.png" alt="" />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  components: {
    jnPhoto: () =>
      import("@/pages/pc/views/mark/grjn/jn-03/components/jn-photo.vue"),
    jnBanner: () =>
      import("@/pages/pc/views/mark/grjn/jn-03/components/jn-banner.vue"),
    jnMessage: () =>
      import("@/pages/pc/views/mark/grjn/jn-03/components/jn-message.vue"),
    jnArticle: () =>
      import("@/pages/pc/views/mark/grjn/jn-03/components/jn-article.vue"),
    jnVideo: () =>
      import("@/pages/pc/views/mark/grjn/jn-03/components/jn-video.vue"),
  },
  props: {
    detailModal: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {},
      photoTag: true,
      msgTag: true,
      articleTag: true,
      videoTag: true,
      hideTag: true,
      imgTag: true,
    };
  },
  mounted() {
    this.model = this.detailModal;
  },
  methods: {
    msgMore() {
      this.photoTag = false;
      this.articleTag = false;
      this.videoTag = false;
      this.hideTag = false;
      this.imgTag = true;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "450px",
      });
      $(".paginghide").css("display", "block");
    },
    articleMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.videoTag = false;
      this.hideTag = false;
      this.imgTag = true;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "450px",
      });
      $(".paginghide").css("display", "block");
    },
    videoMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.articleTag = false;
      this.hideTag = false;
      this.imgTag = true;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "450px",
      });
      $(".paginghide").css("display", "block");
    },
  },
};
</script>

<style lang="less" scoped>
.grjn {
  background: url("/img/pc/03_banner03.png") no-repeat center center;
  background-size: 100% 100%;
  padding-bottom: 450px;
  background-position-y: 820px;
  position: relative;
  .img {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .bannerImg {
    position: absolute;
    top: 0;
    left: 0;
    height: 1020px;
    width: 100%;
  }
  .moreBtn {
    font-size: 20px;
    width: 100px;
    height: 20px;
    margin: 0 auto;
    line-height: 20px;
    color: #343437;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
  }
  .paging {
    display: none !important;
  }
}
</style>
