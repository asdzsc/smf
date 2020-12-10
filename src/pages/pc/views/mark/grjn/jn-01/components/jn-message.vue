<template>
	<div class="ly">
		<div class="lytitle">
			<div class="title">
				<p>祭</p>
				<p>奠</p>
				<p>留</p>
				<p>言</p>
			</div>
			<div class="lyBtn">
				我要纪念
			</div>
		</div>
		<div class="lyInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="lyList">
					<div class="lyListAvatar">
						<div class="lyListGiftName">
							<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							<div class="lyListSend">
								<p class="name">“小姑姑”</p>
								<p class="to">送出了</p>
								<p class="gift">风铃花</p>
							</div>
						</div>
						<div class="lyListName">
							<p style="margin-right: 20px;">爸爸</p>
							<p>2020年1月1日 11:40</p>
						</div>
					</div>
					<div class="lyListInfo">
						<p>贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。</p>
						<div class="lyListInfoGift">
							<a-avatar :size="100" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						</div>
					</div>
				</div>
				<div class="lyList">
					<div class="lyListAvatar">
						<div class="lyListGiftName">
							<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							<div class="lyListSend">
								<p class="name">“小姑姑”</p>
								<p class="to">送出了</p>
								<p class="gift">风铃花</p>
							</div>
						</div>
						<div class="lyListName">
							<p style="margin-right: 20px;">爸爸</p>
							<p>2020年1月1日 11:40</p>
						</div>
					</div>
					<div class="lyListInfo">
						<p>贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。</p>
						<div class="lyListInfoGift">
							<a-avatar :size="100" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						</div>
					</div>
				</div>
			</a-spin>
			<paging  v-if="paginghide" ref="paging" @setPage="setPage"></paging>
		</div>

	</div>
</template>

<script>
	export default {
		components: {
			paging: () => import("@/pages/pc/views/mark/components/paging.vue"),
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
								paginghide: true,
				model: {
					current: "1",
					pageSize: "8",
					total: "0",
					list: []
				}
			};
		},
		watch: {
		   $route: {
		    handler: function(route) {
		     if (route.path.split("-")[0] == "/mark/grjn") {
		      this.paginghide = false;
		     }
		    },
		    immediate: true
		   }
		  },
		methods: {
			setPage() {

			}
		}
	}
</script>

<style lang="less" scoped>
	.ly {
		width: 1200px;
		margin: 30px auto;

		.lytitle {
			position: relative;

			.title {
				font-size: 40px;
				color: #333333;
				text-align: center;
				margin: 50px 0;
				margin-top: 100px;
				display: flex;
				justify-content: center;

				p {
					width: 71px;
					height: 71px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					border: solid 6px #872121;
					margin-right: 2px;
				}

				&:last-child {
					margin-right: 0;
				}
			}

			.lyBtn {
				width: 190px;
				height: 50px;
				border-radius: 25px;
				font-size: 20px;
				color: #eae9e9;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 20px;
				background-image: url("/img/pc/01lybtn.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
				cursor: pointer;
			}
		}

		.lyInfo {
			.lyList {
				margin-top: 30px;
				background-image: url("/img/pc/01ly.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				border-radius: 10px;
				padding: 80px;
				box-sizing: border-box;

				.lyListAvatar {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.lyListGiftName {
						display: flex;
						align-items: flex-end;

						.lyListSend {
							display: flex;
							line-height: 20px;

							.name {
								font-size: 20px;
								letter-spacing: 1px;
								color: #562e1e;
								font-weight: bold;
							}

							.to {
								font-size: 16px;
								color: #872121;
								padding-left: 20px;
								padding-right: 5px;
							}

							.gift {
								font-size: 16px;
								color: #562e1e;
							}
						}
					}

					.lyListName {
						display: flex;
						font-size: 14px;
						color: #872121;
						margin-top: 25px;
					}
				}
				.lyListInfo{
						font-size: 14px;
						line-height: 24px;
						letter-spacing: 0px;
						color: #872121;
						display: flex;
						align-items: center;
						.lyListInfoGift{
								width: 120px;
								height: 120px;
									background-color: #f7f7f5;
									border: solid 6px #892525;
									    border: solid 6px #892525;
									    border-radius: 50%;
						}
				}

			}
		}
	}
</style>
