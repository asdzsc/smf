<template>
  <div class="video">
    <div class="title">
      <img src="/img/pc/02_star.png" alt="" />
      <p>纪念视频</p>
      <img src="/img/pc/02_star.png" alt="" />
    </div>
    <div class="videoInfo" v-if="this.model.list != ''">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
<<<<<<< HEAD
          style="font-size: 30px; color: #004930"
=======
          style="font-size: 30px; color: #004930;"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          spin
        />
        <div class="videoItem">
          <div class="videoList" v-for="item in model.list" :key="item.id">
            <div class="videoPlay">
<<<<<<< HEAD
              <!-- <img class="video_icon" src="/img/pc/1_video.png" alt="" /> -->
              <video
                :src="baseUrl + item.url"
                :poster="item.cover != '' ? baseUrl + item.cover : ''"
=======
              <img class="video_icon" src="/img/pc/1_video.png" alt="" />
              <video
                :src="baseUrl + item.url"
                :poster="baseUrl + item.cover"
                :onerror="defImg"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
                controls
              ></video>
            </div>
            <div class="videoCont">
              <p class="videoTitle">{{ item.title }}</p>
              <p class="videoTime">{{ item.createDate }}</p>
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
import { memoryMediaList } from "@/pages/pc/api/mark.js";
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

      model: {
        isPage: true,
        current: 1,
        list: [],
        pageSize: 3,
        searchText: "",
<<<<<<< HEAD
        memoryId: this.bannerModel.id,
=======
        memoryId: this.$route.params.id,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        mediaType: "video",
      },
    };
  },
  mounted() {
    this._memoryMediaList();
  },
  methods: {
    _memoryMediaList() {
      this.loading = true;
      memoryMediaList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._memoryMediaList();
    },
  },
};
</script>

<style lang="less" scoped>
.video {
  width: 1200px;
  margin: 30px auto;

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

  .videoInfo {
    .paginghide {
      display: none;
    }
    .videoItem {
      display: flex;
      flex-wrap: wrap;

      .videoList {
        width: 380px;
        position: relative;
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        cursor: pointer;

        .videoPlay {
          width: 100%;
          position: relative;
          video {
            height: 230px;
            width: 100%;
          }
          .video_icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        &:last-child {
          margin-right: 0;
        }

        .videoCont {
          line-height: 28px;
          color: #927255;
          text-align: center;
          margin-top: 20px;

          .videoTitle {
            font-size: 20px;
          }

          .videoTime {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
