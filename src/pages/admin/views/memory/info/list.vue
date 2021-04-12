<template>
<<<<<<< HEAD
  <a-card>
    <a-row>
      <a-col :span="3">
        <a-tree
          :treeData="treeData"
          :expandedKeys="expandedKeys"
          @expand="onExpandTree"
          @select="onSelectTree"
        />
      </a-col>
      <a-col :span="21">
        <div class="operator">
          <a-row type="flex" justify="start">
            <a-col style="padding-right: 10px">
              <a-button @click="saveSort()" type="primary" icon="sort-ascending"
                >保存排序</a-button
              >
              &nbsp;
              <a-button @click="add()" type="primary" icon="plus"
                >新增</a-button
              >
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
            :rowKey="(record) => record.id"
            :dataSource="list"
            :pagination="pagination"
            :rowSelection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
            :loading="loading"
            @change="onChange"
          >
            <template slot="photo" slot-scope="record">
              <img
                :src="baseUrl + record"
                :onerror="defImg"
                @click="showImg(baseUrl + record)"
                class="fmImg"
              />
            </template>
            <template slot="status" slot-scope="record">
              <a-switch
                checkedChildren="公开"
                unCheckedChildren="不公开"
                :checked="record.status === '0' ? true : false"
                @change="setStatus(record)"
              />
            </template>
            <template slot="templateName" slot-scope="record">
              <a
                v-if="record.templateName !== '免费模版'"
                @click="goodsInfo(record)"
              >
                {{ record.templateName }}
              </a>
              <span v-else>
                {{ record.templateName }}
              </span>
            </template>
            <template slot="sortId" slot-scope="record">
              <a-input-number
                :min="0"
                v-model="record.sortId"
                @change="changeSort(record)"
              />
            </template>
            <template slot="action" slot-scope="record">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item @click="edit(record)">
                    <a-icon type="edit" />编辑
                  </a-menu-item>
                  <a-menu-item @click="showQrcode(record)">
                    <a-icon type="qrcode" />二维码
                  </a-menu-item>
                  <a-menu-item @click="showMediaImg(record)">
                    <a-icon type="file-image" />纪念相册
                  </a-menu-item>
                  <a-menu-item @click="showMemoryMsg(record)">
                    <a-icon type="message" />祭奠留言
                  </a-menu-item>
                  <a-menu-item @click="showMemoryArticle(record)">
                    <a-icon type="profile" />纪念文章
                  </a-menu-item>
                  <a-menu-item @click="showMediaVideo(record)">
                    <a-icon type="video-camera" />纪念视频
                  </a-menu-item>
                  <a-menu-item @click="del([record.id])" style="color: #ff7875">
                    <a-icon type="delete" />删除
                  </a-menu-item>
                </a-menu>
                <a-button
                  title="更多"
                  shape="round"
                  type="primary"
                  size="small"
                >
                  操作&nbsp;&nbsp;
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </template>
          </a-table>
        </div>
      </a-col>
    </a-row>

    <info v-if="showInfo" :id="infoId" ref="info" @onClose="infoClose"></info>
    <showImg
      v-if="showImgModal"
      ref="showImg"
      @onClose="showImgClose"
    ></showImg>
    <!-- 模版商品详情 -->
    <goodsInfo
      v-if="showGoodsInfo"
      :id="goodsinfoId"
      ref="goodsInfo"
      @onClose="goodsInfoClose"
    ></goodsInfo>

    <memoryQrcode ref="memoryQrcode"></memoryQrcode>
    <memoryMedia
      v-if="showMemoryMediaImg"
      :memoryId="infoId"
      mediaType="image"
      ref="memoryMediaImg"
      @onClose="mediaImgClose"
    ></memoryMedia>
    <memoryMedia
      v-if="showMemoryMediaVideo"
      :memoryId="infoId"
      mediaType="video"
      ref="memoryMediaVideo"
      @onClose="mediaVideoClose"
    ></memoryMedia>

    <!-- 祭奠留言 -->
    <memoryMsg
      v-if="showMemoryMsgList"
      :memoryInfo="infoObj"
      ref="memoryMsg"
      @onClose="memoryMsgClose"
    ></memoryMsg>
    <!-- 纪念文章 -->
    <memoryArticle
      v-if="showMemoryArticleList"
      :memoryInfo="infoObj"
      ref="memoryArticle"
      @onClose="memoryArticleClose"
    ></memoryArticle>
  </a-card>
</template>

<script>
import { getMemoryColumnList } from "@/pages/admin/api/memory/column";
import {
  getMemoryList,
  setMemoryStatus,
  saveMemorySort,
  delMemory,
} from "@/pages/admin/api/memory/memory";
export default {
  components: {
    info: () => import("@/pages/admin/views/memory/info/info"),
    showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
    memoryQrcode: () =>
      import("@/pages/admin/views/memory/info/components/info-qrcode.vue"),
    memoryMedia: () =>
      import("@/pages/admin/views/memory/info/components/info-media.vue"),
    memoryMsg: () =>
      import("@/pages/admin/views/memory/info/components/info-msg.vue"),
    memoryArticle: () =>
      import("@/pages/admin/views/memory/info/components/info-article.vue"),
    goodsInfo: () => import("@/pages/admin/views/shop/goods/info"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/usernull.png'`,
      treeData: [],
      expandedKeys: [], //部门树默认展开顶级节点
      list: [],
      selectedRowKeys: [],
      pagination: {
        columnId: "",
        status: "",
        searchText: "",
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => {
          return `共 ${total} 条`;
        },
      },
      loading: false,
      columns: [
        {
          title: "照片",
          dataIndex: "photo",
          scopedSlots: {
            customRender: "photo",
          },
          width: 150,
        },
        {
          title: "姓名",
          dataIndex: "name",
        },
        {
          title: "分类",
          dataIndex: "columnName",
          width: 200,
        },
        {
          title: "模版名称",
          dataIndex: "",
          scopedSlots: {
            customRender: "templateName",
          },
          width: 200,
        },
        {
          title: "状态",
          dataIndex: "",
          scopedSlots: {
            customRender: "status",
          },
          align: "center",
          width: 100,
        },
        {
          title: "排序",
          dataIndex: "",
          scopedSlots: {
            customRender: "sortId",
          },
          align: "center",
          width: 100,
        },
        {
          title: "创建日期",
          dataIndex: "createDate",
          align: "center",
          width: 150,
        },
        {
          title: "操作",
          dataIndex: "",
          width: 130,
          align: "center",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      showInfo: false,
      infoId: "",
      infoObj: null,
      showImgModal: false,
      showMemoryMediaImg: false, //显示相册附件
      showMemoryMediaVideo: false, //显示视频附件
      showMemoryMsgList: false, //祭奠留言
      showMemoryArticleList: false, //纪念文章
      goodsinfoId: "", //模版商品id
      showGoodsInfo: false, //模版商品
    };
  },
  mounted() {
    this.getColumnList();
    this.getList();
  },
  methods: {
    getColumnList() {
      getMemoryColumnList({}).then((res) => {
        if (res.code === 0) {
          // this.treeData = res.data.treeData;
          this.treeData.splice(0, 0, {
            id: "0",
            key: "0",
            value: "0",
            pid: "-1",
            title: "全部数据",
            name: "全部数据",
            isLeaf: false,
            children: res.data.treeData,
          });
          this.expandedKeys = ["0"];
        }
      });
    },
    onExpandTree(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    onSelectTree(selectedKeys, event) {
      this.pagination.columnId = event.node.value;
      this.onSearch();
    },
    // eslint-disable-next-line no-unused-vars
    onChange(pagination, filters, sorter) {
      // console.log("params", pagination, filters, sorter);
      this.pagination = Object.assign(this.pagination, pagination);
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
      getMemoryList(pagination).then((res) => {
        console.log(res);
        this.loading = false;
        if (res.code === 0) {
          this.list = res.data.list;
          pagination.total = parseFloat(res.data.total);
          this.pagination = pagination;
        }
      });
    },
    setStatus(record) {
      this.$confirm({
        title: "确定要修改公开状态吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          var status = record.status === "0" ? "1" : "0";
          setMemoryStatus({
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
    //编辑排序
    changeSort(record) {
      var query = this.list.filter((x) => {
        return x.id === record.id;
      });
      if (query.length > 0) {
        query[0].sortId = record.sortId;
      }
    },
    //保存排序
    saveSort() {
      saveMemorySort(this.list).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.getList();
        }
      });
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
        this.onSearch();
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
          description: "请选择需要删除的数据",
        });
        return;
      }
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delMemory({
            ids: list,
          }).then((res) => {
            if (res.code === 0) {
              vm.onSearch();
            }
          });
        },
        onCancel() {},
      });
    },
    goodsInfo(record) {
      this.goodsinfoId = record.templateId;
      this.showGoodsInfo = true;
    },
    goodsInfoClose(res) {
      this.$nextTick(() => {
        this.showGoodsInfo = false;
      });
      if (res.code === 0) {
        this.onSearch();
      }
    },
    showImg(imgUrl) {
      this.showImgModal = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.showImg.loadData(imgUrl, [imgUrl]);
        }, 200);
      });
    },
    showImgClose() {
      this.showImgModal = false;
    },
    //显示二维码
    showQrcode(record) {
      this.$refs.memoryQrcode.loadData(record);
    },
    //显示相册附件
    showMediaImg(record) {
      this.infoId = record.id;
      this.showMemoryMediaImg = true;
    },
    mediaImgClose() {
      this.$nextTick(() => {
        this.showMemoryMediaImg = false;
      });
    },
    //显示视频附件
    showMediaVideo(record) {
      this.infoId = record.id;
      this.showMemoryMediaVideo = true;
    },
    mediaVideoClose() {
      this.$nextTick(() => {
        this.showMemoryMediaVideo = false;
      });
    },
    //显示留言
    showMemoryMsg(record) {
      this.infoObj = record;
      this.showMemoryMsgList = true;
    },
    memoryMsgClose() {
      this.$nextTick(() => {
        this.showMemoryMsgList = false;
      });
    },
    showMemoryArticle(record) {
      this.infoObj = record;
      this.showMemoryArticleList = true;
    },
    memoryArticleClose() {
      this.$nextTick(() => {
        this.showMemoryArticleList = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}

.fmImg {
  min-width: 40px;
  min-height: 40px;
  max-width: 100px;
  max-height: 60px;
}
=======
	<a-card>
		<a-row>
			<a-col :span="3">
				<a-tree :treeData="treeData" :expandedKeys="expandedKeys" @expand="onExpandTree" @select="onSelectTree" />
			</a-col>
			<a-col :span="21">
				<div class="operator">
					<a-row type="flex" justify="start">
						<a-col style="padding-right:10px;">
							<a-button @click="saveSort()" type="primary" icon="sort-ascending">保存排序</a-button>
							&nbsp;
							<a-button @click="add()" type="primary" icon="plus">新增</a-button>
							&nbsp;
							<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
						</a-col>
						<a-col :span="5">
							<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
							 enterButton />
						</a-col>
					</a-row>
				</div>
				<div>
					<a-table size="middle" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="pagination"
					 :rowSelection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
					 :loading="loading" @change="onChange">
						<template slot="photo" slot-scope="record">
							<img :src="baseUrl + record" :onerror="defImg" @click="showImg(baseUrl + record)" class="fmImg" />
						</template>
						<template slot="status" slot-scope="record">
							<a-switch checkedChildren="公开" unCheckedChildren="不公开" :checked="record.status === '0' ? true : false" @change="setStatus(record)" />
						</template>
						<template slot="templateName" slot-scope="record">
							<a v-if="record.templateName !== '免费模版'" @click="goodsInfo(record)">
								{{ record.templateName }}
							</a>
							<span v-else>
								{{ record.templateName }}
							</span>
						</template>
						<template slot="sortId" slot-scope="record">
							<a-input-number :min="0" v-model="record.sortId" @change="changeSort(record)" />
						</template>
						<template slot="action" slot-scope="record">
							<a-dropdown>
								<a-menu slot="overlay">
									<a-menu-item @click="edit(record)">
										<a-icon type="edit" />编辑
									</a-menu-item>
									<a-menu-item @click="showQrcode(record)">
										<a-icon type="qrcode" />二维码
									</a-menu-item>
									<a-menu-item @click="showMediaImg(record)">
										<a-icon type="file-image" />纪念相册
									</a-menu-item>
									<a-menu-item @click="showMemoryMsg(record)">
										<a-icon type="message" />祭奠留言
									</a-menu-item>
									<a-menu-item @click="showMemoryArticle(record)">
										<a-icon type="profile" />纪念文章
									</a-menu-item>
									<a-menu-item @click="showMediaVideo(record)">
										<a-icon type="video-camera" />纪念视频
									</a-menu-item>
									<a-menu-item @click="del([record.id])" style="color:#ff7875;">
										<a-icon type="delete" />删除
									</a-menu-item>
								</a-menu>
								<a-button title="更多" shape="round" type="primary" size="small">
									操作&nbsp;&nbsp;
									<a-icon type="down" />
								</a-button>
							</a-dropdown>
						</template>
					</a-table>
				</div>
			</a-col>
		</a-row>

		<info v-if="showInfo" :id="infoId" ref="info" @onClose="infoClose"></info>
		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
		<memoryQrcode ref="memoryQrcode"></memoryQrcode>
		<memoryMedia v-if="showMemoryMediaImg" :memoryId="infoId" mediaType="image" ref="memoryMediaImg" @onClose="mediaImgClose"></memoryMedia>
		<memoryMedia v-if="showMemoryMediaVideo" :memoryId="infoId" mediaType="video" ref="memoryMediaVideo" @onClose="mediaVideoClose"></memoryMedia>

		<!-- 祭奠留言 -->
		<memoryMsg v-if="showMemoryMsgList" :memoryInfo="infoObj" ref="memoryMsg" @onClose="memoryMsgClose"></memoryMsg>
		<!-- 纪念文章 -->
		<memoryArticle v-if="showMemoryArticleList" :memoryInfo="infoObj" ref="memoryArticle" @onClose="memoryArticleClose"></memoryArticle>

	</a-card>
</template>

<script>
	import {
		getMemoryColumnList
	} from "@/pages/admin/api/memory/column";
	import {
		getMemoryList,
		setMemoryStatus,
		saveMemorySort,
		delMemory
	} from "@/pages/admin/api/memory/memory";
	export default {
		components: {
			info: () => import("@/pages/admin/views/memory/info/info"),
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
			memoryQrcode: () => import("@/pages/admin/views/memory/info/components/info-qrcode.vue"),
			memoryMedia: () => import("@/pages/admin/views/memory/info/components/info-media.vue"),
			memoryMsg: () => import("@/pages/admin/views/memory/info/components/info-msg.vue"),
			memoryArticle: () => import("@/pages/admin/views/memory/info/components/info-article.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/usernull.png'`,
				treeData: [],
				expandedKeys: [], //部门树默认展开顶级节点
				list: [],
				selectedRowKeys: [],
				pagination: {
					columnId: "",
					status: "",
					searchText: "",
					current: 1,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				columns: [{
						title: "照片",
						dataIndex: "photo",
						scopedSlots: {
							customRender: "photo"
						},
						width: 150
					}, {
						title: "姓名",
						dataIndex: "name"
					},
					{
						title: "分类",
						dataIndex: "columnName",
						width: 200
					},
					{
						title: "模版名称",
						dataIndex: "",
						scopedSlots: {
							customRender: "templateName"
						},
						width: 200
					},
					{
						title: "状态",
						dataIndex: "",
						scopedSlots: {
							customRender: "status"
						},
						align: "center",
						width: 100
					},
					{
						title: "排序",
						dataIndex: "",
						scopedSlots: {
							customRender: "sortId"
						},
						align: "center",
						width: 100
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center",
						width: 150
					},
					{
						title: "操作",
						dataIndex: "",
						width: 130,
						align: "center",
						scopedSlots: {
							customRender: "action"
						}
					}
				],
				showInfo: false,
				infoId: '',
				infoObj: null,
				showImgModal: false,
				showMemoryMediaImg: false, //显示相册附件
				showMemoryMediaVideo: false, //显示视频附件
				showMemoryMsgList: false, //祭奠留言
				showMemoryArticleList: false //纪念文章
			};
		},
		mounted() {
			this.getColumnList();
			this.getList();
		},
		methods: {
			getColumnList() {
				getMemoryColumnList({}).then(res => {
					if (res.code === 0) {
						// this.treeData = res.data.treeData;
						this.treeData.splice(0, 0, {
							id: "0",
							key: "0",
							value: "0",
							pid: "-1",
							title: "全部数据",
							name: "全部数据",
							isLeaf: false,
							children: res.data.treeData
						});
						this.expandedKeys = ["0"];
					}
				});
			},
			onExpandTree(expandedKeys) {
				this.expandedKeys = expandedKeys;
			},
			onSelectTree(selectedKeys, event) {
				this.pagination.columnId = event.node.value;
				this.onSearch();
			},
			// eslint-disable-next-line no-unused-vars
			onChange(pagination, filters, sorter) {
				// console.log("params", pagination, filters, sorter);
				this.pagination = Object.assign(this.pagination, pagination);
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
				const pagination = { ...this.pagination
				};
				getMemoryList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			setStatus(record) {
				this.$confirm({
					title: "确定要修改公开状态吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						var status = record.status === "0" ? "1" : "0";
						setMemoryStatus({
							id: record.id,
							status: status
						}).then(res => {
							if (res.code === 0) {
								record.status = status;
							}
						});
					},
					onCancel() {}
				});
			},
			//编辑排序
			changeSort(record) {
				var query = this.list.filter(x => {
					return x.id === record.id;
				});
				if (query.length > 0) {
					query[0].sortId = record.sortId;
				}
			},
			//保存排序
			saveSort() {
				saveMemorySort(this.list).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.getList();
					}
				});
			},
			add() {
				this.infoId = ""
				this.showInfo = true;
			},
			edit(record) {
				this.infoId = record.id
				this.showInfo = true;
			},
			infoClose(res) {
				this.$nextTick(() => {
					this.showInfo = false;
				});
				if (res.code === 0) {
					this.onSearch();
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
						description: "请选择需要删除的数据"
					});
					return;
				}
				var vm = this;
				this.$confirm({
					title: "确定要删除吗?",
					content: "",
					onOk() {
						delMemory({
							ids: list
						}).then(res => {
							if (res.code === 0) {
								vm.onSearch();
							}
						});
					},
					onCancel() {}
				});
			},
			goodsInfo(record) {
				this.goodsinfoId = record.templateId;
				this.showGoodsInfo = true;
			},
			goodsInfoClose(res) {
				this.$nextTick(() => {
					this.showGoodsInfo = false;
				});
				if (res.code === 0) {
					this.onSearch();
				}
			},
			showImg(imgUrl) {
				this.showImgModal = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.showImg.loadData(imgUrl, [imgUrl]);
					}, 200);
				});
			},
			showImgClose() {
				this.showImgModal = false;
			},
			//显示二维码
			showQrcode(record) {
				this.$refs.memoryQrcode.loadData(record);
			},
			//显示相册附件
			showMediaImg(record) {
				this.infoId = record.id
				this.showMemoryMediaImg = true
			},
			mediaImgClose() {
				this.$nextTick(() => {
					this.showMemoryMediaImg = false
				})
			},
			//显示视频附件
			showMediaVideo(record) {
				this.infoId = record.id
				this.showMemoryMediaVideo = true
			},
			mediaVideoClose() {
				this.$nextTick(() => {
					this.showMemoryMediaVideo = false
				})
			},
			//显示留言
			showMemoryMsg(record) {
				this.infoObj = record
				this.showMemoryMsgList = true
			},
			memoryMsgClose() {
				this.$nextTick(() => {
					this.showMemoryMsgList = false
				})
			},
			showMemoryArticle(record) {
				this.infoObj = record
				this.showMemoryArticleList = true
			},
			memoryArticleClose() {
				this.$nextTick(() => {
					this.showMemoryArticleList = false
				})
			}
		}
	};
</script>

<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}

	.fmImg {
		min-width: 40px;
		min-height: 40px;
		max-width: 100px;
		max-height: 60px;
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
