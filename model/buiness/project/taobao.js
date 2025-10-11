module.exports = {
  name: 'taobao',
  desc: '淘宝电商系统',
  homePage: '',
  menu: [{
    key: 'operating',
    name: '运营活动',
    menuType: 'module',
    moduleType: 'sider',
    siderConfig: {
      menus: [
        {
          key: 'coupon',
          name: '优惠劵',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
        {
          key: 'limited',
          name: '限量购',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
        {
          key: 'festival',
          name: '节日劵',
          menuType: 'module',
          moduleType: 'custom',
          customConfig: {
            path: '/todo'
          },
        },
        {
          key: 'order',
          name: '订单管理',
          menuType: 'module',
          moduleType: 'iframe',
          iframeConfig: {
            path: 'https://www.google.com.hk/',
          },
        },
      ]
    },
  }]
}