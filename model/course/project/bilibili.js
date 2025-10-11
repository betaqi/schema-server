module.exports = {
  name: 'bilibili',
  desc: 'bilibili课程系统',
  homePage: '',
  menu: [{
    key: 'traffic',
    name: '流量管理',
    menuType: 'module',
    moduleType: 'sider',
    siderConfig: {
      menus: [
        {
          key: 'student',
          name: '学员流量',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        }
      ]
    },
  }]
}