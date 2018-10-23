module.exports = function ({
  mid
}) {
  return {
    mid,
    view: {
      type: 'report',
      onLoad: {
        name: 'loadVoucherList',
        query: '"Voucher{a,b,c,d}"',
        mapping: '"{list:Voucher}"'
      },
      items: [{
        type: 'table',
        items: []
      }]
    },
    model:{
      list: 'array',
    }
  }
}
