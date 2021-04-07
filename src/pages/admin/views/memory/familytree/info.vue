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
        <a-col class="lable"> 标题 </a-col>
        <a-col class="text">
          <a-input
            v-model="model.title"
            placeholder="请输入家族谱标题"
            style="width: 350px"
          />
        </a-col>
      </a-row>
      <a-row type="flex" class="formRow">
        <a-col class="lable"> 是否公开 </a-col>
        <a-col class="text">
          <a-switch
            checkedChildren="公开"
            unCheckedChildren="不公开"
            :checked="model.status === '0' ? true : false"
            @change="setStatus()"
          />
        </a-col>
        <a-col class="lable"> 绑定手机号 </a-col>
        <a-col class="text">
          <template v-for="tag in model.mobiles">
            <a-tag :key="tag" closable @close="delMobile($event, tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="inputMobileVisible"
            ref="inputMobile"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputMobileValue"
            @change="handleInputMobileChange"
            @blur="handleInputMobileConfirm"
            @keyup.enter="handleInputMobileConfirm"
          />
          <a-tag
            v-else
            style="background: #fff; borderstyle: dashed"
            @click="showInputMobile"
          >
            <a-icon type="plus" />添加手机号
          </a-tag>
        </a-col>
      </a-row>

      <graphCont ref="graphCont"></graphCont>
    </div>
    <div class="submit-cont">
      <a-button type="primary" @click="onSubmit">确定</a-button>&nbsp;
      <a-button @click="onClose" style="margin-left: 10px">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
import {
  getFamilyTree,
  saveFamilyTree,
} from "@/pages/admin/api/memory/familytree";
export default {
  components: {
    graphCont: () =>
      import("@/pages/admin/views/memory/familytree/components/graph-cont.vue"),
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
      title: "",
      inputMobileVisible: false,
      inputMobileValue: "",
      model: {
        id: "",
        title: "",
        status: "0",
        mobiles: [],
      },
    };
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加家族谱" : "编辑家族谱";
    this.loadData();
  },
  methods: {
    //加载数据
    loadData() {
      if (this.id) {
        getFamilyTree({
          id: this.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data.memoryFamilyTree);
            this.$nextTick(() => {
              this.$refs.graphCont.loadData(res.data.graphJson);
            });
          }
        });
      }
    },
    showInputMobile() {
      this.inputMobileVisible = true;
      this.$nextTick(function () {
        this.$refs.inputMobile.focus();
      });
    },
    handleInputMobileChange(e) {
      this.inputMobileValue = e.target.value;
    },
    handleInputMobileConfirm() {
      const inputValue = this.inputMobileValue;
      let tags = this.model.mobiles;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.model.mobiles = tags;
      this.inputMobileVisible = false;
      this.inputMobileValue = "";
    },
    //删除手机号
    delMobile(e, mobile) {
      e.preventDefault();
      var vm = this;
      this.$confirm({
        title: "确定要删除该手机号吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          vm.model.mobiles = vm.model.mobiles.filter((x) => {
            return x !== mobile;
          });
        },
        onCancel() {},
      });
    },
    onSubmit() {
      var graphJson = this.$refs.graphCont.getData();
      console.log("onSubmit", graphJson);
      saveFamilyTree({
        memoryFamilyTree: this.model,
        graphJson: graphJson,
      }).then((res) => {
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
.form {
  .formRow {
    margin-bottom: 10px;

    .lable {
      width: 150px;
      line-height: 36px;
      text-align: right;
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
