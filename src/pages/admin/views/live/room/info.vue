<template>
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item label="标题">
				<a-input v-model="model.title" placeholder="请输入直播间标题" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="公告">
				<a-input v-model="model.notice" placeholder="请输入直播间公告" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="开始时间">
				<a-date-picker show-time placeholder="请选择直播开始时间" @change="onChangeDate" v-model="model.liveTimeDate" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="观看密码">
				<a-input v-model="model.pwd" placeholder="请输入观看密码" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="选择主播">
				<a-tag v-for="item in model.anchorList" :key="item.id" @close="() => closeTagAnchor(item)" color="#2db7f5" closable>
					{{ item.name }}
				</a-tag>
				<a-tag @click="selAnchor" style="background: #fff; borderStyle: dashed; cursor: pointer;">
					<a-icon type="plus" />添加
				</a-tag>
			</a-form-model-item>

			<a-form-model-item label="横竖屏直播">
				<a-select v-model="model.isVerticalKey" labelInValue placeholder="请选择横竖屏直播" style="width:600px;" @change="changeIsVertical">
					<a-select-option value="0">
						横屏直播
					</a-select-option>
					<a-select-option value="1">
						竖屏直播
					</a-select-option>
				</a-select>
			</a-form-model-item>

			<a-form-model-item label="封面图" class="formItemAvatar">
				<avatar-upload ref="avatarUpload" @change="upload"></avatar-upload>
				<div class="remark">
					推荐图片尺寸为：640*360，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>

			<a-form-model-item v-show="model.isVertical === '1'" label="视频封面图" class="formItemAvatar">
				<avatar-upload ref="verticalImgUpload" @change="uploadVerticalImg"></avatar-upload>
				<div class="remark">
					直播视频封面为直播未开始或暂停时显示的宣传页，推荐尺寸为：9：16，支持JPG、PNG格式，图片大小不超过4M
				</div>
			</a-form-model-item>

			<a-form-model-item label="直播间状态">
				<a-select v-model="model.stateKey" labelInValue placeholder="请选择直播间状态" style="width:600px;" @change="changeState">
					<a-select-option value="0">
						待发布
					</a-select-option>
					<a-select-option value="1">
						已发布
					</a-select-option>
					<a-select-option value="2">
						开始直播
					</a-select-option>
					<a-select-option value="3">
						直播结束
					</a-select-option>
				</a-select>
				<div class="remark">
					直播结束后会生成回放视频，回播放地址也可以手动填写mp4文件地址
				</div>
			</a-form-model-item>

			<a-form-model-item label="回播地址">
				<a-input v-model="model.mediaUrl" placeholder="请输入回播地址" style="width:600px;" />
			</a-form-model-item>

			<a-form-model-item label="第三方RTMP推流地址">
				<a-input v-model="model.thirdRtmpUrl" placeholder="请输入第三方RTMP推流地址" style="width:600px;" />
				<div class="remark">
					当输入了第三方RTMP推流地址将不会在调用腾讯云直播推流地址，同时必须填写第三方的HLS播放地址
				</div>
			</a-form-model-item>

			<a-form-model-item label="第三方HLS播放地址">
				<a-input v-model="model.thirdRtmpPlayUrl" placeholder="请输入第三方HLS播放地址" style="width:600px;" />
				<div class="remark">
					当输入了第三方HLS播放地址将不会在调用腾讯云的HLS播放地址，同时必须填写第三方的RTMP推流地址
				</div>
			</a-form-model-item>

			<a-form-model-item label="选项卡">
				<info-tab ref="infoTab" @del="delTab"></info-tab>
			</a-form-model-item>

			<a-form-model-item label="简介">
				<script id="editor" type="text/plain" style="width:100%;height:500px;"></script>
			</a-form-model-item>

			<!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">确定</a-button>
				<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
			</a-form-model-item> -->
		</a-form-model>
		
		<div style="height:50px;"></div>
		<div class="submit-cont">
			<a-button type="primary" @click="onSubmit">确定</a-button>
			<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
		</div>

		<!-- 选择服务人员 -->
		<userModel ref="userModel" deptType="1" :multiple="true" :showUser="true" userType="3" @return="getServeUserList"></userModel>
	</a-drawer>
</template>

<script>
	import {
		getLiveInfo,
		saveLiveInfo,
		getliveMediaUrl
	} from "@/pages/admin/api/live/livelist";
	import * as utils from "@/pages/admin/libs/utils";
	import moment from "moment";

	export default {
		name: "room-info",
		components: {
			avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload"),
			infoTab: () => import("@/pages/admin/views/live/room/info-tablist"),
			userModel: () => import("@/pages/admin/components/user-model/index")
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				visible: false,
				title: "",
				model: {},
				tabList: [],
				ue: null
			};
		},
		created() {},
		mounted() {
			this.initModel();
			this.loadData(this.id);
		},
		methods: {
			initModel() {
				var obj = {
					id: "",
					name: "",
					columnKey: [],
					columnId: "",
					tags: [],
					title: "",
					notice: "",
					pwd: "",
					isVerticalKey: [{
						key: "0"
					}],
					isVertical: "0",
					shareCont: "", //分享简介
					intro: "",
					liveTime: "",
					liveTimeDate: null,
					img: "",
					verticalImg: "", //竖屏封面图
					isTop: "0", //是否置顶
					stateKey: [{
						key: "0"
					}],
					state: "0", //直播间状态
					mediaUrl: "", //回播地址
					anchorIds: [], //主播用户id
					anchorList: [], //主播列表
					province: "", //省
					city: "", //市
					area: "", //区
					people: 0, //自定义人数
					zan: 0, //自定义点赞
					bgImg: "/images/fenxiang.jpg", //海报封面图
					hbUrl: "", //红包链接
					zxUrl: "", //咨询链接
					thirdRtmpUrl: "",
					thirdRtmpPlayUrl: ""
				};
				this.model = obj;
				this.model.pwd = utils.getId().substring(0,6)
				this.liveColumnTags = [];
				this.cascaderVal = [];
				this.tabList = [];
				this.tabList.push(this.createTabInfo("互动", "2", 1));
			},
			createTabInfo(title, tabType, sortId) {
				return {
					id: utils.getId(),
					title: title,
					tabType: tabType,
					sortId: sortId,
					url: "", //跳转链接
					cont: ""
				};
			},
			// eslint-disable-next-line no-unused-vars
			changeIsVertical(value, option) {
				this.model.isVertical = value.key;
			},
			//选择直播开始时间
			// eslint-disable-next-line no-unused-vars
			onChangeDate(date, dateString) {
				this.model.liveTimeDate = date;
				this.model.liveTime = dateString;
			},
			//上传成功返回图片路径
			upload(imgUrl) {
				this.model.img = imgUrl;
			},
			//竖屏直播封面图
			uploadVerticalImg(imgUrl) {
				this.model.verticalImg = imgUrl;
			},
			//选择主播用户
			selAnchor() {
				var checkedList = []
				this.model.anchorList.forEach(x => {
					var ckItem = {
						id: x.id,
						treeType: 'user',
						title: x.name
					}
					checkedList.push(ckItem)
				})
				this.$refs.userModel.loadData(checkedList);
			},
			//获取选中主播
			getServeUserList(list) {
				this.model.anchorList = list
				// this.model.anchorList = anchorList;
				this.model.anchorIds = this.model.anchorList.map(x => {
					return x.id;
				});
			},
			//删除主播用户
			closeTagAnchor(removedTag) {
				this.model.anchorIds = this.model.anchorIds.filter(x => {
					return x !== removedTag.id;
				});
				this.model.anchorList = this.model.anchorList.filter(x => {
					return x.id !== removedTag.id;
				});
			},
			//删除tab
			delTab(tabList) {
				this.tabList = tabList;
			},
			//修改直播间状态
			// eslint-disable-next-line no-unused-vars
			changeState(value, option) {
				this.model.state = value.key;
				//状态修改为结束时，并且回播地址为空就查询腾讯云的回播地址
				if (this.model.state === "3" && !this.model.mediaUrl) {
					getliveMediaUrl({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							this.model.mediaUrl = res.data;
						}
					});
				}
			},
			loadData(nid) {
				this.visible = true;
				this.initModel();
				if (nid) {
					this.title = "编辑直播间";
					getLiveInfo({
						id: nid
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data.liveList);
							this.model.tags = this.model.tags || [];
							this.model.anchorList = this.model.anchorList || [];
							this.model.stateKey = [{
								key: this.model.state
							}];
							this.model.isVerticalKey = [{
								key: this.model.isVertical
							}];
							if (this.model.liveTime) {
								this.model.liveTimeDate = moment(this.model.liveTime);
							}
							this.tabList = res.data.tabList;
							this.bindData();
						}
					});
				} else {
					this.title = "添加直播间";
					this.bindData();
				}
			},
			bindData() {
				var vm = this;
				vm.model.intro = vm.model.intro || "";
				setTimeout(() => {
					vm.$nextTick(() => {
						vm.$refs.avatarUpload.loadData(vm.model.img);
						vm.$refs.verticalImgUpload.loadData(vm.model.verticalImg);
						vm.$refs.infoTab.setTabList(vm.tabList);

						window.UE.delEditor("editor");
						vm.ue = window.UE.getEditor("editor");
						vm.ue.addListener("ready", function() {
							vm.ue.setContent(vm.model.intro);
						});
					});
				}, 200)
			},
			onSubmit() {
				this.tabList = this.$refs.infoTab.getTabList();
				this.model.intro = this.ue.getContent();
				saveLiveInfo({
					liveList: this.model,
					tabList: this.tabList
				}).then(res => {
					if (res.code === 0) {
						//情况数据
						this.initModel();
						this.$message.success("数据提交成功");
						this.onClose(res);
					}
				});
			},
			onClose(res) {
				this.visible = false;
				this.$emit("onClose", res);
			}
		}
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
