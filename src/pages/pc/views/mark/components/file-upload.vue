<template>
  <div>
    <a-form-model :model="{ model }">
      <div v-for="(item, index) in model" :key="index">
        <a-form-model-item label="视频封面" class="formItemAvatar">
          <imgsUpload
            ref="imgsUpload"
            :count="1"
            :multiple="false"
            @change="changeUpload"
            @remove="removeUpload"
          ></imgsUpload>
        </a-form-model-item>
        <a-form-model-item label="视频名称">
          <a-input
            v-model="item.title"
            placeholder="请输入视频名称"
            style="width:310px;"
          />
        </a-form-model-item>
        <div v-if="item.url" style="width: 400px; margin-top: 10px;">
          <video
            style="width: 400px; margin-top: 10px;height:275px"
            :poster="baseUrl + item.cover"
            :src="baseUrl + item.url"
            controls
          ></video>
        </div>
        <a-upload
          v-if="!item.url"
          name="file"
          :accept="accept"
          :headers="headers"
          :action="uploadUrl"
          :beforeUpload="beforeUpload"
          @change="handleChange"
          :showUploadList="false"
          :multiple="multiple"
        >
          <div :count="1" :multiple="false">
            <a-button
              v-show="loadingWrap"
              style="width: 310px;height: 175px;margin-right:50px;"
            >
              <img src="/img/pc/create_add.png" alt="" />
              <div>上传视频</div>
            </a-button>
            <span
              v-show="loadingFile"
              style="padding-left: 10px; color:#1890ff;"
            >
              <a-icon slot="indicator" type="loading" spin /> 视频上传中...
            </span>
          </div>
        </a-upload>

        <!-- <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player> -->
      </div>
    </a-form-model>
    <div class="btn" @click="handleAdd">再上传一个</div>
  </div>
</template>
<script>
export default {
  name: "imgs-upload",
  props: {
    count: {
      type: Number,
      default: 14,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: "video/*",
    },
  },
  components: {
    imgsUpload: () => import("@/pages/pc/views/mark/components/imgs-upload"),
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      imageUrl: "",
      loading: false,
      fileListVideo: [],
      imgList: [],
      videoList: [],
      previewVisible: false,
      previewImage: "",
      width: 520,
      visible: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/pc/zwtp.jpg'`,
      loadingFile: false,
      loadingWrap: true,
      model: [
        {
          id: "",
          memoryId: "",
          title: "",
          cont: "",
          cover: "",
          url: "",
          mediaType: "video",
          sortId: 0,
        },
      ],
    };
  },
  computed: {
    isUpload() {
      return this.fileListVideo.length < this.count;
    },
  },
  watch: {
    previewImage() {
      this.imgWH();
    },
  },
  created() {},
  mounted() {},
  methods: {
    //上传成功事件
    changeUpload(file) {
      // this.model.cover = file.imgUrl;
      // this.playerOptions.poster = this.baseUrl + file.imgUrl;
      this.imgList.push({
        url: file.imgUrl,
      });
      this.model.map((v, i) => {
        v.cover = this.imgList[i].url;
      });
    },
    // eslint-disable-next-line no-unused-vars
    removeUpload(file) {
      // eslint-disable-next-line no-unused-vars
      this.model.map((v, i) => {
        v.cover = "";
      });
    },
    setFileList(fileList) {
      this.fileListVideo = fileList;
    },
    handleChange(info) {
      this.loadingFile = true;
      if (info.file.status === "uploading") {
        this.loading = true;
        this.$emit("uploading");
        return;
      }
      if (info.file.status === "done") {
        this.loading = false;
        this.loadingFile = false;
        var res = info.file.response;
        if (res.code === 0) {
          this.videoList.push(res);
          this.model.map((v, i) => {
            if (!v.title) {
              v.title = this.videoList[i].name;
            }
            v.url = this.videoList[i].uploadUrl;
          });
        }
      }
    },
    beforeUpload(file) {
      const isLt200M = file.size / 1024 / 1024 < 200;
      if (!isLt200M) {
        this.$message.error("上传文件不能大于200MB");
      }
      return isLt200M;
    },
    getfileListVideo() {
      return this.model;
    },
    // 再上传一个
    handleAdd() {
      this.model.push({
        id: "",
        memoryId: "",
        title: "",
        cont: "",
        cover: "",
        url: "",
        mediaType: "video",
        sortId: 0,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.formModelWrap {
  display: flex;
  justify-content: space-between;
}
/deep/ .ant-upload-select-picture-card {
  border: none;
  .ant-btn:hover,
  .ant-btn:focus {
    border: none;
  }
}
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
