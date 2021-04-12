<template>
  <div class="tabsCont">
    <van-tabs
      v-model="tabId"
      @click="tabClick"
      color="#004930"
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
<<<<<<< HEAD
      <div style="background-color: #ffffff; height: 0.2rem"></div>
=======
      <div style="background-color: #FFFFFF; height: 0.2rem;"></div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
          title: "公司简介",
<<<<<<< HEAD
          url: "/gywm/gsjj",
        },
        {
          title: "公司荣誉",
          url: "/gywm/gsry",
        },
        // {
        //   title: "品牌故事",
        //   url: "/gywm/ppgs"
        // },
        {
          title: "品牌文化",
          url: "/gywm/ppwh",
        },
        {
          title: "企业视频",
          url: "/gywm/qysp",
        },
      ],
=======
          url: "/gywm/gsjj"
        },
        {
          title: "公司荣誉",
          url: "/gywm/gsry"
        },
        {
          title: "品牌故事",
          url: "/gywm/ppgs"
        },
        {
          title: "品牌文化",
          url: "/gywm/ppwh"
        },
        {
          title: "企业视频",
          url: "/gywm/qysp"
        }
      ]
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this.tabId = this.ckMenu();
  },
  methods: {
    ckMenu() {
      var url = this.$route.path;
<<<<<<< HEAD
      var query = this.list.filter((x) => {
=======
      var query = this.list.filter(x => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
      var query = this.list.filter((x) => x.title === title);
=======
      var query = this.list.filter(x => x.title === title);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      if (query.length > 0) {
        var item = query[0];
        if (item.url) {
          this.$router.push(item.url);
        }
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
.tabsCont {
  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
