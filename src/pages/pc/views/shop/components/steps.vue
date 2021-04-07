<template>
  <div class="steps">
    <div
      v-for="item in stepsList"
      :key="item.key"
      @click="openUrl(item.url)"
      class="stepsItem"
      :class="{
        checked: num === item.num,
        half: item.num < num,
        pointer: item.url
      }"
    >
      <div class="line"></div>
      <div class="stepsNum">{{ item.num }}</div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      type: "shop",
      list: [
        {
          num: 1,
          title: "我的购物车",
          url: "/shop/cart"
        },
        {
          num: 2,
          title: "核对订单信息",
          url: ""
        },
        {
          num: 3,
          title: "成功提交订单",
          url: ""
        }
      ],
      list2: [
        {
          num: 1,
          title: "核对订单信息",
          url: ""
        },
        {
          num: 2,
          title: "成功提交订单",
          url: ""
        }
      ]
    };
  },
  computed: {
    stepsList() {
      if (this.type === "shop") {
        return this.list2;
      } else {
        return this.list;
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type ? this.$route.query.type : "shop";
  },
  methods: {
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.steps {
  display: flex;

  .stepsItem {
    width: 120px;
    height: 60px;
    position: relative;

    .line {
      position: absolute;
      z-index: 1;
      top: 12px;
      width: 120px;
      height: 6px;
      background-color: #ebebeb;
    }

    .stepsNum {
      position: absolute;
      z-index: 2;
      top: 0px;
      left: 45px;
      width: 30px;
      height: 30px;
      background-color: #ebebeb;
      font-size: 16px;
      font-weight: 700;
      line-height: 30px;
      color: #ffffff;
      border-radius: 50%;
      text-align: center;
    }

    .title {
      position: absolute;
      z-index: 2;
      bottom: 0px;
      width: 120px;
      text-align: center;
      font-size: 14px;
      color: #ebebeb;
    }

    &.checked {
      .line {
        background-color: #004930;
      }

      .stepsNum {
        background-color: #004930;
      }

      .title {
        color: #004930;
      }
    }

    &.half {
      opacity: 0.7;

      .line {
        background-color: #004930;
      }

      .stepsNum {
        background-color: #004930;
      }

      .title {
        color: #004930;
      }
    }

    &.pointer {
      cursor: pointer;
    }
  }
}
</style>
