<template>
	<a-modal title="" :visible="visible" :footer="null" :closable="false" @cancel="handleCancel" :width="width" :bodyStyle="{ padding: '0px' }">
		<a-row type="flex" class="title">
			<a-col flex="auto">{{ title }}</a-col>
			<a-col>
				<a-icon @click="handleCancel" type="close" />
			</a-col>
		</a-row>
		<slot></slot>
	</a-modal>
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
	/deep/ .ant-modal-content {
		border-radius: 0px;
	}

	.title {
		width: 100%;
		height: 40px;
		background-color: #f3f3f3;
		line-height: 40px;
		padding: 0px 20px;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 1px;
		color: #999999;

	}
</style>
