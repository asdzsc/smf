<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">墓址列表</div>
    <div class="form">
      <div class="formItem">
        <div class="label">墓址</div>
        <div class="inputCont">
          <input v-model="model.address" placeholder="填写墓址" />
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
            <van-row type="flex" style="border-bottom: 1px solid #dcdcdc">
              <van-col class="color" span="6">编号</van-col>
              <van-col class="text" span="18">{{ item.code }}</van-col>
            </van-row>
            <van-row type="flex" style="border-bottom: 1px solid #dcdcdc">
              <van-col class="color" span="6">墓址</van-col>
              <van-col class="text" span="18">{{ item.address }}</van-col>
            </van-row>
            <van-row type="flex" style="border-bottom: 1px solid #dcdcdc">
              <van-col class="color" span="6">墓志铭</van-col>
              <van-col class="text" span="18">{{ item.epitaph }}</van-col>
            </van-row>
            <van-row type="flex" style="border-bottom: 1px solid #dcdcdc">
              <van-col class="color" span="6">备注</van-col>
              <van-col class="text" span="18">{{ item.remark }}</van-col>
            </van-row>
            <van-row type="flex">
              <van-col class="color" span="6">日期</van-col>
              <van-col class="text" span="18">{{
                parseTime(item.createDate)
              }}</van-col>
            </van-row>
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
import { cemeteryList } from "@/pages/mobile/api/smferp";
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
        address: "", //墓址
        total: "0",
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
      cemeteryList(this.model).then((res) => {
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

    .color {
      background: #f5f5f5;
      color: #999999;
      min-height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
    }

    .text {
      padding: 10px;
      line-height: 20px;
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
