<template>
  <div class="fwjl">
    <van-empty v-if="model.list.length === 0" description="暂无数据" />
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="fwjlList">
        <div class="item" v-for="item in model.list" :key="item.id">
          <div class="top">
            <div class="date">
              <p>{{ item.createDate }}</p>
              <p class="msg" v-if="item.isVisit != 0">【已回访】</p>
            </div>
            <p>落葬人：{{ item.bpname }}</p>
            <p>墓址：{{ item.cemeaddress }}</p>
            <p>联系人：{{ item.contacts }}</p>
            <p>联系电话：{{ item.mobile }}</p>
            <p>
              <span style="display: table"> 问题：</span
              ><van-tag
                v-for="(tag, index) in item.tags"
                :key="index"
                size="large"
                >{{ tag }}</van-tag
              >
            </p>
            <div class="img">
              <img
                v-for="(img, index) in item.imgs"
                :key="index"
                :src="baseUrl + img"
                @click="showImg(item.imgs, index)"
                :onerror="defImg"
                alt=""
              />
            </div>
          </div>
          <div v-if="item.isVisit != 0">
            <div class="line"></div>
            <div class="bottom">
              <div>回访内容：{{ item.visitCont }}</div>
              <div class="img">
                <img
                  v-for="(visitImg, index) in item.visitImgs"
                  :key="index"
                  :src="baseUrl + visitImg"
                  :onerror="defImg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { myRepairsList } from "@/pages/mobile/api/gjfw";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      headers: {
        token: this.$store.state.account.token,
      },
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      model: {
        current: "1",
        pageSize: "3",
        searchText: "",
        list: [],
      },
    };
  },
  mounted() {
    this._myRepairsList();
  },

  methods: {
    onLoad() {
      this._myRepairsList();
    },
    showImg(img, index) {
      let imgList = img.map((i) => {
        return this.baseUrl + i;
      });
      ImagePreview(imgList, index);
    },
    _myRepairsList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      var vm = this;
      vm.loading = true;
      myRepairsList(this.model).then((res) => {
        console.log(res);
        vm.$toast.clear();
        vm.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          vm.model.list.push(...results);
          if (res.data.hasNextPage) {
            vm.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.fwjl {
  .fwjlList {
    padding: 2% 4%;
    .item {
      display: flex;
      justify-content: space-between;
      border-radius: 0.1rem;
      border: solid 2px #dcdcdc;
      flex-direction: column;
      padding: 4%;
      box-sizing: border-box;
      margin-top: 0.3rem;
      font-size: 0.3rem;
      .top {
        /deep/ .van-tag--default {
          background-color: #004930;
          margin-right: 0.3rem;
          margin-top: 0.1rem;
          color: #fff;
        }
        .date {
          display: flex;
          justify-content: space-between;
          .msg {
            color: #004930;
          }
        }
        p {
          margin-top: 0.1rem;
        }
      }
      .line {
        width: 100%;
        height: 1px;
        background: #333;
        margin: 0.2rem auto;
      }
    }
  }

  .img {
    display: flex;
    flex-wrap: wrap;
    img {
      width: 70px;
      height: 70px;
      margin-right: 0.1rem;
      margin-top: 0.1rem;
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
