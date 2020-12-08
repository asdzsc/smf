<template>
  <div class="w1920 zxfw">
    <div class="banner">
      <div class="title">
        人生圆满
        <span style="width: 30px; display: -webkit-inline-box;">&nbsp;</span>
        为您服务
      </div>
      <div class="title2">
        线上预约服务 / 好服务 先体验
        <span style="width: 80px; display: -webkit-inline-box;">&nbsp;</span>
        全国服务热线 / 027-87635298
      </div>
    </div>
    <div class="cont">
      <a-row :gutter="[40, 40]">
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw1.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">免费上门服务</div>
              <div class="intr">
                7 X 24小时标准服务<br />
                全程免费服务，贴心陪伴<br />
                客户投诉及时响应， 24小时受理
              </div>
              <div @click="openUrl('/zxfw/mfsmfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw2.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">人生纪念服务</div>
              <div class="intr">
                雕塑铜像 / 瓷像 / 墓志铭<br />
                纪念馆及周年 / 生日 / 忌日<br />
                从“爱”到一种职业
              </div>
              <div @click="openUrl('/zxfw/rsjnfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw3.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">安葬礼仪服务</div>
              <div class="intr">
                让告别变美丽<br />
                礼仪追思，专属人生葬礼服务<br />
                全面解决人生告别的最后烦忧
              </div>
              <div @click="openUrl('/zxfw/azlyfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw4.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">旧墓换新服务</div>
              <div class="intr">
                艺术墓碑设计<br />
                首创不取福盒换新<br />
                服务增加全面清理消毒环节
              </div>
              <div @click="openUrl('/zxfw/jmhxfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col>
        <!-- <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw5.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">配饰换新服务</div>
              <div class="intr">
                全更换，无痕不留印<br />
                品质升级<br />
                服务增加全面换新环节
              </div>
              <div @click="openUrl('/zxfw/pshxfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col> -->
        <a-col class="gutter-row" :span="12">
          <div class="gutter-box">
            <div class="gutter-item itemImg">
              <img src="/img/zxfw6.png" />
            </div>
            <div class="gutter-item itemCont">
              <div class="title">墓碑保洁服务</div>
              <div class="intr">
                1小时全福位日式保洁<br />
                金牌专职保洁师<br />
                服务增加消杀护理环节
              </div>
              <div @click="openUrl('/zxfw/mbbjfw')" class="btn">了解详情</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <myserve></myserve>
  </div>
</template>
<script>
export default {
  components: {
    myserve: () => import("@/pages/pc/components/myserve.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less" scoped>
.zxfw {
  background-color: #f3f3f3;

  .banner {
    background: url("/img/banner2.png") no-repeat center center;
    background-size: cover;
    height: 280px;
    text-align: center;

    .title {
      font-size: 48px;
      color: #ffffff;
      padding-top: 70px;
      font-weight: 400;
    }

    .title2 {
      font-size: 24px;
      color: #ffffff;
      font-weight: 400;
      padding-top: 20px;
    }
  }

  .cont {
    margin: auto;
    width: 1200px;
    padding-top: 40px;
    padding-bottom: 30px;

    .gutter-box {
      height: 260px;
      display: flex;
      background: #fff;

      .gutter-item {
        flex: 0.5;

        img {
          width: 290px;
          height: 260px;
        }

        &.itemImg {
          background: #fff;
        }

        &.itemCont {
          padding-top: 35px;
          padding-left: 50px;

          .title {
            font-weight: 700;
            font-size: 24px;
            color: #333333;
          }

          .intr {
            padding-top: 25px;
            font-size: 14px;
            line-height: 20px;
            color: #666666;
            font-weight: 400;
            height: 120px;
          }

          .btn {
            width: 90px;
            height: 26px;
            background-color: #004930;
            border-radius: 13px;
            text-align: center;
            font-size: 14px;
            line-height: 26px;
            color: #ffffff;
            font-weight: 400;
            cursor: pointer;
          }
        }
      }

      &:hover {
        background: #004930;
        transition: 0.5s;

        .gutter-item {
          &.itemCont {
            .title {
              color: #ffffff;
            }

            .intr {
              color: #ffffff;
            }

            .btn {
              background-color: #ffffff;
              color: #004930;
            }
          }
        }
      }
    }
  }
}
</style>
