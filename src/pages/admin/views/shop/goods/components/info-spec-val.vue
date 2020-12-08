<template>
  <div>
    <a-button
      @click="openSettting()"
      type="primary"
      icon="unordered-list"
      size="small"
    >
      批量设置
    </a-button>
    <a-table
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="list"
      bordered
      size="small"
      :pagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
    >
      <template slot="price" slot-scope="record">
        <a-input-number
          :min="0"
          v-model="record.price"
          :formatter="
            value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
        />
      </template>
      <template slot="originalPrice" slot-scope="record">
        <a-input-number
          :min="0"
          v-model="record.originalPrice"
          :formatter="
            value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
        />
      </template>
      <template slot="inventory" slot-scope="record">
        <a-input-number :min="0" v-model="record.inventory" />
      </template>
      <template slot="cover" slot-scope="record">
        <avatarUpload
          ref="coverUpload"
          :id="record.id"
          :img="record.cover"
          @change="uploadCover"
        ></avatarUpload>
      </template>
    </a-table>

    <a-modal
      title="批量设置"
      v-model="visible"
      width="500px"
      style="top: 10px;"
      @ok="handleOk"
      :maskClosable="false"
    >
      <div>
        <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
          <a-form-model-item label="销售价格">
            <a-input-number
              :min="0"
              v-model="batchInfo.price"
              :formatter="
                value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
            />
            <a-checkbox
              style="padding-left: 20px;"
              default-checked
              @change="changePrice"
            >
              替换
            </a-checkbox>
          </a-form-model-item>
          <a-form-model-item label="商品原价">
            <a-input-number
              :min="0"
              v-model="batchInfo.originalPrice"
              :formatter="
                value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
            />
            <a-checkbox
              style="padding-left: 20px;"
              default-checked
              @change="changeOriginalPrice"
            >
              替换
            </a-checkbox>
          </a-form-model-item>
          <a-form-model-item label="商品库存">
            <a-input-number :min="0" v-model="batchInfo.inventory" />
            <a-checkbox
              style="padding-left: 20px;"
              default-checked
              @change="changeInventory"
            >
              替换
            </a-checkbox>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>
<script>
import * as utils from "@/pages/admin/libs/utils";
export default {
  name: "infoSpecVal",
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload")
  },
  data() {
    return {
      goodsInfo: {},
      specNameList: [],
      list: [],
      listJson: "",
      selectedRowKeys: [],
      columns: [
        {
          title: "规格选项",
          dataIndex: "specVal"
        },
        {
          title: "销售价格",
          dataIndex: "",
          scopedSlots: { customRender: "price" },
          align: "center",
          width: 120
        },
        {
          title: "商品原价",
          dataIndex: "",
          scopedSlots: { customRender: "originalPrice" },
          align: "center",
          width: 120
        },
        {
          title: "商品库存",
          dataIndex: "",
          scopedSlots: { customRender: "inventory" },
          align: "center",
          width: 120
        },
        {
          title: "图片",
          dataIndex: "",
          scopedSlots: { customRender: "cover" },
          align: "center",
          width: 120
        }
      ],
      visible: false,
      batchInfo: {
        price: 0,
        ckPrice: true,
        originalPrice: 0,
        ckOriginalPrice: true,
        inventory: 0,
        ckInventory: true
      }
    };
  },
  watch: {
    list: {
      // eslint-disable-next-line no-unused-vars
      handler: function(val, oldVal) {
        this.$emit("update", this.list);
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    setData(goodsInfo) {
      this.goodsInfo = goodsInfo;
      this.list = this.goodsInfo.specValList;
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    setSpecNameList(specNameList) {
      this.specNameList = specNameList;
      var tlist = [];
      this.setSpecValList(tlist, "", 0);
      var index = 0;
      tlist.forEach(x => {
        var query = this.list.filter(j => j.specVal === x);
        if (query.length > 0) {
          query[0].sortId = index;
        } else {
          this.list.push({
            id: utils.getId(),
            goodsId: "",
            specVal: x,
            originalPrice: 0,
            price: 0,
            inventory: 0,
            sales: 0,
            cover: "",
            sortId: index
          });
        }
        index++;
      });
      let tempList = this.list.slice();
      tempList.forEach(x => {
        var query = tlist.filter(j => j === x.specVal);
        if (query.length === 0) {
          this.list = this.list.filter(k => k.specVal !== x.specVal);
        }
      });

      //排序
      this.list.sort(function(a, b) {
        return a.sortId - b.sortId;
      });
      this.selectedRowKeys = [];
    },
    setSpecValList(tlist, tagVal, listIndex) {
      if (this.specNameList.length > listIndex) {
        const element = this.specNameList[listIndex];
        element.specTags.forEach(tag => {
          var newTagVal = tag;
          if (tagVal) {
            newTagVal = tagVal + "," + tag;
          }
          if (listIndex + 1 === this.specNameList.length) {
            tlist.push(newTagVal);
          }

          var index = listIndex + 1;
          this.setSpecValList(tlist, newTagVal, index);
        });
      }
    },
    uploadCover(info) {
      var id = info.id;
      var uploadUrl = info.uploadUrl;
      var query = this.list.filter(x => {
        return x.id === id;
      });
      if (query.length > 0) {
        query[0].cover = uploadUrl;
      }
    },
    changePrice(e) {
      this.batchInfo.ckPrice = e.target.checked;
    },
    changeOriginalPrice(e) {
      this.batchInfo.ckOriginalPrice = e.target.checked;
    },
    changeInventory(e) {
      this.batchInfo.ckInventory = e.target.checked;
    },
    //批量设置
    openSettting() {
      if (this.selectedRowKeys.length > 0) {
        this.visible = true;
      } else {
        this.$error({
          title: "提示",
          content: "选择需要设置的规格商品"
        });
      }
    },
    handleOk() {
      this.selectedRowKeys.forEach(x => {
        var query = this.list.filter(k => k.id === x);
        if (query.length > 0) {
          if (this.batchInfo.ckPrice) {
            query[0].price = this.batchInfo.price || 0;
          }
          if (this.batchInfo.ckOriginalPrice) {
            query[0].originalPrice = this.batchInfo.originalPrice || 0;
          }
          if (this.batchInfo.ckInventory) {
            query[0].inventory = this.batchInfo.inventory || 0;
          }
        }
      });
      this.visible = false;
    },
    getData() {
      return this.list;
    }
  }
};
</script>
