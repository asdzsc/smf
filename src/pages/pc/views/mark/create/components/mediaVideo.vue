<template>
<<<<<<< HEAD
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
=======
  <a-modal
    title="上传视频"
    v-model="visible"
    width="600px"
    :bodyStyle="{ padding: '10px', minHeight: '400px' }"
    @cancel="onClose"
    @ok="handleOk"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="视频封面" class="formItemAvatar">
        <imgsUpload
          ref="imgsUpload"
          :count="1"
          :multiple="false"
          @change="changeUpload"
          @remove="removeUpload"
        ></imgsUpload>
      </a-form-model-item>
      <a-form-model-item label="视频" class="formItemAvatar">
        <div style="padding-top: 10px;">
          <fileUpload
            ref="fileUpload"
            accept="video/mp4"
            :count="1"
            :multiple="false"
            @uploading="uploadingFileUpload"
            @change="changeFileUpload"
          >
            <a-button v-show="!loadingFile" type="primary" size="small">
              <a-icon type="video-camera" />上传视频
            </a-button>
            <span
              v-show="loadingFile"
              style="padding-left: 10px; color:#1890ff;"
            >
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
      </a-form-model-item>
      <a-form-model-item label="标题">
        <a-input
          v-model="model.title"
          placeholder="请输入附件标题"
          style="width:400px;"
        />
      </a-form-model-item>
      <a-form-model-item label="简介">
        <a-textarea
          v-model="model.cont"
          placeholder="请输入附件简介"
          :rows="5"
          style="width:400px;"
        />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  getMemoryMedia,
  saveMemoryMedia,
} from "@/pages/admin/api/memory/memory";
import * as utils from "@/pages/admin/libs/utils";
export default {
  components: {
    imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
    fileUpload: () => import("@/pages/admin/components/upload/file-upload"),
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
    memoryId: {
      type: String,
      default() {
        return "";
      },
    },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      visible: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
<<<<<<< HEAD
      defImg: `this.src='/img/pc/zwtp.jpg'`,
=======
      defImg: `this.src='/img/admin/zwtp.jpg'`,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
  methods: {
    uploadingFileUpload() {
      this.loadingFile = true;
    },
    changeFileUpload(file) {
      console.log(file);
=======
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.visible = true;
      this.model.id = this.id;
      this.model.memoryId = this.memoryId;
      if (this.model.id) {
        getMemoryMedia({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.bindData();
          }
        });
      }
    },
    bindData() {
      var vm = this;
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.model.cover) {
            var uid = utils.getId();
            var imgsList = [
              {
                uid: uid,
                name: uid + ".jpg",
                status: "done",
                imgUrl: this.model.cover,
                url: process.env.VUE_APP_BASE_URL + this.model.cover,
              },
            ];
            this.$refs.imgsUpload.setFileList(imgsList);

            this.playerOptions.poster = this.baseUrl + this.model.cover;
          }
          if (this.model.url) {
            this.playerOptions.sources[0].src = this.baseUrl + this.model.url;
          }
        }, 200);
      });
    },
    //上传成功事件
    changeUpload(file) {
      this.model.cover = file.imgUrl;
      this.playerOptions.poster = this.baseUrl + file.imgUrl;
    },
    removeUpload(file) {
      this.model.cover = "";
      this.playerOptions.poster = "/img/admin/zwtp.jpg";
    },
    uploadingFileUpload() {
      this.loadingFile = true;
    },
    //视频上传成功事件
    changeFileUpload(file) {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      this.loadingFile = false;
      if (!this.model.title) {
        this.model.title = file.name;
      }
      this.model.url = file.fileUrl;
      this.playerOptions.sources[0].src = this.baseUrl + file.fileUrl;
    },
<<<<<<< HEAD
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
=======
    handleOk() {
      saveMemoryMedia(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
  },
};
</script>
<style lang="less" scoped>
.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}

.operator {
  margin-bottom: 18px;
}

.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}
</style>
