<template>
  <div class="memberLeft">
    <div
      v-for="item in list"
      :key="item.title"
      @click="openUrl(item.url)"
      class="item"
      :class="{ activity: ckMenu(item.url) }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "网上纪念馆",
<<<<<<< HEAD
          url: "/mark/grjn",
        },
        {
          title: "我的纪念馆",
          url: "/member/grjnUser",
        },
        {
          title: "族谱馆",
          url: "/member/zpg",
        },
        {
          title: "落葬人信息",
          url: "/member/cemetery/buryPersonList",
        },
        {
          title: "墓址列表",
          url: "/member/cemetery/cemeteryList",
        },
        {
          title: "墓地订单",
          url: "/member/cemetery/cemeteryOrder",
        },
        {
          title: "手续办理",
          url: "/member/cemetery/formalities",
        },
        {
          title: "服务订单",
          url: "/shop/order",
        },
        {
          title: "消息通知",
          url: "/member/sys-message-list",
        },
        {
          title: "账户设置",
          url: "/member/userInfo",
        },
      ],
=======
          url: "/mark/home"
        },
        {
          title: "落葬人信息",
          url: ""
        },
        {
          title: "手续办理",
          url: ""
        },
        {
          title: "服务订单",
          url: "/shop/order"
        },
        {
          title: "墓地订单",
          url: ""
        },
        {
          title: "消息通知",
          url: "/member/sys-message-list"
        },
        {
          title: "墓地列表",
          url: ""
        },
        {
          title: "账户设置",
          url: "/member/userInfo"
        }
      ]
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {},
  methods: {
    ckMenu(murl) {
      if (!murl) {
        return false;
      }
      if (this.$route.path.indexOf(murl) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    openUrl(url) {
      if (url) {
        this.$router.push(url);
      }
<<<<<<< HEAD
    },
  },
=======
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
<<<<<<< HEAD
@themeColor: #004930;
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
.memberLeft {
  .item {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    color: #333333;
    cursor: pointer;

    &.activity {
<<<<<<< HEAD
      background-color: @themeColor;
      color: #ffffff;
    }

    &:hover {
      background-color: @themeColor;
=======
      background-color: #004930;
      color: #ffffff;
    }
    &:hover {
      background-color: #004930;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      color: #ffffff;
    }
  }
}
</style>
