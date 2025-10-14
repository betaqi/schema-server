const core = require('./core')
;(async () => {
  await core.start({
    name: 'koa-server',
    homePage: ''
  })
})()