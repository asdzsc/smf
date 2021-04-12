<template>
  <a-card>
    <div class="operator">
      <a-row type="flex" justify="start">
<<<<<<< HEAD
        <a-col style="padding-right: 10px">
=======
        <a-col style="padding-right:10px;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
        <template slot="img" slot-scope="record">
          <img :src="baseUrl + record" :onerror="defImg" class="fmImg" />
        </template>
        <template slot="liveTitle" slot-scope="record">
          <div>编号：{{ record.id }}</div>
          <div>
<<<<<<< HEAD
            <span v-if="record.isTop === '1'" style="color: red">[置顶]</span
            >&nbsp;{{ record.title }}
          </div>
          <div>密码：{{ record.pwd }}</div>
=======
            <span v-if="record.isTop === '1'" style="color:red;">[置顶]</span
            >&nbsp;{{ record.title }}
          </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        </template>
        <template slot="tags" slot-scope="record">
          {{ tagsText(record) }}
        </template>
        <template slot="state" slot-scope="record">
          {{ stateText(record) }}
        </template>
        <template slot="num" slot-scope="record">
          <div>
            <div>评论：{{ tranNumber(record.msgNum) }}</div>
<<<<<<< HEAD
=======
            <div>礼物：{{ tranNumber(record.gitNum) }}</div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            <div>观看：{{ tranNumber(record.peopleOnline) }}</div>
          </div>
        </template>
        <template slot="action" slot-scope="record">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="edit(record)">
                <a-icon type="edit" />编辑
              </a-menu-item>
              <a-menu-item @click="showAssist(record)">
                <a-icon type="snippets" />辅播
              </a-menu-item>
              <a-menu-item @click="showQrcode(record)">
                <a-icon type="qrcode" />二维码
              </a-menu-item>
              <a-menu-item @click="_exportExcel(record)">
                <icon-font
                  type="iconexl-fill"
<<<<<<< HEAD
                  style="font-size: 18px; margin-right: 3px; margin-left: -2px"
=======
                  style="font-size:18px; margin-right: 3px; margin-left: -2px;"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
                />导出用户
              </a-menu-item>
              <!-- <a-menu-item @click="_exportLeavePhone(record)">
                <icon-font
                  type="iconshipin"
                  style="font-size:14px; margin-right: 5px;"
                />导出留电
              </a-menu-item> -->
              <a-menu-item
                :disabled="record.state !== '3'"
                @click="showVideo(record)"
              >
                <icon-font
                  type="iconshipin"
<<<<<<< HEAD
                  style="font-size: 14px; margin-right: 5px"
                />视频文件
              </a-menu-item>
              <a-menu-item @click="del([record.id])" style="color: #ff7875">
=======
                  style="font-size:14px; margin-right: 5px;"
                />视频文件
              </a-menu-item>
              <a-menu-item @click="del([record.id])" style="color:#ff7875;">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
                <a-icon type="delete" />删除
              </a-menu-item>
            </a-menu>
            <a-button title="更多" shape="round" type="primary" size="small">
<<<<<<< HEAD
              操作&nbsp;&nbsp;
              <a-icon type="down" />
=======
              操作&nbsp;&nbsp;<a-icon type="down" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            </a-button>
          </a-dropdown>
        </template>
      </a-table>
      <live-info
        v-if="showInfo"
        :id="infoId"
        ref="info"
        @onClose="infoClose"
      ></live-info>
      <live-video ref="liveVideo"></live-video>
<<<<<<< HEAD
      <!-- 二维码 -->
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <liveQrcode ref="liveQrcode"></liveQrcode>
    </div>
  </a-card>
</template>

<script>
import * as utils from "@/pages/admin/libs/utils";
import {
  getLiveList,
  delLiveList,
  exportExcel,
<<<<<<< HEAD
  exportLeavePhone,
=======
  exportLeavePhone
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
} from "@/pages/admin/api/live/livelist";

export default {
  name: "room-list",
  components: {
    liveInfo: () => import("@/pages/admin/views/live/room/info"),
<<<<<<< HEAD
    liveVideo: () =>
      import("@/pages/admin/views/live/room/components/live-video"),
    liveQrcode: () =>
      import("@/pages/admin/views/live/room/components/live-qrcode"),
=======
    liveVideo: () => import("@/pages/admin/views/live/room/components/live-video"),
    liveQrcode: () => import("@/pages/admin/views/live/room/components/live-qrcode")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      treeData: [],
      expandedKeys: [], //部门树默认展开顶级节点
      list: [],
      selectedRowKeys: [],
      pagination: {
        isPlayback: "0",
        searchText: "",
        orderField: "",
        order: "",
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
<<<<<<< HEAD
          title: "标题",
          dataIndex: "",
          scopedSlots: {
            customRender: "liveTitle",
          },
=======
          title: "封面图",
          dataIndex: "img",
          scopedSlots: { customRender: "img" },
          width: 150
        },
        {
          title: "标题",
          dataIndex: "",
          scopedSlots: { customRender: "liveTitle" }
        },
        {
          title: "分类",
          dataIndex: "columnName",
          width: 150
        },
        {
          title: "标签",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          width: 220
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "状态",
          dataIndex: "state",
          align: "center",
<<<<<<< HEAD
          scopedSlots: {
            customRender: "state",
          },
          width: 150,
=======
          scopedSlots: { customRender: "state" },
          width: 150
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "统计",
          dataIndex: "",
<<<<<<< HEAD
          scopedSlots: {
            customRender: "num",
          },
          width: 150,
=======
          scopedSlots: { customRender: "num" },
          width: 150
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        },
        {
          title: "直播时间",
          dataIndex: "liveTime",
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
          width: 140,
          align: "center",
<<<<<<< HEAD
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      infoId: "",
      showInfo: false,
=======
          scopedSlots: { customRender: "action" }
        }
      ],
      infoId: "",
      showInfo: false
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
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
<<<<<<< HEAD
      getLiveList(pagination).then((res) => {
=======
      getLiveList(pagination).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    tagsText(tag) {
      if (tag) {
        return tag.join(",");
      }
      return "";
    },
    stateText(state) {
      var states = ["待发布", "已发布", "开始直播", "直播结束", "直播间关闭"];
      if (state) {
        return states[state];
      } else {
        return "";
      }
    },
    changeSort(record) {
<<<<<<< HEAD
      var query = this.list.filter((x) => {
=======
      var query = this.list.filter(x => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    showAssist(record) {
      this.$store.commit("adminSetting/setTabPageUrl", {
        id: "room_assistInfo",
        name: "辅播管理",
<<<<<<< HEAD
        url: "/live/room/assist-info?id=" + record.id,
      });
    },
    // 显示二维码
=======
        url: "/live/room/assist-info?id=" + record.id
      });
    },
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    showQrcode(record) {
      this.$refs.liveQrcode.loadData(record);
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
          delLiveList({
            ids: list,
          }).then((res) => {
=======
          delLiveList({ ids: list }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            if (res.code === 0) {
              vm.onSearch();
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
    //导出
    _exportExcel(item) {
      this.$message.loading("导出数据生成中...", 0);
<<<<<<< HEAD
      exportExcel({
        id: item.id,
      }).then((res) => {
        this.$message.destroy();
        if (res.code === 0) {
          var tempPage = window.open("", "_blank");
          tempPage.location = process.env.VUE_APP_BASE_URL + res.data;
=======
      exportExcel({ id: item.id }).then(res => {
        this.$message.destroy();
        if (res.code === 0) {
					var tempPage = window.open("", "_blank");
					tempPage.location = process.env.VUE_APP_BASE_URL + res.data;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        }
      });
    },
    //导出留电
    _exportLeavePhone(item) {
      this.$message.loading("导出数据生成中...", 0);
<<<<<<< HEAD
      exportLeavePhone({
        id: item.id,
      }).then((res) => {
=======
      exportLeavePhone({ id: item.id }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        this.$message.destroy();
        if (res.code === 0) {
          window.open(process.env.VUE_APP_BASE_URL + res.data);
        }
      });
    },
    //显示回播视频
    showVideo(item) {
      this.$refs.liveVideo.loadData(item.id);
    },
    tranNumber(n) {
      return utils.tranNumber(n);
<<<<<<< HEAD
    },
  },
=======
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
<<<<<<< HEAD

=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
</style>
