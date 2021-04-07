<template>
  <modal title="回访信息" @onClose="handleCancel" width="650px">
    <div class="cont">
      <div class="fromCont">
        <a-row class="fromRow" type="flex">
          <a-col class="inputCont">
            <a-textarea
              v-model="model.visitCont"
              placeholder="请填写回访内容..."
              style="width: 500px; height: 115px"
              :maxLength="200"
            />
          </a-col>
        </a-row>
        <div>
          <imgsUpload ref="imgsUpload"></imgsUpload>
        </div>
      </div>

      <div @click="submit()" class="btn" :class="{ loading: isSubmit }">
        <a-icon v-if="isSubmit" type="loading" spin />
        提交回访
      </div>
    </div>
  </modal>
</template>

<script>
import { saveVisit } from "@/pages/admin/api/gjfw/gjfw";
import * as utils from "@/pages/admin/libs/utils";

export default {
  components: {
    modal: () => import("@/pages/admin/components/modal/index.vue"),
    imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/usernull.png'`,
      model: {
        id: "",
        visitImgs: [],
        visitCont: "",
      },
      isSubmit: false,
    };
  },
  mounted() {
    Object.assign(this.model, this.info);
    this.loadData();
  },
  methods: {
    loadData() {
      var vm = this;
      this.$nextTick(() => {
        setTimeout(() => {
          if (!vm.model.visitImgs) {
            vm.model.visitImgs = [];
          }
          var imgsList = [];
          vm.model.visitImgs.forEach((x) => {
            var uid = utils.getId();
            imgsList.push({
              uid: uid,
              name: uid,
              status: "done",
              imgUrl: x,
              url: vm.baseUrl + x,
            });
          });
          this.$refs.imgsUpload.setFileList(imgsList);
        }, 200);
      });
    },
    submit() {
      this.isSubmit = true;
      var fileList = this.$refs.imgsUpload.getFileList();
      this.model.visitImgs = fileList.map((x) => {
        return x.imgUrl;
      });
      saveVisit(this.model).then((res) => {
        this.isSubmit = false;
        if (res.code === 0) {
          this.$message.success("提交成功");
          this.handleCancel(res);
        }
      });
    },
    handleCancel(res) {
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.fromCont {
  .fromRow {
    margin-bottom: 20px;

    .lable {
      line-height: 36px;
      text-align: right;
    }

    .inputCont {
      padding-right: 20px;
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.cont {
  padding: 40px 80px;

  .btn {
    margin: auto;
    margin-top: 30px;
    width: 180px;
    height: 48px;
    background-color: #004930;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 48px;
    color: #ffffff;
    cursor: pointer;

    &.loading {
      opacity: 0.7;
      cursor: no-drop;
    }
  }
}
</style>
