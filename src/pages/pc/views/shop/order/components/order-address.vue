<template>
  <div class="contItem">
    <a-row>
      <a-col class="contTitle" span="12">
        服务墓址
      </a-col>
      <a-col @click="showAddressInfo" class="addAddress" span="12">
        +新增服务墓址
      </a-col>
    </a-row>
    <div class="contInfo">
      <a-row
        v-for="item in list"
        :key="item.id"
        class="addressItem"
        type="flex"
      >
        <a-col>
          <div
            @click="setCheck(item)"
            class="itemDiv"
            :class="{ check: item.check }"
          >
            {{ item.bpname }}
            <img class="ok" src="/img/check1.png" />
          </div>
        </a-col>
        <a-col flex="auto">
          <a-row class="address" type="flex" style="width: 400px;">
            <a-col flex="310px" class="cemeaddress">{{
              item.cemeaddress
            }}</a-col>
            <a-col flex="90px" class="defBtnCont">
              <div v-if="item.isCheck === '1'" class="defBtn">
                默认墓址
              </div>
              <div v-else @click="saveIsCheck(item)" class="defBtn2">
                设为默认
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div v-if="!finished" @click="_cemeteryList()" class="moreBtn">
        更多墓址
        <a-icon type="down" />
      </div>
      <a-empty v-if="list.length === 0" />
    </div>

    <cemeteryInfo
      v-if="showInfo"
      ref="info"
      @onClose="closeInfo"
    ></cemeteryInfo>
  </div>
</template>

<script>
import { cemeteryList, saveCemetery } from "@/pages/pc/api/user";
export default {
  components: {
    cemeteryInfo: () => import("@/pages/pc/views/shop/order/components/cemetery-info.vue")
  },
  data() {
    return {
      finished: false,
      model: {
        current: 0,
        pageSize: 3
      },
      list: [],
      showInfo: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.finished = false;
      this.model.current = 0;
      this.list = [];
      this._cemeteryList();
    },
    _cemeteryList() {
      if (!this.finished) {
        this.model.current++;
        cemeteryList(this.model).then(res => {
          if (res.code === 0) {
            res.data.list.forEach(x => {
              if (x.isCheck === "1") {
                this.$set(x, "check", true);
              } else {
                this.$set(x, "check", false);
              }
              this.list.push(x);
            });

            if (res.data.isLastPage) {
              this.finished = true;
            }
          }
        });
      }
    },
    showAddressInfo() {
      this.showInfo = true;
    },
    closeInfo(res) {
      this.showInfo = false;
      if (res) {
        this.loadData();
      }
    },
    saveIsCheck(item) {
      item.isCheck = "1";
      saveCemetery(item).then(res => {
        if (res.code === 0) {
          this.$message.success("设置成功");
          this.loadData();
        } else {
          item.isCheck = "0";
        }
      });
    },
    setCheck(item) {
      this.list.forEach(x => {
        x.check = false;
      });
      item.check = true;
    },
    //获取数据
    getData() {
      var query = this.list.filter(x => x.check);
      if (query.length > 0) {
        return query[0];
      } else {
        this.$notification.error({
          message: "提示",
          description: "请选择服务墓址"
        });
        return null;
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .address {
  font-size: 14px;
  line-height: 40px;
  font-weight: 400;
  color: #333333;

  .defBtnCont {
    padding-top: 6px;
    padding-left: 20px;

    .defBtn {
      width: 70px;
      height: 24px;
      line-height: 24px;
      background-color: #ebebeb;
      text-align: center;
    }

    .defBtn2 {
      width: 70px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: #004930;
      }
    }
  }
}

.contItem {
  .moreBtn {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: #333333;
    cursor: pointer;

    .anticon {
      font-size: 12px;
    }
  }

  .contTitle {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
  }

  .addAddress {
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    color: #004930;
    cursor: pointer;
  }

  .contInfo {
    padding: 20px 0px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    border-bottom: solid 1px #cccccc;

    .addressItem {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;

      .itemDiv {
        width: 140px;
        height: 40px;
        border: solid 2px #cccccc;
        position: relative;
        margin-right: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 35px;
        color: #333333;
        cursor: pointer;

        .ok {
          position: absolute;
          right: 0px;
          bottom: 0px;
          display: none;
        }

        &:hover {
          border: solid 2px #004930;
        }

        &.check {
          border: solid 2px #004930;

          .ok {
            display: block;
          }
        }
      }

      .cemeaddress {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
