<template>
  <div>
    <div class="searchTop">
      <div class="searchTitle">
        纪念墙
      </div>
      <ul class="topList">
        <li
          v-for="item in topList"
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
          <!-- <van-image fit="cover" :src="baseUrl + item.photo" /> -->
          <div class="topBox">
            <div class="name">
              <p>{{ item.name }}</p>
              <p style="padding-left: .2rem;">{{ item.msgNum }}次纪念</p>
            </div>
            <div class="topBoxBtn">
              纪念Ta
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="searchBottom">
      <ul class="bottomList">
        <li
          v-for="item in bottomList"
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
          <div class="bottomBox">
            <div class="name">
              <p>{{ item.name }}</p>
              <p style="padding-left: .2rem;">{{ item.msgNum }}次纪念</p>
            </div>
            <div class="bottomBoxBtn">
              纪念Ta
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="bigMore" class="moreBtn" @click="handleMore()">
      查看更多
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      bigMore: true,
      allList: [],
      topList: [],
      bottomList: [],
    };
  },
  watch: {
    topList: function(nv, ov) {
      this.$parent.topList = nv;
    },
  },
  methods: {
    loadData(model) {
      if (model.current === 1) {
        this.topList = model.list.slice(0, 3);
        this.bottomList = model.list.splice(3, 11);
      } else {
        this.bottomList.push(...model.list);
      }
    },
    // 纪念按钮事件
    handleClick(id) {
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: id,
        },
      });
    },
    // 查看更多
    handleMore() {
      this.$emit("handleMore");
    },
    closeMore() {
      this.bigMore = false;
    },
    showMore() {
      this.bigMore = true;
    },
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  .searchTitle {
    font-size: 0.36rem;
    font-weight: bold;
    letter-spacing: 0.02rem;
    color: #00744c;
    margin: 0.5rem auto;
    text-align: center;
  }
  .topList {
    li {
      position: relative;
      margin-top: 0.5rem;
      height: 6rem;
      line-height: 6rem;
      overflow: hidden;
      img {
        width: 100%;
      }
      /deep/ .van-image {
        display: block;
      }
      .topBox {
        position: absolute;
        bottom: 0;
        background-color: #004930;
        opacity: 0.6;
        width: 100%;
        height: 1.2rem;
        font-weight: bold;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.2rem;
        box-sizing: border-box;
        .name {
          display: flex;
          align-items: center;
          p {
            font-size: 0.36rem;
          }
          span {
            padding-left: 0.2rem;
            font-size: 0.3rem;
          }
        }
        .topBoxBtn {
          width: 2.2rem;
          height: 0.72rem;
          line-height: 0.72rem;
          text-align: center;
          background-color: #ffffff;
          border-radius: 0.36rem;
          font-size: 0.3rem;
          font-weight: bold;
          color: #004930;
        }
      }
    }
  }
}
.searchBottom {
  margin-top: 0.5rem;
  .bottomList {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      margin-top: 0.5rem;
      margin-right: 4%;
      width: 48%;
      height: 4rem;
      line-height: 4rem;
      overflow: hidden;
      &:nth-child(2n) {
        margin-right: 0;
      }
      img {
        width: 100%;
      }
      .bottomBox {
        position: absolute;
        bottom: 0;
        background-color: #0d0e08;
        opacity: 0.6;
        width: 100%;
        height: 1.2rem;
        line-height: initial;
        font-weight: bold;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 0.1rem;
        box-sizing: border-box;
        flex-direction: column;
        .name {
          display: flex;
          // align-items: center;
          align-items: flex-end;
          p {
            font-size: 0.3rem;
          }
          span {
            padding-left: 0.2rem;
            font-size: 0.3rem;
          }
        }
        .bottomBoxBtn {
          width: 2.2rem;
          height: 0.42rem;
          line-height: 0.42rem;
          text-align: center;
          background-color: #ffffff;
          border-radius: 0.36rem;
          font-size: 0.3rem;
          font-weight: bold;
          color: #004930;
        }
      }
    }
  }
}
.moreBtn {
  width: 2.9rem;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  background-color: #00744c;
  border-radius: 0.25rem;
  font-size: 0.3rem;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
