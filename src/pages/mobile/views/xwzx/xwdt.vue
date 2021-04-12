<template>
  <div class="ggzx">
    <xwzxHead name="新闻动态"></xwzxHead>
    <div class="banner"></div>
    <div class="cont">
      <xwzxTitle title="新闻动态"></xwzxTitle>
      <van-empty v-if="model.list.length === 0" description="暂无数据" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list">
          <div
            class="item"
            v-for="(item, id) in model.list"
            :key="id"
            @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
          >
            <div class="newsImg">
<<<<<<< HEAD
              <img :src="baseUrl + item.cover" :onerror="defImg" alt="" />
=======
              <img :src="baseUrl + item.cover" alt="" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            </div>
            <div class="desc">
              <div class="intro">
                <div class="introTitle">{{ item.title }}</div>
<<<<<<< HEAD
                <div class="introCont">
                  {{ item.intro }}
                </div>
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              </div>
              <div class="dtime">
                发布时间：{{ parseTime(item.publishTime, "{y}-{m}-{d}") }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import xwzxHead from "./components/xwzx-head.vue";
import xwzxTitle from "./components/xwzx-title.vue";
<<<<<<< HEAD
import { newsList } from "@/pages/mobile/api/news";
import * as utils from "@/pages/mobile/libs/utils";
=======
import { newsList } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
export default {
  components: {
    xwzxHead,
    xwzxTitle,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      finished: false,
      model: {
        current: "1",
        pageSize: "8",
        articleType: "1", //新闻类型
        columnId: "443278534481465344", //栏目id
        total: "0",
        list: [],
      },
    };
  },
  mounted() {
    this._newsList();
  },
  methods: {
    onLoad() {
      this._newsList();
    },
    _newsList() {
<<<<<<< HEAD
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      newsList(this.model).then((res) => {
        this.loading = false;
        this.$toast.clear();
=======
      this.loading = true;
      newsList(this.model).then((res) => {
        this.loading = false;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
<<<<<<< HEAD
            this.model.current++;
=======
            setTimeout(() => {
              this.model.current = ++this.model.current;
            }, 500);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          } else {
            this.finished = true;
          }
        }
      });
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
.ggzx {
  .banner {
    background: url("/img/mobile/ggzx1.png") no-repeat center center;
    background-size: cover;
    height: 5rem;
    text-align: center;
    position: relative;
  }
  .cont {
    .list {
      .showLoading {
        position: absolute;
        left: 50%;
        top: 70%;
      }
      .item {
        display: flex;
        margin-bottom: 0.6rem;
        .newsImg {
          margin-left: 0.4rem;
          width: 2.83rem;
          height: 1.84rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          padding-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .dtime {
<<<<<<< HEAD
            font-size: 0.25rem;
=======
            font-size: 0.22rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            color: #666666;
          }
          .intro {
            .introTitle {
              width: 3.37rem;
              font-weight: bold;
<<<<<<< HEAD
              font-size: 0.3rem;
=======
              font-size: 0.28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              color: #004930;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
            }
            .introCont {
<<<<<<< HEAD
              margin-top: 0.1rem;
              width: 3.61rem;
              font-size: 0.2rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.32rem;
              color: #666666;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
=======
              width: 3.61rem;
              font-size: 0.22rem;
              line-height: 0.32rem;
              color: #666666;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            }
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
