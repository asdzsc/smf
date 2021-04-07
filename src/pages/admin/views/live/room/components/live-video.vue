<template>
  <a-modal
    title="直播视频"
    v-model="visible"
    width="860px"
    :bodyStyle="{ padding: '10px' }"
    :footer="null"
  >
    <a-table
      size="small"
      bordered
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :pagination="false"
      :loading="loading"
      :scroll="{ y: 600 }"
    >
      <template slot="expireTime" slot-scope="record">
        {{ expireTimeText(record) }}
      </template>
      <template slot="action" slot-scope="record">
        <a-button
          shape="round"
          type="primary"
          size="small"
          @click="downfile(record)"
        >
          <icon-font type="iconvideo1" style="font-size:16px; " />打开
        </a-button>
      </template>
    </a-table>
  </a-modal>
</template>
<script>
import { getliveMediaList } from "@/pages/admin/api/live/livelist";

export default {
  name: "live-video",
  data() {
    return {
      visible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      pagination: {
        id: ""
      },
      loading: false,
      columns: [
        {
          title: "文件名",
          dataIndex: "name"
        },
        {
          title: "创建日期",
          dataIndex: "createTime",
          align: "center",
          width: 150
        },
        {
          title: "有效时间",
          dataIndex: "expireTime",
          align: "center",
          scopedSlots: { customRender: "expireTime" },
          width: 150
        },
        {
          title: "操作",
          dataIndex: "",
          width: 140,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  mounted() {},
  methods: {
    getList() {
      this.loading = true;
      getliveMediaList(this.pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data;
        }
      });
    },
    expireTimeText(expireTime) {
      if (expireTime) {
        if (expireTime.indexOf("9999") === 0) {
          return "永久";
        } else {
          return expireTime;
        }
      }
      return "";
    },
    loadData(liveId) {
      this.visible = true;
      this.pagination.id = liveId;
      this.getList();
    },
    //下载视频
    downfile(item) {
      window.open(item.mediaUrl);
    }
  }
};
</script>
<style lang="less" scoped></style>
