<template>
  <div class="head">
    <div class="tabs">
      <div
        @click="openUrl('/gywm/gsjj')"
        class="tabItem"
        :class="{ actvit: this.name === '公司简介' }"
      >
        公司简介
      </div>
      <div
        @click="openUrl('/gywm/gsry')"
        class="tabItem"
        :class="{ actvit: this.name === '公司荣誉' }"
      >
        公司荣誉
      </div>
<<<<<<< HEAD
      <!-- <div
=======
      <div
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        @click="openUrl('/gywm/ppgs')"
        class="tabItem"
        :class="{ actvit: this.name === '品牌故事' }"
      >
        品牌故事
<<<<<<< HEAD
      </div> -->
=======
      </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <div
        @click="openUrl('/gywm/ppwh')"
        class="tabItem"
        :class="{ actvit: this.name === '品牌文化' }"
      >
        品牌文化
      </div>
      <div
        @click="openUrl('/gywm/qysp')"
        class="tabItem"
        :class="{ actvit: this.name === '企业视频' }"
      >
        企业视频
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default() {
        return "";
<<<<<<< HEAD
      },
    },
=======
      }
    }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ckAtvit(_name) {
      return this.name === _name;
    },
    openUrl(url) {
      this.$router.push(url);
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
.head {
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 6px 14px 1px rgba(0, 0, 0, 0.1);
  .tabs {
<<<<<<< HEAD
    width: 816px; //960px
=======
    width: 960px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    margin: auto;
    display: flex;
    .tabItem {
      width: 144px;
      margin-right: 60px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #666666;
      text-align: center;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
      &.actvit {
        color: #004930;
        border-bottom: 6px solid #004930;
      }
    }
  }
}
</style>
