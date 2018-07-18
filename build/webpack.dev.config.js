const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devWebpackConfig = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js'
  },
  devtool: 'eval-source-map', // 指定加source-map的方式
  devServer: { // 建立http server进行websocket通讯
    inline:true, // inlinedJS包含socket.io和client，打包进bundle.js,可以和webpack-dev-server进行websocket通讯
    hot:true, // 热替换
    contentBase: path.join(__dirname, "..", "dist"), // 静态文件根目录
    port: 9000, // 端口
    host: 'localhost',
    compress: false // 服务器返回浏览器的时候是否启动gzip压缩
  },
  watchOptions: {
      ignored: /node_modules/, // 忽略不用监听变更的目录
      aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
      poll:1000 // 每秒检查一次变动
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //HMR 热替换，只更新变更内容
    new webpack.NamedModulesPlugin() // HMR 模块标识符 只变更内容改变文件的hash值
  ]
})

module.exports = devWebpackConfig