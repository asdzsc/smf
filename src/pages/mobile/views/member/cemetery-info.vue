<template>
  <div>
    <div class="title">
      {{ title }}
    </div>

    <div class="form">
      <div class="formItem">
<<<<<<< HEAD
        <div class="label">落葬人</div>
=======
        <div class="label">
          落葬人
        </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <div class="inputCont">
          <input
            v-model="model.bpname"
            @change="_searchCemeteryList()"
            placeholder="请输入落葬人姓名"
          />
        </div>
      </div>
      <div class="formItem">
<<<<<<< HEAD
        <div class="label">墓址</div>
        <div class="inputCont">
          <van-field
            v-model="model.cemeaddress"
            right-icon="arrow"
            placeholder="请选择墓址信息"
            readonly
            @click="showSheet"
          />
          <van-action-sheet v-model="show">
            <div
              class="content"
              v-for="item in cemeteryList"
              :key="item.cemeteryId"
              @click="onSelect(item)"
            >
              主办人：{{ item.masterName }}<br />
              {{ item.cemetery }}
            </div>
          </van-action-sheet>
        </div>
        <div class="inputCont inputCont1" v-if="showMsg">
          <van-field placeholder="没有查询到墓址信息" />
=======
        <div class="label">
          墓址
        </div>
        <div class="inputCont">
          <input v-model="model.cemeaddress" placeholder="请输入墓址" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        </div>
      </div>
    </div>

    <div class="loginBtnCont">
<<<<<<< HEAD
      <div @click="submit()" class="loginBtn">保存服务墓址</div>
=======
      <div @click="submit()" class="loginBtn">
        保存服务墓址
      </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    </div>

    <div class="page-line"></div>
  </div>
</template>

<script>
<<<<<<< HEAD
// getCemeteryInfo,
import { searchCemeteryList, saveCemetery } from "@/pages/mobile/api/user";
export default {
  data() {
    return {
      show: false,
      showMsg: false,
=======
import { searchCemeteryList, getCemeteryInfo, saveCemetery } from "@/pages/mobile/api/user";
export default {
  data() {
    return {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      baseUrl: process.env.VUE_APP_BASE_URL,
      title: "",
      model: {
        id: "",
        bpname: "",
        cemeaddress: "",
<<<<<<< HEAD
        isCheck: "0",
        erpCemeteryId: "", //关联erp墓址id
        masterName: "",
        erpCemeteryIdKey: { key: "" },
      },
      cemeteryList: [],
=======
        isCheck: "0"
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
<<<<<<< HEAD
    showSheet() {
      if (this.model.bpname == "") {
        this.$notify({
          type: "warning",
          message: "请输入落葬人姓名",
        });
      } else if (this.cemeteryList.length > 0) {
        this.show = true;
      }
    },
    onSelect(item) {
      this.show = false;
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.cemeaddress = item.cemetery;
    },
    loadData() {
      if (!this.$route.query.id) {
        this.title = "新增服务墓址";
        // } else {
        //   this.title = "编辑服务墓址";
        //   getCemeteryInfo({
        //     id: this.$route.query.id,
        //   }).then((res) => {
        //     if (res.code === 0) {
        //       Object.assign(this.model, res.data);
        //     }
        //   });
=======
    loadData() {
      if (!this.$route.query.id) {
        this.title = "新增服务墓址";
      } else {
        this.title = "编辑服务墓址";
        getCemeteryInfo({
          id: this.$route.query.id
        }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      }
    },
    _searchCemeteryList() {
      if (this.model.bpname) {
<<<<<<< HEAD
        this.model.erpCemeteryId = "";
        this.model.erpCemeteryIdKey = { key: "" };
        this.cemeteryList = [];
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        searchCemeteryList({
          current: 1,
          pageSize: 10,
          searchText: this.model.bpname,
        }).then((res) => {
          if (res.code === 0) {
            this.$toast.clear();
            Object.assign(this.cemeteryList, res.data.data);
            if (this.cemeteryList.length > 0) {
              this.show = true;
              this.showMsg = false;
            } else {
              this.show = false;
              this.showMsg = true;
              this.model.cemeaddress = "";
=======
        searchCemeteryList({
          current: 1,
          pageSize: 1,
          searchText: this.model.bpname
        }).then(res => {
          if (res.code === 0) {
            if (res.data.list.length > 0) {
              var info = res.data.list[0];
              this.model.cemeaddress = info.cemeaddress;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            }
          }
        });
      }
    },
    submit() {
<<<<<<< HEAD
      saveCemetery(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "数据提交成功",
          });
          this.$router.push("/member/userInfo");
        }
      });
    },
  },
=======
      saveCemetery(this.model).then(res => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "数据提交成功"
          });
          this.$router.push("/member/userInfo");
        }
      })
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
.page-line {
  padding-bottom: 0.2rem;
  background-color: #f5f5f5;
}

.title {
  padding: 0rem 0.5rem;
  padding-top: 0.5rem;
  font-weight: 700;
  font-size: 0.36rem;
  color: #333333;
}

.form {
  padding: 0.5rem;

  .formItem {
    padding-bottom: 0.3rem;

    .label {
<<<<<<< HEAD
      font-size: 0.3rem;
=======
      font-size: 0.22rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      font-weight: 700;
      color: #333333;
    }

    .inputCont {
      padding-top: 0.1rem;
<<<<<<< HEAD
      /deep/ .van-action-sheet__content {
        .content {
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.35rem;
          width: 80%;
          margin: 0 auto;
          border-bottom: 1px solid #ccc;
          &:last-child {
            border-bottom: none;
          }
        }
      }
      /deep/ .van-cell {
        padding: 0;
        height: 0.8rem;
        line-height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
        .van-cell__right-icon {
          line-height: 0.8rem;
        }
      }
=======

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      input {
        width: 6.1rem;
        height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }
    }
<<<<<<< HEAD
    .inputCont1 {
      /deep/ input::-webkit-input-placeholder {
        color: red;
      }
      /deep/ .van-cell {
        padding: 0;
        height: 0.8rem;
        line-height: 0.8rem;
        border: solid 0.02rem #ffa39e;
        background-color: #fff1f0;
        color: #333;
        padding: 0rem 0.2rem;
        outline: none;
        .van-cell__right-icon {
          line-height: 0.8rem;
        }
      }
    }
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

    .verifyCode {
      padding-top: 0.1rem;
      display: flex;

      input {
        flex: 1;
        height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }

      .codeImg {
        width: 1.6rem;
        height: 0.8rem;
        border: solid 1px #e0e0e0;
        border-left: 0px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .smsCodeBtn {
        width: 1.6rem;
        height: 0.8rem;
        background-color: #004930;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.26rem;
        font-weight: normal;
        color: #ffffff;
        cursor: pointer;

        &.disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
        }
      }
    }
  }
}

.loginBtnCont {
  padding: 0.5rem;
  padding-top: 0rem;

  .loginBtn {
    margin: auto;
    width: 100%;
    height: 0.8rem;
    background-color: #004930;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.28rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
