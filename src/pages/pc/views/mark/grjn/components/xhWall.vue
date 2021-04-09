<template>
  <div class="searchCont">
    <a-spin size="large" tip="加载中..." :spinning="loading">
      <a-icon
        slot="indicator"
        type="loading"
        style="font-size: 30px; color: #004930"
        spin
      />
      <div class="searchTop">
        <div class="searchTitle">纪念墙</div>
        <ul class="topList">
          <li v-for="(item, index) in topList" :key="index">
            <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
            <div class="topBox">
              <div class="name">
                <p>{{ item.name }}</p>
                <p>{{ item.msgNum }}次纪念</p>
              </div>
              <div class="topBoxBtn" @click="handleClick(item.id)">纪念Ta</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="middleLine"></div>
      <div class="searchBottom">
        <ul class="bottomList">
          <li v-for="(item, index) in bottomList" :key="index">
            <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
            <div class="bottomBox">
              <div class="name">
                <p>{{ item.name }}</p>
                <p>{{ item.msgNum }}次纪念</p>
              </div>
              <div class="bottomBoxBtn" @click="handleClick(item.id)">
                纪念Ta
              </div>
            </div>
          </li>
        </ul>
      </div>
    </a-spin>
    <div v-if="bigMore" class="moreBtn" @click="handleMore()">查看更多</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      bigMore: true,
      loading: false,
      allList: [],
      topList: [],
      bottomList: [],
    };
  },
  watch: {
    topList: function (nv) {
      this.$parent.topList = nv;
    },
  },
  methods: {
    loadData(model) {
      this.loading = false;
      if (model.current === 1) {
        this.topList = model.list.slice(0, 3);
        this.bottomList = model.list.slice(3, 11);
      } else {
        this.bottomList.push(...model.list);
      }
    },
    // 纪念按钮事件
    handleClick(id) {
      console.log(id);
      this.$router.push({
        path: "/mark/grjn/index",
        query: {
          id: id,
        },
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    // 查看更多
    handleMore() {
      this.$emit("handleMore");
      this.loading = true;
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

<style scoped lang="less">
.searchCont {
  width: 1250px;
  margin: 0 auto;
  ul {
    padding: 0;
  }
  .middleLine {
    height: 1px;
    background-color: #d6d6d6;
    margin-top: 100px;
  }
  .searchTop {
    .searchTitle {
      width: 130px;
      height: 40px;
      font-size: 40px;
      font-weight: bold;
      line-height: 70px;
      letter-spacing: 3px;
      color: #00744c;
      margin: 100px auto;
    }
    .topList {
      list-style: none;
      display: flex;
      li {
        width: 400px;
        height: 400px;
        line-height: 400px;
        margin-right: 20px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          // height: 100%;
        }
        .topBox {
          display: none;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 155px;
          background-color: #004930;
          opacity: 0.6;
          color: #fff;
          font-size: 26px;
          font-weight: bold;
          .name {
            height: 55px;
            display: flex;
            line-height: 55px;
            justify-content: space-around;
            border-bottom: 4px solid #eee;
          }
          .topBoxBtn {
            margin: 0 auto;
            margin-top: 20px;
            width: 220px;
            height: 60px;
            color: #004930;
            text-align: center;
            line-height: 60px;
            background-color: #ffffff;
            border-radius: 30px;
            cursor: pointer;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          .topBox {
            display: block;
          }
        }
      }
    }
  }
  .moreBtn {
    width: 290px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #00744c;
    border-radius: 25px;
    font-size: 20px;
    color: #fff;
    margin: 0 auto;
    cursor: pointer;
    margin-top: 50px;
    margin-bottom: 100px;
  }
  .searchBottom {
    margin-top: 75px;

    .bottomList {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 285px;
        height: 285px;
        line-height: 285px;
        position: relative;
        margin-right: 35px;
        margin-top: 25px;
        overflow: hidden;
        img {
          width: 100%;
          // height: 100%;
        }
        .bottomBox {
          display: none;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 95px;
          background-color: #0d0e08;
          opacity: 0.6;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          .name {
            width: 90%;
            margin: 0 auto;
            height: 40px;
            display: flex;
            line-height: 40px;
            padding-bottom: 5px;
            justify-content: space-around;
            border-bottom: 2px solid #eee;
            box-sizing: border-box;
          }
          .bottomBoxBtn {
            margin: 0 auto;
            margin-top: 12.5px;
            width: 110px;
            height: 30px;
            color: #004930;
            text-align: center;
            line-height: 30px;
            background-color: #ffffff;
            border-radius: 15px;
            cursor: pointer;
          }
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
        &:hover {
          .bottomBox {
            display: block;
          }
        }
      }
    }
  }
}
</style>
