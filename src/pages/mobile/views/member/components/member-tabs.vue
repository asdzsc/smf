<template>
  <div class="tabsCont">
    <van-tabs
      v-model="tabId"
      @click="tabClick"
      color="#004930"
      title-active-color="#004930"
      title-inactive-color="#333333"
    >
      <van-tab
        v-for="item in list"
        :key="item.title"
        :title="item.title"
        :name="item.title"
        :badge="
          item.title == '消息通知' && sysMessageNum != 0 ? sysMessageNum : ''
        "
        :title-style="{ fontWeight: 700 }"
      >
      </van-tab>
      <div style="background-color: #FFFFFF; height: 0.2rem;"></div>
    </van-tabs>
  </div>
</template>

<script>
import { getSysMessageCount } from "@/pages/mobile/api/sysmessage";
export default {
  data() {
    return {
      tabId: "",
      show: false,
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
=======
          url: "/mark",
        },
        {
          title: "落葬人信息",
          url: "/cemetery/cemetery-info",
        },
        {
          title: "手续办理",
          url: "",
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "服务订单",
          url: "/shop/order",
        },
        {
<<<<<<< HEAD
=======
          title: "墓地订单",
          url: "",
        },
        {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          title: "消息通知",
          url: "/member/sys-message-list",
        },
        {
<<<<<<< HEAD
=======
          title: "墓地列表",
          url: "",
        },
        {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          title: "账户设置",
          url: "/member/userInfo",
        },
      ],
    };
  },
  computed: {
    sysMessageNum() {
      return this.$store.state.account.sysMessageNum;
    },
  },
  mounted() {
    this.tabId = this.ckMenu();
    this._getSysMessageCount();
  },
  methods: {
    ckMenu() {
      var url = this.$route.path;
      var query = this.list.filter((x) => {
        if (x.url && url.indexOf(x.url) >= 0) {
          return true;
        } else {
          return false;
        }
      });
      if (query.length > 0) {
        return query[0].title;
      } else {
        return "";
      }
    },
    _getSysMessageCount() {
      getSysMessageCount({
        isRead: "0",
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit("account/setSysMessageNum", res.data);
        }
      });
    },
    tabClick(name, title) {
      var query = this.list.filter((x) => x.title === title);
      if (query.length > 0) {
        var item = query[0];
        if (item.url) {
          this.$router.push(item.url);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabsCont {
  padding-bottom: 0.2rem;
  background-color: #f5f5f5;

  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
