<template>
  <a-modal
    :title="isAdd ? '添加选项卡' : '编辑选项卡'"
    v-model="visible"
    width="860px"
    style="top: 10px;"
    @ok="handleOk"
    @cancel="onClose"
    :maskClosable="false"
  >
    <div>
      <a-form-model
        :model="model"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="选择类型">
          <a-select
            v-model="model.tabTypeKey"
            labelInValue
            placeholder="请选择选项卡类型"
            @change="changeTabType"
            style="width:500px;"
          >
            <a-select-option value="1">
              图文类型
            </a-select-option>
            <a-select-option value="2" :disabled="isComment">
              互动评论
            </a-select-option>
            <a-select-option value="3">
              跳转链接
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="标题">
          <a-input
            v-model="model.title"
            placeholder="请输入选项卡标题"
            style="width:500px;"
          />
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input-number :min="0" v-model="model.sortId" />
        </a-form-model-item>

        <a-divider
          v-show="model.tabType === '3'"
          orientation="left"
        >
          配置内容
        </a-divider>
        <div v-show="model.tabType === '3'">
          <a-form-model-item label="链接地址">
            <a-input
              v-model="model.url"
              placeholder="请输入链接地址"
              style="width:500px;"
            />
          </a-form-model-item>
        </div>

        <div v-show="model.tabType === '1'">
          <a-divider orientation="left">
            内容
          </a-divider>
          <script
            id="tabEditor"
            type="text/plain"
            style="width:100%;height:500px;"
          ></script>
        </div>
      </a-form-model>
    </div>
  </a-modal>
</template>
<script>
import * as utils from "@/pages/admin/libs/utils";
export default {
  name: "tab-info",
  components: {
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false
    },
    infoObj: {
      type: Object,
      default() {
        return {};
      }
    },
    infoList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      visible: false,
      isComment: false, //互动评论
      isInfo: false, //品牌展示
      isRecommend: false, //推荐列表
      list: [], //当前选项卡列表
      model: {},
      ue: null
    };
  },
  mounted() {
    this.initModel();
    this.loadData(this.isAdd, this.infoList, this.infoObj);
  },
  methods: {
    initModel() {
      var obj = {
        id: utils.getId(),
        title: "",
        tabTypeKey: [{ key: "1" }],
        tabType: "1",
        housesName: "", //楼面名称
        housesPrice: null, //楼盘价格
        housesType: "", //楼盘类型，建筑类型
        housesAddress: "", //楼盘地址
        housesImgs: [], //户型图
        housesImgsList: [], //户型图文件
        url: "", //跳转链接
        cont: "", //内容
        sortId: 0, //排序
        recommendList: [] //直播间推荐
      };
      this.model = obj;
    },
    // eslint-disable-next-line no-unused-vars
    changeTabType(value, option) {
      this.model.tabType = value.key;
    },
    disabledTabType(tabType) {
      var query;
      if (this.isAdd) {
        query = this.list.filter(x => x.tabType === tabType);
        return query.length > 0 ? true : false;
      } else {
        if (this.model.tabType !== tabType) {
          query = this.list.filter(x => x.tabType === tabType);
          return query.length > 0 ? true : false;
        }
        return false;
      }
    },
    loadData(isAdd, list, info) {
      var vm = this;
      this.initModel();
      this.isAdd = isAdd;
      this.visible = true;
      if (list) {
        this.list = list;
      }
      if (info) {
        Object.assign(this.model, info);
        this.model.tabTypeKey = [{ key: this.model.tabType }];
      }
      this.isComment = this.disabledTabType("2");

      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        window.UE.delEditor("tabEditor");
        this.ue = window.UE.getEditor("tabEditor");
        this.ue.addListener("ready", function() {
          vm.ue.setContent(vm.model.cont);
        });
      });
    },
    handleOk() {
      if (!this.model.title) {
        this.$error({
          title: "提示",
          content: "选项卡标题不能为空"
        });
        return;
      }
      this.model.cont = this.ue.getContent();
      this.$emit("getInfo", this.model);
      this.visible = false;
    },
    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>
