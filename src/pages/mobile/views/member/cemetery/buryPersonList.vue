<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">落葬人信息</div>
    <div class="form">
      <div class="formItem">
        <div class="label">主办人</div>
        <div class="inputCont">
          <input v-model="model.masterName" placeholder="填写购买人信息" />
        </div>
      </div>
      <div class="formItem">
        <div class="label">安葬者或合葬者</div>
        <div class="inputCont">
          <input v-model="model.name" placeholder="填写安葬者或合葬者信息" />
        </div>
      </div>
      <van-button @click="search()" size="large" type="primary" color="#004930"
        ><span style="color: #fff">查询</span></van-button
      >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="dataList"
      >
        <template v-if="model.list.length > 0">
          <div
            class="div"
            v-for="item in model.list"
            :key="item.id"
            style="border: 1px solid #dcdcdc"
          >
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">主办人</p>
              <p class="width">{{ item.masterName }}</p>
              <p class="color">落葬人</p>
              <p class="width">{{ item.name }}</p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">逝世日期</p>
              <p class="width">{{ parseTime(item.dieDate) }}</p>
              <p class="color">安葬日期</p>
              <p class="width">{{ parseTime(item.buryTime) }}</p>
            </div>
            <div class="divBoxArea">
              <p class="color">墓址</p>
              <p style="margin-left: 0.2rem">{{ item.cemetery }}</p>
            </div>
          </div>
        </template>
        <template v-if="model.list.length === 0 && !loading">
          <div>
            <van-empty description="暂无数据" />
          </div>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { buryPersonList } from "@/pages/mobile/api/smferp";
import * as utils from "@/pages/mobile/libs/utils";

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      loading: false,
      finished: false,
      model: {
        current: 0,
        pageSize: 15,
        name: "", //落葬人
        masterName: "", //主办人
        total: 0,
        list: [],
      },
    };
  },
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  methods: {
    search() {
      this.finished = false;
      this.model.current = 0;
      this.model.list = [];
      this.dataList();
    },
    dataList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      this.model.current++;
      if (!this.finished) {
        buryPersonList(this.model).then((res) => {
          this.$toast.clear();
          this.loading = false;
          if (res.code === 0) {
            this.model.total = res.data.totalRows;
            const results = res.data.data;
            this.model.list.push(...results);
            if (res.data.data.length === 0) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        });
      }
    },
    parseTime(dtime) {
      if (dtime) {
        if (dtime.length <= 10) {
          dtime += " 00:00:00";
        }
        return utils.parseTime(dtime, "{y}/{m}/{d}");
      }
      return "";
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin-bottom: 0px !important;
}

.title {
  padding: 0rem 0.5rem;
  padding-top: 0.5rem;
  font-weight: 700;
  font-size: 0.36rem;
  color: #333333;
}

.cartIcon {
  width: 0.88rem;
  height: 0.64rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  border-radius: 0px 0.1rem 0.1rem 0px;
}

.form {
  padding: 0.5rem;

  .div {
    margin-top: 0.5rem;

    .divBoxArea {
      display: flex;

      .color {
        background: #f5f5f5;
        color: #999999;
        width: 25%;
      }

      p {
        display: block;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
    }

    .divBox {
      display: flex;
      justify-content: space-between;

      p {
        display: block;
        height: 0.8rem;
        width: 25%;
        text-align: center;
        line-height: 0.8rem;
      }

      .color {
        background: #f5f5f5;
        color: #999999;
      }
    }
  }

  .formItem {
    padding-bottom: 0.3rem;

    .label {
      font-size: 0.3rem;
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
</style>
