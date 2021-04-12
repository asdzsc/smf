<template>
  <div v-html="html"></div>
</template>
<script>
import Vue from "vue/dist/vue.esm.js";
<<<<<<< HEAD
import { templateInfo } from "@/pages/mobile/api/memory";
=======
import { templateInfo } from "@/pages/pc/api/memory";
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95

export default {
  data() {
    return {
<<<<<<< HEAD
      html: "",
=======
      html: ""
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
<<<<<<< HEAD
      templateInfo({ id: "451202625284788224" }).then((res) => {
=======
      templateInfo({ id: "451202625284788224" }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
              name: "张三",
            },
=======
              name: "张三"
            }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          },
          methods: {
            msg(cont) {
              vm.$notification["error"]({
                message: "提示",
<<<<<<< HEAD
                description: cont,
              });
            },
          },
        });
      });
    },
  },
=======
                description: cont
              });
            }
          }
        });
      });
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>
