<template>
  <div class="lyInfo">
    <div class="selfInfo">
      <span>主题</span>
      <textarea placeholder="请输入留言主题" style="height:30px;"></textarea>
    </div>
    <div class="selfInfo">
      <span>祭奠留言</span>
      <textarea placeholder="请输入祭奠留言"></textarea>
    </div>
    <div class="btn">再写一条</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.lyInfo {
  .selfInfo {
    display: flex;
    margin-top: 20px;
    span {
      width: 70px;
      text-align: right;
      padding-right: 10px;
    }
    textarea {
      width: 93%;
      height: 200px;
    }
  }
  .btn {
    width: 80px;
    height: 20px;
    margin: 20px auto;
    font-size: 16px;
    color: #00744c;
    cursor: pointer;
  }
}
</style>
