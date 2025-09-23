const path = require('path')
const Koa = require('koa')

const evn = require('./env')

const controllerLoader = require('./loader/controller')
const extendLoader = require('./loader/extend')
const middlewareLoader = require('./loader/middleware')
const routerLoader = require('./loader/router')
const routerSchemaLoader = require('./loader/router-schema')
const scheduleLoader = require('./loader/schedule')
const serviceLoader = require('./loader/service')
const configLoader = require('./loader/config')

const { sep } = path


module.exports = {
  /*
   * 启动 Koa 服务器
   * @params options 启动参数
   */
  start: (options = {}) => {
    const app = new Koa()

    app.options = options // 将 options 实例挂载到 app 上，方便在中间件中使用

    app.baseDir = process.cwd() // 将项目根目录挂载到 app 上，方便在中间件中使用

    app.businessPath = path.resolve(app.baseDir, 'app') // 业务代码目录

    app.env = evn()
    console.log(`--- 👀 当前启动环境 【${ app.env.getEnv() }】 ---`)

    // 按照顺序加载中间件、路由、服务等
    app.middlewares = middlewareLoader(app) // 加载中间件
    app.routerSchema = routerSchemaLoader(app) // 加载路由校验
    app.controller = controllerLoader(app) // 加载 controller
    app.service = serviceLoader(app) // 加载 service
    app.config = configLoader(app) // 加载配置
    extendLoader(app) // 加载扩展
    // scheduleLoader(app) // 加载定时任务
    // 注册全局中间件
    try {
      require(`${ app.businessPath }${ sep }global-middleware`)(app)
    } catch (e) {
      throw new Error('[catch-exception] global-middleware not found')
    }

    routerLoader(app) // 加载路由

    const port = process.env.PORT || 8080
    const host = process.env.HOST || 'localhost'

    app.listen(port, host, () => {
      console.log(`🚀 Koa server running at http://${ host }:${ port }`)
    })
  }
}

