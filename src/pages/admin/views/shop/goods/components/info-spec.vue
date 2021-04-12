<template>
<<<<<<< HEAD
	<div>
		<a-collapse v-model="activeKey">
			<a-collapse-panel key="1" header="规格列表">
				<a-button @click="add()" type="primary" icon="plus" size="small">
					添加规格
				</a-button>
				<a-table :rowKey="record => record.id" :columns="columns" :dataSource="list" bordered size="small" :pagination="false">
					<template slot="specTags" slot-scope="record">
						{{ getTagCont(record) }}
					</template>
					<template slot="action" slot-scope="record">
						<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />&nbsp;
						<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del(record.id)" />
					</template>
				</a-table>
			</a-collapse-panel>
			<a-collapse-panel key="2" header="多规格商品">
				<infoSpecVal ref="infoSpecVal" @update="updateSpecVal"></infoSpecVal>
			</a-collapse-panel>
		</a-collapse>

		<infoSpecName v-if="showSpecName" ref="infoSpecName" :specNameObj="specNameObj" @getInfo="getSpecNameInfo" @onClose="specNameClose"></infoSpecName>
	</div>
</template>

<script>
	export default {
		name: "infoSpec",
		components: {
			infoSpecName: () => import("@/pages/admin/views/shop/goods/components/info-spec-name"),
			infoSpecVal: () => import("@/pages/admin/views/shop/goods/components/info-spec-val")
		},
		props: {
			// value: {
			//   type: Array,
			//   default() {
			//     return [];
			//   }
			// }
		},
		data() {
			return {
				goodsInfo: {},
				activeKey: ["1", "2"],
				list: [],
				columns: [{
						title: "规格名称",
						dataIndex: "specName",
						width: 130
					},
					{
						title: "规格选项",
						dataIndex: "specTags",
						scopedSlots: {
							customRender: "specTags"
						}
					},
					{
						title: "排序",
						dataIndex: "sortId",
						align: "center",
						width: 100
					},
					{
						title: "操作",
						dataIndex: "",
						scopedSlots: {
							customRender: "action"
						},
						align: "center",
						width: 130
					}
				],
				showSpecName: false,
				specNameObj: null
			};
		},
		mounted() {},
		methods: {
			setData(goodsInfo) {
				this.goodsInfo = goodsInfo;
				this.list = this.goodsInfo.specNameList;
				this.$refs.infoSpecVal.setData(goodsInfo);
			},
			getTagCont(record) {
				return record.join(",");
			},
			add() {
				this.specNameObj = null;
				this.showSpecName = true;
			},
			edit(item) {
				var obj = { ...item
				};
				this.specNameObj = obj;
				this.showSpecName = true;
			},
			del(id) {
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						vm.list = vm.list.filter(x => x.id !== id);
						vm.$emit("del", vm.list);

						vm.setSpecval();
					},
					onCancel() {}
				});
			},
			getSpecNameInfo(item) {
				this.showSpecName = false;
				var query = this.list.filter(x => x.id === item.id);
				if (query.length > 0) {
					Object.assign(query[0], item);
				} else {
					this.list.push(item);
				}
				//排序
				this.list.sort(function(a, b) {
					return a.sortId - b.sortId;
				});

				this.setSpecval();
			},
			specNameClose() {
				this.showSpecName = false;
			},
			setSpecval() {
				this.$refs.infoSpecVal.setSpecNameList(this.list);
			},
			//设置商品总的价格，库存
			updateSpecVal(specValList) {
				var data = {
					specNameList: this.list,
					specValList: specValList
				};
				this.$emit("update", data);
			},
			getData() {
				var specValList = this.$refs.infoSpecVal.getData();
				return {
					specNameList: this.list,
					specValList: specValList
				};
			}
		}
	};
=======
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="规格列表">
        <a-button @click="add()" type="primary" icon="plus" size="small">
          添加规格
        </a-button>
        <a-table
          :rowKey="record => record.id"
          :columns="columns"
          :dataSource="list"
          bordered
          size="small"
          :pagination="false"
        >
          <template slot="specTags" slot-scope="record">
            {{ getTagCont(record) }}
          </template>
          <template slot="action" slot-scope="record">
            <a-button
              title="编辑"
              icon="edit"
              shape="round"
              type="primary"
              size="small"
              @click="edit(record)"
            />&nbsp;
            <a-button
              title="删除"
              icon="delete"
              shape="round"
              type="danger"
              size="small"
              @click="del(record.id)"
            />
          </template>
        </a-table>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="多规格商品">
        <infoSpecVal ref="infoSpecVal" @update="updateSpecVal"></infoSpecVal>
      </a-collapse-panel>
    </a-collapse>

    <infoSpecName
      v-if="showSpecName"
      ref="infoSpecName"
      :specNameObj="specNameObj"
      @getInfo="getSpecNameInfo"
      @onClose="specNameClose"
    ></infoSpecName>
  </div>
</template>

<script>
export default {
  name: "infoSpec",
  components: {
    infoSpecName: () => import("@/pages/admin/views/shop/goods/components/info-spec-name"),
    infoSpecVal: () => import("@/pages/admin/views/shop/goods/components/info-spec-val")
  },
  props: {
    // value: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // }
  },
  data() {
    return {
      goodsInfo: {},
      activeKey: ["1", "2"],
      list: [],
      columns: [
        {
          title: "规格名称",
          dataIndex: "specName",
          width: 130
        },
        {
          title: "规格选项",
          dataIndex: "specTags",
          scopedSlots: { customRender: "specTags" }
        },
        {
          title: "排序",
          dataIndex: "sortId",
          align: "center",
          width: 100
        },
        {
          title: "操作",
          dataIndex: "",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 130
        }
      ],
      showSpecName: false,
      specNameObj: null
    };
  },
  mounted() {},
  methods: {
    setData(goodsInfo) {
      this.goodsInfo = goodsInfo;
      this.list = this.goodsInfo.specNameList;
      this.$refs.infoSpecVal.setData(goodsInfo);
    },
    getTagCont(record) {
      return record.join(",");
    },
    add() {
      this.specNameObj = null;
      this.showSpecName = true;
    },
    edit(item) {
      var obj = { ...item };
      this.specNameObj = obj;
      this.showSpecName = true;
    },
    del(id) {
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          vm.list = vm.list.filter(x => x.id !== id);
          vm.$emit("del", vm.list);

          vm.setSpecval();
        },
        onCancel() {}
      });
    },
    getSpecNameInfo(item) {
      this.showSpecName = false;
      var query = this.list.filter(x => x.id === item.id);
      if (query.length > 0) {
        Object.assign(query[0], item);
      } else {
        this.list.push(item);
      }
      //排序
      this.list.sort(function(a, b) {
        return a.sortId - b.sortId;
      });

      this.setSpecval();
    },
    specNameClose() {
      this.showSpecName = false;
    },
    setSpecval() {
      this.$refs.infoSpecVal.setSpecNameList(this.list);
    },
    //设置商品总的价格，库存
    updateSpecVal(specValList) {
      var data = {
        specNameList: this.list,
        specValList: specValList
      };
      this.$emit("update", data);
    },
    getData() {
      var specValList = this.$refs.infoSpecVal.getData();
      return {
        specNameList: this.list,
        specValList: specValList
      };
    }
  }
};
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</script>
