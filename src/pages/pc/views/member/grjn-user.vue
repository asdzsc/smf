<template>
  <div class="grjnUser">
    <memberHead ref="memberHead"></memberHead>

    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="right">
        <div class="title">个人纪念馆</div>
        <a-row type="flex" style="line-height: 36px">
          <a-col style="padding-right: 10px"> 亲友姓名： </a-col>
          <a-col style="padding-right: 40px">
            <a-input
              v-model="model.searchText"
              placeholder="填写亲友姓名"
              style="width: 300px"
            />
          </a-col>
          <a-col>
            <div class="btn" @click="handleSearch">查询</div>
          </a-col>
        </a-row>
        <div
          style="
            border-bottom: solid 1px #cccccc;
            margin-top: 28px;
            margin-bottom: 20px;
          "
        ></div>

        <a-spin
          size="large"
          tip="加载中..."
          :spinning="loading"
          style="width: 100%"
        >
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 30px; color: #004930; text-align: center"
            spin
          />

          <table class="tablelist">
            <tr class="tableHead">
              <td>照片</td>
              <td>姓名</td>
              <td>性别</td>
              <td>出生时间</td>
              <td>离世时间</td>
              <td>安葬地址</td>
              <td>模板到期时间</td>
              <td>状态</td>
              <td>操作</td>
            </tr>
            <tr class="tableRr" v-for="item in model.list" :key="item.id">
              <td>
                <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.birthday.substring(0, 10) }}</td>
              <td>{{ item.dieTime.substring(0, 10) }}</td>
              <td>{{ item.buryAddress }}</td>
              <td v-if="item.isEdit === true">
                {{ item.expireTime.substring(0, 10) }}
              </td>
              <td v-else :style="{ color: 'red' }">已到期</td>
              <td>
                <a-switch
                  checkedChildren="公开"
                  unCheckedChildren="不公开"
                  :checked="item.status === '0' ? true : false"
                  @change="setStatus(item)"
                />
              </td>
              <td>
                <a-dropdown>
                  <a-menu slot="overlay">
                    <a-menu-item @click="handlePay(item)">
                      <a-icon type="pay-circle" />续费
                    </a-menu-item>
                    <a-menu-item @click="handleClick(item)">
                      <a-icon type="eye" />查看主页
                    </a-menu-item>
                    <a-menu-item
                      @click="edit(item)"
                      :disabled="item.isEdit === true ? false : true"
                    >
                      <a-icon type="edit" />编辑
                    </a-menu-item>
                    <a-menu-item
                      @click="showMediaImg(item)"
                      :disabled="item.isEdit === true ? false : true"
                    >
                      <a-icon type="file-image" />纪念相册
                    </a-menu-item>
                    <a-menu-item
                      @click="showMemoryMsg(item)"
                      :disabled="item.isEdit === true ? false : true"
                    >
                      <a-icon type="message" />祭奠留言
                    </a-menu-item>
                    <a-menu-item
                      @click="showMemoryArticle(item)"
                      :disabled="item.isEdit === true ? false : true"
                    >
                      <a-icon type="profile" />纪念文章
                    </a-menu-item>
                    <a-menu-item
                      @click="showMediaVideo(item)"
                      :disabled="item.isEdit === true ? false : true"
                    >
                      <a-icon type="video-camera" />纪念视频
                    </a-menu-item>
                  </a-menu>
                  <a-button
                    title="更多"
                    shape="round"
                    type="primary"
                    size="small"
                  >
                    操作&nbsp;&nbsp;
                    <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </td>
            </tr>
          </table>
        </a-spin>
        <!-- 编辑个人主页 -->
        <info
          v-if="showInfo"
          :id="infoId"
          ref="info"
          @onClose="infoClose"
        ></info>
        <!-- 纪念图片 -->
        <memoryMedia
          v-if="showMemoryMediaImg"
          :memoryId="infoId"
          mediaType="image"
          ref="memoryMediaImg"
          @onClose="mediaImgClose"
        ></memoryMedia>
        <!-- 纪念视频 -->
        <memoryMedia
          v-if="showMemoryMediaVideo"
          :memoryId="infoId"
          mediaType="video"
          ref="memoryMediaVideo"
          @onClose="mediaVideoClose"
        ></memoryMedia>
        <!-- 祭奠留言 -->
        <memoryMsg
          v-if="showMemoryMsgList"
          :memoryInfo="infoObj"
          ref="memoryMsg"
          @onClose="memoryMsgClose"
        ></memoryMsg>
        <!-- 纪念文章 -->
        <memoryArticle
          v-if="showMemoryArticleList"
          :memoryInfo="infoObj"
          ref="memoryArticle"
          @onClose="memoryArticleClose"
        ></memoryArticle>
        <!-- 续费 -->
        <memoryPay
          v-if="showPay"
          :memoryInfo="infoObj"
          ref="memoryPay"
          @onClose="payOnClose"
        ></memoryPay>
        <a-empty v-if="model.list.length === 0" />
        <div style="padding-top: 30px"></div>
        <paging ref="paging" @setPage="setPage"></paging>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserMemoryList, setMemoryStatus } from "@/pages/pc/api/mark.js";
// import moment from "moment";
export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    info: () => import("@/pages/pc/views/member/components/show-info.vue"),
    memoryPay: () => import("@/pages/pc/views/member/components/show-pay.vue"),
    memoryMedia: () =>
      import("@/pages/pc/views/member/components/show-media.vue"),
    memoryMsg: () => import("@/pages/pc/views/member/components/show-msg.vue"),
    memoryArticle: () =>
      import("@/pages/pc/views/member/components/show-article.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      showInfo: false,
      showMemoryMediaImg: false, //显示相册附件
      showMemoryMediaVideo: false, //显示视频附件
      showMemoryMsgList: false, //祭奠留言
      showMemoryArticleList: false, //纪念文章
      showPay: false, //模板续费
      infoId: "",
      model: {
        current: 1,
        pageSize: 10,
        searchText: "",
        status: "",
        columnId: "",
        list: [],
        total: "",
      },
    };
  },
  computed: {
    // isOutDate(time) {
    //   return (time) => {
    //     let nowDate = moment();
    //     this.outDate = nowDate.format("YYYY-MM-DD");
    //     let arr = this.outDate.split("-");
    //     let num = arr[0] + arr[1] + arr[2];
    //     let arr1 = time.split("-");
    //     let num1 = arr1[0] + arr1[1] + arr1[2];
    //     if (num1 > num) {
    //       return (
    //         num1.slice(0, 4) + "-" + num1.slice(4, 6) + "-" + num1.slice(6, 8)
    //       );
    //     } else {
    //       return "已到期";
    //     }
    //   };
    // },
  },
  mounted() {
    this._getUserMemoryList();
  },
  methods: {
    setStatus(record) {
      this.$confirm({
        title: "确定要修改公开状态吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          var status = record.status === "0" ? "1" : "0";
          setMemoryStatus({
            id: record.id,
            status: status,
          }).then((res) => {
            if (res.code === 0) {
              record.status = status;
            }
          });
        },
        onCancel() {},
      });
    },
    _getUserMemoryList() {
      this.loading = true;
      getUserMemoryList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    //查看个人主页详情
    handleClick(item) {
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: item.id,
        },
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    // 查询
    handleSearch() {
      this.model.list = [];
      this.setPage(1);
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._getUserMemoryList();
    },
    // 显示编辑
    edit(item) {
      this.showInfo = true;
      this.infoId = item.id;
    },
    infoClose(res) {
      this.$nextTick(() => {
        this.showInfo = false;
      });
      if (res.code === 0) {
        this.handleSearch();
      }
    },

    //显示相册附件
    showMediaImg(item) {
      this.infoId = item.id;
      this.showMemoryMediaImg = true;
    },
    mediaImgClose() {
      this.$nextTick(() => {
        this.showMemoryMediaImg = false;
      });
    },
    //显示视频附件
    showMediaVideo(item) {
      this.infoId = item.id;
      this.showMemoryMediaVideo = true;
    },
    mediaVideoClose() {
      this.$nextTick(() => {
        this.showMemoryMediaVideo = false;
      });
    },
    //显示留言
    showMemoryMsg(item) {
      this.infoObj = item;
      this.showMemoryMsgList = true;
    },
    memoryMsgClose() {
      this.$nextTick(() => {
        this.showMemoryMsgList = false;
      });
    },
    // 显示文章
    showMemoryArticle(item) {
      this.infoObj = item;
      this.showMemoryArticleList = true;
    },
    memoryArticleClose() {
      this.$nextTick(() => {
        this.showMemoryArticleList = false;
      });
    },
    //显示续费
    handlePay(item) {
      this.infoObj = item;
      // console.log(item);
      this.showPay = true;
    },
    payOnClose() {
      this.$nextTick(() => {
        this.showPay = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  min-height: 600px;
  background-color: #ffffff;

  .left {
    width: 125px;
  }
  .right {
    flex: auto;
    padding: 20px;
    padding-bottom: 80px;
    /deep/ .ant-btn {
      background-color: #004930;
      border: #004930;
    }
    /deep/ .ant-switch-checked {
      background: #004930;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
    }
    .btn {
      cursor: pointer;
      width: 160px;
      height: 36px;
      line-height: 36px;
      background-color: #004930;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #ffffff;
    }
    .tablelist {
      width: 100%;
      border: 1px solid #ebebeb;

      .tableHead {
        height: 40px;
        background-color: #f5f5f5;
        font-size: 12px;
        line-height: 40px;
        color: #333333;
        text-align: center;

        td {
          padding: 5px;
        }
      }

      .tableRr {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #333333;
        border-top: 1px solid #ebebeb;
        .edit {
          cursor: pointer;
        }
        td {
          padding: 5px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
