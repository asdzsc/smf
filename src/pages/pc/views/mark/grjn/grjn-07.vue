<template>
  <div class="grjn">
    <jn-banner :bannerModel="this.model"></jn-banner>
<<<<<<< HEAD
    <jn-photo :bannerModel="this.model" v-if="photoTag"></jn-photo>
    <jn-message
      :bannerModel="this.model"
      ref="myChild"
      @videoMore="videoMore"
      v-if="msgTag"
    ></jn-message>
=======
    <jn-photo v-if="photoTag"></jn-photo>
    <jn-message ref="myChild" @videoMore="videoMore" v-if="msgTag"></jn-message>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <div class="moreBtn" v-if="hideTag" @click="msgMore()">
      更多留言
    </div>
    <jn-article
<<<<<<< HEAD
      :bannerModel="this.model"
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      ref="myChild"
      v-if="articleTag"
      @videoMore="videoMore"
    ></jn-article>
    <div class="moreBtn" v-if="hideTag" @click="articleMore()">
      更多文章
    </div>
<<<<<<< HEAD
    <jn-video
      :bannerModel="this.model"
      ref="myChild"
      v-if="videoTag"
      @videoMore="videoMore"
    ></jn-video>
=======
    <jn-video ref="myChild" v-if="videoTag" @videoMore="videoMore"></jn-video>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
      import("@/pages/pc/views/mark/grjn/jn-07/components/jn-photo.vue"),
    jnBanner: () =>
      import("@/pages/pc/views/mark/grjn/jn-07/components/jn-banner.vue"),
    jnMessage: () =>
      import("@/pages/pc/views/mark/grjn/jn-07/components/jn-message.vue"),
    jnArticle: () =>
      import("@/pages/pc/views/mark/grjn/jn-07/components/jn-article.vue"),
    jnVideo: () =>
      import("@/pages/pc/views/mark/grjn/jn-07/components/jn-video.vue"),
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
  background: url("/img/pc/07_banner.png") no-repeat;
  background-position-x: center;
  padding-bottom: 100px;
  .moreBtn {
    font-size: 20px;
    line-height: 20px;
    width: 100px;
    height: 20px;
    margin: 0 auto;
    color: #999999;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
  }
  .paging {
    display: none !important;
  }
}
</style>
