const Response = require('../Response');
module.exports = (app) => class ProjectController {
  constructor() {
    const { project } = app.service;
    this.projectService = project;
  }


  async loadList(ctx) {
    // await new Promise(resolve => setTimeout(resolve, 30000));
    const res = await this.projectService.getList();
    Response.newSuccess(ctx, res);
  }


  async loadModelList(ctx) {
    const modelList = await this.projectService.getModelList();
    const dtoModelList = modelList.reduce((prevRes, curr) => {
      const { model, projects } = curr;
      const { key, name, desc } = model;
      const dtoModel = { key, name, desc }

      const dtoProjects = Object.keys(projects).reduce((prev, curr) => {
        const { key, name, desc, homePage } = projects[curr];
        prev[curr] = { key, name, desc, homePage };

        return prev
      }, {})

      prevRes.push({
        model: dtoModel,
        projects: dtoProjects
      })

      return prevRes;
    }, [])
    Response.newSuccess(ctx, dtoModelList);
  }

}