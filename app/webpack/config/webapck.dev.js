const path = require("node:path");
const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webapck.base")

const DEV_SERVER_CONFIG = {
  HOST: '127.0.0.1',
  PORT: 9002,
  HMR_PATH: '__webpack_hrm', //官方规定
  TIMEOUT: 20000,
}

const { HOST, PORT, HMR_PATH, TIMEOUT } = DEV_SERVER_CONFIG
// 开发阶段的 entry 配置需要加入 hmr
Object.keys(baseConfig.entry).forEach(key => {
  // 第三方包不作为hmr入口
  if (!key.includes("vendor")) {
    baseConfig.entry[key] = [
      // 主入口文件
      baseConfig.entry[key],
      // hmr 更新入口 官方指定的hmr路径  (reload=true)=> 让浏览器主动刷新
      `webpack-hot-middleware/client?path=http://${ HOST }:${ PORT }/${ HMR_PATH }?timeout=${ TIMEOUT }&reload=true`
    ];
  }
})

const config = merge.smart(baseConfig, {
  mode: "development",
  // source-map 开发工具，呈现代码的映射关系，便于在开发过程中进行代码调试
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',// 输出文件名称
    path: path.resolve(process.cwd(), './app/public/dist/dev/'), // 输出文件路径
    publicPath: `http://${ HOST }:${ PORT }/public/dist/dev`, // 外部资源公共路径
    globalObject: 'this'
  },
  plugins: [
    // HMR 热更新
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    })
  ]
});


module.exports = {
  // webpack 配置
  webpackConfig: config,
  // devServer 配置
  DEV_SERVER_CONFIG
}