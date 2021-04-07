<template>
  <div class="activeDiv">
    <img src="/img/pc/syjhm.jpg" alt="" />
    <p class="activeTitle">创建主页</p>
    <p>请输入我们给您提供的激活码，即可获得该追思主页使用权：</p>
    <div class="wrap">
      <p>创建流程请</p>
      <van-button type="primary" @click="handleClick" size="small"
        >点击查看</van-button
      >
    </div>
    <input
      v-model="model.code"
      placeholder="请输入激活码"
      style="
        height: 30px;
        width: 70%;
        padding: 0px 10px;
        margin: 10px 0px;
        outline: none;
      "
    />
    <!-- <van-field class="input" v-model="model.code" placeholder="请输入激活码" /> -->
    <div class="activeBtn">
      <div class="cancel" @click="handleCancel">取消</div>
      <van-button type="primary" @click="goCreate" size="small"
        >继续</van-button
      >
      <!-- <div class="continue" @click="goCreate">继续</div> -->
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { verifyCode } from "@/pages/mobile/api/mark.js";
export default {
  data() {
    return {
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
      Dialog.alert({
        title: "创建流程",
        message:
          "请主办人携带身份证来园区办理个人纪念馆创建事宜，非主办人无法创建。",
      }).then(() => {
        // on close
      });
    },
    goCreate() {
      if (this.model.code == "") {
        this.$notify({
          type: "warning",
          message: "激活码不能为空！",
        });
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
  text-align: center;
  z-index: 99;
  background-color: white;
  width: 90%;
  height: 7.2rem;
  position: fixed;
  top: 15%;
  left: 5%;
  border: 1px;
  border-radius: 10px;
  border-color: #22be6d;
  border-style: solid;
  /deep/.van-dialog__footer {
    .van-dialog__confirm,
    .van-dialog__confirm:active {
      color: #22be6d !important;
    }
  }
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0.2rem 0;
    }
  }
  img {
    margin: 0.4rem 0;
  }
  .activeTitle {
    margin: 0.2rem 0;
    font-size: 0.4rem;
    font-weight: bold;
  }
  p {
    padding: 0 0.4rem;
  }
  .input {
    border-radius: 0.08rem;
    width: 80%;
    margin: 0 auto;
    margin-top: 0.3rem;
    // height: 0.4rem;
    background-color: #fff;
    border-color: #00744c;
  }
  /deep/ .van-cell__value {
    background: #e1e9e0;
  }
  .activeBtn {
    display: flex;
    justify-content: center;
    div {
      width: 1.2rem;
      height: 0.55rem;
      line-height: 0.55rem;
      border-radius: 0.08rem;
      font-size: 0.28rem;
    }
    .cancel {
      background-color: #fff;
      color: #999999;
      line-height: 32px;
    }
    .continue {
      background-color: #22be6d;
      color: #fff;
    }
  }
}
</style>
