const path = require("node:path");
const { existsSync, readFileSync } = require("node:fs");
module.exports = app => class ViewController {
  async renderPag(ctx) {
    const pageName = ctx.params.page // 例如 home
    const env = process.env.NODE_ENV || 'development'

    try {
      if (env === 'development') {
        // 🌈 开发模式：使用 Vite 中间件处理 HTML + HMR
        const templatePath = path.resolve(process.cwd(), 'app/view-template/entry.html')

        if (!existsSync(templatePath)) {
          ctx.status = 404
          ctx.body = `Template not found: ${templatePath}`
          return
        }

        let template = readFileSync(templatePath, 'utf-8')

        // 🔑 注入对应页面的 entry JS
        const entryPath = path.resolve(process.cwd(), `app/pages/views/${pageName}/entry.main.jsx`)
        if (!existsSync(entryPath)) {
          ctx.status = 404
          ctx.body = `Entry JS not found: ${entryPath}`
          return
        }

        const entryScript = `/@fs${entryPath}`
        template = template.replace(
          '</body>',
          `<script type="module" src="${entryScript}"></script></body>`
        )

        // transformIndexHtml 会注入 Vite HMR 客户端
        template = await app.viteServer.transformIndexHtml(`/view/${pageName}`, template)
        console.log(template)
        ctx.type = 'text/html'
        ctx.body = template
      } else {
        // 🚀 生产模式：读取打包好的 HTML 文件
        const filePath = path.resolve(process.cwd(), `app/public/dist/prod/${pageName}.html`)
        if (!existsSync(filePath)) {
          ctx.status = 404
          ctx.body = `Page Not Found: ${pageName}`
          return
        }
        ctx.type = 'text/html'
        ctx.body = readFileSync(filePath, 'utf-8')
      }
    } catch (err) {
      console.error('❌ renderPage error:', err)
      ctx.throw(500, err)
    }
  }
}