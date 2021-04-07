<template>
  <div class="mobile-index" style="min-height: 100%">
    <router-view class="mobile-content" v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
export default {
  components: {},
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
