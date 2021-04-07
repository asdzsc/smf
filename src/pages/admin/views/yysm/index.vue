<template>
  <a-card>
    <a-row>
      <a-col :span="24">
        <div class="operator">
          <a-row type="flex" justify="start">
            <a-col style="padding-right:10px;">
              <a-button
                @click="exportFile()"
                :loading="loadingExportFile"
                type="primary"
              >
                <icon-font
                  type="icondownload"
                  style="font-size:16px;"
                />导出</a-button
              >
              &nbsp;
              <a-button @click="delAll()" icon="delete" type="danger"
                >批量删除</a-button
              >
            </a-col>
            <a-col style="padding-right:10px;">
              <a-range-picker
                :placeholder="['开始时间', '结束时间']"
                :allowClear="true"
                @change="onChangeDate"
                v-model="dtime"
                style="width:200px;"
              />
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
            :rowKey="(record) => record.id"
            :dataSource="list"
            :pagination="pagination"
            :rowSelection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
            :loading="loading"
            @change="onChange"
          >
            <template slot="dtime" slot-scope="record">
              {{ parseTime(record) }}
            </template>
          </a-table>
          <articleInfo
            v-if="showInfo"
            :id="infoId"
            @onClose="infoClose"
          ></articleInfo>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import {
  exportExcel,
  getYysmList,
  delYysm,
} from "@/pages/admin/api/yysm/index";
import * as utils from "@/pages/admin/libs/utils";
export default {
  components: {
    articleInfo: () => import("@/pages/admin/views/news/article/bwgq-info"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/usernull.png'`,
      loadingExportFile: false,
      dtime: [],
      list: [],
      selectedRowKeys: [],
      pagination: {
        startTime: "",
        endTime: "",
        searchText: "",
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => {
          return `共 ${total} 条`;
        },
      },
      loading: false,
      columns: [
        {
          title: "联系人",
          dataIndex: "contacts",
        },
        {
          title: "手机号",
          dataIndex: "mobile",
        },
        {
          title: "来园人数",
          dataIndex: "num",
        },
        {
          title: "车牌",
          dataIndex: "car",
        },
        {
          title: "来园时间",
          dataIndex: "dtime",
          scopedSlots: {
            customRender: "dtime",
          },
        },
        {
          title: "来园时段",
          dataIndex: "timeVal",
        },
        {
          title: "墓址",
          dataIndex: "cemetery",
        },
        {
          title: "备注",
          dataIndex: "remark",
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150,
        },
      ],
      showInfo: false,
      infoId: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onChangeDate(date, dateString) {
      this.pagination.startTime = dateString[0];
      this.pagination.endTime = dateString[1];
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
      getYysmList(pagination).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    //批量删除
    delAll() {
      this.del(this.selectedRowKeys);
    },
    del(list) {
      if (list.length === 0) {
        this.$notification.warning({
          message: "提示",
          description: "请选择需要删除的数据",
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delYysm({
            ids: list,
          }).then((res) => {
            if (res.code === 0) {
              vm.onSearch();
            }
          });
        },
        onCancel() {},
      });
    },
    exportFile() {
      this.loadingExportFile = true;
      exportExcel(this.pagination).then((res) => {
        this.loadingExportFile = false;
        if (res.code === 0) {
          var tempPage = window.open("", "_blank");
          tempPage.location = process.env.VUE_APP_BASE_URL + res.data;
        }
      });
    },
    parseTime(dtime) {
      return utils.parseTime(dtime, "{y}-{m}-{d}");
    },
  },
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
</style>
