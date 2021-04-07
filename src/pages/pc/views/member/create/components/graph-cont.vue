<template>
  <div ref="graphCont" class="graphCont">
    <div
      style="width: 280px; border-right: 1px solid #dddddd;"
      @click="showLinkMenu = false"
    >
      <div style="padding-top: 10px;text-align:center">
        <a-button-group style="display: flex;justify-content: space-around;">
          <a-button @click="addNode()" type="primary" icon="plus"
            >人物</a-button
          >
          <a-button @click="addLink()" type="primary" icon="plus">
            关系
          </a-button>
          <a-button @click="delNode()" type="danger" icon="delete">
            删除
          </a-button>
        </a-button-group>
      </div>
      <!--  人物信息 -->
      <div v-show="showNodeInfo" style="padding-top:20px;">
        <table>
          <tr>
            <td class="graphLable">
              头像
            </td>
            <td>
              <imgsUpload
                ref="imgsUpload"
                :count="1"
                :multiple="false"
                @change="changeUpload"
                @remove="removeUpload"
              ></imgsUpload>
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              姓名
            </td>
            <td>
              <a-input
                v-model="node.name"
                placeholder="请输入家族谱标题"
                style="width: 190px;"
              />
              <span style="color: red;padding-left: 5px;">*</span>
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              出生
            </td>
            <td>
              <a-date-picker
                v-model="node.birthdayDate"
                placeholder="请选择出生时间"
                @change="changeBirthdayDate"
                style="width:190px;margin-top:5px;"
                inputReadOnly
              />
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              离世
            </td>
            <td>
              <a-date-picker
                v-model="node.dieTimeDate"
                :disabled-date="disabledDate"
                placeholder="请选择离世时间"
                @change="changeDieTimeDate"
                style="width:190px;margin-top:5px"
                inputReadOnly
              />
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              个人主页
            </td>
            <td>
              <a-input-search
                v-model="node.mname"
                inputReadOnly
                placeholder="关联个人主页"
                style="width:190px;margin-top:5px"
                @search="showMemoryListModal()"
              >
                <a-button type="primary" slot="enterButton">
                  选择
                </a-button>
              </a-input-search>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; padding-top: 10px;">
              <a-button type="primary" @click="saveNode()">确定</a-button>
            </td>
          </tr>
        </table>
      </div>
      <!--  关系连线 -->
      <div v-show="showLink" style="padding-top:20px;">
        <table>
          <tr>
            <td class="graphLable">
              人物
            </td>
            <td>
              <a-select
                v-model="link.fromKey"
                show-search
                labelInValue
                allowClear
                placeholder="请选择人物"
                option-filter-prop="children"
                style="width: 190px;"
                :filter-option="filterOption"
                @change="handleChange"
              >
                <a-select-option v-for="item in fromList" :value="item.id">
                  {{ item.text }}
                </a-select-option>
              </a-select>
              <span style="color: red;padding-left: 5px;">*</span>
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              人物
            </td>
            <td>
              <a-select
                v-model="link.toKey"
                show-search
                labelInValue
                allowClear
                placeholder="请选择人物"
                option-filter-prop="children"
                style="width: 190px;margin-top:5px;"
                :filter-option="filterOption"
                @change="handleChange2"
              >
                <a-select-option
                  v-for="item in toList"
                  :value="item.id"
                  style="margin-top:5px;"
                >
                  {{ item.text }}
                </a-select-option>
              </a-select>
              <span style="color: red;padding-left: 5px;">*</span>
            </td>
          </tr>
          <tr>
            <td class="graphLable">
              关系
            </td>
            <td>
              <a-input
                v-model="link.text"
                placeholder="请输入人物关系"
                style="width: 190px;margin-top:5px;"
              />
              <span style="color: red;padding-left: 5px;">*</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; padding-top: 10px;">
              <a-button type="primary" @click="saveLink()">确定</a-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div ref="graphPage" style="flex: 1;">
      <!-- 人物关系图组件 -->
      <relationGraph
        ref="relationGraph"
        :options="graphOptions"
        :style="{
          width: graphPanelSize.width + 'px',
          height: graphPanelSize.height + 'px',
        }"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      ></relationGraph>
    </div>

    <memoryList
      v-if="showMemoryList"
      ref="memoryList"
      @onClose="memoryListClose"
    ></memoryList>

    <!-- 关系连线删除菜单 -->
    <div
      v-show="showLinkMenu"
      :style="{
        left: linkMenuPosition.x + 'px',
        top: linkMenuPosition.y + 'px',
      }"
      class="linkMenu"
    >
      <a-button @click="delLink()" icon="delete" type="danger"
        >删除关系</a-button
      >
    </div>
  </div>
</template>

<script>
import moment from "moment";
import relationGraph from "relation-graph";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    relationGraph,
    imgsUpload: () =>
      import("@/pages/pc/views/member/components/imgs-upload.vue"),
    memoryList: () =>
      import("@/pages/pc/views/member/create/components/memory-list.vue"),
  },

  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `/img/usernull.png`,
      graphPanelSize: {
        width: 400,
        height: 400,
      },
      graphOptions: {
        allowSwitchLineShape: false,
        allowSwitchJunctionPoint: false,
        defaultJunctionPoint: "border",
        defaultLineShape: 1,
        defaultNodeBorderWidth: 0,
        layouts: [
          {
            label: "自动",
            layoutName: "force",
            layoutClassName: "seeks-layout-force",
            defaultLineShape: 1,
          },
          {
            label: "中心",
            layoutName: "center",
            layoutClassName: "seeks-layout-center",
            defaultLineShape: 1,
          },
          {
            label: "树状",
            layoutName: "tree",
            layoutClassName: "seeks-layout-center",
            defaultLineShape: 3,
          },
        ],
      },
      graph_json_data: {
        rootId: "",
        nodes: [],
        links: [],
      },
      showNodeInfo: true,
      node: {
        id: "",
        text: "",
        name: "",
        photo: "",
        birthdayDate: null,
        birthday: "", //生日
        dieTimeDate: null,
        dieTime: "", //离世日期
        url: "",
        mid: "",
        mname: "",
        color: "#004930",
        borderColor: "#004930",
        innerHTML: "",
      },
      showMemoryList: false, //显示选择个人主页
      showLink: false,
      link: {
        id: "",
        //自定义属性
        data: {
          id: "",
        },
        fromKey: {
          key: "",
        },
        from: "",
        fromName: "",
        toKey: {
          key: "",
        },
        to: "",
        toName: "",
        text: "",
      },
      showLinkMenu: false, //关系连线菜单
      linkMenuPosition: {
        x: 0,
        y: 0,
      },
      currentLink: null,
    };
  },
  computed: {
    fromList() {
      return this.graph_json_data.nodes.filter((x) => {
        return x.id !== this.link.to;
      });
    },
    toList() {
      return this.graph_json_data.nodes.filter((x) => {
        return x.id !== this.link.from;
      });
    },
  },
  mounted() {
    var vm = this;
    this.$nextTick(() => {
      setTimeout(function() {
        vm.showGraph();
      }, 200);
    });
  },
  methods: {
    //加载家族谱数据
    loadData(graphJson) {
      Object.assign(this.graph_json_data, graphJson);
      if (this.graph_json_data.nodes.length > 0) {
        this.graph_json_data.rootId = this.graph_json_data.nodes[0].id;
      }

      this.graph_json_data.nodes.forEach((x) => {
        this.$set(x, "text", x.name);
        this.$set(x, "birthdayDate", null);
        this.$set(x, "dieTimeDate", null);
        this.$set(x, "color", "#004930");
        this.$set(x, "borderColor", "#004930");
        this.$set(x, "innerHTML", "");
        if (x.birthday) {
          x.birthdayDate = moment(x.birthday);
        }
        if (x.dieTime) {
          x.dieTimeDate = moment(x.dieTime);
        }
        var photo = this.defImg;
        if (x.photo) {
          photo = this.baseUrl + x.photo;
        }
        var html =
          '<div class="c-my-node" style="background-image: url(' +
          photo +
          ');border:#004930 solid 1px;"><div class="c-node-name" >' +
          x.text +
          "</div></div>";
        x.innerHTML = html;
      });
      this.$refs.relationGraph.setJsonData(this.graph_json_data);
    },
    //初始化人物关系图
    showGraph() {
      var dw = this.$refs.graphCont.offsetWidth;
      var dh = this.$refs.graphCont.offsetHeight;
      this.graphPanelSize.width = dw - 283;
      this.graphPanelSize.height = dh - 2;
    },
    onNodeClick(nodeObject, $event) {
      var query = this.graph_json_data.nodes.filter((x) => {
        return x.id === nodeObject.id;
      });
      if (query.length > 0) {
        this.addNode();
        Object.assign(this.node, query[0]);
        console.log(this.node);
        if (this.node.photo) {
          var imgsList = [
            {
              uid: utils.getId(),
              name: utils.getId(),
              status: "done",
              imgUrl: this.node.photo,
              url: this.baseUrl + this.node.photo,
            },
          ];
          this.$refs.imgsUpload.setFileList(imgsList);
        }
      }
    },
    onLineClick(lineObject, $event) {
      var query = this.graph_json_data.links.filter((x) => {
        return x.id === lineObject.relations[0].data.id;
      });
      if (query.length > 0) {
        this.currentLink = lineObject;
        var _base_position = this.$refs.graphCont.getBoundingClientRect();
        console.log("showLinkMenu:", $event, _base_position);
        this.showLinkMenu = true;
        this.linkMenuPosition.x = $event.clientX - _base_position.x;
        this.linkMenuPosition.y = $event.clientY;
      }
    },
    //添加节点
    addNode() {
      this.showNodeInfo = true;
      this.showLink = false;
      this.node = {
        id: "",
        text: "",
        name: "",
        photo: "",
        birthdayDate: null,
        birthday: "", //生日
        dieTimeDate: null,
        dieTime: "", //离世日期
        url: "",
        mid: "",
        mname: "",
        color: "#004930",
        borderColor: "#004930",
        innerHTML: "",
      };
      //清除上传图片
      try {
        this.$refs.imgsUpload.setFileList([]);
      } catch (e) {}
    },
    addLink() {
      this.showNodeInfo = false;
      this.showLink = true;
      this.link = {
        id: "",
        data: {
          id: "",
        },
        from: "",
        to: "",
        text: "",
      };
    },
    //上传成功事件
    changeUpload(file) {
      this.node.photo = file.imgUrl;
    },
    //删除上传图片
    removeUpload(file) {
      this.node.photo = "";
    },
    //选择出生时间
    changeBirthdayDate(date, dateString) {
      this.node.birthdayDate = date;
      this.node.birthday = dateString + " 00:00:00";
    },
    //选择离世日期
    changeDieTimeDate(date, dateString) {
      this.node.dieTimeDate = date;
      this.node.dieTime = dateString + " 00:00:00";
    },
    //禁止选择的离世时间
    disabledDate(current) {
      return current && current > moment().endOf("day");
    },
    //显示个人主页列表
    showMemoryListModal() {
      this.showMemoryList = true;
    },
    memoryListClose(memoryInfo) {
      if (memoryInfo) {
        this.node.mid = memoryInfo.id;
        this.node.mname = memoryInfo.name;
      }
      this.$nextTick(() => {
        this.showMemoryList = false;
      });
    },
    //保存节点
    saveNode() {
      if (!this.node.name) {
        this.$notification.error({
          message: "提示",
          description: "人物姓名不能为空",
        });
        return false;
      }
      this.node.text = this.node.name;
      var photo = this.defImg;
      if (this.node.photo) {
        photo = this.baseUrl + this.node.photo;
      }
      var html =
        '<div class="c-my-node" style="background-image: url(' +
        photo +
        ');border:#004930 solid 1px;"><div class="c-node-name" >' +
        this.node.text +
        "</div></div>";
      if (this.node.id) {
        var nodeItem = this.$refs.relationGraph.getNodeById(this.node.id);
        this.graph_json_data.nodes.filter((x) => {
          if (x.id === this.node.id) {
            x.text = this.node.text;
            x.innerHTML = html;
          }
        });
        nodeItem.text = this.node.text;
        nodeItem.innerHTML = html;
        this.addNode();
      } else {
        this.node.id = utils.getId();
        this.node.innerHTML = html;
        this.graph_json_data.nodes.push(this.node);
        if (!this.graph_json_data.rootId) {
          this.graph_json_data.rootId = this.node.id;
          this.$refs.relationGraph.setJsonData(
            this.graph_json_data,
            (seeksRGGraph) => {
              this.addNode();
            }
          );
        } else {
          var _nodes = [this.node];
          var json = {
            nodes: _nodes,
            links: [],
          };
          this.$refs.relationGraph.appendJsonData(json, (seeksRGGraph) => {
            this.addNode();
          });
        }
      }
    },
    //选择人物一
    handleChange(value, option) {
      if (value) {
        this.link.from = value.key;
        this.link.fromName = value.lable;
      } else {
        this.link.from = "";
        this.link.fromName = "";
      }
    },
    handleChange2(value, option) {
      if (value) {
        this.link.to = value.key;
        this.link.toName = value.lable;
      } else {
        this.link.to = "";
        this.link.toName = "";
      }
    },
    //下拉选人物搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //保存关系连线
    saveLink() {
      if (!this.link.from || !this.link.to) {
        this.$notification.error({
          message: "提示",
          description: "请选择人物",
        });
        return false;
      }
      if (!this.link.text || !this.link.text) {
        this.$notification.error({
          message: "提示",
          description: "请填写人物关系",
        });
        return false;
      }
      if (this.link.id) {
        var nodeItem = this.$refs.relationGraph.getNodeById(this.link.id);
        this.graph_json_data.links.filter((x) => {
          if (x.id === this.link.id) {
            x.from = this.link.from;
            x.to = this.link.to;
            x.text = this.link.text;
          }
        });
        nodeItem.from = this.link.from;
        nodeItem.to = this.link.to;
        nodeItem.text = this.link.text;
      } else {
        this.link.id = utils.getId();
        this.link.data.id = this.link.id;
        this.graph_json_data.links.push(this.link);
        var _links = [this.link];
        var json = {
          nodes: [],
          links: _links,
        };
        this.$refs.relationGraph.appendJsonData(json, (seeksRGGraph) => {
          this.addLink();
        });
      }
    },
    //删除节点
    delNode() {
      var vm = this;
      var nid = "";
      if (this.showNodeInfo) {
        nid = this.node.id;
        this.graph_json_data.nodes = this.graph_json_data.nodes.filter(
          (x) => x.id !== nid
        );
      }
      if (nid) {
        this.$confirm({
          title: "确定要删除该人物吗?",
          content: "",
          onOk() {
            vm.$refs.relationGraph.removeNodeById(nid);
          },
          onCancel() {},
        });
      } else {
        this.$notification.error({
          message: "提示",
          description: "选择要删除的人物",
        });
      }
    },
    delLink() {
      var vm = this;
      if (this.currentLink) {
        this.$confirm({
          title: "确定要删除该人物关系吗?",
          content: "",
          onOk() {
            var nid = "";
            vm.currentLink.relations.forEach((thisLink) => {
              nid = thisLink.data.id;
              thisLink.isHide = true;
            });
            vm.graph_json_data.links = vm.graph_json_data.links.filter(
              (x) => x.id !== nid
            );
            vm.showLinkMenu = false;
          },
          onCancel() {
            vm.showLinkMenu = false;
          },
        });
      }
    },
    getGraphJson() {
      return this.graph_json_data;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  .formRow {
    margin-bottom: 10px;

    .lable {
      width: 150px;
      line-height: 36px;
      text-align: right;
      padding-right: 10px;
    }

    .text {
      line-height: 36px;
      width: 350px;
    }
  }
}

.graphCont {
  border: 1px solid #dddddd;
  display: flex;

  .graphLable {
    width: 65px;
    padding-left: 5px;
    margin-top: 5px;
  }

  /deep/ .c-my-node {
    background-position: center center;
    background-size: 100%;
    border: #004930 solid 1px;
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }

  /deep/ .c-node-name {
    width: 160px;
    margin-left: -40px;
    text-align: center;
    margin-top: 85px;
    color: #333333;
  }
}

.linkMenu {
  z-index: 999;
  padding: 10px;
  background-color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  position: absolute;
}

.submit-cont {
  padding-top: 30px;
}
</style>
