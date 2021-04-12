<template>
  <div class="member">
    <memberHead ref="memberHead"></memberHead>

    <div class="cont">
      <div class="left">
        <memberLeft ref="memberLeft"></memberLeft>
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="title">账户设置</div>

        <div class="card">
          <div class="title">基本资料</div>
<<<<<<< HEAD
          <div class="cardCont" style="width: 50%">
            <a-row type="flex" class="cartRow">
              <a-col class="lable"> 昵称： </a-col>
              <a-col flex="auto" class="input">
                {{ user.name }}
              </a-col>
              <a-col @click="editName()" class="edit"> 编辑 </a-col>
            </a-row>
            <a-row type="flex" class="cartRow">
              <a-col class="lable"> 手机号： </a-col>
              <a-col flex="auto" class="input">
                {{ user.mobile }}
              </a-col>
              <a-col @click="editMobile()" class="edit"> 编辑 </a-col>
            </a-row>
            <a-row type="flex" class="cartRow">
              <a-col class="lable"> 密码： </a-col>
              <a-col flex="auto" class="input"> ****** </a-col>
              <a-col @click="editPwd()" class="edit"> 编辑 </a-col>
            </a-row>
            <!-- <a-row type="flex" class="cartRow">
=======
          <div class="cardCont" style="width: 50%;">
            <a-row type="flex" class="cartRow">
              <a-col class="lable">
                昵称：
              </a-col>
              <a-col flex="auto" class="input">
                {{ user.name }}
              </a-col>
              <a-col @click="editName()" class="edit">
                编辑
              </a-col>
            </a-row>
            <a-row type="flex" class="cartRow">
              <a-col class="lable">
                手机号：
              </a-col>
              <a-col flex="auto" class="input">
                {{ user.mobile }}
              </a-col>
              <a-col @click="editMobile()" class="edit">
                编辑
              </a-col>
            </a-row>
            <a-row type="flex" class="cartRow">
              <a-col class="lable">
                密码：
              </a-col>
              <a-col flex="auto" class="input">
                ******
              </a-col>
              <a-col @click="editPwd()" class="edit">
                编辑
              </a-col>
            </a-row>
            <a-row type="flex" class="cartRow">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              <a-col class="lable">
                QQ：
              </a-col>
              <a-col flex="auto" class="input">
                未绑定
              </a-col>
              <a-col class="edit">
                绑定
              </a-col>
<<<<<<< HEAD
            </a-row> -->
            <a-row type="flex" class="cartRow">
              <a-col class="lable"> 微信： </a-col>
              <a-col flex="auto" class="input">
                {{ isBindWx ? "已绑定" : "未绑定" }}
              </a-col>
              <a-col v-if="!isBindWx" class="edit"> 绑定 </a-col>
=======
            </a-row>
            <a-row type="flex" class="cartRow">
              <a-col class="lable">
                微信：
              </a-col>
              <a-col flex="auto" class="input">
                {{ isBindWx ? "已绑定" : "未绑定" }}
              </a-col>
              <a-col v-if="!isBindWx" class="edit">
                绑定
              </a-col>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            </a-row>
          </div>

          <div class="title">服务墓址</div>
          <div v-for="item in list" :key="item.id" class="cardCont cardLine">
            <a-row type="flex" class="cartRow">
<<<<<<< HEAD
              <a-col class="lable"> 落葬人： </a-col>
=======
              <a-col class="lable">
                落葬人：
              </a-col>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              <a-col flex="auto" class="input">
                {{ item.bpname }}
                <span v-if="item.isCheck === '1'" class="defCk">默认地址</span>
              </a-col>
              <a-col class="delAddress">
                <a-icon @click="delAddress(item.id)" type="close" />
              </a-col>
            </a-row>
<<<<<<< HEAD
            <a-row type="flex" class="cartRow" style="margin-bottom: 0px">
              <a-col class="lable"> 墓址： </a-col>
=======
            <a-row type="flex" class="cartRow" style="margin-bottom: 0px;">
              <a-col class="lable">
                墓址：
              </a-col>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
              <a-col flex="auto" class="input">
                {{ item.cemeaddress }}
              </a-col>
            </a-row>
            <a-row type="flex">
              <a-col flex="auto"> </a-col>
              <a-col
                v-if="item.isCheck === '0'"
                @click="saveIsCheck(item)"
                class="editAddress"
              >
                设为默认地址
              </a-col>
<<<<<<< HEAD
              <!-- <a-col @click="editAddress(item.id)" class="editAddress">
                编辑
              </a-col> -->
=======
              <a-col @click="editAddress(item.id)" class="editAddress">
                编辑
              </a-col>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
            </a-row>
          </div>
          <a-empty v-if="list.length === 0" />
        </div>
        <div v-if="!finished" @click="_cemeteryList()" class="moreBtn">
          更多墓址
          <a-icon type="down" />
        </div>

<<<<<<< HEAD
        <div @click="addAddress()" class="addAddress">新增服务墓址</div>
=======
        <div @click="addAddress()" class="addAddress">
          新增服务墓址
        </div>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      </div>
    </div>

    <myserve></myserve>

    <!-- 编辑昵称 -->
    <userEditName
      v-if="showEditName"
      ref="userEditName"
      @onClose="closeEditName"
    ></userEditName>
    <!-- 编辑手机号 -->
    <userEditMobile
      v-if="showEditMobile"
      ref="userEditMobile"
      @onClose="closeEditMobile"
    ></userEditMobile>
    <!-- 编辑密码 -->
    <userEditPwd
      v-if="showEditPwd"
      ref="userEditPwd"
      @onClose="closeEditPwd"
    ></userEditPwd>
    <!-- 添加服务墓址 -->
    <cemeteryInfo
      v-if="showAddress"
      ref="cemeteryInfo"
<<<<<<< HEAD
=======
      :id="cemeteryId"
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      @onClose="closeAddress"
    ></cemeteryInfo>
  </div>
</template>

<script>
import {
  cemeteryList,
  getMemberInfo,
  verifyBindWx,
  saveCemetery,
  delCemetery,
} from "@/pages/pc/api/user";

export default {
  components: {
    memberHead: () =>
      import("@/pages/pc/views/member/components/member-head.vue"),
    memberLeft: () =>
      import("@/pages/pc/views/member/components/member-left.vue"),
    userEditName: () =>
      import("@/pages/pc/views/member/components/user-edit-name.vue"),
    userEditMobile: () =>
      import("@/pages/pc/views/member/components/user-edit-mobile.vue"),
    userEditPwd: () =>
      import("@/pages/pc/views/member/components/user-edit-pwd.vue"),
    cemeteryInfo: () =>
      import("@/pages/pc/views/shop/order/components/cemetery-info.vue"), //添加服务墓址
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      isBindWx: false,
      user: {},
      showEditName: false, //编辑昵称
      showEditMobile: false, //编辑手机号
      showEditPwd: false, //编辑密码
      showAddress: false, //添加服务墓址
      cemeteryId: "", //服务墓址id
      finished: false,
      model: {
        current: 0,
        pageSize: 3,
      },
      list: [],
    };
  },
  mounted() {
    this._getMemberInfo();
    //是否绑定微信
    this._verifyBindWx();
    //墓址列表
    this.loadCemeteryList();
  },
  methods: {
    _getMemberInfo() {
      getMemberInfo().then((res) => {
        if (res.code === 0) {
          Object.assign(this.user, res.data);
          this.$store.commit("account/setUser", res.data);
        }
      });
    },
    _verifyBindWx() {
      verifyBindWx().then((res) => {
        if (res.code === 0) {
          this.isBindWx = res.data;
        }
      });
    },
    //编辑昵称
    editName() {
      this.showEditName = true;
    },
    closeEditName(res) {
      this.showEditName = false;
      this.updateUserInfo(res);
    },
    //编辑手机号
    editMobile() {
      this.showEditMobile = true;
    },
    closeEditMobile(res) {
      this.showEditMobile = false;
      this.updateUserInfo(res);
    },
    //编辑密码
    editPwd() {
      this.showEditPwd = true;
    },
    closeEditPwd() {
      this.showEditPwd = false;
    },
    //更新用户信息
    updateUserInfo(res) {
      if (res) {
        if (res.code === 0) {
          this.user = res.data;
          this.$store.commit("account/setUser", res.data);
        }
      }
    },
    loadCemeteryList() {
      this.finished = false;
      this.model.current = 0;
      this.list = [];
      this._cemeteryList();
    },
    _cemeteryList() {
      if (!this.finished) {
        this.model.current++;
        cemeteryList(this.model).then((res) => {
<<<<<<< HEAD
=======
          console.log(res);
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
          if (res.code === 0) {
            res.data.list.forEach((x) => {
              if (x.isCheck === "1") {
                this.$set(x, "check", true);
              } else {
                this.$set(x, "check", false);
              }
              this.list.push(x);
            });

            if (res.data.isLastPage) {
              this.finished = true;
            }
          }
        });
      }
    },
    addAddress() {
      this.showAddress = true;
    },
    closeAddress(res) {
      this.showAddress = false;
      if (res) {
        this.loadCemeteryList();
      }
    },
    //编辑服务墓址
    editAddress(nid) {
      this.cemeteryId = nid;
      this.showAddress = true;
    },
    //设置默认服务墓址
    saveIsCheck(item) {
      item.isCheck = "1";
      saveCemetery(item).then((res) => {
        if (res.code === 0) {
          this.$message.success("设置成功");
          this.loadCemeteryList();
        } else {
          item.isCheck = "0";
        }
      });
    },
    //删除服务墓址
    delAddress(nid) {
      var vm = this;
      this.$confirm({
        title: "确认要删除吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          delCemetery({
            id: nid,
          }).then((res) => {
            if (res.code === 0) {
              vm.loadCemeteryList();
            }
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.member {
  background-color: #f5f5f5;

  .cont {
    width: 1200px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 50px;
    display: flex;
    min-height: 600px;
    background-color: #ffffff;

    .line {
      border: solid 2px #f2f2f2;
    }

    .left {
      width: 125px;
    }

    .right {
      flex: auto;
      padding: 20px;
      padding-bottom: 80px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }

      .card {
        border: solid 1px #ebebeb;

        .title {
          height: 40px;
          background-color: #ebebeb;
          font-size: 16px;
          font-weight: bold;
          line-height: 40px;
          color: #333333;
          padding-left: 35px;
        }

        .cardCont {
          &.cardLine {
            border-bottom: solid 1px #ebebeb;
            margin-bottom: 20px;

            &:last-child {
              margin-bottom: 0px;
              border-bottom: none;
            }
          }

          .cartRow {
            margin-bottom: 30px;
          }

          .lable {
            width: 120px;
            font-size: 14px;
            color: #333333;
            text-align: right;
            line-height: 30px;
          }

          .input {
            font-size: 14px;
            font-weight: bold;
            line-height: 30px;
            color: #333333;
            padding-left: 20px;

            .defCk {
              width: 60px;
              height: 24px;
              background-color: #004930;
              color: #ffffff;
              font-size: 12px;
              display: inline-block;
              text-align: center;
              line-height: 24px;
              margin-left: 20px;
            }
          }

          .edit {
            font-size: 12px;
            line-height: 30px;
            color: #004930;
            cursor: pointer;
          }

          .delAddress {
            font-size: 16px;
            color: #999999;
            padding-right: 20px;
          }

          .editAddress {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #004930;
            text-align: right;
            padding-right: 20px;
            padding-bottom: 20px;
            cursor: pointer;
          }
        }
      }

      .moreBtn {
        padding-top: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        color: #333333;
        cursor: pointer;

        .anticon {
          font-size: 12px;
        }
      }

      .addAddress {
        margin-top: 20px;
        width: 180px;
        height: 48px;
        background-color: #004930;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 48px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
