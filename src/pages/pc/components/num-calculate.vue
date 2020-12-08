<template>
	<div class="goodsNum">
		<div @click="minus()" :class="{'disabled':disabled}" class="goodsNumLeft">
			<a-icon type="minus" />
		</div>
		<div class="goodsNumInput">
			<input v-model="myValue" type="number" :disabled="disabled" />
		</div>
		<div @click="plus()" :class="{'disabled':disabled}" class="goodsNumRight">
			<a-icon type="plus" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default () {
					return 0
				}
			},
			disabled: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		data() {
			return {
				myValue: this.value
			}
		},
		watch: {
			value(newVal) {
				this.myValue = newVal
			},
			myValue(newVal) {
				this.$emit('input', newVal)
			}
		},
		mounted() {

		},
		methods: {
			// 数量减
			minus() {
				if (!this.disabled) {
					if (typeof this.myValue === "number" && !isNaN(this.myValue)) {
						this.myValue = this.myValue - 1;
						if (this.myValue < 1) {
							this.myValue = 1;
						}
					} else {
						this.myValue = 1;
					}
				}
			},
			// 数量加
			plus() {
				if (!this.disabled) {
					if (typeof this.myValue === "number" && !isNaN(this.myValue)) {
						this.myValue = this.myValue + 1;
					} else {
						this.myValue = 1;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodsNum {
		width: 100px;
		margin: auto;
		height: 30px;
		background-color: #ffffff;
		border: solid 1px #dddddd;
		display: flex;

		.goodsNumLeft {
			width: 30px;
			text-align: center;
			border-right: solid 1px #dddddd;
			line-height: 30px;
			cursor: pointer;

			&.disabled {
				cursor: not-allowed;
			}
		}

		.goodsNumRight {
			width: 30px;
			text-align: center;
			border-left: solid 1px #dddddd;
			line-height: 30px;
			cursor: pointer;

			&.disabled {
				cursor: not-allowed;
			}
		}

		.goodsNumInput {
			flex: 1;

			input {
				width: 100%;
				height: 100%;
				border: 0px;
				padding: 0px 5px;
				text-align: center;
				outline: none;
				-moz-appearance: textfield;

				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					appearance: none;
					margin: 0;
				}
			}
		}
	}
</style>
