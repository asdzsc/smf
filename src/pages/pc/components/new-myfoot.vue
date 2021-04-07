<template>
  <div class="footBg">
    <div class="footContent">
      <div @click="$router.push('/mark/grjn')">个人纪念馆</div>
      <div @click="$router.push('/member/userInfo')">个人中心</div>
      <div @click="$router.push('/mark')">
        <img src="/img/pc/logo.png" alt="" />
      </div>
      <div @click="$router.push('/mark/gybg')">关于本馆</div>
      <div @click="$router.push('/mark/zpg')">族谱馆</div>
    </div>
    <!-- <div class="search">
      <input
        type="text"
        placeholder="查找亲友姓名"
        v-model="model.searchText"
      />
      <img @click="handleSearch" src="/img/pc/search.png" alt="" />
    </div> -->
    <div class="copyright">
      <span style="padding:0 5px;"></span
      >武汉石门峰纪念公园有限公司版权所有<span style="padding:0 5px;"></span>
      <div>
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          style="color: #999999;;"
          >鄂ICP备15004424号-1</a
        >
      </div>
    </div>

    <div v-if="showBackTop" class="backTop pointer">
      <!-- <div class="item">
        <i class="iconfont iconweixin"></i>
      </div> -->
      <a-popover placement="left">
        <template slot="content">
          <img src="/img/code.jpg" alt="" />
        </template>
        <div class="item pointer">
          <i class="iconfont iconQRcode"></i>
        </div>
      </a-popover>

      <div class="item pointer" @click="toTop()">
        <i class="iconfont iconfanhuidingbu"></i>
        <div>顶部</div>
      </div>
    </div>

    <img src="/img/zixun.jpg" class="zixungirl pointer" alt="" />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "myhead",
  data() {
    return {
      showBackTop: false,
      allList: [],
      model: {
        current: 0,
        pageSize: 15,
        searchText: "",
        status: "0",
        columnId: "",
        list: [],
        notId: [],
        total: "",
      },
    };
  },
  computed: {},
  mounted() {
    var vm = this;
    $(window).scroll(function() {
      var topp = $(document).scrollTop();
      if (topp >= 100) {
        vm.showBackTop = true;
      } else {
        vm.showBackTop = false;
      }
    });
  },
  methods: {
    toTop() {
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth"
      // });
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    },
  },
};
</script>

<style lang="less" scoped>
.footBg {
  background-color: #ffffff;
  color: #000;
  height: 148px;
  position: relative;

  .backTop {
    width: 53px;
    height: 150px;
    background-color: rgba(155, 155, 155, 0.8);
    border-radius: 5px;
    position: fixed;
    right: 15px;
    bottom: 50px;

    .item {
      height: 50%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;

      .iconfont {
        font-size: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:last-child {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .iconfont {
          font-size: 30px;
          height: 22px;
        }
      }
    }
  }

  .zixungirl {
    position: fixed;
    top: 80px;
    right: 15px;
    z-index: 2;
  }

  .search {
    width: 340px;
    height: 46px;
    margin: 20px auto;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      padding-top: 14px;
      padding-bottom: 14px;
      background-color: #ededed;
      border: none;
      border-radius: 4px;
      font-size: 18px;
      padding-left: 10px;
      padding-right: 48px;
    }

    img {
      position: absolute;
      right: -40px;
      top: 8px;
    }
  }

  .footContent {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-top: 25px;

    div {
      margin-right: 50px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .copyright {
    margin-top: 20px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #999999;
    font-weight: 200;
    letter-spacing: 3px;
  }
}

@media screen and (max-width: 1600px) {
  .footBg {
    .footContent {
      // width: 1400px;
      width: 100%;

      .footTable {
        .menu {
          width: 1170px;

          .title {
            font-size: 16px;
          }

          .menuName {
            font-size: 16px;
          }
        }
      }
    }

    .copyright {
      font-size: 16px;
    }
  }
}
</style>
