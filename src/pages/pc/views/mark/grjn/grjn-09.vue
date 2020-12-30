<template>
  <div class="grjn">
    <jn-banner :bannerModel="this.model"></jn-banner>
    <jn-photo v-if="photoTag"></jn-photo>
    <jn-message ref="myChild" @videoMore="videoMore" v-if="msgTag"></jn-message>
    <div class="moreBtn" v-if="hideTag" @click="msgMore()">
      更多留言
    </div>
    <jn-article
      ref="myChild"
      v-if="articleTag"
      @videoMore="videoMore"
    ></jn-article>
    <div class="moreBtn" v-if="hideTag" @click="articleMore()">
      更多文章
    </div>
    <jn-video ref="myChild" v-if="videoTag" @videoMore="videoMore"></jn-video>
    <div class="moreBtn" v-if="hideTag" @click="videoMore()">
      更多视频
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  components: {
    jnPhoto: () =>
      import("@/pages/pc/views/mark/grjn/jn-09/components/jn-photo.vue"),
    jnBanner: () =>
      import("@/pages/pc/views/mark/grjn/jn-09/components/jn-banner.vue"),
    jnMessage: () =>
      import("@/pages/pc/views/mark/grjn/jn-09/components/jn-message.vue"),
    jnArticle: () =>
      import("@/pages/pc/views/mark/grjn/jn-09/components/jn-article.vue"),
    jnVideo: () =>
      import("@/pages/pc/views/mark/grjn/jn-09/components/jn-video.vue"),
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
    };
  },
  mounted() {
    this.model = this.detailModal;
    console.log(this.model);
  },
  methods: {
    msgMore() {
      this.photoTag = false;
      this.articleTag = false;
      this.videoTag = false;
      this.hideTag = false;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "100px",
      });
      $(".paginghide").css("display", "block");
    },
    articleMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.videoTag = false;
      this.hideTag = false;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "100px",
      });
      $(".paginghide").css("display", "block");
    },
    videoMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.articleTag = false;
      this.hideTag = false;
      $(".grjn").css({
        "background-position": "top",
        "padding-bottom": "100px",
      });
      $(".paginghide").css("display", "block");
    },
  },
};
</script>

<style lang="less" scoped>
.grjn {
  background: url("/img/pc/09_banner.png") no-repeat center center;
  background-size: cover;
  padding-bottom: 200px;
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
