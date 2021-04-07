<template>
  <div>
    <memberHead ref="memberHead"></memberHead>
    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="right">
        <div class="title">族谱馆</div>
        <a-row type="flex" style="line-height: 36px;">
          <a-col style="padding-right:10px;">
            亲友姓名：
          </a-col>
          <a-col style="padding-right:40px;">
            <a-input
              placeholder="填写亲友姓名"
              v-model="model.searchText"
              style="width:300px;"
            />
          </a-col>
          <a-col>
            <div class="btn" @click="handleSearch">
              查询
            </div>
          </a-col>
          <a-col style="margin-left:20px;">
            <div class="btn" @click="add">
              新增
            </div>
          </a-col>
        </a-row>
        <!-- <a-button @click="add()" type="primary" icon="plus">新增</a-button> -->
        <div
          style="border-bottom: solid 1px #cccccc; margin-top: 28px; margin-bottom: 20px;"
        ></div>

        <a-spin
          size="large"
          tip="加载中..."
          :spinning="loading"
          style="width:100%;"
        >
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 30px; color: #004930; text-align: center;"
            spin
          />

          <table class="tablelist">
            <tr class="tableHead">
              <td>标题</td>
              <td>族谱人数</td>
              <td>状态</td>
              <td>创建日期</td>
              <td>操作</td>
            </tr>
            <tr class="tableRr" v-for="item in model.list" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.num }}</td>
              <!-- <td>{{ item.status }}</td> -->
              <td>
                <a-switch
                  checkedChildren="公开"
                  unCheckedChildren="不公开"
                  :checked="item.status === '0' ? true : false"
                  @change="setStatus(item)"
                />
              </td>
              <td>{{ item.createDate }}</td>
              <td>
                <a-button
                  title="编辑"
                  icon="edit"
                  shape="round"
                  type="primary"
                  size="small"
                  @click="edit(item)"
                />
                &nbsp;
                <a-button
                  title="删除"
                  icon="delete"
                  shape="round"
                  type="danger"
                  size="small"
                  style="background-color:#ff4d4f"
                  @click="del([item.id])"
                />
              </td>
            </tr>
          </table>
        </a-spin>
        <a-empty v-if="model.list.length === 0" />
        <div style="padding-top: 30px;"></div>
        <paging ref="paging" @setPage="setPage"></paging>
      </div>
    </div>
    <info
      v-if="showInfo"
      :id="infoId"
      ref="info"
      @onClose="infoClose"
      @onSetStatus="setStatus"
    ></info>
  </div>
</template>

<script>
import {
  setFamilyTreeStatus,
  myFamilyTreeList,
  delFamilyTree,
} from "@/pages/pc/api/zpg.js";
export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    info: () => import("@/pages/pc/views/member/create/info.vue"),
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
  },
  data() {
    return {
      loading: false,
      showInfo: false,
      infoId: "",
      model: {
        current: 1,
        pageSize: 15,
        searchText: "",
        status: "",
        columnId: "",
        list: [],
        total: "",
      },
    };
  },
  mounted() {
    this._myFamilyTreeList();
  },
  methods: {
    _myFamilyTreeList() {
      this.loading = true;
      myFamilyTreeList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    // 查询
    handleSearch() {
      this.model.list = [];
      this.setPage(1);
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._myFamilyTreeList();
    },
    setStatus(record) {
      this.$confirm({
        title: "确定要修改公开状态吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          var status = record.status === "0" ? "1" : "0";
          setFamilyTreeStatus({
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
    infoClose(res) {
      this.$nextTick(() => {
        this.showInfo = false;
      });
      if (res.code === 0) {
        this.handleSearch();
      }
    },
    edit(record) {
      this.infoId = record.id;
      this.showInfo = true;
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
          delFamilyTree({
            ids: list,
          }).then((res) => {
            if (res.code === 0) {
              vm.handleSearch();
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
.cont {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  min-height: 600px;
  background-color: #ffffff;

  .left {
    width: 125px;
  }
  .right {
    flex: auto;
    padding: 20px;
    padding-bottom: 80px;
    /deep/ .ant-btn {
      background-color: #004930;
      border: #004930;
    }
    /deep/ .ant-switch-checked {
      background: #004930;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
    }
    .btn {
      cursor: pointer;
      width: 160px;
      height: 36px;
      line-height: 36px;
      background-color: #004930;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #ffffff;
    }
    .tablelist {
      width: 100%;
      border: 1px solid #ebebeb;

      .tableHead {
        height: 40px;
        background-color: #f5f5f5;
        font-size: 12px;
        line-height: 40px;
        color: #333333;
        text-align: center;

        td {
          padding: 5px;
        }
      }

      .tableRr {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #333333;
        border-top: 1px solid #ebebeb;
        .edit {
          cursor: pointer;
        }
        td {
          padding: 5px;
          text-align: center;
          img {
            min-width: 40px;
            min-height: 40px;
            max-width: 100px;
            max-height: 60px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
