module.exports = function ({
  mid
}) {
  return {
    mid,
    view: {
      type: 'voucherlist',
      items: [{
        type: 'tree',
        expandAll: true,
        //expandedKeys:[],
        btns:[{
           name: 'action1',
           text: '新增',
           onClick: {
             name:'showModal',
             url: '~/sys1/SC/',
             onClose: {
               name: 'mergeData',
               mapping: '={tree:$ret.mapping("it",{f1:$it.a,f2:$it.b,f3:$it.c})}',
             }
           }
         }, {
           name: 'edit',
           text: '修改',
           disabled: '!$selectNode',
           onClick: {
             name:'showModal',
             url: '"~/sys1/SC/"+$selectNode',
             onClose: {
               name: 'mergeData',
               mapping: '={tree:$ret.mapping("it",{f1:$it.a,f2:$it.b,f3:$it.c})}',
             }
           }
         }, {
           name: 'delete',
           text: '删除',
           disabled: '!$selectNode',
           confirm: '确定删除?',
           onClick: {
             name:'deleteVoucher',
             id: '$selectNode',
             //
           },
           onAfterClick:{
             name: 'removeData',
             mapping: '{id:$selectNode}',
           }
         }],
        range: 'leaf', // leaf parent all
        idField: 'id',
        pidField: 'pid',
        displayField: ['a'],
        autoSelect: true, // 自动选中一个
        leafField: 'leaf',
        dataSource: '$tree',
        setSelect: 'selectNode',
        onLoad: {
          name: 'appendData',
          query: '=obj1{id,pid,a,b,c,d,e,leaf}',
          variables: '{pid:selectNode}', // 去掉查询变量一次取出全部
          mapping: '={tree:$ret.mapping("it","{f1:$it.a,f2:$it.b,f3:$it.c}")}',
        }
      }, {
        type: 'table',
        items: []
      }]
    },
    model: {
      text: 'string',
      tree: 'array',
      selectNode: 'string',
      list: 'array',
    }
  }
}
