<template>
  <a-drawer
    :title="title"
    width="75%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div class="form">
      <a-row type="flex" class="formRow">
        <a-col class="lable">
          标题
        </a-col>
        <a-col class="text">
          <a-input
            v-model="model.memoryFamilyTree.title"
            placeholder="请输入家族谱标题"
            style="width: 310px;"
          />
        </a-col>
        <div v-if="show" style="display:flex;">
          <a-col class="lable" style="margin-left:20px;">
            是否公开
          </a-col>
          <a-col class="text">
            <a-switch
              checkedChildren="公开"
              unCheckedChildren="不公开"
              :checked="model.memoryFamilyTree.status === '0' ? true : false"
              @change="setStatus(model.memoryFamilyTree)"
            />
          </a-col>
        </div>
      </a-row>

      <graphCont ref="graphCont"></graphCont>
    </div>
    <div class="submit-cont">
      <a-button type="primary" @click="onSubmit">确定</a-button>&nbsp;
      <a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { saveFamilyTree, getFamilyTree } from "@/pages/pc/api/zpg.js";
export default {
  components: {
    graphCont: () =>
      import("@/pages/pc/views/member/create/components/graph-cont.vue"),
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      show: false,
      title: "",
      headers: {
        token: this.$store.state.account.token,
      },
      model: {
        memoryFamilyTree: {
          id: "",
          title: "",
          status: "0",
          mobiles: [],
        },
        graphJson: {},
      },
      modelInfo: {
        id: "",
      },
    };
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加家族谱" : "编辑家族谱";
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.id) {
        this.show = true;
        this.modelInfo.id = this.id;
        getFamilyTree(this.modelInfo).then((res) => {
          Object.assign(this.model, res.data);
          this.$nextTick(() => {
            this.$refs.graphCont.loadData(res.data.graphJson);
          });
        });
      }
    },
    onSubmit() {
      const data = this.bindDataGraphCont();
      this.model.graphJson = data;
      saveFamilyTree(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    bindDataGraphCont() {
      return this.$refs.graphCont.getGraphJson();
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
    setStatus(record) {
      this.$emit("onSetStatus", record);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-btn-primary {
  background: #004930;
  border: #004930;
}
/deep/ .ant-switch-checked {
  background: #004930;
}
.form {
  .formRow {
    margin-bottom: 10px;

    .lable {
      line-height: 36px;
      padding-right: 10px;
    }

    .text {
      line-height: 36px;
      width: 310px;
    }
  }
}

.graphCont {
  // height: calc(100vh - 260px);
  border: 1px solid #dddddd;
  display: flex;

  .graphLable {
    width: 65px;
    padding-left: 5px;
  }

  /deep/ .c-my-node {
    background-position: center center;
    background-size: 100%;
    border: #004930 solid 1px;
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }

  /deep/ .c-node-name {
    width: 160px;
    margin-left: -40px;
    text-align: center;
    margin-top: 85px;
    color: #333333;
  }
}

.submit-cont {
  padding-top: 30px;
}
</style>
