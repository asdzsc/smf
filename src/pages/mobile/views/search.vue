<template>
  <div class="main">
    <van-tabs v-model="active">
      <van-tab
        ><template #title> <van-icon name="newspaper-o" />新闻 </template>
        <div class="cont">
          <!-- <van-empty v-if="model.list.length === 0" description="暂无数据" /> -->
          <van-list>
            <div class="list">
              <div class="item">
                <div class="newsImg">
                  <img
                    src="https://www.027smf.com/profile/2021-04/202104051347203285198.jpeg"
                    :onerror="defImg"
                    alt=""
                  />
                </div>
                <div class="desc">
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
                  </div>
                  <div class="dtime">发布时间：2021-04-05</div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab
        ><template #title> <van-icon name="shop-collect-o" />商品 </template>
        <div class="cont">
          <!-- <van-empty v-if="model.list.length === 0" description="暂无数据" /> -->
          <van-list>
            <div class="list">
              <div class="item">
                <div class="newsImg">
                  <img
                    src="https://www.027smf.com/profile/2020-08/202008111558199204989.png"
                    :onerror="defImg"
                    alt=""
                  />
                </div>
                <div class="desc">
                  <div class="intro">
                    <div class="introTitle">一生一世念</div>
                    <div class="introCont">花 材：99朵玫瑰，精致礼盒。</div>
                  </div>
                  <div class="dtime">价格：¥ 1,314.00</div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab
        ><template #title><van-icon name="description" />个人主页 </template>
        <div class="cont">
          <!-- <van-empty v-if="model.list.length === 0" description="暂无数据" /> -->
          <van-list>
            <div class="list">
              <div class="item">
                <div class="newsImg">
                  <img
                    src="https://www.027smf.com/profile/2020-12/202012140930476168091.jpg"
                    :onerror="defImg"
                    alt=""
                  />
                </div>
                <div class="desc">
                  <div class="intro">
                    <div class="introTitle">姚贝娜</div>
                    <div class="introCont">
                      她会变成天上那颗最耀眼的星星，照亮我们每个人的梦，飞过苍穹，穿越永恒。
                      永远都不要忘了她，因为她是真正的天使。天堂会收下你的美，会让你在那里生活的更加幸福快睡吧，
                      睡吧。总有一天，你会醒来......
                    </div>
                  </div>
                  <div class="dtime">纪念次数： 124次</div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      active: 1,
      loading: false,
      finished: false,
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
  mounted() {
    this._newsList();
  },
  methods: {
    onLoad() {
      this._newsList();
    },
    _newsList() {},
  },
};
</script>
<style lang="less" scoped>
.main {
  /deep/.van-icon {
    vertical-align: middle;
  }
  /deep/.van-tabs__line {
    background-color: #004930;
  }
  .cont {
    margin-top: 0.2rem;
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
            font-size: 0.25rem;
            color: #666666;
          }
          .intro {
            .introTitle {
              width: 3.37rem;
              font-weight: bold;
              font-size: 0.3rem;
              color: #004930;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
            }

            .introCont {
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