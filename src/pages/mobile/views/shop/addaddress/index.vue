<template>
	<div class="addAddress">
		<div class="title">新增收货信息</div>
		<div class="form">
			<van-field readonly clickable label="地址类别" :value="value" placeholder="请选择" @click="showPicker = true" />
			<van-popup v-model="showPicker" position="bottom">
				<van-picker title="地址类别" show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
			</van-popup>
			<div class="contact">
				<van-cell-group>
					<van-cell title="收货人">
						<template #default>
							<input type="text" placeholder="请输入收货人姓名">
						</template>
					</van-cell>
					<van-cell title="联系电话">
						<template #default>
							<input type="text" placeholder="请输入收货人手机号">
						</template>
					</van-cell>
					<van-field readonly clickable label="所在区域" :value="value1" placeholder="请选择" @click="showPicker1 = true" />
					<van-popup v-model="showPicker1" position="bottom">
						<van-area title="所在区域" :area-list="areaList" value="110000" />
					</van-popup>
					<van-cell title="详细地址">
						<template #default>
							<input type="text" placeholder="请输入详细地址">
						</template>
					</van-cell>
				</van-cell-group>
			</div>
		</div>
		<div class="saveMsg">
			 保存收货信息 
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				value1: '',
				showPicker: false,
				showPicker1: false,
				areaList: {
					province_list: {
						'110000': '北京市',
						'120000': '天津市'
					},
					city_list: {
						'110100': '北京市',
						'110200': '县',
						'120100': '天津市',
						'120200': '县'
					},
					county_list: {
						'110101': '东城区',
						'110102': '西城区',
						'110105': '朝阳区',
						'110106': '丰台区',
						'120101': '和平区',
						'120102': '河东区',
						'120103': '河西区',
						'120104': '南开区',
						'120105': '河北区',
					}
				},
				columns: ['收件地址', '墓地地址'],
			};
		},
		methods: {
			onConfirm(value) {
				this.value = value;
				this.showPicker = false;
			},

		},
	};
</script>

<style lang="less" scoped>
	.addAddress {
		margin-top: .2rem;
		

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: .35rem;
			font-weight: bold;
			font-size: .28rem;
			padding: 0 4%;
		}

		.form {
			padding: 0 4%;
			font-size: .28rem;

			// 取消按钮
			/deep/ .van-picker__cancel {
				font-size: .28rem;
				color: #999999;
			}

			//地址类别
			/deep/ .van-ellipsis.van-picker__title {
				font-size: .32rem;
			}

			//确认按钮
			/deep/ .van-picker__confirm {
				font-size: .28rem;
				color: #004930;
			}

			//地址弹窗
			/deep/ .van-cell {
				padding: 10px 0;
			}

			/deep/ .van-cell__value {
				margin-right: 1.55rem;
			}

			/deep/ .van-picker-column__item .van-ellipsis {
				width: 695px;
				text-align: center;
				padding: 0.3rem 0;
				border-style: solid;
				border-width: 1px;
				border-image-source: linear-gradient(90deg,
					#ffffff 0%,
					#9a9a9a 48%,
					rgba(153, 153, 153, 0.99) 49%,
					#ffffff 100%);
				border-image-slice: 1;

				&:last-child {
					border-top: none;
				}
			}

			/deep/ .van-picker-column__item--selected {
				color: #004930 !important;
			}

			.contact {
				.van-cell__value {
					overflow: initial;
					input {
						border: none;
						    color: #323233;
					}
					input::-webkit-input-placeholder {
						color: #999999;
						opacity: .5;
					}
				}

				/deep/ .van-cell {
					font-size: .28rem;
				}
			}
		}
		.saveMsg{
			height: .80rem;
				background-color: #004930;
				width: 100%;
				text-align: center;
				line-height: .80rem;
				color: #fff;
		}
	}
</style>
