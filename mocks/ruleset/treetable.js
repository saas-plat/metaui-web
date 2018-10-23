module.exports = function ({
  mid
}) {
  return {
    mid,
    view: {
      type: 'voucherlist',
      onLoad: {
        name: 'loadVoucherList',
        query: '"VoucherCategory{a,b,c,d},Voucher{a,b,c,d}"',
        mapping: '"{tree:VoucherCategory,list:Voucher}"'
      },
      items: [{
        type: 'tree',
        items: []
      },{
        type: 'table',
        items: []
      }]
    },
    model:{
      text: 'string',
      tree: 'array',
      list: 'array',
    }
  }
}
