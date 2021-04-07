<template>
  <a-modal
    :title="title"
    v-model="visible"
    width="800px"
    :bodyStyle="{ padding: '10px' }"
    @cancel="onClose"
    @ok="handleOk"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="纪念者">
        <div>{{ model.memoryName }}</div>
      </a-form-model-item>
      <a-form-model-item label="封面图" class="formItemAvatar">
        <imgsUpload
          ref="imgsUpload"
          :count="1"
          :multiple="false"
          @change="changeUpload"
          @remove="removeUpload"
        ></imgsUpload>
      </a-form-model-item>
      <a-form-model-item label="标题">
        <a-input
          v-model="model.title"
          placeholder="请输入标题"
          style="width:100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="内容">
        <a-textarea
          v-model="model.cont"
          placeholder="请输入内容"
          :rows="5"
          style="width:100%;"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { memoryMsgInfo, saveMemoryMsg } from "@/pages/pc/api/mark.js";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/pc/views/member/components/imgs-upload.vue"),
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
      visible: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      model: {
        id: "",
        memoryId: "",
        memoryName: "",
        msgType: "2",
        title: "",
        cont: "",
        cover: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.visible = true;
      if (this.id) {
        this.title = "编辑纪念文章";
        memoryMsgInfo({
          id: this.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.bindData();
          }
        });
      } else {
        this.title = "添加纪念文章";
        if (this.memoryInfo) {
          this.model.memoryId = this.memoryInfo.id;
          this.model.memoryName = this.memoryInfo.name;
        }
      }
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
      this.model.cover = file.imgUrl;
    },
    //删除上传图片
    // eslint-disable-next-line no-unused-vars
    removeUpload(file) {
      this.model.cover = "";
    },
    handleOk() {
      saveMemoryMsg(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
  },
};
</script>
<style lang="less" scoped>
.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}
.operator {
  margin-bottom: 18px;
}

.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
</style>
