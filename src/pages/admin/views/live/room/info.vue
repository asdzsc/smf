<template>
  <a-drawer
    :title="title"
    width="75%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="所属栏目">
        <a-select
          v-model="model.columnKey"
          @change="changeColumn"
          labelInValue
          placeholder="请选择直播间所属栏目"
          style="width:600px;"
        >
          <a-select-option
            v-for="item in liveColumnList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="所属标签">
        <template v-for="item in liveColumnTags">
          <a-tag
            v-if="isCkTag(item)"
            @click="selTag(item)"
            :key="item"
            color="#2db7f5"
          >
            {{ item }}
          </a-tag>
          <a-tag v-else :key="item" @click="selTag(item)">{{ item }}</a-tag>
        </template>
      </a-form-model-item>

      <a-form-model-item label="开始时间">
        <a-date-picker
          show-time
          placeholder="请选择直播开始时间"
          @change="onChangeDate"
          v-model="model.liveTimeDate"
          style="width:600px;"
        />
      </a-form-model-item>

      <a-form-model-item label="标题">
        <a-input
          v-model="model.title"
          placeholder="请输入直播间标题"
          style="width:600px;"
        />
      </a-form-model-item>
      <a-form-model-item label="公告">
        <a-input
          v-model="model.notice"
          placeholder="请输入直播间公告"
          style="width:600px;"
        />
      </a-form-model-item>

      <a-form-model-item label="选择主播">
        <a-tag
          v-for="item in model.anchorList"
          :key="item.id"
          @close="() => closeTagAnchor(item)"
          color="#2db7f5"
          closable
        >
          {{ item.name }}
        </a-tag>
        <a-tag
          @click="selAnchor"
          style="background: #fff; borderStyle: dashed; cursor: pointer;"
        >
          <a-icon type="plus" />添加
        </a-tag>
      </a-form-model-item>

      <a-form-model-item label="辅播管理员">
        <a-tag
          v-for="item in model.assistList"
          :key="item.id"
          @close="() => closeTagAssist(item)"
          color="#2db7f5"
          closable
        >
          {{ item.name }}
        </a-tag>
        <a-tag
          @click="selAssist"
          style="background: #fff; borderStyle: dashed; cursor: pointer;"
        >
          <a-icon type="plus" />添加
        </a-tag>
      </a-form-model-item>

      <a-form-model-item label="横竖屏直播">
        <a-select
          v-model="model.isVerticalKey"
          labelInValue
          placeholder="请选择横竖屏直播"
          style="width:600px;"
          @change="changeIsVertical"
        >
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

      <a-form-model-item
        v-show="model.isVertical === '1'"
        label="视频封面图"
        class="formItemAvatar"
      >
        <avatar-upload
          ref="verticalImgUpload"
          @change="uploadVerticalImg"
        ></avatar-upload>
        <div class="remark">
          直播视频封面为直播未开始或暂停时显示的宣传页，推荐尺寸为：9：16，支持JPG、PNG格式，图片大小不超过4M
        </div>
      </a-form-model-item>

      <a-form-model-item label="海报背景图" class="formItemAvatar">
        <avatar-upload
          ref="bgImgUpload"
          @change="uploadBgImgUpload"
        ></avatar-upload>
        <div class="remark">
          推荐尺寸为：750*1334，支持JPG、PNG格式，图片大小不超过4M
        </div>
      </a-form-model-item>

      <a-form-model-item label="分享简介">
        <a-textarea
          v-model="model.shareCont"
          placeholder="请输入分享简介"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          style="width:600px;"
        />
      </a-form-model-item>

      <a-form-model-item label="是否置顶">
        <a-switch
          checkedChildren="已置顶"
          unCheckedChildren="未置顶"
          :checked="model.isTop === '1' ? true : false"
          @change="setIsTop"
        />
      </a-form-model-item>

      <a-form-model-item label="直播间状态">
        <a-select
          v-model="model.stateKey"
          labelInValue
          placeholder="请选择直播间状态"
          style="width:600px;"
          @change="changeState"
        >
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
        <a-input
          v-model="model.mediaUrl"
          placeholder="请输入回播地址"
          style="width:600px;"
        />
      </a-form-model-item>

      <a-form-model-item label="第三方RTMP推流地址">
        <a-input
          v-model="model.thirdRtmpUrl"
          placeholder="请输入第三方RTMP推流地址"
          style="width:600px;"
        />
        <div class="remark">
          当输入了第三方RTMP推流地址将不会在调用腾讯云直播推流地址，同时必须填写第三方的HLS播放地址
        </div>
      </a-form-model-item>

      <a-form-model-item label="第三方HLS播放地址">
        <a-input
          v-model="model.thirdRtmpPlayUrl"
          placeholder="请输入第三方HLS播放地址"
          style="width:600px;"
        />
        <div class="remark">
          当输入了第三方HLS播放地址将不会在调用腾讯云的HLS播放地址，同时必须填写第三方的RTMP推流地址
        </div>
      </a-form-model-item>

      <!-- <a-form-model-item label="红包链接">
        <a-input
          v-model="model.hbUrl"
          placeholder="请输入红包链接"
          style="width:600px;"
        />
      </a-form-model-item>
      <a-form-model-item label="咨询链接">
        <a-input
          v-model="model.zxUrl"
          placeholder="请输入咨询链接"
          style="width:600px;"
        />
      </a-form-model-item> -->

      <a-form-model-item label="自定义人气">
        <a-input-number :min="0" v-model="model.people" />
      </a-form-model-item>
      <a-form-model-item label="自定义点赞">
        <a-input-number :min="0" v-model="model.zan" />
      </a-form-model-item>

      <a-form-model-item label="选项卡">
        <info-tab ref="infoTab" @del="delTab"></info-tab>
      </a-form-model-item>

      <a-form-model-item label="简介">
        <script
          id="editor"
          type="text/plain"
          style="width:100%;height:500px;"
        ></script>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">确定</a-button>
        <a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 选择主播 -->
    <anchor-modal ref="anchorModal" @return="getAnchorList"></anchor-modal>
    <!-- 选择辅播管理 -->
    <assist-modal ref="assistModal" @return="getAssistList"></assist-modal>
  </a-drawer>
</template>

<script>
import { getLiveColumnListAll } from "@/pages/admin/api/live/livecolumn";
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
    anchorModal: () => import("@/pages/admin/components/anchor-modal/list"),
    assistModal: () => import("@/pages/admin/components/assist-modal/list")
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
      liveColumnList: [], //直播间栏目列表
      liveColumnTags: [], //栏目对应的标签
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
        isVerticalKey: [{ key: "0" }],
        isVertical: "0",
        shareCont: "", //分享简介
        intro: "",
        liveTime: "",
        liveTimeDate: null,
        img: "",
        verticalImg: "", //竖屏封面图
        isTop: "0", //是否置顶
        stateKey: [{ key: "0" }],
        state: "0", //直播间状态
        mediaUrl: "", //回播地址
        anchorIds: [], //主播用户id
        anchorList: [], //主播列表
        assistIds: [], //辅播用户id
        assistList: [], //辅播列表
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
      this.liveColumnTags = [];
      this.cascaderVal = [];
      this.tabList = [];
      this.tabList.push(this.createTabInfo("楼盘动态", "1", 1));
      this.tabList.push(this.createTabInfo("互动", "2", 2));
      this.tabList.push(this.createTabInfo("品牌展示", "3", 3));
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
    //获取所有直播间栏目列表
    _getLiveColumnListAll() {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        getLiveColumnListAll().then(res => {
          if (res.code === 0) {
            this.liveColumnList = res.data;
          }
          resolve(res);
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    changeColumn(value, option) {
      this.model.columnId = value.key;
      this.getColumnTagList(this.model.columnId);
    },
    getColumnTagList(columnId) {
      if (columnId) {
        var query = this.liveColumnList.filter(x => {
          return x.id === columnId;
        });
        if (query.length > 0) {
          this.liveColumnTags = query[0].tags;
        }
      }
    },
    //验证标签是否选中
    isCkTag(item) {
      var query = this.model.tags.filter(x => {
        return x === item;
      });
      return query.length > 0 ? true : false;
    },
    //选择标签
    selTag(item) {
      var query = this.model.tags.filter(x => {
        return x === item;
      });
      if (query.length > 0) {
        this.model.tags = this.model.tags.filter(x => {
          return x !== item;
        });
      } else {
        this.model.tags.push(item);
      }
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
    //海报背景图
    uploadBgImgUpload(imgUrl) {
      this.model.bgImg = imgUrl;
    },
    //设置是否置顶
    setIsTop() {
      this.model.isTop = this.model.isTop === "0" ? "1" : "0";
    },
    //选择主播用户
    selAnchor() {
      this.$refs.anchorModal.loadData(this.model.anchorList);
    },
    //获取选中主播
    getAnchorList(anchorList) {
      anchorList.forEach(x => {
        var query = this.model.anchorList.filter(k => {
          return k !== x.id;
        });
        if (query.length == 0) {
          this.model.anchorList.push(x);
        }
      });
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
    //选择辅播管理员
    selAssist() {
      this.$refs.assistModal.loadData(this.model.assistList);
    },
    //获取选中择辅播
    getAssistList(assistList) {
      assistList.forEach(x => {
        var query = this.model.assistList.filter(k => {
          return k !== x.id;
        });
        if (query.length == 0) {
          this.model.assistList.push(x);
        }
      });
      // this.model.assistList = assistList;
      this.model.assistIds = this.model.assistList.map(x => {
        return x.id;
      });
    },
    //删除辅播用户
    closeTagAssist(removedTag) {
      this.model.assistIds = this.model.assistIds.filter(x => {
        return x !== removedTag.id;
      });
      this.model.assistList = this.model.assistList.filter(x => {
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
        getliveMediaUrl({ id: this.model.id }).then(res => {
          if (res.code === 0) {
            this.model.mediaUrl = res.data;
          }
        });
      }
    },
    loadData(nid) {
      this._getLiveColumnListAll().then(() => {
        // eslint-disable-next-line no-undef
        this.visible = true;
        this.initModel();
        if (nid) {
          this.title = "编辑直播间";
          getLiveInfo({ id: nid }).then(res => {
            if (res.code === 0) {
              Object.assign(this.model, res.data.liveList);
              this.model.tags = this.model.tags || [];
              this.model.anchorList = this.model.anchorList || [];
              this.model.assistList = this.model.assistList || [];
              this.model.columnKey = [{ key: this.model.columnId }];
              this.getColumnTagList(this.model.columnId);
              this.model.stateKey = [{ key: this.model.state }];

              this.$nextTick(() => {
                this.$refs.avatarUpload.loadData(this.model.img);
                this.$refs.verticalImgUpload.loadData(this.model.verticalImg);
                this.$refs.bgImgUpload.loadData(this.model.bgImg);
              });

              this.model.isVerticalKey = [{ key: this.model.isVertical }];
              if (this.model.liveTime) {
                this.model.liveTimeDate = moment(this.model.liveTime);
              }
              if (this.model.city) {
                this.cascaderVal = [
                  this.model.province,
                  this.model.city,
                  this.model.area
                ];
              }

              this.tabList = res.data.tabList;
              this.bindData();
            }
          });
        } else {
          this.title = "添加直播间";
          this.$nextTick(() => {
            this.$refs.avatarUpload.loadData(this.model.img);
            this.$refs.verticalImgUpload.loadData(this.model.verticalImg);
            this.$refs.bgImgUpload.loadData(this.model.bgImg);
          });
          this.bindData();
        }
      });
    },
    bindData() {
      var vm = this;
      vm.model.intro = vm.model.intro || "";
      this.$nextTick(() => {
        this.$refs.infoTab.setTabList(this.tabList);
      });
      this.$nextTick(() => {
        window.UE.delEditor("editor");
        this.ue = window.UE.getEditor("editor");
        this.ue.addListener("ready", function() {
          vm.ue.setContent(vm.model.intro);
        });
      });
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
</style>
