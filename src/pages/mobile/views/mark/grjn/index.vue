<template>
  <div>
    <def
<<<<<<< HEAD
      v-if="(!model.templateId || model.templateId === '0') && !loading"
=======
      v-if="!model.templateId || model.templateId === '0'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></def>
    <!-- 辛亥英烈 -->
    <grjn01
<<<<<<< HEAD
      v-else-if="model.templateId === '491872340996337665' && !loading"
=======
      v-else-if="model.templateId === '491872340996337665'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn01>
    <!-- 抗战英雄 -->
    <grjn02
<<<<<<< HEAD
      v-else-if="model.templateId === '491875274498977792' && !loading"
=======
      v-else-if="model.templateId === '491875274498977792'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn02>
    <!-- 红色先烈 -->
    <grjn03
<<<<<<< HEAD
      v-else-if="model.templateId === '491877416861380608' && !loading"
=======
      v-else-if="model.templateId === '491877416861380608'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn03>
    <!-- 共和国卫士 -->
    <grjn04
<<<<<<< HEAD
      v-else-if="model.templateId === '492120168356458496' && !loading"
=======
      v-else-if="model.templateId === '492120168356458496'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn04>
    <!-- 爱心天使 -->
    <grjn05
<<<<<<< HEAD
      v-else-if="model.templateId === '492123533807267840' && !loading"
=======
      v-else-if="model.templateId === '492123533807267840'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn05>
    <!-- 文学巨匠 -->
    <grjn06
<<<<<<< HEAD
      v-else-if="model.templateId === '492123993989525504' && !loading"
=======
      v-else-if="model.templateId === '492123993989525504'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn06>
    <!-- 艺术大师 -->
    <grjn07
<<<<<<< HEAD
      v-else-if="model.templateId === '492124529899941889' && !loading"
=======
      v-else-if="model.templateId === '492124529899941889'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn07>
    <!-- 白衣天使 -->
    <grjn08
<<<<<<< HEAD
      v-else-if="model.templateId === '492126737685098497' && !loading"
=======
      v-else-if="model.templateId === '492126737685098497'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn08>
    <!-- 辛勤园丁 -->
    <grjn09
<<<<<<< HEAD
      v-else-if="model.templateId === '492128198536015872' && !loading"
=======
      v-else-if="model.templateId === '492128198536015872'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn09>
    <!-- 钢铁英雄 -->
    <grjn10
<<<<<<< HEAD
      v-else-if="model.templateId === '492129719520669696' && !loading"
=======
      v-else-if="model.templateId === '492129719520669696'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn10>
    <!-- 不凡人生 -->
    <grjn11
<<<<<<< HEAD
      v-else-if="model.templateId === '492130170567733248' && !loading"
=======
      v-else-if="model.templateId === '492130170567733248'"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      :detailModal="this.model"
    ></grjn11>
  </div>
</template>

<script>
import { getMemoryInfo } from "@/pages/mobile/api/mark.js";
export default {
  components: {
    def: () => import("@/pages/mobile/views/mark/grjn/grjn-00.vue"),
    grjn01: () => import("@/pages/mobile/views/mark/grjn/grjn-01.vue"),
    grjn02: () => import("@/pages/mobile/views/mark/grjn/grjn-02.vue"),
    grjn03: () => import("@/pages/mobile/views/mark/grjn/grjn-03.vue"),
    grjn04: () => import("@/pages/mobile/views/mark/grjn/grjn-04.vue"),
    grjn05: () => import("@/pages/mobile/views/mark/grjn/grjn-05.vue"),
    grjn06: () => import("@/pages/mobile/views/mark/grjn/grjn-06.vue"),
    grjn07: () => import("@/pages/mobile/views/mark/grjn/grjn-07.vue"),
    grjn08: () => import("@/pages/mobile/views/mark/grjn/grjn-08.vue"),
    grjn09: () => import("@/pages/mobile/views/mark/grjn/grjn-09.vue"),
    grjn10: () => import("@/pages/mobile/views/mark/grjn/grjn-10.vue"),
    grjn11: () => import("@/pages/mobile/views/mark/grjn/grjn-11.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
<<<<<<< HEAD
      loading: true,
      model: {
        id: "",
=======
      loading: false,
      model: {
        id: "1",
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
        templateId: "",
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
<<<<<<< HEAD
        templateName: "",
=======
        templateName: "null",
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      },
    };
  },
  mounted() {
    this._getMemoryInfo();
  },
  methods: {
    // 个人纪念馆详情
    _getMemoryInfo() {
<<<<<<< HEAD
      const id = this.$route.query.id;
      const psid = this.$route.query.psid;
      this.loading = true;
      getMemoryInfo({ id: id, psid: psid }).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
        } else if (res.code === -2) {
          this.$router.push({
            path: "/mark/index",
          });
=======
      const id = this.$route.params.id;
      this.loading = true;
      getMemoryInfo({ id: id }).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
