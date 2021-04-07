<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col style="padding-right:10px;">
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
        <template slot="avatar" slot-scope="record">
          <img
            :src="getAvatar(record)"
            :onerror="defImg"
            :style="{ width: '40px', height: '40px' }"
          />
        </template>
        <template slot="gender" slot-scope="record">
          {{ getSex(record) }}
        </template>
        <template slot="action" slot-scope="record">
          <a-button
            title="删除"
            icon="delete"
            shape="round"
            type="danger"
            size="small"
            :disabled="record.adminType === 'sys' ? true : false"
            @click="del([record.id])"
          />
        </template>
      </a-table>
      <user-info ref="userInfo" @onClose="userInfoClose"></user-info>
    </div>
  </a-card>
</template>

<script>
import { getBannedList, delBanned } from "@/pages/admin/api/live/livebanned";

export default {
  name: "banned-list",
  components: {
    userInfo: () => import("@/pages/admin/views/member/user/info")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/usernull.png'`,
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
          title: "头像",
          dataIndex: "",
          scopedSlots: { customRender: "avatar" },
          align: "center",
          width: 100
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "到期时间",
          dataIndex: "bannedTime",
          align: "center",
          width: 150
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150
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
      getBannedList(pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    getAvatar(item) {
      if (item.avatar) {
        return item.avatar.indexOf("http") === 0
          ? item.avatar
          : this.baseUrl + item.avatar;
      } else {
        return "/img/admin/usernull.png";
      }
    },
    getSex(record) {
      if (record === "1") {
        return "男";
      } else if (record === "2") {
        return "女";
      } else {
        return "未知";
      }
    },
    add() {
      this.$refs.userInfo.loadData("添加管理员", "");
    },
    edit(record) {
      this.$refs.userInfo.loadData("编辑管理员", record.id);
    },
    userInfoClose(res) {
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
          delBanned({ ids: list }).then(res => {
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
