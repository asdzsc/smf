<template>
  <div class="videoUpload">
    <div class="videoName">
      <span>视频名称：</span>
      <input type="text" placeholder="请输入视频名称" />
    </div>
    <div class="videoName">
      <span>拍摄时间：</span>
      <input type="text" placeholder="请输入拍摄时间" />
    </div>
    <div class="clearfix">
      <span class="span">上传视频</span>
      <a-upload
        list-type="picture"
        action="//jsonplaceholder.typicode.com/posts/"
        :preview-file="previewFile"
      >
        <a-button style="width: 310px;height: 175px;margin-right:50px;">
          <img src="/img/pc/create_add.png" alt="" />
          <div>上传视频</div>
        </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  },
};
</script>

<style lang="less" scoped>
.videoUpload {
  .videoName {
    display: inline;
    margin-right: 100px;
    color: #666666;
    span {
      display: inline-block;
      width: 70px;
    }
    input {
      width: 365px;
      height: 40px;
      text-align: center;
      padding-top: 14px;
      padding-bottom: 14px;
      background-color: #ffffff;
      border: none;
      border-radius: 10px;
    }
  }
  .clearfix {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    .span {
      width: 70px;
      margin-top: 30px;
      text-align: right;
      padding-right: 10px;
    }
    span {
      display: flex;
      flex-wrap: wrap;
    }
    /deep/ .ant-upload-list {
      display: flex;
      flex-wrap: wrap;
      .ant-upload-list-item {
        width: 310px;
        height: 175px;
        margin-top: 0;
        margin-right: 50px;
      }
    }
  }
}
</style>
