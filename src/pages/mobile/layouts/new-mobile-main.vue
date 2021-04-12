<template>
<<<<<<< HEAD
  <div class="mobile-index" style="min-height: 100%">
    <myhead />
    <router-view class="mobile-content" v-wechat-title="$route.meta.title" />
=======
  <div class="mobile-index" style="min-height:100%">
    <myhead />
    <router-view class="mobile-content" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    <myfoot />
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  components: {
    myhead: () => import("@/pages/mobile/components/new-myhead.vue"),
    myfoot: () => import("@/pages/mobile/components/new-myfoot.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
