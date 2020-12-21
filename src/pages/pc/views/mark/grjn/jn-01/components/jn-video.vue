<template>
  <div class="video">
    <div class="title">
      <p>纪</p>
      <p>念</p>
      <p>视</p>
      <p>频</p>
    </div>
    <div class="videoInfo" v-if="this.model.list.length != 0">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930;"
          spin
        />
        <div class="videoItem">
          <div class="videoList" v-for="item in model.list" :key="item.id">
            <video
              :src="baseUrl + item.url"
              :poster="baseUrl + item.cover"
              controls
            ></video>
            <div class="videoCont">
              <img src="/img/pc/1_video.png" alt="" />
              <p class="videoTitle">{{ item.title }}</p>
              <p class="videoTime">{{ item.createDate }}</p>
            </div>
          </div>
        </div>
      </a-spin>
      <paging v-if="paginghide" ref="paging" @setPage="setPage"></paging>
    </div>
    <div><a-empty /></div>
  </div>
</template>
<script>
import { memoryMediaList } from "@/pages/pc/api/mark.js";
export default {
  components: {
    paging: () => import("@/pages/pc/views/mark/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      paginghide: true,
      model: {
        isPage: true,
        current: 1,
        list: [],
        pageSize: 3,
        searchText: "",
        memoryId: this.$route.params.id,
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
    color: #333333;
    text-align: center;
    margin: 50px 0;
    margin-top: 100px;
    display: flex;
    justify-content: center;

    p {
      width: 71px;
      height: 71px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: solid 6px #872121;
      margin-right: 2px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .videoInfo {
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
