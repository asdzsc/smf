<template>
  <div class="create">
    <div class="createBox">
      <div class="avatarUpload">
        <avatarUpload
          :avtarModel="this.model"
          ref="avatarPhotoUpload"
          @change="uploadPhoto"
        ></avatarUpload>
        <div class="search">
          <input
            type="text"
            v-model="model.name"
            placeholder="请输入亲人姓名"
          />
        </div>
      </div>

      <!-- <avatarUpload
        :avtarModel="this.model"
        ref="avatarPhotoUpload"
        @change="uploadPhoto"
      ></avatarUpload> -->

      <div class="intro">
        <div class="title">
          <p>生平简介</p>
          <div class="line"></div>
        </div>
        <!-- 生平简介 start-->
        <div class="introInfo">
          <div class="date">
            <span>出生日期：</span>
            <input
              v-model="model.birthday"
              type="text"
              placeholder="请输入出生日期"
            />
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
          </div>
        </div>
        <!-- 生平简介 end-->
        <!-- 纪念相册 start-->
        <div class="title">
          <p>纪念相册</p>
          <div class="line"></div>
        </div>
        <photoUpload :photoModel="this.model"></photoUpload>
        <!-- 纪念相册 end-->
        <!-- 祭奠留言 start-->
        <div class="title">
          <p>祭奠留言</p>
          <div class="line"></div>
        </div>
        <lyInfo></lyInfo>
        <!-- 祭奠留言 end-->
        <!-- 纪念文章 start-->
        <div class="title">
          <p>纪念文章</p>
          <div class="line"></div>
        </div>
        <articleUpload></articleUpload>
        <!-- 纪念文章 end-->
        <!-- 纪念视频 start-->
        <div class="title">
          <p>纪念视频</p>
          <div class="line"></div>
        </div>
        <videoUpload></videoUpload>
        <!-- 纪念视频 end-->
        <!-- 选择模板 start-->
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
            <a-select-option value="辛亥英烈">
              辛亥英烈
            </a-select-option>
            <a-select-option value="抗战英雄">
              抗战英雄
            </a-select-option>
            <a-select-option value="红色先烈">
              红色先烈
            </a-select-option>
            <a-select-option value="共和国卫士">
              共和国卫士
            </a-select-option>
            <a-select-option value="爱心天使">
              爱心天使
            </a-select-option>
            <a-select-option value="文学巨匠">
              文学巨匠
            </a-select-option>
            <a-select-option value="艺术大师">
              艺术大师
            </a-select-option>
            <a-select-option value=" 白衣天使 ">
              白衣天使
            </a-select-option>
            <a-select-option value=" 辛勤园丁 ">
              辛勤园丁
            </a-select-option>
            <a-select-option value="钢铁英雄 ">
              钢铁英雄
            </a-select-option>
            <a-select-option value="不凡人生">
              不凡人生
            </a-select-option>
          </a-select>
        </div>
        <!-- 选择模板 end-->
      </div>
    </div>
    <div class="createBtn">
      <div class="previewBtn">预览</div>
      <div class="submitBtn">提交</div>
    </div>
  </div>
</template>

<script>
import { getMemoryInfo } from "@/pages/pc/api/mark.js";
export default {
  components: {
    photoUpload: () =>
      import("@/pages/pc/views/mark/create/components/photoUpload.vue"),
    lyInfo: () => import("@/pages/pc/views/mark/create/components/lyInfo.vue"),
    articleUpload: () =>
      import("@/pages/pc/views/mark/create/components/articleUpload.vue"),
    videoUpload: () =>
      import("@/pages/pc/views/mark/create/components/videoUpload.vue"),
    avatarUpload: () =>
      import("@/pages/pc/components/upload/avatar-upload.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      loading: false,
      model: {
        id: "1", //个人主页id
        columnIds: [""],
        name: "测试", //姓名
        gender: "男", //性别
        birthday: "1990-01-01 00:00:00", //	出生日期
        dieTime: "2020-01-01 00:00:00", //	离世日期
        birthdayAddress: null, //出生城市
        dieAddress: null, //离世城市
        photo: null, //头像
        cover: null,
        phoneCover: null,
        bg: null,
        phoneBg: null,
        buryAddress: null,
        templateId: "491872340996337665",
        activateCode: null,
        mobiles: ["17612770945"],
        status: "0",
        memoryType: "0",
        sortId: 0,
        expireTime: null,
        intro: null,
        cont: null,
      },
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      // console.log(`selected ${value}`);
    },
    bindData() {
      this.$refs.avatarPhotoUpload.loadData(this.model.photo);
    },
    //头像上传
    uploadPhoto(imgUrl) {
      this.model.photo = imgUrl;
    },
    // 保存个人主页信息
    onSubmit() {
      this.model.cont = this.ue.getContent();
      saveMemoryInfo(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.create {
  background-image: url("/img/pc/create_banner.png");
  padding-top: 140px;
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
  .createBox {
    width: 1200px;
    margin: 0 auto;
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
        margin: 0 auto;
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
        .date {
          display: inline;
          margin-right: 5px;
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
          textarea {
            width: 93%;
            height: 200px;
          }
        }
      }
    }
  }
}
</style>
