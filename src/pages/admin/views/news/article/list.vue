<template>
  <a-card>
    <a-row>
      <a-col :span="4">
        <a-tree
          :treeData="treeData"
          :expandedKeys="expandedKeys"
          @expand="onExpandTree"
          @select="onSelectTree"
        />
      </a-col>
      <a-col :span="20">
        <div class="operator">
          <a-row type="flex" justify="start">
<<<<<<< HEAD
            <a-col style="padding-right: 10px">
              <a-button @click="wx()" type="primary" icon="plus"
                >微信抓取</a-button
              >
              &nbsp;
=======
            <a-col style="padding-right:10px;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              <a-button @click="add()" type="primary" icon="plus"
                >新增</a-button
              >
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
<<<<<<< HEAD
            :rowKey="(record) => record.id"
=======
            :rowKey="record => record.id"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            :dataSource="list"
            :pagination="pagination"
            :rowSelection="{
              selectedRowKeys: selectedRowKeys,
<<<<<<< HEAD
              onChange: onSelectChange,
=======
              onChange: onSelectChange
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            }"
            :loading="loading"
            @change="onChange"
          >
            <template slot="newsTitle" slot-scope="record">
<<<<<<< HEAD
              <span v-if="record.isTop === '1'" style="color: #ff4d4f">
=======
              <span v-if="record.isTop === '1'" style="color:#ff4d4f;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
                【置顶】
              </span>
              {{ record.title }}
            </template>
            <template slot="status" slot-scope="record">
              <a-switch
                checkedChildren="已发布"
                unCheckedChildren="待发布"
                :checked="record.status === '1' ? true : false"
                @change="setStatus(record)"
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
          <articleInfo
            v-if="showInfo"
            :id="infoId"
            ref="roleInfo"
            @onClose="infoClose"
          ></articleInfo>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import {
  getNewsColumnList,
  getNewsList,
  setNewsStatus,
<<<<<<< HEAD
  delNews,
=======
  delNews
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
} from "@/pages/admin/api/news/news";

export default {
  components: {
<<<<<<< HEAD
    articleInfo: () => import("@/pages/admin/views/news/article/info"),
=======
    articleInfo: () => import("@/pages/admin/views/news/article/info")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/usernull.png'`,
      treeData: [],
      expandedKeys: [], //部门树默认展开顶级节点
      list: [],
      selectedRowKeys: [],
      pagination: {
        columnId: "",
        articleType: "1", //新闻
        status: "",
        searchText: "",
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
<<<<<<< HEAD
        showTotal: (total) => {
          return `共 ${total} 条`;
        },
=======
        showTotal: total => {
          return `共 ${total} 条`;
        }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      },
      loading: false,
      columns: [
        {
          title: "标题",
          dataIndex: "",
<<<<<<< HEAD
          scopedSlots: { customRender: "newsTitle" },
=======
          scopedSlots: { customRender: "newsTitle" }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "栏目",
          dataIndex: "columnName",
<<<<<<< HEAD
          width: 200,
=======
          width: 200
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
          title: "发布时间",
          dataIndex: "publishTime",
          align: "center",
<<<<<<< HEAD
          width: 150,
=======
          width: 150
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
<<<<<<< HEAD
          width: 150,
=======
          width: 150
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "操作",
          dataIndex: "",
          width: 130,
          align: "center",
<<<<<<< HEAD
          scopedSlots: { customRender: "action" },
        },
      ],
      showInfo: false,
      infoId: "",
=======
          scopedSlots: { customRender: "action" }
        }
      ],
      showInfo: false,
      infoId: ""
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this.getColumnList();
    this.getList();
  },
  methods: {
    getColumnList() {
<<<<<<< HEAD
      getNewsColumnList({ columnType: "1" }).then((res) => {
=======
      getNewsColumnList({ columnType: "1" }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          // this.treeData = res.data.treeData;
          this.treeData.splice(0, 0, {
            id: "0",
            key: "0",
            value: "0",
            pid: "-1",
            title: "全部数据",
            name: "全部数据",
            isLeaf: false,
<<<<<<< HEAD
            children: res.data.treeData,
=======
            children: res.data.treeData
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          });
          this.expandedKeys = ["0"];
        }
      });
    },
    onExpandTree(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    onSelectTree(selectedKeys, event) {
      this.pagination.columnId = event.node.value;
      this.onSearch();
    },
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
<<<<<<< HEAD
      getNewsList(pagination).then((res) => {
=======
      getNewsList(pagination).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    setStatus(record) {
      this.$confirm({
        title: "确定要修改新闻状态吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          var status = record.status === "0" ? "1" : "0";
<<<<<<< HEAD
          setNewsStatus({ id: record.id, status: status }).then((res) => {
=======
          setNewsStatus({ id: record.id, status: status }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            if (res.code === 0) {
              record.status = status;
            }
          });
        },
<<<<<<< HEAD
        onCancel() {},
=======
        onCancel() {}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      });
    },
    add() {
      this.infoId = "";
      this.showInfo = true;
    },
    edit(record) {
      this.infoId = record.id;
      this.showInfo = true;
    },
    infoClose(res) {
      this.$nextTick(() => {
        this.showInfo = false;
      });
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
          delNews({ ids: list }).then((res) => {
=======
          delNews({ ids: list }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            if (res.code === 0) {
              vm.onSearch();
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
