<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="wrap">
      <van-cell class="imgCell1" center title="视频封面:">
        <template #default>
          <imgsUpload
            style="border: solid 0.02rem rgb(0, 73, 48);"
            ref="imgsUpload"
            @change="uploadAvatarPhoto"
          ></imgsUpload>
        </template>
      </van-cell>
      <van-field
        label="视频名称:"
        v-model="model.title"
        placeholder="请输入视频名称"
      />
      <van-cell class="imgCell" center title="上传视频:">
        <template #default>
          <div v-if="model.url">
            <video
              :poster="baseUrl + model.cover"
              :src="baseUrl + model.url"
              controls
            ></video>
          </div>
          <van-uploader
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="1"
            accept="video/*"
            style="padding-top:0.2rem;"
          >
            <van-button
              style="margin-right: .08rem;"
              icon="video-o"
              color="#004930"
              type="primary"
              >上传视频</van-button
            >
          </van-uploader>
        </template>
      </van-cell>
      <div class="button-group">
        <van-button
          type="primary"
          color="#004930"
          size="large"
          @click="handleOk"
          >确定</van-button
        >
        <van-button
          plain
          type="primary"
          color="#004930"
          size="large"
          @click="handleCancel"
          >取消</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getMemoryMedia, saveMemoryMedia } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/mobile/views/member/info/addVideoImg.vue"),
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      model: {
        id: "",
        memoryId: this.$route.query.memoryId, //纪念馆id
        title: "",
        cont: "",
        cover: "",
        url: "",
        mediaType: "video",
        sortId: 0,
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    uploadAvatarPhoto(imgUrl) {
      this.model.cover = imgUrl;
    },
    beforeRead(file) {
      const isLt200M = file.size / 1024 / 1024 < 200;
      if (!isLt200M) {
        this.$notify({
          type: "warning",
          message: "上传文件不能大于200MB！",
        });
      }
      return isLt200M;
    },

    afterRead(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      axios
        .post(this.uploadUrl, data, {
          headers: this.headers,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.model.url = res.data.uploadUrl;
            this.model.title = res.data.name;
          }
        });
    },
    loadData() {
      if (this.$route.query.id) {
        getMemoryMedia({
          id: this.$route.query.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.bindData();
          }
        });
      }
    },
    bindData() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.imgsUpload.setImg(this.baseUrl + this.model.cover);
        }, 200);
      });
    },
    // 确认
    handleOk() {
      saveMemoryMedia(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "提交成功",
          });
          this.$router.go(-1);
        }
      });
    },
    // 取消
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 0.4rem;
  box-sizing: border-box;
  /deep/ .van-field {
    margin: 0 auto;
    margin-top: 0.2rem;
    line-height: 0.5rem;
    padding: 0.1rem 0.2rem;
  }
  /deep/ .van-cell {
    padding: 0.1rem 0.2rem;
    background: none;
    .van-field__label {
      margin-right: 0;
    }
  }
  .imgCell1 {
    /deep/ .van-cell__value {
      flex: none;
      background: #fff;
    }
  }
  .imgCell {
    /deep/ .van-cell__value {
      flex: none;
      background: #fff;
    }
  }
  /deep/ .van-cell__value {
    background: #fff;
    // border: solid 0.02rem #e0e0e0;
  }

  /deep/ .van-cell__title {
    width: 1.5rem;
    flex: none;
    span {
      color: #666;
    }
  }
  video {
    width: 2.7rem;
    height: 2.7rem;
  }
  .imgCell1 {
    /deep/.van-uploader__input-wrapper {
      width: 1.7rem;
      height: 1.7rem;
      justify-content: center;
      align-items: center;
      margin-top: 0.2rem;
      display: flex;
      // border: 1px solid #00774c;
    }
    .van-uploader__preview {
      display: flex;
      margin-right: 0;
      margin-bottom: 0;
      margin-top: 0.2rem;
      width: 1.7rem;
      height: 1.7rem;
      .van-uploader__preview-image {
        width: 1.7rem;
        height: 1.7rem;
      }
    }
  }
  /deep/ .van-uploader {
    .van-uploader__wrapper {
      background: #ffffff;
      color: #666666;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      padding: 0.2rem;
      padding-top: 0;
      box-sizing: border-box;

      p {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .button-group {
    padding-top: 0.42rem;
    padding-bottom: 0.22rem;
    /deep/ .van-button--plain {
      margin-top: 0.2rem;
    }
  }
}
</style>
