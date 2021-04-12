<template>
  <div>
    <gywmTabs ref="gywmTabs"></gywmTabs>
    <div class="banner">
<<<<<<< HEAD
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner16.jpg" />
=======
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner10.png" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    </div>
    <div class="cont">
      <div
        class="titleCont"
<<<<<<< HEAD
        style="padding-top: 0.5rem; padding-bottom: 0.2rem"
      >
        <div class="titleLine"></div>
        <div class="title">公司荣誉</div>
      </div>
      <div class="intro">
        <p class="text">
          石门峰纪念公园先后荣获全国殡葬改革示范单位，全国学雷锋先进单位，2020中国品牌影响力（文旅行业）十大消费者优选品牌，2020中国公益慈善十大影响力企业，湖北省国防教育基地，武汉市爱国主义教育基地，武汉市关心下一代党史国史教育基地等多个荣誉称号。
=======
        style="padding-top:0.5rem; padding-bottom: 0.2rem;"
      >
        <div class="titleLine"></div>
        <div class="title">
          公司荣誉
        </div>
      </div>
      <div class="intro">
        <p class="text">
          石门峰纪念公园先后荣获全国殡葬改革示范单位，湖北省国防教育基地，武汉市爱国主义教育基地，武汉市关心下一代党史国史教育基地等多个荣誉称号。
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        </p>

        <van-grid :column-num="2" :border="false">
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry2.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry3.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry4.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry5.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry6.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry7.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry8.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry9.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry10.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry11.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image class="itemImg" src="/img/mobile/gsry12.png" />
          </van-grid-item>
        </van-grid>
      </div>
    </div>

<<<<<<< HEAD
    <!-- <div class="cont">
=======
    <div class="cont">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <div class="titleCont">
        <div class="titleLine"></div>
        <div class="title">
          联系我们
        </div>
      </div>

      <div class="intro" style="padding-top: 0.2rem;">
        <p>公司地址：武汉市东湖高新区九峰街道石门峰路9号</p>
        <p>
          电<span style="padding-left: 0.53rem;">话：</span>
          027-87635298 / 87635632 / 87639736
        </p>
        <p>微信公众号：smfgzh</p>

        <div class="map">
          <el-amap
            ref="map"
            vid="amapContainer"
            :amap-manager="amapManager"
            :center="map.center"
            :zoom="map.zoom"
            :plugin="plugin"
            :events="map.events"
            class="amapContainer"
          >
            <el-amap-marker
              vid="marker"
              :position="marker.position"
              :events="marker.events"
            ></el-amap-marker>
          </el-amap>
        </div>
        <div style="text-align: center; padding-top: 0.5rem;">
          <van-image width="5.32rem" src="/img/mobile/gsry13.png" />
        </div>
      </div>
<<<<<<< HEAD
    </div> -->
=======
    </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
export default {
  components: {
<<<<<<< HEAD
    gywmTabs: () =>
      import("@/pages/mobile/views/gywm/components/gywm-tabs.vue"),
=======
    gywmTabs: () => import("@/pages/mobile/views/gywm/components/gywm-tabs.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      amapManager: null,
      map: {
        zoom: 13,
        center: [114.487783, 30.513501],
        events: {
<<<<<<< HEAD
          init: () => {},
        },
      },
      plugin: [
        {
          pName: "ToolBar",
        },
=======
          init: () => {}
        }
      },
      plugin: [
        {
          pName: "ToolBar"
        }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      ],
      marker: {
        position: [114.487783, 30.513501],
        events: {
          click: () => {
            var url =
              "https://www.amap.com/search?id=B0FFGH8SFR&city=420111&geoobj=113.338398%7C30.03371%7C115.807417%7C31.17591&query_type=IDQ&query=%E7%9F%B3%E9%97%A8%E5%B3%B0%E7%BA%AA%E5%BF%B5%E5%85%AC%E5%9B%AD&zoom=9.68";
            var tempPage = window.open("", "_blank");
            tempPage.location = url;
<<<<<<< HEAD
          },
        },
      },
=======
          }
        }
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.amapManager = new AMapManager();
    });
  },
<<<<<<< HEAD
  methods: {},
=======
  methods: {}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
.banner {
  .bannerImg {
    width: 100%;
    height: 5rem;
  }
}

.cont {
  .titleCont {
    display: flex;
    padding: 0rem 0.4rem;

    .titleLine {
      width: 8px;
      height: 0.4rem;
      background-color: #004930;
    }

    .title {
      padding-left: 0.25rem;
      font-weight: 700;
      line-height: 0.5rem;
      color: #666666;
      font-size: 0.32rem;
      letter-spacing: 1px;
    }
  }

  .intro {
<<<<<<< HEAD
    font-size: 0.3rem;
=======
    font-size: 0.24rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    line-height: 0.5rem;
    letter-spacing: 1px;
    color: #333333;
    padding: 0rem 0.4rem;
    padding-bottom: 0.8rem;

    .text {
      text-indent: 2em;
    }

    /deep/ .van-grid-item__content {
      padding: 0.2rem 0rem;

      .itemImg {
        width: 3.2rem;
        height: 2.36rem;
      }
    }

    .map {
      width: 5.5rem;
      height: 3rem;
      margin: auto;
      margin-top: 0.5rem;

      .amapContainer {
        height: 100%;
      }
    }
  }
}
</style>
