<template>
  <div>
    <a-form-model :model="{ model }">
      <div v-for="(item, index) in model" :key="index">
        <a-form-model-item label="文章封面" class="formItemAvatar">
          <imgsUpload
            ref="imgsUpload"
            :count="1"
            :multiple="false"
            @change="changeUpload"
            @remove="removeUpload"
          ></imgsUpload>
        </a-form-model-item>
        <a-form-model-item label="文章主题">
          <a-input
            v-model="item.title"
            placeholder="请输入文章主题"
            style="width:100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="文章内容">
          <a-textarea
            v-model="item.cont"
            placeholder="请输入文章内容"
            :rows="5"
            style="width:100%;"
          />
        </a-form-model-item>
      </div>
    </a-form-model>
    <div class="btn" @click="handleAdd">再写一篇</div>
  </div>
</template>
<script>
import * as utils from "@/pages/admin/libs/utils";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/pc/views/mark/components/article-img.vue"),
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
    memoryInfo: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: [
        {
          id: "",
          memoryId: "",
          memoryName: "",
          msgType: "2",
          title: "",
          cont: "",
          cover: "",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getfileArticle() {
      if (this.model[0].cont == "") {
        return;
      } else {
        return this.model;
      }
    },
    handleAdd() {
      this.model.push({
        id: "",
        memoryId: "",
        memoryName: "",
        msgType: "2",
        title: "",
        cont: "",
        cover: "",
      });
    },
    bindData() {
      // eslint-disable-next-line no-unused-vars
      var vm = this;
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.model.cover) {
            var uid = utils.getId();
            var imgsList = [
              {
                uid: uid,
                name: uid,
                status: "done",
                imgUrl: this.model.cover,
                url: process.env.VUE_APP_BASE_URL + this.model.cover,
              },
            ];
            this.$refs.imgsUpload.setFileList(imgsList);
          }
        }, 200);
      });
    },
    //上传成功事件
    changeUpload(file) {
      for (var i = 0; i < this.model.length; i++) {
        this.model[i].cover = file.imgUrl;
      }
    },
    //删除上传图片
    // eslint-disable-next-line no-unused-vars
    removeUpload(file) {
      this.model.cover = "";
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-upload-select-picture-card {
  width: 300px;
  height: 200px;
  margin-top: 10px;
  border: none;
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
.btn {
  margin: 0 auto;
  width: 100px;
  height: 70px;
  font-size: 16px;
  line-height: 70px;
  color: #00744c;
  cursor: pointer;
}
</style>
