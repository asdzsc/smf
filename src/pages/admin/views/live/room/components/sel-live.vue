<template>
  <a-modal
    title="选择直播"
    v-model="visible"
    width="860px"
    :bodyStyle="{ padding: '10px' }"
    style="top: 10px;"
    @ok="handleOk"
  >
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col :span="10">
          <a-input-search
            v-model="pagination.searchText"
            placeholder="关键字搜索"
            :loading="loading"
            @search="onSearch"
            enterButton
          />
        </a-col>
      </a-row>
    </div>
    <a-table
      size="small"
      bordered
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :pagination="pagination"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :loading="loading"
      @change="onChange"
      :scroll="{ y: 600 }"
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
        <div>分类：{{ record.columnName }}</div>
        <div>标签：{{ tagsText(record.tags) }}</div>
        <div>状态：{{ stateText(record.state) }}</div>
      </template>
    </a-table>
  </a-modal>
</template>
<script>
import { getLiveList } from "@/pages/admin/api/live/livelist";
export default {
  name: "selLive",
  data() {
    return {
      visible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      selectedRowKeys: [],
      pagination: {
        isPlayback: "0",
        searchText: "",
        orderField: "",
        order: "",
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: total => {
          return `共 ${total} 条`;
        }
      },
      loading: false,
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
          title: "直播时间",
          dataIndex: "liveTime",
          align: "center",
          width: 150
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150
        }
      ]
    };
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    onChange(pagination, filters, sorter) {
      // console.log("params", pagination, filters, sorter);
      this.pagination = Object.assign(this.pagination, pagination);
      if (sorter.order) {
        this.pagination.orderField = sorter.field;
        this.pagination.order = sorter.order;
      } else {
        this.pagination.orderField = "";
        this.pagination.order = "";
      }
      this.getList();
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
      const pagination = { ...this.pagination };
      getLiveList(pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    tagsText(tag) {
      if (tag) {
        return tag.join(",");
      }
      return "";
    },
    stateText(state) {
      var states = ["待发布", "已发布", "开始直播", "直播结束", "直播间关闭"];
      if (state) {
        return states[state];
      } else {
        return "";
      }
    },
    loadData() {
      this.visible = true;
      this.getList();
    },
    handleOk() {
      if (this.selectedRowKeys.length > 0) {
        var list = new Array();
        for (let index = 0; index < this.selectedRowKeys.length; index++) {
          const liveId = this.selectedRowKeys[index];
          var query = this.list.filter(x => x.id === liveId);
          if (query.length > 0) {
            var item = query[0];
            this.$set(item, "sort_id", 0);
            list.push(query[0]);
          }
        }
        this.$emit("return", list);
      }

      this.visible = false;
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
