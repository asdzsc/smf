<template>
  <div class="photos">
    <div class="title">
      <p>纪念相册</p>
      <div class="line"></div>
    </div>
    <div class="photosInfo">
      <!-- :autoplay="true" -->
      <div class="img" v-for="item in this.model.list" :key="item.id">
        <img :src="baseUrl + item.url" alt="" />
      </div>
      <!--  
      <a-carousel arrows>
        <div class="carsoule" v-for="item in this.model.list" :key="item.id">
          <div class="top">
            <img :src="baseUrl + item.url" alt="" />
            <div class="w340"></div>
            <div class="w340">
              <img src="/img/pc/1_02.png" alt="" />
            </div>
            <div class="w460">
              <img src="/img/pc/1_03.png" alt="" />
            </div>
          </div>
          <div class="bottom">
            <div class="w460">
              <img src="/img/pc/1_04.png" alt="" />
            </div>
            <div class="w340">
              <img src="/img/pc/1_05.png" alt="" />
            </div>
            <div class="w340">
              <img src="/img/pc/1_06.png" alt="" />
            </div>
          </div>
        </div>
        <div slot="prevArrow" class="custom-slick-arrow left-circle">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow right-circle">
          <a-icon type="right-circle" />
        </div>
      </a-carousel>
        -->
      <photoPaging
        v-if="paginghide"
        ref="paging"
        @setPage="setPage"
      ></photoPaging>
    </div>
  </div>
</template>

<script>
import { memoryMediaList } from "@/pages/pc/api/mark.js";
export default {
  components: {
    photoPaging: () =>
      import("@/pages/pc/views/mark/components/photoPaging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      paginghide: true,
      model: {
        isPage: true,
        current: 1,
        pageSize: 6,
        searchText: "",
        mediaType: "image",
        list: [],
        memoryId: this.$route.params.id,
      },
    };
  },
  mounted() {
    // this.model = this.photoModel;
    // let filterList = this.model.list;
    // let loopList = filterList.filter((item) => {
    //   return item.mediaType === "image";
    // });
    // this.model.list = loopList;
    // console.log(loopList);
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
          // let filterList = this.model.list;
          // let loopList = filterList.filter((item) => {
          //   return item.mediaType == "image";
          // });
          // this.model.list = loopList;
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
    height: 520px;
    .img {
      display: inline-block;
      width: 340px;
      height: 240px;
      margin-top: 20px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
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
  }
}
</style>
