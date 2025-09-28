const Router = require('koa-router')
const path = require('node:path');
const glob = require('glob');

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

  app.use(router.routes()).use(router.allowedMethods());
}