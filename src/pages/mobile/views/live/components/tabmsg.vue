<template>
	<div id="container" class="container" :style="getContStyle()">
		<div id="msg-list" class="msg-list">
			<!-- <div class="loading">
				<van-loading v-show="!isSDKReady" size="24px" vertical>正在拼命初始化...</van-loading>
			</div> -->
			<div v-for="item in msgList" :key="item.id" class="msg-item">
				<van-row type="flex">
					<van-col>
						<img class="user-icon" :src="getAvatar(item)" :onerror="defUserImg" />
					</van-col>
					<van-col class="msg-item-cont">
						<div class="msg-item-top">
							<span class="user-name">{{ item.name }}</span>
							<span class="msg-time">{{ item.createDate }}</span>
						</div>
						<div class="msg-item-text" v-html="item.cont.replace(/\#(.+?)\;/gi, emotion)"></div>
					</van-col>
				</van-row>
			</div>
		</div>

		<div class="msg-cont">
			<van-row type="flex">
				<van-col style="flex: 1;">
					<div class="text-cont">
						<van-row>
							<van-col><img class="img-xie" src="/img/mobile/live/xie.png" /></van-col>
							<van-col style="width:87%">
								<div ref="msgInputContainer" contenteditable="true" class="text-font" @focus="focusText($event)" @blur="blurText($event)"
								 @click="clickText()" @keyup.13="sendMsg">
									我来说两句...
								</div>
							</van-col>
						</van-row>
					</div>
				</van-col>
				<van-col v-if="actionMsg || showEmoji" class="msg-text-btn">
					<van-button @click="sendMsg" type="info" size="small" round>
						发送
					</van-button>
				</van-col>
				<van-col class="msg-icon-cont">
					<img @click="(showEmoji = !showEmoji)" class="msg-icon" src="/img/mobile/live/bq.png" />
				</van-col>
			</van-row>

			<div v-show="showEmoji" class="emoji">
				<van-grid :column-num="6">
					<van-grid-item v-for="(item, index) in emojiList" :key="item" @click="clickEmoji(item)">
						<img :src="`${baseUrl}/images/face/${index}.png`" style="width:100%;height: 100%;" />
					</van-grid-item>
				</van-grid>
			</div>
		</div>

	</div>
</template>

<script>
	import * as utils from "@/pages/mobile/libs/utils";
	// import { saveMsg } from "@/api/livemsg";
	import $ from "jquery";

	export default {
		name: "tabmsg",
		props: {
			model: {
				type: Object,
				default () {
					return {
						id: ""
					};
				}
			},
			anchor: {
				type: Object,
				default () {
					return {
						id: ""
					};
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				websocket: process.env.VUE_APP_WEBSOCKET,
				defUserImg: "this.src='/img/mobile/live/wode-2.png'",
				tagHeight: 200,
				isSDKReady: false,
				jobTime: null,
				tim: null,
				user: {},
				actionMsg: false, //阻止文本框影藏
				lastRange: null,
				msgList: [],
				showEmoji: false,
				goodsList: [],
				currentGoods: null,
				timer: null,
				msgTime: "",
				ws: null,
				isWebSocket: false
			};
		},
		computed: {
			emojiList() {
				return this.$store.state.setting.emojiList;
			}
		},
		watch: {
			"$store.state.setting.tabHeight"() {
				this.setTagHeight();
			}
		},
		mounted() {
			this.user = this.$store.state.account.user;
			this.setTagHeight();
			this.initWebSocket();
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
			clearInterval(this.jobTime);
			this.jobTime = null;
			this.ws.close();
			this.ws = null
		},
		methods: {
			initWebSocket: function() {
				var vm = this;
				vm.ws = new WebSocket(vm.websocket + "/websocket/" + vm.model.id);
				vm.ws.onopen = function(e) {
					vm.isWebSocket = true
					console.log("WebSocket已经打开: ");
					console.log(e);
				};
				vm.ws.onmessage = function(e) {
					//接收消息
					// console.log("onmessage", e.data);
					var websocketData = JSON.parse(e.data)
					var msgItem = websocketData.liveMsg
					vm.pushMsgList(msgItem);
				};
				vm.ws.onclose = function(e) {
					console.log("WebSocket关闭: ");
					console.log(e);
					vm.isWebSocket = false
				};
				vm.ws.onerror = function(e) {
					console.log("WebSocket发生错误: ");
					console.log(e);
				};
			},
			getContStyle() {
				if (this.model.isVertical !== "1") {
					return `height:${this.tagHeight}px; overflow:auto;`;
				} else {
					return "";
				}
			},
			setTagHeight() {
				this.tagHeight = this.$store.state.setting.tabHeight;
			},
			getAvatar(item) {
				if (item.avatar) {
					return item.avatar.indexOf("http") === 0 ?
						item.avatar :
						this.baseUrl + item.avatar;
				} else {
					return "/img/mobile/live/wode-2.png";
				}
			},
			clickEmoji(item) {
				let index = this.emojiList.indexOf(item);
				let Img =
					`<img src="${this.baseUrl}/images/face/${index}.png" name="${item}" align="middle" style="width:24px;height:24px;">`; // img是要插入的图片表情
				let obj = this.$refs.msgInputContainer; // obj 是可编辑的div

				this.keepLastIndex(obj);
				var range = window.getSelection().getRangeAt(0); //找到焦点位置
				if ($(range.startContainer).attr("class") !== "text-font") {
					obj.focus();
				}
				range = window.getSelection().getRangeAt(0); //找到焦点位置
				var node = range.createContextualFragment(Img);
				range.insertNode(node); //在焦点插入节点

				this.$refs.msgInputContainer.blur();

				var sw = $(".text-font").get(0).scrollWidth;
				$(".text-font").scrollLeft(sw);
				// obj.scrollLeft(obj.scrollWidth);
			},
			keepLastIndex(obj) {
				// obj 为可编辑 的div  移动端的就没做低版本的兼容
				if (window.getSelection) {
					let range = window.getSelection(); // 创建range
					range.selectAllChildren(obj); // range 选择obj下所有子内容
					range.collapseToEnd(); // 光标移至最后
				}
			},
			getMsgText() {
				var textHtml = this.$refs.msgInputContainer.innerHTML;
				var imgReg = /<img.*?(?:>|\/>)/gi;
				var imgs = textHtml.match(imgReg);
				if (imgs) {
					// eslint-disable-next-line no-useless-escape
					var srcReg = /name=[\'\"]?([^\'\"]*)[\'\"]?/i;
					for (let index = 0; index < imgs.length; index++) {
						const element = imgs[index];

						var query = element.match(srcReg);
						if (query[1]) {
							textHtml = textHtml.replace(
								new RegExp(element, "gm"),
								"#" + query[1] + ";"
							);
						}
					}
				}
				textHtml = textHtml.replace(new RegExp("<div><br></div>", "gm"), "");
				return textHtml;
			},
			clickText() {
				this.showEmoji = false;
				this.showGift = false;
			},
			// eslint-disable-next-line no-unused-vars
			focusText(e) {
				this.actionMsg = true;
				let obj = this.$refs.msgInputContainer; // obj 是可编辑的div
				var text = this.getMsgText();
				if (text.indexOf("我来说两句...") >= 0) {
					obj.innerHTML = "";
				}
				this.keepLastIndex(obj);
			},
			// eslint-disable-next-line no-unused-vars
			blurText(e) {
				setTimeout(() => {
					this.actionMsg = false;
				}, 5);
			},
			parseTime(time) {
				utils.parseTime(time);
			},
			// 将匹配结果替换表情图片
			emotion(res) {
				// eslint-disable-next-line no-useless-escape
				let word = res.replace(/\#|\;/gi, "");
				let index = this.emojiList.indexOf(word);
				return `<img src="${this.baseUrl}/images/face/${index}.png" name="${word}" align="middle" style="width:24px;height:24px;">`;
			},
			sendMsg() {
				var text = this.getMsgText();
				if (text) {
					if (this.isWebSocket) {
						this.$refs.msgInputContainer.blur();
						this.timeMsg(text, "", "text");
					}
				}
			},
			timeMsg(text, imgs, msgType) {
				var msgItem = {
					id: utils.getId(),
					liveId: this.model.id,
					anchorId: '',
					userid: this.user.id,
					name: this.user.name,
					avatar: this.user.avatar,
					cont: text,
					msgType: msgType,
					createDate: utils.timestampToDateString(new Date())
				};
				var websocketData = {
					liveId: this.model.id,
					type: msgType,
					liveMsg: msgItem
				}
				this.ws.send(JSON.stringify(websocketData));
				this.actionMsg = false
				this.showEmoji = false
				let obj = this.$refs.msgInputContainer;
				obj.innerHTML = "我来说两句...";
			},
			pushMsgList(msgItem) {
				var vm = this
				this.msgList.unshift(msgItem);
				if (this.msgList.length > 30) {
					this.msgList = this.msgList.slice(0, 30);
				}

				setTimeout(function() {
					vm.msgList = vm.msgList.filter(function(x) {
						return x.id !== msgItem.id
					})
				}, 10000)
			}
		}

	};
</script>

<style lang="less" scoped>
	.container {
		// padding-bottom: 1rem;
	}

	.loading {
		text-align: center;
		padding: 0.2rem;
	}

	.msg-cont {
		position: fixed;
		bottom: 0rem;
		width: 100%;
		min-height: 1rem;
		z-index: 21;
		background-color: #ffffff;
		box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.12);

		.msg-icon-cont {
			white-space: nowrap;
			padding: 0px 0.2rem;
			padding-top: 0.2rem;

			.msg-icon {
				height: 0.54rem;
			}

			.msg-icon+.msg-icon {
				margin-left: 0.2rem;
			}
		}

		.text-cont {
			margin-top: 0.15rem;
			margin-left: 0.2rem;
			margin-right: 0.1rem;
			height: 0.64rem;
			background-color: #f5f5f5;
			border-radius: 32px;
			line-height: 0.64rem;
			padding-left: 0.3rem;

			.img-xie {
				height: 0.27rem;
			}

			.text-font {
				padding-top: 2px;
				padding-left: 0.2rem;
				color: #333333;
				width: 4.5rem;
				height: 0.64rem;
				white-space: nowrap;
				overflow: hidden;
				outline: none;
			}

			.text-inpt {
				border: 0px;
				margin-left: 0.2rem;
				width: 88%;
				height: 0.64rem;
				background-color: #f5f5f5;

				&::-webkit-input-placeholder {
					color: #bbbbbb;
				}
			}
		}

		.msg-text-btn {
			padding: 0px 0.2rem;
			padding-top: 0.15rem;
		}

		.emoji {
			height: 5rem;
			overflow: auto;
			background-color: #f9f9f9;
		}

		.gift {
			height: 5rem;
			overflow: auto;
			background-color: #f9f9f9;

			.gift-img {
				width: 60%;
				height: 60%;
				margin-bottom: 10px;
				object-fit: contain;
			}
		}
	}

	.msg-item {
		padding: 0.3rem;
		border-bottom: 1px solid #efefef;

		.user-icon {
			width: 32px;
			height: 32px;
			border-radius: 50%;
			margin-top: 0.1rem;
		}

		.msg-item-cont {
			padding-left: 0.2rem;
			line-height: 0.48rem;
			flex: 1;

			.user-name {
				font-size: 0.3rem;
				font-weight: bold;
				color: #333333;
			}

			.msg-time {
				padding-left: 0.1rem;
				color: #999999;
			}

			.msg-item-text {
				color: #666666;
			}
		}
	}

	.vertical-container {
		.msg-list {
			position: fixed;
			bottom: 2rem;
			width: 100%;
			background-color: transparent;
			z-index: 9;
			max-height: 5rem;
			padding-top: 5px;
			overflow: hidden;

			.msg-item {
				border-bottom: none;
				padding: 0 0 10px 10px;

				.van-row {
					background-color: rgba(0, 0, 0, 0.55);
					border-radius: 25px;
					padding: 0;
					box-sizing: border-box;
					position: relative;
					display: inline-block;
					padding: 3px 13px 3px 0.64rem;
					max-width: 80vw;

					.van-col {
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}

				.user-icon {
					margin-top: 0px;
					position: absolute;
					left: -1px;
					border: 1px solid #fff;
					top: -3px;
				}

				.msg-item-cont {
					.msg-item-top {
						display: none;
					}

					.user-name {
						color: #fff;
					}

					.msg-time {
						color: #aaa;
					}

					.msg-item-text {
						color: #fff;
						font-size: 13px;
						line-height: 22px;
						max-width: 3rem;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}
	}

	@keyframes sliceFont {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(2);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes slider-in {
		0% {
			transform: translateX(-225px);
		}

		100% {
			transform: translateX(0px);
		}
	}

	@keyframes slider-out {
		0% {
			transform: translateX(0px);
		}

		100% {
			transform: translateX(-225px);
		}
	}

	.giftFixed {
		position: fixed;
		left: 0;
		/* top: 300px; */
		bottom: calc(100vh - 300px);
		width: 225px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		color: #fff;
		height: 92px;
		overflow: auto;

		.item {
			position: relative;
			flex: 0 0 40px;
			background-color: rgba(0, 0, 0, 0.55);
			border-radius: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 18px;
			margin-top: 5px;
			animation: slider-in 1s linear 1 forwards;

			.name {
				font-size: 13px;
			}

			.content {
				font-size: 12px;
				color: #f9ee55;
			}

			.goods {
				display: flex;
				align-items: center;
				position: absolute;
				right: 17px;
				bottom: 0;
				font-size: 16px;
				color: #f9ee55;

				.number {
					transform: skewX(-16deg);
					height: 40px;
					line-height: 40px;
					display: flex;
					align-items: baseline;
				}

				.icon {
					width: 40px;
					margin-right: 7px;
				}

				span {
					font-size: 24px;
				}

				.sliceFont {
					animation: sliceFont 0.5s linear infinite;
				}
			}
		}

		.destroy {
			animation: slider-out 0.3s linear 1 forwards;
		}
	}
</style>
