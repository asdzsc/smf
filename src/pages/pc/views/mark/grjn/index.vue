<template>
  <div>
    <def v-if="model.templateId === '' || model.templateId === '0'"></def>
    <grjn01 v-if="model.templateId === '491872340996337665'"></grjn01>
  </div>
</template>

<script>
import { templateInfo } from "@/pages/pc/api/memory.js";
export default {
  components: {
    def: () => import("@/pages/pc/views/mark/grjn/default.vue"),
    grjn01: () => import("@/pages/pc/views/mark/grjn/grjn-01.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {
        id: "1",
        createId: null,
        createDate: "2020-11-27 13:59:18",
        updateDate: "2020-12-02 10:02:51",
        deleteState: 0,
        columnIds: [""],
        name: "测试",
        gender: null,
        birthday: null,
        dieTime: null,
        birthdayAddress: null,
        dieAddress: null,
        photo: null,
        cover: null,
        phoneCover: null,
        bg: null,
        phoneBg: null,
        buryAddress: null,
        templateId: "491872340996337665",
        activateCode: null,
        mobiles: ["17612770945"],
        status: "0",
        memoryType: "0",
        sortId: 0,
        expireTime: null,
        intro: null,
        cont: null,
        columnName: null,
        mergerId: null,
        templateName: null,
      },
    };
  },
  mounted() {
    this._templateInfo();
  },
  methods: {
    _templateInfo() {
      this.loading = true;
      templateInfo(this.model).then((res) => {
        this.loading = false;
        console.log(res);
      });
    },
    openUrl(url) {
      if (url) {
        if (url.indexOf("http") >= 0) {
          window.location = url;
        } else {
          this.$router.push(url);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
