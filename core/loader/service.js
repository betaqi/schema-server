const path = require('path');
const glob = require('glob');
const { toCamelCase } = require("../../utils/stringSwitch");
const { sep } = path

/*
  * Controller loader
  * @param {Object} app - koa application 实例
  * * 加载所有 service
  * * 从 app/service 目录加载所有 service
 */

const folderName = 'service';

module.exports = (app) => {
  const servicePath = path.resolve(app.businessPath, folderName);
  const fileList = glob.sync(path.join(servicePath, '**', '*.js'));
  let services = {}
  fileList.forEach((file) => {
    const paths = file.substring(file.lastIndexOf(`${ folderName }${ sep }`) + `${ folderName }${ sep }`.length, file.lastIndexOf('.'));

    const name = toCamelCase(paths)
    const names = name.split(sep)

    const length = names.length;
    let current = services;
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
  return services;
}