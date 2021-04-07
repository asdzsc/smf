<template>
  <div class="articleUpload">
    <div class="clearfix">
      <span class="span">文章封面</span>
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
    <div class="articleInfo">
      <div class="selfInfo">
        <span>文章主题</span>
        <textarea placeholder="请输入文章主题" style="height:30px;"></textarea>
      </div>
      <div class="selfInfo">
        <span>文章内容</span>
        <textarea placeholder="请输入文章内容"></textarea>
      </div>
    </div>
    <div class="btn">再写一篇</div>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
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
.articleUpload {
  .btn {
    width: 80px;
    height: 20px;
    margin: 20px auto;
    font-size: 16px;
    color: #00744c;
    cursor: pointer;
  }
  .clearfix {
    display: flex;
    .span {
      width: 70px;
      margin-top: 30px;
      text-align: right;
      padding-right: 10px;
    }
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
  .articleInfo {
    .selfInfo {
      display: flex;
      margin-top: 20px;
      span {
        width: 70px;
        text-align: right;
        padding-right: 10px;
      }
      textarea {
        width: 93%;
        height: 200px;
      }
    }
  }
}
</style>
