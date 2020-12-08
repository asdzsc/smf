<template>
  <a-modal
    title="选择辅播管理员"
    v-model="visible"
    width="860px"
    :bodyStyle="{ padding: '10px' }"
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
      <template slot="avatar" slot-scope="record">
        <img
          :src="getAvatar(record)"
          :onerror="defImg"
          :style="{ width: '40px', height: '40px' }"
        />
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { getLiveUserList } from "@/pages/admin/api/live/liveuser";
export default {
  name: "assistModal",
  data() {
    return {
      visible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      selectedRowKeys: [],
      pagination: {
        userType: "2", //用户类型 管理员用户
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
          title: "头像",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" },
          align: "center",
          width: 100
        },
        {
          title: "用户名",
          dataIndex: "username"
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "手机号",
          dataIndex: "mobile"
        },
        {
          title: "角色",
          dataIndex: "roleNames"
        }
      ]
    };
  },
  mounted() {},
  methods: {
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
            list.push(query[0]);
          }
        }
        this.$emit("return", list);
      }
      this.visible = false;
    },
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
      getLiveUserList(pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    getAvatar(record) {
      if (record) {
        if (record.indexOf("http") >= 0) {
          return record;
        } else {
          return this.baseUrl + record;
        }
      } else {
        return "/img/admin/usernull.png";
      }
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
