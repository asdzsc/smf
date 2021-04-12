<template>
<<<<<<< HEAD
  <div class="zwzx">
    <div class="banner"></div>
    <xwzxHead name="招标广告"></xwzxHead>
    <div class="cont">
      <a-spin size="large" tip="加载中..." :spinning="loading">
        <a-icon
          slot="indicator"
          type="loading"
          style="font-size: 30px; color: #004930"
          spin
        />
        <div class="list">
          <a-empty v-if="model.list.length === 0" />
          <div
            v-for="item in model.list"
            :key="item.id"
            @click.stop="$router.push('/xwzx/zbggInfo?id=' + item.id)"
            class="item"
          >
            <div class="itemTitleCont">
              <div class="line"></div>
              <diV class="itemTitle">
                {{ item.title }}
              </diV>
              <div
                v-if="item.isCont === '0' && item.pdfFile"
                class="downfile"
                @click.stop="openUrl(baseUrl + item.pdfFile)"
              >
                <a-icon type="link" /> 下载项目详情
              </div>
            </div>
            <div class="intro">项目简介：{{ item.intro }}</div>
            <div class="tableCont">
              <table>
                <thead>
                  <th style="width: 15%">招标数</th>
                  <th style="width: 15%">投标数</th>
                  <th style="width: 20%">招标截至日期</th>
                  <th style="width: 15%">结算形式</th>
                  <th style="width: 15%">项目日期</th>
                  <th style="width: 20%">招投标的状态</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {{ item.zbNum }}
                    </td>
                    <td>
                      {{ item.tbNum }}
                    </td>
                    <td>
                      {{ parseTime(item.endTime, "{y}-{m}-{d}") }}
                    </td>
                    <td>
                      {{ item.jsxs }}
                    </td>
                    <td>
                      {{ parseTime(item.proTime, "{y}-{m}-{d}") }}
                    </td>
                    <td v-html="statusText(item)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </a-spin>
      <paging ref="paging" @setPage="setPage"></paging>
    </div>
    <myserve></myserve>
  </div>
</template>

<script>
import { newsZbggList } from "@/pages/pc/api/news";
import * as utils from "@/pages/pc/libs/utils";
export default {
  components: {
    xwzxHead: () => import("@/pages/pc/views/xwzx/components/xwzx-head.vue"),
    // xwzxTitle: () => import("@/pages/pc/views/xwzx/components/xwzx-title.vue"),
    paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
    myserve: () => import("@/pages/pc/components/myserve.vue"),
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      loading: false,
      model: {
        current: "1",
        pageSize: "8",
        total: "0",
        list: [],
      },
    };
  },
  mounted() {
    this._newsList();
  },
  methods: {
    _newsList() {
      this.loading = true;
      newsZbggList(this.model).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          Object.assign(this.model, res.data);
          setTimeout(() => {
            this.$refs.paging.setPageInfo(this.model);
          }, 200);
        }
      });
    },
    setPage(pageNum) {
      this.model.current = pageNum;
      this._newsList();
    },
    statusText(item) {
      var s = new Date();
      var sstr = utils.parseTime(s, "{y}-{m}-{d}");
      console.log(sstr);
      var estr = utils.parseTime(item.endTime, "{y}-{m}-{d}");
      var e = new Date(estr + " 23:59:59");
      if (sstr === estr) {
        return `<div class="statusDiv jxz">进行中</div>`;
      } else if (s < e) {
        return `<div class="statusDiv jjks">即将开始</div>`;
      } else if (s > e) {
        return `<div class="statusDiv yjs">已结束</div>`;
      }
    },
    parseTime(time, cFormat) {
      return utils.parseTime(time, cFormat);
    },
    openUrl(url) {
      var tempPage = window.open("", "_blank");
      tempPage.location = url;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-spin-text {
  color: #004930;
}

.zwzx {
  .banner {
    background: url("/img/banner15.png") no-repeat center center;
    background-size: cover;
    height: 500px;
    text-align: center;
    position: relative;
  }

  .cont {
    width: 1200px;
    margin: auto;

    .list {
      margin-bottom: 50px;

      .item {
        margin-top: 60px;

        .itemTitleCont {
          display: flex;

          .line {
            width: 4px;
            height: 40px;
            background-color: #004930;
          }

          .itemTitle {
            padding-left: 10px;
            font-size: 28px;
            font-weight: 700;
            color: #004930;
            line-height: 40px;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            display: -webkit-box;
            flex: 1;
          }

          .downfile {
            width: 190px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            color: #16543e;
            line-height: 40px;
            border: solid 2px #004930;
            cursor: pointer;
          }
        }

        .intro {
          padding-left: 15px;
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 20px;
          font-weight: normal;
          color: #2e2e2e;
          // line-height: 40px;
          // text-overflow: ellipsis;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
          // overflow: hidden;
          // display: -webkit-box;
        }

        .tableCont {
          padding-left: 15px;

          table {
            width: 100%;

            thead {
              background-color: #e5ecea;

              th {
                height: 40px;
                font-size: 20px;
                font-weight: 400;
                color: #2e2e2e;
                text-align: center;
              }
            }

            tbody {
              background-color: #f8f8f8;

              tr > td {
                height: 85px;
                text-align: center;

                /deep/ .statusDiv {
                  width: 110px;
                  height: 36px;
                  text-align: center;
                  font-size: 16px;
                  font-weight: 400;
                  color: #ffffff;
                  line-height: 36px;
                  margin: auto;

                  &.jjks {
                    background-color: #f4a100;
                  }

                  &.jxz {
                    background-color: #00744c;
                  }

                  &.yjs {
                    background-color: #9b9b9b;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
=======
	<div class="zwzx">
		<div class="banner"></div>
		<xwzxHead name="招标广告"></xwzxHead>
		<div class="cont">
			<xwzxTitle title="招标广告"></xwzxTitle>
			<a-spin size="large" tip="加载中..." :spinning="loading">
				<a-icon slot="indicator" type="loading" style="font-size: 30px; color: #004930;" spin />
				<div class="list">
					<a-empty v-if="model.list.length === 0" />
					<div v-for="item in model.list" :key="item.id" @click.stop="$router.push('/xwzx/zbggInfo?id='+item.id)" class="item">
						<div class="itemTitleCont">
							<div class="line"></div>
							<diV class="itemTitle">
								{{ item.title }}
							</diV>
							<div v-if="item.isCont === '0' && item.pdfFile" class="downfile" @click.stop="openUrl(baseUrl + item.pdfFile)">
								<a-icon type="link" /> 下载项目详情
							</div>
						</div>
						<div class="intro">
							项目简介：{{ item.intro }}
						</div>
						<div class="tableCont">
							<table>
								<thead>
									<th style="width: 15%;">招标数</th>
									<th style="width: 15%;">投标数</th>
									<th style="width: 20%;">招标截至日期</th>
									<th style="width: 15%;">结算形式</th>
									<th style="width: 15%;">项目日期</th>
									<th style="width: 20%;">招投标的状态</th>
								</thead>
								<tbody>
									<tr>
										<td>
											{{ item.zbNum }}
										</td>
										<td>
											{{ item.tbNum }}
										</td>
										<td>
											{{ parseTime(item.endTime,'{y}-{m}-{d}') }}
										</td>
										<td>
											{{ item.jsxs }}
										</td>
										<td>
											{{ parseTime(item.proTime,'{y}-{m}-{d}') }}
										</td>
										<td v-html="statusText(item)">
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</a-spin>
			<paging ref="paging" @setPage="setPage"></paging>
		</div>
		<myserve></myserve>
	</div>
</template>

<script>
	import {
		newsZbggList
	} from "@/pages/pc/api/news";
	import * as utils from "@/pages/pc/libs/utils";
	export default {
		components: {
			xwzxHead: () => import("@/pages/pc/views/xwzx/components/xwzx-head.vue"),
			xwzxTitle: () => import("@/pages/pc/views/xwzx/components/xwzx-title.vue"),
			paging: () => import("@/pages/pc/views/xwzx/components/paging.vue"),
			myserve: () => import("@/pages/pc/components/myserve.vue")
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_URL,
				defImg: 'this.src="/img/zwtp.jpg"',
				loading: false,
				model: {
					current: "1",
					pageSize: "8",
					total: "0",
					list: []
				}
			};
		},
		mounted() {
			this._newsList();
		},
		methods: {
			_newsList() {
				this.loading = true;
				newsZbggList(this.model).then(res => {
					this.loading = false;
					if (res.code === 0) {
						Object.assign(this.model, res.data);
						setTimeout(() => {
							this.$refs.paging.setPageInfo(this.model);
						}, 200)
					}
				});
			},
			setPage(pageNum) {
				this.model.current = pageNum;
				this._newsList();
			},
			statusText(item) {
				var s = new Date()
				var sstr = utils.parseTime(s, '{y}-{m}-{d}')
				console.log(sstr)
				var estr = utils.parseTime(item.endTime, '{y}-{m}-{d}')
				var e = new Date(estr + ' 23:59:59')
				if (sstr === estr) {
					return `<div class="statusDiv jxz">进行中</div>`
				} else if (s < e) {
					return `<div class="statusDiv jjks">即将开始</div>`
				} else if (s > e) {
					return `<div class="statusDiv yjs">已结束</div>`
				}
			},
			parseTime(time, cFormat) {
				return utils.parseTime(time, cFormat);
			},
			openUrl(url) {
				var tempPage = window.open("", "_blank");
				tempPage.location = url;
			}
		}
	};
</script>

<style lang="less" scoped>
	/deep/ .ant-spin-text {
		color: #004930;
	}

	.zwzx {
		.banner {
			background: url("/img/banner15.png") no-repeat center center;
			background-size: cover;
			height: 500px;
			text-align: center;
			position: relative;
		}

		.cont {
			width: 1200px;
			margin: auto;

			.list {
				margin-bottom: 50px;

				.item {
					margin-top: 60px;

					.itemTitleCont {
						display: flex;

						.line {
							width: 4px;
							height: 40px;
							background-color: #004930;
						}

						.itemTitle {
							padding-left: 10px;
							font-size: 28px;
							font-weight: 700;
							color: #004930;
							line-height: 40px;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							display: -webkit-box;
							flex: 1;
						}

						.downfile {
							width: 190px;
							text-align: center;
							font-size: 16px;
							font-weight: 700;
							color: #16543e;
							line-height: 40px;
							border: solid 2px #004930;
							cursor: pointer;
						}
					}

					.intro {
						padding-left: 15px;
						padding-top: 15px;
						padding-bottom: 15px;
						font-size: 20px;
						font-weight: normal;
						color: #2e2e2e;
						// line-height: 40px;
						// text-overflow: ellipsis;
						// -webkit-box-orient: vertical;
						// -webkit-line-clamp: 2;
						// overflow: hidden;
						// display: -webkit-box;
					}

					.tableCont {
						padding-left: 15px;

						table {
							width: 100%;

							thead {
								background-color: #E5ECEA;

								th {
									height: 40px;
									font-size: 20px;
									font-weight: 400;
									color: #2e2e2e;
									text-align: center;
								}
							}

							tbody {
								background-color: #f8f8f8;

								tr>td {
									height: 85px;
									text-align: center;

									/deep/ .statusDiv {
										width: 110px;
										height: 36px;
										text-align: center;
										font-size: 16px;
										font-weight: 400;
										color: #ffffff;
										line-height: 36px;
										margin: auto;

										&.jjks {
											background-color: #f4a100;
										}

										&.jxz {
											background-color: #00744c;
										}

										&.yjs {
											background-color: #9b9b9b;
										}
									}
								}
							}
						}
					}

				}
			}
		}
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
