<template>
  <a-drawer
    :title="title"
    width="50%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="图片" class="formItemAvatar">
        <avatar-upload ref="avatarUpload" @change="upload"></avatar-upload>
      </a-form-model-item>
      <a-form-model-item label="标题">
        <a-input v-model="model.title" placeholder="请输入标题" />
      </a-form-model-item>
      <a-form-model-item label="链接">
        <a-input v-model="model.url" placeholder="请输入跳转链接" />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
        <a-button @click="onClose" style="margin-left: 10px;">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { getLiveBannerInfo, saveLiveBanner } from "@/pages/admin/api/live/livebanner";

export default {
  name: "livebanner-info",
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  data() {
    return {
      visible: false,
      title: "",
      model: this.initModel()
    };
  },
  methods: {
    initModel() {
      return {
        id: "",
        title: "",
        img: "",
        url: "",
        sortId: 0
      };
    },
    upload(imgUrl) {
      this.model.img = imgUrl;
    },
    loadData(title, nid) {
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getLiveBannerInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.$refs.avatarUpload.loadData(this.model.img);
          }
        });
      } else {
        this.model = this.initModel();
        this.$refs.avatarUpload.loadData("");
      }
    },
    onSubmit() {
      saveLiveBanner(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      if (res) this.$emit("onClose", res);
    }
  }
};
</script>

<style lang="less" scoped>
.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}
</style>
