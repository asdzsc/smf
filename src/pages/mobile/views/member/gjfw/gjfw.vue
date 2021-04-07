<template>
  <div class="gjfw">
    <van-field
      v-model="model.bpname"
      label="落葬人姓名"
      placeholder="落葬人姓名"
      @change="_searchCemeteryList()"
      :rules="[{ required: true, message: '请填写落葬人姓名' }]"
    />
    <div class="van-field_wrap">
      <!-- <van-field
        label="墓址信息"
        v-model="model.cemeaddress"
        right-icon="arrow"
        placeholder="请选择墓址信息"
        readonly
        @click="showSheet"
      /> -->
      <van-field
        label="墓址信息"
        v-model="model.cemeaddress"
        right-icon="arrow"
        placeholder="请选择墓址信息"
      >
        <template #right-icon>
          <van-icon @click="showSheet" name="arrow" />
        </template>
      </van-field>
      <van-action-sheet v-model="show">
        <div
          class="content"
          v-for="item in cemeteryList"
          :key="item.cemeteryId"
          @click="onSelect(item)"
        >
          主办人：{{ item.masterName }}<br />
          {{ item.cemetery }}
        </div>
      </van-action-sheet>
      <!-- <van-action-sheet v-model="show">
        <div
          class="content"
          v-for="item in cemeteryList"
          :key="item.cemeteryId"
          @click="onSelect(item)"
        >
          主办人：{{ item.masterName }} <br />
          {{ item.cemetery }}
        </div>
      </van-action-sheet> -->
      <div class="inputCont1" v-if="showMsg">
        <van-field placeholder="没有查询到墓址信息，请手动输入" />
      </div>
    </div>
    <van-field
      v-model="modelMsg.contacts"
      label="联系人"
      placeholder="联系人"
      :rules="[{ required: true, message: '请填写联系人' }]"
    />
    <van-field
      v-model="modelMsg.mobile"
      label="联系人电话"
      placeholder="联系人电话"
      :rules="[{ required: true, message: '请填写联系人电话' }]"
    />
    <div class="questionDesc">
      <van-cell title="问题">
        <template #default>
          <van-tag
            v-for="(item, index) in tags"
            :class="{ checked: item.check }"
            @click="check(index)"
            size="large"
            :key="index"
            >{{ item.qust }}</van-tag
          >
        </template>
      </van-cell>
    </div>
    <van-field
      rows="2"
      autosize
      label="情况描述"
      type="textarea"
      maxlength="50"
      placeholder="请输入情况描述"
      show-word-limit
      v-model="modelMsg.remark"
    />
    <div class="img">
      <van-cell title="图片上传">
        <template #default>
          <van-uploader
            v-model="fileList"
            :multiple="true"
            :max-size="20000 * 1024"
            :after-read="afterRead"
            :before-delete="delUploadImg"
            @oversize="onOversize"
          >
          </van-uploader>
        </template>
      </van-cell>
    </div>
    <div class="linkBtn" @click="$router.push('/gjfw/fwjl')">记录</div>
    <div style="position: fixed; width: 100%; bottom: 0">
      <van-button
        block
        type="info"
        color="#004930"
        native-type="submit"
        @click="onSubmit"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { searchCemeteryList } from "@/pages/mobile/api/user";
import { saveRepairs } from "@/pages/mobile/api/gjfw";
export default {
  data() {
    return {
      show: false,
      showMsg: false,
      cemeteryList: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      user: {
        mobile: "",
      },
      model: {
        id: "",
        bpname: "",
        cemeaddress: "",
        isCheck: "0",
        masterName: "",
        erpCemeteryId: "", //关联erp墓址id
        erpCemeteryIdKey: { key: "" },
      },

      uploadUrl: process.env.VUE_APP_BASE_URL + "/api/upload/fileUpload",
      headers: {
        token: this.$store.state.account.token,
      },
      fileList: [],
      tags: [
        { qust: "主碑开裂", check: false },
        { qust: "盖板问题", check: false },
        { qust: "走道维修", check: false },
        { qust: "树木损坏", check: false },
        { qust: "水泥脱落", check: false },
        { qust: "墓地下沉", check: false },
      ],
      modelMsg: {
        bpname: "", //落葬人
        cemeaddress: "", //墓址
        contacts: "", //联系人
        mobile: "", //联系电话
        remark: "", //情况描述
        erpCemeteryId: "", //关联erp墓址id
        imgs: [], //图片组数
        // 问题
        tags: [],
      },
    };
  },
  mounted() {
    this.user = this.$store.state.account.user;
    this.modelMsg.contacts = this.user.name;
    if (this.user.mobile) {
      this.modelMsg.mobile = this.user.mobile;
    }
  },
  methods: {
    check(i) {
      this.tags[i].check = !this.tags[i].check;
    },
    onSubmit() {
      this.modelMsg.bpname = this.model.bpname;
      this.modelMsg.cemeaddress = this.model.cemeaddress;
      this.modelMsg.erpCemeteryId = this.model.erpCemeteryId;
      this.modelMsg.tags = this.tags.filter((i) => {
        if (i.check === true) {
          return i.qust;
        }
      });
      this.modelMsg.imgs = this.fileList.map((i) => {
        return i.url;
      });
      this.modelMsg.tags = this.modelMsg.tags.map((i) => {
        return i.qust;
      });
      saveRepairs(this.modelMsg).then((res) => {
        if (res.code === 0) {
          this.$notify({
            type: "success",
            message: "提交报修成功",
          });
          this.$router.push("/gjfw/fwjl");
        }
      });
    },
    showSheet() {
      if (this.model.bpname == "") {
        this.$notify({
          type: "warning",
          message: "请输入落葬人姓名",
        });
      } else if (this.cemeteryList.length > 0) {
        this.show = true;
      }
    },
    onSelect(item) {
      this.show = false;
      this.model.erpCemeteryId = item.cemeteryId;
      this.model.cemeaddress = item.cemetery;
    },
    _searchCemeteryList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      if (this.model.bpname) {
        this.model.erpCemeteryId = "";
        this.model.erpCemeteryIdKey = { key: "" };
        this.cemeteryList = [];
        searchCemeteryList({
          current: 1,
          pageSize: 10,
          searchText: this.model.bpname,
        }).then((res) => {
          if (res.code === 0) {
            this.$toast.clear();
            Object.assign(this.cemeteryList, res.data.data);
            if (this.cemeteryList.length > 0) {
              this.show = true;
              this.showMsg = false;
            } else {
              this.show = false;
              this.showMsg = true;
              this.model.cemeaddress = "";
            }
          }
        });
      }
    },
    afterRead(file) {
      if (file instanceof Array) {
        file.map((v) => {
          v.status = "uploading";
          v.message = "上传中...";
          this.uploadImg(v);
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        this.uploadImg(file);
      }
    },
    uploadImg(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("isThumbnails", true);
      axios
        .post(this.uploadUrl, formData, {
          headers: this.headers,
        })
        .then((res) => {
          if (res.data) {
            if (file instanceof Array) {
              //判断是否是数组
              file.map((v, i) => {
                v.status = "success";
                v.message = "";
                v.url = res.data[i];
              });
            } else {
              file.status = "success";
              file.message = "";
              file.url = res.data.uploadUrl;
            }
          }
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "上传失败",
          });
        });
    },
    delUploadImg(item) {
      this.fileList = this.fileList.filter((v) => v.url != item.url);
    },
    onOversize() {
      this.$notify({
        type: "warning",
        message: "上传图片不能大于 20MB",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.gjfw {
  /deep/ .van-cell {
    font-size: 0.3rem;
  }
  /deep/ .van-action-sheet__content {
    .content {
      // height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.35rem;
      width: 80%;
      margin: 0 auto;
      padding-bottom: 1px solid #ccc;
    }
  }
  /deep/.van-checkbox-group--horizontal {
    justify-content: space-between;
    .van-checkbox {
      margin-top: 0.1rem;
      .van-checkbox__icon--checked .van-icon {
        color: #fff;
        background-color: #004930;
        border-color: #004930;
      }
    }
  }
  .van-field_wrap {
    .inputCont1 {
      width: 40%;
      margin: 0 auto;
      /deep/ input::-webkit-input-placeholder {
        color: red;
      }
      /deep/ .van-cell {
        padding: 0;
        height: 0.8rem;
        line-height: 0.8rem;
        border: solid 0.02rem #ffa39e;
        background-color: #fff1f0;
        color: #333;
        padding: 0rem 0.2rem;
        outline: none;
        .van-cell__right-icon {
          line-height: 0.8rem;
        }
      }
    }
  }
  /deep/.van-tag--default {
    background-color: #fff;
    border: 1px solid;
    margin-right: 0.1rem;
    margin-top: 0.1rem;
    color: #333;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  .questionDesc {
    /deep/ .van-cell__title {
      flex: inherit;
      width: 1.2rem;
    }
    /deep/ .van-cell__value {
      display: flex;
      margin-left: 0.8rem;
      flex-wrap: wrap;
      /deep/ .van-tag--default {
        background-color: #fff;
        border: 1px solid;
        margin-right: 0.3rem;
        margin-top: 0.1rem;
        color: #333;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      .checked {
        color: #fff;
        background: #004930;
      }
    }
  }

  .img {
    /deep/ .van-cell__title {
      flex: inherit;
      width: 1.2rem;
    }

    /deep/ .van-cell__value {
      text-align: left;
      margin-left: 0.8rem;
    }
    /deep/ .van-uploader__preview-image {
      width: 70px;
      height: 70px;
    }
  }
  .linkBtn {
    position: fixed;
    bottom: 100px;
    right: 10px;
    background-color: #004930;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
}
</style>
