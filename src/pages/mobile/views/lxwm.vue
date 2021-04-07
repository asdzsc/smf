<template>
  <div>
    <div class="banner">
      <van-image class="bannerImg" fit="cover" src="/img/mobile/banner14.png" />
    </div>
    <div class="cont" style="padding-top: 0.6rem">
      <div class="titleCont">
        <div class="titleLine"></div>
        <div class="title">联系我们</div>
      </div>
      <div class="lxwm">
        <div class="lxwmCont">
          <div class="lxwmTitle">石门峰纪念公园</div>
          <div class="lxwmItem">
            <div class="lable">地址：</div>
            <div class="text">武汉市东湖高新区九峰街道石门峰路9号</div>
          </div>
          <div class="lxwmLine"></div>
          <div class="lxwmItem">
            <div class="lable">电话：</div>
            <div class="text">027-87635298 / 87635632 / 87639736</div>
          </div>
          <div class="lxwmLine"></div>
          <div class="lxwmItem">
            <div class="lable">公众号：</div>
            <div class="text">smfgzh</div>
          </div>
          <div class="lxwmLine"></div>
        </div>
      </div>

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
        <div class="mapBtn">
          <div @click="openMap()" class="btn">一键导航</div>
        </div>
      </div>

      <!-- <div style="text-align: center; padding-bottom: 0.5rem; ">
				<img src="/img/ewm.png" style="width: 3rem; height: 3rem;" />
				<div style="font-size: 0.3rem; color: #333333;">
					关注石门峰公众号<br/>更多了解我们
				</div>
			</div> -->
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
export default {
  data() {
    return {
      amapManager: null,
      map: {
        zoom: 13,
        center: [114.487783, 30.513501],
        events: {
          init: () => {},
        },
      },
      plugin: [
        {
          pName: "ToolBar",
        },
      ],
      marker: {
        position: [114.487783, 30.513501],
        events: {
          click: () => {
            this.openMap();
          },
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.amapManager = new AMapManager();
    });
  },
  methods: {
    openMap() {
      var url =
        "https://www.amap.com/search?id=B0FFGH8SFR&city=420111&geoobj=113.338398%7C30.03371%7C115.807417%7C31.17591&query_type=IDQ&query=%E7%9F%B3%E9%97%A8%E5%B3%B0%E7%BA%AA%E5%BF%B5%E5%85%AC%E5%9B%AD&zoom=9.68";
      var tempPage = window.open("", "_blank");
      tempPage.location = url;
    },
  },
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

  .lxwm {
    padding: 0.4rem 0.4rem 0.6rem;

    .lxwmCont {
      height: 3.29rem;
      background-color: #f8f8f8;
      padding: 0.37rem 0.2rem 0.4rem;

      .lxwmTitle {
        font-size: 0.32rem;
        color: #004930;
        padding-bottom: 0.5rem;
      }

      .lxwmItem {
        display: flex;
        line-height: 0.6rem;

        .lable {
          font-size: 0.24rem;
          color: #2e2e2e;
        }

        .text {
          font-size: 0.24rem;
          color: #004930;
        }
      }

      .lxwmLine {
        width: 3.7rem;
        height: 1px;
        background-color: #d4d4d4;
      }
    }
  }

  .map {
    padding: 0rem 0.4rem;
    margin-bottom: 0.5rem;

    .amapContainer {
      height: 2.7rem;
    }

    .mapBtn {
      background-color: #e6e6e6;
      padding: 0.2rem 0rem;

      .btn {
        margin: auto;

        width: 1.62rem;
        height: 0.48rem;
        background-color: #004930;
        border-radius: 24px;
        text-align: center;
        line-height: 0.48rem;
        font-size: 0.2rem;
        color: #ffffff;
      }
    }
  }

  .intro {
    font-size: 0.24rem;
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
  }
}
</style>
