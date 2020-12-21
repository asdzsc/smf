<template>
  <div class="avatarUpload">
    <a-upload
      name="file"
      listType="picture-card"
      class="avatar-uploader"
      accept="image/*"
      :data="formData"
      :showUploadList="false"
      :action="uploadUrl"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
    <div class="search">
      <input type="text" placeholder="请输入亲人姓名" />
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      formData: { isThumbnails: true },
      loading: false,
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
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
/deep/ .ant-upload.ant-upload-select-picture-card {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -90px;
  width: 180px;
  height: 180px;
  background-color: #ffffff;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 4px 10px 0px rgba(0, 73, 48, 0.2);
}
.avatar-uploader {
  .ant-upload {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  .ant-upload-select-picture-card i {
    font-size: 50px;
    color: #00744c;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  img {
    width: 100%;
    max-height: 100%;
  }
}
.search {
  width: 280px;
  height: 40px;
  margin: 0 auto;
  input {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 14px;
    padding-bottom: 14px;
    background-color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 18px;
  }
}
</style>
