<template>
  <van-uploader
    :preview-full-image="false"
    :after-read="afterRead"
    accept="image/*"
    :max-size="20000 * 1024"
    @oversize="onOversize"
    :max-count="1"
  >
    <van-loading v-show="loading" />
    <img v-show="show" :src="imageUrl" alt="" />
    <p v-show="upload">
      <van-icon
        v-show="uploadIcon"
        name="plus"
        color="#00744c"
        size=".5rem"
        style="margin-bottom: 0.1rem"
      />
      上传照片
    </p>
  </van-uploader>
</template>
<script>
import axios from "axios";
export default {
  name: "avatar-upload",
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      imageUrl: "",
      show: false,
      upload: true,
      uploadIcon: true,
      loading: false,
    };
  },
  created() {},
  mounted() {
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
    setImg(imgUrl) {
      this.imageUrl = imgUrl;
      this.show = true;
      this.upload = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      data.append("isThumbnails", true);
      this.loading = true;
      this.uploadIcon = false;
      axios
        .post(this.uploadUrl, data, {
          headers: this.headers,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.upload = false;
            this.loading = false;
            this.show = true;
            this.imageUrl = process.env.VUE_APP_BASE_URL + res.data.uploadUrl;
            this.$emit("change", res.data.uploadUrl, res.data.name);
          }
        });
    },
    onOversize() {
      this.$notify({
        type: "warning",
        message: "上传图片不能大于 20MB",
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-uploader__preview {
  margin: 0;
  .van-uploader__preview-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
img {
  width: 100%;
  height: 100%;
}
</style>
