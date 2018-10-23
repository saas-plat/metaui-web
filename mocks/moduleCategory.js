
const systemModuleTypes = [
  {
    id: 'layout',
    name: ('布局'),
    order: 10010
  }, {
    id: 'theme',
    name: ('主题'),
    order: 10020
  }, {
    id: 'org',
    name: ('组织管理'),
    order: 10030
  }, {
    id: 'user',
    name: ('会话管理'),
    order: 10040
  }, {
    id: 'usersetting',
    name: ('用户设置'),
    order: 10050
  }, {
    id: 'admin',
    name: ('系统管理'),
    order: 10060
  }
];

module.exports = function({orgid}) {
  return [
    {
      id: 'Option',
      name: '系统选项',
      order: 30
    }, {
      id: 'Voucher',
      name: '单据',
      order: 10
    }, {
      id: 'Report',
      name: '报表',
      order: 20
    }
  ].concat(systemModuleTypes)
}
