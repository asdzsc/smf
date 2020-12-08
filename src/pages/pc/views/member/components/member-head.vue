<template>
  <div class="member-head">
    <div class="head-cont">
      <div class="iconGrzx">
        <i class="iconfont iconaccount-fill"></i>
      </div>
      <div class="grzx">
        个人中心
      </div>
      <div class="search">
        <div class="inputCont">
          <div class="input">
            <input v-model="searchText" @keyup.enter="search()" />
          </div>
          <div @click="search()" class="btn">搜索</div>
        </div>
      </div>
      <div class="cartCont">
        <div @click="openUrl('/shop/cart')" class="cartLink">
          <div class="iconGwc">
            <i class="iconfont iconadd-cart"></i>
          </div>
          <div class="cartTitle">
            我的购物车
          </div>
          <div class="cartArrows">>></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  mounted() {
    if (this.$route.params.searchText) {
      this.searchText = this.$route.params.searchText;
      this.search();
    }
  },
  methods: {
    search() {
      this.$emit("search", this.searchText);
    },
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.member-head {
  max-width: 1920px;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px rgba(24, 24, 24, 0.05);

  .head-cont {
    width: 1200px;
    margin: auto;
    display: flex;

    .iconGrzx {
      line-height: 64px;

      .iconfont {
        color: #004930;
        font-size: 30px;
      }
    }

    .grzx {
      flex: auto;
      font-size: 16px;
      font-weight: 700;
      line-height: 64px;
      color: #333333;
    }

    .search {
      width: 180px;
      margin-right: 10px;

      .inputCont {
        display: flex;
        margin-top: 17px;
        height: 30px;
        border: solid 1px #cecece;

        .input {
          flex: auto;

          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
          }
        }

        .btn {
          width: 57px;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          border-left: solid 1px #cecece;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .cartCont {
      width: 180px;

      .cartLink {
        display: flex;
        margin-top: 17px;
        height: 30px;
        border: solid 1px #cecece;
        cursor: pointer;

        .iconGwc {
          line-height: 26px;
          margin-left: 20px;
          margin-right: 15px;

          .iconfont {
            color: #004930;
            font-size: 24px;
            font-weight: 700;
          }
        }

        .cartTitle {
          font-size: 12px;
          font-weight: 400;
          line-height: 30px;
          color: #666666;
        }

        .cartArrows {
          margin-left: 15px;
          font-size: 12px;
          color: #666666;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
