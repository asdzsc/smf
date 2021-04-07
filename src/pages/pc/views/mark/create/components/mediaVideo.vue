<template>
  <div>
    <div style="padding-top: 10px;">
      <fileUpload
        ref="fileUpload"
        accept="video/mp4"
        :count="1"
        :multiple="false"
        @uploading="uploadingFileUpload"
        @change="changeFileUpload"
      >
        <a-button style="width: 310px;height: 175px;margin-right:50px;">
          <img src="/img/pc/create_add.png" alt="" />
          <div>上传视频</div>
        </a-button>
        <span v-show="loadingFile" style="padding-left: 10px; color:#1890ff;">
          <a-icon slot="indicator" type="loading" spin /> 视频上传中...
        </span>
      </fileUpload>
    </div>
    <div v-if="model.url" style="width: 400px; margin-top: 10px;">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="formModelWrap">
      <a-form-model-item label="视频名称">
        <a-input
          v-model="model.title"
          placeholder="请输入视频名称"
          style="width:400px;"
        />
      </a-form-model-item>
      <a-form-model-item label="拍摄时间">
        <a-input
          v-model="model.createDate"
          placeholder="请输入拍摄时间"
          style="width:400px;"
        />
      </a-form-model-item>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    fileUpload: () => import("@/pages/pc/views/mark/components/file-upload"),
  },
  data() {
    return {
      visible: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/pc/zwtp.jpg'`,
      loadingFile: false,
      model: {
        id: "",
        memoryId: "",
        title: "",
        cont: "",
        cover: "",
        url: "",
        mediaType: "video",
        sortId: 0,
      },
      playerOptions: {
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 16:9横屏 9:16竖屏
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "",
          },
        ],
        poster: "/img/admin/zwtp.jpg", //你的封面地址/img/mp4gb.png
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  methods: {
    uploadingFileUpload() {
      this.loadingFile = true;
    },
    changeFileUpload(file) {
      console.log(file);
      this.loadingFile = false;
      if (!this.model.title) {
        this.model.title = file.name;
      }
      this.model.url = file.fileUrl;
      this.playerOptions.sources[0].src = this.baseUrl + file.fileUrl;
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin: 0 auto;
  width: 100px;
  height: 70px;
  font-size: 16px;
  line-height: 70px;
  color: #00744c;
  cursor: pointer;
}
</style>
