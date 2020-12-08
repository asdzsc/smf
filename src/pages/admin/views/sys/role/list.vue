<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col style="padding-right:10px;">
          <a-button @click="add()" type="primary" icon="plus">新增</a-button>
          &nbsp;
          <a-button @click="delAll()" icon="delete" type="danger"
            >批量删除</a-button
          >
        </a-col>
        <a-col :span="5"
          ><a-input-search
            v-model="pagination.searchText"
            placeholder="关键字搜索"
            :loading="loading"
            @search="onSearch"
            enterButton
        /></a-col>
      </a-row>
    </div>
    <div>
      <a-table
        size="middle"
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
      >
        <template slot="roleType" slot-scope="record">
          {{ record === "sys" ? "系统数据" : "普通数据" }}
        </template>
        <template slot="action" slot-scope="record">
          <a-button
            title="编辑"
            icon="edit"
            shape="round"
            type="primary"
            size="small"
            :disabled="record.roleType === 'sys' ? true : false"
            @click="edit(record)"
          />
          &nbsp;
          <a-button
            title="删除"
            icon="delete"
            shape="round"
            type="danger"
            size="small"
            :disabled="record.roleType === 'sys' ? true : false"
            @click="del([record.id])"
          />
        </template>
      </a-table>
      <role-info ref="roleInfo" @onClose="roleInfoClose"></role-info>
    </div>
  </a-card>
</template>

<script>
// import moment from "moment";
import { getRoleList, delRole } from "@/pages/admin/api/sys/sysrole";

export default {
  name: "role-list",
  components: {
    roleInfo: () => import("@/pages/admin/views/sys/role/info")
  },
  data() {
    return {
      list: [],
      selectedRowKeys: [],
      pagination: {
        searchText: "",
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
          title: "角色名称",
          dataIndex: "name"
        },
        {
          title: "角色类别",
          dataIndex: "roleType",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "roleType" }
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150,
          sorter: true
        },
        {
          title: "操作",
          dataIndex: "",
          width: 130,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onChange(pagination, filters, sorter) {
      // console.log("params", pagination, filters, sorter);
      this.pagination = Object.assign(this.pagination, pagination);
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
      getRoleList(pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    add() {
      this.$refs.roleInfo.loadData("添加角色", "");
    },
    edit(record) {
      this.$refs.roleInfo.loadData("编辑角色", record.id);
    },
    roleInfoClose(res) {
      if (res.code === 0) {
        this.onSearch();
      }
    },
    //批量删除
    delAll() {
      this.del(this.selectedRowKeys);
    },
    del(list) {
      if (list.length === 0) {
        this.$notification.warning({
          message: "提示",
          description: "请选择需要删除的数据"
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delRole({ ids: list }).then(res => {
            if (res.code === 0) {
              vm.onSearch();
            }
          });
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
</style>
