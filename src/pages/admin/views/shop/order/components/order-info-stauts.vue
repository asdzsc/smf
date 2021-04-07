<template>
	<a-modal title="修改订单状态" v-model="visible" width="500px" :bodyStyle="{ padding: '10px' }" @ok="handleOk" @cancel="onClose">

		<div style="padding-top: 20px;">
			<a-form-model :model="model" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
				<a-form-model-item label="选择状态">
					<a-select v-model="model.statusKey" @change="changeStatus" labelInValue placeholder="请选择订单状态" style="width:300px;">
						<a-select-option v-for="item in statusList" :key="item.key" :value="item.key">
							{{ item.text }}
						</a-select-option>
					</a-select>
				</a-form-model-item>
			</a-form-model>
		</div>
	</a-modal>
</template>

<script>
	import {
		updateOrderStauts
	} from "@/pages/admin/api/shop/order";
	import * as shop from "@/comment/dictionary";
	export default {
		props: {
			shopOrder: {
				type: Object,
				default () {
					return {
						id: '',
						orderStatus: ''
					}
				}
			}
		},
		data() {
			return {
				visible: false,
				statusList: [], //订单状态
				model: {
					id: '',
					statusKey: [],
					orderStatus: ''
				}
			}
		},
		mounted() {
			this.visible = true;
			this.statusList = shop.statusList()
			Object.assign(this.model, this.shopOrder)
			this.model.statusKey = [{
				key: this.model.orderStatus
			}]
		},
		methods: {
			//修改状态
			changeStatus(value, option) {
				this.model.orderStatus = value.key;
			},
			handleOk() {
				updateOrderStauts({
					id: this.model.id,
					status: this.model.orderStatus
				}).then(res => {
					if (res.code === 0) {
						this.onClose(res)
					}
				});
			},
			onClose(res) {
				this.visible = false;
				this.$emit("onClose", res);
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
