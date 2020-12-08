<template>
  <a-card>
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-divider orientation="left">
        云直播
      </a-divider>
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
      <a-divider orientation="left">
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
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
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
      model: {
        liveAppDomain: "",
        liveAppId: "",
        livePlayDomain: "",
        liveSecretId: "",
        liveSecretKey: "",
        imSDKAppID: "",
        imAppKey: "",
        imAdminUser: "admin"
      }
    };
  },
  mounted() {
    this._getSysConfig();
  },
  methods: {
    _getSysConfig() {
      getSysConfig().then(res => {
        if (res.code === 0) {
          Object.assign(this.model, res.data);
        }
      });
    },
    onSubmit() {
      console.log(this.model);
      saveSysConfig(this.model).then(res => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
        }
      });
    }
  }
};
</script>
