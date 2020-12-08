<template>
	<div class="goodsNum">
		<div @click="minus()" :class="{'disabled':disabled}" class="goodsNumLeft">
			<van-icon name="minus" />
		</div>
		<div class="goodsNumInput">
			<input v-model="myValue" type="number" :disabled="disabled" />
		</div>
		<div @click="plus()" :class="{'disabled':disabled}" class="goodsNumRight">
			<van-icon name="plus" />
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
		height: .3rem;
		display: flex;
		line-height: .3rem;

		.goodsNumLeft {
			width: .30rem;
			border-radius: 50%;
			text-align: center;
			border: 1px solid #004930;

			&.disabled {
				cursor: not-allowed;
			}
		}

		.goodsNumRight {
			width: .30rem;
			border-radius: 50%;
			text-align: center;
			border: 1px solid #004930;

			&.disabled {
				cursor: not-allowed;
			}
		}

		.goodsNumInput {
			input {
				width: .60rem;
				border: 0px;
				margin: 0 0.1rem;
				background-color: #f5f5f5;
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
