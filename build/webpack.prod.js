const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')
const { smart } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'none',
  plugins: [
    // 将打包后的资源注入到html文件内
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      favicon: resolve('../public/favicon.ico'),
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ],
  optimization: {
    minimizer: [
      // 多进程压缩
      new TerserJSPlugin({
        // 设置缓存目录
        cache: path.resolve('.cache'),
        parallel: 4,// 开启多进程压缩
        terserOptions: {
          compress: {
            // 删除所有 conosle
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',

      cacheGroups: {
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          minSize: 0,
          minChunks: 1
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
})