<template>
  <div class="goodsComment">
    <div class="assessUser">用户评价</div>
    <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list" v-if="model.list.length > 0">
        <div class="assess" v-for="item in model.list" :key="item.id">
          <div class="percent">
            <p>好评度：{{ item.score * 20 + "%" }}</p>
            <van-rate
              v-model="item.score"
              readonly
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <ul>
            <li>
              <div class="userDesc">
                <van-image
                  round
                  width=".6rem"
                  height=".6rem"
                  :src="getAvatar(item.avatar)"
                />
                <div class="userIntro">
                  <p class="name">用户名:{{ item.name }}</p>
                  <p class="date">
                    <span class="commentDtime">{{
                      parseTime(item.create_date)
                    }}</span>
                  </p>
                </div>
              </div>
              <p class="desc">{{ item.goods_cont }}</p>
              <div class="assessDesc">
                <div
                  class="assessDescImg"
                  v-for="(imgItem, index) in item.imgList"
                  :key="index"
                  @click="showGoodsImgModal(index)"
                >
                  <img :src="baseUrl + imgItem" alt="" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else><van-empty description="暂无数据" /></div>
    </van-list>
    <!-- 用户评价 end -->
  </div>
</template>

<script>
import { orderCommentList } from "@/pages/mobile/api/shop";
import { ImagePreview } from "vant";
import * as utils from "@/pages/mobile/libs/utils";
export default {
  props: {
    goodsId: {
      type: String,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/usernull.png'`,
      showImgModal: false,
      loading: false,
      finished: false,
      imgCarouselList: [],
      model: {
        current: "1",
        pageSize: "10",
        goodsId: this.goodsId,
        commentType: "1",
        isUser: false,
        isPaging: true,
        isShow: "1",
        total: "0",
        imgs: [],
        list: [],
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onLoad() {
      this.loadData();
    },
    loadData() {
      var vm = this;
      this.loading = true;
      orderCommentList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(vm.model, res.data);
          vm.model.list.forEach((item) => {
            if (item.img) {
              var imgList = item.img.split(",");
              this.$set(item, "imgList", imgList);
            } else {
              this.$set(item, "imgList", []);
            }
            item.cont = item.cont.replace(/\n/g, "<br>");
            this.model.imgs = item.imgList;
          });
        }
      });
    },
    showGoodsImgModal(index) {
      let imgList = this.model.imgs.map((i) => {
        return this.baseUrl + i;
      });
      ImagePreview(imgList, index);
    },
    getAvatar(record) {
      if (record) {
        if (record.indexOf("http") >= 0) {
          return record;
        } else {
          return this.baseUrl + record;
        }
      } else {
        return "/img/usernull.png";
      }
    },
    parseTime(time) {
      return utils.parseTime(time, "{y}-{m}-{d}");
    },
  },
};
</script>

<style lang="less" scoped>
.goodsComment {
  margin: 0.2rem 0.14rem;
  background-color: #ffffff;
  padding: 0.2rem;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
  .assess {
    margin-top: 0.2rem;
    .percent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.3rem;

      p {
        color: #666666;
        font-size: 0.28rem;
      }
    }

    .userDesc {
      margin-top: 0.3rem;
      display: flex;

      .userIntro {
        display: flex;
        flex-direction: column;
        margin-left: 0.3rem;

        .name {
          color: #333333;
        }

        .date {
          color: #999999;
        }
      }
    }
    .desc {
      margin: 0.3rem 0 0.2rem 0;
    }
    .assessDesc {
      display: flex;
      flex-wrap: wrap;

      .assessDescImg {
        margin-top: 0.2rem;
        width: 45%;
        height: 2rem;
        margin-right: 5%;
        img {
          width: 100%;
          height: 2rem;
        }
        &:nth-child(2) {
          margin-right: 0;
        }
      }
    }

    .btn {
      margin: 0.3rem auto 0;
      text-align: center;
      color: #999999;
      font-size: 0.24rem;
    }
  }
}
</style>
