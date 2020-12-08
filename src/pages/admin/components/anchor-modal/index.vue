<template>
  <a-modal
    title="选择主播"
    v-model="visible"
    width="660px"
    :bodyStyle="{ padding: '0px' }"
    @ok="handleOk"
  >
    <a-row>
      <a-col :span="12" class="cont" style="border-right:1px solid #ddd;">
        <div class="search-cont">
          <a-input-search
            v-model="searchText"
            placeholder="关键字搜索"
            :loading="loading"
            @search="onSearch"
            enterButton
          />
        </div>
        <div class="anchor-tree">
          <template v-if="showTree">
            <a-tree
              :treeData="treeData"
              :selectedKeys="selectedKeys"
              @select="onSelectTree"
              show-icon
              multiple
            >
              <a-icon slot="folder" type="folder" />
              <a-icon slot="user" type="user" />
            </a-tree>
          </template>
          <template v-else>
            <a-row
              v-for="item in searchList"
              :key="item.id"
              class="search-item"
              :class="{ activity: searchActivity(item) }"
            >
              <a-col :span="12" class="left" @click="onSearchCheck(item)">
                <a-icon type="user" />
                {{ item.name }}</a-col
              >
              <a-col :span="12" class="right" @click="onSearchCheck(item)">
                {{ item.departmentName }}
              </a-col>
            </a-row>
            <div
              v-if="searchList.length === 0"
              style="text-align: center; padding-top: 50px;"
            >
              暂无数据
            </div>
          </template>
        </div>
      </a-col>
      <a-col :span="12" class="cont" style="overflow: auto;">
        <div class="check-title">
          已选择的成员
        </div>
        <div class="check-list">
          <a-row v-for="item in checkedList" :key="item.id" class="check-item">
            <a-col :span="18">
              <a-icon v-if="item.treeType === 'dept'" type="folder" />
              <a-icon v-if="item.treeType === 'user'" type="user" />
              {{ item.title }}</a-col
            >
            <a-col :span="6" style="text-align: right;">
              <a-icon @click="delCheckedItem(item)" type="delete" class="del" />
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { getSysDeptTree } from "@/pages/admin/api/sys/sysdept";
import { getLiveUserList } from "@/pages/admin/api/live/liveuser";
export default {
  name: "anchor-modal",
  data() {
    return {
      visible: false,
      showTree: true,
      treeData: [],
      selectedKeys: [],
      loading: false,
      searchText: "",
      searchList: [],
      checkedList: []
    };
  },
  mounted() {},
  methods: {
    getDeptList() {
      getSysDeptTree({ showUser: true, userType: "1" }).then(res => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    onSelectTree(selectedKeys, event) {
      var item = event.node;
      if (item.value.indexOf("user_") >= 0) {
        var id = item.value.replace(new RegExp("user_", "gm"), "");
        var query = this.checkedList.filter(x => {
          return x.id === id;
        });
        if (query.length > 0) {
          this.checkedList = this.checkedList.filter(x => {
            return x.id !== id;
          });
          this.selectedKeys = this.selectedKeys.filter(x => {
            return x !== item.value;
          });
        } else {
          this.checkedList.push({
            id: id,
            treeType: "user",
            title: item.title
          });
          this.selectedKeys.push(item.value);
        }
      }
    },
    onSearch() {
      if (this.searchText) {
        this.showTree = false;
      } else {
        this.showTree = true;
      }
      if (this.searchText) {
        this.loading = true;
        this.searchList = [];
        getLiveUserList({
          deptId: "0", //默认选中部门
          userType: "1", //用户类型 主播用户
          searchText: this.searchText,
          current: 1,
          pageSize: 50
        }).then(res => {
          this.loading = false;
          if (res.code === 0) {
            this.searchList = res.data.list;
          }
        });
      }
    },
    //搜索结果中标记出已经选中的数据
    searchActivity(item) {
      var query = this.checkedList.filter(x => {
        return x.id === item.id;
      });
      if (query.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    //搜索结果点击选中
    onSearchCheck(item) {
      var query = this.checkedList.filter(x => {
        return x.id === item.id;
      });
      if (query.length === 0) {
        this.checkedList.push({
          id: item.id,
          treeType: "user",
          title: item.name
        });
      }
      this.searchText = "";
      this.showTree = true;
    },
    //删除选中项目
    delCheckedItem(item) {
      this.checkedList = this.checkedList.filter(x => {
        return x.id !== item.id;
      });
      this.selectedKeys = this.selectedKeys.filter(x => {
        return x !== item.treeType + "_" + item.id;
      });
    },
    loadData(checkedList) {
      this.selectedKeys = [];
      this.checkedList = [];
      if (checkedList) {
        this.checkedList = checkedList;
        checkedList.forEach(item => {
          this.selectedKeys.push(item.treeType + "_" + item.id);
        });
      }
      this.getDeptList();
      this.visible = true;
    },
    handleOk() {
      this.$emit("return", this.checkedList);
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.cont {
  height: 500px;
  .search-cont {
    padding: 10px;
  }
  .anchor-tree {
    height: 448px;
    overflow: auto;
    .search-item {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: #e6f7ff;
      }
      &.activity {
        background-color: #bae7ff;
      }
      .left {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
      }
      .right {
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }
  .check-title {
    height: 52px;
    line-height: 52px;
    padding-left: 10px;
  }
  .check-list {
    height: 448px;
    overflow: auto;
    .check-item {
      padding: 5px 10px;
      .del {
        color: #ff7875;
        cursor: pointer;
      }
    }
  }
}
</style>
