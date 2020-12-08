<template>
  <div class="mobile-index" style="min-height:100%">
    <myhead />
    <router-view class="mobile-content" />
    <myfoot />
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  components: {
    myhead: () => import("@/pages/mobile/components/myhead.vue"),
    myfoot: () => import("@/pages/mobile/components/myfoot.vue")
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
