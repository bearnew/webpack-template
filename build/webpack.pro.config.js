const path = require('path');

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空打包目录的插件

const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack') // 移除无用的选择器
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // css压缩
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') // 多线程uglify

module.exports = merge(baseConfig, {
    output:{
        publicPath: './' //这里要放的是静态资源CDN的地址(一般只在生产环境下配置)
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'src/static'),
                to: path.join(__dirname,  '..', 'dist', 'static'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..'),
            verbose: true, // 将日志写入控制台
            dry:  false // 清空文件
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true // 避免 cssnano 重新计算 z-index
            }
        }),
        new PurifyCSSPlugin({
            // 同步获取匹配文件列表
            paths: glob.sync(path.join(__dirname, '../**/*.html'))
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    // drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
    ]
})
