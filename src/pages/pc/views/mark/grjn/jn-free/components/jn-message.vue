<template>
  <div class="ly">
    <div class="lytitle">
      <div>
        <p>祭奠留言</p>
        <div class="line"></div>
      </div>
      <div class="lyBtn" @click="handleClick">
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
            <a-avatar
              :size="70"
              :src="handleAvatar(item.avatar)"
              :onerror="defImg"
            />
          </div>
          <div class="lyListInfo">
            <div class="lyListGift" v-if="item.goodsId != null">
              <div class="lyListGiftIcon">
                <a-avatar
                  :size="70"
                  :src="baseUrl + item.goodsCover"
                  :onerror="defImg"
                />
              </div>
              <div class="lyListGiftName">
                <p style="margin-right: 5px;">"{{ item.nickname }}"</p>
                <span style="margin-right: 5px;">给</span>
                <p style="margin-right: 5px;">"{{ item.memoryName }}"</p>
                <span style="margin-right: 5px;">送出了</span>
                <p style="margin-right: 5px;">{{ item.goodsTitle }}</p>
              </div>
            </div>
            <div class="lyListMsg">
              {{ item.cont }}
            </div>
            <div class="lyListName">
              <p style="margin-right: 20px;">{{ item.nickname }}</p>
              <p>{{ item.createDate }}</p>
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
    font-size: 40px;
    color: #00744c;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
    position: relative;

    .line {
      line-height: 30px;
      margin: 0 auto;
      width: 160px;
      height: 8px;
      background-color: #00744c;
      border-radius: 4px;
    }

    .lyBtn {
      width: 190px;
      height: 50px;
      border-radius: 25px;
      border: solid 4px #00744c;
      font-size: 20px;
      color: #00744c;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 29px;
      cursor: pointer;
    }
  }

  .lyInfo {
    .paginghide {
      display: none;
    }
    .lyList {
      margin-top: 30px;
      background-color: #ffffff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      display: flex;
      padding: 40px;
      box-sizing: border-box;

      .lyListAvatar {
        margin-right: 30px;
        .avatar {
          width: 64px;
          border-radius: 50%;
          height: 64px;
        }
      }

      .lyListInfo {
        display: flex;
        flex-direction: column;
        width: 100%;
        .lyListGift {
          height: 62px;
          line-height: 62px;
          background-color: #00744c;
          border-radius: 10px;
          margin-bottom: 20px;
          width: 100%;
          position: relative;

          .lyListGiftIcon {
            .ant-avatar-image {
              border: 1px solid #fff;
              background: #fff;
              position: absolute;
              left: 15px;
              top: -30px;
            }
          }

          .lyListGiftName {
            display: flex;
            font-size: 20px;
            color: #fefefe;
            margin-left: 120px;
          }
        }

        .lyListMsg {
          font-size: 16px;
          line-height: 24px;
          color: #999999;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          display: -webkit-box;
        }

        .lyListName {
          display: flex;
          font-size: 14px;
          letter-spacing: 0px;
          color: #004930;
          margin-top: 25px;
        }
      }
    }
  }
}
</style>
