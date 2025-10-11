module.exports = {
  name: 'douyin',
  desc: '抖音课程系统',
  homePage: '',
  menu: [{
    key: 'material',
    name: '课程资料',
    menuType: 'module',
    moduleType: 'sider',
    siderConfig: {
      menus: [
        {
          key: 'pdf',
          name: 'PDF',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
        {
          key: 'excel',
          name: 'Excel',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
        {
          key: 'ppt',
          name: 'PPT',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
      ]
    },
  }]
}