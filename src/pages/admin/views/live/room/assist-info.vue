<template>
  <a-card>
    <a-row class="live-state" type="flex">
      <a-col class="state-bg">&nbsp;</a-col>
      <a-col :span="20" class="state-text">{{
        isActive ? "直播中" : "未直播"
      }}</a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <a-row class="title-cont" type="flex">
      <a-col style="width: 20px;">&nbsp;</a-col>
      <a-col :span="10">
        <div class="live-title">{{ model.title }}</div>
        <div>主播：{{ anchor.name }}</div>
        <div>直播时间：{{ model.liveTime }}</div>
        <div>观看：{{ getOnline }}</div>
      </a-col>
      <a-col
        :span="10"
        style="text-align:right; padding-top: 15px; padding-right: 20px;"
        >{{ model.notice }}</a-col
      >
      <a-col style="padding-top:15px;">
        <a-button @click="showNoticeInfo()" type="primary">发布公告</a-button>
      </a-col>
    </a-row>

    <a-row class="live-info">
      <a-col class="left-cont" :span="16">
        <div v-if="isActive">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @ready="playerReadied"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @fullscreenchange="onFullscreenChange($event)"
            :events="events"
          ></video-player>
        </div>
        <div v-else class="banner-img">
          <img class="live-img" :src="baseUrl + model.img" />
        </div>
        <assist-info-chart ref="assistInfoChart"></assist-info-chart>
      </a-col>
      <a-col class="right-cont" :span="8">
        <a-tabs type="card" default-active-key="1">
          <a-tab-pane key="1" tab="互动评论">
            <div
              id="msg-list"
              class="msg-list"
              :style="`height:${tabHeight}px;`"
            >
              <div v-for="item in msgList" :key="item.id" class="msg-item">
                <a-row type="flex">
                  <a-col>
                    <img
                      class="user-icon"
                      :src="getAvatar(item)"
                      :onerror="defUserImg"
                    />
                  </a-col>
                  <a-col :span="19" class="msg-item-cont">
                    <div>
                      <span class="user-name">{{ item.name }}</span>
                      <span class="msg-time">{{ item.createDate }}</span>
                    </div>
                    <div
                      class="msg-item-text"
                      v-html="item.cont.replace(/\#(.+?)\;/gi, emotion)"
                    ></div>
                  </a-col>
                  <a-col style="padding-left:10px;">
                    <a-button
                      @click="banned(item)"
                      shape="round"
                      type="danger"
                      size="small"
                      >禁</a-button
                    >
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="禁言记录">
            <div class="banned-list" :style="`height:${tabHeight}px;`">
              <div
                v-for="item in bannedList"
                :key="item.id"
                class="banned-item"
              >
                <a-row type="flex">
                  <a-col>
                    <img
                      class="user-icon"
                      :src="getAvatar(item)"
                      :onerror="defUserImg"
                    />
                  </a-col>
                  <a-col :span="19" class="banned-item-cont">
                    <div>
                      <span class="user-name">{{ item.name }}</span>
                      <span class="banned-time">{{ item.createDate }}</span>
                    </div>
                    <div class="banned-item-text">
                      到期时间：{{ item.bannedTime }}
                    </div>
                  </a-col>
                  <a-col style="padding-left:10px;">
                    <a-button
                      title="删除"
                      icon="delete"
                      shape="round"
                      type="danger"
                      size="small"
                      @click="_delBanned(item.id)"
                    />
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

    <a-row type="flex" style="padding-top:10px;">
      <a-col>
        在线人数&nbsp;
        <a-input-number v-model="model.people" :min="0" />
      </a-col>
      <a-col style="padding-left:10px;">
        点赞人数&nbsp;
        <a-input-number v-model="model.zan" :min="0" />
      </a-col>
      <a-col style="padding-left:10px;">
        <a-button @click="_savePopularity" type="primary"
          >保存自定义人气</a-button
        >
      </a-col>
    </a-row>

    <set-banned ref="setBanned" @close="closeSaveBanned"></set-banned>
    <notice-info ref="noticeInfo" @close="closeNoticeInfo"></notice-info>
  </a-card>
</template>

<script>
import TIM from "tim-js-sdk";
import COS from "cos-js-sdk-v5";
import * as utils from "@/pages/admin/libs/utils";
import {
  getLiveInfo,
  liveState,
  savePopularity,
  livePlayInfo
} from "@/pages/admin/api/live/livelist";
import {
  enterLive,
  getUserInfo,
  getUserSig,
  addUserByGroup
} from "@/pages/admin/api/live/liveuser";
import { getBannedList, delBanned } from "@/pages/admin/api/live/livebanned";
import { getImSDKAppID } from "@/pages/admin/api/sys/sysconfig";
import $ from "jquery";

export default {
  name: "assist-info",
  components: {
    assistInfoChart: () =>
      import("@/pages/admin/views/live/room/components/assist-info-chart"),
    setBanned: () => import("@/pages/admin/views/member/user/set-banned"),
    noticeInfo: () => import("@/pages/admin/views/live/room/components/notice-info")
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/admin/zwtp.jpg'`,
      defUserImg: `this.src='/img/admin/usernull.png'`,
      isSDKReady: false,
      jobTime: null, //定时器
      isActive: false, //是否直播中
      events: ["fullscreenchange"],
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 16:9横屏 9:16竖屏   将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: "" //你的m3u8地址（必填）
          }
        ],
        poster: "/mobile/img/def-play.png", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      model: {
        id: "",
        title: "",
        img: "",
        anchorList: [],
        shareCont: "", //分享简介
        intro: "",
        people: 0,
        peopleOnline: 0,
        zan: 0,
        notice: "", //公告内容
        thirdRtmpPlayUrl: ""
      },
      anchor: {
        avatar: "",
        name: ""
      },
      user: {},
      tabHeight: 300,
      tab1Title: "0条",
      tab2Title: "禁用0人",
      tim: null,
      msgList: [],
      scrollBottom: true,
      bannedList: [] //禁言记录
    };
  },
  computed: {
    emojiList() {
      return this.$store.state.adminSetting.emojiList;
    },
    getOnline() {
      var online = Number(this.model.people) + Number(this.model.peopleOnline);
      return utils.tranNumber(online);
    }
  },
  watch: {
    iaActive() {
      this.$nextTick(() => {
        //设置选项卡内容高度
        this.getTabHeight();
      });
    }
  },
  mounted() {
    this._getUserInfo();
    this._liveInfo();
    this.jobTime = setInterval(() => {
      //查询一次直播状态
      this._liveState();
      //在线人数
      this._livePlayInfo();
      if (!this.isSDKReady) {
        //尝试im再次登录
        this.login();
      }
      this.getTabHeight();
    }, 1000 * 30);
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.jobTime);
    this.jobTime = null;
  },
  methods: {
    _getUserInfo() {
      getUserInfo().then(res => {
        if (res.code === 0) {
          Object.assign(this.user, res.data);
          //加载腾讯im消息sdk
          this.timLoad();
        }
      });
    },
    _liveState() {
      if (this.model.id) {
        liveState({ id: this.model.id }).then(res => {
          if (res.code === 0) {
            // this.zan = Number(res.data.zan);
            if (this.model.thirdRtmpPlayUrl) {
              //使用第三方直播流
              this.isActive = true;
              this.playerOptions.aspectRatio = this.voideScale;
            } else {
              var playState = res.data.playState;
              if (playState === "active") {
                this.playerOptions.aspectRatio = this.voideScale;
                this.isActive = playState === "active" ? true : false;
              }
            }
          }
        });
      }
    },
    _livePlayInfo() {
      if (this.model.id) {
        if (!this.model.thirdRtmpPlayUrl) {
          var dtime = utils.parseTime(new Date());
          livePlayInfo({ id: this.model.id, dtime: dtime }).then(res => {
            if (res.code === 0) {
              if (res.data) {
                this.model.peopleOnline =
                  res.data.Online <= 0 ? 1 : res.data.Online;
              }
            }
          });
        }
      }
    },
    _liveInfo() {
      if (this.$route.query.id) {
        getLiveInfo({ id: this.$route.query.id }).then(res => {
          if (res.code === 0) {
            Object.assign(this.model, res.data.liveList);
            this.model.people = this.model.people || 0;
            this.model.peopleOnline = this.model.peopleOnline || 0;
            this.tabList = res.data.tabList;
            if (this.model.anchorList && this.model.anchorList.length > 0) {
              this.anchor = this.model.anchorList[0];
            }
            this.playerOptions.sources[0].src = this.model.rtmpPlayUrl;
            //通知进入直播间
            this._enterLive();
            this.$nextTick(() => {
              //设置选项卡内容高度
              this.getTabHeight();
            });

            //获取禁言记录
            this._getBannedList();
            this.login();
            //加载统计图
            this.$refs.assistInfoChart.loadData(this.model.id);

            this._liveState();
            this._livePlayInfo();
          }
        });
      } else {
        this.$dialog.alert({ message: "直播id参数错误" }).then(() => {
          this.$router.go(-1);
        });
      }
    },
    _enterLive() {
      enterLive().then(res => {
        if (res.code === 0) {
          console.log("进入直播间");
        }
      });
    },
    getTabHeight() {
      // var vm = this;
      var vh = $(".left-cont").height();
      this.tabHeight = vh - 40;

      // var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
      // var nScrollTop = 0; //滚动到的当前位置
      // var nDivHight = this.tagHeight;
      // $(".msg-list").scroll(function() {
      //   nScrollHight = $(this)[0].scrollHeight;
      //   nScrollTop = $(this)[0].scrollTop;
      //   if (nScrollTop + nDivHight >= nScrollHight) {
      //     vm.scrollBottom = true;
      //   } else {
      //     vm.scrollBottom = false;
      //   }
      // });
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      // eslint-disable-next-line no-useless-escape
      let word = res.replace(/\#|\;/gi, "");
      let index = this.emojiList.indexOf(word);
      return `<img src="${this.baseUrl}/images/emoji/${index}.gif" name="${word}" align="middle">`;
    },
    timLoad() {
      if (
        !this.$store.state.account.SDKAppID ||
        !this.$store.state.account.tim
      ) {
        getImSDKAppID().then(res => {
          if (res.code === 0) {
            this.$store.commit("adminAccount/setSDKAppID", res.data);
            this.timCreate();
            this.initListener();
          }
        });
      } else {
        try {
          this.tim = this.$store.state.account.tim;
          this.$store.state.account.tim.setLogLevel(4);
          this.initListener();
        } catch (e) {
          this.timCreate();
          this.initListener();
        }
      }
    },
    timCreate() {
      var tim = TIM.create({
        SDKAppID: this.$store.state.account.SDKAppID
      });
      // 无日志级别 tim.setLogLevel(4);
      tim.setLogLevel(4);
      // 注册 cos
      tim.registerPlugin({ "cos-js-sdk": COS });
      window.tim = tim;
      window.TIM = TIM;
      this.$store.commit("adminAccount/setTim", tim);
      this.tim = tim;
    },
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
      // SDK NOT READT
      this.tim.on(TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);
      // // SDK内部出错
      this.tim.on(TIM.EVENT.ERROR, this.onError);
      // 收到新消息
      this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
    },
    login() {
      // 开始登录
      console.log("IM登录", this.user);
      var vm = this;
      getUserSig().then(res => {
        if (res.code === 0) {
          let promise = this.tim.login({
            userID: res.data.userID,
            userSig: res.data.userSig
          });
          promise
            .then(function(imResponse) {
              if (imResponse.data.repeatLogin === true) {
                // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
                vm.isSDKReady = true;
                vm.addGroup();
              }
            })
            .catch(function(imError) {
              console.warn("login error:", imError); // 登录失败的相关信息
            });
        }
      });
    },
    addGroup() {
      this.addGroupUser();
    },
    addGroupUser() {
      var vm = this;
      let promise = this.tim.joinGroup({
        groupID: this.model.id,
        type: TIM.TYPES.GRP_AVCHATROOM
      });
      promise
        .then(function(imResponse) {
          switch (imResponse.data.status) {
            case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
              break;
            case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
              //加群记录保存到数据库
              addUserByGroup({ id: vm.model.id }).then(res => {
                if (res.code === 0) {
                  console.log("成功加入聊天群 " + vm.model.id);
                }
              });
              break;
            case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
              break;
            default:
              break;
          }
        })
        .catch(function(imError) {
          console.warn("joinGroup error:", imError); // 申请加群失败的相关信息
        });
    },
    onReadyStateUpdate({ name }) {
      //   console.log("onReadyStateUpdate", name);
      this.isSDKReady = name === TIM.EVENT.SDK_READY ? true : false;
      if (this.isSDKReady) {
        // im sdk 加载完成 用户加入到群
        this.addGroup();
      }
    },
    //收到新消息
    onReceiveMessage({ data: messageList }) {
      // console.log("收到新消息", JSON.stringify(messageList));
      var vm = this;
      messageList.map(x => {
        console.log("onReceiveMessage", x);
        if (
          x.conversationType &&
          x.conversationType === "GROUP" &&
          x.to === vm.model.id
        ) {
          var text = "";
          if (x.priority === "Lowest") {
            text = "进入直播间";
            vm.model.peopleOnline = vm.model.peopleOnline + 1;
          } else {
            text = x.payload.text;
          }
          var msgItem = {
            id: utils.getId(),
            liveId: vm.model.id,
            userid: x.from,
            name: x.nick,
            avatar: x.avatar,
            cont: text,
            msgType: "text",
            createDate: utils.timestampToDateString(x.time)
          };
          vm.pushMsgList(msgItem);
        } else if (
          x.conversationType &&
          x.conversationType === "@TIM#SYSTEM" &&
          x.to === vm.model.id
        ) {
          if (x.payload.userDefinedField) {
            var obj = JSON.parse(x.payload.userDefinedField);
            if (obj.type === "customPeople") {
              vm.model.people = obj.people;
              vm.model.zan = obj.zan;
            } else if (obj.type === "notice") {
              vm.model.notice = obj.notice;
            }
          }
        }
      });
    },
    onError({ data }) {
      if (data.message !== "Network Error") {
        this.$notification.error({
          message: "提示",
          description: data.message
        });
      }
    },
    pushMsgList(msgItem) {
      var vm = this;
      vm.msgList.unshift(msgItem);
      if (vm.msgList.length > 50) {
        vm.msgList = vm.msgList.slice(0, 50);
      }
    },
    banned(record) {
      this.$refs.setBanned.loadData(record.userid, record.name, this.model.id);
    },
    getAvatar(item) {
      if (item.avatar) {
        return item.avatar.indexOf("http") === 0
          ? item.avatar
          : this.baseUrl + item.avatar;
      } else {
        return "/img/admin/usernull.png";
      }
    },
    // 获取禁用列表
    _getBannedList() {
      getBannedList({
        searchText: "",
        liveId: this.model.id,
        current: 1,
        pageSize: 100
      }).then(res => {
        if (res.code === 0) {
          this.bannedList = res.data.list;
        }
      });
    },
    // 删除禁用记录
    _delBanned(nid) {
      var vm = this;
      this.$confirm({
        title: "确定要删除吗?",
        content: "",
        onOk() {
          delBanned({ ids: [nid] }).then(res => {
            if (res.code === 0) {
              vm._getBannedList();
            }
          });
        },
        onCancel() {}
      });
    },
    closeSaveBanned() {
      this._getBannedList();
    },
    _savePopularity() {
      savePopularity({
        id: this.model.id,
        people: this.model.people,
        zan: this.model.zan
      }).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
        }
      });
    },
    showNoticeInfo() {
      this.$refs.noticeInfo.loadData(this.model.id);
    },
    //公告保存成功
    closeNoticeInfo(res) {
      this.model.notice = res.notice;
    },
    playerReadied() {
      $("body")
        .find("video")
        .attr("x-webkit-airplay", "allow");
    },
    // eslint-disable-next-line no-unused-vars
    onPlayerPlay(player) {},
    // eslint-disable-next-line no-unused-vars
    onPlayerPause(player) {
      console.log(player);
    },
    onFullscreenChange(player) {
      // player.exitFullscreen() //强制退出全屏，恢复正常大小
      if (player.isFullscreen()) {
        var wh = document.documentElement.clientHeight; //$(window).height();
        $(".vjs-tech").css({ height: wh + "px" });
        $(".vjs-fluid").css({ height: wh + "px" });
      } else {
        $(".vjs-tech").css({ height: "600px" });
        $(".vjs-fluid").css({ height: "600px" });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .vjs-tech {
  width: 100%;
  height: 600px;
}
/deep/ .vjs-fluid {
  padding-top: 600px;
}

.live-state {
  .state-bg {
    width: 10px;
    background-color: #40a9ff;
    margin-right: 10px;
  }
  .state-text {
    line-height: 32px;
  }
}
.title-cont {
  margin-top: 10px;
  line-height: 30px;
  .live-title {
    font-size: 18px;
    font-weight: bold;
  }
}
.live-info {
  margin-top: 20px;
  background-color: #efefef;
  .banner-img {
    .live-img {
      width: 100%;
      max-height: 600px;
    }
  }
  .right-cont {
    padding-left: 10px;
    /deep/ .ant-tabs-tab {
      min-width: 150px;
      text-align: center;
    }
    .user-icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-top: 10px;
    }

    .msg-list {
      min-height: 300px;
      overflow: auto;
      .msg-item {
        padding: 10px;
        padding-bottom: 20px;
        &:nth-child(odd) {
          background-color: #ffffff;
        }
        &:nth-child(even) {
          background-color: #efefef;
        }

        .msg-item-cont {
          padding-left: 10px;
          line-height: 30px;
          .user-name {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
          .msg-time {
            padding-left: 10px;
            color: #999999;
          }
          .msg-item-text {
            color: #666666;
          }
        }
      }
    }
    .banned-list {
      min-height: 300px;
      overflow: auto;
      .banned-item {
        padding: 10px;
        padding-bottom: 20px;
        &:nth-child(odd) {
          background-color: #ffffff;
        }
        &:nth-child(even) {
          background-color: #efefef;
        }

        .banned-item-cont {
          padding-left: 10px;
          line-height: 30px;
          .user-name {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
          .banned-time {
            padding-left: 10px;
            color: #999999;
          }
          .banned-item-text {
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
