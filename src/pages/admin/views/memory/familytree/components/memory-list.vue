<template>
  <a-modal
    :title="title"
    v-model="visible"
    width="860px"
    :bodyStyle="{ padding: '10px', minHeight: '500px' }"
    @cancel="onClose"
    @ok="handleOk"
  >
    <div class="operator">
      <a-row type="flex" justify="start">
        <!-- <a-col style="padding-right:10px;">
					<a-button @click="saveSort()" type="primary" icon="sort-ascending">保存排序</a-button>
					&nbsp;
					<a-button @click="add()" type="primary" icon="plus">新增</a-button>
					&nbsp;
					<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
				</a-col> -->
        <a-col style="padding-right:10px;" :span="10">
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
    <a-table
      size="small"
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
      :scroll="{ y: 500 }"
    >
      <template slot="name" slot-scope="record">
        <table>
          <tr>
            <td style="width: 65px;">
              <img
                :src="baseUrl + record.photo"
                :onerror="defImg"
                @click="showImg(baseUrl + record.photo)"
                class="fmImg"
              />
            </td>
            <td>
              <div>姓名：{{ record.name }}</div>
              <div>分类：{{ record.columnName }}</div>
            </td>
          </tr>
        </table>
      </template>
      <template slot="status" slot-scope="record">
        <a-switch
          checkedChildren="公开"
          unCheckedChildren="不公开"
          :checked="record.status === '0' ? true : false"
          @change="setStatus(record)"
        />
      </template>
      <template slot="templateName" slot-scope="record">
        <a v-if="record.templateName !== '免费模版'" @click="goodsInfo(record)">
          {{ record.templateName }}
        </a>
        <span v-else>
          {{ record.templateName }}
        </span>
      </template>
      <template slot="action" slot-scope="record">
        <a-button
          title="详情"
          icon="edit"
          shape="round"
          type="primary"
          size="small"
          @click="edit(record)"
        />
        <!-- &nbsp;
				<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" /> -->
      </template>
    </a-table>

    <showImg
      v-if="showImgModal"
      ref="showImg"
      @onClose="showImgClose"
    ></showImg>

    <info v-if="showInfo" :id="infoId" ref="info" @onClose="infoClose"></info>
  </a-modal>
</template>
<script>
import { getMemoryList } from "@/pages/admin/api/memory/memory";
export default {
  components: {
    showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
    info: () => import("@/pages/admin/views/memory/info/info"),
  },
  props: {
    memoryId: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      visible: false,
      title: "关联个人主页",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      list: [],
      selectedRowKeys: [],
      pagination: {
        columnId: "",
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
        // {
        // 	title: "照片",
        // 	dataIndex: "photo",
        // 	scopedSlots: {
        // 		customRender: "photo",
        // 	},
        // 	width: 150,
        // },
        {
          title: "姓名",
          dataIndex: "",
          scopedSlots: {
            customRender: "name",
          },
        },
        {
          title: "模版名称",
          dataIndex: "",
          scopedSlots: {
            customRender: "templateName",
          },
          width: 150,
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
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150,
        },
        {
          title: "操作",
          dataIndex: "",
          width: 80,
          align: "center",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      showImgModal: false,
      infoId: "",
      showInfo: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.visible = true;
      this.getList();
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
      if (selectedRowKeys.length > 0) {
        this.selectedRowKeys = [selectedRowKeys[selectedRowKeys.length - 1]];
      } else {
        this.selectedRowKeys = [];
      }
    },
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.selectedRowKeys = [];
      const pagination = { ...this.pagination };
      getMemoryList(pagination).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    getImg(record) {
      var imgUrl = record.url;
      if (record.mediaType === "video") {
        imgUrl = record.cover;
      }
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          return imgUrl;
        } else {
          return this.baseUrl + imgUrl;
        }
      } else {
        return "/img/admin/zwtp.png";
      }
    },
    showImg(imgUrl) {
      this.showImgModal = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.showImg.loadData(imgUrl, [imgUrl]);
        }, 200);
      });
    },
    //关闭图片展示弹窗
    showImgClose() {
      this.showImgModal = false;
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
    handleOk() {
      //确认
      if (this.selectedRowKeys.length > 0) {
        var mid = this.selectedRowKeys[0];
        var query = this.list.filter((x) => {
          return x.id === mid;
        });
        if (query.length > 0) {
          this.onClose(query[0]);
        } else {
          this.onClose();
        }
      } else {
        this.onClose();
      }
    },
    onClose(obj) {
      this.visible = false;
      this.$emit("onClose", obj);
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
  max-width: 60px;
  max-height: 60px;
}
</style>
