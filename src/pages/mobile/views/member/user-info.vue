<template>
  <div>
    <memberTabs ref="memberTabs"></memberTabs>

    <div>
      <div class="title">
        基本资料
      </div>
      <van-field v-model="user.name" readonly label="昵称">
        <div @click="editName()" slot="extra" class="fieldOperation">
          编辑
        </div>
      </van-field>
      <van-field v-model="user.mobile" readonly type="tel" label="手机号">
        <div
          @click="$router.push('/member/user-edit-mobile')"
          slot="extra"
          class="fieldOperation"
        >
          编辑
        </div>
      </van-field>
      <van-field :value="'******'" readonly label="密码">
        <div
          @click="$router.push('/member/user-edit-pwd')"
          slot="extra"
          class="fieldOperation"
        >
          编辑
        </div>
      </van-field>
      <!-- <van-field
        :value="user.qqOpenid ? '已绑定' : '未绑定'"
        readonly
        label="QQ"
      >
        <div v-if="!user.qqOpenid" slot="extra" class="fieldOperation">
          绑定
        </div>
      </van-field> -->
      <van-field :value="isBindWx ? '已绑定' : '未绑定'" readonly label="微信">
        <div
          v-if="!isBindWx"
          @click="bindWx()"
          slot="extra"
          class="fieldOperation"
        >
          绑定
        </div>
      </van-field>
      <div style="padding:0.3rem;">
        <van-button @click="logout()" type="danger" block round
          >退 出</van-button
        >
      </div>
    </div>

    <van-row type="flex" class="cardTitle">
      <van-col span="12" class="contLeft">服务墓址</van-col>
      <van-col
        @click="$router.push('/member/cemetery-info')"
        span="12"
        class="contRight"
        >+新增服务墓址</van-col
      >
    </van-row>
    <div class="list">
      <div v-for="item in list" :key="item.id" class="card">
        <van-row type="flex">
          <van-col class="lable">落葬人：</van-col>
          <van-col class="bpname">{{ item.bpname }}</van-col>
          <van-col>
            <div v-if="item.isCheck === '1'" class="defCk">默认地址</div>
            <div v-else @click="saveIsCheck(item)" class="setDefCk">
              设为默认地址
            </div>
          </van-col>
          <van-col style="text-align: right;flex: 1;">
            <!-- <span
              @click="$router.push('/member/cemetery-info?id=' + item.id)"
              class="operation"
              >编辑</span
            > -->
            <!-- <span class="operation">|</span> -->
            <!-- <span @click="delAddress(item.id)" class="operation del">删除</span> -->
            <van-button @click="delAddress(item.id)" size="small" type="danger"
              >删除</van-button
            >
          </van-col>
        </van-row>
        <van-row type="flex" style="padding-top: 0.2rem;">
          <van-col class="lable">墓址：</van-col>
          <van-col class="bpname">{{ item.cemeaddress }}</van-col>
        </van-row>
      </div>
    </div>
    <div v-if="!finished" @click="_cemeteryList()" class="moreBtn">
      更多墓址
      <van-icon name="arrow-down" />
    </div>

    <div class="page-line"></div>

    <!-- 编辑用户昵称 -->
    <userEditName
      v-if="showEditName"
      ref="userEditName"
      @onClose="closeEditName"
    ></userEditName>
  </div>
</template>

<script>
import {
  cemeteryList,
  getMemberInfo,
  verifyBindWx,
  saveCemetery,
  delCemetery,
} from "@/pages/mobile/api/user";
import { delToken } from "@/pages/mobile/api/sso";
import { getUserCode } from "@/pages/mobile/api/sso";

export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
    userEditName: () =>
      import("@/pages/mobile/views/member/components/user-edit-name.vue"),
  },
  data() {
    return {
      isBindWx: false,
      user: {
        name: "",
        mobile: "",
      },
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
      console.log("closeEditName");
      this.updateUserInfo(res);
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
    //绑定微信
    bindWx() {
      getUserCode().then((res) => {
        if (res.code === 0) {
          var url = encodeURIComponent(
            process.env.VUE_APP_BASE_URL + "/mobile/#/member/userInfo"
          );
          window.location =
            process.env.VUE_APP_BASE_URL +
            "/wx/oauthBind?utoken=" +
            res.data +
            "&url=" +
            url;
        }
      });
    },
    loadCemeteryList() {
      this.finished = false;
      this.model.current = 0;
      this.list = [];
      this._cemeteryList();
    },
    _cemeteryList() {
      if (!this.finished) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        this.model.current++;
        cemeteryList(this.model).then((res) => {
          this.$toast.clear();
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
    //设置默认服务墓址
    saveIsCheck(item) {
      item.isCheck = "1";
      saveCemetery(item).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "设置成功",
          });
          this.loadCemeteryList();
        } else {
          item.isCheck = "0";
        }
      });
    },
    //删除服务墓址
    delAddress(nid) {
      var vm = this;
      this.$dialog
        .confirm({
          message: "确认要删除吗?",
        })
        .then(() => {
          delCemetery({
            id: nid,
          }).then((res) => {
            if (res.code === 0) {
              vm.loadCemeteryList();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //退出登录
    logout() {
      this.$dialog
        .confirm({
          message: "确认要退出吗?",
        })
        .then(() => {
          delToken().then(() => {
            this.$router.replace("/login");
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.page-line {
  padding-bottom: 0.2rem;
  background-color: #f5f5f5;
}

.title {
  font-size: 0.32rem;
  color: #333333;
  padding: 4%;
  font-weight: bold;
}

.fieldOperation {
  font-size: 0.26rem;
  font-weight: normal;
  color: #004930;
}

.cardTitle {
  height: 1.13rem;
  line-height: 1.13rem;
  background-color: #f5f5f5;

  .contLeft {
    padding-left: 0.3rem;
    font-size: 0.32rem;
    font-weight: 700;
    color: #333333;
  }

  .contRight {
    padding-right: 0.3rem;
    text-align: right;
    font-size: 0.28rem;
    color: #004930;
  }
}

.list {
  .card {
    padding: 0.3rem;
    border-bottom: 0.2rem solid #f5f5f5;

    &:last-child {
      border-bottom: 0px;
    }

    .operation {
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: #004930;
      margin-right: 0.1rem;

      &.del {
        color: #d54040;
      }
    }

    .lable {
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: #333333;
      width: 1.5rem;
    }

    .bpname {
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: #333333;
      padding-right: 0.2rem;
    }

    .defCk {
      width: 1.6rem;
      height: 0.6rem;
      background-color: #004930;
      font-size: 0.28rem;
      line-height: 0.6rem;
      color: #ffffff;
      text-align: center;
    }

    .setDefCk {
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0rem 0.2rem;
      border: solid 2px #004930;
    }
  }
}

.moreBtn {
  padding-top: 0.5rem;
  text-align: center;
  padding-bottom: 0.2rem;
}
</style>
