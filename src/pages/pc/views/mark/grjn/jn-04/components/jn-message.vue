<template>
  <div class="ly">
    <div class="lytitle">
      <div class="title">
        <div class="top">
          <p>祭奠</p>
          <span>★</span>
          <p>留言</p>
        </div>
        <div class="bottom">
          <img src="/img/pc/04_title.png" alt="" />
        </div>
      </div>
<<<<<<< HEAD
      <div class="lyBtn" @click="handleClick">
=======
      <div class="lyBtn">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        我要纪念
      </div>
    </div>
    <div class="lyInfo" v-if="this.model.list != ''">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930;"
          spin
        />
        <div class="lyList" v-for="item in model.list" :key="item.id">
          <div class="giftName" v-if="item.goodsId != null">
            <p class="to">送出了</p>
            <p class="gift">{{ item.goodsTitle }}</p>
          </div>
          <div class="lyListBox">
            <div class="lyListAvatar">
              <div class="lyListGiftName">
                <div class="lyListSend" v-if="item.goodsId != null">
                  <a-avatar
                    style="border: 1px solid;background: #ffff;"
                    :size="64"
<<<<<<< HEAD
                    :src="handleAvatar(item.avatar)"
=======
                    :src="item.avatar"
                    :onerror="defImg"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
                  />
                  <p class="name">{{ item.nickname }}</p>
                </div>
                <div class="lyListName">
                  <p style="margin-right: 20px;">{{ item.nickname }}</p>
                  <p>{{ item.createDate }}</p>
                </div>
              </div>
              <p>
                {{ item.cont }}
              </p>
            </div>
            <div class="lyListInfo" v-if="item.goodsId != null">
              <a-avatar
                :size="100"
                :src="baseUrl + item.goodsCover"
                :onerror="defImg"
              />
            </div>
          </div>
        </div>
      </a-spin>
      <paging class="paginghide" ref="paging" @setPage="setPage"></paging>
    </div>
    <div v-else><a-empty /></div>
  </div>
</template>

<script>
import { memoryMsgList } from "@/pages/pc/api/mark.js";
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
      defImg: 'this.src="/img/wfck.png"',
      loading: false,
      model: {
        current: 1, //	当前页
        pageSize: 3, //每页条数
        searchText: "", //关键字搜索
<<<<<<< HEAD
        memoryId: this.bannerModel.id, //个人主页id
=======
        memoryId: this.$route.params.id, //个人主页id
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        msgType: "1", //消息类型 1留言 2文章
        status: "0", //	0显示 1隐藏
      },
    };
  },
  mounted() {
    this._memoryMsgList();
<<<<<<< HEAD
    this.handleAvatar();
  },
  methods: {
    handleAvatar(avatar) {
      if (avatar) {
        if (avatar.indexOf("https") >= 0) {
          return avatar;
        } else if (avatar.indexOf("http") >= 0) {
          return avatar;
        } else {
          return process.env.VUE_APP_BASE_URL + avatar;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    handleClick() {
      this.$router.push({
        path: "/mark/shop/goodsList",
        query: {
          cid: "445465710975700992",
          id: this.bannerModel.id,
        },
      });
    },
=======
  },
  methods: {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    _memoryMsgList() {
      this.loading = true;
      memoryMsgList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          console.log(res);
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
  },
};
</script>

<style lang="less" scoped>
.ly {
  width: 1200px;
  margin: 30px auto;

  .lytitle {
    position: relative;

    .title {
      font-size: 40px;
      text-align: center;
      margin: 50px auto;
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .top {
        display: flex;
        justify-content: center;
        height: 55px;
        color: #333333;

        span {
          color: #ff4125;
        }
      }
    }

    .lyBtn {
      width: 190px;
      height: 50px;
      border-radius: 25px;
      font-size: 20px;
      color: #eae9e9;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 60px;
      background-color: #df0024;
      box-shadow: 0px 7px 0px 0px rgba(0, 0, 0, 0.15);
      border-radius: 32px;
      cursor: pointer;
    }
  }

  .lyInfo {
    margin-top: 30px;
    .paginghide {
      display: none;
    }

    .lyList {
      background-image: url("/img/pc/04ly.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 10px;
      padding: 80px;
      padding-top: 120px;
      padding-bottom: 40px;
      box-sizing: border-box;
      position: relative;
      margin-top: 30px;

      .giftName {
        position: absolute;
        left: 30%;
        top: 3%;
        width: 405px;
        height: 57px;
        background-image: url("/img/pc/04_gift.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        font-size: 16px;
        line-height: 57px;
        color: #ffffff;
        justify-content: center;
        .to {
          padding-left: 20px;
          padding-right: 5px;
        }
      }
      .lyListBox {
        display: flex;

        .lyListAvatar {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: 80%;
          margin: 0 auto;
          padding-bottom: 10px;
          box-sizing: border-box;
          > p {
            margin-top: 10px;
            border-top: 1px solid #562e1e;
            padding-top: 10px;
          }
          .ant-avatar-image {
            border: 1px solid;
            background: #ffff;
          }
          .lyListGiftName {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .lyListSend {
              display: flex;
              line-height: 20px;

              .name {
                font-size: 20px;
                color: #562e1e;
                font-weight: bold;
                margin-top: 25px;
              }
            }
          }

          .lyListName {
            display: flex;
            font-size: 14px;
            color: #872121;
            margin-top: 25px;
          }
        }
        .lyListInfo {
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0px;
          color: #872121;
          display: flex;
          align-items: center;
          margin: 0 auto;
          margin-top: 20px;
          border: 10px solid;
          border-radius: 50%;
          .lyListInfoGift {
            width: 120px;
            height: 120px;
            background-color: #f7f7f5;
            border: solid 6px #892525;
            border: solid 6px #892525;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
