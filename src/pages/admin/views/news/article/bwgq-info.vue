<template>
  <a-drawer
    :title="title"
    width="75%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="标题">
        <a-input
          v-model="model.title"
          placeholder="请输入新闻标题"
          style="width:600px;"
        />
      </a-form-model-item>
      <a-form-model-item label="封面图" class="formItemAvatar">
        <avatarUpload ref="coverUpload" @change="uploadCover"></avatarUpload>
        <!-- <div class="remark">
          直播视频封面为直播未开始或暂停时显示的宣传页，推荐尺寸为：9：16，支持JPG、PNG格式，图片大小不超过4M
        </div> -->
      </a-form-model-item>
      <a-form-model-item label="PC背景图" class="formItemAvatar">
        <avatarUpload ref="bgUpload" @change="uploadBg"></avatarUpload>
      </a-form-model-item>
      <a-form-model-item label="移动端背景图" class="formItemAvatar">
        <avatarUpload
          ref="phoneBgUpload"
          @change="uploadPhoneBg"
        ></avatarUpload>
      </a-form-model-item>

      <a-form-model-item label="是否置顶">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          :checked="model.isTop === '1' ? true : false"
          @change="setIsTop()"
        />
      </a-form-model-item>
      <a-form-model-item label="发布时间">
        <a-date-picker
          show-time
          placeholder="请选择新闻发布时间"
          @change="onChangeDate"
          v-model="model.publishTimeDate"
          style="width:200px;"
          inputReadOnly
        />
      </a-form-model-item>
      <a-form-model-item label="简介">
        <script
          id="articleEditor"
          type="text/plain"
          style="width:100%;height:500px;"
        ></script>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">确定</a-button>
        <a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>
<script>
import { getNewsInfo, saveNewsInfo } from "@/pages/admin/api/news/news";
// import * as utils from "@/pages/admin/libs/utils";
import moment from "moment";

export default {
  name: "bwgqInfo",
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      title: "",
      treeData: [],
      model: {
        id: "",
        title: "",
        columnIds: [],
        cover: "", //封面图
        bg: "", //PC背景图
        phoneBg: "", //移动端背景图
        publishTimeDate: null,
        publishTime: "",
        isTop: "0", //是否置顶
        status: "1", //发布新闻
        articleType: "2", //博物馆群
        intro: "",
        cont: ""
      },
      ue: null
    };
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加博物馆信息" : "编辑博物馆信息";
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.id) {
        this.model.id = this.id;
        getNewsInfo({ id: this.model.id }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.model.publishTimeDate = moment(this.model.publishTime);
          }
          this.bindData();
        });
      } else {
        this.model.publishTimeDate = moment();
        this.model.publishTime = this.model.publishTimeDate.format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.bindData();
      }
    },
    bindData() {
      var vm = this;
      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        setTimeout(() => {
          window.UE.delEditor("articleEditor");
          this.ue = window.UE.getEditor("articleEditor");
          this.ue.addListener("ready", function() {
            vm.ue.setContent(vm.model.cont);
          });

          this.$refs.coverUpload.loadData(this.model.cover);
          this.$refs.bgUpload.loadData(this.model.bg);
          this.$refs.phoneBgUpload.loadData(this.model.phoneBg);
        }, 200);
      });
    },
    uploadCover(imgUrl) {
      this.model.cover = imgUrl;
    },
    uploadBg(imgUrl) {
      this.model.bg = imgUrl;
    },
    uploadPhoneBg(imgUrl) {
      this.model.phoneBg = imgUrl;
    },
    setIsTop() {
      this.model.isTop = this.model.isTop === "0" ? "1" : "0";
    },
    onChangeDate(date, dateString) {
      this.model.publishTimeDate = date;
      this.model.publishTime = dateString;
    },
    onSubmit() {
      this.model.cont = this.ue.getContent();
      saveNewsInfo(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
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
.remark {
  color: #ccc;
  font-size: 12px;
}
</style>
