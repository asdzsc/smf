<template>
  <div>
    <div v-for="(item, index) in model" :key="index">
      <van-form>
        <van-field
          label="视频名称"
          v-model="item.title"
          placeholder="请输入视频名称"
        />
      </van-form>
      <van-row style="padding-top: 10px">
        <van-col span="12">
          <div style="margin: auto; width: 2.2rem">
            <imgsUpload
              ref="imgsUpload"
              @change="uploadAvatarPhoto"
            ></imgsUpload>
          </div>
        </van-col>
        <van-col span="12">
          <div style="margin: auto; width: 2.2rem">
            <div v-if="item.url">
              <video
                :poster="baseUrl + item.cover"
                :src="baseUrl + item.url"
                controls
              ></video>
            </div>
            <van-uploader
              :before-read="beforeRead"
              :after-read="afterRead"
              :max-count="1"
              accept="video/*"
              v-if="!item.url"
            >
              <p>
                <van-icon
                  name="plus"
                  color="#00744c"
                  size=".5rem"
                  style="margin-bottom: 0.1rem"
                />
                上传视频
              </p>
            </van-uploader>
          </div>
        </van-col>
      </van-row>

      <div style="padding-right: 20px; text-align: right; padding-top: 10px">
        <van-button
          @click="delItem(item.id)"
          type="danger"
          size="mini"
          icon="delete-o"
          >删除</van-button
        >
      </div>
    </div>
    <div class="btn" @click="handleAdd">再上传一个</div>
  </div>
</template>

<script>
import * as utils from "@/pages/mobile/libs/utils";
import axios from "axios";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/mobile/views/mark/create/components/video-img.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      imgList: [],
      videoList: [],
      model: [],
    };
  },
  mounted() {
    this.handleAdd();
  },
  methods: {
    beforeRead(file) {
      const isLt200M = file.size / 1024 / 1024 < 200;
      if (!isLt200M) {
        this.$notify({
          type: "warning",
          message: "上传文件不能大于200MB！",
        });
      }
      return isLt200M;
    },

    afterRead(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      data.append("isThumbnails", true);
      axios
        .post(this.uploadUrl, data, {
          headers: this.headers,
        })
        .then((res) => {
          // console.log(res.data);
          this.videoList.push(res.data);
          this.model.map((v, i) => {
            if (!v.title) {
              v.title = this.videoList[i].name;
            }
            v.url = this.videoList[i].uploadUrl;
          });
        });
    },
    uploadAvatarPhoto(imgUrl) {
      // console.log(imgUrl);
      this.imgList.push({
        url: imgUrl,
      });
      // console.log(this.imgList);
      this.model.map((v, i) => {
        v.cover = this.imgList[i].url;
      });
    },

    getfileListVideo() {
      return this.model;
    },
    // 再上传一个
    handleAdd() {
      this.model.push({
        id: utils.getId(),
        memoryId: "",
        title: "",
        cont: "",
        cover: "",
        url: "",
        mediaType: "video",
        sortId: 0,
      });
    },
    delItem(id) {
      this.$dialog
        .confirm({
          title: "确认删除吗?",
          message: "",
        })
        .then(() => {
          this.model = this.model.filter((x) => {
            return x.id !== id;
          });
          if (this.model.length == 0) {
            this.handleAdd();
          }
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-field {
  margin: 0 auto;
  margin-top: 0.2rem;
  line-height: 0.5rem;
  padding: 0.1rem 0.2rem;
}
/deep/ .van-cell {
  padding: 0.1rem 0.2rem;
}
/deep/ .van-cell__value {
  flex: 2;
}
/deep/ .van-cell__title {
  width: 1.5rem;
  span {
    color: #666;
  }
}
video {
  width: 2.7rem;
  height: 2.7rem;
}
/deep/ .van-uploader {
  .van-uploader__wrapper {
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
      margin-right: 0;
      margin-bottom: 0;
      margin-top: 0.2rem;
      width: 1.7rem;
      height: 1.7rem;
      .van-uploader__preview-image {
        width: 1.7rem;
        height: 1.7rem;
      }
    }

    p {
      display: flex;
      flex-direction: column;
    }
  }
}
.btn {
  font-size: 0.3rem;
  margin: 0.2rem auto;
  line-height: 0.7rem;
  color: #00744c;
  text-align: center;
}
</style>
