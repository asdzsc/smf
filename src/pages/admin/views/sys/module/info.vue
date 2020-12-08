<template>
  <a-drawer
    :title="title"
    width="50%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="上级菜单">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择上级菜单"
          v-model="model.pid"
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="菜单名称">
        <a-input v-model="model.name" placeholder="请输入菜单名称" />
      </a-form-model-item>
      <a-form-model-item label="菜单图标">
        <a-input-search
          v-model="model.icon"
          placeholder="请输入图标样式"
          @search="openUrl('https://www.antdv.com/components/icon-cn/')"
        >
          <a-button slot="enterButton" type="primary">
            <a-icon type="eye" />查看</a-button
          >
        </a-input-search>
      </a-form-model-item>
      <a-form-model-item label="URL">
        <a-input v-model="model.url" placeholder="请输入菜单URL" />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
      </a-form-model-item>

      <a-form-model-item label="权限">
        <a-button @click="addPermission()" type="primary" icon="plus"
          >增加权限</a-button
        >
        <a-table
          :rowKey="record => record.id"
          :columns="columns"
          :dataSource="permissionList"
          bordered
          size="small"
          :pagination="false"
        >
          <template slot="name" slot-scope="record">
            <a-input v-model="record.name" placeholder="权限名称" />
          </template>
          <template slot="permission" slot-scope="record">
            <a-input v-model="record.permission" placeholder="权限标识" />
          </template>
          <template slot="sortId" slot-scope="record">
            <a-input-number :min="0" v-model="record.sortId" />
          </template>

          <template slot="action" slot-scope="record">
            <a-button
              title="删除"
              icon="delete"
              shape="round"
              type="danger"
              size="small"
              @click="delPermission(record.id)"
            />
          </template>
        </a-table>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
        <a-button @click="onClose" style="margin-left: 10px;">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-drawer>
</template>

<script>
import * as utils from "@/pages/admin/libs/utils";
import {
  getModuleList,
  getSysModuleInfo,
  getModulePermissionList,
  saveSysModuleInfo
} from "@/pages/admin/api/sys/sysmodule";

export default {
  name: "module-info",
  props: {},
  data() {
    return {
      visible: false,
      title: "",
      model: this.initModel(),
      treeData: [],
      columns: [
        {
          title: "名称",
          dataIndex: "",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "标识",
          dataIndex: "",
          scopedSlots: { customRender: "permission" }
        },
        {
          title: "排序",
          dataIndex: "",
          scopedSlots: { customRender: "sortId" }
        },
        {
          title: "操作",
          dataIndex: "",
          scopedSlots: { customRender: "action" }
        }
      ],
      permissionList: []
    };
  },
  components: {},
  activated() {},
  mounted() {},
  methods: {
    initModel() {
      this.permissionList = [];
      return {
        id: "",
        pid: "0",
        name: "",
        icon: "menu",
        url: "",
        sortId: 0
      };
    },
    getModule() {
      getModuleList({ showPermission: false }).then(res => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
          this.treeData.splice(0, 0, {
            id: "0",
            key: "0",
            value: "0",
            pid: "-1",
            title: "顶级菜单",
            name: "顶级菜单"
          });
        }
      });
    },
    _getModulePermissionList(nid) {
      getModulePermissionList({ moduleId: nid }).then(res => {
        if (res.code === 0) {
          this.permissionList = res.data;
        }
      });
    },
    addPermission() {
      this.permissionList.push({
        id: utils.getId(),
        name: "",
        permission: "",
        sortId: 0
      });
    },
    delPermission(nid) {
      this.permissionList = this.permissionList.filter(x => {
        return x.id !== nid;
      });
    },
    loadData(title, nid, pid) {
      this.getModule();
      this.visible = true;
      this.title = title;
      if (nid) {
        this.model = this.initModel();
        getSysModuleInfo({ id: nid }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
        this._getModulePermissionList(nid);
      } else if (pid) {
        this.model = this.initModel();
        this.model.pid = pid;
      } else {
        this.model = this.initModel();
      }
    },
    openUrl: function(url) {
      var tempPage = window.open("", "_blank");
      tempPage.location = url;
    },
    onSubmit() {
      var data = {
        entity: this.model,
        permissionList: this.permissionList
      };
      saveSysModuleInfo(data).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      if (res) this.$emit("onClose", res);
    }
  }
};
</script>

<style lang="less" scoped></style>
