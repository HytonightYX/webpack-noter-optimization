const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')
const { smart } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  plugins: [
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ],
})