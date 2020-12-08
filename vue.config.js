const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("babel-polyfill");
module.exports = {
	pages: {
		admin: {
			// page 的入口
			entry: 'src/pages/admin/main.js',
			// 模板来源
			template: 'public/admin.html',
			// 在 dist/index.html 的输出
			filename: 'admin/index.html'
		},
		pc: {
			// page 的入口
			entry: 'src/pages/pc/main.js',
			// 模板来源
			template: 'public/pc.html',
			// 在 dist/index.html 的输出
			filename: 'index.html'
		},
		mobile: {
			// page 的入口
			entry: 'src/pages/mobile/main.js',
			// 模板来源
			template: 'public/mobile.html',
			// 在 dist/index.html 的输出
			filename: 'mobile/index.html'
		}
	},
	lintOnSave: false, //关闭eslint
	devServer: {
		// sockHost: 'http://47.92.237.225:1111/',
		host: "0.0.0.0", //不清楚主机和目的网络
		port: 8091, // 源地址端口，自行修改
		disableHostCheck: true,
		hotOnly: false,
		useLocalIp: false
	},
	configureWebpack: {
		output: {
			// 输出重构  打包编译后的 文件名称  【模块名称.版本号】
			filename: `js/[name].${process.env.VUE_APP_Version}.js`,
			chunkFilename: `js/[name].${process.env.VUE_APP_Version}.js`
		},
		plugins: [
			// eslint-disable-next-line no-undef
			new MiniCssExtractPlugin({
				// 修改打包后css文件名
				filename: `css/[name].${process.env.VUE_APP_Version}.css`,
				chunkFilename: `css/[name].${process.env.VUE_APP_Version}.css`
			})
		]
	}
}
