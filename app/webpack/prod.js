const webpack = require('webpack')
const config = require('./config/webapck.base');
const chalk = require("chalk");

console.log(chalk.yellowBright('building...'));

webpack(config, (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false, // 不显示每个模块的打包信息
    children: false, // 不显示字编译任务信息
    chunks: false, // 不显示每个代码块信息
    chunkModules: false, // 不显示每个代码块中模块信息
  }));
})
