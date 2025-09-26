module.exports = app => class ViewController {
  async renderPag(ctx) {
    await ctx.render(`output/entry.${ctx.params.page}`,{
      name: app.options?.name,
      env: app.envFn.getEnv()
    })
  }
}