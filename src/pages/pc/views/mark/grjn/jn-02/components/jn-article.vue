<template>
  <div class="article">
    <div class="articleBox" v-show="show">
<<<<<<< HEAD
      <a-icon
        class="close"
        style="color:#004830"
        @click="handleClose"
        type="close"
      />
=======
      <a-icon class="close" @click="handleClose" type="close" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <p></p>
    </div>
    <div class="title">
      <img src="/img/pc/02_star.png" alt="" />
      <p>纪念文章</p>
      <img src="/img/pc/02_star.png" alt="" />
    </div>
    <div class="articleInfo" v-if="this.model.list != ''">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930;"
          spin
        />
        <div class="articleItem">
          <div
            class="articleList"
            v-for="item in model.list"
            :key="item.id"
            @click="handleClick(item)"
          >
            <div class="articleCont">
              <img :src="baseUrl + item.cover" :onerror="defImg" alt="" />
              <p class="articleTitle">
                {{ item.title ? item.title : "暂无文章标题" }}
              </p>
              <p class="articleMsg">
                {{ item.cont }}
              </p>
            </div>
          </div>
        </div>
        <paging class="paginghide" ref="paging" @setPage="setPage"></paging>
      </a-spin>
    </div>
    <div v-else><a-empty /></div>
  </div>
</template>

<script>
import { memoryMsgList } from "@/pages/pc/api/mark.js";
import $ from "jquery";
export default {
<<<<<<< HEAD
  props: {
    //数据
    bannerModel: {
      //type 接收的数据类型
      type: Object,
      default: () => {
        return {};
      },
    },
  },
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  components: {
    paging: () => import("@/pages/pc/views/mark/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      show: false,
      model: {
        current: 1, //	当前页
        pageSize: 3, //每页条数
        searchText: "", //关键字搜索
<<<<<<< HEAD
        memoryId: this.bannerModel.id, //个人主页id
=======
        memoryId: this.$route.params.id, //个人主页id
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        msgType: "2", //消息类型 1留言 2文章
        status: "0", //	0显示 1隐藏
      },
    };
  },
  mounted() {
    this._memoryMsgList();
  },
  methods: {
    _memoryMsgList() {
      this.loading = true;
      memoryMsgList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
<<<<<<< HEAD
=======
          console.log(res);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._memoryMsgList();
    },
    // 查看更多文章内容
    handleClick(item) {
      this.show = true;
      $(".articleBox p").html(item.cont);
    },
    handleClose() {
      this.show = false;
    },
  },
};
</script>
<style lang="less" scoped>
.article {
  width: 1200px;
  margin: 30px auto;
  position: relative;
  .articleBox {
    width: 800px;
    height: 400px;
    margin: 0 auto;
    background: #ffff;
    position: absolute;
    left: 50%;
    top: 10%;
    z-index: 88;
    transform: translate(-50%, 0);
<<<<<<< HEAD
    border: 1px solid #00744c;
=======
    border: 1px solid #000;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .close {
      float: right;
      font-size: 30px;
      margin-right: -18px;
      margin-top: -18px;
    }
    p {
      margin-top: 30px;
    }
  }

  .title {
    font-size: 40px;
    color: #0d1351;
    text-align: center;
    margin: 50px 0;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      margin: 0 10px;
    }
  }

  .articleInfo {
    .paginghide {
      display: none;
    }
    .articleItem {
      display: flex;
      flex-wrap: wrap;

      .articleList {
        width: 380px;
        margin-right: 30px;
        background-color: #ffffff;
        box-shadow: 2px 4px 10px 0px rgba(101, 101, 101, 0.35);

        &:last-child {
          margin-right: 0;
        }

        .articleCont {
          width: 280px;
          padding-bottom: 10px;
          margin: 0 auto;
          margin-top: 10px;
          img {
            width: 280px;
          }
          .articleTitle {
            font-size: 24px;
            letter-spacing: 1px;
            margin-top: 30px;
            line-height: 30px;
            letter-spacing: 1px;
            color: #333333;
          }

          .articleMsg {
            margin-top: 20px;
            text-align: justify;
            font-size: 14px;
            line-height: 20px;
            color: #666666;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
