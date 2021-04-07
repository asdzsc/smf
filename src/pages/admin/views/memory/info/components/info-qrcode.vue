<template>
	<a-modal title="二维码" v-model="visible" width="400px" :footer="null">
		<div style="text-align:center;">
			<vue-qr :text="codeValue" :margin="0" :dotScale="1"></vue-qr>
		</div>
	</a-modal>
</template>
<script>
	import vueQr from "vue-qr";

	export default {
		name: "memoryQrcode",
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
				var url = this.baseUrl + "/#/memoryInfo?id=" + this.model.id;
				return url;
			}
		},
		mounted() {},
		methods: {
			loadData(_model) {
				this.model = _model;
				this.visible = true;
			}
		}
	};
</script>
