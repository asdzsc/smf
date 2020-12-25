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
              <img :src="baseUrl + item.cover" alt="" />
            </div>
            <div class="desc">
              <div class="intro">
                <div class="introTitle">{{ item.title }}</div>
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
import { newsList } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
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
      this.loading = true;
      newsList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            setTimeout(() => {
              this.model.current = ++this.model.current;
            }, 500);
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
            font-size: 0.22rem;
            color: #666666;
          }
          .intro {
            .introTitle {
              width: 3.37rem;
              font-weight: bold;
              font-size: 0.28rem;
              color: #004930;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
            }
            .introCont {
              width: 3.61rem;
              font-size: 0.22rem;
              line-height: 0.32rem;
              color: #666666;
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
