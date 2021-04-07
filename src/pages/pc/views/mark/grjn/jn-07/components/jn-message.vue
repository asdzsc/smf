<template>
  <div class="ly">
    <div class="lytitle">
      <div class="title">
        <p class="yw">Memorial message</p>
        <p class="zw">祭奠留言</p>
      </div>
      <div class="lyBtn" @click="handleClick">
        <p>我要纪念</p>
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
          <div class="lyListAvatar">
            <div class="lyListGiftName">
              <a-avatar :size="64" :src="handleAvatar(item.avatar)" />
              <div class="lyListSend" v-if="item.goodsId != null">
                <p class="name">"{{ item.nickname }}"</p>
                <p class="to">送出了</p>
                <p class="gift">{{ item.goodsTitle }}</p>
              </div>
            </div>
            <div class="lyListName">
              <p style="margin-right: 20px;">{{ item.nickname }}</p>
              <p>{{ item.createDate }}</p>
            </div>
          </div>
          <div class="lyListInfo">
            <p>
              {{ item.cont }}
            </p>
            <div class="lyListInfoGift" v-if="item.goodsId != null">
              <a-avatar :size="100" :src="baseUrl + item.goodsCover" />
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
  components: {
    paging: () => import("@/pages/pc/views/mark/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {
        current: 1, //	当前页
        pageSize: 3, //每页条数
        searchText: "", //关键字搜索
        memoryId: this.bannerModel.id, //个人主页id
        msgType: "1", //消息类型 1留言 2文章
        status: "0", //	0显示 1隐藏
      },
    };
  },
  mounted() {
    this._memoryMsgList();
    this.handleAvatar();
  },
  methods: {
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
    handleClick() {
      this.$router.push({
        path: "/mark/shop/goodsList",
        query: {
          cid: "445465710975700992",
          id: this.bannerModel.id,
        },
      });
    },
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin-bottom: 50px;
      margin-top: 100px;
      .yw {
        font-size: 44px;
        font-weight: bold;
        line-height: 42px;
        color: #3c3427;
        line-height: 0;
      }

      .zw {
        width: 225px;
        margin: 0 auto;
        background-image: url("/img/pc/07_title.png");
        background-size: 100% 100%;
        font-size: 40px;
        text-align: center;
        color: #b38b4e;
      }
    }

    .lyBtn {
      width: 235px;
      height: 60px;
      background-color: #782225;
      box-shadow: 0px 7px 0px 0px rgba(0, 0, 0, 0.15);
      border-radius: 32px;
      position: absolute;
      right: 0;
      top: 0px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      font-size: 28px;
      color: #fff;
    }
  }

  .lyInfo {
    .paginghide {
      display: none;
    }
    .lyList {
      margin-top: 30px;
      padding: 40px;
      box-sizing: border-box;
      border: solid 8px #b1894d;
      position: relative;

      .lyListAvatar {
        display: flex;
        width: 80%;
        margin-left: 30px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #562e1e;
        padding-bottom: 20px;
        .lyListGiftName {
          display: flex;
          align-items: flex-end;
          .lyListSend {
            display: flex;
            line-height: 20px;

            .name {
              font-size: 20px;
              letter-spacing: 1px;
              color: #999999;
              font-weight: bold;
            }

            .to {
              font-size: 16px;
              color: #999999;
              padding-left: 20px;
              padding-right: 5px;
            }

            .gift {
              font-size: 16px;
              color: #999999;
            }
          }
        }

        .lyListName {
          display: flex;
          font-size: 14px;
          color: #999999;
          margin-top: 25px;
        }
      }

      .lyListInfo {
        width: 80%;
        margin-left: 30px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #999999;
        margin-top: 20px;

        .lyListInfoGift {
          background-image: url("/img/pc/06avatarbj.png");
          background-size: 100% auto;
          background-repeat: no-repeat;
          background-position: center center;
          position: absolute;
          right: 100px;
          top: 30px;
        }
      }
    }
  }
}
</style>
