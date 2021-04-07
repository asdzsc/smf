<template>
	<a-drawer :title="title" width="50%" placement="right" :closable="false" @close="onClose" :visible="visible">
		<a-form-model :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-model-item label="上级部门">
				<a-tree-select style="width: 100%" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" :treeData="treeData"
				 placeholder="请选择上级部门" v-model="model.pid">
				</a-tree-select>
			</a-form-model-item>
			<a-form-model-item label="部门名称">
				<a-input v-model="model.name" placeholder="请输入部门名称" />
			</a-form-model-item>
			<a-form-model-item label="排序">
				<a-input-number :min="0" v-model="model.sortId" />
			</a-form-model-item>

			<a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">
					确定
				</a-button>
				<a-button @click="onClose" style="margin-left: 10px;">
					取消
				</a-button>
			</a-form-model-item>
		</a-form-model>
	</a-drawer>
</template>

<script>
	import {
		getSysDeptList,
		getSysDeptInfo,
		saveSysDeptInfo
	} from "@/pages/admin/api/sys/sysdept";

	export default {
		name: "module-info",
		props: {
			id: {
				type: String,
				default () {
					return ''
				}
			},
			pid: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				visible: false,
				title: "",
				model: {
					id: "",
					pid: "0",
					name: "",
					sortId: 0,
					deptType: '1' //部门类型
				},
				treeData: []
			};
		},
		components: {},
		activated() {},
		mounted() {
			this.visible = true;
			this.getDeptList();

			this.title = this.id ? '编辑部门' : '添加部门'
			this.model.id = this.id
			this.loadData()
		},
		methods: {
			getDeptList() {
				getSysDeptList().then(res => {
					if (res.code === 0) {
						this.treeData = res.data.treeData;
						this.treeData.splice(0, 0, {
							id: "0",
							key: "0",
							value: "0",
							pid: "-1",
							title: "顶级部门",
							name: "顶级部门"
						});
					}
				});
			},
			loadData() {
				if (this.model.id) {
					getSysDeptInfo({
						id: this.model.id
					}).then(res => {
						if (res.code === 0) {
							Object.assign(this.model, res.data);
						}
					});
				} else {
					this.model.pid = this.pid
				}
			},
			onSubmit() {
				saveSysDeptInfo(this.model).then(res => {
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

<style lang="less" scoped></style>
