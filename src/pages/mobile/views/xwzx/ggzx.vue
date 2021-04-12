<template>
  <div class="ggzx">
    <xwzxHead name="公告中心"></xwzxHead>
    <div class="banner"></div>
    <div class="cont">
      <xwzxTitle title="公告中心"></xwzxTitle>
      <van-empty v-if="model.list.length === 0" description="暂无数据" />
      <van-list
        v-else
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list">
          <div
            class="item"
            v-for="item in model.list"
            :key="item.id"
            @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
          >
            <div class="newsImg">
              <img :src="baseUrl + item.cover" alt="" />
            </div>
            <div class="desc">
              <div class="newsDtime">
                <div class="day">{{ parseTime(item.publishTime, "{d}") }}</div>
                <div class="dtime">
                  {{ parseTime(item.publishTime, "{y}-{m}") }}
                </div>
              </div>
              <div class="intro">
                <div class="introTitle">{{ item.title }}</div>
                <div class="introCont">{{ item.intro }}</div>
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
import { newsList } from "@/pages/mobile/api/news";
import * as utils from "@/pages/mobile/libs/utils";
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
        columnId: "443278580128075776", //栏目id
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
          .newsDtime {
            display: flex;

            .day {
              font-size: 0.48rem;
              color: #666666;
            }

            .dtime {
              margin-top: 0.25rem;
              margin-left: 0.1rem;
<<<<<<< HEAD
              font-size: 0.25rem;
=======
              font-size: 0.22rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              color: #666666;
            }
          }

          .intro {
            margin-top: 0.15rem;

            .introTitle {
              width: 3.16rem;
              color: #004930;
<<<<<<< HEAD
              font-weight: bold;
              font-size: 0.3rem;
=======
              font-size: 0.28rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              margin-bottom: 0.1rem;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              display: -webkit-box;
            }

            .introCont {
              width: 3.61rem;
              font-family: MicrosoftYaHei;
<<<<<<< HEAD
              font-size: 0.2rem;
=======
              font-size: 0.22rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              line-height: 0.32rem;
              letter-spacing: 0px;
              color: #666666;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
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
