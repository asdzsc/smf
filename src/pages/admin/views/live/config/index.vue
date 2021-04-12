<template>
  <a-card>
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
<<<<<<< HEAD
      <a-divider orientation="left"> 云直播 </a-divider>
=======
      <a-divider orientation="left">
        云直播
      </a-divider>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      <a-form-model-item label="直播推流域名">
        <a-input
          v-model="model.liveAppDomain"
          placeholder="请输入直播推流域名"
        />
      </a-form-model-item>
      <a-form-model-item label="直播推流APIKey">
        <a-input v-model="model.liveAppId" placeholder="请输入直播推流APIKey" />
      </a-form-model-item>
      <a-form-model-item label="直播播放域名">
        <a-input
          v-model="model.livePlayDomain"
          placeholder="请输入直播播放域名"
        />
      </a-form-model-item>
      <a-form-model-item label="密钥id">
        <a-input v-model="model.liveSecretId" placeholder="请输入密钥id" />
      </a-form-model-item>
      <a-form-model-item label="密钥key">
        <a-input v-model="model.liveSecretKey" placeholder="请输入密钥key" />
      </a-form-model-item>
<<<<<<< HEAD
      <!-- <a-divider orientation="left">
=======
      <a-divider orientation="left">
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        IM即时通讯
      </a-divider>
      <a-form-model-item label="IM SDKAppID">
        <a-input v-model="model.imSDKAppID" placeholder="请输入IM SDKAppID" />
      </a-form-model-item>
      <a-form-model-item label="IM 密钥key">
        <a-input v-model="model.imAppKey" placeholder="请输入IM 密钥key" />
      </a-form-model-item>
      <a-form-model-item label="IM 管理员帐号">
        <a-input
          v-model="model.imAdminUser"
          placeholder="请输入IM 管理员帐号"
        />
<<<<<<< HEAD
      </a-form-model-item> -->

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <table>
          <td>
            <a-button type="primary" @click="onSubmit"> 确定 </a-button>
          </td>
          <td style="padding-left: 20px">
            <a :href="baseUrl + '/smf-live.apk'" target="_banlk">
              <a-icon type="android" /> APP下载
            </a>
          </td>
        </table>
=======
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { getSysConfig, saveSysConfig } from "@/pages/admin/api/sys/sysconfig";

export default {
  name: "config-info",
  data() {
    return {
<<<<<<< HEAD
      baseUrl: process.env.VUE_APP_BASE_URL,
=======
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
      model: {
        liveAppDomain: "",
        liveAppId: "",
        livePlayDomain: "",
        liveSecretId: "",
        liveSecretKey: "",
        imSDKAppID: "",
        imAppKey: "",
<<<<<<< HEAD
        imAdminUser: "admin",
      },
=======
        imAdminUser: "admin"
      }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
    };
  },
  mounted() {
    this._getSysConfig();
  },
  methods: {
    _getSysConfig() {
<<<<<<< HEAD
      getSysConfig().then((res) => {
=======
      getSysConfig().then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          Object.assign(this.model, res.data);
        }
      });
    },
    onSubmit() {
      console.log(this.model);
<<<<<<< HEAD
      saveSysConfig(this.model).then((res) => {
=======
      saveSysConfig(this.model).then(res => {
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
        if (res.code === 0) {
          this.$message.success("数据提交成功");
        }
      });
<<<<<<< HEAD
    },
  },
=======
    }
  }
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
};
</script>
