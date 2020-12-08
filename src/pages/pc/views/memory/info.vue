<template>
  <div v-html="html"></div>
</template>
<script>
import Vue from "vue/dist/vue.esm.js";
import { templateInfo } from "@/pages/pc/api/memory";

export default {
  data() {
    return {
      html: ""
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      templateInfo({ id: "451202625284788224" }).then(res => {
        if (res.code === 0) {
          this.html = res.data.template;
          this.loadTemplate();
        }
      });
    }, 200);
  },
  methods: {
    loadTemplate() {
      var vm = this;
      this.$nextTick(() => {
        new Vue({
          el: "#appInfo",
          data: {
            model: {
              name: "张三"
            }
          },
          methods: {
            msg(cont) {
              vm.$notification["error"]({
                message: "提示",
                description: cont
              });
            }
          }
        });
      });
    }
  }
};
</script>
