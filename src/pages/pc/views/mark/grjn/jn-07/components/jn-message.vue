<template>
	<div class="ly">
		<div class="lytitle">
		<div class="title">
			<p class="yw">Memorial message</p>
			<p class="zw">祭奠留言</p>
		</div>
			<div class="lyBtn">
				<p>我要纪念</p>
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
			<paging v-if="paginghide" ref="paging" @setPage="setPage"></paging>
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
					paginghide:true,
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
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			margin-bottom: 50px;
			margin-top: 100px;
			.yw {
				font-size: 44px;
				font-weight: bold;
				line-height: 42px;
				color: #3c3427;
				line-height: 0;
			}

			.zw {
				width: 225px;
				margin:  0 auto;
				background-image: url('/img/pc/07_title.png');
				background-size: 100% 100%;
				font-size: 40px;
				text-align: center;
				color: #b38b4e;
			}
		}

			.lyBtn {
				width: 235px;
					height: 60px;
	background-color: #782225;
	box-shadow: 0px 7px 0px 0px 
		rgba(0, 0, 0, 0.15);
	border-radius: 32px;
				position: absolute;
				right: 0;
				top: 0px;
				text-align: center;
				line-height: 60px;
				cursor: pointer;
				font-size: 28px;
				color: #fff;
			}
		}

		.lyInfo {
			.lyList {
				margin-top: 30px;
				padding: 40px;
				box-sizing: border-box;
				border: solid 8px #b1894d;
				position: relative;

				.lyListAvatar {
					display: flex;
					width: 80%;
					margin-left:30px;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #562e1e;
					padding-bottom: 20px;
					.lyListGiftName {
						display: flex;
						align-items: flex-end;
						.lyListSend {
							display: flex;
							line-height: 20px;

							.name {
								font-size: 20px;
								letter-spacing: 1px;
									color: #999999;
								font-weight: bold;
							}

							.to {
								font-size: 16px;
									color: #999999;
								padding-left: 20px;
								padding-right: 5px;
							}

							.gift {
								font-size: 16px;
									color: #999999;
							}
						}
					}

					.lyListName {
						display: flex;
						font-size: 14px;
							color: #999999;
						margin-top: 25px;
					}
				}

				.lyListInfo {
					width: 80%;
					margin-left:30px;
					font-size: 14px;
					line-height: 24px;
					letter-spacing: 0px;
						color: #999999;
					margin-top: 20px;	

					.lyListInfoGift {
						width: 120px;
						height: 120px;
						background-image: url('/img/pc/06avatarbj.png');
						background-size: 100% auto;
						background-repeat: no-repeat;
						background-position: center center;
						position: absolute;
						right: 100px;
						top: 30px;
					}
				}

			}
		}
	}
</style>
