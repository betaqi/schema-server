module.exports = (app, router) => {
  const { view: viewController } = app.controller;
  router.get('/view/:page', viewController.renderPag);
}