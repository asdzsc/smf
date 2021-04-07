<template>
	<a-modal title="激活码批量生成" ref="imgModal" :visible="visible" @cancel="handleCancel" @ok="hideModal" okText="确认"
	 cancelText="取消">
		<a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-model-item label="生成数量">
				<a-input-number v-model="num" placeholder="请输入激活码生成数量" style="width:200px;" />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>

<script>
	import {
		saveMemoryActive
	} from "@/pages/admin/api/memory/memory";
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				visible: false,
				num: 100
			};
		},
		watch: {},
		mounted() {
			this.visible = true
		},
		methods: {
			hideModal() {
				// this.handleCancel();
				saveMemoryActive({
					num: this.num
				}).then(res => {
					if (res.code === 0) {
						this.visible = false;
						this.$message.success("数据提交成功");
						this.handleCancel(res)
					}
				})
			},
			handleCancel(res) {
				if (!res) {
					res = {
						code: -1
					}
				}
				this.visible = false;
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
</style>
