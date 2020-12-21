<template>
  <div class="photo">
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 8">
        <img src="/img/pc/create_add.png" alt="" />
        <div class="ant-upload-text">
          上传照片
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>
<style lang="less" scoped>
.photo {
  /deep/ .ant-upload.ant-upload-select-picture-card {
    width: 300px;
    height: 200px;
    margin-top: 20px;
    margin-right: 100px;
  }
  /deep/ .ant-upload-list-picture-card-container {
    width: 300px;
    height: 200px;
    margin-top: 20px;
    margin-right: 100px;

    .ant-upload-list-item {
      width: 100%;
      height: 100%;
      .ant-upload-list-item-info {
        width: 100%;
        height: 100%;
      }
    }

    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
