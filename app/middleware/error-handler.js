const Response = require('../Response');

module.exports = (app) => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const { status, message, detail } = error
    app.logger.error('[catch-exception]', status, message, detail)
    if (message && message.includes('template not found')) {
      // 页面重定向
      console.log('页面重定向')
      ctx.status = 302;
      ctx.redirect(`${app?.options?.homePage || '/'}`)
      return
    }
    Response.newServiceFail(ctx)
  }
}