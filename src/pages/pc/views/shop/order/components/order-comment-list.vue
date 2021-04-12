<template>
<<<<<<< HEAD
  <modal :title="title" @onClose="handleCancel" width="900px">
    <div class="cont">
      <a-comment v-for="item in list" :key="item.id">
        <div class="commentAuthor" slot="author">
          {{ item.name
          }}<span class="commentDtime">{{ parseTime(item.create_date) }}</span>
          <a-rate
            v-if="item.comment_type === '1'"
            :default-value="item.score"
            disabled
          />
        </div>
        <a-avatar :size="64" slot="avatar" :src="getAvatar(item.avatar)" />
        <div slot="content">
          <!-- <div class="goodsCont">
						2020年10月10日，购买了【标准套餐,18cm】 x 1
					</div> -->
          <div class="comment" v-html="item.cont"></div>
          <div v-if="item.imgList.length > 0" class="commentImgs">
            <a-row type="flex">
              <a-col
                v-for="(imgItem, index) in item.imgList"
                :key="imgItem + '_' + index"
                @click="showImg(imgItem, item.imgList)"
                class="commentImgItem"
              >
                <img :src="getImgUrl(imgItem)" />
              </a-col>
            </a-row>
          </div>
        </div>
        <div v-if="item.comment_type === '1'" style="text-align: right">
          <a-button @click="del(item.id)" type="danger">
            <a-icon type="delete" />删除评论
          </a-button>
        </div>
      </a-comment>
      <a-empty v-if="list.length === 0">
        <span slot="description">评论不存在或已删除</span>
      </a-empty>
    </div>
    <showImg
      v-if="showImgModal"
      ref="showImg"
      @onClose="showImgClose"
    ></showImg>
  </modal>
</template>

<script>
import { orderCommentList, delMyOrderComment } from "@/pages/pc/api/shop";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    modal: () => import("@/pages/pc/components/modal.vue"),
    showImg: () => import("@/pages/pc/components/show-img.vue"),
  },
  props: {
    orderId: {
      type: String,
      default() {
        return "";
      },
    },
    //评论类型
    commentType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: `this.src='/img/usernull.png'`,
      title: "",
      list: [],
      showImgModal: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.title = "评论内容";
      if (this.commentType === "1") {
        this.title = "评论内容";
      } else if (this.commentType === "2") {
        this.title = "服务反馈内容";
      }
      this._orderCommentList();
    },
    _orderCommentList() {
      orderCommentList({
        id: this.orderId,
        commentType: this.commentType,
        isUser: true,
        isPaging: false,
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data;
          this.list.forEach((item) => {
            if (item.img) {
              var imgList = item.img.split(",");
              this.$set(item, "imgList", imgList);
            } else {
              this.$set(item, "imgList", []);
            }
            item.cont = item.cont.replace(/\n/g, "<br>");
          });
        }
      });
    },
    getAvatar(record) {
      if (record) {
        if (record.indexOf("http") >= 0) {
          return record;
        } else {
          return this.baseUrl + record;
        }
      } else {
        return "/img/usernull.png";
      }
    },
    getImgUrl(imgUrl) {
      if (imgUrl) {
        if (imgUrl.indexOf("http") >= 0) {
          return imgUrl;
        } else {
          return this.baseUrl + imgUrl;
        }
      } else {
        return "/img/zwtp.jpg";
      }
    },
    showImg(imgUrl, imgList) {
      this.showImgModal = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.showImg.loadData(imgUrl, imgList);
        }, 200);
      });
    },
    showImgClose() {
      this.showImgModal = false;
    },
    //删除评论
    del(nid) {
      var vm = this;
      this.$confirm({
        title: "确认要删除吗?",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          delMyOrderComment({
            id: nid,
          }).then((res) => {
            if (res.code === 0) {
              vm.handleCancel(res);
            }
          });
        },
        onCancel() {},
      });
    },
    parseTime(time) {
      if (time) {
        return utils.parseTime(time, "{y}-{m}-{d}");
      } else {
        return "";
      }
    },
    handleCancel(res) {
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.cont {
  padding: 40px 80px;

  /deep/ .ant-comment-avatar {
    img {
      width: 64px;
      height: 64px;
    }
  }

  .commentAuthor {
    font-size: 16px;
    font-weight: 700;
    color: #333333;

    .commentDtime {
      font-size: 14px;
      font-weight: normal;
      color: #a9a9a9;
      padding-left: 10px;
      padding-right: 30px;
    }
  }

  .goodsCont {
    font-size: 14px;
    color: #a9a9a9;
    padding: 10px 0px;
  }

  .comment {
    padding: 10px 0px;
  }

  .commentImgs {
    .commentImgItem {
      height: 100px;
      border: 1px solid #dddddd;
      cursor: pointer;
      margin-bottom: 10px;
      margin-right: 10px;

      img {
        max-width: 175px;
        height: 100px;
      }
    }
  }
}
=======
	<modal :title="title" @onClose="handleCancel" width="900px">
		<div class="cont">
			<a-comment v-for="item in list" :key="item.id">
				<div class="commentAuthor" slot="author">
					{{item.name}}<span class="commentDtime">{{ parseTime(item.create_date) }}</span>
					<a-rate v-if="item.comment_type === '1'" :default-value="item.score" disabled />
				</div>
				<a-avatar :size="64" slot="avatar" :src="getAvatar(item.avatar)" />
				<div slot="content">
					<!-- <div class="goodsCont">
						2020年10月10日，购买了【标准套餐,18cm】 x 1
					</div> -->
					<div class="comment" v-html="item.cont">
					</div>
					<div v-if="item.imgList.length > 0" class="commentImgs">
						<a-row type="flex">
							<a-col v-for="(imgItem,index) in item.imgList" :key="imgItem + '_' + index" @click="showImg(imgItem, item.imgList)"
							 class="commentImgItem">
								<img :src="baseUrl + imgItem" />
							</a-col>
						</a-row>
					</div>
				</div>
				<div v-if="item.comment_type === '1'" style="text-align: right;">
					<a-button @click="del(item.id)" type="danger">
						<a-icon type="delete" />删除评论
					</a-button>
				</div>
			</a-comment>
			<a-empty v-if="list.length === 0">
				<span slot="description">评论不存在或已删除</span>
			</a-empty>
		</div>
		<showImg v-if="showImgModal" ref="showImg" @onClose="showImgClose"></showImg>
	</modal>
</template>

<script>
	import {
		orderCommentList,
		delMyOrderComment
	} from '@/pages/pc/api/shop'
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			modal: () => import("@/pages/pc/components/modal.vue"),
			showImg: () => import("@/pages/pc/components/show-img.vue")
		},
		props: {
			orderId: {
				type: String,
				default () {
					return ''
				}
			},
			//评论类型
			commentType: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: `this.src='/img/usernull.png'`,
				title: "",
				list: [],
				showImgModal: false
			};
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.title = "评论内容";
				if (this.commentType === "1") {
					this.title = "评论内容";
				} else if (this.commentType === "2") {
					this.title = "服务反馈内容";
				}
				this._orderCommentList()
			},
			_orderCommentList() {
				orderCommentList({
					id: this.orderId,
					commentType: this.commentType,
					isUser: true,
					isPaging: false
				}).then(res => {
					if (res.code === 0) {
						this.list = res.data
						this.list.forEach(item => {
							if (item.img) {
								var imgList = item.img.split(',')
								this.$set(item, 'imgList', imgList)
							} else {
								this.$set(item, 'imgList', [])
							}
							item.cont = item.cont.replace(/\n/g, '<br>')
						})
					}
				})
			},
			getAvatar(record) {
				if (record) {
					if (record.indexOf("http") >= 0) {
						return record;
					} else {
						return this.baseUrl + record;
					}
				} else {
					return "/img/usernull.png";
				}
			},
			showImg(imgUrl, imgList) {
				this.showImgModal = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.showImg.loadData(imgUrl, imgList);
					}, 200);
				});
			},
			showImgClose() {
				this.showImgModal = false;
			},
			//删除评论
			del(nid) {
				var vm = this
				this.$confirm({
					title: "确认要删除吗?",
					content: "",
					okText: "确定",
					cancelText: "取消",
					onOk() {
						delMyOrderComment({
							id: nid
						}).then(res => {
							if (res.code === 0) {
								vm.handleCancel(res);
							}
						})
					},
					onCancel() {}
				});
			},
			parseTime(time) {
				if (time) {
					return utils.parseTime(time, "{y}-{m}-{d}");
				} else {
					return ''
				}
			},
			handleCancel(res) {
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.cont {
		padding: 40px 80px;

		/deep/ .ant-comment-avatar {
			img {
				width: 64px;
				height: 64px;
			}
		}

		.commentAuthor {
			font-size: 16px;
			font-weight: 700;
			color: #333333;

			.commentDtime {
				font-size: 14px;
				font-weight: normal;
				color: #a9a9a9;
				padding-left: 10px;
				padding-right: 30px;
			}
		}

		.goodsCont {
			font-size: 14px;
			color: #a9a9a9;
			padding: 10px 0px;
		}

		.comment {
			padding: 10px 0px;
		}

		.commentImgs {
			.commentImgItem {
				height: 100px;
				border: 1px solid #dddddd;
				cursor: pointer;
				margin-bottom: 10px;
				margin-right: 10px;

				img {
					max-width: 175px;
					height: 100px;
				}
			}
		}

	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
