module.exports = {
  mode: 'dashboard',
  name: '',
  desc: '',
  icon: '',
  homepage: '',
  menu: [{
    key: '', // 菜单唯一描述
    name: '', // 名称
    menuType: '', // 枚举值: group / module

    // 当 menuType === group 时可填
    groupMenu: [{
      // 可递归 menuItem
    }],

    // 当 menuType === module 时可填
    moduleType: '', // 枚举值: sider/iframe/custom/schema
    // 当 moduleType 等于sider时
    siderConfig: {
      menus: [{}]
    },
    // 当 moduleType 等于 iframe
    iframeConfig: {},
    // 当 moduleType 等于 custom
    customConfig: {},
    // 当 moduleType 等于 schema
    schemaConfig: {
      api: '', // 数据源API（遵循 RESTFUL 风格）
      schema: { // 板块数据结构
        type: 'object',
        properties: {
          key: {
            type: '', //字段类型
            label: '', // 字段名称
          }
        },
        tableConfig: {},
        searchConfig: {},
        components: {}
      }
    },
  }]
}