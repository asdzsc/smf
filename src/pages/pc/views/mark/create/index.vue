<template>
  <div class="create">
<<<<<<< HEAD
=======
    <!-- 激活码框 start -->
    <div class="activeDiv">
      <img src="/img/pc/syjhm.jpg" alt="" />
      <p class="activeTitle">创建主页</p>
      <p>请输入我们给您提供的激活码，即可获得该追思主页使用权：</p>
      <input
        type="text"
        class="input"
        v-model="model.activateCode"
        placeholder="输入激活码"
      />
    </div>
    <!-- 激活码框 end -->
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <div class="createBox">
      <div class="avatarUpload">
        <avatarUpload
          ref="avatarPhotoUpload"
          @change="uploadAvatarPhoto"
        ></avatarUpload>
        <div class="search">
<<<<<<< HEAD
          <span>姓名：</span>
          <a-input
            v-model="model.name"
            @change="_searchCemeteryList()"
=======
          <input
            type="text"
            v-model="model.name"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            placeholder="请输入亲人姓名"
          />
        </div>
        <div class="search">
<<<<<<< HEAD
          <span>性别：</span>
          <a-select v-model="model.gender">
            <a-select-option value="男"> 男 </a-select-option>
            <a-select-option value="女"> 女 </a-select-option>
          </a-select>
=======
          <input
            type="text"
            v-model="model.gender"
            placeholder="请输入亲人性别"
          />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        </div>
      </div>
      <div class="intro">
        <div class="title">
          <p>生平简介</p>
          <div class="line"></div>
        </div>
        <!-- 生平简介 start-->
        <div class="introInfo">
<<<<<<< HEAD
          <div class="dateWrap">
            <div class="date">
              <span>出生地：</span>
              <a-input
                v-model="model.birthdayAddress"
                placeholder="请输入出生地"
              />
            </div>
            <div class="date">
              <span>出生日期：</span>
              <a-date-picker
                v-model="model.birthday"
                @change="changeBirthdayDate"
              />
            </div>
          </div>
          <div class="dateWrap">
            <div class="date">
              <span>离世地：</span>
              <a-input v-model="model.dieAddress" placeholder="请输入离世地" />
            </div>
            <div class="date">
              <span>离世日期：</span>
              <a-date-picker
                v-model="model.dieTime"
                @change="changeDieTimeDate"
              />
            </div>
          </div>
          <div class="dateWrap">
            <div class="date">
              <span>墓志铭：</span>
              <a-input v-model="model.epitaph" placeholder="请输入墓志铭" />
            </div>
            <div class="date" style="display: flex">
              <span>安葬地址：</span>
              <!-- <a-input
                v-model="model.buryAddress"
                placeholder="请输入安葬地址"
              /> -->
              <!-- <a-select
                v-model="model.erpCemeteryIdKey"
                labelInValue
                @change="changeCemetery"
                placeholder="请选择墓址信息"
                option-label-prop="label"
              >
                <a-select-option value="">请选择墓址信息</a-select-option>
                <a-select-option
                  v-for="item in cemeteryList"
                  :key="item.cemeteryId"
                  :value="item.cemeteryId"
                  :label="item.cemetery"
                  >主办人：{{ item.masterName }}<br />
                  {{ item.cemetery }}</a-select-option
                >
              </a-select> -->
              <a-dropdown :trigger="['click']">
                <div>
                  <a-input
                    v-model="model.buryAddress"
                    placeholder="请输入安葬墓址"
                    :style="
                      cemeteryList.length > 0 ? 'width: 280px' : 'width: 300px'
                    "
                    @focus="showMsg = false"
                  />
                  &nbsp; &nbsp;
                  <a
                    v-show="cemeteryList.length > 0"
                    @click="(e) => e.preventDefault()"
                  >
                    <a-icon type="down" />
                  </a>
                </div>
                <a-menu v-show="cemeteryList.length > 0" slot="overlay">
                  <a-menu-item
                    v-for="item in cemeteryList"
                    :key="item.cemeteryId"
                    @click="selCemetery(item)"
                    >主办人：{{ item.masterName }}<br />{{
                      item.cemetery
                    }}</a-menu-item
                  >
                </a-menu>
              </a-dropdown>
            </div>
            <div v-show="showMsg" style="padding-top: 10px">
              <a-alert
                :show-icon="false"
                type="error"
                message="没有查询到墓址信息，请手动输入"
              />
            </div>
          </div>
          <div class="selfInfo">
            <span>个人简介</span>
            <a-textarea
              v-model="model.intro"
              placeholder="请输入个人简介"
              :auto-size="{ minRows: 5, maxRows: 5 }"
            />
=======
          <div class="date">
            <span>出生日期：</span>
            <input
              v-model="model.birthday"
              type="text"
              placeholder="请输入出生日期"
            />
            示例：（2000-01-01 00:00:00）
          </div>
          <div class="date">
            <span>出生地：</span>
            <input
              v-model="model.birthdayAddress"
              type="text"
              placeholder="请输入出生地"
            />
          </div>
          <div class="date">
            <span>离世日期：</span>
            <input
              v-model="model.dieTime"
              type="text"
              placeholder="请输入离世日期"
            />
            示例：（2000-01-01 00:00:00）
          </div>
          <div class="date">
            <span>离世地：</span>
            <input
              v-model="model.dieAddress"
              type="text"
              placeholder="请输入离世地"
            />
          </div>
          <div class="selfInfo">
            <span>个人简介</span>
            <textarea
              v-model="model.intro"
              placeholder="请输入个人简介"
            ></textarea>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          </div>
        </div>
        <!-- 生平简介 end-->
        <!-- 纪念相册 start-->
        <div class="title">
          <p>纪念相册</p>
          <div class="line"></div>
        </div>
        <photoUpload ref="photosUpload"></photoUpload>
        <!-- 纪念相册 end-->
        <!-- 祭奠留言 start-->
        <div class="title">
          <p>祭奠留言</p>
          <div class="line"></div>
        </div>
<<<<<<< HEAD
        <lyInfo ref="msgUpload"></lyInfo>
=======
        <lyInfo :msgList="model.msgList"></lyInfo>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <!-- 祭奠留言 end-->
        <!-- 纪念文章 start-->
        <div class="title">
          <p>纪念文章</p>
          <div class="line"></div>
        </div>
<<<<<<< HEAD
        <articleUpload ref="articlesUpload"></articleUpload>
=======
        <articleUpload></articleUpload>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <!-- 纪念文章 end-->
        <!-- 纪念视频 start-->
        <div class="title">
          <p>纪念视频</p>
          <div class="line"></div>
        </div>
        <!-- <videoUpload></videoUpload> -->
        <videoUpload ref="memoryMediaVideo"></videoUpload>
        <!-- 纪念视频 end-->
        <!-- 选择模板 start-->
        <!--
        <div class="title">
          <p>选择模板</p>
          <div class="line"></div>
        </div>
        <div class="date">
          <span>选择模板：</span>
          <a-select
            default-value="免费模板"
            style="width: 301px;height: 40px;"
            @change="handleChange"
          >
            <a-select-option
              value="辛亥英烈"
              v-if="model.templateId === 491872340996337665"
            >
              辛亥英烈
            </a-select-option>
            <a-select-option
              value="抗战英雄"
              v-else-if="model.templateId === '491875274498977792'"
            >
              抗战英雄
            </a-select-option>
            <a-select-option
              value="红色先烈"
              v-else-if="model.templateId === '491877416861380608'"
            >
              红色先烈
            </a-select-option>
            <a-select-option
              value="共和国卫士"
              v-else-if="model.templateId === '492120168356458496'"
            >
              共和国卫士
            </a-select-option>
            <a-select-option
              value="爱心天使"
              v-else-if="model.templateId === '492123533807267840'"
            >
              爱心天使
            </a-select-option>
            <a-select-option
              value="文学巨匠"
              v-else-if="model.templateId === '492123993989525504'"
            >
              文学巨匠
            </a-select-option>
            <a-select-option
              value="艺术大师"
              v-else-if="model.templateId === '492124529899941889'"
            >
              艺术大师
            </a-select-option>
            <a-select-option
              value=" 白衣天使"
              v-else-if="model.templateId === '492126737685098497'"
            >
              白衣天使
            </a-select-option>
            <a-select-option
              value=" 辛勤园丁"
              v-else-if="model.templateId === '492128198536015872'"
            >
              辛勤园丁
            </a-select-option>
            <a-select-option
              value="钢铁英雄"
              v-else-if="model.templateId === '492129719520669696'"
            >
              钢铁英雄
            </a-select-option>
            <a-select-option
              value="不凡人生"
              v-else-if="model.templateId === '492130170567733248'"
            >
              不凡人生
            </a-select-option>
          </a-select>
        </div>
        -->
        <!-- 选择模板 end-->
      </div>
    </div>
    <div class="createBtn">
      <div class="submitBtn" @click="onSubmit">提交</div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { searchCemeteryList } from "@/pages/pc/api/user";
import { addMemoryPage } from "@/pages/pc/api/mark.js";
export default {
  components: {
    lyInfo: () => import("@/pages/pc/views/mark/create/components/msgInfo.vue"),
    articleUpload: () =>
      import("@/pages/pc/views/mark/create/components/articleInfo.vue"),
    videoUpload: () =>
      import("@/pages/pc/views/mark/components/file-upload.vue"),
=======
import { addMemoryPage } from "@/pages/pc/api/mark.js";
export default {
  components: {
    lyInfo: () => import("@/pages/pc/views/mark/create/components/lyInfo.vue"),
    articleUpload: () =>
      import("@/pages/pc/views/mark/create/components/articleUpload.vue"),
    videoUpload: () =>
      import("@/pages/pc/views/mark/create/components/videoUpload.vue"),
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    avatarUpload: () =>
      import("@/pages/pc/views/mark/create/components/avatarUpload.vue"),
    photoUpload: () =>
      import("@/pages/pc/views/mark/create/components/photoUpload.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      loading: false,
      model: {
        name: "", // 	落葬人姓名
        gender: "", //性别 男 女
        photo: "", //头像
<<<<<<< HEAD
        birthday: null, //生日
        dieTime: null, //离世日期
=======
        birthday: "", //生日
        dieTime: "", //离世日期
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        birthdayAddress: "", //出生地址
        dieAddress: "", //	 离世地址
        intro: "", //简介
        cont: "", //	图文详情
        epitaph: "", //	墓志铭
        buryAddress: "", //安葬地址
        templateId: "0", //0免费模版
<<<<<<< HEAD
        activateCode: this.$route.query.code, //激活码
=======
        activateCode: "", //激活码
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        mobiles: [], //关联管理人手机号
        status: "0", //	0展示 1隐藏  默认0
        mediaList: [], //附件列表 图片 视频和一起
        msgList: [], //消息类型 1留言 2文章
<<<<<<< HEAD
        erpCemeteryId: "", //关联erp墓址id
        masterName: "",
        erpCemeteryIdKey: { key: "" },
      },
      cemeteryList: [],
      showMsg: false,
=======
      },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {},
  methods: {
<<<<<<< HEAD
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
            this.cemeteryList = res.data.data;
            this.showMsg = this.cemeteryList.length > 0 ? false : true;
          }
        });
      }
    },
    changeCemetery(value, option) {
      this.model.erpCemeteryId = value.key;
      var query = this.cemeteryList.filter((x) => {
        return x.cemeteryId === value.key;
      });
      if (query.length > 0) {
        this.model.masterName = query[0].masterName;
        this.model.buryAddress = query[0].cemetery;
      }
    },
    selCemetery(item) {
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.masterName = item.masterName;
      this.model.buryAddress = item.cemetery;
    },
    //选择出生时间
    changeBirthdayDate(date, dateString) {
      this.model.birthday = dateString + " 00:00:00";
    },
    //选择离世日期
    changeDieTimeDate(date, dateString) {
      this.model.dieTime = dateString + " 00:00:00";
    },
    //  提交个人主页
    onSubmit() {
      //上传图片
      let resImg = this.bindPhotosUploadData();
      let resultImg = resImg.map((i) => {
=======
    //  提交个人主页
    onSubmit() {
      const rules = {
        // 激活码
        activateCode: {
          value: this.model.activateCode,
          message: "请输入激活码",
        },
        // 落葬人姓名
        name: {
          value: this.model.name,
          message: "请输入落葬人姓名",
        },
        // 落葬人生日
        birthday: {
          value: this.model.birthday,
          message: "请输入落葬人生日",
        },
        // 落葬人离世日期
        dieTime: {
          value: this.model.dieTime,
          message: "请输入落葬人离世日期",
        },
      };
      //验证变量 默认为真
      let valid = true;
      Object.keys(rules).map((v) => {
        if (!valid) return;
        // 如果有一个数据不存在
        if (!rules[v].value) {
          this.$message.error(rules[v].message);
          valid = false;
        }
      });
      //   验证不通过返回
      if (!valid) return;
      //上传图片
      this.bindPhotosUploadData();
      const res = this.bindPhotosUploadData();
      const result = res.map((i) => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        return {
          title: i.name,
          cont: i.name,
          cover: i.imgUrl,
          url: i.imgUrl,
          mediaType: "image",
          sortId: 0,
        };
      });
<<<<<<< HEAD
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

      console.log(this.model);
      addMemoryPage(this.model).then((res) => {
        if (res.code == 0) {
          this.$message.success("提交成功");
          this.$router.push({
            path: "/mark/grjn/index",
            query: {
              id: res.data,
            },
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 100);
=======
      this.model.mediaList = result;
      addMemoryPage(this.model).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$message.success("提交成功");
          this.$router.push({
            name: "/mark/grjn-00",
            params: {
              id: res.data,
            },
          });
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
    //视频上传
    bindVideoUpload() {
      return this.$refs.memoryMediaVideo.getfileListVideo();
    },
    //留言上传
    bindMsgUpload() {
      return this.$refs.msgUpload.getfileMsg();
    },
    //文章上传
    bindArticleUpload() {
      return this.$refs.articlesUpload.getfileArticle();
    },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
};
</script>

<style lang="less" scoped>
.create {
  background-image: url("/img/pc/create_banner.png");
<<<<<<< HEAD
  padding-top: 70px;
=======
  padding-top: 140px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  padding-bottom: 150px;
  .createBtn {
    width: 620px;
    margin: 30px auto;
    margin-top: 50px;
    font-size: 20px;
    line-height: 50px;
    height: 50px;
    text-align: center;
    cursor: pointer;
    .previewBtn {
      display: inline-block;
      width: 280px;
      border-radius: 25px;
      border: solid 4px #00744c;
      margin-right: 50px;
      color: #00744c;
    }
    .submitBtn {
      display: inline-block;
      width: 280px;
      background-color: #00744c;
      border-radius: 25px;
      color: #fff;
    }
  }
<<<<<<< HEAD

=======
  .activeDiv {
    background-color: #fff;
    width: 600px;
    height: 400px;
    border: 2px;
    border-radius: 10px;
    border-color: #22be6d;
    border-style: solid;
    text-align: center;
    z-index: 99;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
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
      margin-left: 10%;
      margin-top: 30px;
      height: 35px;
      background-color: #fff;
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  .createBox {
    width: 1200px;
    margin: 0 auto;
    margin-top: 120px;
    background-color: rgb(225, 233, 224);
    padding-top: 150px;
    padding-bottom: 30px;
    position: relative;
    .avatarUpload {
      /deep/ .ant-upload.ant-upload-select-picture-card {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -90px;
        width: 180px;
        height: 180px;
        background-color: #ffffff;
        border-radius: 50%;
        overflow: hidden;
<<<<<<< HEAD
        border: none;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        box-shadow: 0px 4px 10px 0px rgba(0, 73, 48, 0.2);
      }
      .avatar-uploader {
        .ant-upload {
          width: 180px;
          height: 180px;
          border-radius: 50%;
        }
        .ant-upload-select-picture-card i {
          font-size: 50px;
          color: #00744c;
        }

        .ant-upload-select-picture-card .ant-upload-text {
          margin-top: 8px;
          color: #666;
        }
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      .search {
        width: 280px;
        height: 40px;
        margin: 20px auto;
<<<<<<< HEAD
        span {
          display: inline-block;
          text-align: right;
          width: 70px;
        }
        /deep/ .ant-select-enabled {
          width: 200px !important;
          height: 35px;
          line-height: 35px;
          text-align: center;
        }
        input {
          width: 200px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background-color: #ffffff;
=======
        input {
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 14px;
          padding-bottom: 14px;
          background-color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 18px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      }
    }
    .intro {
      width: 1100px;
      margin: 0 auto;
      font-size: 14px;

      .title {
        margin: 50px 0;
        p {
          border-left: 4px solid #00744c;
          padding-left: 10px;
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          letter-spacing: 0px;
          color: #00744c;
          margin-bottom: 5px;
        }
        .line {
          height: 1px;
          background: #00744c;
        }
      }
      .introInfo {
        font-size: 14px;
        line-height: 40px;
        margin-top: 20px;
<<<<<<< HEAD
        .dateWrap {
          display: flex;
          justify-content: space-between;
          .date {
            margin-top: 10px;
            color: #666666;
            span {
              display: inline-block;
              text-align: right;
              width: 70px;
            }
            /deep/ .ant-select-selection {
              width: 300px;
              height: 40px;
            }
            /deep/ .ant-calendar-picker {
              width: 300px;
              height: 40px;
              .ant-calendar-picker-input {
                text-align: center;
              }
            }
            input {
              width: 300px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              background-color: #ffffff;
            }
            &:last-child {
              margin-right: 0;
            }
=======
        .date {
          margin-top: 10px;
          color: #666666;
          span {
            display: inline-block;
            text-align: right;
            width: 70px;
          }
          input {
            width: 200px;
            height: 40px;
            text-align: center;
            padding-top: 14px;
            padding-bottom: 14px;
            background-color: #ffffff;
            border: none;
            border-radius: 10px;
          }
          &:last-child {
            margin-right: 0;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          }
        }
        .selfInfo {
          display: flex;
          margin-top: 20px;
          span {
            width: 70px;
            text-align: right;
            padding-right: 10px;
          }
<<<<<<< HEAD
=======
          textarea {
            width: 93%;
            height: 200px;
          }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      }
    }
  }
}
</style>
