const Response = require('../Response');
module.exports = (app) => class ProjectController {
  constructor() {
    const { project } = app.service;
    this.projectService = project;
  }


  async loadList(ctx) {
    const res = await this.projectService.getList();
    Response.newSuccess(ctx, res);
  }

}