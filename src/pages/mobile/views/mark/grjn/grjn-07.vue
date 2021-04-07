<template>
  <div class="grjn">
    <!-- banner start -->
    <div class="banner">
      <div class="bannerTitle">
        <div class="create">
          <div class="createAvatar">
            <van-image
              round
              width=".50rem"
              height=".50rem"
              :src="handleCreateAvatar(detailModal.createAvatar)"
            />
          </div>
          <div class="createName">{{ detailModal.createName }}</div>
        </div>
        <div class="bannerAvatar">
          <van-image
            round
            width="1.60rem"
            height="1.60rem"
            :src="baseUrl + detailModal.photo"
            :error-icon="defImg"
          />
        </div>
        <div class="bannerInfo">
          <p style="margin-bottom: 0" class="bannerName">
            {{ detailModal.name }}
          </p>
          <div class="bannerTime">
            <p style="margin-bottom: 0">
              出生：{{ detailModal.birthday }}
              {{ detailModal.birthdayAddress }}
            </p>
            <p style="margin-bottom: 0">
              离世：{{ detailModal.dieTime }}
              {{ detailModal.dieAddress }}
            </p>
          </div>
          <div class="bannerMsg">
            {{ detailModal.intro }}
          </div>
          <div class="btnWrap">
            <div class="bannerBtn" @click="handleClick">纪念Ta</div>
            <p style="margin-bottom: 0" class="bannerTimes">
              已有<span>{{ detailModal.msgNum }}</span
              >次纪念
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- banner end -->
    <!-- photo start -->
    <div class="photo" v-if="showPhoto">
      <div class="title">
        <p class="yw">Souvenir album</p>
        <p class="zw">纪念相册</p>
      </div>
      <div class="photoInfo" v-if="this.modelImg.list != ''">
        <van-list :finished="finishedImg" finished-text="没有更多了">
          <div
            class="photoList"
            v-for="(item, index) in this.modelImg.list"
            :key="index"
          >
            <img
              :src="baseUrl + item.url"
              @click="showGoodsImgModal(index)"
              :error-icon="defImg"
              alt=""
            />
          </div>
        </van-list>
        <div class="moreBtn" v-show="moreBtnImg" @click="handleMoreImg">
          查看更多
        </div>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </div>
    <!-- photo end -->
    <!-- ly start -->
    <div class="ly" v-if="showLy">
      <div class="lyTitle">
        <div class="lyBtn" @click="handleClick">我要纪念</div>
        <div class="title">
          <p class="yw">Memorial message</p>
          <p class="zw">祭奠留言</p>
        </div>
      </div>
      <div class="lyInfo" v-if="this.modelMsg.list != ''">
        <van-list :finished="finishedMsg" finished-text="没有更多了">
          <div class="lyList" v-for="item in modelMsg.list" :key="item.id">
            <div class="lyListAvatar">
              <van-image
                round
                width=".64rem"
                height=".64rem"
                :src="handleAvatar(item.avatar)"
              />
            </div>
            <div class="lyListInfo">
              <div class="lyListGift" v-if="item.goodsId != null">
                <div class="lyListGiftName">
                  {{ item.nickname }}
                  给{{ item.memoryName }}
                  送出了
                  {{ item.goodsTitle }}
                </div>
                <div class="lyListGiftIcon">
                  <van-image
                    round
                    width=".64rem"
                    height=".64rem"
                    :src="baseUrl + item.goodsCover"
                    :onerror="defImg"
                  />
                </div>
              </div>
              <div class="lyListMsg">
                {{ item.cont }}
              </div>
              <div class="lyListName">
                <p style="margin-right: 0.2rem">{{ item.nickname }}</p>
                <p>{{ item.createDate }}</p>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
      <div class="moreBtn" v-show="moreBtnMsg" @click="handleMoreMsg">
        更多留言
      </div>
    </div>
    <!-- ly end -->
    <!-- article start -->
    <div class="article" v-if="showArticle">
      <div class="title">
        <p class="yw">articles</p>
        <p class="zw">纪念文章</p>
      </div>
      <van-overlay v-show="showArticleCont">
        <div class="wrapper" @click="showArticleCont = false">
          <div class="block"></div>
        </div>
      </van-overlay>
      <div class="articleInfo" v-if="this.modelArticle.list != ''">
        <van-list :finished="finishedArticle" finished-text="没有更多了">
          <div
            class="articleList"
            v-for="item in modelArticle.list"
            :key="item.id"
            @click="handleClickArticle(item)"
          >
            <img :src="baseUrl + item.cover" :onerror="defImg" alt="" />
            <div class="articleCont">
              <p class="articleTitle">
                {{ item.title ? item.title : "暂无文章标题" }}
              </p>
              <p class="articleMsg">
                {{ item.cont }}
              </p>
            </div>
          </div>
        </van-list>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
      <div class="moreBtn" v-show="moreBtnArticle" @click="handleMoreArticle">
        更多文章
      </div>
    </div>
    <!-- article end -->
    <!-- video start -->
    <div class="video" v-if="showVideo">
      <div class="title">
        <p class="yw">video</p>
        <p class="zw">纪念视频</p>
      </div>
      <div class="videoInfo" v-if="this.modelVideo.list != ''">
        <van-list :finished="finishedVideo" finished-text="没有更多了">
          <div class="videoList" v-for="item in modelVideo.list" :key="item.id">
            <video
              :src="baseUrl + item.url"
              :poster="item.cover != '' ? baseUrl + item.cover : ''"
              controls
            ></video>
            <div class="videoCont">
              <!-- <van-icon size=".94rem" name="play-circle-o" /> -->
            </div>
            <p class="videoTitle">{{ item.title }}</p>
            <p class="videoTime">{{ item.createDate }}</p>
          </div>
        </van-list>
      </div>
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
      <div class="moreBtn" v-show="moreBtnVideo" @click="handleMoreVideo">
        更多视频
      </div>
    </div>
    <!-- video end -->
  </div>
</template>

<script>
import { memoryMediaList, memoryMsgList } from "@/pages/mobile/api/mark.js";
import { ImagePreview } from "vant";
import $ from "jquery";
export default {
  props: {
    //数据
    detailModal: {
      //type 接收的数据类型
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false, //加载中
      finishedImg: false, //没有更多了
      finishedMsg: false, //没有更多了
      finishedArticle: false, //没有更多了
      finishedVideo: false, //没有更多了
      moreBtnImg: true,
      moreBtnMsg: true,
      moreBtnArticle: true,
      moreBtnVideo: true,
      showPhoto: true, //图片
      showLy: true, //留言
      showArticle: true, //文章
      showVideo: true, //视频
      showArticleCont: false, //文章内容
      // 图片数据
      modelImg: {
        isPage: true,
        current: 1,
        pageSize: 4,
        searchText: "",
        mediaType: "image",
        list: [],
        memoryId: this.detailModal.id,
      },
      // 视频数据
      modelVideo: {
        isPage: true,
        current: 1,
        pageSize: 3,
        searchText: "",
        mediaType: "video",
        list: [],
        memoryId: this.detailModal.id,
      },
      // 留言数据
      modelMsg: {
        current: 1,
        pageSize: 3,
        searchText: "",
        memoryId: this.detailModal.id,
        msgType: "1",
        status: "0",
        list: [],
      },
      // 文章数据
      modelArticle: {
        current: 1,
        pageSize: 3,
        searchText: "",
        memoryId: this.detailModal.id,
        msgType: "2",
        status: "0",
        list: [],
      },
    };
  },
  mounted() {
    this._memoryMediaImg();
    this._memoryMsgList();
    this._memoryArticleList();
    this._memoryMediaVideo();
    this.detailModal.birthday = this.detailModal.birthday.substring(0, 10);
    this.detailModal.dieTime = this.detailModal.dieTime.substring(0, 10);
  },
  methods: {
    // 创建人头像
    handleCreateAvatar(createAvatar) {
      if (createAvatar) {
        if (createAvatar.indexOf("http" || "https") >= 0) {
          return createAvatar;
        } else {
          return process.env.VUE_APP_BASE_URL + createAvatar;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    //纪念人头像
    handleAvatar(avatar) {
      if (avatar) {
        if (avatar.indexOf("http" || "https") >= 0) {
          return avatar;
        } else {
          return process.env.VUE_APP_BASE_URL + avatar;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    // 纪念按钮
    handleClick() {
      this.$router.push({
        path: "/mark/shop/goodsList",
        query: {
          cid: "445465710975700992",
          id: this.detailModal.id,
        },
      });
    },
    //图片预览
    showGoodsImgModal(index) {
      let imgList = this.modelImg.list.map((i) => {
        return this.baseUrl + (i.url ? i.url : i.cover);
      });
      ImagePreview(imgList, index);
    },
    // 获取图片数据
    _memoryMediaImg() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      memoryMediaList(this.modelImg).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelImg.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelImg.current++;
          } else {
            this.finishedImg = true;
            this.moreBtnImg = false;
          }
        }
      });
    },
    handleMoreImg() {
      this.showLy = false;
      this.showArticle = false;
      this.showVideo = false;
      this._memoryMediaImg();
    },
    // 获取留言数据
    _memoryMsgList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      memoryMsgList(this.modelMsg).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelMsg.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelMsg.current++;
          } else {
            this.finishedMsg = true;
            this.moreBtnMsg = false;
          }
        }
      });
    },
    handleMoreMsg() {
      this.showPhoto = false;
      this.showArticle = false;
      this.showVideo = false;
      this._memoryMsgList();
    },
    // 获取文章数据
    _memoryArticleList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      memoryMsgList(this.modelArticle).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelArticle.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelArticle.current++;
          } else {
            this.finishedArticle = true;
            this.moreBtnArticle = false;
          }
        }
      });
    },
    handleMoreArticle() {
      this.showPhoto = false;
      this.showLy = false;
      this.showVideo = false;
      this._memoryArticleList();
    },
    handleClickArticle(item) {
      this.showArticleCont = true;
      $(".block").html(item.cont);
    },
    // 获取视频数据
    _memoryMediaVideo() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      memoryMediaList(this.modelVideo).then((res) => {
        this.$toast.clear();
        if (res.code === 0) {
          const results = res.data.list;
          this.modelVideo.list.push(...results);
          if (res.data.hasNextPage) {
            this.modelVideo.current++;
          } else {
            this.finishedVideo = true;
            this.moreBtnVideo = false;
          }
        }
      });
    },
    handleMoreVideo() {
      this.showLy = false;
      this.showArticle = false;
      this.showPhoto = false;
      this._memoryMediaVideo();
    },
  },
};
</script>

<style lang="less" scoped>
.grjn {
  background-image: url("/img/mobile/mark/banner_07.png");
  background-size: cover;
  .moreBtn {
    font-size: 0.24rem;
    color: #fff;
    margin: 0.3rem auto 0.7rem;
    text-align: center;
    padding-bottom: 0.5rem;
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0.5rem 0;
    .yw {
      font-size: 0.36rem;
      font-weight: bold;
      line-height: 0.42rem;
      color: #3c3427;
    }

    .zw {
      width: 1.65rem;
      margin: 0 auto;
      background-image: url("/img/mobile/mark/title_07.png");
      background-size: 100% 100%;
      font-size: 0.36rem;
      text-align: center;
      color: #b38b4e;
    }
  }
  .banner {
    // width: 5.82rem;
    width: 92%;
    margin: 0 auto;
    padding: 20% 0;
    padding-bottom: 0;
    .bannerTimes {
      font-size: 0.26rem;
      line-height: 0.28rem;
      color: #fff;
      text-align: center;
      margin-top: 0.2rem;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        color: #d4a45a;
        letter-spacing: 0.02rem;
      }
    }
    .bannerTitle {
      height: 7.54rem;
      position: relative;
      text-align: center;
      color: #fff;
      .btnWrap {
        background: #782225;
        width: 80%;
        margin: 0 auto;
        margin-top: 0.2rem;
        padding: 0.2rem 0;
        box-sizing: border-box;
      }
      .create {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }
      .bannerAvatar {
        position: absolute;
        top: -0.8rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .bannerInfo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0.8rem;
        width: 90%;
        .bannerName {
          // margin: 0.2rem 0;
          margin-top: 0.2rem;
          font-size: 0.4rem;
          font-weight: bold;
          line-height: 0.7rem;
          letter-spacing: 0.01rem;
        }
        .bannerTime {
          font-size: 0.24rem;
          line-height: 0.5rem;
        }
        .bannerMsg {
          text-align: justify;
          text-indent: 0.44rem;
          font-size: 0.22rem;
          line-height: 0.3rem;
          letter-spacing: 0.01rem;
          margin: 0.1rem auto;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 10;
          overflow: hidden;
          display: -webkit-box;
        }
        .bannerBtn {
          width: 3rem;
          margin: 0 auto;
          height: 0.72rem;
          text-align: center;
          line-height: 0.72rem;
          border-radius: 0.36rem;
          color: #fff;
          background-color: #181818;
          border-radius: 0.36rem;
        }
      }
    }
  }
  .photo {
    padding: 0 0.4rem;

    .photoList {
      display: inline-block;
      margin-top: 0.5rem;
      margin-right: 4%;
      width: 48%;

      img {
        width: 100%;
        height: 2.1rem;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }
    }

    .my-swipe {
      img {
        display: inline-block;
        margin-top: 0.5rem;
        margin-right: 4%;
        width: 48%;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
  .ly {
    padding: 0 0.4rem;
    .lyTitle {
      // position: relative;

      display: flex;
      flex-direction: row-reverse;
      .title {
        font-size: 0.36rem;
        letter-spacing: 0.02rem;
        color: #333333;
      }
      .lyBtn {
        // position: absolute;
        // right: 0;

        width: 1.58rem;
        height: 0.55rem;
        font-size: 0.24rem;
        line-height: 0.55rem;
        color: #eae9e9;
        background: #df0024;
        border-radius: 0.24rem;
        text-align: center;
        margin-top: 15%;
      }
    }
    .lyInfo {
      width: 100%;
      .lyList {
        display: flex;
        padding: 0.5rem;
        box-sizing: border-box;
        margin-top: 0.5rem;
        position: relative;
        border: solid 0.04rem #b1894d;
        .lyListInfo {
          margin-left: 0.2rem;
          .lyListGift {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .lyListGiftIcon {
              margin-right: 0.3rem;
              border-radius: 50%;
              width: 0.64rem;
              height: 0.64rem;
            }
            .lyListGiftName {
              display: flex;
              font-size: 0.2rem;
              line-height: 0.62rem;
              color: #fff;
            }
          }
          .lyListMsg {
            font-size: 0.24rem;
            line-height: 0.32rem;
            color: #fff;
            margin: 0.2rem 0;
          }
          .lyListName {
            display: flex;
            color: #fff;
            font-size: 0.2rem;
          }
        }
      }
    }
  }
  .article {
    padding: 0 0.4rem;
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .block {
        background-color: #fff;
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
      }
    }

    .articleInfo {
      .articleList {
        width: 100%;
        border-radius: 0.1rem;
        background-color: #2b2b33;
        opacity: 0.8;
        margin-top: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box;
        img {
          width: 100%;
          margin-top: 0.25rem;
          height: 3.35rem;
        }
        .articleCont {
          // padding: 0.3rem 0.5rem;
          box-sizing: border-box;
          .articleTitle {
            font-size: 0.3rem;
            margin: 0.2rem 0;
            letter-spacing: 0.01rem;
            color: #fff;
          }
          .articleMsg {
            text-align: justify;
            font-size: 0.24rem;
            line-height: 0.32rem;
            color: #fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
        }
      }
    }
  }
  .video {
    padding: 0 0.4rem;
    padding-bottom: 0.5rem;
    .videoInfo {
      background-color: #2b2b33;
      opacity: 0.7;
      padding: 0.2rem;
      box-sizing: border-box;
      .videoList {
        text-align: center;
        position: relative;
        margin-top: 0.5rem;
        video {
          width: 100%;
          height: 4rem;
        }
        .videoCont {
          color: #ffffff;
          position: absolute;
          left: 50%;
          top: 38%;
          transform: translate(-0.47rem, -0.47rem);
        }
        .videoTitle {
          font-size: 0.3rem;
          line-height: 0.3rem;
          margin-top: 0.5rem;
          color: #927255;
        }
        .videoTime {
          font-size: 0.22rem;
          line-height: 0.7rem;
          color: #927255;
        }
      }
    }
  }
}
</style>
