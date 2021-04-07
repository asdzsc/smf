<template>
  <a-card>
    <a-row>
      <a-col :span="4">
        <a-tree
          :treeData="treeData"
          :defaultSelectedKeys="selectedKeys"
          :expandedKeys="expandedKeys"
          @expand="onExpandTree"
          @select="onSelectTree"
        />
      </a-col>
      <a-col :span="20">
        <div class="operator">
          <a-row type="flex" justify="start">
            <a-col style="padding-right: 10px">
              <a-button
                @click="saveSort()"
                type="primary"
                icon="sort-descending"
              >
                保存排序
              </a-button>
              &nbsp;
              <a-button @click="add()" type="primary" icon="plus"
                >新增</a-button
              >
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
            <template slot="cover" slot-scope="record">
              <img
                :src="baseUrl + record"
                :onerror="defImg"
                @click="showImg(baseUrl + record)"
                class="fmImg"
              />
            </template>
            <template slot="newsTitle" slot-scope="record">
              <div style="line-height: 25px">
                <div style="font-size: 12px; color: #666666">
                  ERP标识：{{ record.erpGoodsId }}
                </div>
                <div style="font-size: 12px; color: #666666">
                  商品ID：{{ record.id }}
                </div>
                <div>
                  商品名称：
                  <span v-if="record.isTop === '1'" style="color: #ff4d4f">
                    【置顶】
                  </span>
                  {{ record.title }}
                </div>
                <div>
                  商品价格：<span style="color: #d54040">{{
                    goodsPriceText(record)
                  }}</span>
                  <span v-if="record.goodsType === '3'"> / 年</span>
                </div>
              </div>
            </template>
            <template slot="goodsType" slot-scope="record">
              {{ goodsTypeText(record.goodsType).text }}
            </template>
            <template slot="status" slot-scope="record">
              <a-switch
                checkedChildren="上架"
                unCheckedChildren="下架"
                :checked="record.status === '1' ? true : false"
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
        </div>
      </a-col>
    </a-row>

    <goodsInfo
      v-if="showInfo"
      :id="infoId"
      ref="goodsInfo"
      @onClose="infoClose"
    ></goodsInfo>
    <showImg
      v-if="showImgModal"
      ref="showImg"
      @onClose="showImgClose"
    ></showImg>
  </a-card>
</template>

<script>
import { getGoodsColumnList } from "@/pages/admin/api/shop/goodscolumn";
import {
  getGoodsList,
  setGoodsStatus,
  delGoods,
  saveGoodsSort,
} from "@/pages/admin/api/shop/goods";
import * as shop from "@/comment/dictionary";
import * as utils from "@/pages/admin/libs/utils";

export default {
  components: {
    showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
    goodsInfo: () => import("@/pages/admin/views/shop/goods/info"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      treeData: [],
      expandedKeys: [], //部门树默认展开顶级节点
      selectedKeys: [], //栏目默认选中节点
      list: [],
      selectedRowKeys: [],
      pagination: {
        columnId: "",
        goodsType: "",
        status: "",
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
          title: "图片",
          dataIndex: "cover",
          scopedSlots: {
            customRender: "cover",
          },
          width: 150,
        },
        {
          title: "标题",
          dataIndex: "",
          scopedSlots: {
            customRender: "newsTitle",
          },
        },
        {
          title: "栏目",
          dataIndex: "columnName",
          width: 200,
        },
        {
          title: "类别",
          dataIndex: "",
          scopedSlots: {
            customRender: "goodsType",
          },
          align: "center",
          width: 100,
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: {
            customRender: "status",
          },
          align: "center",
          width: 100,
        },
        {
          title: "排序↓",
          dataIndex: "",
          scopedSlots: {
            customRender: "sortId",
          },
          align: "center",
          width: 100,
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 130,
        },
        {
          title: "操作",
          dataIndex: "",
          width: 130,
          align: "center",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      showInfo: false,
      infoId: "",
      showImgModal: false,
    };
  },
  mounted() {
    this.pagination.columnId = this.$route.query.classId
      ? this.$route.query.classId
      : "";
    this.$nextTick(() => {
      if (this.pagination.columnId) {
        this.selectedKeys = [this.pagination.columnId];

        console.log(this.selectedKeys);
      }
    });
    this.getColumnList();
    this.getList();
  },
  methods: {
    getColumnList() {
      getGoodsColumnList({
        columnType: "1",
        status: "0",
      }).then((res) => {
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
            children: res.data.treeData,
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
      getGoodsList(pagination).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    goodsTypeText(goodsType) {
      return shop.goodsTypeText(goodsType);
    },
    changeSort(record) {
      var query = this.list.filter((x) => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    goodsPriceText(item) {
      return utils.goodsPriceText(item);
    },
    saveSort() {
      saveGoodsSort(this.list).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.getList();
        }
      });
    },
    setStatus(record) {
      this.$confirm({
        title: "确定要修改商品状态吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          var status = record.status === "2" ? "1" : "2";
          setGoodsStatus({
            id: record.id,
            status: status,
          }).then((res) => {
            if (res.code === 0) {
              record.status = status;
            }
          });
        },
        onCancel() {},
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
          description: "请选择需要删除的数据",
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delGoods({
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
    showImg(imgUrl) {
      this.showImgModal = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.showImg.loadData(imgUrl, [imgUrl]);
        }, 200);
      });
    },
    showImgClose() {
      this.showImgModal = false;
    },
  },
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
