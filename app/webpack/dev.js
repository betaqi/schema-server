const express = require('express')
const path = require('path')
const webpack = require('webpack');
const divMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const {
  webpackConfig,
  DEV_SERVER_CONFIG
} = require('./config/webapck.dev')

const app = express();
const chalk = require("chalk");
const port = DEV_SERVER_CONFIG.PORT
const compiler = webpack(webpackConfig)

app.use(express.static(path.join(__dirname, '../public/dist')))

// 引用 divMiddleware 中间件 （监控文件改动） 把打包产物塞进内存，监听文件变动。
app.use(divMiddleware(compiler, {
  // 落地文件(不需要打到内存中)
  writeToDisk: (filePath) => filePath.endsWith('html'),
  // 资源路径
  publicPath: webpackConfig.output.publicPath,
  // headers 配置
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'X-Request-With, content-type, Authorization',
  },
  stats: {
    colors: true
  }
}))

// 引用 hotMiddleware 中间件 （实现热更新通讯） 在浏览器端起一个 EventSource（长连接 SSE），订阅编译事件。
console.info(chalk.yellowBright('--- 请等待webpack初次构建 ---'))
app.use(hotMiddleware(compiler, {
  path: `/${ DEV_SERVER_CONFIG.HMR_PATH }`,
  log: () => {
  }
}))

app.listen(port, () => {
  console.log(`服务已启动,端口号：${ port }`)
})
