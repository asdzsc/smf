<template>
	<van-dialog v-model="show" title="标题" show-cancel-button :before-close="onClose">
		<van-field v-model="model.name" label="昵称" placeholder="请输入昵称" label-width="0.8rem">
		</van-field>
	</van-dialog>
	<!-- confirm-button-color -->
</template>

<script>
	import {
		saveMemberInfo
	} from '@/pages/mobile/api/user'

	export default {
		data() {
			return {
				show: false,
				model: {}
			}
		},
		mounted() {
			this.show = true
			Object.assign(this.model, this.$store.state.account.user)
		},
		methods: {
			onClose(action, done) {
				console.log(action)
				if (action === 'confirm') {
					saveMemberInfo(this.model).then(res => {
						if (res.code === 0) {
							this.$notify({
								type: 'success',
								message: '数据提交成功'
							});
							done();
							this.$emit("onClose", res);
						} else {
							done(false);
						}
					})
				} else {
					done();
					this.$emit("onClose")
				}
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
