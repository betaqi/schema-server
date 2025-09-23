/*
    * Router Schema Loader
    * @param app Koa 实例
    * @return {Object} 路由校验对象
    * * 加载所有路由校验
    * * 通过 'json-schema' & 'ajv' 实现路由参数校验 配合 api-params -verify 中间件使用
 */

const path = require("path");
const glob = require('glob');

const folderName = 'router-schema';
module.exports = (app) => {
  const middlewarePath = path.resolve(app.businessPath, folderName);
  const fileList = glob.sync(path.join(middlewarePath, '**', '*.js'));

  let routerSchema = {}
  fileList.forEach((file) => {
    routerSchema = {
      ...routerSchema, ...require(file)
    }

  })
  return routerSchema
}