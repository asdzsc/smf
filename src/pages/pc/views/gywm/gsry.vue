<template>
  <div class="gywm">
    <div class="banner"></div>
    <gywmHead name="公司荣誉"></gywmHead>
    <div class="cont">
      <div class="describe">
<<<<<<< HEAD
        石门峰纪念公园先后荣获全国殡葬改革示范单位，全国学雷锋先进单位，2020中国品牌影响力（文旅行业）十大消费者优选品牌，2020中国公益慈善十大影响力企业，湖北省国防教育基地，武汉市爱国主义教育基地，武汉市关心下一代党史国史教育基地等多个荣誉称号。
=======
        石门峰纪念公园先后荣获全国殡葬改革示范单位，湖北省国防教育基地，武汉市爱国主义教育基地，武汉市关心下一代党史国史教育基地等多个荣誉称号。
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      </div>

      <div class="honorImgs">
        <div class="imgItem">
          <img src="/img/gsry1.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry2.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry3.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry4.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry5.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry6.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry7.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry8.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry9.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry10.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry11.png" />
        </div>
        <div class="imgItem">
          <img src="/img/gsry12.png" />
        </div>
      </div>

<<<<<<< HEAD
      <!-- <div class="titleCont">
=======
      <div class="titleCont">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        <div class="titleLine"></div>
        <div class="title">
          联系我们
        </div>
      </div>
      <div class="lxwm">
        <div class="addressCont">
          <div class="address">
            <p>公司地址：武汉市东湖高新区九峰街道石门峰路9号</p>
            <p>
              电<span style="padding-left: 40px;">话：</span>
              027-87635298 / 87635632 / 87639736
            </p>
            <p>微信公众号：smfgzh</p>
          </div>
          <div class="addressImg">
            <img src="/img/gsry13.png" />
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
        </div>
<<<<<<< HEAD
      </div> -->
=======
      </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
export default {
  components: {
<<<<<<< HEAD
    gywmHead: () => import("@/pages/pc/views/gywm/components/gywm-head.vue"),
=======
    gywmHead: () => import("@/pages/pc/views/gywm/components/gywm-head.vue")
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
.gywm {
  .banner {
<<<<<<< HEAD
    background: url("/img/banner16.jpg") no-repeat center center;
=======
    background: url("/img/banner10.png") no-repeat center center;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    background-size: cover;
    height: 600px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    .describe {
      margin-top: 60px;
      font-size: 18px;
      line-height: 27px;
      font-weight: 400;
      color: #333333;
      text-indent: 2em;
    }

    .honorImgs {
      margin-top: 50px;
      display: inline-block;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .imgItem {
        width: 380px;
        height: 280px;
        float: left;
        margin-right: 30px;
        margin-bottom: 30px;
<<<<<<< HEAD

        &:nth-child(3n + 3) {
          margin-right: 0px;
        }

=======
        &:nth-child(3n + 3) {
          margin-right: 0px;
        }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        img {
          width: 380px;
          height: 280px;
        }
      }
    }
<<<<<<< HEAD

    .titleCont {
      display: flex;
      margin-top: 70px;

=======
    .titleCont {
      display: flex;
      margin-top: 70px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .titleLine {
        width: 8px;
        height: 40px;
        background-color: #004930;
      }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .title {
        padding-left: 25px;
        font-size: 24px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 1px;
        color: #666666;
      }
    }
<<<<<<< HEAD

    .lxwm {
      display: flex;
      margin-bottom: 100px;

      .addressCont {
        flex: 1;
        padding-left: 30px;

=======
    .lxwm {
      display: flex;
      margin-bottom: 100px;
      .addressCont {
        flex: 1;
        padding-left: 30px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        .address {
          margin-top: 50px;
          font-size: 20px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0px;
          color: #333333;
        }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        .addressImg {
          margin-top: 80px;
        }
      }
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      .map {
        width: 550px;
        height: 300px;
        margin-top: 30px;
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        .amapContainer {
          height: 300px;
        }
      }
    }
  }
}
</style>
