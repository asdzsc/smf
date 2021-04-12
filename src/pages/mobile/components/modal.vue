<template>
	<div class="title"  :visible="visible" :footer="null" :closable="false" @cancel="handleCancel" :width="width" :bodyStyle="{ padding: '0px' }">
		<p>{{ title }}</p>
		<van-icon @click="handleCancel" name="cross" />
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default () {
					return ''
				}
			},
			width: {
				type: String,
				default () {
					return '1000px'
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				visible: false
			}
		},
		mounted() {
			this.visible = true
		},
		methods: {
			handleCancel() {
				this.visible = false;
				this.$emit("onClose");
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		background-color: #f3f3f3;
		padding: 0px 4%;
<<<<<<< HEAD
		font-size: .3rem;
=======
		font-size: .14rem;
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
		font-weight: 700;
		color: #999999;

	}
</style>
