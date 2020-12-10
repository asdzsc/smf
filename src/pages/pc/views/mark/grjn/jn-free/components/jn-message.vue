<template>
	<div class="ly">
		<div class="lytitle">
			<div>
				<p>祭奠留言</p>
				<div class="line"></div>
			</div>
			<div class="lyBtn">
				我要纪念
			</div>
		</div>
		<div class="lyInfo">
			<a-spin size="large" tip="加载中..." :spinning="loading">
			  <a-icon
			    slot="indicator"
			    type="loading"
			    style="font-size: 30px; color: #004930;"
			    spin
			  />
			<div class="lyList">
				<div class="lyListAvatar">
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				</div>
				<div class="lyListInfo">
					<div class="lyListMsg">
						贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
					</div>
					<div class="lyListName">
						<p style="margin-right: 20px;">爸爸</p>
						<p>2020年1月1日 11:40</p>
					</div>
				</div>
			</div>
			<div class="lyList">
				<div class="lyListAvatar">
					<a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				</div>
				<div class="lyListInfo">
					<div class="lyListGift">
						<div class="lyListGiftIcon">
							<a-avatar :size="70" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						</div>
						<div class="lyListGiftName">
							<p>“小姑姑”</p>给<p>“姚贝娜”</p>送出了<p>月季</p>
						</div>
					</div>
					<div class="lyListMsg">
						贝娜，我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。贝娜我真的好想你，你不在的日子，每天都在想念你。希望你在天上面，能一切都好，爸爸会一直一直都想你的，我亲爱的宝贝。
					</div>
					<div class="lyListName">
						<p style="margin-right: 20px;">小姑</p>
						<p>2020年1月1日 11:40</p>
					</div>
				</div>
			</div>
		</a-spin>
	<paging v-if="paginghide" ref="paging" @setPage="setPage"></paging>
		</div>

	</div>
</template>

<script>
	export default{
		components:{
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
		methods:{
			setPage(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
		.ly {
			width: 1200px;
			margin: 30px auto;
			.lytitle {
				font-size: 40px;
				color: #00744c;
				text-align: center;
				margin-top: 50px;
						margin-bottom: 20px;
				position: relative;

				.line {
					line-height: 30px;
					margin: 0 auto;
					width: 160px;
					height: 8px;
					background-color: #00744c;
					border-radius: 4px;
				}

				.lyBtn {
					width: 190px;
					height: 50px;
					border-radius: 25px;
					border: solid 4px #00744c;
					font-size: 20px;
					color: #00744c;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 0;
					top: 29px;
					cursor: pointer;
				}
			}

			.lyInfo {


				.lyList {
					margin-top: 30px;
					background-color: #ffffff;
					box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					display: flex;
					padding: 40px;
					box-sizing: border-box;

					.lyListAvatar {
						margin-right: 30px;
					}

					.lyListInfo {
						display: flex;
						flex-direction: column;
						justify-lyListent: space-between;

						.lyListGift {
							height: 62px;
							line-height: 62px;
							background-color: #00744c;
							border-radius: 10px;
							margin-bottom: 20px;
							position: relative;

							.lyListGiftIcon {
								.ant-avatar-image {
									border: 1px solid #fff;
									background: #fff;
									position: absolute;
									left: 15px;
									top: -30px;
								}
							}

							.lyListGiftName {
								display: flex;
								font-size: 20px;
								color: #fefefe;
								margin-left: 120px;
							}
						}

						.lyListMsg {
							font-size: 16px;
							line-height: 24px;
							color: #999999;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
							display: -webkit-box;
						}

						.lyListName {
							display: flex;
							font-size: 14px;
							letter-spacing: 0px;
							color: #004930;
							margin-top: 25px;
						}
					}
				}
			}
		}
</style>
