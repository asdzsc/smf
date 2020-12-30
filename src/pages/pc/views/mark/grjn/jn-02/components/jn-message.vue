<template>
  <div class="ly">
    <div class="lytitle">
      <div class="title">
        <img src="/img/pc/02_star.png" alt="" />
        <p>祭奠留言</p>
        <img src="/img/pc/02_star.png" alt="" />
      </div>
      <div class="lyBtn">
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
          <div class="lyListAvatar">
            <div class="lyListGiftName">
              <a-avatar :size="64" :src="item.avatar" :onerror="defImg" />
              <div class="lyListSend" v-if="item.goodsId != null">
                <p class="name">{{ item.nickname }}</p>
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
              <a-avatar :src="baseUrl + item.goodsCover" :onerror="defImg" />
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
        memoryId: this.$route.params.id, //个人主页id
        msgType: "1", //消息类型 1留言 2文章
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
      color: #333333;
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

    .lyBtn {
      width: 141px;
      height: 50px;
      background-color: #ffffff;
      box-shadow: 1px 2px 5px 0px rgba(101, 101, 101, 0.35);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 20px;
      cursor: pointer;
      font-size: 24px;
      color: #1b2159;
    }
  }

  .lyInfo {
    .paginghide {
      display: none;
    }
    .lyList {
      margin-top: 30px;
      border-radius: 10px;
      padding: 40px;
      box-sizing: border-box;
      background-color: #ffffff;
      box-shadow: 1px 2px 5px 0px rgba(101, 101, 101, 0.35);

      .lyListAvatar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .lyListGiftName {
          display: flex;
          align-items: flex-end;

          .lyListSend {
            display: flex;
            line-height: 20px;

            .name {
              font-size: 20px;
              letter-spacing: 1px;
              color: #562e1e;
              font-weight: bold;
            }

            .to {
              font-size: 16px;
              color: #872121;
              padding-left: 20px;
              padding-right: 5px;
            }

            .gift {
              font-size: 16px;
              color: #562e1e;
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
        justify-content: space-between;
        .lyListInfoGift {
          width: 120px;
          height: 120px;
          background-image: url("/img/pc/02avatarbj.png");
          background-size: 100% auto;
          background-repeat: no-repeat;
          /deep/.ant-avatar {
            width: 88px;
            height: 88px;
            line-height: 100px;
            font-size: 18px;
            margin-top: 7px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
