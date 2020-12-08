<template>
  <div>
    <div class="title">
      {{ title }}
    </div>

    <div class="form">
      <div class="formItem">
        <div class="label">
          落葬人
        </div>
        <div class="inputCont">
          <input
            v-model="model.bpname"
            @change="_searchCemeteryList()"
            placeholder="请输入落葬人姓名"
          />
        </div>
      </div>
      <div class="formItem">
        <div class="label">
          墓址
        </div>
        <div class="inputCont">
          <input v-model="model.cemeaddress" placeholder="请输入墓址" />
        </div>
      </div>
    </div>

    <div class="loginBtnCont">
      <div @click="submit()" class="loginBtn">
        保存服务墓址
      </div>
    </div>

    <div class="page-line"></div>
  </div>
</template>

<script>
import { searchCemeteryList, getCemeteryInfo, saveCemetery } from "@/pages/mobile/api/user";
export default {
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
    this.loadData();
  },
  methods: {
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
          this.$notify({
            type: "success",
            message: "数据提交成功"
          });
          this.$router.push("/member/userInfo");
        }
      })
    }
  }
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
      font-size: 0.22rem;
      font-weight: 700;
      color: #333333;
    }

    .inputCont {
      padding-top: 0.1rem;

      input {
        width: 6.1rem;
        height: 0.8rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }
    }

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
