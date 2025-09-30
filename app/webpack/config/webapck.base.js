const path = require("node:path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pageEntry = {}
const HtmlWebpackPlugins = []
const entryFileList = glob.sync(path.join(__dirname, '../../pages/views', '**', 'entry.main.js'))

entryFileList.forEach(file => {
  const entryName = path.basename(path.dirname(file))
  pageEntry[entryName] = path.resolve(file)

  const htmlWebpackConfig = {
    // 产物 （最终模板） 输出路径
    filename: path.resolve(__dirname, '../../public/dist', `${ entryName }.html`), // 指定要使用的模板文件
    template: path.resolve(__dirname, '../../view-template/entry.html'), // 要注入的代码块
    chunks: [entryName]
  }


  HtmlWebpackPlugins.push(new HtmlWebpackPlugin(htmlWebpackConfig))
})

module.exports = {
  entry: pageEntry, // 模块解析配置（决定了要加载解释哪些模块，以及用什么方式去解释）
  module: {
    rules: [{
      test: /\.[jt]sx?$/,   // 匹配 .js .jsx
      exclude: /node_modules/, use: {
        loader: 'babel-loader', options: {
          presets: ['@babel/preset-env',   // 转换 ES6+
            // '@babel/preset-react', // 转换 JSX
            ["@babel/preset-react", { "runtime": "automatic" }]]
        }
      }
    }, // 图片资源
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        generator: { filename: 'images/[name].[hash:8]' }
      }, {
        test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // 可选，如果用 Sass
        ]
      },

    ]
  }, // 产物输出目录
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, '../../public/dist/prod'),
    publicPath: '/dist/prod/',
    crossOriginLoading: 'anonymous',
    clean: true, // 打包前清理旧文件
  }, // 配置模块解析的具体行为（定义webpack 在打包时，如何找到并解析具体模块的路径）
  resolve: {
    extensions: ['.jsx', '.js'], // 省略后缀
    alias: {
      '~': path.resolve(__dirname, '../../pages')
    }
  }, // 插件
  plugins: [
    ...HtmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
  ], // 配置打包输出优化(代码分割, 模块合并, 缓存, treeSharing, 压缩等优化策略)
  optimization: {
    /*
      * 把js 文件打包成3种类型
      * 1.vendor： 第三方 Lib 库，基本不会改动，除非依赖版本升级
      * 2.common：业务组件代码的公共部分抽取出来，改动较少
      * 3. entry.{page｝：不用页面 entry 里的业务组件代码的差异部分，会经常改动
    */
    splitChunks: {
      chunks: 'all', // 对同步和异步模块都进行切割
      maxAsyncRequests: 6, // 每次异步加载的最大并行请求数
      maxInitialRequests: 4, // 入口点的最大并行请求数
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          priority: 30,
          enforce: true,
        }, otherVendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 20, // enforce: true, // 去掉，让它走正常 minSize 判断
        }, common: {
          name: 'common', minSize: 20000, // 默认20kb，避免碎片化
          minChunks: 2,   // 至少被两个入口引用才抽取
          priority: 10,   // 高于 vendor，确保公共逻辑进 common
          reuseExistingChunk: true,
        }
      }
    }, // 将 webpack 运行时生产的代码打包到 runtime.js
    runtimeChunk: {
      name: entrypoint => `runtime~${ entrypoint.name }`
    },
    minimizer: [
      `...`, // 保留 Webpack 内置 JS 压缩
      new CssMinimizerPlugin()
    ]
  }
}