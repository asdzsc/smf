<template>
	<a-modal :title="title" v-model="visible" width="860px" :bodyStyle="{ padding: '10px',minHeight:'500px' }" @cancel="onClose"
	 :footer="null">

		<div class="operator">
			<a-row type="flex" justify="start">
				<a-col style="padding-right:10px;">
					<a-button @click="saveSort()" type="primary" icon="sort-ascending">保存排序</a-button>
					&nbsp;
					<a-button @click="add()" type="primary" icon="plus">新增</a-button>
					&nbsp;
					<a-button @click="delAll()" icon="delete" type="danger">批量删除</a-button>
				</a-col>
				<a-col :span="10">
					<a-input-search v-model="pagination.searchText" placeholder="关键字搜索" :loading="loading" @search="onSearch"
					 enterButton />
				</a-col>
			</a-row>
		</div>
		<a-table size="small" bordered :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="pagination"
		 :rowSelection="{
		    selectedRowKeys: selectedRowKeys,
		    onChange: onSelectChange
		  }" :loading="loading"
		 @change="onChange" :scroll="{ y: 600 }">
			<template slot="img" slot-scope="record">
				<img :src="getImg(record)" @click="showImg(record)" :onerror="defImg" :style="{ width: '40px', height: '40px' }" />
			</template>
			<template slot="sortId" slot-scope="record">
				<a-input-number :min="0" v-model="record.sortId" @change="changeSort(record)" />
			</template>
			<template slot="action" slot-scope="record">
				<a-button title="编辑" icon="edit" shape="round" type="primary" size="small" @click="edit(record)" />
				&nbsp;
				<a-button title="删除" icon="delete" shape="round" type="danger" size="small" @click="del([record.id])" />
			</template>
		</a-table>

		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
		<mediaAddImage v-if="showMediaAddImage" :id="infoId" :memoryId="memoryId" ref="mediaAddImage" @onClose="closeMediaAddImage"></mediaAddImage>
		<mediaAddVideo v-if="showMediaAddVideo" :id="infoId" :memoryId="memoryId" ref="mediaAddVideo" @onClose="closeMediaAddVideo"></mediaAddVideo>

	</a-modal>
</template>
<script>
	import {
		memoryMediaList,
		saveMemoryMediaSort,
		delMemoryMedia
	} from "@/pages/admin/api/memory/memory";
	export default {
		components: {
			showImg: () => import("@/pages/admin/components/show-img/show-img.vue"),
			mediaAddImage: () => import("@/pages/admin/views/memory/info/components/info-media-addImage.vue"),
			mediaAddVideo: () => import("@/pages/admin/views/memory/info/components/info-media-addVideo.vue")
		},
		props: {
			memoryId: {
				type: String,
				default () {
					return ""
				}
			},
			mediaType: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				visible: false,
				title: '',
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/admin/zwtp.jpg'`,
				list: [],
				selectedRowKeys: [],
				pagination: {
					memoryId: "", //纪念馆id
					searchText: "",
					mediaType: "", //附件类型
					isPage: true, //是否分页
					current: 1,
					pageSize: 10,
					showSizeChanger: true,
					showTotal: total => {
						return `共 ${total} 条`;
					}
				},
				loading: false,
				columns: [{
						title: "图片",
						dataIndex: "",
						scopedSlots: {
							customRender: "img"
						},
						align: "center",
						width: 100
					},
					{
						title: "标题",
						dataIndex: "title"
					},
					{
						title: "排序",
						dataIndex: "",
						scopedSlots: {
							customRender: "sortId"
						},
						align: "center",
						width: 120
					},
					{
						title: "创建日期",
						dataIndex: "createDate",
						align: "center",
						width: 170
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
				showImgModal: false,
				infoId: '',
				showMediaAddImage: false,
				showMediaAddVideo: false
			};
		},
		mounted() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.visible = true;
				this.pagination.memoryId = this.memoryId
				this.pagination.mediaType = this.mediaType
				this.title = this.mediaType === 'image' ? '纪念相册' : '纪念视频'
				this.getList();
			},
			// eslint-disable-next-line no-unused-vars
			onChange(pagination, filters, sorter) {
				// console.log("params", pagination, filters, sorter);
				this.pagination = Object.assign(this.pagination, pagination);
				if (sorter.order) {
					this.pagination.orderField = sorter.field;
					this.pagination.order = sorter.order;
				} else {
					this.pagination.orderField = "";
					this.pagination.order = "";
				}
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
				memoryMediaList(pagination).then(res => {
					this.loading = false;
					if (res.code === 0) {
						this.list = res.data.list;
						pagination.total = parseFloat(res.data.total);
						this.pagination = pagination;
					}
				});
			},
			getImg(record) {
				var imgUrl = record.url
				if (record.mediaType === 'video') {
					imgUrl = record.cover
				}
				if (imgUrl) {
					if (imgUrl.indexOf("http") >= 0) {
						return imgUrl;
					} else {
						return this.baseUrl + imgUrl;
					}
				} else {
					return "/img/admin/zwtp.png";
				}
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
				saveMemoryMediaSort(this.list).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.getList();
					}
				});
			},
			showImg(record) {
				this.showImgModal = true;
				this.$nextTick(() => {
					setTimeout(() => {
						var imgUrl = this.getImg(record)
						this.$refs.showImg.loadData(imgUrl, [imgUrl]);
					}, 200);
				});
			},
			//关闭图片展示弹窗
			showImgClose() {
				this.showImgModal = false;
			},
			add() {
				this.infoId = ''
				if (this.mediaType === 'image') {
					this.showMediaAddImage = true
				}
				if (this.mediaType === 'video') {
					this.showMediaAddVideo = true
				}
			},
			edit(record) {
				this.infoId = record.id
				if (record.mediaType === 'image') {
					this.showMediaAddImage = true
				}
				if (record.mediaType === 'video') {
					this.showMediaAddVideo = true
				}
			},
			//添加相册关闭
			closeMediaAddImage(res) {
				try {
					if (res.code === 0) {
						this.onSearch()
					}
				} catch (e) {}
				this.$nextTick(() => {
					this.showMediaAddImage = false
				})
			},
			//添加视频关闭
			closeMediaAddVideo(res) {
				try {
					if (res.code === 0) {
						this.onSearch()
					}
				} catch (e) {}
				this.$nextTick(() => {
					this.showMediaAddVideo = false
				})
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
						delMemoryMedia({
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
			onClose() {
				this.visible = false;
				this.$emit("onClose");
			}
		}
	};
</script>
<style lang="less" scoped>
	.operator {
		margin-bottom: 18px;
	}

	.fmImg {
<<<<<<< HEAD
		min-width: 40px; 	
=======
		min-width: 40px;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		min-height: 40px;
		max-width: 100px;
		max-height: 60px;
	}
</style>
