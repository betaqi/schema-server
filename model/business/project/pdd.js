module.exports = {
  name: 'pdd',
  desc: '拼多多商系统',
  homePage: '',
  menu: [{
    key: 'product',
    name: '商品管理(拼多多)',
    // menuType: 'module',
    // moduleType: 'custom',
    // customConfig: {
    //   path: '/todo'
    // },
  },
    {
      key: 'client',
      name: '客户管理(拼多多)',
      // menuType: 'module',
      // moduleType: 'custom',
      // customConfig: {
      //   path: '/todo'
      // },
    },
    {
      key: 'operating',
      name: '运营活动',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
        menus: [

          {
            key: 'data',
            name: '数据分析',
            menuType: 'module',
            moduleType: 'sider',
            siderConfig: {
              menus: [
                {
                  key: 'analysis',
                  name: '电商罗盘',
                  menuType: 'module',
                  moduleType: 'custom',
                  customConfig: {
                    path: '/todo'
                  },
                },
              ]
            },
          },
        ]
      },
    }]
}