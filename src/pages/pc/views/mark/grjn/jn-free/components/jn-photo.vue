<template>
  <div class="photos">
    <div class="title">
      <p>纪念相册</p>
      <div class="line"></div>
    </div>
<<<<<<< HEAD
    <a-spin size="large" tip="加载中..." :spinning="loading">
      <a-icon
        slot="indicator"
        type="loading"
        style="font-size: 30px; color: #004930;"
        spin
      />
      <div class="photosInfo" v-if="this.model.list != ''">
        <viewer class="viewer" :images="this.model.list">
          <img
            v-for="item in this.model.list"
            :key="item.id"
            :src="baseUrl + item.url"
            :onerror="defImg"
            alt=""
          />
        </viewer>
        <photoPaging ref="paging" class="page" @setPage="setPage"></photoPaging>
      </div>
      <div v-else><a-empty /></div>
    </a-spin>
=======
    <div class="photosInfo" v-if="this.model.list != ''">
      <div class="img" v-for="item in this.model.list" :key="item.id">
        <viewer class="viewer">
          <img :src="baseUrl + item.url" :onerror="defImg" alt="" />
        </viewer>
      </div>
      <photoPaging ref="paging" class="page" @setPage="setPage"></photoPaging>
    </div>
    <div v-else><a-empty /></div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  </div>
</template>

<script>
import { memoryMediaList } from "@/pages/pc/api/mark.js";
import $ from "jquery";
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
    photoPaging: () =>
      import("@/pages/pc/views/mark/components/photoPaging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
<<<<<<< HEAD
      loading: false,
=======
      paginghide: true,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      model: {
        isPage: true,
        current: 1,
        pageSize: 6,
        searchText: "",
        mediaType: "image",
        list: [],
<<<<<<< HEAD
        memoryId: this.bannerModel.id,
=======
        memoryId: this.$route.params.id,
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
=======
        console.log(res);
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          if (this.model.list.length <= 3) {
            $(".page").css("top", "0");
          } else {
            $(".page").css("top", "-295px");
          }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
.photos {
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

  .photosInfo {
<<<<<<< HEAD
    .viewer {
      height: 520px;
      position: relative;
      img {
        display: inline-block;
        width: 340px;
        height: 240px;
        margin-top: 20px;
        margin-right: 20px;
        &:nth-child(3) {
          width: 460px;
          height: 240px;
          margin-right: 0;
        }
        &:nth-child(4) {
          width: 460px;
          height: 240px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
=======
    height: 520px;
    .img {
      display: inline-block;
      width: 340px;
      height: 240px;
      margin-top: 20px;
      margin-right: 20px;
      .viewer {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(3) {
        width: 460px;
        height: 240px;
        margin-right: 0;
      }
      &:nth-child(4) {
        width: 460px;
        height: 240px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    // 顶部图片
    // /deep/ .ant-carousel {
    //   .slick-prev::before {
    //     display: none;
    //   }

    //   .slick-next::before {
    //     display: none;
    //   }

    //   .left-circle {
    //     left: -50px;
    //     z-index: 1;
    //     color: #00744c;
    //     font-size: 40px;

    //     &:hover {
    //       opacity: 0.5;
    //     }
    //   }

    //   .right-circle {
    //     right: -30px;
    //     z-index: 1;
    //     color: #00744c;
    //     font-size: 40px;

    //     &:hover {
    //       opacity: 0.5;
    //     }
    //   }
    // }

    // .carsoule {
    //   .top {
    //     width: 100%;
    //     display: flex;
    //     margin-top: 20px;
    //     flex-wrap: nowrap;
    //     img {
    //       margin-right: 15px;
    //     }
    //   }
    //   .top,
    //   .bottom {
    //     display: flex;
    //     margin-top: 20px;

    //     .w340 {
    //       width: 340px;
    //       height: 240px;
    //       margin-right: 30px;

    //       &:last-child {
    //         margin-right: 0;
    //       }

    //       img {
    //         width: 100%;
    //         height: 100%;
    //       }
    //     }

    //     .w460 {
    //       margin-right: 30px;

    //       &:last-child {
    //         margin-right: 0;
    //       }

    //       width: 460px;
    //       height: 240px;

    //       img {
    //         width: 100%;
    //         height: 100%;
    //       }
    //     }
    //   }
    // }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  }
}
</style>
