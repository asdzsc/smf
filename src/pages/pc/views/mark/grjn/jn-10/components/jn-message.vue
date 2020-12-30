<template>
  <div class="ly">
    <div class="lytitle">
      <div class="title">
        祭奠留言
      </div>
      <div class="lyBtn">
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
              <a-avatar :size="64" :src="item.goodsCover" />
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
      color: #fff;
      text-align: center;
      margin: 50px auto;
      margin-top: 100px;
      width: 312px;
      height: 192px;
      line-height: 192px;
      background-image: url("/img/pc/10_title.png");
      background-size: 100% 100%;
      background-position: center;
    }

    .lyBtn {
      width: 200px;
      height: 50px;
      background-color: #c71c00;
      border-radius: 25px;
      position: absolute;
      right: 0;
      top: 60px;
      text-align: center;
      line-height: 50px;
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
      background-color: #f8faff;
      box-shadow: 4px 6px 16px 0px rgba(104, 103, 102, 0.13);
      border-radius: 20px;
      position: relative;

      .lyListAvatar {
        display: flex;
        width: 80%;
        margin-left: 30px;
        justify-content: space-between;
        align-items: center;
        color: #9a3035;

        .lyListGiftName {
          display: flex;
          align-items: flex-end;

          .lyListSend {
            display: flex;
            line-height: 20px;

            .name {
              font-size: 20px;
              letter-spacing: 1px;
              font-weight: bold;
            }

            .to {
              font-size: 16px;
              color: #562e1e;
              padding-left: 20px;
              padding-right: 5px;
            }

            .gift {
              font-size: 16px;
            }
          }
        }

        .lyListName {
          display: flex;
          font-size: 14px;
          color: #333333;
          margin-top: 25px;
        }
      }

      .lyListInfo {
        width: 80%;
        margin-left: 30px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #872121;
        margin-top: 20px;

        .lyListInfoGift {
          background-color: #fff;
          border: solid 6px #9a3035;
          border-radius: 50%;
          position: absolute;
          right: 70px;
          top: 55px;
        }
      }
    }
  }
}
</style>
