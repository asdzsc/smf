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
      <input type="text" v-model="model.name" placeholder="请输入亲人姓名" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avtarModel: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      imageUrl: "",
      headers: {
        token: this.$store.state.adminAccount.token || "",
      },
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      formData: { isThumbnails: true },
      loading: false,
      model: {},
    };
  },
  mounted() {
    this.model = this.avtarModel;
  },
  methods: {
    handleChange(info) {
      console.log(info);
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

</style>
