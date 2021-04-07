<template>
  <div>
    <a-upload
      name="file"
      :accept="accept"
      :headers="headers"
      :action="uploadUrl"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :showUploadList="false"
      :multiple="multiple"
    >
      <slot></slot>
    </a-upload>
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
      default: "image/*",
    },
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
  computed: {
    isUpload() {
      return this.fileList.length < this.count;
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
    setFileList(fileList) {
      this.fileList = fileList;
    },
    handleChange(info) {
      this.fileList = info.fileList;
      if (info.file.status === "uploading") {
        this.loading = true;
        this.$emit("uploading");
        return;
      }
      if (info.file.status === "done") {
        this.loading = false;
        var res = info.file.response;
        if (res.code === 0) {
          // info.file.url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
          // info.file.imgUrl = res.uploadUrl;
          var query = this.fileList.filter((x) => x.uid == info.file.uid);
          if (query.length > 0) {
            query[0].url = process.env.VUE_APP_BASE_URL + res.uploadUrl;
            query[0].fileUrl = res.uploadUrl;
            this.$emit("change", query[0]);
          }
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
    getFileList() {
      return this.fileList;
    },
  },
};
</script>

<style lang="less" scoped></style>
