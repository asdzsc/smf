<template>
	<div class="sysList">
		<memberTabs ref="memberTabs"></memberTabs>
		<div class="title">
			<p>系统通知</p>
			<div>
				<span @click="setAllRead()" style="padding-right: 10px;">全部标为已读</span>
				|<span @click="delAll()" style="padding-left: 10px;">清空</span>
			</div>
		</div>

		<div class="sysListInfo">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div v-for="item in model.list" :key="item.id" class="itemCont">
					<div class="dtime">
						{{ item.createDate }}
					</div>
					<div class="msgCont">
						<div class="msgTitle">
							{{ item.title }}
						</div>
						<div class="msgIntro" :class="{'read':(item.isRead === '1')}">
							{{ item.cont }}
						</div>
						<div @click="openUrl(item.url)" class="link">
							查看详情链接 >
						</div>
					</div>
				</div>
			</van-list>
		</div>

	</div>
</template>

<script>
	import {
		getSysMessageList,
		setSysMessageAllRead,
		delSysMessageAll
	} from '@/pages/pc/api/sysmessage'
	export default {
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
				model: {
					current: "1",
					pageSize: "8",
					searchText: "",
					total: "0",
					list: []
				},
			}
		},
		components: {
			memberTabs: () => import("@/pages/mobile/views/member/components/member-tabs.vue"),
		},
		mounted() {
			this._getList();
		},
		methods: {
			onLoad() {
				this._getList();
			},
			_getList() {
				var vm = this;
				this.loading = true;
				getSysMessageList(this.model).then(res => {
					vm.loading = false;
					if (res.code === 0) {
						const results = res.data.list;
						vm.model.list.push(...results);
						if (res.data.hasNextPage) {
							setTimeout(() => {
								vm.model.current = ++vm.model.current
							}, 500)
						} else {
							this.finished = true;
						}
					}
				});
			},
			setAllRead() {
				this.$dialog
					.confirm({
						title: '确认标记所有消息为已读吗？',
						message: '',
					})
					.then(() => {
						setSysMessageAllRead().then(res => {
							if (res.code === 0) {
								this.$notify({
									type: "success",
									message: "设置成功！"
								});
								this.$store.commit("account/setSysMessageNum", 0);
							}
						})
					})
					.catch(() => {
						// on cancel
					});
			},
			delAll() {
				this.$dialog
					.confirm({
						title: '确认清空所有消息吗？',
						message: '',
					})
					.then(() => {
						delSysMessageAll().then(res => {
							if (res.code === 0) {
								this.$notify({
									type: "success",
									message: "删除成功！"
								});
								this.$store.commit("account/setSysMessageNum", 0);
							}
						})
					})
					.catch(() => {
						// on cancel
					});
			},
			openUrl(url) {
				if (url) {
					if (url.indexOf("http") >= 0) {
						window.location = url;
					} else {
						this.$router.push(url);
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.sysList {
		background: #fff;

		.title {
			padding: 4%;
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;

			p {
				font-size: .32rem;
				font-weight: bold;
			}

			span {
				font-size: .26rem;
				color: #666666;
			}
		}

		.sysListInfo {
			.itemCont {
				padding: 4%;
				box-sizing: border-box;

				.dtime {
					text-align: center;
					font-size: .24rem;
					color: #999999;
				}

				.msgCont {
					margin-top: .10rem;
					background-color: #f8f8f8;

					.msgTitle {
						font-size: .28rem;
						color: #333333;
						padding-bottom: .1rem;
						line-height: .4rem;
						border-bottom: 1px solid #999999;
						font-weight: 700;
						margin-bottom: .20rem;
					}

					.msgIntro {
						font-size: .26rem;
						line-height: .4rem;
						// color: #333333;
						color: #006eff;

						&.read {
							color: #888;
						}
					}

					.link {
						text-align: right;
						padding-top: 20px;
						font-size: 14px;
						color: #004930;
						cursor: pointer;
					}
				}

			}
		}
	}
</style>
