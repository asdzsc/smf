<template>
  <div class="myfoot">
    <div class="serve">
      <div class="serveItem ">
        <div class="squere">
          <i class="iconfont iconQQ"></i>
        </div>
        <div class="title">在线客服</div>
      </div>
      <div class="serveItem ">
        <div class="squere">
          <i class="iconfont iconweixin"></i>
        </div>
        <div class="title">微信客服</div>
      </div>
      <div class="serveItem ">
        <div class="squere">
          <i class="iconfont iconjiahaocu"></i>
        </div>
        <div class="title">墓地订单</div>
      </div>
      <div class="serveItem ">
        <div class="squere">
          <i class="iconfont iconaixinjuanzeng"></i>
        </div>
        <div class="title">服务订单</div>
      </div>
    </div>
    <div class="foot">
      <div @click="$router.push('/gywm')" class="title">关于我们</div>
      <div class="line"></div>
      <!-- <div class="foot-menu">
        <van-row>
          <van-col class="foot-item" span="9">公司简介</van-col>
          <van-col class="foot-item" span="7">公司荣誉</van-col>
          <van-col class="foot-item" span="8">品牌故事</van-col>
          <van-col class="foot-item" span="9">品牌文化</van-col>
          <van-col class="foot-item" span="7">企业视频</van-col>
        </van-row>
      </div> -->

      <div class="title">公司新闻</div>
      <div class="line"></div>
      <!-- <div class="foot-menu">
        <van-row>
          <van-col class="foot-item" span="9">公告中心</van-col>
          <van-col class="foot-item" span="7">新闻动态</van-col>
          <van-col class="foot-item" span="8">招标广告</van-col>
        </van-row>
      </div> -->

      <div @click="$router.push('/zxfw')" class="title">在线服务</div>
      <div class="line"></div>
      <!-- <div class="foot-menu">
        <van-row>
          <van-col class="foot-item" span="9">免费上门服务</van-col>
          <van-col class="foot-item" span="7">预约购墓服务</van-col>
          <van-col class="foot-item" span="8">人生纪念服务</van-col>
          <van-col class="foot-item" span="9">安葬礼仪服务</van-col>
          <van-col class="foot-item" span="7">旧墓换新服务</van-col>
          <van-col class="foot-item" span="8">配饰换新服务</van-col>
          <van-col class="foot-item" span="9">墓碑保洁服务</van-col>
        </van-row>
      </div> -->

      <div class="title">博物馆群</div>
      <div class="line"></div>
      <!-- <div class="foot-menu">
        <van-row>
          <van-col class="foot-item" span="9">湖北军民抗战博物馆</van-col>
          <van-col class="foot-item" span="7">楚天将帅馆</van-col>
          <van-col class="foot-item" span="8">时代记忆馆</van-col>
          <van-col class="foot-item" span="9">计划经济票证馆</van-col>
          <van-col class="foot-item" span="7">百家姓族谱馆</van-col>
          <van-col class="foot-item" span="8">人生圆满博物馆</van-col>
        </van-row>
      </div> -->

      <div class="title">纪念园区</div>
      <div class="line"></div>
      <!-- <div class="foot-menu">
        <van-row>
          <van-col class="foot-item" span="9">辛亥革命纪念园</van-col>
          <van-col class="foot-item" span="7">武汉抗战纪念园</van-col>
          <van-col class="foot-item" span="8">开国元勋雕塑园</van-col>
          <van-col class="foot-item" span="9">感恩广场</van-col>
          <van-col class="foot-item" span="15">
            保卫大武汉中国抗战空军纪念墓园
          </van-col>
        </van-row>
      </div> -->

      <div class="foot-ewm">
        <img class="ewm" src="/img/mobile/ewm.png" />
        <div class="ewm-title">
          关注石门峰公众号<br />
          更多了解我们
        </div>
      </div>

      <div class="backTop">
        <div>
          <img class="backTop-qq" src="/img/mobile/qq.png" />
        </div>
        <div>
          <img
            @click="toTop()"
            class="backTop-ding"
            src="/img/mobile/ding.png"
          />
        </div>
      </div>

      <div class="copyright">
        ©2019 武汉石门峰纪念公园有限公司 版权所有<span
          style="padding-left:.4rem;"
          >鄂公网安备 42018502001747号</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toTop() {
      $("html,body").animate({ scrollTop: 0 }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.myfoot {
  .serve {
    background: #fff;
    padding: 0.34rem 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    .serveItem {
      margin: 0 0.33rem;
      text-align: center;
      line-height: 0.3rem;

      .title {
        padding-top: 0.2rem;
        font-size: 0.24rem;
        font-weight: 400;
      }
      .squere {
        margin: auto;
        width: 0.64rem;
        height: 0.64rem;
        border-radius: 0.1rem;
        border: 1px solid #666;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          font-size: 0.38rem;
        }
      }
    }
  }

  .foot {
    background-color: #004930;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
    .title {
      font-size: 0.26rem;
      letter-spacing: 0px;
      color: #ffffff;
      padding-left: 0.4rem;
      padding-bottom: 0.1rem;
      padding-top: 0.2rem;
      font-weight: 700;
    }
    .line {
      height: 1px;
      background-color: #ffffff;
      opacity: 0.25;
    }
    .foot-menu {
      padding: 0.2rem 0.4rem;
      .foot-item {
        color: #fff;
        font-size: 0.26rem;
        padding-bottom: 0.2rem;
      }
    }
    .foot-ewm {
      padding-top: 1rem;
      text-align: center;
      .ewm {
        width: 2rem;
        height: 2rem;
        border-radius: 5px;
      }
      .ewm-title {
        margin: auto;
        font-size: 0.26rem;
        line-height: 0.4rem;
        padding-top: 0.1rem;
        color: #fff;
      }
    }
    .backTop {
      position: fixed;
      right: 0px;
      bottom: 2rem;
      .backTop-qq {
        width: 0.88rem;
        height: 0.64rem;
      }
      .backTop-ding {
        padding-top: 0.1rem;
        width: 0.88rem;
        height: 0.64rem;
      }
    }
  }

  .copyright {
    padding-top: 0.8rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }
}
</style>
