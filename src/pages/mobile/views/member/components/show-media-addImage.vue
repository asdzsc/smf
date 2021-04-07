<template>
  <div>
    <div class="imgList" v-show="showImg">
      <div v-for="(item, index) in fileList" class="img" :key="index">
        <img
          :src="baseUrl + item.uploadUrl"
          @click="showGoodsImgModal(index)"
          alt=""
        />
        <van-icon name="cross" @click="delBtn(index)" class="delte" />
      </div>
    </div>
    <van-uploader
      :multiple="false"
      v-if="uploadWrap"
      :after-read="afterRead"
      :max-size="4000 * 1024"
      @oversize="onOversize"
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
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      showImg: false,
      fileList: [],
      uploadWrap: true,
    };
  },
  mounted() {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      axios
        .post(this.uploadUrl, data, {
          headers: this.headers,
        })
        .then((res) => {
          this.showImg = true;
          let arr = [];
          arr.push(res.data);
          this.fileList = [...this.fileList, ...arr];
        });
    },
    delBtn(index) {
      this.fileList.splice(index, 1);
      if (this.fileList.length == 0) {
        this.showImg = false;
      }
    },
    //图片预览
    showGoodsImgModal(index) {
      let imgList = this.fileList.map((i) => {
        return this.baseUrl + i.uploadUrl;
      });
      ImagePreview(imgList, index);
    },
    onOversize() {
      this.$notify({
        type: "warning",
        message: "上传图片不能大于 4MB",
      });
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
.imgList {
  background: #ffffff;
  padding: 0.2rem;
  padding-top: 0;
  .img {
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    width: 1.7rem;
    height: 1.7rem;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    .delte {
      position: absolute;
      right: 0;
      top: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

/deep/ .van-uploader__wrapper {
  background: #ffffff;
  color: #666666;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;
  padding-top: 0;
  box-sizing: border-box;
  .van-uploader__input-wrapper {
    width: 1.7rem;
    height: 1.7rem;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
    display: flex;
    // border: 1px solid #00774c;
  }
  .van-uploader__preview {
    display: flex;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    margin-bottom: 0;
    width: 1.7rem;
    height: 1.7rem;
    img {
      width: 100%;
      height: 100%;
    }
    .van-uploader__preview-image {
      width: 1.7rem;
      height: 1.7rem;
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
</style>
