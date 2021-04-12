<template>
  <a-upload
    name="file"
    listType="picture-card"
    class="avatar-uploader"
    accept="image/*"
    :headers="headers"
    :data="formData"
    :showUploadList="false"
    :action="uploadUrl"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" />
    <div v-else>
      <a-icon
        style="font-size:30px;color:#00744c;"
        :type="loading ? 'loading' : 'plus'"
      />
      <div class="ant-upload-text">上传头像</div>
    </div>
  </a-upload>
</template>
<script>
export default {
  name: "avatar-upload",
  props: {
    id: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    isThumbnails: {
      type: Boolean,
      default: true,
    },
    // itemList: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      formData: { isThumbnails: true },
      imageUrl: "",
      loading: false,
    };
  },
  created() {},
  mounted() {
    this.formData.isThumbnails = this.isThumbnails;
    this.loadData(this.img);
  },
  methods: {
    loadData(imgUrl) {
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          this.imageUrl = imgUrl;
        } else {
          this.imageUrl = process.env.VUE_APP_BASE_URL + imgUrl;
        }
      } else {
        this.imageUrl = "";
      }
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.loading = false;
        var res = info.file.response;
        if (res.code === 0) {
          this.imageUrl = process.env.VUE_APP_BASE_URL + res.uploadUrl;
          if (this.id) {
            this.$emit("change", {
              id: this.id,
              uploadUrl: res.uploadUrl,
            });
          } else {
            this.$emit("change", res.uploadUrl);
          }
        }
      }
    },
    beforeUpload(file) {
      // const isJpgOrPng =
      //   file.type === "image/jpeg" || file.type === "image/png";
      // if (!isJpgOrPng) {
      //   this.$message.error("You can only upload JPG file!");
      // }
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("上传图片不能大于4MB");
      }
      return isLt4M;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader {
<<<<<<< HEAD
  /deep/ .ant-upload {
    padding: 0;
  }

=======
  .ant-upload {
    width: 128px;
    height: 128px;
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  img {
<<<<<<< HEAD
    width: 180px;
    height: 180px;
    overflow: hidden;
=======
    width: 100%;
    max-height: 100%;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  }
}
</style>
