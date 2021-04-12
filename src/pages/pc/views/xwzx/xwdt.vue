<template>
  <div class="zwzx">
    <div class="banner"></div>
    <xwzxHead name="新闻动态"></xwzxHead>
    <div class="cont">
<<<<<<< HEAD
=======
      <xwzxTitle title="新闻动态"></xwzxTitle>
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
            @click="$router.push('/xwzx/newsInfo?id=' + item.id)"
            class="item"
          >
            <div class="newsImg">
              <img :src="baseUrl + item.cover" :onerror="defImg" />
            </div>
            <div class="intro">
              <div class="introTitle">{{ item.title }}</div>
              <div class="introCont" v-html="item.intro"></div>
              <div class="dtime">
                发布时间：{{ parseTime(item.publishTime, "{y}-{m}-{d}") }}
              </div>
            </div>
          </div>
        </div>
      </a-spin>
<<<<<<< HEAD
      <!-- <paging ref="paging" @setPage="setPage"></paging> -->
      <a-pagination size="small" :total="model.total" @change="onChange" />
=======
      <paging ref="paging" @setPage="setPage"></paging>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
        current: 1,
        pageSize: 8,
        articleType: "1", //新闻类型
        columnId: "443278534481465344", //栏目id
        total: 0,
=======
        current: "1",
        pageSize: "8",
        articleType: "1", //新闻类型
        columnId: "443278534481465344", //栏目id
        total: "0",
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
          this.model.total = Number(this.model.total);
          // setTimeout(() => {
          //   this.$refs.paging.setPageInfo(this.model);
          // }, 200);
        }
      });
    },
    //分页
    onChange(page) {
      this.model.current = page;
      this._newsList();
    },
=======
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
    /deep/ .ant-pagination-item-active {
      border: none;
    }
    /deep/ .ant-pagination-item-active a {
      color: #0b9b0b;
    }
    /deep/ .ant-pagination-item a:hover {
      color: #0b9b0b;
    }
    /deep/ .ant-pagination-item-link-icon:hover {
      color: #0b9b0b;
    }
    /deep/ .anticon:hover {
      color: #0b9b0b;
    }
=======

>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .list {
      margin-bottom: 50px;

      .item {
        display: flex;
        margin-top: 60px;
        cursor: pointer;

        .newsImg {
          width: 280px;
          height: 195px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .intro {
          padding-left: 60px;
          flex: 1;
          margin-top: 20px;
          position: relative;

          .introTitle {
            font-family: MicrosoftYaHei;
            font-size: 28px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #004930;
            line-height: 30px;
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

          .dtime {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #666666;
            position: absolute;
            bottom: 0px;
          }
        }
      }
    }
  }
}
</style>
