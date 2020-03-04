const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')
const { smart } = require('webpack-merge')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const srcDir = path.join(__dirname, '../src')

module.exports = smart(webpackCommonConf, {
  mode: 'development',
  devServer: { // 本地服务配置
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})