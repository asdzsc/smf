<template>
  <div>
    <a-upload
      name="file"
      listType="picture-card"
      accept="image/*"
      :headers="headers"
      :action="uploadUrl"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :file-list="fileList"
      @preview="handlePreview"
      multiple
    >
<<<<<<< HEAD
      <div>
=======
      <div v-if="fileList.length < 6">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <a-icon
          style="font-size:48px;color:#00744c;"
          :type="loading ? 'loading' : 'plus'"
        />
        <div class="ant-upload-text">
          上传图片
        </div>
      </div>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
      style="top: 10px;"
      :width="width"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import * as utils from "@/pages/pc/libs/utils";
export default {
  name: "imgs-upload",
  props: {
    // value: {
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
      imageUrl: "",
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: "",
      width: 520,
    };
  },
  watch: {
    previewImage() {
      this.imgWH();
    },
  },
  created() {},
  mounted() {},
  methods: {
    setFileList(fileList) {
      this.fileList = fileList;
    },
    handleChange(info) {
      this.fileList = info.fileList;
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.loading = false;
        var res = info.file.response;
        if (res.code === 0) {
          info.file.url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
          info.file.imgUrl = res.uploadUrl;
          var query = this.fileList.filter((x) => x.uid == info.file.uid);
          if (query.length > 0) {
            query[0].url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
            query[0].imgUrl = res.uploadUrl;
          }
        }
      }
    },
    beforeUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("上传图片不能大于4MB");
      }
      return isLt4M;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await utils.getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    imgWH() {
      if (this.previewImage) {
        var img_url = this.getImg(this.previewImage);
        var img = new Image();
        img.src = img_url;
        if (img.complete) {
          this.width = img.width > 1000 ? 1000 : img.width;
        } else {
          img.onload = () => {
            // 打印
            this.width = img.width > 1000 ? 1000 : img.width;
          };
        }
      }
    },
    getImg(imgUrl) {
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          return imgUrl;
        } else {
          return process.env.VUE_APP_BASE_URL + imgUrl;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    getFileList() {
      return this.fileList;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-upload-select-picture-card {
  width: 300px;
  height: 200px;
  margin-top: 10px;
<<<<<<< HEAD
  border: none;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/ .ant-upload-list-picture-card-container {
  width: 300px;
  height: 200px;
  margin-right: 100px;
  margin-top: 10px;
  img {
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-item {
    width: 100%;
    height: 100%;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
