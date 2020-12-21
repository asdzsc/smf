<template>
  <div class="grjn">
    <jn-banner :bannerModel="this.model"></jn-banner>
    <jn-photo v-if="photoTag"></jn-photo>
    <jn-message v-if="msgTag"></jn-message>
    <div class="moreBtn" v-if="hideTag" @click="msgMore()">
      更多留言
    </div>
    <jn-article v-if="articleTag"></jn-article>
    <div class="moreBtn" v-if="hideTag" @click="articleMore()">
      更多文章
    </div>
    <jn-video></jn-video>
    <div class="moreBtn" v-if="hideTag" @click="videoMore()">
      更多视频
    </div>
  </div>
</template>

<script>
export default {
  components: {
    jnPhoto: () =>
      import("@/pages/pc/views/mark/grjn/jn-free/components/jn-photo.vue"),
    jnBanner: () =>
      import("@/pages/pc/views/mark/grjn/jn-free/components/jn-banner.vue"),
    jnMessage: () =>
      import("@/pages/pc/views/mark/grjn/jn-free/components/jn-message.vue"),
    jnArticle: () =>
      import("@/pages/pc/views/mark/grjn/jn-free/components/jn-article.vue"),
    jnVideo: () =>
      import("@/pages/pc/views/mark/grjn/jn-free/components/jn-video.vue"),
  },
  props: {
    detailModal: {
      type: Object,
      default: {},
    }
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
    },
    articleMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.videoTag = false;
      this.hideTag = false;
    },
    videoMore() {
      this.photoTag = false;
      this.msgTag = false;
      this.articleTag = false;
      this.hideTag = false;
    },
  },
};
</script>

<style lang="less" scoped>
.grjn {
  background: url("/img/pc/1_banner.png") no-repeat;
  background-position-x: center;
  padding-bottom: 100px;
  .moreBtn {
    font-size: 20px;
    line-height: 20px;
    color: #00744c;
    width: 100px;
    height: 20px;
    margin: 0 auto;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 100px;
    cursor: pointer;
  }
}
</style>
