<template>
  <div class="contItem">
    <div class="contTitle">服务信息</div>
    <div class="contInfo">
      <div class="fromCont">
        <a-row class="fromRow" type="flex">
          <a-col flex="80px" class="lable"> 联系人： </a-col>
          <a-col class="inputCont">
            <a-input
              v-model="model.contacts"
              placeholder="请填写联系人姓名"
              style="width: 200px"
            />
          </a-col>
          <a-col flex="80px" class="lable"> 手机号： </a-col>
          <a-col class="inputCont">
            <a-input
              v-model="model.mobile"
              placeholder="请填写手机号"
              style="width: 200px"
            />
          </a-col>
        </a-row>
        <a-row class="fromRow" type="flex">
          <a-col flex="80px" class="lable"> 服务时间： </a-col>
          <a-col class="inputCont">
            <a-date-picker
              v-model="model.serveTimeDate"
              :disabled-date="disabledDate"
              @change="onChangeDate"
              placeholder="请选择服务时间"
              style="width: 200px"
              inputReadOnly
            />
          </a-col>
          <a-col flex="80px" class="lable"> 服务方式： </a-col>
          <a-col class="inputCont">
            <a-select
              v-model="model.serveType"
              style="width: 200px"
              placeholder="选择服务方式"
            >
              <a-select-option value="代客服务"> 代客服务 </a-select-option>
              <a-select-option value="自取方式"> 自取方式 </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="fromRow" type="flex">
          <a-col flex="80px" class="lable"> 客户留言： </a-col>
          <a-col class="inputCont">
            <a-textarea
              v-model="model.remark"
              placeholder="选填:对本次服务的说明"
              style="width: 500px"
              :auto-size="{ minRows: 5, maxRows: 5 }"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      user: {
        mobile: "",
      },
      model: {
        contacts: "", //联系人
        mobile: "", //联系电话
        serveTime: "", //服务时间
        serveTimeDate: null,
        serveType: "代客服务", //服务方式  代客服务  自取方式
        remark: "",
      },
    };
  },
  mounted() {
    this.user = this.$store.state.account.user;
    if (this.user.mobile) {
      this.model.mobile = this.user.mobile;
    }
    //服务时间
    this.model.serveTimeDate = moment().add(1, "days");
    console.log(this.model.serveTimeDate);
    this.model.serveTime = this.model.serveTimeDate.format(
      "YYYY-MM-DD 00:00:00"
    );
  },
  methods: {
    //禁止选择的时间
    disabledDate(current) {
      return current && current < moment().endOf("day");
    },
    onChangeDate(date, dateString) {
      console.log(date, dateString);
      this.model.serveTimeDate = date;
      this.model.serveTime = dateString ? dateString + " 00:00:00" : "";
    },
    //获取数据
    getData() {
      if (!this.model.contacts) {
        this.$notification.error({
          message: "提示",
          description: "请填写联系人姓名",
        });
        return null;
      }
      if (!this.model.mobile) {
        this.$notification.error({
          message: "提示",
          description: "请填写手机号",
        });
        return null;
      }
      if (!this.model.serveTime) {
        this.$notification.error({
          message: "提示",
          description: "请选择服务时间",
        });
        return null;
      }
      if (!this.model.serveType) {
        this.$notification.error({
          message: "提示",
          description: "请选择服务方式",
        });
        return null;
      }
      return this.model;
    },
  },
};
</script>

<style lang="less" scoped>
.contItem {
  .contTitle {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
  }

  .addAddress {
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    color: #004930;
  }

  .contInfo {
    padding: 20px 0px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    border-bottom: solid 1px #cccccc;

    .itemDiv {
      width: 140px;
      height: 40px;
      border: solid 2px #cccccc;
      position: relative;
      margin-right: 50px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 35px;
      color: #333333;
      cursor: pointer;

      .ok {
        position: absolute;
        right: 0px;
        bottom: 0px;
        display: none;
      }

      &:hover {
        border: solid 2px #004930;
      }

      &.check {
        border: solid 2px #004930;

        .ok {
          display: block;
        }
      }
    }
  }
}
</style>
