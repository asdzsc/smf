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
  delNewsColumn
} from "@/pages/admin/api/news/news";

export default {
  name: "module-list",
  components: {
    newsColumnInfo: () => import("@/pages/admin/views/news/column/info")
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
          width: 250
        },
        {
          title: "栏目ID",
          dataIndex: "id",
          width: 165
        },
        {
          title: "栏目全路径",
          dataIndex: "mergerName"
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: { customRender: "status" },
          align: "center",
          width: 100
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
      ],
      showInfo: false,
      infoId: "",
      infoPid: ""
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
      getNewsColumnList({ columnType: this.columnType }).then(res => {
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
          setNewsColumnStatus({ id: record.id, status: status }).then(res => {
            if (res.code === 0) {
              record.status = status;
            }
          });
        },
        onCancel() {}
      });
    },
    changeSort(record) {
      var query = this.newsColumnList.filter(x => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    saveSort() {
      saveNewsColumnSort(this.newsColumnList).then(res => {
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
          description: "请选择需要删除的数据"
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delNewsColumn({ ids: list }).then(res => {
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
