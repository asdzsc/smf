<template>
<<<<<<< HEAD
  <a-drawer
    :title="title"
    width="75%"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <a-form-model
      :model="model"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="商品栏目">
        <a-tree-select
          v-model="model.columnIds"
          style="width: 600px"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          placeholder="请选择商品栏目"
          tree-default-expand-all
          allow-clear
          multiple
          @change="changeColumn"
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="商品类别">
        <a-select
          style="width: 200px"
          v-model="model.goodsTypeKey"
          labelInValue
          placeholder="请选择商品类别"
          @change="changeGoodsType"
        >
          <a-select-option
            v-for="item in goodsTypeList"
            :key="item.key"
            :value="item.key"
          >
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="商品名称">
        <a-input
          v-model="model.title"
          placeholder="请输入商品名称"
          style="width: 600px"
        />
      </a-form-model-item>
      <a-form-model-item label="子标题">
        <a-input
          v-model="model.subtitle"
          placeholder="请输入子标题"
          style="width: 600px"
        />
      </a-form-model-item>

      <a-form-model-item label="封面图" class="formItemAvatar">
        <avatarUpload ref="coverUpload" @change="uploadCover"></avatarUpload>
        <!-- <div class="remark">
          直播视频封面为直播未开始或暂停时显示的宣传页，推荐尺寸为：9：16，支持JPG、PNG格式，图片大小不超过4M
        </div> -->
      </a-form-model-item>
      <a-form-model-item label="商品图片" class="formItemAvatar">
        <imgsUpload ref="imgsUpload"></imgsUpload>
      </a-form-model-item>

      <a-form-model-item label="是否置顶">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          :checked="model.isTop === '1' ? true : false"
          @change="setIsTop()"
        />
      </a-form-model-item>
      <a-form-model-item label="排序">
        <a-input-number :min="0" v-model="model.sortId" />
      </a-form-model-item>
      <a-form-model-item label="状态">
        <a-select
          style="width: 200px"
          v-model="model.statusKey"
          labelInValue
          placeholder="请选择商品状态"
          @change="changeStatus"
        >
          <a-select-option
            v-for="item in statusList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="多规格商品">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          :disabled="model.goodsType === '3' || model.goodsType === '4'"
          :checked="model.isSpec === '1' ? true : false"
          @change="setIsSpec()"
        />
      </a-form-model-item>

      <!-- 商品价格 -->
      <a-row v-if="model.isSpec === '0'" class="form-row" type="flex">
        <a-col class="ant-form-item-label">
          <label>销售价格</label>
        </a-col>
        <a-col span="5" class="form-wrapper">
          <a-input-number
            v-model="model.price"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
            style="width: 120px"
          />
        </a-col>
        <a-col class="ant-form-item-label">
          <label>商品原价</label>
        </a-col>
        <a-col span="" class="form-wrapper">
          <a-input-number
            v-model="model.originalPrice"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
            style="width: 120px"
          />
        </a-col>
      </a-row>
      <a-row v-else class="form-row" type="flex">
        <a-col class="ant-form-item-label">
          <label>销售价格</label>
        </a-col>
        <a-col span="5" class="form-wrapper">
          <a-input-number
            disabled
            v-model="model.minPrice"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
            style="width: 120px"
          />
          ~
          <a-input-number
            disabled
            v-model="model.maxPrice"
            :formatter="
              (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
            style="width: 120px"
          />
        </a-col>
      </a-row>

      <a-form-model-item v-if="model.goodsType === '4'" label="续费时长">
        <a-input-number v-model="model.renewDay" style="width: 120px" />&nbsp;
        天
      </a-form-model-item>

      <a-form-model-item label="商品库存">
        <a-input-number
          :disabled="model.isSpec === '1'"
          v-model="model.inventory"
          style="width: 120px"
        />
      </a-form-model-item>

      <a-form-model-item v-if="model.isSpec === '1'" label="商品规格">
        <infoSpec ref="infoSpec" @update="updateSpec"></infoSpec>
      </a-form-model-item>

      <a-form-model-item label="商品简介">
        <a-textarea
          v-model="model.intro"
          placeholder="请输入商品简介"
          :rows="5"
          style="width: 600px"
        />
      </a-form-model-item>

      <a-form-model-item label="商品介绍">
        <script
          id="goodsEditor"
          type="text/plain"
          style="width: 100%; height: 500px"
        ></script>
      </a-form-model-item>
    </a-form-model>
    <div style="height: 50px"></div>
    <div class="submit-cont">
      <a-button type="primary" @click="onSubmit">确定</a-button>
      <a-button @click="onClose" style="margin-left: 10px">取消</a-button>
    </div>
  </a-drawer>
</template>
<script>
import { getGoodsColumnList } from "@/pages/admin/api/shop/goodscolumn";
import { getGoodsInfo, saveGoodsInfo } from "@/pages/admin/api/shop/goods";
import * as utils from "@/pages/admin/libs/utils";
import * as dictionary from "@/comment/dictionary";
// import moment from "moment";

export default {
  name: "goodsInfo",
  components: {
    avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload"),
    imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
    infoSpec: () =>
      import("@/pages/admin/views/shop/goods/components/info-spec"),
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      title: "",
      treeData: [],
      statusList: [
        {
          id: "1",
          name: "上架",
        },
        {
          id: "2",
          name: "下架",
        },
      ],
      model: {
        id: "",
        goodsType: "1", //1商城商品 2服务商品
        goodsTypeKey: {
          key: "1",
        },
        title: "",
        subtitle: "",
        columnIds: [],
        goodsCode: "", //商品编码
        tags: [], //标签
        cover: "", //封面图
        phoneCover: "", //手机端封面图
        imgs: [], //商品展示图
        imgsList: [],
        originalPrice: 0, //原价
        price: 0, //销售价格
        minPrice: 0, //多规格最低价格
        maxPrice: 0, //多规格最高价格
        isSpec: "0", //有无规格 0无 1有
        freightType: "0", //运费类别 0统一运费
        freightId: "", //运费模版id
        freight: 0, //运费
        status: "1", //状态 0待上架  1上架（默认） 2下架
        statusKey: {
          key: "1",
        },
        inventory: 0, //库存
        sales: 0, //销量
        isTop: "0", //是否置顶
        intro: "", //商品简介
        cont: "", //商品介绍
        sortId: 0, // 排序
        renewDay: 0, //续费时长
      },
      specNameList: [], //规格名称
      specValList: [], //规格商品
      ue: null,
    };
  },
  computed: {
    goodsTypeList() {
      return dictionary.goodsTypeList();
    },
  },
  watch: {
    "model.goodsType": {
      handler() {
        if (this.model.goodsType === "3") {
          //模版页面
          this.model.isSpec = "0";
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.visible = true;
    this.title = this.id === "" ? "添加商品" : "编辑商品";
    this.getColumnList();
    this.loadData();
  },
  methods: {
    getColumnList() {
      getGoodsColumnList({
        columnType: "1",
        status: "0",
      }).then((res) => {
        if (res.code === 0) {
          this.treeData = res.data.treeData;
        }
      });
    },
    loadData() {
      if (this.id) {
        this.model.id = this.id;
        getGoodsInfo({
          id: this.model.id,
        }).then((res) => {
          if (res.code === 0) {
            Object.assign(this.model, res.data.shopGoods);
            this.model.goodsTypeKey = {
              key: this.model.goodsType,
            };
            this.model.statusKey = {
              key: this.model.status,
            };

            this.specNameList = res.data.specNameList;
            this.specValList = res.data.specValList;
            this.$nextTick(() => {
              setTimeout(() => {
                try {
                  this.$refs.infoSpec.setData(res.data);
                  // eslint-disable-next-line no-empty
                } catch (e) {}
              }, 200);
            });
          }
          this.bindData();
        });
      } else {
        this.bindData();
      }
    },
    bindData() {
      var vm = this;
      vm.model.cont = vm.model.cont || "";
      this.$nextTick(() => {
        setTimeout(() => {
          window.UE.delEditor("goodsEditor");
          this.ue = window.UE.getEditor("goodsEditor");
          this.ue.addListener("ready", function () {
            vm.ue.setContent(vm.model.cont);
          });

          //商品图片
          this.model.imgsList = [];
          if (this.model.imgs) {
            this.model.imgs.forEach((img) => {
              var uid = utils.getId();
              this.model.imgsList.push({
                uid: uid,
                name: uid + ".jpg",
                status: "done",
                imgUrl: img,
                url: process.env.VUE_APP_BASE_URL + img,
              });
            });
          }

          this.$refs.coverUpload.loadData(this.model.cover);
          this.$refs.imgsUpload.setFileList(this.model.imgsList);
        }, 200);
      });
    },
    // eslint-disable-next-line no-unused-vars
    changeColumn(value, label, extra) {
      this.model.columnIds = value;
    },
    //商品类别
    changeGoodsType(value, label, extra) {
      this.model.goodsType = value.key;
    },
    uploadCover(imgUrl) {
      this.model.cover = imgUrl;
    },
    setIsTop() {
      this.model.isTop = this.model.isTop === "0" ? "1" : "0";
    },
    // eslint-disable-next-line no-unused-vars
    changeStatus(value, option) {
      this.model.status = value.key;
    },
    setIsSpec() {
      this.model.isSpec = this.model.isSpec === "0" ? "1" : "0";
    },
    //多规格数据更新
    updateSpec(data) {
      this.specNameList = data.specNameList;
      this.specValList = data.specValList;
      var inventory = 0;
      var priceList = data.specValList.map((x) => {
        inventory += x.inventory;
        return x.price;
      });
      this.model.inventory = inventory;
      this.model.minPrice = Math.min.apply(Math, priceList);
      this.model.maxPrice = Math.max.apply(Math, priceList);
      this.model.price = this.model.minPrice;
    },
    onSubmit() {
      if (this.model.isSpec === "1") {
        //多规格
        var specData = this.$refs.infoSpec.getData();
        this.updateSpec(specData);
      }
      var fileList = this.$refs.imgsUpload.getFileList();
      this.model.imgs = fileList.map((x) => {
        return x.imgUrl;
      });

      this.model.cont = this.ue.getContent();
      var data = {
        shopGoods: this.model,
        specNameList: this.specNameList,
        specValList: this.specValList,
      };
      saveGoodsInfo(data).then((res) => {
        if (res.code === 0) {
          this.$message.success("数据提交成功");
          this.onClose(res);
        }
      });
    },
    onClose(res) {
      this.visible = false;
      this.$emit("onClose", res);
    },
  },
};
</script>

<style lang="less" scoped>
.form-row {
  margin-bottom: 24px;

  .form-wrapper {
    line-height: 39.999px;
  }
}

/deep/ .ant-form-item-label {
  width: 150px;
}

.formItemAvatar {
  /deep/ .ant-form-item-control {
    line-height: 0px;
  }
}

.remark {
  color: #ccc;
  font-size: 12px;
}

.submit-cont {
  position: fixed;
  bottom: 10px;
  background-color: #ffffff;
  z-index: 9999;
  width: 71%;
  border: 1px solid #eeeeee;
  text-align: center;
  padding: 10px;
}
=======
	<a-drawer :title="title" width="75%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item label="商品栏目">
				<a-tree-select v-model="model.columnIds" style="width: 600px;" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
				 :tree-data="treeData" placeholder="请选择商品栏目" tree-default-expand-all allow-clear multiple @change="changeColumn">
				</a-tree-select>
			</a-form-model-item>
			<a-form-model-item label="商品类别">
				<a-select style="width:200px;" v-model="model.goodsTypeKey" labelInValue placeholder="请选择商品类别" @change="changeGoodsType">
					<a-select-option v-for="item in goodsTypeList" :key="item.key" :value="item.key">
						{{ item.text }}
					</a-select-option>
				</a-select>
			</a-form-model-item>

			<a-form-model-item label="商品名称">
				<a-input v-model="model.title" placeholder="请输入商品名称" style="width:600px;" />
			</a-form-model-item>
			<a-form-model-item label="子标题">
				<a-input v-model="model.subtitle" placeholder="请输入子标题" style="width:600px;" />
			</a-form-model-item>

			<a-form-model-item label="封面图" class="formItemAvatar">
				<avatarUpload ref="coverUpload" @change="uploadCover"></avatarUpload>
				<!-- <div class="remark">
          直播视频封面为直播未开始或暂停时显示的宣传页，推荐尺寸为：9：16，支持JPG、PNG格式，图片大小不超过4M
        </div> -->
			</a-form-model-item>
			<a-form-model-item label="商品图片" class="formItemAvatar">
				<imgsUpload ref="imgsUpload"></imgsUpload>
			</a-form-model-item>

			<a-form-model-item label="是否置顶">
				<a-switch checkedChildren="是" unCheckedChildren="否" :checked="model.isTop === '1' ? true : false" @change="setIsTop()" />
			</a-form-model-item>
			<a-form-model-item label="排序">
				<a-input-number :min="0" v-model="model.sortId" />
			</a-form-model-item>
			<a-form-model-item label="状态">
				<a-select style="width:200px;" v-model="model.statusKey" labelInValue placeholder="请选择商品状态" @change="changeStatus">
					<a-select-option v-for="item in statusList" :key="item.id" :value="item.id">
						{{ item.name }}
					</a-select-option>
				</a-select>
			</a-form-model-item>

			<a-form-model-item label="多规格商品">
				<a-switch checkedChildren="是" unCheckedChildren="否" :disabled="model.goodsType === '3'" :checked="model.isSpec === '1' ? true : false"
				 @change="setIsSpec()" />
			</a-form-model-item>

			<!-- 商品价格 -->
			<a-row v-if="model.isSpec === '0'" class="form-row" type="flex">
				<a-col class="ant-form-item-label">
					<label>销售价格</label>
				</a-col>
				<a-col span="5" class="form-wrapper">
					<a-input-number v-model="model.price" :formatter="
              value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
					 :parser="value => value.replace(/\￥\s?|(,*)/g, '')" style="width:120px;" />
				</a-col>
				<a-col class="ant-form-item-label">
					<label>商品原价</label>
				</a-col>
				<a-col span="" class="form-wrapper">
					<a-input-number v-model="model.originalPrice" :formatter="
              value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
					 :parser="value => value.replace(/\￥\s?|(,*)/g, '')" style="width:120px;" />
				</a-col>
			</a-row>
			<a-row v-else class="form-row" type="flex">
				<a-col class="ant-form-item-label">
					<label>销售价格</label>
				</a-col>
				<a-col span="5" class="form-wrapper">
					<a-input-number disabled v-model="model.minPrice" :formatter="
              value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
					 :parser="value => value.replace(/\￥\s?|(,*)/g, '')" style="width:120px;" />
					~
					<a-input-number disabled v-model="model.maxPrice" :formatter="
              value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
					 :parser="value => value.replace(/\￥\s?|(,*)/g, '')" style="width:120px;" />
				</a-col>
			</a-row>

			<a-form-model-item label="商品库存">
				<a-input-number :disabled="model.isSpec === '1'" v-model="model.inventory" style="width:120px;" />
			</a-form-model-item>

			<a-form-model-item v-if="model.isSpec === '1'" label="商品规格">
				<infoSpec ref="infoSpec" @update="updateSpec"></infoSpec>
			</a-form-model-item>

			<a-form-model-item label="商品简介">
				<a-textarea v-model="model.intro" placeholder="请输入商品简介" :rows="5" style="width:600px;" />
			</a-form-model-item>

			<a-form-model-item label="商品介绍">
				<script id="goodsEditor" type="text/plain" style="width:100%;height:500px;"></script>
			</a-form-model-item>
		</a-form-model>
		<div style="height:50px;"></div>
		<div class="submit-cont">
			<a-button type="primary" @click="onSubmit">确定</a-button>
			<a-button @click="onClose" style="margin-left: 10px;">取消</a-button>
		</div>
	</a-drawer>
</template>
<script>
	import {
		getGoodsColumnList
	} from "@/pages/admin/api/shop/goodscolumn";
	import {
		getGoodsInfo,
		saveGoodsInfo
	} from "@/pages/admin/api/shop/goods";
	import * as utils from "@/pages/admin/libs/utils";
	import * as dictionary from "@/comment/dictionary";
	// import moment from "moment";

	export default {
		name: "goodsInfo",
		components: {
			avatarUpload: () => import("@/pages/admin/components/upload/avatar-upload"),
			imgsUpload: () => import("@/pages/admin/components/upload/imgs-upload"),
			infoSpec: () => import("@/pages/admin/views/shop/goods/components/info-spec")
		},
		props: {
			id: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				visible: false,
				title: "",
				treeData: [],
				statusList: [{
						id: "1",
						name: "上架"
					},
					{
						id: "2",
						name: "下架"
					}
				],
				model: {
					id: "",
					goodsType: "1", //1商城商品 2服务商品
					goodsTypeKey: {
						key: '1'
					},
					title: "",
					subtitle: "",
					columnIds: [],
					goodsCode: "", //商品编码
					tags: [], //标签
					cover: "", //封面图
					phoneCover: "", //手机端封面图
					imgs: [], //商品展示图
					imgsList: [],
					originalPrice: 0, //原价
					price: 0, //销售价格
					minPrice: 0, //多规格最低价格
					maxPrice: 0, //多规格最高价格
					isSpec: "0", //有无规格 0无 1有
					freightType: "0", //运费类别 0统一运费
					freightId: "", //运费模版id
					freight: 0, //运费
					status: "1", //状态 0待上架  1上架（默认） 2下架
					statusKey: {
						key: "1"
					},
					inventory: 0, //库存
					sales: 0, //销量
					isTop: "0", //是否置顶
					intro: "", //商品简介
					cont: "", //商品介绍
					sortId: 0 // 排序
				},
				specNameList: [], //规格名称
				specValList: [], //规格商品
				ue: null
			};
		},
		computed: {
			goodsTypeList() {
				return dictionary.goodsTypeList();
			}
		},
		watch: {
			'model.goodsType': {
				handler() {
					if (this.model.goodsType === "3") {
						//模版页面
						this.model.isSpec = "0"
					}
				},
				deep: true
			}
		},
		mounted() {
			this.visible = true;
			this.title = this.id === "" ? "添加商品" : "编辑商品";
			this.getColumnList();
			this.loadData();
		},
		methods: {
			getColumnList() {
				getGoodsColumnList({
					columnType: "1",
					status: "0"
				}).then(res => {
					if (res.code === 0) {
						this.treeData = res.data.treeData;
					}
				});
			},
			loadData() {
				if (this.id) {
					this.model.id = this.id;
					getGoodsInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data.shopGoods);
							this.model.goodsTypeKey = {
								key: this.model.goodsType
							};
							this.model.statusKey = {
								key: this.model.status
							};

							this.specNameList = res.data.specNameList;
							this.specValList = res.data.specValList;
							this.$nextTick(() => {
								setTimeout(() => {
									try {
										this.$refs.infoSpec.setData(res.data);
										// eslint-disable-next-line no-empty
									} catch (e) {}
								}, 200);
							});
						}
						this.bindData();
					});
				} else {
					this.bindData();
				}
			},
			bindData() {
				var vm = this;
				vm.model.cont = vm.model.cont || "";
				this.$nextTick(() => {
					setTimeout(() => {
						window.UE.delEditor("goodsEditor");
						this.ue = window.UE.getEditor("goodsEditor");
						this.ue.addListener("ready", function() {
							vm.ue.setContent(vm.model.cont);
						});

						//商品图片
						this.model.imgsList = [];
						if (this.model.imgs) {
							this.model.imgs.forEach(img => {
								var uid = utils.getId();
								this.model.imgsList.push({
									uid: uid,
									name: uid + ".jpg",
									status: "done",
									imgUrl: img,
									url: process.env.VUE_APP_BASE_URL + img
								});
							});
						}

						this.$refs.coverUpload.loadData(this.model.cover);
						this.$refs.imgsUpload.setFileList(this.model.imgsList);
					}, 200);
				});
			},
			// eslint-disable-next-line no-unused-vars
			changeColumn(value, label, extra) {
				this.model.columnIds = value;
			},
			//商品类别
			changeGoodsType(value, label, extra) {
				this.model.goodsType = value.key;
			},
			uploadCover(imgUrl) {
				this.model.cover = imgUrl;
			},
			setIsTop() {
				this.model.isTop = this.model.isTop === "0" ? "1" : "0";
			},
			// eslint-disable-next-line no-unused-vars
			changeStatus(value, option) {
				this.model.status = value.key;
			},
			setIsSpec() {
				this.model.isSpec = this.model.isSpec === "0" ? "1" : "0";
			},
			//多规格数据更新
			updateSpec(data) {
				this.specNameList = data.specNameList;
				this.specValList = data.specValList;
				var inventory = 0;
				var priceList = data.specValList.map(x => {
					inventory += x.inventory;
					return x.price;
				});
				this.model.inventory = inventory;
				this.model.minPrice = Math.min.apply(Math, priceList);
				this.model.maxPrice = Math.max.apply(Math, priceList);
				this.model.price = this.model.minPrice;
			},
			onSubmit() {
				if (this.model.isSpec === "1") {
					//多规格
					var specData = this.$refs.infoSpec.getData();
					this.updateSpec(specData);
				}
				var fileList = this.$refs.imgsUpload.getFileList();
				this.model.imgs = fileList.map(x => {
					return x.imgUrl;
				});

				this.model.cont = this.ue.getContent();
				var data = {
					shopGoods: this.model,
					specNameList: this.specNameList,
					specValList: this.specValList
				};
				saveGoodsInfo(data).then(res => {
					if (res.code === 0) {
						this.$message.success("数据提交成功");
						this.onClose(res);
					}
				});
			},
			onClose(res) {
				this.visible = false;
				this.$emit("onClose", res);
			}
		}
	};
</script>

<style lang="less" scoped>
	.form-row {
		margin-bottom: 24px;

		.form-wrapper {
			line-height: 39.999px;
		}
	}

	/deep/ .ant-form-item-label {
		width: 150px;
	}

	.formItemAvatar {
		/deep/ .ant-form-item-control {
			line-height: 0px;
		}
	}

	.remark {
		color: #ccc;
		font-size: 12px;
	}

	.submit-cont {
		position: fixed;
		bottom: 10px;
		background-color: #ffffff;
		z-index: 9999;
		width: 71%;
		border: 1px solid #eeeeee;
		text-align: center;
		padding: 10px;
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
</style>
