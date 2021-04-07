<template>
  <div class="wrap">
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="btn">
      <div class="div" @click="add">
        新增留言
      </div>
    </div>
    <div class="contWrap">
      <div class="formItem">
        <div class="label">搜索</div>
        <div class="inputCont">
          <input v-model="model.searchText" placeholder="填写关键字搜索" />
        </div>
      </div>
      <van-button @click="search" size="large" type="primary" color="#004930"
        ><span style="color: #fff">查询</span></van-button
      >
      <div class="cont">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template v-if="model.list.length > 0">
            <div class="item" v-for="(item, index) in model.list" :key="index">
              <div class="itemRight">
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">留言者</p>
                    <p class="width">
                      {{ item.nickname }}
                    </p>
                  </div>
                </div>
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">纪念者</p>
                    <p class="width">
                      {{ item.memoryName }}
                    </p>
                  </div>
                </div>
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">内容</p>
                    <p class="width">
                      {{ item.cont }}
                    </p>
                  </div>
                </div>
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">创建日期</p>
                    <p class="width">
                      {{ item.createDate.substring(0, 10) }}
                    </p>
                  </div>
                </div>
                <div class="btnBox">
                  <van-button
                    size="small"
                    icon="delete-o"
                    type="danger"
                    @click="del([item.id])"
                    >删除</van-button
                  >
                </div>
              </div>
            </div>
          </template>
          <template v-if="model.list.length === 0 && !loading">
            <div>
              <van-empty description="暂无数据" />
            </div>
          </template>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { memoryMsgList, delMemoryMsg } from "@/pages/mobile/api/mark.js";
import { Dialog } from "vant";
export default {
  components: {
    memberTabs: () =>
      import("@/pages/mobile/views/member/components/member-tabs.vue"),
  },
  data() {
    return {
      title: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      defImg: 'this.src="/img/zwtp.jpg"',
      checkAll: false,
      model: {
        memoryId: this.$route.query.id, //纪念馆id
        searchText: "",
        status: "",
        msgType: "1", //祭奠留言
        current: 1,
        pageSize: 5,
        list: [],
      },
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this._memoryMsgList();
  },
  methods: {
    onLoad() {
      this._memoryMsgList();
    },

    _memoryMsgList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      memoryMsgList(this.model).then((res) => {
        this.$toast.clear();
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
    },

    del(list) {
      Dialog.confirm({
        title: "确认删除留言吗",
        message: "",
      })
        .then(() => {
          delMemoryMsg({
            ids: list,
          }).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: "success",
                message: "已删除！",
              });
              this.$router.go(0);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    search() {
      this.model.current = 1;
      this.model.list = [];
      this._memoryMsgList();
    },
    add() {
      this.$router.push({
        path: "/member/grjnUser/showMsgAddMsg",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  p {
    margin-bottom: 0 !important;
  }
  /deep/ .van-action-sheet__content {
    p {
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;

      span {
        width: 20%;
        display: inline-block;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0rem;
    z-index: 2;
    width: 100%;
    padding: 0.25rem 0rem;
    background-color: rgba(241, 241, 241, 0.8);
    .div {
      opacity: 1;
      width: 4.46rem;
      height: 0.8rem;
      background-color: #00744c;
      border-radius: 0.4rem;
      margin: auto;
      font-size: 0.32rem;
      font-weight: 700;
      line-height: 0.8rem;
      letter-spacing: 4px;
      color: #ffffff;
      text-align: center;
    }
  }
  .contWrap {
    padding: 0.4rem;
    box-sizing: border-box;
    .formItem {
      padding-bottom: 0.3rem;

      .label {
        font-size: 0.3rem;
        font-weight: 700;
        color: #333333;
      }

      .inputCont {
        padding-top: 0.1rem;

        input {
          width: 6.1rem;
          height: 0.8rem;
          border: solid 0.02rem #e0e0e0;
          padding: 0rem 0.2rem;
          outline: none;
        }
      }

      .verifyCode {
        padding-top: 0.1rem;
        display: flex;

        input {
          flex: 1;
          height: 1.2rem;
          border: solid 0.02rem #e0e0e0;
          padding: 0rem 0.2rem;
          outline: none;
        }

        .codeImg {
          width: 1.6rem;
          height: 1.2rem;
          border: solid 1px #e0e0e0;
          border-left: 0px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .smsCodeBtn {
          width: 1.6rem;
          height: 1.2rem;
          background-color: #004930;
          text-align: center;
          line-height: 1.2rem;
          font-size: 0.26rem;
          font-weight: normal;
          color: #ffffff;
          cursor: pointer;

          &.disabled {
            background-color: #b0b0b0;
            cursor: not-allowed;
          }
        }
      }
    }

    .cont {
      .item {
        align-items: center;
        margin-top: 0.2rem;
        .itemRight {
          .boxWrap {
            width: 100%;
            border: 1px solid rgb(220, 220, 220);
            .divBox {
              display: flex;
              .van-button--primary {
                width: 100%;
              }
              p {
                display: block;
                height: 1.2rem;
                width: 25%;
                line-height: 1.2rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .color {
                background: #f5f5f5;
                color: #999999;
                text-align: center;
              }
              .width {
                width: 75%;
                padding-left: 0.2rem;
              }
              img {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
              }
            }
          }
          .btnBox {
            margin: 0.2rem 0;
            display: flex;
            flex-direction: row-reverse;
          }
        }
      }
    }
  }
}
</style>
