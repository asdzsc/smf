<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="title">个人纪念馆</div>
    <div class="form">
      <div class="formItem">
        <div class="label">亲友姓名</div>
        <div class="inputCont">
          <input v-model="model.searchText" placeholder="填写亲友姓名" />
        </div>
      </div>
      <van-button
        @click="handleSearch()"
        size="large"
        type="primary"
        color="#004930"
        ><span style="color: #fff">查询</span></van-button
      >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="model.list.length > 0">
          <div
            class="div"
            v-for="item in model.list"
            :key="item.id"
            style="border: 1px solid #dcdcdc"
          >
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">照片</p>
              <p class="width">
                <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
              </p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">姓名</p>
              <p class="width">{{ item.name }}</p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">性别</p>
              <p class="width">{{ item.gender }}</p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">出生时间</p>
              <p class="width">
                {{ item.birthday.substring(0, 10) }}
              </p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">离世时间</p>
              <p class="width">
                {{ item.dieTime.substring(0, 10) }}
              </p>
            </div>
            <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
              <p class="color">安葬地址</p>
              <p class="width">{{ item.buryAddress }}</p>
            </div>
            <div
              class="divBox"
              style="border-bottom: 1px solid #dcdcdc"
              v-if="item.isEdit === true"
            >
              <p class="color">模板到期时间</p>
              <p class="width">{{ item.expireTime.substring(0, 10) }}</p>
            </div>
            <div
              class="divBox"
              style="border-bottom: 1px solid #dcdcdc; color: red"
              v-else
            >
              <p class="color">模板到期时间</p>
              <p class="width">已到期</p>
            </div>
            <div
              class="divBox"
              style="border-bottom: 1px solid #dcdcdc; text-align: center"
            >
              <p class="color">状态</p>
              <p class="width" style="line-height: 1.7rem; text-align: left">
                <van-switch
                  active-color="#004930"
                  inactive-color="rgba(0,0,0,0.25)"
                  size="30px"
                  :value="item.status === '0' ? true : false"
                  @input="onInput(item)"
                />
                <span v-if="item.status === '0' ? true : false">公开</span>
                <span v-else>不公开</span>
              </p>
            </div>
            <div
              class="divBox"
              style="border-bottom: 1px solid #dcdcdc; text-align: center"
            >
              <van-button
                @click="showSheet(item)"
                type="primary"
                color="#004930"
                >操作</van-button
              >
            </div>
            <van-action-sheet v-model="showEdit">
              <van-button
                icon="gold-coin-o"
                type="default"
                @click="handlePay(modelMsg)"
                >续费</van-button
              >
              <van-button
                icon="eye-o"
                type="default"
                @click="handleClick(modelMsg.id)"
                >查看主页</van-button
              >
              <van-button
                icon="edit"
                type="default"
                @click="handleEdit(modelMsg.id)"
                :disabled="modelMsg.isEdit === true ? false : true"
                >编辑</van-button
              >
              <van-button
                icon="photo-o"
                type="default"
                @click="handleMediaImg(modelMsg.id)"
                :disabled="modelMsg.isEdit === true ? false : true"
                >纪念相册</van-button
              >
              <van-button
                icon="comment-o"
                type="default"
                @click="handleMsg(modelMsg.id, name)"
                :disabled="modelMsg.isEdit === true ? false : true"
                >祭奠留言</van-button
              >
              <van-button
                icon="label-o"
                type="default"
                @click="handleArticle(modelMsg.id, name)"
                :disabled="modelMsg.isEdit === true ? false : true"
                >纪念文章</van-button
              >
              <van-button
                icon="video-o"
                type="default"
                @click="handleMediaVideo(modelMsg.id)"
                :disabled="modelMsg.isEdit === true ? false : true"
                >纪念视频</van-button
              >
            </van-action-sheet>
          </div>
          <template> </template>
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
import { getUserMemoryList, setMemoryStatus } from "@/pages/mobile/api/mark.js";
import { Dialog } from "vant";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      finished: false,
      showEdit: false, //编辑菜单
      showInfo: false, //显示编辑
      showMemoryMediaImg: false, //显示相册附件
      showMemoryMediaVideo: false, //显示视频附件
      showMemoryMsgList: false, //祭奠留言
      showMemoryArticleList: false, //纪念文章
      infoId: "",
      checked: true, //状态栏
      name: "",
      modelMsg: {},
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
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  methods: {
    // 显示编辑
    showSheet(item) {
      this.showEdit = true;
      this.infoId = item.id;
      this.name = item.name;
      this.modelMsg = item;
    },
    // 编辑
    handleEdit(infoId) {
      this.$router.push({
        path: "/member/grjnUser/info",
        query: {
          id: infoId,
        },
      });
    },
    // 相册
    handleMediaImg(infoId) {
      this.$router.push({
        path: "/member/grjnUser/showMediaImg",
        query: {
          id: infoId,
        },
      });
    },
    // 视频
    handleMediaVideo(infoId) {
      this.$router.push({
        path: "/member/grjnUser/showMediaVideo",
        query: {
          id: infoId,
        },
      });
    },
    // 留言
    handleMsg(infoId, name) {
      this.$router.push({
        path: "/member/grjnUser/showMsg",
        query: {
          id: infoId,
          name: name,
        },
      });
    },
    // 相册
    handleArticle(infoId, name) {
      this.$router.push({
        path: "/member/grjnUser/showArticle",
        query: {
          id: infoId,
          name: name,
        },
      });
    },
    //纪念详情页
    /*     handleClick(id) {
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: id,
        },
      });
    }, */
    //续费
    handlePay(item) {
      this.$router.push({
        path: "/member/grjnUser/showPay",
        query: {
          id: item.id,
          name: item.name,
        },
      });
    },
    //查看个人主页详情
    handleClick(infoId) {
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: infoId,
        },
      });
    },
    onInput(record, checked) {
      Dialog.confirm({
        title: "提醒",
        message: "确定要修改公开状态吗?",
      }).then(() => {
        this.checked = checked;
        var status = record.status === "0" ? "1" : "0";
        setMemoryStatus({
          id: record.id,
          status: status,
        }).then((res) => {
          if (res.code === 0) {
            record.status = status;
          }
        });
      });
    },
    // 查询
    handleSearch() {
      this.model.current = 1;
      this.model.list = [];
      this._getUserMemoryList();
    },
    onLoad() {
      this._getUserMemoryList();
    },
    // 我的纪念馆列表
    _getUserMemoryList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      getUserMemoryList(this.model).then((res) => {
        this.$toast.clear();
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
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
p {
  margin-bottom: 0 !important;
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
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}
/deep/ .van-action-sheet__content {
  text-align: center;
  .van-button--default {
    border: 1px solid transparent;
  }
  .van-button {
    border: 1px solid transparent;
    width: 100%;
    .van-button__text {
      width: 25%;
    }
  }
}
.form {
  padding: 0.5rem;

  .div {
    margin-top: 0.5rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .divBoxArea {
      display: flex;

      .color {
        background: #f5f5f5;
        color: #999999;
      }

      p {
        display: block;
        height: 1.2rem;
        text-align: center;
        line-height: 1.2rem;
      }
    }

    .divBox {
      display: flex;
      // justify-content: space-between;
      .van-button--primary {
        width: 100%;
      }
      p {
        display: block;
        height: 1.2rem;
        width: 2.4rem;
        line-height: 1.2rem;
      }

      .color {
        background: #f5f5f5;
        color: #999999;
        text-align: center;
      }
      .width {
        padding-left: 0.2rem;
        width: 3.7rem !important;
        position: relative;
        /deep/.van-switch {
          width: 1.8rem;
        }
        /deep/ .van-switch--on .van-switch__node {
          -webkit-transform: translateX(1.25rem);
          transform: translateX(1.25rem);
        }
        span {
          position: absolute;
          left: 0.82rem;
          top: -0.21rem;
          color: #ffffff;
        }
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
        height: 1.2rem;
        border: solid 0.02rem #e0e0e0;
        padding: 0rem 0.2rem;
        outline: none;
      }

      .codeImg {
        width: 1.6rem;
        height: 1.2rem;
        border: solid 1px #e0e0e0;
        border-left: 0px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .smsCodeBtn {
        width: 1.6rem;
        height: 1.2rem;
        background-color: #004930;
        text-align: center;
        line-height: 1.2rem;
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
