<template>
  <div class="create">
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
    <div class="createBox">
      <div class="avatarUpload">
        <avatarUpload
          ref="avatarPhotoUpload"
          @change="uploadAvatarPhoto"
        ></avatarUpload>
        <div class="search">
          <input
            type="text"
            v-model="model.name"
            placeholder="请输入亲人姓名"
          />
        </div>
        <div class="search">
          <input
            type="text"
            v-model="model.gender"
            placeholder="请输入亲人性别"
          />
        </div>
      </div>
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
        <lyInfo :msgList="model.msgList"></lyInfo>
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
import { addMemoryPage } from "@/pages/pc/api/mark.js";
export default {
  components: {
    lyInfo: () => import("@/pages/pc/views/mark/create/components/lyInfo.vue"),
    articleUpload: () =>
      import("@/pages/pc/views/mark/create/components/articleUpload.vue"),
    videoUpload: () =>
      import("@/pages/pc/views/mark/create/components/videoUpload.vue"),
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
        birthday: "", //生日
        dieTime: "", //离世日期
        birthdayAddress: "", //出生地址
        dieAddress: "", //	 离世地址
        intro: "", //简介
        cont: "", //	图文详情
        epitaph: "", //	墓志铭
        buryAddress: "", //安葬地址
        templateId: "0", //0免费模版
        activateCode: "", //激活码
        mobiles: [], //关联管理人手机号
        status: "0", //	0展示 1隐藏  默认0
        mediaList: [], //附件列表 图片 视频和一起
        msgList: [], //消息类型 1留言 2文章
      },
    };
  },
  mounted() {},
  methods: {
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
        return {
          title: i.name,
          cont: i.name,
          cover: i.imgUrl,
          url: i.imgUrl,
          mediaType: "image",
          sortId: 0,
        };
      });
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
