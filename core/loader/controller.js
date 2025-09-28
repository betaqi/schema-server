const path = require('node:path');
const glob = require('glob');
const { toCamelCase } = require("../../utils/stringSwitch");

const { sep } = path
/*
  * Controller loader
  * @param {Object} app - koa application 实例
  * * 加载所有 controller
  * * 从 app/controller 目录加载所有 controller
 */

const folderName = 'controller';

module.exports = (app) => {
  const controllerPath = path.resolve(app.businessPath, folderName);
  const fileList = glob.sync(path.join(controllerPath, '**', '*.js'));
  let controllers = {}
  fileList.forEach((file) => {
    const paths = file.substring(file.lastIndexOf(`${ folderName }${ sep }`) + `${ folderName }${ sep }`.length, file.lastIndexOf('.'));

    const name = toCamelCase(paths)
    const names = name.split(sep)

    const length = names.length;
    let current = controllers;
    for (let i = 0; i < length; i++) {
      const key = names[i]
      if (i === names.length - 1) {
        const controllerModule = require(file)(app)
        current[key] = new controllerModule;
      } else {
        if (!current[key]) {
          current[key] = {}
        }
        // ! 指针往下走
        current = current[key];
      }
    }
  })
  return controllers;
}