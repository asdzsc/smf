// 提供带 Content-Encoding 编码的压缩版的资源 开启gzip可以很大程度减少包的大小
const CompressionPlugin = require('compression-webpack-plugin')
    /** 
     * 将css单独打包成一个文件的插件，
     * 它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载。
     * 目前只有在webpack V4版本及以上才支持使用该插件
     * 和extract-text-webpack-plugin相比：
        异步加载
        无重复编译，性能有所提升
        用法简单
        支持css分割
     */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于兼容 ie9和一些低版本的高级浏览器对es6新语法并不支持
require("babel-polyfill");
module.exports = {
    pages: {
        admin: {
            // page 的入口
            entry: 'src/pages/admin/main.js',
            // 模板来源
            template: 'public/admin.html',
            // 在 dist/index.html 的输出
            filename: 'admin/index.html',
            chunks: [
                "admin", //注意：这个是页面名称的chunk,下面的chunk名称需要对呀splitChunk对应的名称
                "chunk-common" //这是admin和Index入口公用的chunk
            ]
        },
        pc: {
            // page 的入口
            entry: 'src/pages/pc/main.js',
            // 模板来源
            template: 'public/pc.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            chunks: [
                "pc", //注意：这个是页面名称的chunk,下面的chunk名称需要对呀splitChunk对应的名称
                "chunk-common" //这是admin和Index入口公用的chunk
            ]
        },
        mobile: {
            // page 的入口
            entry: 'src/pages/mobile/main.js',
            // 模板来源
            template: 'public/mobile.html',
            // 在 dist/index.html 的输出
            filename: 'mobile/index.html',
            chunks: [
                "mobile", //注意：这个是页面名称的chunk,下面的chunk名称需要对呀splitChunk对应的名称
                "chunk-common" //这是admin和Index入口公用的chunk
            ]
        }
    },
    productionSourceMap: false, //去掉.map文件 加速生产环境构建
    lintOnSave: false, //关闭eslint
    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        // sockHost: 'http://47.92.237.225:1111/',
        host: "0.0.0.0", //不清楚主机和目的网络 指定要使用的主机。如果您希望服务器可以从外部访问，请按以下方式指定它：
        port: 8099, // 源地址端口，自行修改
        disableHostCheck: true, // 绕过主机检查(不建议这样做，因为不检查主机的应用容易受到DNS重新绑定攻击的攻击)
        hotOnly: false, //启用热模块替换 无需页面刷新作为构建失败时的回退
        useLocalIp: false //使浏览器可以使用您的本地IP打开
    },
    // 接收一个基于 webpack-chain 的 ChainableConfig 实例
    chainWebpack: config => {
        // 删除默认的splitChunk
        config.optimization.delete("splitChunks");
    },
    // 通过 webpack-merge 合并到最终的配置中
    configureWebpack: {
        output: {
            // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
            filename: `js/[name].${process.env.VUE_APP_Version}.js`
                // chunkFilename: `js/[name].${process.env.VUE_APP_Version}.js`
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    common: {
                        //抽取所有入口页面都需要的公共chunk
                        name: "chunk-common",
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            // eslint-disable-next-line no-undef
            new MiniCssExtractPlugin({
                // 修改打包后css文件名
                filename: `css/[name].${process.env.VUE_APP_Version}.css`
                    // chunkFilename: `css/[name].${process.env.VUE_APP_Version}.css`
            }),
            new CompressionPlugin({
                test: /\.js$|\.css/,
                threshold: 10240,
                deleteOriginalAssets: false
            })
        ]
    }
}