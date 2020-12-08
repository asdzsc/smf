<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col style="padding-right:10px;">
          <a-button @click="saveSort()" type="primary" icon="sort-ascending">
            保存排序
          </a-button>
          &nbsp;
          <a-button @click="add()" type="primary" icon="plus">新增</a-button>
          &nbsp;
          <a-button @click="delAll()" icon="delete" type="danger"
            >批量删除</a-button
          >
        </a-col>
        <a-col :span="5">
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
        <template slot="img" slot-scope="record">
          <img :src="baseUrl + record" :onerror="defImg" class="fmImg" />
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
      <live-banner-info ref="info" @onClose="infoClose"></live-banner-info>
    </div>
  </a-card>
</template>

<script>
import {
  getLiveBannerList,
  delLiveBanner,
  saveLiveBannerSort
} from "@/pages/admin/api/live/livebanner";

export default {
  name: "banner-list",
  components: {
    liveBannerInfo: () => import("@/pages/admin/views/live/banner/info")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      selectedRowKeys: [],
      pagination: {
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
          title: "图片",
          dataIndex: "img",
          scopedSlots: { customRender: "img" },
          width: 150
        },
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "链接",
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
      getLiveBannerList(pagination).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    changeSort(record) {
      var query = this.list.filter(x => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    saveSort() {
      saveLiveBannerSort(this.list).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.getList();
        }
      });
    },
    add() {
      this.$refs.info.loadData("添加轮播图", "");
    },
    edit(record) {
      this.$refs.info.loadData("编辑轮播图", record.id);
    },
    infoClose(res) {
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
          delLiveBanner({ ids: list }).then(res => {
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
.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
</style>
