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
<<<<<<< HEAD
        :rowKey="(record) => record.id"
        :dataSource="list"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
=======
        :rowKey="record => record.id"
        :dataSource="list"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }"
        :loading="loading"
        :pagination="false"
      >
        <template slot="status" slot-scope="record">
          <a-switch
            checkedChildren="显示"
            unCheckedChildren="隐藏"
            :checked="record.status === '0' ? true : false"
            @change="setStatus(record)"
          />
        </template>
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
            title="添加子栏目"
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
      <newsColumnInfo
        v-if="showInfo"
        :id="infoId"
        :pid="infoPid"
        :columnType="columnType"
        ref="newsColumnInfo"
        @onClose="infoClose"
      ></newsColumnInfo>
    </div>
  </a-card>
</template>

<script>
import {
  getNewsColumnList,
  setNewsColumnStatus,
  saveNewsColumnSort,
<<<<<<< HEAD
  delNewsColumn,
=======
  delNewsColumn
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
} from "@/pages/admin/api/news/news";

export default {
  name: "module-list",
  components: {
<<<<<<< HEAD
    newsColumnInfo: () => import("@/pages/admin/views/news/column/info"),
=======
    newsColumnInfo: () => import("@/pages/admin/views/news/column/info")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      columnType: "1",
      list: [],
      newsColumnList: [],
      selectedRowKeys: [],
      loading: false,
      columns: [
        {
          title: "栏目名称",
          dataIndex: "name",
<<<<<<< HEAD
          width: 250,
=======
          width: 250
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "栏目ID",
          dataIndex: "id",
<<<<<<< HEAD
          width: 165,
        },
        {
          title: "栏目全路径",
          dataIndex: "mergerName",
=======
          width: 165
        },
        {
          title: "栏目全路径",
          dataIndex: "mergerName"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: { customRender: "status" },
          align: "center",
<<<<<<< HEAD
          width: 100,
=======
          width: 100
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "排序",
          dataIndex: "",
          scopedSlots: { customRender: "sortId" },
          align: "center",
<<<<<<< HEAD
          width: 100,
=======
          width: 100
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "操作",
          dataIndex: "",
          width: 150,
          align: "center",
<<<<<<< HEAD
          scopedSlots: { customRender: "action" },
        },
      ],
      showInfo: false,
      infoId: "",
      infoPid: "",
=======
          scopedSlots: { customRender: "action" }
        }
      ],
      showInfo: false,
      infoId: "",
      infoPid: ""
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  activated() {
    this.getList();
  },
  mounted() {
    if (this.$route.query.type) {
      this.columnType = this.$route.query.type;
    }
    this.getList();
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
<<<<<<< HEAD
      getNewsColumnList({ columnType: this.columnType }).then((res) => {
=======
      getNewsColumnList({ columnType: this.columnType }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.treeData;
          this.newsColumnList = res.data.list;
        }
      });
    },
    setStatus(record) {
      this.$confirm({
        title: "确定要修改帐号状态吗?",
        content: "",
        onOk() {
          var status = record.status === "0" ? "1" : "0";
<<<<<<< HEAD
          setNewsColumnStatus({ id: record.id, status: status }).then((res) => {
=======
          setNewsColumnStatus({ id: record.id, status: status }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            if (res.code === 0) {
              record.status = status;
            }
          });
        },
<<<<<<< HEAD
        onCancel() {},
      });
    },
    changeSort(record) {
      var query = this.newsColumnList.filter((x) => {
=======
        onCancel() {}
      });
    },
    changeSort(record) {
      var query = this.newsColumnList.filter(x => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    saveSort() {
<<<<<<< HEAD
      saveNewsColumnSort(this.newsColumnList).then((res) => {
=======
      saveNewsColumnSort(this.newsColumnList).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.getList();
        }
      });
    },
    add(pid) {
      this.showInfo = true;
      this.infoId = "";
      this.infoPid = pid;
    },
    edit(record) {
      this.showInfo = true;
      this.infoId = record.id;
      this.infoPid = "";
    },
    infoClose(res) {
      this.$nextTick(() => {
        this.showInfo = false;
      });
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
<<<<<<< HEAD
          description: "请选择需要删除的数据",
=======
          description: "请选择需要删除的数据"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
<<<<<<< HEAD
          delNewsColumn({ ids: list }).then((res) => {
=======
          delNewsColumn({ ids: list }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            if (res.code === 0) {
              vm.getList();
            }
          });
        },
<<<<<<< HEAD
        onCancel() {},
      });
    },
  },
=======
        onCancel() {}
      });
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
</style>
