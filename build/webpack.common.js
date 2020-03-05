const path = require('path')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  entry: {
    client: resolve('../src/index.js')
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash:8].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunks/[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "happypack/loader?id=happyBabel"
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:4].[ext]',
          outputPath: '/img'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "css/[id].[contenthash:8].css"
    }),
    new HappyPack({
      //用id来标识 happypack处理那一类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          // babelrc: true,
          cacheDirectory: true // 启用缓存
        }
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyStyle',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 之前有2个loaders
            // modules: true, // 启用cssModules
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,//为true,在样式追溯时，显示的是编写时的样式，为false，则为编译后的样式
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            javascriptEnabled: true
          }
        }
      ],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
  ]
}