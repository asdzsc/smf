<template>
  <modal :title="title" @onClose="handleCancel" width="700px">
    <div class="cont">
      <a-form-model
        :model="model"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item label="落葬人:">
          <a-input
            v-model="model.bpname"
            @change="_searchCemeteryList()"
            placeholder="请输入落葬人姓名"
          />
        </a-form-model-item>
        <a-form-model-item label="墓址:">
<<<<<<< HEAD
          <a-dropdown :trigger="['click']">
            <div>
              <a-input
                v-model="model.cemeaddress"
                placeholder="请输入墓址"
                :style="cemeteryList.length > 0 ? 'width: 95%' : 'width: 100%'"
              />
              &nbsp;
              <a
                v-show="cemeteryList.length > 0"
                @click="(e) => e.preventDefault()"
                style="color: #004930"
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

          <!-- <a-select
            v-model="model.erpCemeteryIdKey"
            labelInValue
            @change="changeCemetery"
            placeholder="请选择墓址信息"
            option-label-prop="label"
          >
            <a-select-option value="">请选择墓址信息</a-select-option>
            <a-select-option
              v-for="item in cemeteryList"
              :key="item.cemeteryId"
              :value="item.cemeteryId"
              :label="item.cemetery"
            >
              主办人：{{ item.masterName }}<br />
              {{ item.cemetery }}
            </a-select-option>
          </a-select> -->
          <div v-show="showMsg" style="padding-top: 10px">
            <a-alert
              :show-icon="false"
              type="error"
              message="没有查询到墓址信息"
            />
          </div>
=======
          <a-input v-model="model.cemeaddress" placeholder="请输入墓址" />
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        </a-form-model-item>
      </a-form-model>

      <div @click="submit()" class="btn">保存服务墓址</div>
    </div>
  </modal>
</template>

<script>
<<<<<<< HEAD
import {
  searchCemeteryList,
  getCemeteryInfo,
  saveCemetery,
} from "@/pages/pc/api/user";
export default {
  components: {
    modal: () => import("@/pages/pc/components/modal.vue"),
=======
import { searchCemeteryList, getCemeteryInfo, saveCemetery } from "@/pages/pc/api/user";
export default {
  components: {
    modal: () => import("@/pages/pc/components/modal.vue")
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  props: {
    id: {
      type: String,
      default() {
        return "";
<<<<<<< HEAD
      },
    },
=======
      }
    }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      title: "",
      model: {
        id: "",
        bpname: "",
        cemeaddress: "",
<<<<<<< HEAD
        isCheck: "0",
        masterName: "",
        erpCemeteryId: "", //关联erp墓址id
        erpCemeteryIdKey: undefined,
      },
      cemeteryList: [],
      showMsg: false,
=======
        isCheck: "0"
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this.model.id = this.id;
    this.loadData();
  },
  methods: {
    loadData() {
      if (!this.model.id) {
        this.title = "新增服务墓址";
      } else {
        this.title = "编辑服务墓址";
        getCemeteryInfo({
<<<<<<< HEAD
          id: this.model.id,
        }).then((res) => {
=======
          id: this.model.id
        }).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          if (res.code === 0) {
            Object.assign(this.model, res.data);
          }
        });
      }
    },
    _searchCemeteryList() {
      if (this.model.bpname) {
<<<<<<< HEAD
        this.model.erpCemeteryId = "";
        this.model.erpCemeteryIdKey = { key: "" };
        this.cemeteryList = [];
        searchCemeteryList({
          current: 1,
          pageSize: 10,
          searchText: this.model.bpname,
        }).then((res) => {
          if (res.code === 0) {
            this.cemeteryList = res.data.data;
            this.showMsg = this.cemeteryList.length > 0 ? false : true;
=======
        searchCemeteryList({
          current: 1,
          pageSize: 1,
          searchText: this.model.bpname
        }).then(res => {
          if (res.code === 0) {
            if (res.data.list.length > 0) {
              var info = res.data.list[0];
              this.model.cemeaddress = info.cemeaddress;
            }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          }
        });
      }
    },
<<<<<<< HEAD
    changeCemetery(value, option) {
      this.model.erpCemeteryId = value.key;
      var query = this.cemeteryList.filter((x) => {
        return x.cemeteryId === value.key;
      });
      if (query.length > 0) {
        this.model.masterName = query[0].masterName;
        this.model.cemeaddress = query[0].cemetery;
      }
    },
    selCemetery(item) {
      this.model.erpCemeteryId = item.erpCemeteryId;
      this.model.masterName = item.masterName;
      this.model.cemeaddress = item.cemetery;
    },
    submit() {
      saveCemetery(this.model).then((res) => {
=======
    submit() {
      saveCemetery(this.model).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.handleCancel(res);
        }
      });
    },
    handleCancel(res) {
      this.$emit("onClose", res);
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
.cont {
  padding: 40px 80px;

  .btn {
    margin: auto;
    margin-top: 60px;
    width: 180px;
    height: 48px;
    background-color: #004930;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 48px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
