module.exports = app => class ViewController {
  async renderPag(ctx) {
    await ctx.render(`dist/${ctx.params.page}`,{
      name: app.options?.name,
      env: app.envFn.getEnv()
    })
  }
}