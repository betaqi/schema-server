module.exports = {
  mode: 'dashboard',
  name: '课程系统',
  desc: '',
  icon: '',
  homepage: '',
  menu: [
    {
      key: 'video',
      name: '视频管理',
      menuType: 'module',
      moduleType: 'custom',
      customConfig: {
        path: '/todo'
      },
    },
    {
      key: 'user',
      name: '用户管理',
      menuType: 'module',
      moduleType: 'custom',
      customConfig: {
        path: '/todo'
      },
    }
  ]
}