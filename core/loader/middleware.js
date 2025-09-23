const path = require('path');
const glob = require('glob');
const { toCamelCase } = require("../../utils/stringSwitch");
const { sep } = path

/*
  * Middleware loader
  * @param {Object} app - koa application 实例
  * * 加载所有 middleware
  * * 从 app/middleware 目录加载所有中间件
 */

const folderName = 'middleware';

module.exports = (app) => {
  // 读取 app/middleware/**/**.js 目录下的所有中间件
  const middlewarePath = path.resolve(app.businessPath, folderName);
  const fileList = glob.sync(path.join(middlewarePath, '**', '*.js'));
  let middlewares = {}
  fileList.forEach((file) => {
    const paths = file.substring(file.lastIndexOf(`${ folderName }${ sep }`) + `${ folderName }${ sep }`.length, file.lastIndexOf('.'));
    // 把 '-' 统一改为驼峰命名
    const name = toCamelCase(paths)
    const names = name.split(sep)

    const length = names.length;
    let current = middlewares;
    for (let i = 0; i < length; i++) {
      const key = names[i]
      if (i === names.length - 1) {
        current[key] = require(file)(app);
      } else {
        if (!current[key]) {
          current[key] = {}
        }
        // ! 指针往下走
        current = current[key];
      }
    }
  })
  return middlewares;
}