module.exports = (app) => class ProjectServer {
  async getList(req, res) {
    return new Promise((resolve, reject) => {
      resolve([
        { id: 1, name: 'project1' },
        { id: 2, name: 'project2' },
        { id: 3, name: 'project3' }
      ])
    })
  }

  async getModelList(req, res) {
    return require('../../model/index')(app)
  }

}