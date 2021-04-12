<template>
<<<<<<< HEAD
	<div>
		<a-button @click="addTabs()" type="primary" icon="plus" size="small">添加选项卡</a-button>
		<a-table :rowKey="record => record.id" :columns="columns" :dataSource="list" bordered size="small" :pagination="false">
			<template slot="tabType" slot-scope="record">
				{{ typeText(record) }}
			</template>
			<template slot="action" slot-scope="record">
				<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />&nbsp;
				<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del(record.id)" />
			</template>
		</a-table>
		<tab-info v-if="showTabInfo" ref="tabInfo" :isAdd="isAdd" :infoList="infoList" :infoObj="infoObj" @getInfo="getTagInfo"
		 @onClose="tabInfoClose"></tab-info>
	</div>
</template>

<script>
	export default {
		name: "info-tab",
		components: {
			tabInfo: () => import("@/pages/admin/views/live/room/tab-info")
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
				//选项卡
				list: [],
				columns: [{
						title: "标题",
						dataIndex: "title"
					},
					{
						title: "类型",
						dataIndex: "",
						scopedSlots: {
							customRender: "tabType"
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
				isAdd: false,
				infoObj: null,
				infoList: [],
				showTabInfo: false
			};
		},
		mounted() {},
		methods: {
			setTabList(tabList) {
				this.list = tabList;
			},
			typeText(item) {
				var states = [
					"",
					"图文类型",
					"互动评论",
					"跳转链接"
				];
				if (item.tabType) {
					return states[item.tabType];
				} else {
					return "";
				}
			},
			addTabs() {
				this.isAdd = true;
				this.infoList = this.list;
				this.infoObj = null;
				this.showTabInfo = true;
				// this.$refs.tabInfo.loadData(true, this.list, null);
			},
			edit(item) {
				var obj = { ...item
				};
				this.isAdd = false;
				this.infoList = this.list;
				this.infoObj = obj;
				this.showTabInfo = true;
				// this.$refs.tabInfo.loadData(false, this.list, obj);
			},
			del(id) {
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						vm.list = vm.list.filter(x => x.id !== id);
						vm.$emit("del", vm.list);
					},
					onCancel() {}
				});
			},
			getTagInfo(item) {
				this.showTabInfo = false;
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
			},
			tabInfoClose() {
				console.log("tabInfoClose");
				this.showTabInfo = false;
			},
			getTabList() {
				return this.list;
			}
		}
	};
=======
  <div>
    <a-button @click="addTabs()" type="primary" icon="plus" size="small"
      >添加选项卡</a-button
    >
    <a-table
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="list"
      bordered
      size="small"
      :pagination="false"
    >
      <template slot="tabType" slot-scope="record">
        {{ typeText(record) }}
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
    <tab-info
      v-if="showTabInfo"
      ref="tabInfo"
      :isAdd="isAdd"
      :infoList="infoList"
      :infoObj="infoObj"
      @getInfo="getTagInfo"
      @onClose="tabInfoClose"
    ></tab-info>
  </div>
</template>

<script>
export default {
  name: "info-tab",
  components: {
    tabInfo: () => import("@/pages/admin/views/live/room/tab-info")
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
      //选项卡
      list: [],
      columns: [
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "类型",
          dataIndex: "",
          scopedSlots: { customRender: "tabType" }
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
      isAdd: false,
      infoObj: null,
      infoList: [],
      showTabInfo: false
    };
  },
  mounted() {},
  methods: {
    setTabList(tabList) {
      this.list = tabList;
    },
    typeText(item) {
      var states = [
        "",
        "图文类型",
        "互动评论",
        "品牌展示",
        "跳转链接",
        "直播推荐"
      ];
      if (item.tabType) {
        return states[item.tabType];
      } else {
        return "";
      }
    },
    addTabs() {
      this.isAdd = true;
      this.infoList = this.list;
      this.infoObj = null;
      this.showTabInfo = true;
      // this.$refs.tabInfo.loadData(true, this.list, null);
    },
    edit(item) {
      var obj = { ...item };
      this.isAdd = false;
      this.infoList = this.list;
      this.infoObj = obj;
      this.showTabInfo = true;
      // this.$refs.tabInfo.loadData(false, this.list, obj);
    },
    del(id) {
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          vm.list = vm.list.filter(x => x.id !== id);
          vm.$emit("del", vm.list);
        },
        onCancel() {}
      });
    },
    getTagInfo(item) {
      this.showTabInfo = false;
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
    },
    tabInfoClose() {
      console.log("tabInfoClose");
      this.showTabInfo = false;
    },
    getTabList() {
      return this.list;
    }
  }
};
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</script>
