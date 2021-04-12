<template>
<<<<<<< HEAD
  <div class="orderForm">
    <div class="title">服务信息</div>
    <div class="contInfo">
      <div class="serviceWrap">
        <div class="contact">
          <van-cell-group>
            <van-field
              v-model="model.contacts"
              label="联系人"
              placeholder="请输入联系人"
            />
            <van-field
              v-model="model.mobile"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="model.serveTimeDate"
              label="服务时间"
              readonly
              placeholder="请选择服务时间"
              @click="show = true"
            >
              <template #right-icon>
                <img
                  style="width: 16px; height: 16px"
                  src="/img/mobile/rili.png"
                />
              </template>
            </van-field>
            <van-field
              v-model="model.serveType"
              right-icon="arrow"
              label="服务方式"
              readonly
              placeholder="请选择服务方式"
              @click="show1 = true"
            />
            <van-field
              v-model="model.remark"
              rows="3"
              autosize
              label="客户留言"
              type="textarea"
              maxlength="300"
              placeholder="选填:对本次服务的说明"
              show-word-limit
            />
          </van-cell-group>
        </div>
        <van-calendar
          v-model="show"
          :min-date="minDate"
          :show-confirm="false"
          @confirm="onConfirm"
        />
        <!-- <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            v-model="currentDate"
            @confirm="handleConfirm"
            @cancel="show = false"
            type="date"
            title="选择年月日"
            :min-date="minDate"
          />
        </van-popup> -->

        <van-action-sheet
          v-model="show1"
          :actions="actions"
          @select="onSelect"
        />

        <!-- 	<div class="serviceMsg">
					<van-cell title="客户留言" />
					<textarea v-model="model.remark" placeholder="选填:对本次服务的说明">
          </textarea>
				</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      show: false, //日历显示
      show1: false, //服务方式显示
      // date: '', //服务时间
      actions: [
        {
          name: " 代客服务 ",
        },
        {
          name: " 自取方式 ",
        },
      ],
      baseUrl: process.env.VUE_APP_BASE_URL,
      user: {
        mobile: "",
      },
      currentDate: new Date(),
      minDate: new Date(2010, 0, 1),
      model: {
        contacts: "", //联系人
        mobile: "", //联系电话
        serveTime: "", //服务时间
        serveTimeDate: null,
        serveType: "代客服务", //服务方式  代客服务  自取方式
        remark: "",
      },
    };
  },
  mounted() {
    this.user = this.$store.state.account.user;
    if (this.user.mobile) {
      this.model.mobile = this.user.mobile;
    }
    //服务时间
    let date = moment().add(1, "days");
    this.minDate = date._d;
    this.model.serveTimeDate = date.format("YYYY-MM-DD");
    this.model.serveTime = date.format("YYYY-MM-DD 00:00:00");
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show1 = false;
      this.model.serveType = `${item.name}`;
      console.log(item);
    },

    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      let dateString = this.formatDate(date);
      this.model.serveTimeDate = dateString;
      this.model.serveTime = dateString ? dateString + " 00:00:00" : "";
    },
    // handleConfirm(date) {
    //   this.show = false;
    //   let dateString = this.formatDate(date);
    //   this.model.serveTimeDate = dateString;
    //   this.model.serveTime = dateString ? dateString + " 00:00:00" : "";
    // },
    //获取数据
    getData() {
      if (!this.model.contacts) {
        this.$notify({
          type: "warning",
          message: "请填写联系人姓名",
        });
        return null;
      }
      if (!this.model.mobile) {
        this.$notify({
          type: "warning",
          message: "请填写手机号",
        });
        return null;
      }
      if (!this.model.serveTime) {
        this.$notify({
          type: "warning",
          message: "请填写服务时间",
        });
        return null;
      }
      if (!this.model.serveType) {
        this.$notify({
          type: "warning",
          message: "请选择服务方式",
        });
        return null;
      }
      return this.model;
    },
  },
};
</script>

<style lang="less" scoped>
.orderForm {
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

  .contInfo {
    .serviceWrap {
      .contact {
        .van-cell__value {
          overflow: initial;

          input {
            border: none;
          }
        }

        /deep/ .van-cell {
          font-size: 0.28rem;
        }
      }

      .serviceTime,
      .serviceWay {
        font-size: 0.28rem;
        display: flex;
        align-items: center;
        height: 1rem;

        .van-cell__value {
          text-align: left;
          margin-left: -0.3rem;
        }

        /deep/ .van-cell {
          font-size: 0.28rem;
        }

        /deep/ .van-calendar__selected-day {
          background-color: #004930;
        }

        img {
          width: 0.32rem;
          height: 0.32rem;
        }
      }

      .serviceWay {
        .van-cell__value {
          text-align: left;
          margin-left: -0.2rem;
        }
      }

      .serviceMsg {
        /deep/ .van-cell {
          font-size: 0.28rem;
        }

        textarea {
          width: 100%;
          padding: 0.2rem;
          height: 1.5rem;
          box-sizing: border-box;

          &:focus {
            border-color: #004930;
          }
        }
      }
    }
  }
}
=======
	<div class="orderForm">
		<div class="title">服务信息</div>
		<div class="contInfo">
			<div class="serviceWrap">
				<div class="contact">
					<van-cell-group>
						<van-cell title="联系人">
							<template #default>
								<input type="text" v-model="model.contacts" placeholder="请输入联系人">
							</template>
						</van-cell>
						<van-cell title="手机号">
							<template #default>
								<input type="text" v-model="model.mobile" placeholder="请输入手机号">
							</template>
						</van-cell>
					</van-cell-group>
				</div>
				<div class="serviceTime">
					<van-cell is-link title="服务时间"  :value="model.serveTimeDate" color="#004930" @click="show = true">
						<!-- 使用 right-icon 插槽来自定义右侧图标 -->
						<template #right-icon>
							<img src="/img/mobile/rili.png" alt="">
						</template>
					</van-cell>
					<van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" />
				</div>
				<div class="serviceWay">
					<van-cell is-link title="服务方式" :value="model.serveType" @click="show1 = true" />
					<van-action-sheet v-model="show1" :actions="actions" @select="onSelect" />
				</div>
				<div class="serviceMsg">
					<van-cell title="客户留言" />
					<textarea v-model="model.remark" placeholder="选填:对本次服务的说明">
					</textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from "moment";
	export default {
		data() {
			return {
				show: false, //日历显示
				show1: false, //服务方式显示
				// date: '', //服务时间  
				actions: [{
					name: ' 代客服务 '
				}, {
					name: ' 自取方式 '
				}],
				baseUrl: process.env.VUE_APP_BASE_URL,
				user: {
					mobile: ''
				},
				model: {
					contacts: "", //联系人
					mobile: "", //联系电话
					serveTime: "", //服务时间
					serveTimeDate:null,
					serveType: "代客服务", //服务方式  代客服务  自取方式
					remark: ""
				}
			};
		},
		mounted() {
			this.user = this.$store.state.account.user;
			if (this.user.mobile) {
				this.model.mobile = this.user.mobile
			}
			//服务时间
			let date = moment().add(1, "days");
			this.model.serveTimeDate =  date.format("YYYY-MM-DD")
			this.model.serveTime = date.format(
				"YYYY-MM-DD 00:00:00"
			);
		},
		methods: {
			onSelect(item) {
				// 默认情况下点击选项时不会自动收起
				// 可以通过 close-on-click-action 属性开启自动收起
				this.show1 = false;
				this.model.serveType = `${item.name}`
			},
			formatDate(date) {
				let datYear = date.getYear()
				let datYears = datYear.toString()
				return `${'20'+datYears.substring(1,3)}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			onConfirm(date) {
				this.show = false;
				let dateString = this.formatDate(date);
				this.model.serveTimeDate = dateString;
				this.model.serveTime = dateString ? dateString + " 00:00:00" : "";
			},
			//获取数据
			getData() {
				if (!this.model.contacts) {
					this.$notify({
						type: "warning",
						message: "请填写联系人姓名"
					});
					return null;
				}
				if (!this.model.mobile) {
					this.$notify({
						type: "warning",
						message: "请填写手机号"
					});
					return null;
				}
				if (!this.model.serveTime) {
					this.$notify({
						type: "warning",
						message: "请填写服务时间"
					});
					return null;
				}
				if (!this.model.serveType) {
					this.$notify({
						type: "warning",
						message: "请选择服务方式"
					});
					return null;
				}
				return this.model;
			}
		},
	}
</script>

<style lang="less" scoped>
	.orderForm {
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

		.contInfo {
			.serviceWrap {
				.contact {
					.van-cell__value {
						overflow: initial;

						input {
							border: none;
						}
					}

					/deep/ .van-cell {
						font-size: .28rem;
					}
				}

				.serviceTime,
				.serviceWay {
					font-size: .28rem;
					display: flex;
					align-items: center;
					height: 1rem;

					.van-cell__value {
						text-align: left;
						margin-left: -.3rem;
					}

					/deep/ .van-cell {
						font-size: .28rem;
					}

					/deep/ .van-calendar__selected-day {
						background-color: #004930;
					}

					img {
						width: .32rem;
						height: .32rem;

					}
				}

				.serviceWay {
					.van-cell__value {
						text-align: left;
						margin-left: -.2rem;
					}
				}

				.serviceMsg {
					/deep/ .van-cell {
						font-size: .28rem;
					}

					textarea {
						width: 100%;
						padding: .2rem;
						height: 1.5rem;
						box-sizing: border-box;

						&:focus {
							border-color: #004930;
						}
					}
				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
