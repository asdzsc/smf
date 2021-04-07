<template>
  <!-- :bodyStyle="{ padding: '0px' }" -->
  <a-modal
    ref="imgModal"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :width="width"
  >
    <table style="width: 100%;">
      <tr>
        <td class="prev">
          <img v-if="imgList.length > 1" @click="prev()" src="/img/left.png" />
        </td>
        <td>
          <img
            style="width: 100%"
            :src="getImg(previewImage)"
            :onerror="defImg"
          />
        </td>
        <td class="next">
          <img v-if="imgList.length > 1" @click="next()" src="/img/right.png" />
        </td>
      </tr>
    </table>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      visible: false,
      width: 520,
      previewImage: "",
      imgList: [],
      imgIndex: -1,
    };
  },
  watch: {
    previewImage() {
      this.imgWH();
    },
  },
  mounted() {},
  methods: {
    loadData(imgUrl, imgList) {
      this.visible = true;
      this.previewImage = imgUrl;
      this.imgList = imgList;
      if (this.imgList) {
        this.imgIndex = this.imgList.indexOf(imgUrl);
      }
    },
    prev() {
      if (this.imgIndex <= 0) {
        this.imgIndex = this.imgList.length - 1;
      } else {
        this.imgIndex--;
      }
      this.setImg(this.imgList[this.imgIndex]);
    },
    next() {
      if (this.imgIndex >= this.imgList.length - 1) {
        this.imgIndex = 0;
      } else {
        this.imgIndex++;
      }
      this.setImg(this.imgList[this.imgIndex]);
    },
    setImg(imgUrl) {
      this.previewImage = imgUrl;
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
    imgWH() {
      if (this.previewImage) {
        // 图片地址
        var img_url = this.getImg(this.previewImage);
        // 创建对象
        var img = new Image();
        // 改变图片的src
        img.src = img_url;
        // 判断是否有缓存
        if (img.complete) {
          // alert("from:complete : width:" + img.width + ",height:" + img.height);
          var w = img.width > 1000 ? 1000 : img.width;
          this.width = w < 520 ? 520 : w;
        } else {
          // 加载完成执行
          img.onload = () => {
            // 打印
            // alert("from:onload : width:" + img.width + ",height:" + img.height);
            var w = img.width > 1000 ? 1000 : img.width;
            this.width = w < 520 ? 520 : w;
          };
        }
      }
    },
    handleCancel() {
      this.visible = false;
      this.$emit("onClose");
    },
  },
};
</script>

<style lang="less" scoped>
.prev {
  width: 16px;
  text-align: center;
  vertical-align: middle;
  img {
    width: 16px;
  }
}
.next {
  width: 16px;
  text-align: center;
  vertical-align: middle;
  img {
    width: 16px;
  }
}
/deep/ .ant-modal-close-x {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>
