const path = require('node:path');
const cors = require('koa2-cors');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaNunjucks = require('koa-nunjucks-2');


module.exports = (app) => {

  // 模版渲染引擎
  app.use(koaNunjucks({
    ext: 'tpl',
    path: path.resolve(process.cwd(), './app/public'), // 指定视图目录
    nunjucksConfig: {
      noCache: true, // 是否开启缓存，开发阶段建议关闭
      trimBlocks: true // 开启转义，防止 XSS 攻击
    }
  }))

  // 静态资源目录
  app.use(koaStatic(path.resolve(process.cwd(), './app/public')));

  // 解析 body
  app.use(bodyParser());

  // 处理跨域
  app.use(cors());

  // 挂在 app/middleware中的中间件

  for (const name of Object.keys(app.middlewares)) {
    app.use(app.middlewares[name])
  }

}