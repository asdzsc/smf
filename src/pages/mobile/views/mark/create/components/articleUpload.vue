<template>
  <div>
    <div v-for="(item, index) in model" :key="index">
      <div style="margin: auto; width: 2.2rem; padding-bottom: 10px">
        <imgsUpload ref="imgsUpload" @change="uploadAvatarPhoto"></imgsUpload>
      </div>
      <van-form>
        <van-field
          label="文章主题"
          v-model="item.title"
          placeholder="请输入文章主题"
        />
        <van-field
          rows="3"
          autosize
          label="文章内容"
          type="textarea"
          v-model="item.cont"
          placeholder="请输入文章内容"
        />
      </van-form>
      <div
        v-if="model.length > 1"
        style="padding-right: 20px; text-align: right; padding-top: 10px"
      >
        <van-button
          @click="delItem(item.id)"
          type="danger"
          size="mini"
          icon="delete-o"
          >删除</van-button
        >
      </div>
    </div>
    <div class="btn" @click="handleAdd">再写一篇</div>
  </div>
</template>

<script>
import * as utils from "@/pages/mobile/libs/utils";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/mobile/views/mark/create/components/article-img.vue"),
  },
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      imgList: [],
      model: [],
    };
  },
  mounted() {
    this.handleAdd();
  },
  methods: {
    uploadAvatarPhoto(imgUrl) {
      this.imgList.push({
        url: imgUrl,
      });
      this.model.map((v, i) => {
        v.cover = this.imgList[i].url;
      });
    },
    getfileArticle() {
      if (this.model[0].cont == "") {
        return;
      } else {
        return this.model;
      }
    },
    handleAdd() {
      this.model.push({
        id: utils.getId(),
        memoryId: "",
        memoryName: "",
        msgType: "2",
        title: "",
        cont: "",
        cover: "",
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
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
// /deep/ .van-field {
//   margin: 0 auto;
//   margin-top: 0.2rem;
//   line-height: 0.5rem;
//   padding: 0.1rem 0.2rem;
// }
// /deep/ .van-cell {
//   padding: 0.1rem 0.2rem;
// }
// /deep/ .van-cell__value {
//   flex: 2;
// }
// /deep/ .van-cell__title {
//   width: 1.5rem;
//   span {
//     color: #666;
//   }
// }
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
