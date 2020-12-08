<template>
  <a-modal
    title=""
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    width="1000px"
    :bodyStyle="{ padding: '0px' }"
  >
    <div class="goodsImgCont">
      <div class="showGoodsImg">
        <img :src="getImg(imgUrl)" />
      </div>
      <div class="goodsImgs">
        <div class="title">{{ model.title }}</div>
        <div class="subtitle">{{ model.subtitle }}</div>
        <div class="goodsImgList">
          <a-row :gutter="[10, 10]">
            <a-col
              v-for="(item, index) in model.imgs"
              :key="'img' + index"
              class="goodsImgItem"
              :span="12"
              @click="setImg(item)"
            >
              <img :class="{ check: checkImg === item }" :src="getImg(item)" />
            </a-col>
          </a-row>
        </div>
        <div class="buyCont">
          <div class="buyLeft">加入购物车</div>
          <div class="buyRight"><i class="iconfont iconadd-cart"></i></div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: "goodsShowImg",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      visible: false,
      imgUrl: "",
      checkImg: "", //选中的图片路径
      model: {
        id: "",
        cover: "",
        title: "",
        subtitle: "",
        imgs: []
      }
    };
  },
  mounted() {},
  methods: {
    loadData(imgUrl, model) {
      this.visible = true;
      this.imgUrl = imgUrl;
      this.checkImg = imgUrl;
      this.model = model;
    },
    setImg(imgUrl) {
      this.imgUrl = imgUrl;
      this.checkImg = imgUrl;
    },
    getImg(imgUrl) {
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          return imgUrl;
        } else {
          return this.baseUrl + imgUrl;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    handleCancel() {
      this.visible = false;
      this.$emit("onClose");
    }
  }
};
</script>

<style lang="less" scoped>
.goodsImgCont {
  width: 100%;
  height: 600px;
  display: flex;
  .showGoodsImg {
    width: 740px;
    height: 600px;
    text-align: center;
    border-right: 1px solid #dddddd;
    img {
      max-width: 740px;
      height: 600px;
    }
  }
  .goodsImgs {
    width: 260px;
    padding: 70px 20px 30px 20px;
    .title {
      font-size: 24px;
      color: #333333;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .subtitle {
      font-size: 14px;
      color: #666666;
      padding-top: 10px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      display: -webkit-box;
    }
    .goodsImgList {
      margin-top: 30px;
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      .goodsImgItem {
        img {
          width: 100px;
          height: 80px;
          cursor: pointer;
          &:hover {
            border: solid 3px #d54040;
          }
          &.check {
            border: solid 3px #d54040;
          }
        }
      }
    }

    .buyCont {
      display: flex;
      width: 210px;
      height: 40px;
      border: solid 1px #d54040;
      margin-top: 40px;
      cursor: pointer;
      .buyLeft {
        width: 156px;
        font-size: 14px;
        line-height: 40px;
        color: #d54040;
        text-align: center;
        font-weight: 400;
      }
      .buyRight {
        flex: 1;
        background-color: #d54040;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        .iconfont {
          font-size: 35px;
          position: relative;
        }
      }
    }
  }
}
/deep/ .ant-modal-content {
  border-radius: 0px !important;
}
</style>
