<template>
  <div class="ly">
    <div class="lytitle">
      <div class="title">
        <p>祭奠留言</p>
      </div>
      <div class="lyBtn">
        <p>我要纪念</p>
      </div>
    </div>
    <div class="lyInfo">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930;"
          spin
        />
        <div class="lyList">
          <div class="lyListAvatar">
            <div class="lyListGiftName">
              <a-avatar
                :size="64"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <div class="lyListSend">
                <p class="name">“小姑姑”</p>
                <p class="to">送出了</p>
                <p class="gift">风铃花</p>
              </div>
            </div>
            <div class="lyListName">
              <p style="margin-right: 20px;">爸爸</p>
              <p>2020年1月1日 11:40</p>
            </div>
          </div>
          <div class="lyListInfo">
            <p>
              贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
            </p>
            <div class="lyListInfoGift">
              <a-avatar
                :size="100"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </div>
          </div>
        </div>
        <div class="lyList">
          <div class="lyListAvatar">
            <div class="lyListGiftName">
              <a-avatar
                :size="64"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <div class="lyListSend">
                <p class="name">“小姑姑”</p>
                <p class="to">送出了</p>
                <p class="gift">风铃花</p>
              </div>
            </div>
            <div class="lyListName">
              <p style="margin-right: 20px;">爸爸</p>
              <p>2020年1月1日 11:40</p>
            </div>
          </div>
          <div class="lyListInfo">
            <p>
              贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
            </p>
            <div class="lyListInfoGift">
              <a-avatar
                :size="100"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </div>
          </div>
        </div>
      </a-spin>
      <paging class="paginghide" ref="paging" @setPage="setPage"></paging>
    </div>
  </div>
</template>

<script>
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
        current: "1",
        pageSize: "8",
        total: "0",
        list: [],
      },
    };
  },

  methods: {
    setPage() {},
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
      color: #343437;
      margin: 50px auto;
      margin-top: 100px;
      width: 519px;
      background-image: url("/img/pc/06_title.png");
      text-align: center;
      background-repeat: no-repeat;
    }

    .lyBtn {
      width: 235px;
      height: 100px;
      background-image: url("/img/pc/06_lybtn.png");
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      top: 0px;
      line-height: 140px;
      cursor: pointer;
      font-size: 28px;
      color: #eae9e9;
      p {
        margin-left: 40px;
      }
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
      background-image: url("/img/pc/06ly.png");
      background-size: 100% 100%;
      position: relative;

      .lyListAvatar {
        display: flex;
        width: 80%;
        margin-left: 30px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #562e1e;
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
              color: #d52255;
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
        width: 80%;
        margin-left: 30px;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #872121;
        margin-top: 20px;

        .lyListInfoGift {
          width: 120px;
          height: 120px;
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
