<template>
  <div class="create">
    <div class="createBox">
      <div class="avatarUpload">
        <avatarUpload
          ref="avatarPhotoUpload"
          @change="uploadAvatarPhoto"
        ></avatarUpload>
        <!-- <div class="search">
          <van-field
            v-model="model.name"
            @change="_searchCemeteryList"
            label="姓名:"
            placeholder="请输入亲人姓名"
          />
          <van-cell
            id="select"
            style="width: 59%; margin: 0 auto; color: #646566"
            closeable
            title="性别:"
            :value="model.gender"
            @click="showGender = true"
          />
          <van-action-sheet
            v-model="showGender"
            :actions="actions"
            @select="onSelect"
          />
        </div> -->
      </div>

      <van-form style="margin-top: 1.2rem">
        <van-field
          v-model="model.name"
          label="姓名"
          placeholder="请输入亲人姓名"
          @change="_searchCemeteryList"
        />
        <van-field
          v-model="model.gender"
          label="性别"
          placeholder="请选择性别"
          right-icon="arrow"
          readonly
          @click="showGender = true"
        />
      </van-form>

      <div class="intro">
        <div class="title">
          <p>生平简介</p>
          <div class="line"></div>
        </div>
      </div>

      <van-form>
        <van-field
          v-model="model.birthdayAddress"
          label="出生地"
          placeholder="请输入出生地"
        />
        <van-field
          v-model="model.birthdayDate"
          label="出生日期"
          placeholder="请选择出生日期"
          right-icon="arrow"
          readonly
          @click="showBirthday = true"
        />
        <van-field
          v-model="model.dieAddress"
          label="离世地"
          placeholder="请输入离世地"
        />
        <van-field
          v-model="model.dieTimeDate"
          label="离世日期"
          placeholder="请选择离世日期"
          right-icon="arrow"
          readonly
          @click="showDie = true"
        />
        <van-field
          v-model="model.epitaph"
          label="墓志铭"
          placeholder="请输入墓志铭"
        />
        <van-field
          label="安葬地址"
          v-model="model.buryAddress"
          placeholder="请选择安葬地址"
          @click="showMsg = false"
        >
          <template #right-icon>
            <van-icon @click.stop="showSheet" name="arrow" />
          </template>
        </van-field>
        <div class="inputCont inputCont1" v-if="showMsg">
          <van-field placeholder="没有查询到墓址信息，请手动输入" />
        </div>
        <van-field
          v-model="model.intro"
          rows="3"
          autosize
          label="个人简介"
          type="textarea"
          placeholder="请输入个人简介"
        />

        <!-- 出生日期 -->
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
        <!-- 离世日期 -->
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
        <!-- 选择墓址 -->
        <van-action-sheet v-model="showCemeteryList">
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
      </van-form>

      <div class="intro">
        <div class="title" style="margin-bottom: 0px">
          <p>纪念相册</p>
          <div class="line"></div>
        </div>
        <photosUpload ref="photosUpload"></photosUpload>
      </div>

      <div class="intro">
        <div class="title">
          <p>祭奠留言</p>
          <div class="line"></div>
        </div>
      </div>
      <lyUpload ref="msgUpload"></lyUpload>

      <div class="intro">
        <div class="title">
          <p>纪念文章</p>
          <div class="line"></div>
        </div>
      </div>
      <articleUpload ref="articlesUpload"></articleUpload>

      <div class="intro">
        <div class="title">
          <p>纪念视频</p>
          <div class="line"></div>
        </div>
      </div>
      <videoUpload ref="memoryMediaVideo"></videoUpload>
    </div>

    <div class="fixedBtn">
      <div class="btn" @click="onSubmit">提交</div>
    </div>
  </div>
</template>

<script>
import { searchCemeteryList } from "@/pages/mobile/api/user";
import { addMemoryPage } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    avatarUpload: () =>
      import("@/pages/mobile/views/mark/create/components/avatarUpload.vue"),
    photosUpload: () =>
      import("@/pages/mobile/views/mark/create/components/photosUpload.vue"),
    lyUpload: () =>
      import("@/pages/mobile/views/mark/create/components/lyUpload.vue"),
    articleUpload: () =>
      import("@/pages/mobile/views/mark/create/components/articleUpload.vue"),
    videoUpload: () =>
      import("@/pages/mobile/views/mark/create/components/videoUpload.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      loading: false,
      showBirthday: false,
      showDie: false,
      showGender: false,
      showMsg: false,
      showCemeteryList: false,
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
        name: "", // 	落葬人姓名
        gender: "男", //性别 男 女
        photo: "", //头像
        birthday: null, //生日
        birthdayDate: null,
        dieTime: null, //离世日期
        dieTimeDate: null, //离世日期
        birthdayAddress: "", //出生地址
        dieAddress: "", //	 离世地址
        intro: "", //简介
        cont: "", //	图文详情
        epitaph: "", //	墓志铭
        buryAddress: "", //安葬地址
        templateId: "0", //0免费模版
        activateCode: this.$route.query.code, //激活码
        mobiles: [], //关联管理人手机号
        status: "0", //	0展示 1隐藏  默认0
        mediaList: [], //附件列表 图片 视频和一起
        msgList: [], //消息类型 1留言 2文章
        erpCemeteryId: "", //关联erp墓址id
        masterName: "",
        erpCemeteryIdKey: { key: "" },
      },
      cemeteryList: [],
    };
  },
  mounted() {
    let dateString = this.formatDate(new Date());
    this.model.birthdayDate = dateString;
    this.model.birthday = dateString ? dateString + " 00:00:00" : "";
    this.model.dieTimeDate = dateString;
    this.model.dieTime = dateString ? dateString + " 00:00:00" : "";
  },
  methods: {
    showSheet() {
      if (this.model.name == "") {
        this.$notify({
          type: "warning",
          message: "请输入落葬人姓名",
        });
      } else if (this.cemeteryList.length > 0) {
        this.showCemeteryList = true;
      }
    },
    onSelect1(item) {
      console.log(item);
      this.showCemeteryList = false;
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.buryAddress = item.cemetery;
    },
    // 获取墓址列表
    _searchCemeteryList() {
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
            // if (res.data.data.length > 0) {
            //   var info = res.data.data[0];
            //   this.model.cemeaddress = info.cemetery;
            // }
            Object.assign(this.cemeteryList, res.data.data);
            this.showMsg = this.cemeteryList.length > 0 ? false : true;
          }
        });
      }
    },
    //  提交个人主页
    onSubmit() {
      //上传图片
      let resImg = this.bindPhotosUploadData();
      let resultImg = resImg.map((i) => {
        return {
          id: "",
          memoryId: "",
          title: i.file.name,
          cont: i.file.name,
          cover: i.url,
          url: i.url,
          mediaType: "image",
          sortId: 0,
        };
      });
      this.model.mediaList = resultImg;
      //视频上传
      let resVideo = this.bindVideoUpload();
      if (resVideo[0].url == "") {
        resVideo = [];
        if (resVideo == []) {
          this.model.mediaList = resultImg;
        }
      }

      this.model.mediaList = resultImg.concat(resVideo);

      //留言上传
      let resMsg = this.bindMsgUpload();
      if (resMsg == undefined) {
        resMsg = [];
      }
      //文章上传
      let resArticle = this.bindArticleUpload();
      if (resArticle == undefined) {
        resArticle = [];
      }
      let msgResult = resArticle.concat(resMsg);
      this.model.msgList = this.model.msgList.concat(msgResult);
      // this.model.activateCode = this.model.activateCode.trim();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.model.erpCemeteryIdKey.key = this.model.erpCemeteryId;
      this.model.erpCemeteryIdKey.label = this.model.buryAddress;
      console.log(this.model);
      addMemoryPage(this.model).then((res) => {
        if (res.code == 0) {
          this.$notify({
            type: "success",
            message: "提交成功",
          });
          this.$toast.clear();
          this.$router.push({
            path: "/mark/grjn/index",
            query: {
              id: res.data,
            },
          });
        }
      });
    },
    //头像上传
    uploadAvatarPhoto(imgUrl) {
      this.model.photo = imgUrl;
    },
    bindData() {
      this.$refs.avatarPhotoUpload.loadData(this.model.photo);
    },
    // 图片上传
    bindPhotosUploadData() {
      return this.$refs.photosUpload.getFileList();
    },
    //留言上传
    bindMsgUpload() {
      return this.$refs.msgUpload.getfileMsg();
    },
    //文章上传
    bindArticleUpload() {
      return this.$refs.articlesUpload.getfileArticle();
    },
    //视频上传
    bindVideoUpload() {
      return this.$refs.memoryMediaVideo.getfileListVideo();
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showGender = false;
      this.model.gender = `${item.name}`;
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
  },
};
</script>

<style lang="less" scoped>
.create {
  // padding: 0 0.4rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  // background-image: url("/img/mobile/mark/create_banner.png");
  background-color: #e1e9e0;
  /deep/ .van-action-sheet__content {
    .content {
      // height: 0.8rem;
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
  // /deep/ .van-cell {
  //   background: none;
  //   .van-cell__value {
  //     background: #fff;
  //     padding: 0 0.1rem;
  //     text-align: left;
  //   }
  //   .van-field__label {
  //     width: 1.5rem;
  //     margin-right: 0;
  //   }
  // }
  // /deep/ .van-cell--center {
  //   .van-cell__value {
  //     background: none;
  //     margin-left: -0.6rem;
  //   }
  // }
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
  .createBox {
    background: #e1e9e0;
    .avatarUpload {
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
        font-size: 0.3rem;
        line-height: 0.4rem;
        color: #00744c;
        margin-bottom: 0.05rem;
      }
      // .line {
      //   height: 0.01rem;
      //   background: #00744c;
      // }
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
  // /deep/ .van-button--danger {
  //   background-color: #00744c;
  //   border: 1px solid #00744c;
  // }

  .fixedBtn {
    position: fixed;
    bottom: 0rem;
    z-index: 2;
    width: 100%;
    padding: 0.25rem 0rem;
    background-color: rgba(225, 233, 224, 0.6);

    .btn {
      width: 3.2rem;
      height: 0.73rem;
      background-color: #00744c;
      border-radius: 0.36rem;
      margin: auto;
      // margin: 0.3rem auto;
      // margin-top: 0.5rem;
      color: #fff;
      line-height: 0.73rem;
      text-align: center;
    }
  }
}
</style>
