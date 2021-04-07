<template>
  <div class="titleCont">
    <div class="titleCont1200">
      <div class="title">
        {{ title }}
        <div class="title-line"></div>
      </div>
      <div class="title2">
        <template v-for="item in list">
          <div
            :key="item.name"
            v-if="title !== item.name"
            class="title2-item"
            @click="openUrl(item.url)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      list: [
        {
          name: "免费上门服务",
          url: "/zxfw/mfsmfw"
        },
        {
          name: "人生纪念服务",
          url: "/zxfw/rsjnfw"
        },
        {
          name: "安葬礼仪服务",
          url: "/zxfw/azlyfw"
        },
        {
          name: "旧墓换新服务",
          url: "/zxfw/jmhxfw"
        },
        // {
        //   name: "配饰换新服务",
        //   url: "/zxfw/pshxfw"
        // },
        {
          name: "墓碑保洁服务",
          url: "/zxfw/mbbjfw"
        }
      ]
    };
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
.titleCont {
  height: 100px;
  border-bottom: 1px solid #f0f0f0;
  .titleCont1200 {
    display: flex;
    height: 100px;
    width: 1200px;
    margin: auto;
    .title {
      width: 216px;
      font-size: 36px;
      color: #004a30;
      padding-top: 30px;
      position: relative;
      .title-line {
        position: absolute;
        bottom: 0px;
        width: 60px;
        height: 6px;
        background-color: #004a30;
      }
    }
    .title2 {
      text-align: right;
      font-size: 18px;
      color: #666666;
      padding-top: 53px;
      font-weight: 400;
      flex: 1;
      .title2-item {
        display: -webkit-inline-box;
        padding-right: 20px;
        cursor: pointer;
        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
