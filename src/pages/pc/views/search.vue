<template>
  <div class="main">
    <div class="tabCheck">
      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="book" />
            新闻
          </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <!-- <a-empty v-if="model.list.length === 0" /> -->
                <div class="item">
                  <div class="newsImg">
                    <img
                      src="https://www.027smf.com/profile/2021-04/202104051347203285198.jpeg"
                      :onerror="defImg"
                    />
                  </div>
                  <div class="intro">
                    <div class="introTitle">
                      清明追思，缅怀先烈：多家单位来石门峰纪念公园开展“学党史、祭英烈”活动
                    </div>
                    <div class="introCont">
                      清慎终追远
                      缅怀先烈明风雨苍黄百年路高歌奋进新征程今年是中国共产党成立100周年在党的百年华诞之际武汉市各大单位于清明
                      期间在石门峰纪念公园以多种形式举行“学党史、祭英烈”等主题活动学习党史教育传承红色基因缅怀先烈，致敬英雄每一
                      次对英烈的缅怀都是一次庄严的洗礼在向革命先烈致敬的同时我们更要牢记使命知史爱党、知史爱国不忘初心砥砺前行
                    </div>
                    <div class="dtime">发布时间： 2021-04-05</div>
                  </div>
                </div>
              </div>
            </a-spin>
            <paging ref="paging" @setPage="setPage"></paging>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab"> <a-icon type="shop" />商品 </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <!-- <a-empty v-if="model.list.length === 0" /> -->
                <div class="item">
                  <div class="newsImg">
                    <img
                      src="https://www.027smf.com/profile/2020-08/202008111558199204989.png"
                      :onerror="defImg"
                    />
                  </div>
                  <div class="intro">
                    <div class="introTitle">一生一世念</div>
                    <div class="introCont">花 材：99朵玫瑰，精致礼盒。</div>
                    <div class="dtime">价格：¥ 1,314.00</div>
                  </div>
                </div>
              </div>
            </a-spin>
            <paging ref="paging" @setPage="setPage"></paging>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="solution" />
            个人主页
          </span>
          <div class="cont">
            <a-spin size="large" tip="加载中..." :spinning="loading">
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 30px; color: #004930"
                spin
              />
              <div class="list">
                <!-- <a-empty v-if="model.list.length === 0" /> -->
                <div class="item">
                  <div class="newsImg">
                    <img
                      src="https://www.027smf.com/profile/2020-12/202012140930476168091.jpg"
                      :onerror="defImg"
                    />
                  </div>
                  <div class="intro">
                    <div class="introTitle">姚贝娜</div>
                    <div class="introCont">
                      她会变成天上那颗最耀眼的星星，照亮我们每个人的梦，飞过苍穹，穿越永恒。
                      永远都不要忘了她，因为她是真正的天使。天堂会收下你的美，会让你在那里生活的更加幸福快睡吧，
                      睡吧。总有一天，你会醒来......
                    </div>
                    <div class="dtime">纪念次数： 124次</div>
                  </div>
                </div>
              </div>
            </a-spin>
            <paging ref="paging" @setPage="setPage"></paging>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {
        current: 0,
        pageSize: 11,
        searchText: "",
        status: "0",
        columnId: "",
        list: [],
        notId: [],
        total: "",
      },
    };
  },
  watch: {
    "$store.state.account.searchKey": function () {
      this.model.searchText = this.$store.state.account.searchKey;
      this.search();
    },
  },
  mounted() {
    if (this.$store.state.account.searchKey) {
      this.model.searchText = this.$store.state.account.searchKey;
    }
  },
  methods: {
    search() {},
    setPage(pageNum) {
      this.model.current = pageNum;
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  width: 1200px;
  margin: auto;
  .tabCheck {
    margin: 30px 0;
    /deep/ .ant-tabs-nav .ant-tabs-tab-active {
      color: #004930;
      font-weight: 500;
    }
    /deep/.ant-tabs-nav .ant-tabs-tab:hover {
      color: #004930;
    }
    /deep/.ant-tabs-ink-bar {
      background-color: #004930;
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
}
</style>
