const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const path = require('path');
const glob = require('glob');

const { sep } = path

/*
  * Router loader
  * @param {Object} app - koa application 实例
  * * 加载所有 router
  * * 从跟 app/router 加载所有 router
 */

const folderName = 'router';

module.exports = (app) => {
  const routerPath = path.resolve(app.businessPath, folderName);
  const router = new Router();
  // 注册所有路由
  const routerList = glob.sync(path.join(routerPath, '**', '*.js'));
  routerList.forEach(file => {
    const route = require(file)(app, router);
    if (route instanceof Router) {
      router.use(route.routes()).use(route.allowedMethods());
    }
  })
  router.get(/(.*)/, async (ctx) => {
    ctx.status = 302
    ctx.redirect(app?.options?.homePage || '/')
  })

  app.use(router.routes()).use(router.allowedMethods());
}