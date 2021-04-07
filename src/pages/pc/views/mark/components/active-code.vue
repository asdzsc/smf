<template>
  <div class="activeDiv">
    <img src="/img/pc/syjhm.jpg" alt="" />
    <p class="activeTitle">创建主页</p>
    <p>请输入我们给您提供的激活码，即可获得该追思主页使用权：</p>
    <p>
      创建流程请
      <a-button type="primary" @click="handleClick"> 点击查看 </a-button>
    </p>
    <a-alert
      v-if="showMsg"
      message="请主办人携带身份证来园区办理个人纪念馆创建事宜，非主办人无法创建。"
      type="info"
      closable
      :after-close="handleClose"
    />
    <a-input class="input" v-model="model.code" placeholder="请输入激活码" />
    <div class="activeBtn">
      <div class="cancel" @click="handleCancel">取消</div>
      <div class="continue" @click="goCreate">继续</div>
    </div>
  </div>
</template>

<script>
import { verifyCode } from "@/pages/pc/api/mark.js";
export default {
  data() {
    return {
      showMsg: false,
      model: {
        code: "",
      },
    };
  },
  methods: {
    handleCancel() {
      this.$parent.handleHide();
    },
    handleClick() {
      this.showMsg = true;
    },
    handleClose() {
      this.showMsg = false;
    },
    goCreate() {
      if (this.model.code == "") {
        this.$message.error("激活码不能为空！");
        return;
      } else {
        this.model.code = this.model.code.trim();
        verifyCode(this.model).then((res) => {
          if (res.code == 0) {
            this.$router.push({
              path: "/mark/create",
              query: {
                code: this.model.code,
              },
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.activeDiv {
  background-color: #fff;
  width: 600px;
  height: 450px;
  border: 2px;
  border-radius: 10px;
  border-color: #22be6d;
  border-style: solid;
  text-align: center;
  z-index: 99;
  position: fixed;
  left: 50%;
  top: 20%;
  margin-left: -300px;
  /deep/.ant-alert.ant-alert-closable {
    width: 90%;
    margin: 0 auto;
    background-color: #22be6d;
    .ant-alert-message {
      color: #fff;
    }
  }
  p {
    .ant-btn-primary {
      color: #fff;
      background-color: #22be6d;
      border-color: #22be6d;
    }
  }
  img {
    margin: 30px 0;
  }
  .activeTitle {
    font-size: 20px;
    font-weight: bold;
  }
  .input {
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    height: 35px;
    background-color: #fff;
    outline: none;
  }
  .activeBtn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    div {
      width: 120px;
      height: 35px;
      line-height: 35px;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
    }
    .cancel {
      background-color: #fff;
      color: #22be6d;
      border-color: #22be6d;
    }
    .continue {
      background-color: #22be6d;
      color: #fff;
    }
  }
}
</style>
