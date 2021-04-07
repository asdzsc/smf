<template>
  <div class="wrap">
    <memberTabs ref="memberTabs"></memberTabs>
    <div class="btn">
      <div class="div" @click="add">新增相册</div>
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

      <!-- <div class="btnWrap">
        <van-checkbox
          v-model="checkAll"
          @change="changeCheckAll"
          icon-size=".31rem"
          checked-color="#004930"
          ><span style="padding-left:.3rem;">全选</span></van-checkbox
        >
        <div class="btn">
          <van-button @click="delAll" size="small" icon="delete-o" type="danger"
            >批量删除</van-button
          >
          <van-button
            @click="add"
            icon="plus"
            size="small"
            style="background:#004930;"
            type="primary"
            >新增</van-button
          >
        </div>
      </div> -->
      <!-- <transition name="right-slide">
        <van-row>
          <van-col span="24">
            <van-search
              v-model="model.searchText"
              ref="searchInput"
              placeholder="关键字搜索"
              show-action
              @search="search()"
              @cancel="closeSearch()"
            />
          </van-col>
        </van-row>
      </transition> -->
      <div class="cont">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template v-if="model.list.length > 0">
            <div class="item" v-for="(item, index) in model.list" :key="index">
              <!-- <div class="check">
                <van-checkbox
                  v-model="item.check"
                  icon-size=".31rem"
                  checked-color="#004930"
                ></van-checkbox>
              </div> -->
              <div class="itemRight">
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">照片</p>
                    <p class="width">
                      <img
                        @click="showImg(index)"
                        :src="baseUrl + item.url"
                        :onerror="defImg"
                        alt=""
                      />
                    </p>
                  </div>
                </div>
                <div class="boxWrap">
                  <div class="divBox">
                    <p class="color">标题</p>
                    <p class="width">
                      {{ item.title }}
                    </p>
                  </div>
                </div>
                <div class="boxWrap">
                  <div class="divBox" style="border-bottom: 1px solid #dcdcdc">
                    <p class="color">创建日期</p>
                    <p class="width">
                      {{ item.createDate.substring(0, 10) }}
                    </p>
                  </div>
                </div>
                <div class="btnBox">
                  <van-button
                    icon="plus"
                    size="small"
                    style="background: #004930; border: none"
                    type="primary"
                    @click="edit(item.id)"
                    >操作</van-button
                  >
                  <van-button
                    size="small"
                    style="margin-right: 0.2rem"
                    icon="delete-o"
                    type="danger"
                    @click="del([item.id])"
                    >删除</van-button
                  >
                </div>
              </div>
            </div>
          </template>
          <!-- <template>
            <van-action-sheet v-model="showEdit">
              <p style="width:100%" @click="edit">
                <van-icon name="edit" /><span>编辑</span>
              </p>
              <p style="width:100%" @click="del([infoId])">
                <van-icon name="delete-o" /><span>删除</span>
              </p>
            </van-action-sheet></template
          > -->
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
import { memoryMediaList, delMemoryMedia } from "@/pages/mobile/api/mark.js";
import { ImagePreview, Dialog } from "vant";
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
        mediaType: "image", //附件类型
        isPage: true, //是否分页
        list: [],
        current: 1,
        pageSize: 5,
      },
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this._memoryMediaList();
  },
  methods: {
    // showSheet(item) {
    //   this.showEdit = true;
    //   this.infoId = item.id;
    // },
    onLoad() {
      this._memoryMediaList();
    },
    //全选
    // changeCheckAll() {
    //   this.model.list.forEach((v) => {
    //     v.check = this.checkAll;
    //   });
    // },
    _memoryMediaList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.loading = true;
      memoryMediaList(this.model).then((res) => {
        this.$toast.clear();
        this.loading = false;
        if (res.code === 0) {
          const results = res.data.list;
          this.model.list.push(...results);
          // this.model.list.forEach((x) => {
          //   this.$set(x, "check", false);
          // });
          if (res.data.hasNextPage) {
            this.model.current++;
          } else {
            this.finished = true;
          }
        }
      });
    },
    //批量删除
    // delAll() {
    //   let res = this.model.list.filter((i) => {
    //     if (i.check) {
    //       return i;
    //     } else {
    //       this.$notify({
    //         type: "warning",
    //         message: "请选择需要删除的数据",
    //       });
    //     }
    //   });
    //   res.map((i) => {
    //     let list = [];
    //     list.push(i.id);
    //     this.del(list);
    //   });
    // },
    del(list) {
      Dialog.confirm({
        title: "确认删除图片吗",
        message: "",
      })
        .then(() => {
          delMemoryMedia({
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
    // 搜索
    // openSearch() {
    //   this.isBtn = false;
    //   this.isSearch = true;
    //   this.$nextTick(() => {
    //     this.$refs.searchInput.focus();
    //   });
    // },
    search() {
      this.model.current = 1;
      this.model.list = [];
      this._memoryMediaList();
    },
    // closeSearch() {
    //   this.isSearch = false;
    //   this.model.searchText = "";
    //   this.isBtn = true;
    //   this.model.list = [];
    //   this._memoryMediaList();
    // },
    // 预览图片
    showImg(index) {
      let imgList = this.model.list.map((i) => {
        return this.baseUrl + (i.url ? i.url : i.cover);
      });
      ImagePreview(imgList, index);
    },
    add() {
      this.$router.push({
        path: "/member/grjnUser/showMediaAddImg",
        query: {
          memoryId: this.$route.query.id,
        },
      });
    },
    // 编辑相册
    edit(id) {
      this.$router.push({
        path: "/member/grjnUser/showMediaAddImg",
        query: {
          id: id,
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
