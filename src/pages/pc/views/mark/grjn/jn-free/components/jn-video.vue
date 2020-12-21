<template>
  <div class="video">
    <div class="title">
      <p>纪念视频</p>
      <div class="line"></div>
    </div>
    <div>
      <div class="videoInfo">
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
    </div>
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
    line-height: 30px;
    color: #00744c;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;

    .line {
      margin: 0 auto;
      width: 160px;
      height: 8px;
      background-color: #00744c;
      border-radius: 4px;
    }
  }

  .videoInfo {
    .videoItem {
      display: flex;
      flex-wrap: wrap;
      .videoList {
        width: 380px;
        height: 300px;
        position: relative;
        margin-right: 30px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        &:nth-child(3n) {
          margin-right: 0;
        }
        video {
          width: 100%;
          height: 100%;
        }

        .videoCont {
          position: absolute;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;

          .videoTitle {
            font-size: 24px;
            line-height: 20px;
            color: #ffffff;
            margin-top: 65px;
          }

          .videoTime {
            font-size: 14px;
            line-height: 20px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
