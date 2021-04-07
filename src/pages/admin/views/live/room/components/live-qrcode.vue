<template>
  <a-modal title="二维码" v-model="visible" width="400px" :footer="null">
    <div style="text-align:center;">
      <vue-qr :text="codeValue" :margin="0" :dotScale="1"></vue-qr>
    </div>
  </a-modal>
</template>
<script>
import vueQr from "vue-qr";
import { createPoster } from "@/pages/admin/api/live/livelist";

export default {
  name: "liveQrcode",
  components: {
    vueQr
  },
  data() {
    return {
      visible: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      model: {
        id: ""
      }
    };
  },
  computed: {
    codeValue() {
      var url = this.baseUrl + "/mobile/#/live/live-play?id=" + this.model.id;
      if (this.model.state === "0" || this.model.state === "1") {
        url = this.baseUrl + "/mobile/#/live/live-info?id=" + this.model.id;
      }
      return url;
    }
  },
  mounted() {},
  methods: {
    _createPoster() {
      createPoster({}).then(res => {
        if (res.code === 0) {
          console.log("海报");
        }
      });
    },
    loadData(_model) {
      this.model = _model;
      this.visible = true;
    }
  }
};
</script>
