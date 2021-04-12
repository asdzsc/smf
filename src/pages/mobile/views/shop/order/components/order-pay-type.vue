<template>
<<<<<<< HEAD
  <div class="orderPayType">
    <div class="title">支付方式</div>
    <div class="orderPayInfo">
      <!-- <div @click="setCheck('支付宝')" class="itemDiv" :class="{ check: model.payType === '支付宝' }">
				支付宝
			</div> -->
      <div
        @click="setCheck('微信支付')"
        class="itemDiv"
        :class="{ check: model.payType === '微信支付' }"
      >
        微信支付
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "2",
      model: {
        payType: "微信支付",
      },
    };
  },
  methods: {
    setCheck(_payType) {
      this.model.payType = _payType;
    }, //获取数据
    getData() {
      if (!this.model.payType) {
        this.$notify({
          type: "warning",
          message: "请选择支付方式",
        });
        return null;
      }
      return this.model.payType;
    },
  },
};
</script>

<style lang="less" scoped>
.orderPayType {
  margin-top: 0.2rem;
  margin-top: 0.2rem;
  background: #fff;
  padding: 0 4%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.35rem;
    font-weight: bold;
    font-size: 0.28rem;
  }

  .orderPayInfo {
    height: 0.8rem;
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;

    .itemDiv {
      width: 2.4rem;
      height: 0.6rem;
      border: solid 2px #004930;
      position: relative;
      margin-right: 0.3rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 0.6rem;
      color: #004930;

      &:hover {
        background: #004930;
        color: #fff;
      }

      &.check {
        background: #004930;
        color: #fff;
      }
    }
  }
}
=======
	<div class="orderPayType">
		<div class="title">支付方式</div>
		<div class="orderPayInfo">
			<div @click="setCheck('支付宝')" class="itemDiv" :class="{ check: model.payType === '支付宝' }">
				支付宝
			</div>
			<div @click="setCheck('微信支付')" class="itemDiv" :class="{ check: model.payType === '微信支付' }">
				微信支付
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				radio: '1',
				model: {
					payType: "支付宝"
				}
			};
		},
		methods: {
			setCheck(_payType) {
				this.model.payType = _payType;
			}, //获取数据
			getData() {
				if (!this.model.payType) {
					this.$notify({
					  type: "warning",
					  message: "请选择支付方式"
					});
					return null;
				}
				return this.model.payType;
			}
		}

	}
</script>

<style lang="less" scoped>
	.orderPayType {
		margin-top: .2rem;
		margin-top: .2rem;
		background: #fff;
		padding: 0 4%;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: .35rem;
			font-weight: bold;
			font-size: .28rem;
		}

		.orderPayInfo {
			height: .8rem;
			display: flex;
			align-items: center;
			margin-top: .3rem;

			.itemDiv {
				width: 2.40rem;
				height: .60rem;
				border: solid 2px #004930;
				position: relative;
				margin-right: .3rem;
				text-align: center;
				font-size: .28rem;
				font-weight: 700;
				line-height: .60rem;
				color: #004930;

				&:hover {
					background: #004930;
					color: #fff;
				}

				&.check {
					background: #004930;
					color: #fff;
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
