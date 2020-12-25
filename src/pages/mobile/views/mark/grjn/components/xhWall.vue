<template>
  <div>
    <div class="searchTop">
      <div class="searchTitle">
        纪念墙
      </div>
      <ul class="topList">
        <li>
          <img src="/img/mobile/mark/search_01.png" alt="" />
          <div class="topBox">
            <div class="name">
              <p>刘一曙</p>
              <span>1213次纪念</span>
            </div>
            <div class="topBoxBtn">
              纪念他
            </div>
          </div>
        </li>
        <li>
          <img src="/img/mobile/mark/search_01.png" alt="" />
          <div class="topBox">
            <div class="name">
              <p>刘一曙</p>
              <span>1213次纪念</span>
            </div>
            <div class="topBoxBtn">
              纪念他
            </div>
          </div>
        </li>
        <li>
          <img src="/img/mobile/mark/search_01.png" alt="" />
          <div class="topBox">
            <div class="name">
              <p>刘一曙</p>
              <span>1213次纪念</span>
            </div>
            <div class="topBoxBtn">
              纪念他
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="searchBottom">
      <ul class="bottomList">
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
          <!-- <div class="bottomBox">
            <div class="name">
              <p>刘一曙</p>
              <span>1213次纪念</span>
            </div>
            <div class="bottomBoxBtn">
              纪念他
            </div>
          </div> -->
        </li>
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
        </li>
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
        </li>
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
        </li>
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
        </li>
        <li>
          <img src="/img/mobile/mark/search_02.png" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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
      img {
        width: 100%;
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
            font-size: 0.22rem;
          }
        }
        .topBoxBtn {
          width: 2.2rem;
          height: 0.72rem;
          line-height: 0.72rem;
          text-align: center;
          background-color: #ffffff;
          border-radius: 0.36rem;
          font-size: 0.28rem;
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
      &:nth-child(2n) {
        margin-right: 0;
      }
      img {
        width: 100%;
      }
      // .bottomBox {
      //   position: absolute;
      //   bottom: 0;
      //   background-color: #0d0e08;
      //   opacity: 0.6;
      //   width: 100%;
      //   height: 1.2rem;
      //   font-weight: bold;
      //   color: #ffffff;
      //   display: flex;
      //   align-items: center;
      //   justify-content: space-between;
      //   padding: 0 0.1rem;
      //   box-sizing: border-box;
      //   .name {
      //     display: flex;
      //     align-items: center;
      //     p {
      //       font-size: 0.3rem;
      //     }
      //     span {
      //       padding-left: 0.2rem;
      //       font-size: 0.22rem;
      //     }
      //   }
      //   .bottomBoxBtn {
      //     width: 2.2rem;
      //     height: 0.72rem;
      //     line-height: 0.72rem;
      //     text-align: center;
      //     background-color: #ffffff;
      //     border-radius: 0.36rem;
      //     font-size: 0.28rem;
      //     font-weight: bold;
      //     color: #004930;
      //   }
      // }
    }
  }
}
</style>
