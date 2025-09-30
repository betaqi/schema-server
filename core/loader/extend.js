const path = require('node:path');
const glob = require('glob');
const { toCamelCase } = require("../../utils/stringSwitch");
const { sep } = path

/*
  * Extend loader
  * @param {Object} app - koa application 实例
  * * 加载所有 extend
  * * 从 app/extend 目录加载所有 extend
 */

const folderName = 'extend';

module.exports = (app) => {
  // 读取 app/extend/**/**.js 目录下的所有中间件
  const extendPath = path.resolve(app.businessPath, folderName);
  const fileList = glob.sync(path.join(extendPath, '*.js'));
  let extended = {}
  fileList.forEach((file) => {
    const paths = file.substring(file.lastIndexOf(`${ folderName }${ sep }`) + `${ folderName }${ sep }`.length, file.lastIndexOf('.'));
    const name = toCamelCase(paths)

    // 如果 app 有同名属性 报错
    const hasKey = Object.prototype.hasOwnProperty.call(app, name);
    if (hasKey) {
      throw new Error(`[catch-exception] no Extend name conflict: app already has a property named '${ name }'`);
    }

    app[name] = require(file)(app);
  })
  return extended;
}