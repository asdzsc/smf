<template>
  <div>
    <a-divider orientation="left">
      配置推荐
    </a-divider>
    <div>
      <div style="padding-bottom:10px;">
        <a-button
          @click="saveSort()"
          type="primary"
          icon="sort-ascending"
          size="small"
        >
          保存排序
        </a-button>
        &nbsp;
        <a-button
          @click="openSelLive()"
          type="primary"
          icon="plus"
          size="small"
        >
          选择推荐
        </a-button>
      </div>
      <a-table
        :rowKey="record => record.id"
        :columns="columns"
        :dataSource="list"
        bordered
        size="small"
        :pagination="false"
        :scroll="{ y: 380 }"
      >
        <template slot="img" slot-scope="record">
          <img :src="baseUrl + record" :onerror="defImg" class="fmImg" />
        </template>
        <template slot="liveTitle" slot-scope="record">
          <div>
            <span v-if="record.isTop === '1'" style="color:red;">[置顶]</span>
            &nbsp;
            {{ record.title }}
          </div>
        </template>

        <template slot="sort_id" slot-scope="record">
          <a-input-number
            :min="0"
            v-model="record.sort_id"
            @change="changeSort(record)"
          />
        </template>

        <template slot="action" slot-scope="record">
          <a-button
            title="删除"
            icon="delete"
            shape="round"
            type="danger"
            size="small"
            @click="del(record.id)"
          />
        </template>
      </a-table>
    </div>

    <selLive ref="selLive" @return="selLiveList"></selLive>
  </div>
</template>
<script>
export default {
  name: "tabInfoRecommend",
  components: {
    selLive: () => import("@/pages/admin/views/live/room/components/sel-live")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      columns: [
        {
          title: "封面图",
          dataIndex: "img",
          scopedSlots: { customRender: "img" },
          width: 100
        },
        {
          title: "标题",
          dataIndex: "",
          scopedSlots: { customRender: "liveTitle" }
        },
        {
          title: "排序",
          dataIndex: "",
          scopedSlots: { customRender: "sort_id" },
          align: "center",
          width: 120
        },
        {
          title: "操作",
          dataIndex: "",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 130
        }
      ]
    };
  },
  mounted() {},
  methods: {
    setRecommendList(recommendList) {
      this.list = recommendList || [];
    },
    getRecommendList() {
      return this.list;
    },
    //保存排序
    saveSort() {
      this.list.sort(function(a, b) {
        return a.sort_id - b.sort_id;
      });
    },
    openSelLive() {
      this.$refs.selLive.loadData();
    },
    selLiveList(list) {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        var query = this.list.filter(x => x.id === element.id);
        if (query.length === 0) {
          this.list.push(element);
        }
      }
      this.saveSort();
    },
    changeSort(record) {
      var query = this.list.filter(x => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sort_id = record.sort_id;
      }
    },
    del(nid) {
      this.list = this.list.filter(x => x.id !== nid);
    }
  }
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
</style>
