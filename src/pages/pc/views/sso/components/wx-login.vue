<template>
	<modal :title="title" @onClose="handleCancel" width="500px">
		<div class="cont">
			<vue-qr :text="codeValue" :logoSrc="logoSrc" :margin="0" :size="300"></vue-qr>

			<div class="title">
				微信扫码
			</div>
		</div>
	</modal>
</template>

<script>
	import {
		verifyAuthWx,
		setToken
	} from '@/pages/pc/api/sso'
	import * as utils from "@/pages/pc/libs/utils";

	import vueQr from "vue-qr";
	export default {
		components: {
			modal: () => import("@/pages/pc/components/modal.vue"),
			vueQr
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				title: '微信扫码登录',
				codeValue: "",
				logoSrc: '',
				sign: '',
				verifyInterval: null
			}
		},
		mounted() {
			var vm = this
			this.sign = utils.getId()
			this.codeValue = this.baseUrl + "/wx/qrcodeLogin?sign=" + this.sign
			this.logoSrc = this.baseUrl + "/img/logo.png"

			this._verifyAuthWx();
		},
		beforeDestroy() {
			if (this.verifyInterval) {
				clearInterval(this.verifyInterval)
			}
		},
		methods: {
			_verifyAuthWx() {
				var vm = this
				this.verifyInterval = setInterval(function() {
					verifyAuthWx({
						sign: vm.sign
					}).then(res => {
						if (res.code === 0) {
							clearInterval(vm.verifyInterval)
							setToken(res.data)
							if (vm.$route.query.redirect) {
								var redirect = decodeURIComponent(vm.$route.query.redirect)
								vm.$router.replace(redirect);
							} else {
								vm.$router.replace("/");
							}
						}
					})
				}, 5000)
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	}
</script>

<style lang="less" scoped>
	.cont {
		text-align: center;
		padding: 20px;

		.title {
			padding-top: 20px;
			font-size: 18px;
			color: #333333;
			font-weight: 700;
		}
	}
</style>
