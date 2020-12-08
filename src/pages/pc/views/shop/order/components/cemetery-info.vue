<template>
  <modal :title="title" @onClose="handleCancel" width="700px">
    <div class="cont">
      <a-form-model
        :model="model"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item label="落葬人:">
          <a-input
            v-model="model.bpname"
            @change="_searchCemeteryList()"
            placeholder="请输入落葬人姓名"
          />
        </a-form-model-item>
        <a-form-model-item label="墓址:">
          <a-input v-model="model.cemeaddress" placeholder="请输入墓址" />
        </a-form-model-item>
      </a-form-model>

      <div @click="submit()" class="btn">保存服务墓址</div>
    </div>
  </modal>
</template>

<script>
import { searchCemeteryList, getCemeteryInfo, saveCemetery } from "@/pages/pc/api/user";
export default {
  components: {
    modal: () => import("@/pages/pc/components/modal.vue")
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      title: "",
      model: {
        id: "",
        bpname: "",
        cemeaddress: "",
        isCheck: "0"
      }
    };
  },
  mounted() {
    this.model.id = this.id;
    this.loadData();
  },
  methods: {
    loadData() {
      if (!this.model.id) {
        this.title = "新增服务墓址";
      } else {
        this.title = "编辑服务墓址";
        getCemeteryInfo({
          id: this.model.id
        }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      }
    },
    _searchCemeteryList() {
      if (this.model.bpname) {
        searchCemeteryList({
          current: 1,
          pageSize: 1,
          searchText: this.model.bpname
        }).then(res => {
          if (res.code === 0) {
            if (res.data.list.length > 0) {
              var info = res.data.list[0];
              this.model.cemeaddress = info.cemeaddress;
            }
          }
        });
      }
    },
    submit() {
      saveCemetery(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.handleCancel(res);
        }
      });
    },
    handleCancel(res) {
      this.$emit("onClose", res);
    }
  }
};
</script>

<style lang="less" scoped>
.cont {
  padding: 40px 80px;

  .btn {
    margin: auto;
    margin-top: 60px;
    width: 180px;
    height: 48px;
    background-color: #004930;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 48px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
