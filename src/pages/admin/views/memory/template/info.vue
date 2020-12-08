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
      <a-form-model-item label="模版名称">
        <a-input
          v-model="model.title"
          placeholder="请输入模版名称"
          style="width:600px;"
        />
      </a-form-model-item>
      <a-form-model-item label="封面图" class="formItemAvatar">
        <avatarUpload ref="coverUpload" @change="uploadCover"></avatarUpload>
      </a-form-model-item>

      <!-- <a-form-model-item label="销售价格">
        <a-input-number
          v-model="model.price"
          :formatter="
            value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          style="width:120px;"
        />
      </a-form-model-item>

      <a-form-model-item label="有效时间（天）">
        <a-input-number v-model="model.buyDay" style="width:120px;" />
      </a-form-model-item> -->

      <a-form-model-item label="展示图片" class="formItemAvatar">
        <imgsUpload ref="imgsUpload"></imgsUpload>
      </a-form-model-item>

      <a-form-model-item label="模版简介">
        <a-textarea
          v-model="model.intro"
          placeholder="请输入模版简介"
          :rows="4"
        />
      </a-form-model-item>

     <!-- <a-form-model-item label="状态">
        <a-select
          style="width:200px;"
          v-model="model.statusKey"
          labelInValue
          placeholder="请选择模版状态"
          @change="changeStatus"
        >
          <a-select-option
            v-for="item in statusList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item> -->
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
      </a-form-model-item>

      <<!-- a-form-model-item label="PC模版内容">
        <codeedit ref="codeedit" height="500px"></codeedit>
      </a-form-model-item>
      <a-form-model-item label="手机模版内容">
        <codeedit ref="codeedit2" height="500px"></codeedit>
      </a-form-model-item> -->

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">确定</a-button>
        <a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>
<script>
import {
  getMemoryTemplateInfo,
  saveMemoryTemplate
} from "@/pages/admin/api/memory/template";
import * as utils from "@/pages/admin/libs/utils";
import moment from "moment";

export default {
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload"),
    imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
    codeedit: () => import("@/pages/admin/components/codeedit/index")
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
      statusList: [
        { id: "1", name: "上架" },
        { id: "2", name: "下架" }
      ],
      model: {
        id: "",
        title: "",
        cover: "", //封面图
        phoneCover: "",
        imgsList: [],
        imgs: [], //展示图
        intro: "", //简介
        cont: "", // 模版介绍
        price: 0, //模版价格
        buyDay: 365, //一次购买一年
        sortId: 0, //排序
        statusKey: { key: "1" },
        status: "1", //状态 0待上架  1上架（默认） 2下架
        template: "", //模版文件路径
        phoneTemplate: "" //手机端模版文件地址
      }
    };
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加模版" : "编辑模版";
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.id) {
        this.model.id = this.id;
        getMemoryTemplateInfo({ id: this.model.id }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            this.model.statusKey = { key: this.model.status };
          }
          this.bindData();
        });
      } else {
        this.model.publishTimeDate = moment();
        this.bindData();
      }
    },
    bindData() {
      var vm = this;
      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        setTimeout(() => {
          //展示图片
          this.model.imgsList = [];
          if (this.model.imgs) {
            this.model.imgs.forEach(img => {
              var uid = utils.getId();
              this.model.imgsList.push({
                uid: uid,
                name: uid + ".jpg",
                status: "done",
                url: process.env.VUE_APP_BASE_URL + img
              });
            });
          }

          this.$refs.coverUpload.loadData(this.model.cover);
          this.$refs.imgsUpload.setFileList(this.model.imgsList);
          this.$refs.codeedit.loadData(this.model.template);
          this.$refs.codeedit2.loadData(this.model.phoneTemplate);
        }, 200);
      });
    },
    uploadCover(imgUrl) {
      this.model.cover = imgUrl;
    },
    // eslint-disable-next-line no-unused-vars
    changeStatus(value, option) {
      this.model.status = value.key;
    },
    onSubmit() {
      var fileList = this.$refs.imgsUpload.getFileList();
      this.model.imgs = fileList.map(x => {
        return x.imgUrl;
      });
      this.model.template = this.$refs.codeedit.getData();
      this.model.phoneTemplate = this.$refs.codeedit2.getData();

      saveMemoryTemplate(this.model).then(res => {
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
