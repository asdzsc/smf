<template>
  <div style="min-height:100%">
    <myhead />
    <router-view class="content" />
    <myfoot />
  </div>
</template>

<script>
// import $ from "jquery";

import myhead from "@/pages/pc/components/myhead.vue";
import myfoot from "@/pages/pc/components/myfoot.vue";
export default {
  name: "index",
  components: {
    myhead,
    myfoot
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
// .index {
//   display: flex;
//   flex-direction: column;
//   .content {
//     flex: 1;
//   }
// }
</style>
