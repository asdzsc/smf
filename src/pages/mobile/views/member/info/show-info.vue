<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="createBox">
      <div class="avatarUpload">
        <avatarUpload ref="photoUpload" @change="uploadPhoto"></avatarUpload>
      </div>
      <van-form style="margin-top: 1.2rem" @submit="onSubmit">
        <van-field
          v-model="model.name"
          name="姓名"
          label="姓名"
          @change="_searchCemeteryList"
          placeholder="请输入亲人姓名"
        />
        <van-field
          v-model="model.gender"
          name="性别"
          label="性别"
          placeholder="请输入亲人性别"
          @click="showGender = true"
        />
        <van-action-sheet
          v-model="showGender"
          :actions="actions"
          @select="onSelect"
        />
        <van-field
          v-model="model.birthdayAddress"
          name="出生地"
          label="出生地"
          placeholder="请输入亲人出生地"
        />
        <van-field
          v-model="model.birthdayDate"
          label="出生日期"
          placeholder="请选择出生日期"
          right-icon="arrow"
          readonly
          @click="showBirthday = true"
        />
        <!-- <van-calendar
          v-model="showBirthday"
          @confirm="onConfirmBirthday"
          :min-date="minDate"
          :max-date="maxDate"
        /> -->
        <van-popup
          v-model="showBirthday"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-datetime-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            v-model="currentDate"
            @confirm="onConfirmBirthday"
            @cancel="showBirthday = false"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
        <van-field
          v-model="model.dieAddress"
          name="离世地"
          label="离世地"
          placeholder="请输入亲人离世地"
        />
        <van-field
          v-model="model.dieTimeDate"
          label="离世日期"
          placeholder="请选择离世日期"
          right-icon="arrow"
          readonly
          @click="showDie = true"
        />
        <!-- <van-calendar
          :min-date="minDate1"
          :max-date="maxDate1"
          v-model="showDie"
          @confirm="onConfirmDie"
        /> -->
        <van-popup
          v-model="showDie"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-datetime-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            v-model="currentDate"
            @confirm="onConfirmDie"
            @cancel="showDie = false"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate1"
          />
        </van-popup>
        <!-- <van-field
          v-model="model.buryAddress"
          name="安葬地"
          label="安葬地"
          placeholder="请输入亲人安葬地"
        /> -->

        <van-field
          label="安葬地"
          v-model="model.buryAddress"
          placeholder="请选择亲人安葬地"
          @click="showMsg = false"
        >
          <template v-if="this.cemeteryList.length > 0" #right-icon>
            <van-icon @click.stop="showSheet" name="arrow" />
          </template>
        </van-field>

        <div class="inputCont1" v-if="showMsg">
          <van-field placeholder="没有查询到墓址信息，请手动输入" />
        </div>

        <van-action-sheet v-model="show">
          <div
            class="content"
            v-for="item in cemeteryList"
            :key="item.cemeteryId"
            @click="onSelect1(item)"
          >
            主办人：{{ item.masterName }}<br />
            {{ item.cemetery }}
          </div>
        </van-action-sheet>

        <!-- <div class="van-field_wrap">
          <van-field
            label="安葬地"
            v-model="model.buryAddress"
            right-icon="arrow"
            placeholder="请选择亲人安葬地"
          >
            <template #right-icon>
              <van-icon @click="showSheet" name="arrow" />
            </template>
          </van-field>

          <div class="inputCont1" v-if="showMsg">
            <van-field placeholder="没有查询到墓址信息，请手动输入" />
          </div>
        </div> -->

        <van-field
          v-model="model.epitaph"
          name="墓志铭"
          label="墓志铭"
          placeholder="请输入亲人墓志铭"
        />
        <van-field
          v-model="model.intro"
          rows="3"
          autosize
          label="个人简介:"
          type="textarea"
          placeholder="请输入个人简介"
        />
        <div style="margin: 16px">
          <div class="btn" @click="onSubmit">保存</div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getMemoryInfo, updateMemoryPage } from "@/pages/mobile/api/mark.js";
import { searchCemeteryList } from "@/pages/mobile/api/user";
export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
    avatarUpload: () =>
      import("@/pages/mobile/views/member/info/avatarImg.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      showBirthday: false,
      showDie: false,
      showGender: false,
      show: false,
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      minDate1: new Date(1900, 0, 1),
      maxDate1: new Date(),
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
        buryAddress: "", //安葬地址
        templateId: "0", //模版id
        activateCode: "", //激活码
        mobiles: [], //手机号
        status: "0", //显示状态 0显示 1影藏
        memoryType: "0", //0普通用户 1名人主页
        sortId: 0, //排序 降序
        expireTimeDate: null,
        expireTime: "", //到期时间
        erpCemeteryId: "",
        masterName: "",
        erpCemeteryIdKey: { key: "" },
      },
      cemeteryList: [],
      showMsg: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
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
    onSelect1(item) {
      this.show = false;
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.buryAddress = item.cemetery;
    },
    _searchCemeteryList() {
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      // });
      this.model.name = this.model.name.trim();
      if (this.model.name) {
        this.model.erpCemeteryId = "";
        this.model.erpCemeteryIdKey = { key: "" };
        this.cemeteryList = [];
        searchCemeteryList({
          current: 1,
          pageSize: 10,
          searchText: this.model.name,
        }).then((res) => {
          if (res.code === 0) {
            // this.$toast.clear();
            Object.assign(this.cemeteryList, res.data.data);
            this.showMsg = this.cemeteryList.length > 0 ? false : true;
            // if (this.cemeteryList.length > 0) {
            //   this.show = true;
            //   this.showMsg = false;
            // } else {
            //   this.show = false;
            //   // this.showMsg = true;
            //   // this.model.cemeaddress = "";
            // }
          }
        });
      }
    },
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
      if (this.$route.query.id) {
        this.model.id = this.$route.query.id;
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
            // if (this.model.erpCemeteryId) {
            //   this.cemeteryList.push({
            //     cemeteryId: this.model.erpCemeteryId,
            //     cemetery: this.model.buryAddress,
            //     masterName: this.model.masterName,
            //   });
            //   this.model.erpCemeteryIdKey = { key: this.model.erpCemeteryId };
            // }
          }
          this.bindData();
        });
      } else {
        this.bindData();
      }
    },
    bindData() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.photoUpload.setImg(this.baseUrl + this.model.photo);
        }, 200);
      });
    },
    uploadPhoto(imgUrl) {
      this.model.photo = imgUrl;
    },
    onSubmit() {
      // console.log(this.model);
      updateMemoryPage(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "数据提交成功",
          });
          this.$router.push({
            path: "/member/grjnUser",
          });
        }
      });
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
    // border: solid 0.02rem #e0e0e0;
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
    .van-cell__value {
      background: none;
    }
    .van-cell__right-icon {
      line-height: 0.8rem;
    }
  }
}
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
.createBox {
  // padding: 0.5rem;
  box-sizing: border-box;
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
      top: 2.98rem;
      z-index: 99;
      transform: translateX(-50%);
    }
    /deep/ .van-uploader {
      width: 100%;
      .van-uploader__wrapper {
        // border: solid 0.02rem #e0e0e0;
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
