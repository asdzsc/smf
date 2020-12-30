<template>
  <div class="searchCont">
    <div class="searchTop">
      <div class="searchTitle">
        纪念墙
      </div>
      <ul class="topList">
        <li v-for="item in topList" :key="item.id">
          <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
          <div class="topBox">
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.msgNum }}次纪念</p>
            </div>
            <div class="topBoxBtn" @click="handleClick(item.id)">
              纪念他
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="middleLine"></div>
    <div class="searchBottom">
      <ul class="bottomList">
        <li v-for="item in bottomList" :key="item.id">
          <img :src="baseUrl + item.photo" :onerror="defImg" alt="" />
          <div class="bottomBox">
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.msgNum }}次纪念</p>
            </div>
            <div class="bottomBoxBtn" @click="handleClick(item.id)">
              纪念他
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
      total: "",
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
        name: "/mark/grjn-00",
        params: {
          id: id,
        },
      });
    },
    // 查看更多
    handleMore() {
      this.$emit("handleMore");

      // if (this.c != null) {
      //   this.bottomList = this.allList.splice(3, 11);
      //   this.c++;
      //   if (8 * this.c + 3 >= this.allList.length) {
      //     var d = this.allList.slice(8 * this.c - 5, this.allList.length);
      //     this.bottomList = this.bottomList.concat(d);
      //     this.c = null;
      //   } else {
      //     var d = this.allList.slice(8 * this.c - 5, 8 * this.c + 3);
      //     this.bottomList = this.bottomList.concat(d);
      //   }
      // }
    },
    closeMore() {
      this.bigMore = false;
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
        position: relative;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
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
    margin-bottom: 200px;
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
        position: relative;
        margin-right: 35px;
        margin-top: 25px;
        img {
          width: 100%;
          height: 100%;
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
