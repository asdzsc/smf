<template>
  <div class="orderCommentList">
    <div class="title">
      <p>评论内容</p>
      <p><van-icon @click="handleCancel" name="cross" /></p>
    </div>
    <div class="orderCont">
      <div>
        <div class="infoList" v-for="item in list" :key="item.id">
          <div class="info">
            <van-image
              round
              width=".64rem"
              height=".64rem"
              :src="getAvatar(item.avatar)"
            />
            <div class="commentAuthor">
              {{ item.name
              }}<span class="commentDtime">{{
                parseTime(item.create_date)
              }}</span>
              <van-rate
                :size="25"
                v-model="item.score"
                v-if="item.comment_type === '1'"
                :default-value="item.score"
                readonly
                color="#ffd21e"
                void-icon="star"
                void-color="#ccc"
              />
            </div>
          </div>
          <div class="content">
            <div class="comment" v-html="item.cont"></div>
            <div v-if="item.imgList.length > 0" class="commentImgs">
              <div
                v-for="(imgItem, index) in item.imgList"
                :key="index"
                @click="showImg(item.imgList, index)"
                class="commentImgItem"
              >
                <img :src="getImgUrl(imgItem)" />
              </div>
            </div>
          </div>
          <div v-if="item.comment_type === '1'" style="text-align: right">
            <div class="btn" @click="del(item.id)">删除评论</div>
          </div>
        </div>
        <van-empty v-if="list.length === 0" description="评论不存在或已删除" />
      </div>
    </div>
  </div>
</template>

<script>
import { orderCommentList, delMyOrderComment } from "@/pages/mobile/api/shop";
import * as utils from "@/pages/mobile/libs/utils";
import { Dialog, ImagePreview } from "vant";
export default {
  props: {
    orderId: {
      type: String,
      default() {
        return "";
      },
    },
    //评论类型
    commentType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/usernull.png'`,
      title: "",
      list: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.title = "评论内容";
      if (this.commentType === "1") {
        this.title = "评论内容";
      } else if (this.commentType === "2") {
        this.title = "服务反馈内容";
      }
      this._orderCommentList();
    },
    _orderCommentList() {
      orderCommentList({
        id: this.orderId,
        commentType: this.commentType,
        isUser: true,
        isPaging: false,
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data;
          this.list.forEach((item) => {
            if (item.img) {
              var imgList = item.img.split(",");
              this.$set(item, "imgList", imgList);
            } else {
              this.$set(item, "imgList", []);
            }
            item.cont = item.cont.replace(/\n/g, "<br>");
          });
        }
      });
    },
    getAvatar(record) {
      if (record) {
        if (record.indexOf("http") >= 0) {
          return record;
        } else {
          return this.baseUrl + record;
        }
      } else {
        return "/img/usernull.png";
      }
    },
    getImgUrl(imgUrl) {
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          return imgUrl;
        } else {
          return this.baseUrl + imgUrl;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    showImg(imgList, index) {
      let img = imgList.map((i) => {
        if (i.indexOf("http") >= 0) {
          return i;
        } else {
          return this.baseUrl + i;
        }
      });
      ImagePreview(img, index);
    },
    //删除评论
    del(nid) {
      var vm = this;
      Dialog.confirm({
        title: "标题",
        message: "确认要删除吗?",
      })
        .then(() => {
          // on close
          delMyOrderComment({
            id: nid,
          }).then((res) => {
            if (res.code === 0) {
              vm.handleCancel(res);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    parseTime(time) {
      if (time) {
        return utils.parseTime(time, "{y}-{m}-{d}");
      } else {
        return "";
      }
    },
    handleCancel(res) {
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.orderCommentList {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0.88rem;
  width: 100%;
  background: #f3f3f3;
  .title {
    width: 90%;
    margin: 0 auto;
    padding: 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #ccc;
  }
  .orderCont {
    width: 90%;
    margin: 0.2rem auto;
    padding: 0 0.4rem;
    box-sizing: border-box;
    .infoList {
      margin-top: 0.2rem;
      .btn {
        color: #fff;
        background-color: #d9363e;
        border-color: #d9363e;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        width: 2rem;
        margin: 0.2rem 0;
        float: right;
      }
      .info {
        display: inline-block;
        /deep/.van-image {
          float: left;
        }
        .commentAuthor {
          float: left;
          width: 80%;
          margin-left: 0.2rem;
          span {
            margin: 0 0.2rem;
          }
        }
      }
      .content {
        .commentImgs {
          width: 100%;
          margin-top: 0.2rem;
          .commentImgItem {
            width: 1.7rem;
            height: 1.7rem;
            display: inline-block;
            margin-right: 0.2rem;
            img {
              width: 100%;
              height: 100%;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
