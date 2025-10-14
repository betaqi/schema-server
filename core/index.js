const path = require('path')
const Koa = require('koa')
const chalk = require("chalk");
const evn = require('./env')
const vite = require('vite')
const koaConnect = require('koa-connect')


// loaders
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
  start: async (options = {}) => {
    const app = new Koa()

    app.options = options
    app.baseDir = process.cwd()
    app.businessPath = path.resolve(app.baseDir, 'app')

    app.envFn = evn()
    app.env = app.envFn.getEnv()

    // ✅ 1️⃣ 先加载业务中间件、路由、配置（这样 /api/** 能正常工作）
    app.middlewares = middlewareLoader(app)
    app.routerSchema = routerSchemaLoader(app)
    app.service = serviceLoader(app)
    app.controller = controllerLoader(app)
    app.config = configLoader(app)
    extendLoader(app)

    try {
      require(`${app.businessPath}${sep}global-middleware`)(app)
    } catch (e) {
      console.warn(chalk.yellow('[warn] global-middleware not found'))
    }

    routerLoader(app) // 加载 API 路由（确保 /api/** 可用）

    // 🧩 2️⃣ 启动 Vite（集成到 /view/**）
    const viteServer = await vite.createServer({
      configFile: path.resolve(__dirname, '../vite.config.js'),
      root: process.cwd(),
      server: { middlewareMode: true },

      appType: 'custom',
    })

    app.viteServer = viteServer

    // 🧩 3️⃣ 在 Vite 中间件前拦截 /view/** 请求
    // app.use(async (ctx, next) => {
    //   if (ctx.path.startsWith('/view/')) {
    //     try {
    //       const pageName = ctx.path.replace(/^\/view\//, '')
    //       const htmlPath = path.resolve(process.cwd(), `app/view-template/${pageName}.html`)
    //
    //       if (!existsSync(htmlPath)) {
    //         ctx.status = 404
    //         ctx.body = `Page Not Found: ${pageName}`
    //         return
    //       }
    //
    //       let html = readFileSync(htmlPath, 'utf-8')
    //       html = await viteServer.transformIndexHtml(ctx.path, html)
    //       ctx.type = 'text/html'
    //       ctx.body = html
    //     } catch (e) {
    //       viteServer.ssrFixStacktrace(e)
    //       console.error('❌ 页面渲染错误:', e)
    //       ctx.throw(500, e)
    //     }
    //   } else {
    //     await next() // 不匹配 /view/** 的交给 vite 或 Koa 自己
    //   }
    // })

    // 🧩 4️⃣ 挂载 Vite 中间件（处理静态资源和 HMR）
    app.use(koaConnect(viteServer.middlewares))
    // ✅ 5️⃣ 启动服务器
    const port = process.env.PORT || 8080
    const host = process.env.HOST || 'localhost'

    app.listen(port, host, () => {
      console.log(chalk.greenBright('Koa server running at:'), `http://${host}:${port}`)
      console.log(chalk.cyanBright('访问页面:'), `http://${host}:${port}/view/home`)
      console.log(chalk.cyanBright('接口测试:'), `http://${host}:${port}/api/project/list`)
    })
  },
}
