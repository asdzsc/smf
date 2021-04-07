<template>
  <div class="tabsCont">
    <van-tabs
      v-model="tabId"
      @click="tabClick"
      color="#004930"
	   class="active"
      title-active-color="#004930"
      title-inactive-color="#333333"
      :ellipsis="false"
    >
      <van-tab
        v-for="item in list"
        :key="item.title"
        :title="item.title"
        :name="item.title"
        :title-style="{ fontWeight: 700 }"
      >
      </van-tab>
      <div style="background-color: #FFFFFF; height: 0.2rem;"></div>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabId: "",
      list: [
        {
          title: "公告中心",
          url: "/xwzx/ggzx"
        },
        {
          title: "新闻动态",
          url: "/xwzx/xwdt"
        },
        {
          title: "招标广告",
          url: "/xwzx/zbgg"
        }
      ]
    };
  },
  mounted() {
    this.tabId = this.ckMenu();
  },
  methods: {
    ckMenu() {
      var url = this.$route.path;
      var query = this.list.filter(x => {
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
    tabClick(name, title) {
      var query = this.list.filter(x => x.title === title);
      if (query.length > 0) {
        var item = query[0];
        if (item.url) {
          this.$router.push(item.url);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tabsCont {
  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
