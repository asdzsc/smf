<template>
  <div class="serve">
    <div class="serveItem pointer">
      <div class="squere">
        <i class="iconfont iconQQ"></i>
      </div>
      <div>在线客服</div>
    </div>
    <div class="serveItem pointer">
      <div class="squere">
        <i class="iconfont iconweixin"></i>
      </div>
      <div>微信客服</div>
    </div>
<<<<<<< HEAD
    <div @click="$router.push('/member/cemetery/cemeteryOrder')" class="serveItem pointer">
=======
    <div class="serveItem pointer">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <div class="squere">
        <i class="iconfont iconjiahaocu"></i>
      </div>
      <div>墓地订单</div>
    </div>
<<<<<<< HEAD
    <div @click="$router.push('/shop/order/orderList')" class="serveItem pointer">
=======
    <div class="serveItem pointer">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <div class="squere">
        <i class="iconfont iconaixinjuanzeng"></i>
      </div>
      <div>服务订单</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.serve {
  width: 1200px;
  margin: auto;
  padding-top: 55px;
  padding-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  .serveItem {
    margin: 0 25px;
    text-align: center;
    font-size: 16px;
    line-height: 38px;
    font-weight: 400;
    .squere {
      margin: auto;
      width: 64px;
      height: 64px;
      border-radius: 10px;
      border: 1px solid #666;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 38px;
      }
    }
  }
}
</style>
