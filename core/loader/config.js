const path = require('path');
const glob = require('glob');
const { toCamelCase } = require("../../utils/stringSwitch");
const { sep } = path

/*
  * Config loader
  * @param {Object} app - koa application 实例
  * * 加载所有 config
  * * 从跟目录 config 加载所有 config 并通过当前环境进行区分
 */

const folderName = 'config'

module.exports = (app) => {
  const configPath = path.resolve(app.baseDir, folderName)
  let defaultEnv = {}
  try {
    defaultEnv = require(path.resolve(configPath, `${ folderName }.default.js`))
  } catch (e) {
    throw new Error(`[catch-exception] no default config file found in ${ configPath }`);
  }

  const currentEnv = app.envFn.getEnv()
  let currentConfig = {}
  try {
    currentConfig = require(path.resolve(configPath, `${ folderName }.${ currentEnv }.js`))
  } catch (e) {
    throw new Error(`[catch-exception] no ${ currentEnv } config file found in ${ configPath }`)
  }

  return Object.assign({}, defaultEnv, currentConfig);
}