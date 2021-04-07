<template>
  <div class="createBox">
    <div class="head">
      编辑个人主页：
    </div>
    <div class="avatarUpload">
      <img
        class="avatarImg"
        @click="handleChange"
        v-if="model.photo"
        :src="baseUrl + model.photo"
        alt=""
      />
      <avatarUpload ref="photoUpload" @change="uploadPhoto"></avatarUpload>
      <div class="search">
        <van-field
          v-model="model.name"
          label="姓名:"
          placeholder="请输入亲人姓名"
        />
        <van-cell
          id="select"
          style="width: 59%;margin: 0 auto;color: #646566;"
          closeable
          title="性别："
          :value="model.gender"
          @click="showGender = true"
        />
        <van-action-sheet
          v-model="showGender"
          :actions="actions"
          @select="onSelect"
        />
      </div>
    </div>
    <div class="intro">
      <div class="title">
        <p>生平简介</p>
        <div class="line"></div>
      </div>
      <van-field
        v-model="model.birthdayAddress"
        label="出生地:"
        placeholder="请输入出生地"
      />
      <van-field
        v-model="model.birthdayDate"
        label="出生日期:"
        placeholder="请选择出生日期"
        @focus="showBirthday = true"
      />
      <van-calendar
        v-model="showBirthday"
        @confirm="onConfirmBirthday"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <van-field
        v-model="model.dieAddress"
        label="离世地:"
        placeholder="请输入离世地"
      />
      <van-field
        v-model="model.dieTimeDate"
        label="离世日期:"
        placeholder="请选择离世日期"
        @focus="showDie = true"
      />
      <van-calendar
        :min-date="minDate1"
        :max-date="maxDate1"
        v-model="showDie"
        @confirm="onConfirmDie"
      />
      <van-field
        v-model="model.buryAddress"
        label="安葬地:"
        placeholder="请输入安葬地"
      />
      <van-field
        v-model="model.epitaph"
        label="墓志铭:"
        placeholder="请输入墓志铭"
      />
      <van-field
        v-model="model.intro"
        rows="3"
        autosize
        label="个人简介:"
        type="textarea"
        placeholder="请输入个人简介"
      />
      <div class="btn" @click="onSubmit">
        保存
      </div>
    </div>
  </div>
</template>

<script>
import { getMemoryInfo, updateMemoryPage } from "@/pages/mobile/api/mark.js";
import * as utils from "@/pages/mobile/libs/utils";
import moment from "moment";
export default {
  components: {
    avatarUpload: () =>
      import("@/pages/mobile/views/mark/create/components/avatarUpload.vue"),
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      showBirthday: false,
      showDie: false,
      showGender: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2030, 0, 0),
      minDate1: new Date(1900, 0, 1),
      maxDate1: new Date(2030, 0, 0),
      actions: [
        {
          name: " 男 ",
        },
        {
          name: " 女 ",
        },
      ],
      model: {
        id: "",
        columnIdsKey: [],
        columnIds: [], //类别
        name: "", //姓名
        gender: "男", //性别
        photo: "", //头像照片
        birthday: null, //生日
        birthdayDate: null,
        dieTime: null, //离世日期
        dieTimeDate: null,
        birthdayAddress: "", //出生城市
        dieAddress: "", //离世城市
        intro: "", //简介
        cont: "", //图文简介
        epitaph: "", //墓志铭
        cover: "", //封面图
        phoneCover: "", //手机封面图
        bg: "", //背景
        phoneBg: "", //手机背景
        buryAddress: "", //安装地址
        templateId: "0", //模版id
        activateCode: "", //激活码
        mobiles: [], //手机号
        status: "0", //显示状态 0显示 1影藏
        memoryType: "0", //0普通用户 1名人主页
        sortId: 0, //排序 降序
        expireTimeDate: null,
        expireTime: "", //到期时间
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onSelect(item) {
      this.showGender = false;
      this.model.gender = `${item.name}`;
    },
    handleChange() {
      this.model.photo = "";
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirmBirthday(date) {
      this.showBirthday = false;
      let dateString = this.formatDate(date);
      this.model.birthdayDate = dateString;
      this.model.birthday = dateString ? dateString + " 00:00:00" : "";
    },
    onConfirmDie(date) {
      this.showDie = false;
      let dateString = this.formatDate(date);
      this.model.dieTimeDate = dateString;
      this.model.dieTime = dateString ? dateString + " 00:00:00" : "";
    },
    loadData() {
      if (this.id) {
        this.model.id = this.id;
        getMemoryInfo({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            if (this.model.birthday) {
              this.model.birthdayDate = this.model.birthday.substring(0, 10);
            }
            if (this.model.dieTime) {
              this.model.dieTimeDate = this.model.dieTime.substring(0, 10);
            }
          }
          this.bindData();
        });
      } else {
        this.bindData();
      }
    },
    bindData() {
      var vm = this;
      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.photoUpload.loadData(this.model.photo);
        }, 200);
      });
    },
    uploadPhoto(imgUrl) {
      this.model.photo = imgUrl;
    },
    onSubmit() {
      updateMemoryPage(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "数据提交成功",
          });
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-cell {
  background: none;
  .van-cell__value {
    background: #fff;
    padding: 0 0.1rem;
    text-align: left;
  }
  .van-field__label {
    width: 1.5rem;
    margin-right: 0;
  }
}
/deep/ .van-cell--center {
  .van-cell__value {
    background: none;
    margin-left: -0.6rem;
  }
}
.createBox {
  padding-top: 0.5rem;
  background: #e1e9e0;
  padding-bottom: 0.5rem;
  .head {
    width: 100%;
    color: #00744c;
    padding: 0 0.4rem;
  }
  .avatarUpload {
    margin-top: 1rem;
    .search {
      margin-top: 1.2rem;
      /deep/ .van-field {
        width: 55%;
        margin: 0 auto;
        margin-top: 0.2rem;
        line-height: 0.5rem;
        padding: 0.1rem 0.2rem;
        .van-cell__title {
          width: 1rem;
        }
      }
      #select {
        /deep/ .van-cell__title {
          flex: none;
          width: 1rem;
        }
      }
    }
    .avatarImg {
      width: 1.8rem;
      height: 1.8rem;
      background: #ffffff;
      text-align: center;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 1.22rem;
      z-index: 99;
      transform: translateX(-50%);
    }
    /deep/ .van-uploader {
      width: 100%;
      .van-uploader__wrapper {
        width: 1.8rem;
        height: 1.8rem;
        background: #ffffff;
        color: #666666;
        text-align: center;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: -0.9rem;
        transform: translateX(-50%);
        p {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  .intro {
    width: 90%;
    margin: 0 auto;
    .title {
      margin: 0.5rem auto;
      p {
        border-left: 0.04rem solid #00744c;
        padding-left: 0.1rem;
        height: 0.4rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #00744c;
        margin-bottom: 0.05rem;
      }
      .line {
        height: 0.01rem;
        background: #00744c;
      }
    }
    /deep/ .van-field {
      margin: 0 auto;
      margin-top: 0.2rem;
      line-height: 0.5rem;
      padding: 0.1rem 0.2rem;
    }
  }
  /deep/ .van-calendar__selected-day {
    background-color: #00744c;
  }
  /deep/ .van-button--danger {
    background-color: #00744c;
    border: 1px solid #00744c;
  }
  .btn {
    width: 3.2rem;
    height: 0.73rem;
    background-color: #00744c;
    border-radius: 0.36rem;
    margin: 0.3rem auto;
    margin-top: 0.5rem;
    color: #fff;
    line-height: 0.73rem;
    text-align: center;
  }
}
</style>
