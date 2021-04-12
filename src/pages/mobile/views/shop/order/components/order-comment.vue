<template>
  <div class="orderComment">
<<<<<<< HEAD
    <div class="title">
      <p>订单评论</p>
      <p><van-icon @click="handleCancel" name="cross" /></p>
    </div>
    <div class="orderCommentCont">
      <p><span>订单号：</span>{{ model.orderNum }}</p>
      <p><span>订单描述：</span>{{ model.orderSubject }}</p>
      <p>
        <span>评分：</span>
        <van-rate
          v-model="model.score"
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#ccc"
        />
      </p>
      <p>
        <span>评论：</span
        ><textarea
          style="width:68%;height:1.5rem;"
          v-model="model.cont"
          placeholder="评论内容..."
        ></textarea>
      </p>
      <imgsUpload style="margin-top:.2rem" ref="photosUpload"></imgsUpload>
    </div>
    <div class="btn" @click="submit()">
      提交评论
    </div>
=======
      comment
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  </div>
</template>

<script>
<<<<<<< HEAD
import { saveOrderComment } from "@/pages/mobile/api/shop";
export default {
  components: {
    imgsUpload: () =>
      import("@/pages/mobile/views/mark/create/components/photosUpload.vue"),
  },
  props: {
    shopOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/usernull.png'`,
      model: {
        id: "",
        orderId: "",
        orderNum: "",
        orderSubject: "",
        commentType: "1",
        pid: "0",
        img: [],
        cont: "",
        score: 0,
      },
      isSubmit: false,
    };
  },
  mounted() {
    this.model.orderId = this.shopOrder.id;
    this.model.orderNum = this.shopOrder.orderNum;
    this.model.orderSubject = this.shopOrder.orderSubject;
  },
  methods: {
    submit() {
      var fileList = this.$refs.photosUpload.getFileList();
      console.log(fileList);
      this.model.img = fileList.map((x) => {
        console.log(x);
        return x.url;
      });
      saveOrderComment(this.model).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "提交成功",
          });
          this.handleCancel(res);
        }
      });
    },
    handleCancel(res) {
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.orderComment {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0.88rem;
  width: 100%;
  background: #f3f3f3;
  .title {
    width: 90%;
    margin: 0 auto;
    padding: 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #ccc;
  }
  .orderCommentCont {
    width: 90%;
    margin: 0 auto;
    padding: 0 0.4rem;
    box-sizing: border-box;
    p {
      display: flex;
      margin-top: 0.2rem;
      span {
        width: 1.5rem;
      }
    }
  }
  .btn {
    width: 3.2rem;
    height: 0.73rem;
    background-color: #00744c;
    border-radius: 0.36rem;
    margin: 0.3rem auto;
    margin-top: 0.5rem;
    color: #fff;
    line-height: 0.73rem;
    text-align: center;
  }
}
</style>
=======
export default {

}
</script>

<style>

</style>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
