<template>
  <div class="contWrap">
    <van-uploader
      v-model="fileList"
      :multiple="true"
      :max-size="20000 * 1024"
      :after-read="afterRead"
      :before-delete="delUploadImg"
      @oversize="onOversize"
      upload-icon="plus"
    >
      <p>
        <van-icon
          name="plus"
          color="#00744c"
          size=".5rem"
          style="margin-bottom:.1rem;"
        />
        上传照片
      </p>
    </van-uploader>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "uploadImages",
  data() {
    return {
      fileList: [],
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
    };
  },

  methods: {
    afterRead(file) {
      if (file instanceof Array) {
        file.map((v) => {
          v.status = "uploading";
          v.message = "上传中...";
          this.uploadImg(v);
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        this.uploadImg(file);
      }
    },
    uploadImg(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("isThumbnails", true);
      axios
        .post(this.uploadUrl, formData, {
          headers: this.headers,
        })
        .then((res) => {
          if (res.data) {
            if (file instanceof Array) {
              //判断是否是数组
              file.map((v, i) => {
                v.status = "success";
                v.message = "";
                v.url = res.data[i];
              });
            } else {
              file.status = "success";
              file.message = "";
              file.url = res.data.uploadUrl;
            }
          }
        })
        .catch((err) => {
          this.$notify({
            type: "warning",
            message: "上传失败",
          });
        });
    },
    delUploadImg(item) {
      this.fileList = this.fileList.filter((v) => v.url != item.url);
    },
    onOversize() {
      this.$notify({
        type: "warning",
        message: "上传图片不能大于 20MB",
      });
    },
    getFileList() {
      return this.fileList;
    },
  },
};
</script>

<style lang="less" scoped>
.contWrap {
  /deep/ .van-uploader__wrapper {
    background: #ffffff;
    color: #666666;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0.2rem;
    padding-top: 0;
    margin-top: 0.2rem;
    box-sizing: border-box;
    .van-uploader__input-wrapper {
      width: 1.7rem;
      height: 1.7rem;
      justify-content: center;
      align-items: center;
      margin-top: 0.2rem;
      display: flex;
    }
    .van-uploader__preview {
      display: flex;
      margin-right: 0.2rem;
      margin-top: 0.2rem;
      margin-bottom: 0;
      width: 1.7rem !important;
      height: 1.7rem !important;
      img {
        width: 100%;
        height: 100%;
      }
      .van-uploader__preview-image {
        width: 1.7rem !important;
        height: 1.7rem !important;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    p {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
