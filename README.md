# webpack-noter-optimization





第一次

![image-20200304205939420](http://qn-noter.yunxi.site/imagehost/m9qjl.png)



![image-20200304211848832](http://qn-noter.yunxi.site/imagehost/ub6m7.png-style1)





优化一：

- hash 分包

```javascript
output: {
  path: path.resolve(__dirname, '../dist'),
  filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js',
  chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunks/[name].[contenthash].js',
},
```

`chunkname`我的理解是未被列在`entry`中，却又需要被打包出来的文件命名配置。什么场景需要呢？我们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在`entry`中的，如使用CommonJS的方式异步加载模块：



