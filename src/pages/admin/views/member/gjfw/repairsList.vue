<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
        <a-col style="padding-right: 10px">
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
        <template slot="remark" slot-scope="record">
          <table style="width: 100%">
            <tr>
              <td class="lable">落葬人：</td>
              <td>{{ record.bpname }}</td>
              <td class="lable">墓址：</td>
              <td>{{ record.cemeaddress }}</td>
            </tr>
            <tr>
              <td class="lable">联系人：</td>
              <td>{{ record.contacts }}</td>
              <td class="lable">电话：</td>
              <td>{{ record.mobile }}</td>
            </tr>
            <tr>
              <td class="lable">问题：</td>
              <td colspan="3">{{ record.tags.join(",") }}</td>
            </tr>
            <tr>
              <td class="lable">情况描述：</td>
              <td colspan="3">{{ record.remark }}</td>
            </tr>
          </table>
        </template>
        <template slot="imgs" slot-scope="record">
          <div style="display: flex; margin-top: 10px">
            <div
              v-for="(item, index) in record.imgs"
              :key="'img_' + index"
              @click="showImg(item, record.imgs)"
              class="imgCont"
            >
              <img :src="baseUrl + item" :onerror="defImg" />
            </div>
          </div>
        </template>
        <template slot="visit" slot-scope="record">
          <div>
            {{ record.visitCont }}
          </div>
          <div style="display: flex; margin-top: 10px">
            <div
              v-for="(item, index) in record.visitImgs"
              :key="'visitImg_' + index"
              @click="showImg(item, record.visitImgs)"
              class="imgCont"
            >
              <img :src="baseUrl + item" :onerror="defImg" />
            </div>
          </div>
        </template>
        <template slot="action" slot-scope="record">
          <a-button
            title="回访"
            icon="form"
            shape="round"
            type="primary"
            size="small"
            @click="visit(record)"
          />
          &nbsp;
          <a-button
            title="删除"
            icon="delete"
            shape="round"
            type="danger"
            size="small"
            @click="del([record.id])"
          />
          <!-- <a :href="record.id">操作{{ record.userid }}</a> -->
        </template>
      </a-table>
    </div>

    <showImg
      v-if="showImgModal"
      ref="showImg"
      @onClose="showImgClose"
    ></showImg>
    <!-- 反馈信息 -->
    <visitInfo
      v-if="showVisitInfo"
      ref="visitInfo"
      :info="info"
      @onClose="closeVisitInfo"
    ></visitInfo>
  </a-card>
</template>

<script>
import { repairsList, delRepairs } from "@/pages/admin/api/gjfw/gjfw";

export default {
  components: {
    showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
    visitInfo: () => import("@/pages/admin/views/member/gjfw/visitInfo.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      selectedRowKeys: [],
      pagination: {
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
          title: "登记信息",
          dataIndex: "",
          scopedSlots: {
            customRender: "remark",
          },
        },
        {
          title: "登记图片",
          dataIndex: "",
          scopedSlots: {
            customRender: "imgs",
          },
        },
        {
          title: "回访信息",
          dataIndex: "",
          scopedSlots: {
            customRender: "visit",
          },
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 170,
          sorter: true,
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
      info: {},
      showImgModal: false,
      showVisitInfo: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    changeStatus() {
      this.onSearch();
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
    onChangeDate(date, dateString) {
      this.pagination.startTime = dateString[0];
      this.pagination.endTime = dateString[1];
      this.onSearch();
    },
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
      const pagination = { ...this.pagination };
      repairsList(pagination).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
          this.list.forEach((x) => {
            if (!x.imgs) {
              x.imgs = [];
            }
            if (!x.tags) {
              x.tags = [];
            }
            if (!x.visitImgs) {
              x.visitImgs = [];
            }
          });
        }
      });
    },
    showImg(imgUrl, imgList) {
      this.showImgModal = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.showImg.loadData(imgUrl, imgList);
        }, 200);
      });
    },
    showImgClose() {
      this.showImgModal = false;
    },
    //回访
    visit(item) {
      this.info = item;
      this.showVisitInfo = true;
    },
    closeVisitInfo(res) {
      this.$nextTick(() => {
        this.showVisitInfo = false;
      });
      try {
        if (res.code === 0) {
          this.getList();
        }
      } catch {}
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
          delRepairs({
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
  },
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
.lable {
  width: 75px;
  text-align: right;
}
.imgCont {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
