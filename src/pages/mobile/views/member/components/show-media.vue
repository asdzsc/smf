<template>
  <div class="wrap">
    <h1 style="color:#00744c;">{{ title }}</h1>
    <div class="btnWrap">
      <div class="btn" v-show="isBtn">
        <van-button
          @click="add"
          icon="plus"
          size="small"
          style="background:#004930;"
          type="primary"
          >新增</van-button
        >
        <van-button size="small" icon="delete-o" type="danger"
          >批量删除</van-button
        >
        <van-button
          @click="openSearch"
          icon="search"
          size="small"
          style="background:#004930;"
          type="primary"
          >搜索</van-button
        >
      </div>
      <transition name="right-slide">
        <van-row>
          <van-col span="24">
            <van-search
              v-show="isSearch"
              v-model="model.searchText"
              ref="searchInput"
              placeholder="关键字搜索"
              show-action
              @search="search()"
              @cancel="closeSearch()"
            />
          </van-col>
        </van-row>
      </transition>
    </div>

    <div class="cont">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="model.list.length > 0">
          <div class="allCheck">
            <van-checkbox
              v-model="checkAll"
              @change="changeCheckAll"
              icon-size=".31rem"
              checked-color="#004930"
              ><span style="padding:0 0.5rem;">全选</span></van-checkbox
            >
            <p>标题</p>
            <p>创建日期</p>
            <p>操作</p>
          </div>
          <div class="item" v-for="(item, index) in model.list" :key="item.id">
            <div class="check">
              <van-checkbox
                v-model="item.check"
                icon-size=".31rem"
                checked-color="#004930"
              ></van-checkbox>
            </div>
            <img
              @click="showImg(index)"
              :src="baseUrl + item.url"
              :onerror="defImg"
              alt=""
            />
          </div>
        </template>
        <template v-if="model.list.length === 0 && !loading">
          <div>
            <van-empty description="暂无数据" />
          </div>
        </template>
      </van-list>
    </div>
    <!-- 添加图片 -->
    <van-popup
      v-model="showMediaAddImage"
      position="top"
      :style="{ height: '80%' }"
    >
      <mediaAddImage
        v-if="showMediaAddImage"
        :id="infoId"
        :memoryId="memoryId"
        ref="mediaAddImage"
        @onClose="closeMediaAddImage"
      ></mediaAddImage>
    </van-popup>
  </div>
</template>

<script>
import { memoryMediaList, delMemoryMedia } from "@/pages/mobile/api/mark.js";
import { ImagePreview } from "vant";
export default {
  components: {
    mediaAddImage: () =>
      import("@/pages/mobile/views/member/components/show-media-addImage.vue"),
    // mediaAddVideo: () =>
    //   import("@/pages/pc/views/member/components/show-media-addVideo.vue"),
  },
  props: {
    memoryId: {
      type: String,
      default() {
        return "";
      },
    },
    mediaType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      isBtn: true,
      isSearch: false,
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      checkAll: false,
      selectedRowKeys: [],
      showMediaAddImage: false,
      model: {
        memoryId: "", //纪念馆id
        searchText: "",
        mediaType: "", //附件类型
        isPage: true, //是否分页
        list: [],
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => {
          return `共 ${total} 条`;
        },
      },
      loading: false,
      finished: false,
      loading: false,
      showImgModal: false,
      infoId: "",
      showMediaAddImage: false,
      showMediaAddVideo: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onLoad() {
      this._memoryMediaList();
    },
    loadData() {
      this.model.memoryId = this.memoryId;
      this.model.mediaType = this.mediaType;
      this.title = this.mediaType === "image" ? "纪念相册" : "纪念视频";
      this._memoryMediaList();
    },
    //全选
    changeCheckAll() {
      this.model.list.forEach((v) => {
        v.check = this.checkAll;
      });
    },
    _memoryMediaList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      memoryMediaList(this.model).then((res) => {
        this.$toast.clear();
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
    },
    // 搜索
    openSearch() {
      this.isBtn = false;
      this.isSearch = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    search() {
      if (this.model.searchText) {
      }
    },
    closeSearch() {
      this.isSearch = false;
      this.model.searchText = "";
      this.isBtn = true;
    },
    // 预览图片
    showImg(index) {
      let imgList = this.model.list.map((i) => {
        return this.baseUrl + (i.url ? i.url : i.cover);
      });
      ImagePreview(imgList, index);
    },
    // 添加相册
    add() {
      this.infoId = "";
      if (this.mediaType === "image") {
        this.showMediaAddImage = true;
      }
      if (this.mediaType === "video") {
        this.showMediaAddVideo = true;
      }
    },
    //添加相册关闭
    closeMediaAddImage(res) {
      try {
        if (res.code === 0) {
          this.onSearch();
        }
      } catch (e) {}
      this.$nextTick(() => {
        this.showMediaAddImage = false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrap {
  padding: 0.4rem;
  box-sizing: border-box;
  background: #e1e9e0;

  .btnWrap {
    margin: 0.4rem 0;
    .van-search {
      padding: 0px;
    }
    .right-slide-enter,
    .right-slide-leave-active {
      transform: translateX(100%);
      opacity: 0;
    }

    .right-slide-leave-active,
    .right-slide-enter-active {
      transition: all 0.3s;
      opacity: 1;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .cont {
    .allCheck {
      padding-top: 0.2rem;
      display: flex;
      align-items: center;
      p {
        text-align: center;
        min-width: 1.5rem;
      }

      .none {
        display: none;
      }
    }
    .item {
      display: flex;
      height: 2rem;
      align-items: center;
      .check {
        // flex: 1;
        display: flex;
        align-items: center;
        margin-right: 0.2rem;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
}
</style>
