module.exports = function ({
  query,
  variables
}) {
  if (query.startsWith('sys1{VoucherCategory{')) {
    return {
      sys1: {
        VoucherCategory: [{
          id: 'aaa',
          pid: null,
          code: 'aaaa',
          name: 'aaaaaa'
        }, {
          id: 'bb',
          pid: null,
          code: 'bbb',
          name: 'bbbbbbbb'
        }, {
          id: 'bb2',
          pid: 'bb',
          code: 'bbb2',
          name: 'bbbbbbbb2'
        }],
        Voucher: [{
          id: '1531980782823',
          code: 'SC-20180719-001',
          name: '采购订单'
        }, {
          id: '1531980782824',
          code: 'SC-20180719-002',
          name: '采购订单'
        }]
      }
    }
  }
  if (query.startsWith('sys1{SC{')) {
    return {
      sys1: {
        SC: {
          id: '1531980782823',
          code: 'SC-20180719-001'
        }
      }
    }
  }
  if (query.startsWith('sys1{Option{')) {
    return {
      sys1: {
        Option: {
          a: 1,
          b: true,
          c: false,
          d: 'ddddd',
          e: 'e',
          f: new Date()
        }
      }
    }
  }
  return {
      test1: {
        id: '1531980782824',
        code: 'test1-20180719-001',
        a: 'aaa',
        b: 'bbb',
        c: 100,
        d: '2018-01-10'
      },
      array1: [{
        id: '1531980782824',
        code: 'test1-20180719-001',
        a: 'aaa',
        b: 'bbb',
        c: 100,
        d: '2018-01-10'
      }]
  }
}
