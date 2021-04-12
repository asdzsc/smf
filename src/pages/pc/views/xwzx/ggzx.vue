<template>
  <div class="zwzx">
    <div class="banner"></div>
    <xwzxHead name="公告中心"></xwzxHead>
    <div class="cont">
<<<<<<< HEAD
=======
      <xwzxTitle title="公告中心"></xwzxTitle>

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
        <div class="list">
          <a-empty v-if="model.list.length === 0" />
          <div
            v-for="item in model.list"
            :key="item.id"
            class="item"
            @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
          >
            <div class="newsImg">
              <img :src="baseUrl + item.cover" :onerror="defImg" />
            </div>
            <div class="newsDtime">
              <div class="day">{{ parseTime(item.publishTime, "{d}") }}</div>
              <div class="dtime">
                {{ parseTime(item.publishTime, "{y}-{m}") }}
              </div>
            </div>
            <div class="intro">
              <div class="introTitle">{{ item.title }}</div>
              <div class="introCont" v-html="item.intro"></div>
            </div>
          </div>
        </div>
      </a-spin>
      <paging ref="paging" @setPage="setPage"></paging>
    </div>
    <myserve></myserve>
  </div>
</template>

<script>
import { newsList } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    xwzxHead: () => import("@/pages/pc/views/xwzx/components/xwzx-head.vue"),
<<<<<<< HEAD
    // xwzxTitle: () => import("@/pages/pc/views/xwzx/components/xwzx-title.vue"),
=======
    xwzxTitle: () => import("@/pages/pc/views/xwzx/components/xwzx-title.vue"),
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
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
    _newsList() {
      this.loading = true;
      newsList(this.model).then((res) => {
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
      this._newsList();
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-spin-text {
  color: #004930;
}

.zwzx {
  .banner {
    background: url("/img/banner15.png") no-repeat center center;
    background-size: cover;
    height: 500px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;

    .list {
      margin-bottom: 50px;

      .item {
        display: flex;
        margin-top: 60px;
        cursor: pointer;

        .newsImg {
          width: 240px;
          height: 140px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .newsDtime {
          width: 130px;
          height: 106px;
          margin-top: 17px;
          border-right: 2px solid #e4e4e4;
          text-align: right;
          padding-right: 20px;

          .day {
            font-size: 60px;
            font-weight: normal;
            color: #666666;
            line-height: 60px;
          }

          .dtime {
            margin-top: 20px;
            font-size: 24px;
            font-weight: normal;
            color: #666666;
            line-height: 24px;
          }
        }

        .intro {
          padding-left: 15px;
          flex: 1;
          margin-top: 17px;

          .introTitle {
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            color: #004930;
            line-height: 26px;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            display: -webkit-box;
          }

          .introCont {
            margin-top: 25px;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            color: #666666;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            display: -webkit-box;
          }
        }
      }
    }
  }
}
</style>
