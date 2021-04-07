<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col style="padding-right:10px;">
          <a-button @click="saveSort()" type="primary" icon="sort-ascending"
            >保存排序</a-button
          >
          &nbsp;
          <a-button @click="add()" type="primary" icon="plus">新增</a-button>
          &nbsp;
          <a-button @click="delAll()" icon="delete" type="danger"
            >批量删除</a-button
          >
        </a-col>
      </a-row>
    </div>
    <div>
      <a-table
        size="middle"
        bordered
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="list"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :loading="loading"
        :pagination="false"
      >
        <template slot="sortId" slot-scope="record">
          <a-input-number
            :min="0"
            v-model="record.sortId"
            @change="changeSort(record)"
          />
        </template>
        <template slot="action" slot-scope="record">
          <a-button
            title="编辑"
            icon="edit"
            shape="round"
            type="primary"
            size="small"
            @click="edit(record)"
          />
          &nbsp;
          <a-button
            title="添加子菜单"
            icon="plus"
            shape="round"
            type="primary"
            size="small"
            @click="add(record.id)"
          />
          &nbsp;
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
      <module-info ref="moduleInfo" @onClose="moduleInfoClose"></module-info>
    </div>
  </a-card>
</template>

<script>
import { getModuleList, saveModuleSort, delModule } from "@/pages/admin/api/sys/sysmodule";

export default {
  name: "module-list",
  components: {
    moduleInfo: () => import("@/pages/admin/views/sys/module/info")
  },
  data() {
    return {
      list: [],
      sysModuleList: [],
      selectedRowKeys: [],
      loading: false,
      columns: [
        {
          title: "菜单名称",
          dataIndex: "name",
          width: 250
        },
        {
          title: "菜单全路径",
          dataIndex: "mergerName"
        },
        {
          title: "URL",
          dataIndex: "url"
        },
        {
          title: "排序",
          dataIndex: "",
          scopedSlots: { customRender: "sortId" },
          align: "center",
          width: 100
        },
        {
          title: "操作",
          dataIndex: "",
          width: 150,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
      getModuleList({ showPermission: false }).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.treeData;
          this.sysModuleList = res.data.list;
        }
      });
    },
    changeSort(record) {
      var query = this.sysModuleList.filter(x => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    saveSort() {
      saveModuleSort(this.sysModuleList).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.getList();
        }
      });
    },
    add(pid) {
      this.$refs.moduleInfo.loadData("添加模块", "", pid);
    },
    edit(record) {
      this.$refs.moduleInfo.loadData("编辑模块", record.id, "");
    },
    moduleInfoClose(res) {
      if (res.code === 0) {
        this.getList();
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
          delModule({ ids: list }).then(res => {
            if (res.code === 0) {
              vm.getList();
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
