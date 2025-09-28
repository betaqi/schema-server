const path = require("node:path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pageEntry = {}
const HtmlWebpackPlugins = []
const entryFileList = glob.sync(path.join(__dirname, '../../pages', '**', '*.js'))
console.log('--entryFileList--', entryFileList)
entryFileList.forEach(file => {
  const entryName = path.basename(file, '.js');
  pageEntry[entryName] = path.resolve(file)

  const htmlWebpackConfig = {
    // 产物 （最终模板） 输出路径
    filename: path.resolve(__dirname, '../../public/dist', `${ entryName }.tpl`),
    // 指定要使用的模板文件
    template: path.resolve(__dirname, '../../view/entry.tpl'),
    // 要注入的代码块
    chunks: [entryName]
  }

  console.log('--htmlWebpackConfig--', htmlWebpackConfig)

  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin(htmlWebpackConfig)
  )
})

module.exports = {
  entry: pageEntry,
  // 模块解析配置（决定了要加载解释哪些模块，以及用什么方式去解释）
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,   // 匹配 .js .jsx .ts .tsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   // 转换 ES6+
              // '@babel/preset-react', // 转换 JSX
              ["@babel/preset-react", { "runtime": "automatic" }]
            ]
          }
        }
      },

      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // 图片文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 小于 8kb 的图片会自动转成 base64
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]' // 输出目录和命名规则
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  // 产物输出目录
  output: {
    filename: 'js/[name].[hash:8][ext].bundle.js',
    path: path.resolve(__dirname, '../../public/dist/prod'),
    publicPath: '/dist/prod/',
    crossOriginLoading: 'anonymous',
  },
  // 配置模块解析的具体行为（定义webpack 在打包时，如何找到并解析具体模块的路径）
  resolve: {
    extensions: ['.jsx', '.js'], // 省略后缀
    alias: {
      '~': path.resolve(__dirname, '../../pages')
    }
  },
  // 插件
  plugins: [...HtmlWebpackPlugins
    // 构造最终渲染的页面模板
    // new HtmlWebpackPlugin({
    //   // 产物 （最终模板） 输出路径
    //   filename: path.resolve(__dirname, '../../public/dist', 'entry.page1.tpl'),
    //   // 指定要使用的模板文件
    //   template: path.resolve(__dirname, '../../view/entry.tpl'),
    //   // 要注入的代码块
    //   chunks: ['entry.page1']
    // }),
    // 构造最终渲染的页面模板
    // new HtmlWebpackPlugin({
    //     // 产物 （最终模板） 输出路径
    //     filename: path.resolve(process.cwd(), './app/public/dist', 'entry.page2.html'),
    //     // 指定要使用的模板文件
    //     template: path.resolve(process.cwd(), './app/view/entry.html'),
    //     // 要注入的代码块
    //     chunks: ['entry.page2']
    // })
  ],
  // 配置打包输出优化(代码分割, 模块合并, 缓存, treeSharing, 压缩等优化策略)
  optimization: {}
}