<template>
	<global-layout>
		<!-- <transition name="slide-left"> -->
		<router-view/>
		<!-- <keep-alive>
      <router-view />
    </keep-alive> -->
		<!-- </transition> -->
	</global-layout>
</template>

<script>
	export default {
		name: "MenuView",
		components: {
			globalLayout: () => import("@/pages/admin/layouts/GlobalLayout")
		},
		data() {
			return {};
		},
		computed: {
			key() {
				return this.$route.name ? this.$route.name + new Date() : this.$route + new Date();
			}
		},
		created() {},
		watch: {},
		methods: {}
	};
</script>

<style lang="less" scoped></style>
