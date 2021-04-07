<template>
  <a-drawer
    :title="title"
    width="75%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div class="form">
      <a-row type="flex" class="formRow" style="margin-bottom: 0px">
        <a-col class="lable"> 头像照片 </a-col>
        <a-col class="text">
          <avatarUpload ref="photoUpload" @change="uploadPhoto"></avatarUpload>
        </a-col>
      </a-row>
      <a-row type="flex" class="formRow">
        <a-col class="lable"> 人物姓名 </a-col>
        <a-col class="text">
          <a-input
            v-model="model.name"
            placeholder="请输入人物姓名"
            style="width: 260px"
            @change="_searchCemeteryList"
          />
        </a-col>
        <a-col class="lable"> 人物性别 </a-col>
        <a-col class="text">
          <a-select
            v-model="model.gender"
            style="width: 260px"
            placeholder="请选择性别"
          >
            <a-select-option value="男"> 男 </a-select-option>
            <a-select-option value="女"> 女 </a-select-option>
          </a-select>
        </a-col>
      </a-row>

      <a-row type="flex" class="formRow">
        <a-col class="lable"> 出生时间 </a-col>
        <a-col class="text">
          <a-date-picker
            v-model="model.birthdayDate"
            placeholder="请选择出生时间"
            @change="changeBirthdayDate"
            style="width: 260px"
            inputReadOnly
          />
        </a-col>
        <a-col class="lable"> 离世时间 </a-col>
        <a-col class="text">
          <a-date-picker
            v-model="model.dieTimeDate"
            placeholder="请选择离世时间"
            @change="changeDieTimeDate"
            style="width: 260px"
            inputReadOnly
          />
        </a-col>
      </a-row>

      <a-row type="flex" class="formRow">
        <a-col class="lable"> 出生城市 </a-col>
        <a-col class="text">
          <a-input
            v-model="model.birthdayAddress"
            placeholder="请输入出生城市"
            style="width: 260px"
          />
        </a-col>
        <a-col class="lable"> 离世城市 </a-col>
        <a-col class="text">
          <a-input
            v-model="model.dieAddress"
            placeholder="请输入离世城市"
            style="width: 260px"
          />
        </a-col>
      </a-row>
      <a-row type="flex" class="formRow">
        <a-col class="lable"> 安葬墓址 </a-col>
        <a-col class="text">
          <!-- <a-input
            v-model="model.buryAddress"
            placeholder="请输入安葬墓址"
            style="width: 260px;"
          /> -->
          <!-- <a-select
            v-model="model.erpCemeteryIdKey"
            labelInValue
            @change="changeCemetery"
            placeholder="请选择安葬墓址"
            option-label-prop="label"
            style="width: 260px"
          >
            <a-select-option value="">请选择安葬墓址</a-select-option>
            <a-select-option
              v-for="item in cemeteryList"
              :key="item.cemeteryId"
              :value="item.cemeteryId"
              :label="item.cemetery"
            >
              主办人：{{ item.masterName }}<br />
              {{ item.cemetery }}</a-select-option
            >
          </a-select> -->
          <a-dropdown :trigger="['click']">
            <div>
              <a-input
                v-model="model.buryAddress"
                placeholder="请输入安葬墓址"
                :style="
                  cemeteryList.length > 0 ? 'width: 230px' : 'width: 260px'
                "
              />
              &nbsp; &nbsp;
              <a
                v-show="cemeteryList.length > 0"
                @click="(e) => e.preventDefault()"
              >
                <a-icon type="down" />
              </a>
            </div>
            <a-menu v-show="cemeteryList.length > 0" slot="overlay">
              <a-menu-item
                v-for="item in cemeteryList"
                :key="item.cemeteryId"
                @click="selCemetery(item)"
                >主办人：{{ item.masterName }}<br />{{
                  item.cemetery
                }}</a-menu-item
              >
            </a-menu>
          </a-dropdown>
          <div v-show="showMsg" style="padding-top: 10px">
            <a-alert
              :show-icon="false"
              type="error"
              message="没有查询到墓址信息"
            />
          </div>
        </a-col>
        <a-col class="lable"> 墓志铭 </a-col>
        <a-col class="text">
          <a-input
            v-model="model.epitaph"
            placeholder="请输入墓志铭"
            style="width: 260px"
          />
        </a-col>
      </a-row>
      <a-row type="flex" class="formRow">
        <a-col class="lable"> 人物简介 </a-col>
        <a-col class="text" style="width: 670px">
          <a-textarea
            v-model="model.intro"
            placeholder="请输入人物简介"
            :rows="5"
            style="width: 850px"
          />
        </a-col>
      </a-row>
    </div>
    <div style="height: 50px"></div>
    <div class="submit-cont">
      <a-button
        type="primary"
        style="background-color: #004930; border: none"
        @click="onSubmit"
        >确定</a-button
      >
      <a-button @click="onClose" style="margin-left: 10px">取消</a-button>
    </div>
  </a-drawer>
</template>
<script>
import { searchCemeteryList } from "@/pages/pc/api/user";
import { getMemoryInfo, updateMemoryPage } from "@/pages/pc/api/mark.js";
import moment from "moment";

export default {
  components: {
    avatarUpload: () =>
      import("@/pages/pc/components/upload/avatar-upload.vue"),
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      title: "",
      columnList: [],
      templateList: [],
      inputMobileVisible: false,
      inputMobileValue: "",
      ue: null,
      model: {
        id: "",
        columnIdsKey: [],
        columnIds: [], //类别
        name: "", //姓名
        gender: "男", //性别
        photo: "", //头像照片
        birthdayDate: null,
        birthday: "", //生日
        dieTimeDate: null,
        dieTime: "", //离世日期
        birthdayAddress: "", //出生城市
        dieAddress: "", //离世城市
        intro: "", //简介
        cont: "", //图文简介
        epitaph: "", //墓志铭
        cover: "", //封面图
        phoneCover: "", //手机封面图
        bg: "", //背景
        phoneBg: "", //手机背景
        buryAddress: "", //安装地址
        templateId: "0", //模版id
        activateCode: "", //激活码
        mobiles: [], //手机号
        status: "0", //显示状态 0显示 1影藏
        memoryType: "0", //0普通用户 1名人主页
        sortId: 0, //排序 降序
        expireTimeDate: null,
        expireTime: "", //到期时间
        erpCemeteryId: "",
        masterName: "",
        erpCemeteryIdKey: { key: "" },
      },
      cemeteryList: [],
      showMsg: false,
    };
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加个人主页" : "编辑个人主页";
    this.loadData();
  },
  methods: {
    //搜索墓址
    _searchCemeteryList() {
      this.model.name = this.model.name.trim();
      if (this.model.name) {
        this.model.erpCemeteryId = "";
        this.model.erpCemeteryIdKey = { key: "" };
        this.cemeteryList = [];
        searchCemeteryList({
          current: 1,
          pageSize: 10,
          searchText: this.model.name,
        }).then((res) => {
          if (res.code === 0) {
            this.cemeteryList = res.data.data;
            this.showMsg = this.cemeteryList.length > 0 ? false : true;
          }
        });
      }
    },
    changeCemetery(value, option) {
      this.model.erpCemeteryId = value.key;
      var query = this.cemeteryList.filter((x) => {
        return x.cemeteryId === value.key;
      });
      if (query.length > 0) {
        this.model.masterName = query[0].masterName;
        this.model.buryAddress = query[0].cemetery;
      }
    },
    selCemetery(item) {
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.masterName = item.masterName;
      this.model.buryAddress = item.cemetery;
    },
    loadData() {
      if (this.id) {
        this.model.id = this.id;
        getMemoryInfo({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data);
            if (!this.model.mobiles) {
              this.model.mobiles = [];
            }
            if (this.model.columnIds && this.model.columnIds.length > 0) {
              this.model.columnIdsKey = [this.model.columnIds[0]];
            }
            this.model.templateId = this.model.templateId || "0";

            if (this.model.birthday) {
              this.model.birthdayDate = moment(this.model.birthday);
            }
            if (this.model.dieTime) {
              this.model.dieTimeDate = moment(this.model.dieTime);
            }
            if (this.model.expireTime) {
              this.model.expireTimeDate = moment(this.model.expireTime);
            }
            // if (this.model.erpCemeteryId) {
            //   this.cemeteryList.push({
            //     cemeteryId: this.model.erpCemeteryId,
            //     masterName: this.model.masterName,
            //     cemetery: this.model.buryAddress,
            //   });
            //   this.model.erpCemeteryIdKey = { key: this.model.erpCemeteryId };
            // }
          }
          this.bindData();
        });
      } else {
        // this.model.publishTimeDate = moment();
        this.bindData();
      }
    },
    bindData() {
      var vm = this;
      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.photoUpload.loadData(this.model.photo);
        }, 200);
      });
    },
    uploadPhoto(imgUrl) {
      this.model.photo = imgUrl;
    },
    //选择出生时间
    changeBirthdayDate(date, dateString) {
      this.model.birthdayDate = date;
      this.model.birthday = dateString + " 00:00:00";
    },
    //选择离世日期
    changeDieTimeDate(date, dateString) {
      this.model.dieTimeDate = date;
      this.model.dieTime = dateString + " 00:00:00";
    },

    onSubmit() {
      // this.model.cont = this.ue.getContent();
      updateMemoryPage(this.model).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}

.remark {
  color: #ccc;
  font-size: 12px;
}

.form {
  .formRow {
    margin-bottom: 10px;

    .lable {
      width: 150px;
      line-height: 36px;
      text-align: right;
      padding-right: 10px;
    }

    .text {
      line-height: 36px;
      width: 260px;
    }
  }
}

.submit-cont {
  position: fixed;
  bottom: 10px;
  background-color: #ffffff;
  z-index: 9999;
  width: 71%;
  border: 1px solid #eeeeee;
  text-align: center;
  padding: 10px;
}
</style>
