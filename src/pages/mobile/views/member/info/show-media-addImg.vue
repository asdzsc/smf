<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="wrap">
      <van-cell class="imgCell" center title="照片:">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #default>
          <imgsUpload ref="imgsUpload" @change="uploadAvatarPhoto"></imgsUpload>
        </template>
      </van-cell>
      <van-field label="标题:" v-model="model.title" placeholder="请输入标题" />
      <van-field
        rows="3"
        autosize
        label="简介:"
        type="textarea"
        v-model="model.cont"
        placeholder="请输入简介"
      />
      <div class="button-group">
        <van-button
          type="primary"
          color="#004930"
          size="large"
          @click="handleOk"
          >确定</van-button
        >
        <van-button
          plain
          type="primary"
          color="#004930"
          size="large"
          @click="handleCancel"
          >取消</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getMemoryMedia, saveMemoryMedia } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    imgsUpload: () => import("@/pages/mobile/views/member/info/addImg.vue"),
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: {
        id: "",
        memoryId: this.$route.query.memoryId, //纪念馆id
        title: "",
        cont: "",
        cover: "",
        url: "",
        mediaType: "image",
        sortId: 0,
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    uploadAvatarPhoto(imgUrl, name) {
      this.model.photo = imgUrl;
      this.model.title = name;
      this.model.url = imgUrl;
    },
    loadData() {
      if (this.$route.query.id) {
        getMemoryMedia({
          id: this.$route.query.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.bindData();
          }
        });
      }
    },
    bindData() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.model.url) {
            var imgUrl = {
              name: this.model.title,
              imgUrl: this.model.url,
              url: process.env.VUE_APP_BASE_URL + this.model.url,
            };
            this.$refs.imgsUpload.setImg(imgUrl);
          }
        }, 200);
      });
    },
    // 确认
    handleOk() {
      saveMemoryMedia(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "提交成功",
          });
          this.$router.go(-1);
        }
      });
    },
    // 取消
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 0.4rem;
  box-sizing: border-box;
  /deep/ .van-field {
    margin: 0 auto;
    margin-top: 0.2rem;
    line-height: 0.5rem;
    padding: 0.1rem 0.2rem;
  }
  /deep/ .van-cell {
    padding: 0.1rem 0.2rem;
    background: none;
    .van-field__label {
      margin-right: 0;
    }
  }
  .imgCell {
    /deep/ .van-cell__value {
      flex: none;
      background: #fff;
    }
  }
  /deep/ .van-cell__value {
    background: #fff;
    // border: solid 0.02rem #e0e0e0;
  }

  /deep/ .van-cell__title {
    width: 1rem;
    flex: none;
    span {
      color: #666;
    }
  }
  /deep/ .van-uploader {
    border: 1px solid rgb(0, 73, 48);
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
  .button-group {
    padding-top: 0.42rem;
    padding-bottom: 0.22rem;
    // width: 90%;
    margin: 0 auto;
    /deep/ .van-button--plain {
      margin-top: 0.2rem;
    }
  }
}
</style>
