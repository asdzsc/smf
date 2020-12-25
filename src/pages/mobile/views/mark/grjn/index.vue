<template>
  <div>
    <def
      v-if="!model.templateId || model.templateId === '0'"
      :detailModal="this.model"
    ></def>
    <!-- 辛亥英烈 -->
    <grjn01
      v-else-if="model.templateId === '491872340996337665'"
      :detailModal="this.model"
    ></grjn01>
    <!-- 抗战英雄 -->
    <grjn02
      v-else-if="model.templateId === '491875274498977792'"
      :detailModal="this.model"
    ></grjn02>
    <!-- 红色先烈 -->
    <grjn03
      v-else-if="model.templateId === '491877416861380608'"
      :detailModal="this.model"
    ></grjn03>
    <!-- 共和国卫士 -->
    <grjn04
      v-else-if="model.templateId === '492120168356458496'"
      :detailModal="this.model"
    ></grjn04>
    <!-- 爱心天使 -->
    <grjn05
      v-else-if="model.templateId === '492123533807267840'"
      :detailModal="this.model"
    ></grjn05>
    <!-- 文学巨匠 -->
    <grjn06
      v-else-if="model.templateId === '492123993989525504'"
      :detailModal="this.model"
    ></grjn06>
    <!-- 艺术大师 -->
    <grjn07
      v-else-if="model.templateId === '492124529899941889'"
      :detailModal="this.model"
    ></grjn07>
    <!-- 白衣天使 -->
    <grjn08
      v-else-if="model.templateId === '492126737685098497'"
      :detailModal="this.model"
    ></grjn08>
    <!-- 辛勤园丁 -->
    <grjn09
      v-else-if="model.templateId === '492128198536015872'"
      :detailModal="this.model"
    ></grjn09>
    <!-- 钢铁英雄 -->
    <grjn10
      v-else-if="model.templateId === '492129719520669696'"
      :detailModal="this.model"
    ></grjn10>
    <!-- 不凡人生 -->
    <grjn11
      v-else-if="model.templateId === '492130170567733248'"
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
        templateName: "null",
      },
    };
  },
  mounted() {
    this._getMemoryInfo();
  },
  methods: {
    // 个人纪念馆详情
    _getMemoryInfo() {
      const id = this.$route.params.id;
      this.loading = true;
      getMemoryInfo({ id: id }).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
