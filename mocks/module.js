const systemModules = [{
  //   id: 'topmenu',
  //   name: ('顶部菜单'),
  //   isSystem: true,
  //   category: 'layout',
  //   privileges: [
  //     {
  //       access: 'use',
  //       name: ('切换布局')
  //     }
  //   ]
  // }, {
  //   id: 'lefttree',
  //   name: ('左树布局'),
  //   isSystem: true,
  //   category: 'layout'
  // }, {
  //   id: 'grid',
  //   name: ('网格布局'),
  //   isSystem: true,
  //   category: 'layout'
  // }, {
  //   id: 'dark',
  //   name: ('深色'),
  //   isSystem: true,
  //   category: 'theme'
  // }, {
  //   id: 'light',
  //   name: ('浅色'),
  //   isSystem: true,
  //   category: 'theme'
  // }, {
  //   id: 'changeOrg',
  //   name: ('切换组织'),
  //   isSystem: true,
  //   visible: () => require('./index').org.orgs.length > 1,
  //   category: 'org'
  // }, {
  //   id: 'lock',
  //   name: ('锁定'),
  //   isSystem: true,
  //   category: 'user'
  // }, {
  //   id: 'logout',
  //   name: ('退出'),
  //   isSystem: true,
  //   category: 'user'
  // }, {
  //   id: 'usermenu',
  //   name: ('菜单设置'),
  //   isSystem: true,
  //   category: 'usersetting'
  // }, {
  id: 'org',
  name: ('信息'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'cooperation',
  name: ('组织'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'user',
  name: ('用户'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'group',
  name: ('群组'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'privilege',
  name: ('功能权限'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'privilege/data',
  name: ('数据权限'),
  isSystem: true,
  category: 'admin'
}, {
  id: 'setup',
  name: ('功能启用'),
  isSystem: true,
  category: 'admin'
}];

module.exports = function ({
  orgid
}) {
  return [{
    id: 'sys1/Option',
    orgid,
    name: '系统选项',
    icon: 'star',
    category: 'Option'
  }, {
    id: 'sys1/DA',
    orgid,
    name: '档案',
    category: 'Voucher'
  }, {
    id: 'sys1/SC',
    orgid,
    name: '单据',
    category: 'Voucher',
    privileges: [{
      name: '查看权限',
      items: [{
        access: 'read',
        name: '查看'
      }]
    }, {
      name: '编辑权限',
      items: [{
        access: 'modify',
        name: '修改'
      }, {
        access: 'delete',
        name: '删除'
      }]
    }, {
      name: '审核权限',
      items: [{
        access: 'audit',
        name: '审核'
      }, {
        access: 'unaudit',
        name: '弃审'
      }]
    }]
  }, {
    id: 'sys1/LI',
    orgid,
    name: '单据列表',
    category: 'Voucher'
  }, {
    id: 'sys1/SB',
    orgid,
    name: '报表',
    category: 'Report'
  }, {
    id: 'sys1/TB',
    orgid,
    name: '图表',
    category: 'Report'
  }].concat(systemModules)
}
